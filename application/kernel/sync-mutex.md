# 互斥量
## 概述
本章节在上个章节-同步之信号量基础上讲解互斥量的使用场景和使用方法，通过本章节学习，开发者可以了解到：
- 互斥量的基本信息和使用场景
- 互斥量的使用方法

互斥量(Mutex)是表现互斥现象的数据结构，本质上是一把锁，提供对资源的独占访问，通常作为保护多线程的临界区，当线程需要访问临界区时，调用`k_mutex_lock`，如果当前互斥量是解锁状态，则调用成功，调用线程可自由进入临界区，如果互斥量已经枷锁，调用线程会被阻塞，知道临界区中所有的线程完成并调用`k_mutex_unlock`。

互斥量有以下特性：
- Mutex只能用于线程之间，不能用于ISR中。
- Mutex unlock时会引发调度。
- 低优先级线程获取锁后有高优先级线程等锁时会引起优先级倒置。

## 常用API接口
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

## 互斥量的使用
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
:::tip 
本章节同步之互斥量内容不在`csk6 sdk`中提供具体的实现sample，开发者可以根据互斥量的使用参考尝试完成应用开发和探索，以提升开发熟练度。
::: 
