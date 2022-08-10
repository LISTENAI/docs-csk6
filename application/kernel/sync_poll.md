# 轮询
## 概述

轮询(poll)是一个比较特殊的内核对象，polling API 允许一个线程等待一个或者多个条件满足。支持的条件类型只能是内核对象，可以是Semaphore(信号量), FIFO(管道), poll signal(轮询)三种。
例如一个线程使用polling API同时等待多个semaphore，只要其中一个 semaphore 触发时 polling API 就会得到通知。
poll 具有以下特性：

- 当一个线程等待多个触发条件时，只要有一个条件满足 k_poll 就会返回。
- 当 Semaphore 或 FIFO 满足条件后, k_poll 只是接到通知返回，线程并未获取到 semaphore 或FIFO, 还需要使用代码主动获取。

本章节在上个章节-同步之互斥量基础上讲解轮询的使用场景和使用方法，通过本章节学习，开发者可以了解到：
- 轮询的基本信息和使用场景
- 轮询的使用方法

## 常用API接口
### k_poll_event_init

```c
void k_poll_event_init(struct k_poll_event *event, uint32_t type, int mode, void *obj);
```
初始化一个 k_poll_event 实例，使用轮询功能需要包含头文件`#include <zephyr/kernel.h>`。轮询事件到来，会放置在事件数组中，后面传递给`k_poll`接口。

等待一个或多个轮询事件发生。事件可以是内核对象，如信号量(Semaphore)或轮询信号事件。在对象变为可用且其等待队列为空之前，轮询线程无法获取对象上的轮询事件，因此，当被轮询的对象只有一个线程（轮询线程）试图获取它们时，`k_poll()`调用更有效。当`k_poll()`返回0时，调用方应轮询所有给`k_poll()`的事件，并检查状态字段中预期的值，并采取相关操作。再次调用`k_poll()`之前，用户必须将状态字段重置为`K_POLL_STATE_NOT_READY`。

**参数说明**

| 字段       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| event      | 被轮询的事件数组                                             |
| num_events | 被轮询的事件数量（event数组中事件的个数）                    |
| timeout    | 指定事件到来的等待时间，或者传入特殊值`K_NO_WAIT`或`K_FOREVER` |

<br/>

### k_poll_signal_init

```c
void k_poll_signal_init(struct k_poll_signal *sig);
```

初始化轮询信号的对象，作为轮询事件的触发。准备好一个轮询的对象，可以通过`k_poll_signal_raise()`接口发送信号。

**参数说明**

| 字段 | 说明           |
| ---- | -------------- |
| sig  | 轮询信号的对象 |

<br/>

### k_poll_signal_raise

```c
int k_poll_signal_raise(struct k_poll_signal *sig, int result);
```

该函数接口准备轮询信号，该信号基本上是`K_POLL_TYPE_SIGNAL`信号类型的轮询事件。如果有线程正在轮询该事件，则该线程可以跳出poll阻塞往下执行。轮询信号包含的“signaled”字段，由`k_poll_signal_raise()`设置时，该字段值不变，直到用户使用`k_poll_signal_reset()`将其设置回0，因此，在再次传递给`k_poll()`之前，用户必须对其进行重置，否则`k_poll()`将认为它已发出信号，并将立即返回。

接口成功返回0，非0表示失败。

**参数说明**

| 字段   | 说明                       |
| ------ | -------------------------- |
| sig    | 轮询信号的对象             |
| result | 赋值给信号对象的result字段 |

<br/>

### k_poll_signal_reset

```c
void k_poll_signal_reset(struct k_poll_signal *sig);
```

复位信号对象。在被 poll 捕获前，都可以使用该接口函数进行复位。

**参数说明**

| 字段 | 说明           |
| ---- | -------------- |
| sig  | 轮询信号的对象 |

<br/>

### k_poll_signal_check

```c
void k_poll_signal_check(struct k_poll_signal *sig, unsigned int *signaled, int *result);
```

获取轮询的信号对象的状态和 result 值。

**参数说明**

| 字段     | 说明                                         |
| -------- | -------------------------------------------- |
| sig      | 轮询信号的对象                               |
| signaled | 收到信号的对象，该值将为非零                 |
| result   | 收到信号的对象，该值有意义，否则该值无意义。 |

更多`Poll API`接口 可以在zephyr官网[Async polling APIs](https://docs.zephyrproject.org/latest/doxygen/html/group__poll__apis.html)中找到。

<br/>

## Poll的使用

注意：使用Poll功能，需要配置`CONFIG_POLL`宏定义。如何配置可以参考[设置Kconfig配置](../../build/kconfig/Kconfig_configuration.md)及对应板块的其他文档描述。

### 内核对象作为 poll 条件

初始化 poll 条件
```c
struct k_poll_event events[2];

void poll_init(void)
{
    /* 将my_sem做为poll条件，注意my_sem，需要单独初始化 */
    k_poll_event_init(&events[0],
                      K_POLL_TYPE_SEM_AVAILABLE,
                      K_POLL_MODE_NOTIFY_ONLY,
                      &my_sem);

    /* 将my_fifo做为poll条件，注意my_fifo，需要单独初始化 */
    k_poll_event_init(&events[1],
                      K_POLL_TYPE_FIFO_DATA_AVAILABLE,
                      K_POLL_MODE_NOTIFY_ONLY,
                      &my_fifo);
}
```
以上初始化也可以用下面方式代替, 同样注意my_sem和my_fifo需要单独初始化
```c
struct k_poll_event events[2] = {
    K_POLL_EVENT_STATIC_INITIALIZER(K_POLL_TYPE_SEM_AVAILABLE,
                                    K_POLL_MODE_NOTIFY_ONLY,
                                    &my_sem, 0),
    K_POLL_EVENT_STATIC_INITIALIZER(K_POLL_TYPE_FIFO_DATA_AVAILABLE,
                                    K_POLL_MODE_NOTIFY_ONLY,
                                    &my_fifo, 0),
};
```

poll等待和处理

```c
void poll_thread(void)
{
    for(;;) {
        rc = k_poll(events, 2, K_FOREVER);
        if (events[0].state == K_POLL_STATE_SEM_AVAILABLE) {
            k_sem_take(events[0].sem, K_NO_WAIT);
            /* handle sem */
        } else if (events[1].state == K_POLL_STATE_FIFO_DATA_AVAILABLE) {
            data = k_fifo_get(events[1].fifo, K_NO_WAIT);
            /* handle data */
        }
        events[0].state = K_POLL_STATE_NOT_READY;
        events[1].state = K_POLL_STATE_NOT_READY;
    }
}
```
### poll 信号处理

**线程A poll信号是否发送**

```c
/*定义一个poll signal信号*/
struct k_poll_signal signal;

void thread_A(void){
    /*初始化信号，并将其作为poll条件*/
    k_poll_signal_init(&signal);
    
    /*初始化poll event条件*/
    struct k_poll_event events[1] = {
        K_POLL_EVENT_INITIALIZER(K_POLL_TYPE_SIGNAL,
                                 K_POLL_MODE_NOTIFY_ONLY,
                                 &signal),
    };

    while(1){
            k_poll(events, 1, K_FOREVER);

            if (events[0].signal->result == 0x1337) {
                printk("get signal");
            } else {
                 printk("weird error");
            }

            /*在循环中调用 k_poll() 时，用户必须将event的state态重置为K_POLL_STATE_NOT_READY*/
            events[0].signal->signaled = 0;
            events[0].state = K_POLL_STATE_NOT_READY;
    }
}
```

**线程 B 发送signal信号触发event**

```c
void thread_B(void)
{
    k_poll_signal_raise(&signal, 0x1337);
}
```
:::tip 
本章节讲解的同步之轮询内容在`csk6 sdk`中提供具体的实现sample，开发者可以根据以上参考代码完成轮询的应用实现，以提升开发熟练度。
::: 
