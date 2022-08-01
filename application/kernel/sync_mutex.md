# 线程间同步之互斥量
## 概述

互斥量(Mutex)是表现互斥现象的数据结构，本质上是一把锁，提供对资源的独占访问，通常作为保护多线程的临界区，当线程需要访问临界区时，调用`k_mutex_lock`，如果当前互斥量是解锁状态，则调用成功，调用线程可自由进入临界区，如果互斥量已经枷锁，调用线程会被阻塞，知道临界区中所有的线程完成并调用`k_mutex_unlock`。

互斥量有以下特性：
- Mutex只能用于线程之间，不能用于中断中。
- Mutex unlock时会引发调度。
- 低优先级线程获取锁后有高优先级线程等锁时会引起优先级翻转。

本章节在上个章节-同步之信号量基础上讲解互斥量的使用场景和使用方法，通过本章节学习，开发者可以了解到：
- 互斥量的基本信息和使用场景
- 互斥量的使用方法

## 互斥量的使用

### 常用API接口

### K_MUTEX_DEFINE

```c
K_MUTEX_DEFINE(name)
```

静态定义并初始化互斥量。使用互斥量需要包含头文件`#include <zephyr/kernel.h>`。该互斥量可以在定义的模块之外去使用，但是需要做如下声明：

```c
 extern struct k_mutex <name>;
```

**参数说明**

| 字段 | 说明       |
| ---- | ---------- |
| name | 互斥量名字 |

<br/>

### k_mutex_init

```c
int k_mutex_init(struct k_mutex *mutex);
```

初始化互斥锁，互斥量在使用之前必须先进行初始化，与`K_MUTEX_DEFINE`的区别是`k_mutex_init`使用的互斥量需要先进行声明定义。

成功返回0，失败返回非0。

**参数说明**

| 字段  | 说明                                               |
| ----- | -------------------------------------------------- |
| mutex | 互斥量指针，这里传入的互斥量指针需要先进行声明定义 |

<br/>

### k_mutex_lock

```c
int k_mutex_lock(struct k_mutex *mutex, k_timeout_t timeout);
```

加锁互斥锁。如果互斥锁被另一个线程锁定，则调用线程将等待，直到互斥锁可用或发生超时。允许线程加锁已锁定的互斥锁，操作立即完成，锁计数量增加1。不能在中断服务函数中加锁。

**参数说明**

| 字段    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| mutex   | 互斥量指针                                                   |
| timeout | 加锁互斥锁的超时时间，或者可以指定设置成`K_NO_WAIT`或`K_FOREVER` |

**返回值说明**

| 返回值  | 说明                 |
| ------- | -------------------- |
| 0       | 成功加锁            |
| -EBUSY  | 函数未等待就立即返回 |
| -EAGAIN | 加锁超时             |

<br/>

### k_mutex_unlock

```c
void k_mutex_unlock(struct k_mutex *mutex);
```

释放互斥锁。释放的互斥锁必须已经被加锁。由于所有权和优先级继承原因，在中断服务程序中可能无法释放互斥锁，互斥量只能在线程中操作。

**参数说明**

| 字段  | 说明       |
| ----- | ---------- |
| mutex | 互斥量指针 |

**返回值说明**

| 返回值  | 说明                 |
| ------- | -------------------- |
| 0       | 成功释放互斥锁             |
| -EPERM  | 当前线程未拥有互斥量 |
| -EINVAL | 互斥量未被锁定       |

更多`Mutex API`接口 可以在zephyr官网[Mutex APIs](https://docs.zephyrproject.org/latest/doxygen/html/group__mutex__apis.html)中找到。

<br/>

### 使用例程

注意使用互斥量需要包含头文件`#include <zephyr/kernel.h>`。

以下是互斥量使用例程，两个线程都要访问同一个IO资源，但IO同时只能被独占访问，因此需要使用互斥量来实现，实现代码如下：

**互斥量初始化**

一个互斥量使用一个类型为 k_mutex 的变量定义，有两种方式可以完成互斥量的初始化：

- 方法1，使用宏：
```c
K_MUTEX_DEFINE(my_mutex);
```

- 方法2，使用函数 
```c
struct k_mutex my_mutex;
k_mutex_init(&my_mutex);
```

**加锁和解锁互斥量**

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
本章节讲解的同步之互斥量内容在`csk6 sdk`中提供具体的实现sample，开发者可以根据以上参考代码完成轮询的应用实现，以提升开发熟练度。
::: 
