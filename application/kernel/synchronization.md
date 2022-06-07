# 线程间同步

## 概述

在zephyr系统中，多线程同时运行时会被调度器同时调度，从系统层面来看线程是并行运行，系统对并行运行的线程有先后执行的要求，多线程间需要资源共享或配合时就需要线程同步功能。嵌入式操作系统都会提供线程同步手段，Zephyr也不例外，Zephyr提供了信号量，互斥锁，轮询三种内核对象作为多线程同步的方式。

## 信号量(Semaphores)
信号量是用于控制多个线程对一组资源的访问，使用信号量在生产者(ISR/Thread)和消费者(thread)之间同步。
信号量有以下特性：
- Zephyr的信号量在初始化时可以指定初始化计数值和最大计数值，生产者give时计数值+1，但不会超过最大值，消费者take时计数值-1，直到为0。
- 每次信号量give都会引发调度。
- 如果多个线程都在等待信号量，新产生的信号量会被等待时间最长的最高优先级线程接收。

### 常用API接口
```c
/*初始化信号量*/
K_SEM_DEFINE(name, initial_count, count_limit )	
/*初始化信号量*/
int k_sem_init(struct k_sem * sem, unsigned int initial_count, unsigned int limit)
/*等待信号量*/
int k_sem_take(struct k_sem * sem, k_timeout_t timeout)	
/*发送信号量*/
void k_sem_give(struct k_sem * sem)
```
更多`Semaphore API`接口 可以在zephyr官网[Semaphore APIS](https://docs.zephyrproject.org/latest/doxygen/html/group__semaphore__apis.html)中找到。

### 信号量的使用
以下是一个信号量使用例程，该示例创建了一个动态信号量，初始化两个线程，其中一个线程发送信号量，另一个线程接收信号量并执行相应的操作。实现代码如下：
**信号量初始化**
一个信号量使用一个类型为 k_sem 的变量定义，有两种方式可以完成信号量的初始化：     

- 方法1，使用宏：
```c
K_SEM_DEFINE(my_sem, 0, 1);
```

- 方法2，使用函数 
```c
struct k_sem my_sem;

k_sem_init(&my_sem, 0, 1);
```

**发送信号量**  
在thread或者ISR中发送信号量。
```c
void productor_thread(void *arg)
{
    ...
    uint8_t count = 0;
    while(1){
        if(ciunt <= 100){
            count++;     
        }else{
            return;
        }
        /* count 每计数 20 次，释放一次信号量 */
        if(0 == (count % 20)){
            k_sem_give(&my_sem);
            printk("productor thread give semaphore");
        }
    }
}
```
**接收信号量**
一般情况下接收信号量的thread是消费者。
```c
void consumer_thread(void)
{
    ...
    uint8_t number = 0;
    while(1){
        /* 等待信号量，获取到信号量，则执行 number 自加的操作 */
        if (k_sem_take(&my_sem, K_MSEC(50)) != 0) {
            printk("Input data not available!");
        } else {
            number++;
            printk("consumer thread number %d ", number);
        }
    }
}
```

**运行结果**
```
*** Booting Zephyr OS build  ***
productor thread give semaphore  
consumer thread number 1 
productor thread give semaphore  
consumer thread number 2 
productor thread give semaphore  
consumer thread number 3  
productor thread give semaphore  
consumer thread number 4  
productor thread give semaphore  
consumer thread number 5 
```

:::note
以上是信号量的基本使用示例，csk6 sdk中也提供了一个信号量的使用sample，路径`samples-->synchronization`，可使用`lisa zep create`命令完成sample创建。
:::

## 互斥量(Mutex)
### 概述
互斥量是表现互斥现象的数据结构，本质上是一把锁，提供对资源的独占访问，通常作为保护多线程的临界区，当线程需要访问临界区时，调用`k_mutex_lock`，如果当前互斥量是解锁状态，则调用成功，调用线程可自由进入临界区，如果互斥量已经枷锁，调用线程会被阻塞，知道临界区中所有的线程完成并调用`k_mutex_unlock`。

互斥量有以下特性：
- Mutex只能用于线程之间，不能用于ISR中。
- Mutex unlock时会引发调度。
- 低优先级线程获取锁后有高优先级线程等锁时会引起优先级倒置。

### 常用API接口
```c
/*初始化互斥量*/
#define K_MUTEX_DEFINE(name)	

/*初始化互斥量*/
int k_mutex_init(struct k_mutex * mutex)	

/*加锁互斥量*/
int k_mutex_lock(struct k_mutex * mutex, k_timeout_t timeout)

/*解锁互斥量*/
void k_mutex_unlock(struct k_mutex * mutex)
```
更多`Mutex API`接口 可以在zephyr官网[Mutex APIs](https://docs.zephyrproject.org/latest/doxygen/html/group__mutex__apis.html)中找到。

### 互斥量的使用
以下是互斥量使用例程，两个线程都要访问同一个IO资源，但IO同时只能被独占访问，因此需要使用互斥量来实现，实现代码如下：
**互斥量初始化**
一个互斥量使用一个类型为 k_mutex 的变量定义，有两种方式可以完成信号量的初始化：     

- 方法1，使用宏：
```c
K_MUTEX_DEFINE(my_mutex);
```

- 方法2，使用函数 
```c
struct k_mutex my_mutex;
k_mutex_init(&my_mutex);
```

**加锁和解锁信号量**       
```c
#define LED0_NODE_ID DT_NODELABEL(gpioa)
#define PIN	5
#define FLAGS 0

#define A_STACK_SIZE 4096
#define B_STACK_SIZE 4096

K_THREAD_STACK_DEFINE(thread_a_area, A_STACK_SIZE);
K_THREAD_STACK_DEFINE(thread_b_area, B_STACK_SIZE);

struct k_thread thread_a_data;
struct k_thread thread_b_data;

void main(void)
{
    ...
    dev = DEVICE_DT_GET(LED0_NODE_ID);
    ret = gpio_pin_configure(dev, PIN, GPIO_OUTPUT_ACTIVE | FLAGS);
    ...

    struct k_mutex my_mutex;
    k_mutex_init(&my_mutex);
    ...

    /* create thread_a and thread_b */
    int pri = k_thread_priority_get(k_current_get());
    k_thread_create(&thread_a_data, thread_a_area,
                    K_THREAD_STACK_SIZEOF(thread_a_area),
                    thread_a, NULL, NULL, NULL, pri, 0, K_NO_WAIT);

    k_thread_create(&thread_b_data, thread_b_area,
                    K_THREAD_STACK_SIZEOF(thread_b_area), 
                    thread_b, NULL,NULL, NULL, pri, 0, K_NO_WAIT);
}

/*线程A操作IO时对互斥量的操作*/
thread_a()
{
    k_mutex_lock(&my_mutex, K_FOREVER);

    /*操作GPIO*/
    gpio_pin_set(dev, PIN, 1);

    k_mutex_unlock(&my_mutex);
}

/*线程B操作IO时对互斥量的操作*/
thread_b()
{
    k_mutex_lock(&my_mutex, K_FOREVER);

    /*操作GPIO*/
    gpio_pin_set(dev, PIN, 0);

    k_mutex_unlock(&my_mutex);
}
```

## 轮询(poll)
### 概述
Async poll是一个比较特殊的内核对象，polling API允许一个线程等待一个或者多个条件满足。支持的条件类型只能是内核对象，可以是Semaphore, FIFO, poll signal三种。
例如一个线程使用polling API同时等待多个semaphore，只要其中一个semaphore触发时polling API就会得到通知。
poll具有以下特性：
- 当一个线程等待多个触发条件时，只要有一个条件满足k_poll就会返回。
- 当semaphore或FIFO满足条件后, k_poll只是接到通知返回，线程并未获取到semaphore或FIFO, 还需要使用代码主动获取。

### 常用API接口
```c
/*初始化一个k_poll_event实例*/
void k_poll_event_init(struct k_poll_event * event,
uint32_t type, int mode, void * obj )	
/*轮询k_poll_event实例,等待触发条件*/
int k_poll(struct k_poll_event * events, int num_events, k_timeout_t timeout)	
/*初始化poll signal信号，作为poll event的触发*/
void k_poll_signal_init(struct k_poll_signal * sig)	
/*发送poll signal信号*/
int k_poll_signal_raise(struct k_poll_signal * sig,
int result)	
/*清除signal信号，如果signal被发送，但还未被poll前，都可以使用该API reset清除*/
void k_poll_signal_reset(struct k_poll_signal * sig)

/*获取signal信号的状态和值*/
void k_poll_signal_check(struct k_poll_signal * sig, unsigned int * signaled, int * result)	

```
更多`Poll API`接口 可以在zephyr官网[Async polling APIs](https://docs.zephyrproject.org/latest/doxygen/html/group__poll__apis.html)中找到。

### Poll的使用
```
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

// 线程 B 发送signal信号触发event
```c
void thread_B(void)
{
    k_poll_signal_raise(&signal, 0x1337);
}
```
