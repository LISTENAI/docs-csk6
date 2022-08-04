# 轮询
## 概述

轮询(poll)是一个比较特殊的内核对象，polling API允许一个线程等待一个或者多个条件满足。支持的条件类型只能是内核对象，可以是Semaphore, FIFO, poll signal三种。
例如一个线程使用polling API同时等待多个semaphore，只要其中一个semaphore触发时polling API就会得到通知。
poll具有以下特性：
- 当一个线程等待多个触发条件时，只要有一个条件满足k_poll就会返回。
- 当semaphore或FIFO满足条件后, k_poll只是接到通知返回，线程并未获取到semaphore或FIFO, 还需要使用代码主动获取。

本章节在上个章节-同步之互斥量基础上讲解轮询的使用场景和使用方法，通过本章节学习，开发者可以了解到：
- 轮询的基本信息和使用场景
- 轮询的使用方法


## 常用API接口
```c
/*初始化一个k_poll_event实例*/
void k_poll_event_init(struct k_poll_event * event, uint32_t type, int mode, void * obj)	

/*轮询k_poll_event实例,等待触发条件*/
int k_poll(struct k_poll_event * events, int num_events, k_timeout_t timeout)	

/*初始化poll signal信号，作为poll event的触发*/
void k_poll_signal_init(struct k_poll_signal * sig)	

/*发送poll signal信号*/
int k_poll_signal_raise(struct k_poll_signal * sig, int result)	

/*清除signal信号，如果signal被发送，但还未被poll前，都可以使用该API reset清除*/
void k_poll_signal_reset(struct k_poll_signal * sig)

/*获取signal信号的状态和值*/
void k_poll_signal_check(struct k_poll_signal * sig, unsigned int * signaled, int * result)	

```
更多`Poll API`接口 可以在zephyr官网[Async polling APIs](https://docs.zephyrproject.org/latest/doxygen/html/group__poll__apis.html)中找到。

## Poll的使用  
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