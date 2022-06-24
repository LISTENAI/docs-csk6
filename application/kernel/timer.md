# Timer定时器

Timer定时器是Zephyr RTOS中的一个内核对象，它使用内核的系统时钟实现计数和定时器。用户可以使用Timer在实现有较高时间精度要求的业务功能，如周期性任务、时序控制等。

通过本章节的学习，您将学习到：
- Timer的特性与常用接口
- Timer的基本使用方法
- 在CSK6芯片上使用Timer实现一个周期性执行操作的应用

## Timer介绍

用户可根据需要对一个Timer进行配置，并通过注册回调的方式指定Timer到期时执行的操作，实现计时结束后执行指定操作。Timer也可以用于周期性计数。

### timer的特性

- **timer可定义的数量：**     

    在内存足够的前提下，内核不限制timer的数量。

- **timer关键参数：**

    duration：设定timer第一次到期的时间。
    period: timer第一次到期后的触发时间间隔。

- **timer回调注册：**

    可注册到期回调函数，在duration或period到期后在时钟中断中回调该函数。
    可注册停止回调函数，在执行stop timer的线程中回调该函数。

- **timer计数状态获取：**

    timer提供了一个status值，用来标记上一次读取状态到当前这个时间段内timer到期了多少次。


### Timer工作的示例图

![](./files/timer.png)
duration：设定timer第一次到期的时间。    
period: timer第一次到期后的触发时间间隔。    
expiry：触发回调。    


## 常用API接口
```c
/* 定义并初始化timer */
#define K_TIMER_DEFINE(name, expiry_fn, stop_fn)
name：timer的名称
expiry_fn：timer每次到期时的回调函数
stop_fn：timer停止时的回调函数

/* 初始化timer */
void k_timer_init(struct k_timer *timer, k_timer_expiry_t expiry_fn, k_timer_stop_t
timer：k_timer
expiry_fn：timer每次到期时的回调函数
stop_fn：timer停止时的回调函数

/* 启动timer */
void k_timer_start(struct k_timer *timer, k_timeout_t duration, k_timeout_t period)
timer: k_timer
duration: 第一次到期时间
period：后续周期的到期时间，当传入K_FOREVER或K_NO_WAIT，在duration触发后timer会自动停止。

/* 停止timer */
void k_timer_stop(struct k_timer *timer)

/* 获取从上次读取到当前时间段内timer触发的次数，每次读取后status都会被清0 */
uint32_t k_timer_status_get(struct k_timer *timer)

/* 等待timer触发或停止 */
uint32_t k_timer_status_sync(struct k_timer *timer)

/* 获取timer即将到期的时间 */
k_ticks_t k_timer_expires_ticks(const struct k_timer *timer)

/* 获取timer还有多少个周期 */
k_ticks_t k_timer_remaining_ticks(const struct k_timer *timer)

/* 获取timer还有多久到期 */
uint32_t k_timer_remaining_get(struct k_timer *timer)
```

更多 **Timer API**可以参考Zephyr官网[Timer APIS](https://docs.zephyrproject.org/latest/doxygen/html/group__timer__apis.html)。


## Timer使用示例
### 创建一个`hello_world`
开发者可基于`hello_world`项目按照以下步骤添加timer的代码并运行，以此更好的掌握csk6 sdk提供的timer的使用方法。
首先创建一个`hello_world`项目，可参考快速上手章节：[开始新项目](../../quick_start/start_project.md)。

### Timer功能使用
初始化timer有两种方式：

**方式一：**

```c
/* 定义初始化timer */
struct k_timer reset_counter_timer;
k_timer_init(&reset_counter_timer, timer_handler_expiry, timer_handler_stop);
```

**方式二：** 

```c
/* 定义初始化timer */
K_TIMER_DEFINE(&reset_counter_timer, timer_handler_expiry, timer_handler_stop);
```

**主函数实现：**

```c
int counter = 0;

/* timer到期回调函数 */
static void timer_handler_expiry(struct k_timer *dummy)
{   
    counter++;
	printk("counter %d \n", counter);    
}

/* timer停止回调函数 */
static void timer_handler_stop(struct k_timer *dummy)
{
    counter = 0;
	printk("stop timer and reset counter to zero\n");
}

/* 定义初始化timer */
 K_TIMER_DEFINE(reset_counter_timer, timer_handler_expiry, timer_handler_stop);

void main(void)
{
    printk("Hello World! %s\n", CONFIG_BOARD);

    printk("timer sample start");

    /* 启动timer，duration为1S， period为2s */
    k_timer_start(&reset_counter_timer, K_MSEC(1000), K_MSEC(2000));

    k_msleep(10000);
    /* 10s 后获取timer触发的次数,每次读取后status都会被清0 */
    int status = k_timer_status_get(&reset_counter_timer);
    printk("timer status %d\n", status);

    /* 等待timer触发后打印触发的次数 */
    int status_sync = k_timer_status_sync(&reset_counter_timer);
    printk("timer status sync %d\n", status_sync);

    /* 2S 后停止timer */
    k_msleep(2000);
    /* 停止 timer */
    k_timer_stop(&reset_counter_timer);
}
```
## 编译和烧录
- **编译** 

在app根目录下通过以下指令完成编译：
```
lisa zep build -b csk6002_9s_nano
```
- **烧录**   

`csk6002_9s_nano`开发板通过USB连接PC，通过烧录指令开始烧录：
```
lisa zep flash
```
- **查看结果**  

可通过lisa提供的`lisa term`命令查看日志：
```
lisa term
```
或者将`csk6002_9s_nano`的日志串口`A03 TX A02 RX`接串口板连接电脑，在电脑端使用串口调试助手查看日志，波特率为115200。

日志输出结果：
```shell
*** Booting Zephyr OS build fd53c115d07a  ***
[17:55:16.469] 
[17:55:16.475] Hello World! csk6002_9s_nano
[17:55:16.475] timer csk6002_9s_nano
[17:55:17.475] counter 1 
[17:55:19.471] counter 2 
[17:55:21.471] counter 3 
[17:55:23.471] counter 4 
[17:55:25.471] counter 5 
[17:55:26.471] timer status 5
[17:55:27.472] counter 6 
[17:55:27.476] timer status sync 1
[17:55:29.476] counter 7 
[17:55:29.476] stop timer and reset counter to zero

```
从日志可以看到，timer在1S后第一次触发回调函数，之后以2S的周期触发回调，直到应用程序主动停止timer。


:::tip
因为timer的回调是在中断中执行，所以在回调函数中不能做耗时操作。
timer不能保证精确的定时，但其精度比k_sleep/k_usleep高，测量执行时间时不建议使用k_timer，建议读系统硬件时钟。
:::

## 耗时操作处理
当timer触发回调后需要处理耗时操作时，可配合k_work使用，将耗时操作放在workqueue中执行，基于以上代码实现示例如下：
```c
/* k_work回调函数，用于处理耗时操作 */
void work_handler(struct k_work *work)
{
    while(int i=0, i<100, i++){
        printk("do something \n");
    }
}

/* 定义初始化一个k_work */
K_WORK_DEFINE(a_work, work_handler);

/* timer到期回调函数 */
static void timer_handler_expiry(struct k_timer *dummy)
{   
    counter++;
	printk("counter %d \n", counter);
    /*发送k_work信号量*/
    k_work_submit(&a_work);    
}
```
更多关于k_work使用可参考Zephyr官网[Workqueue Threads](https://docs.zephyrproject.org/latest/kernel/services/threads/workqueue.html)章节、[Work Queue APIs](https://docs.zephyrproject.org/latest/doxygen/html/group__workqueue__apis.html)章节。

