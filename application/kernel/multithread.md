# 多线程

## 概述

在应用开发的过程中经常会使用到多线程，配合内核提供的同步机制，可以实现多线程之间的同步，从而实现更加灵活的应用业务逻辑。

本章节给开发者介绍Zephyr系统线程同步中多线程的实现，通过本章节学习，开发者可以了解到：
- 多线程基本信息和使用场景
- 多线程的实现方法

## 多线程简介
多线程在项目中主要用来解决并发任务执行，本章节将通过一个简单的示例来说明多线程的实现，示例中创建两个线程`threadA`和`threadB`，并在每个线程中分别循环打印`Hello World`。

### 常用API接口

线程创建

```c
k_tid_t k_thread_create(struct k_thread *new_thread, k_thread_stack_t *stack, size_t stack_size,
k_thread_entry_t entry, void *p1, void *p2, void *p3, int prio, uint32_t options, k_timeout_t delay);
```

该函数初始化线程并根据delay参数选择来调度执行。新线程根据传递的参数可设置为立即执行或延迟启动。如果新创建的线程没有设置延迟启动，内核调度程序可能会抢占当前线程以允许新线程执行。

线程的options参数的设置，可以特别指定线程的属性，可配置的选项包含有K_ESSENTIAL、K_FP_REG和K_SSE_REG，可以通过使用“|”（逻辑或运算符）分隔多个选项来指定它们，不需要任何线程选项的线程的options配置为0。

传递到此函数的stack参数必须使用以下任一宏定义，以便于移植。

K_THREAD_STACK_DEFINE() ：可用于user线程或主管线程的堆栈。

K_KERNEL_STACK_DEFINE() ：仅可用于主管线程的堆栈。如果启用CONFIG_USERSPACE（用户空间），这些堆栈使用的内存更少。

stack_size必须是按下述来定义：

- K_THREAD_STACK_DEFINE() 或 K_KERNEL_STACK_DEFINE() 调用时，传递进去的size参数
- 如果stack参数是用K_THREAD_STACK_DEFINE() 定义的，则stack_size为K_THREAD_STACK_SIZEOF(stack)
- 如果stack参数是用K_KERNEL_STACK_DEFINE() 定义的，则stack_size为K_THREAD_STACK_SIZEOF(stack)

stack_size使用其他值或直接用sizeof(stack)可能会出现不确定的问题。

k_thread_create函数返回新的线程ID。

**参数说明**

| 字段       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| new_thread | 未初始化的struct k_thread指针                                |
| stack      | 指向堆栈空间的指针                                           |
| stack_size | 堆栈空间大小，以字节为单位                                   |
| entry      | 线程入口函数                                                 |
| p1         | 线程入口函数的第一个参数                                     |
| p2         | 线程入口函数的第二个参数                                     |
| p3         | 线程入口函数的第三个参数                                     |
| prio       | 线程优先级                                                   |
| options    | 线程选项，可配置的选项包含如下：<br/>**K_ESSENTIAL**：此选项会将该线程标记为一个基本的线程。这将指示内核将线程的终止或中止视为一个致命的系统错误。默认情况下，线程不被认为是基本线程。<br/>**K_FP_REGS**和**K_SSE_RGES**：这两个选项是 x86 相关的选项，分别表示线程使用 CPU 的浮点寄存器和 SSE 寄存器，指示内核在调度线程进行时需要采取额外的步骤来保存/恢复这些寄存器的上下文。<br/>**K_USER**：如果启用了CONFIG_USERSPACE（用户空间），这个线程将在用户模式下创建，并且将拥有减少的特权。用户空间未启用的情况下，此标志无作用。<br/>**K_INHERIT_PERMS**：如果启用了CONFIG_USERSPACE（用户空间），此线程将继承父线程拥有的所有内核对象权限，但父线程对象除外。<br/>可配置为0，表示使用默认属性。 |
| delay      | 调度延迟，或传入K_NO_WAIT表示立即参与调度                    |

<br/>

线程启动

```c
void k_thread_start(k_tid_t thread);
```

如果thread线程创建的时候，传入的delay参数K_FOREVER，则在k_thread_start函数调用之前，该线程不会被添加到调度队列。

**参数说明**

| 字段   | 说明                   |
| ------ | ---------------------- |
| thread | 已经创建的线程对象指针 |

<br/>

设置当前线程名

```c
int k_thread_name_set(k_tid_t thread, const char *str);
```

设置线程名可用于跟踪调试代码。

**参数说明**

| 字段   | 说明                                                     |
| ------ | -------------------------------------------------------- |
| thread | 已经创建的线程对象指针，或者传递NULL表示设置的是当前线程 |
| str    | 自定义的线程名，字符串                                   |

**返回值说明**

| 返回值  | 说明                               |
| ------- | ---------------------------------- |
| 0       | 成功                               |
| -EFAULT | 传入的字符串参数，出现内存访问错误 |
| -ENOSYS | 没启用线程名配置的options          |
| -EINVAL | 传递进来的线程名参数字符串过长     |

更多 **线程thread API** 使用方法可以参照Zephyr官网[Thread APIS](https://docs.zephyrproject.org/latest/doxygen/html/group__thread__apis.html)。

<br/>

:::tip
本章节需要开发者基于csk6 sdk提供的`hello_world`示例基础上实现多线程开发，以增强对csk6 sdk的了解和提升实操能力。
:::

## 获取sample项目
通过Lisa命令创建`hello_world`项目：
```
lisa zep create
```
![](./files/hello_world.png)
> sample → hello_world
完成`hello_world`项目创建后，可参考以下章节**API接口**和**代码实现**完成多线程示例的实现。


### 项目配置
在 `prj.conf` 文件中增加以下配置：

```shell
CONFIG_STDOUT_CONSOLE=y
# enable to use thread names
CONFIG_THREAD_NAME=y
CONFIG_SCHED_CPU_MASK=y
```

### 代码实现

```c
/* 线程堆栈空间 */
#define STACKSIZE 1024
/* 线程优先级 */
#define PRIORITY 7


/* 线程A */
void threadA(void *dummy1, void *dummy2, void *dummy3)
{
	/* 作为示例，本线程没用到dummy这三个参数，使用ARG_UNUSED进行声明，可避免编译时提示Warn */
	ARG_UNUSED(dummy1);
	ARG_UNUSED(dummy2);
	ARG_UNUSED(dummy3);

    while (1){
		/* 每隔两秒打印一次Hello World */
        k_msleep(1000);
        printk("threadA: Hello World on %s!\n", CONFIG_BOARD);
    }
    
}

/* 线程B */
void threadB(void *dummy1, void *dummy2, void *dummy3)
{

	ARG_UNUSED(dummy1);
	ARG_UNUSED(dummy2);
	ARG_UNUSED(dummy3);

     while (1){
        k_msleep(2000);
        printk("threadB: Hello World on %s!\n", CONFIG_BOARD);
    }
}

/* 定义线程堆栈空间 */
K_THREAD_STACK_DEFINE(threadA_stack_area, STACKSIZE);
static struct k_thread threadA_data;

K_THREAD_STACK_DEFINE(threadB_stack_area, STACKSIZE);
static struct k_thread threadB_data;


void main(void)
{
    /* 创建线程 */
    k_thread_create(&threadA_data, threadA_stack_area,
            K_THREAD_STACK_SIZEOF(threadA_stack_area),
            threadA, NULL, NULL, NULL,
            PRIORITY, 0, K_FOREVER);
    k_thread_name_set(&threadA_data, "thread_a");

    k_thread_create(&threadB_data, threadB_stack_area,
            K_THREAD_STACK_SIZEOF(threadB_stack_area),
            threadB, NULL, NULL, NULL,
            PRIORITY, 0, K_FOREVER);
    k_thread_name_set(&threadB_data, "thread_b");

    /* 启动线程 */
    k_thread_start(&threadA_data);
    k_thread_start(&threadB_data);
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
lisa zep flash --runner pyocd
```
- **查看结果**  

将`csk6002_9s_nano`的日志串口`A03 TX A02 RX`接串口板连接电脑，在电脑端使用串口调试助手查看日志，波特率为115200。

预期日志输出结果：
```shell
*** Booting Zephyr OS build fd53c115d07a  ***
threadA: Hello World on csk6002_9s_nano!
threadB: Hello World on csk6002_9s_nano!
threadA: Hello World on csk6002_9s_nano!
threadA: Hello World on csk6002_9s_nano!
threadB: Hello World on csk6002_9s_nano!
threadA: Hello World on csk6002_9s_nano!
threadA: Hello World on csk6002_9s_nano!
threadB: Hello World on csk6002_9s_nano!
```
