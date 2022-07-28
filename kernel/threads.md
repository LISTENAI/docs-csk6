# 线程
## 概述


本节主要描述线程的创建、调度和删除。

线程作为一个内核对象，用于应用程序处理过于冗余复杂的应用程序。

应用程序可以定义任意数量的线程(受RAM的限制)。每个线程都可通过线程 id进行引用，这个线程 id 是在线程产生时分配的。


线程具有以下关键属性:

- 栈区域：用于线程的栈区域。Zephyr提供一些宏来定义线程栈区域。
- 线程控制块：用于管理线程的一个数据结构。详见[k_thread](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread%20%22k_thread%22)。
- 入口函数：线程启动时调用的函数。该函数最多能接收 3 个参数。
- 调度优先级：指示内核的调度器如何给该线程分配 CPU 时间。
- 启动时延：线程在启动前需要等待的时间。

## 生命周期

### 线程创建



线程必须先创建、再使用。创建线程时，内核将初始化线程栈区域的控制块区域以及栈底。栈区域的其它部分通常都是未初始化的。


如果线程的启动时延是[K_NO_WAIT](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_NO_WAIT%20%22K_NO_WAIT%22)，内核将立即启动线程。也可以指定一个超时时间，让内核延迟启动该线程。例如，让线程需要使用的设备就绪后再启动线程。


如果延迟启动的线程还未启动，内核可以取消该线程。如果线程已经启动了，则内核在尝试取消它时不会有任何效果。如果延迟启动的线程被成功地取消了，它必须被再次创建后才能再次使用。

## 实现

### 线程结束


线程一旦启动，它通常会一直运行下去。不过，线程也可以从它的入口点函数中返回，从而结束执行。这种结束方式叫做 **正常结束(terminaltion)**。


正常结束的线程需要在返回前释放它所拥有的共享资源(例如互斥量、动态分配的内存)。内核不会自动回收这些资源。


在某些情况下，一个线程想睡眠直到另外一个线程结束。这个功能可以通过[k_thread_join()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_join%20%22k_thread_join%22)来实现。这将阻塞调用线程，直到超时到期、目标线程退出或目标线程中止(由于[k_thread_abort()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_abort%20%22k_thread_abort%22)调用或触发致命错误)。


一旦线程结束，内核保证不会使用该线程结构。这块结构的内存可被重用于任何目的，包括创建新线程。

不建议使用内部逻辑信号来判断线程是否结束，这样不能保证线程完全终止，内核可能仍在使用该线程结构的内存，出现竞争条件。在正常情况下，应用程序代码应该使用 [k_thread_join()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_join%20%22k_thread_join%22) 或 [k_thread_abort()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_abort%20%22k_thread_abort%22) 同步的结束，而不依赖于应用程序逻辑内部的信号。

### 线程中止


线程可以通过 **异常中止 (aborting)** 异步结束其执行。如果线程触发了一个致命错误(例如引用了空指针)，内核将自动中止该线程。


其它线程(或线程自己)可以调用 [k_thread_abort()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_abort%20%22k_thread_abort%22)中止一个线程。不过，更优雅的做法是向线程发送一个信号，让该线程自己结束执行。


线程结束时，内核不会自动回收该线程拥有的共享资源。

### 线程挂起 


如果一个线程被挂起(suspended)，它将在若干周期内内暂停执行。函数[k_thread_suspend()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_suspend%20%22k_thread_suspend%22)可以用于挂起包括调用线程在内的所有线程。对已经挂起的线程再次挂起时不会产生任何效果。


线程一旦被挂起，它将一直不能被调度，除非另一个线程调用[k_thread_resume()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_resume%20%22k_thread_resume%22)取消挂起。


:::note
线程可以使用[k_sleep()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_sleep%20%22k_sleep%22)睡眠一段指定的时间。不过，这与挂起不同，睡眠线程在睡眠时间完成后会自动运行。
:::

### 线程状态


如果一个线程没有其他条件阻止它运行，则可认为该线程处于**就绪状态**，具备被调度为当前线程的条件。


有下面因素可以让线程处于未就绪态：

- 该线程未开始
- 该线程在阻塞等待其他条件(比如该线程正在等待获取信号量)
- 该线程等待超时执行
- 该线程已经被挂起
- 该线程已经结束或中止

![Thread States](https://docs.zephyrproject.org/latest/_images/thread_states.svg)

## 线程栈对象


每个线程都需有一块独占的内存块保存线程的上下文。


根据配置的不同，有几个必须满足的约束条件：

- 可能需要为用于内存管理的结构体保留额外的内存
- 如果启用了基于保护的栈溢出检测，则必须在栈缓冲区的前面设置一个小的写保护内存管理区域来捕获溢出。



因此，可移植代码不能简单地将缓冲区传递给[k_thread_create()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_create%20%22k_thread_create%22)。需要使用实例化堆栈的特殊宏，以`K_KERNEL_STACK`和`K_THREAD_STACK`为前缀。

### 内核栈


如果一个线程永远不会在用户模式下运行，或者堆栈被用于处理中断等特殊情况，最好是使用`K_KERNEL_STACK`宏来定义堆栈。


这些堆栈节省内存，因为一个MPU区域将永远不需要被编程来覆盖堆栈本身，而且内核将不需要为特权提升堆栈或只属于用户模式线程的内存管理数据结构预留额外的空间。

### 线程栈


如果一个堆栈需要承载用户线程，或者无法确定，就用`K_THREAD_STACK`宏定义堆栈。这可能会使用更多的内存，但堆栈对象适合承载用户线程。

在没有配置`CONFIG_USERSPACE`的情况下，线程栈等同于内核栈。

### 线程优先级


线程的优先级是一个整数值，可以是非负数或负数的。数值较低的优先级优先于数值较高的值。例如，优先级为4的线程A比优先级为7的线程B更高的优先级;同样，优先级为-2的线程C的优先级高于线程A和线程B。


调度程序根据每个线程的优先级区分两类线程：

- 协作式线程使用**负数**优先级数值。一旦变为当前线程，协作线程将会持续保留，直到它执行动作进入未就绪状态。
- 抢占线程的优先级是**非负数**。一旦变为当前线程，抢占线程可以被高优先级的抢占线程和协作线程抢占。


线程的初始优先级值可以在线程启动后更改。因此，通过改变优先级，一个可抢占式线程有可能成为一个协作式线程，反之亦然。


Zephyr内核可以支持无上限的优先级数。可以通过[CONFIG_NUM_COOP_PRIORITIES](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_NUM_COOP_PRIORITIES%20%22CONFIG_NUM_COOP_PRIORITIES%22)和[CONFIG_NUM_PREEMPT_PRIORITIES](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_NUM_PREEMPT_PRIORITIES%20%22CONFIG_NUM_PREEMPT_PRIORITIES%22)进行配置。产生以下可用的优先级范围:

- 协作式线程: (`-CONFIG_NUM_COOP_PRIORITIES` to -1
- 抢占式线程: 0 to (`CONFIG_NUM_PREEMPT_PRIORITIES` - 1)

![Thread Priorities](https://docs.zephyrproject.org/latest/_images/priorities.svg)


例如配置5个协作优先级和10个抢占优先级，其取值范围分别为-5 ~ -1和0 ~ 9。



## 线程自定义数据


每个线程都有一个32位的自定义数据区，只有线程自己可以访问，应用程序可以选择用于任何目的。线程的默认自定义数据值为零。

:::note
ISRs不支持自定义数据，因为它们在一个共享内核中断处理上下文中操作。
:::


默认情况下，线程自定义数据支持是禁用的。可以使用配置选项`CONFIG_THREAD_CUSTOM_DATA`来启用支持。


`k_thread_custom_data_set()`和`k_thread_custom_data_get()`函数分别用于写入和读取线程的自定义数据。一个线程只能访问它自己的自定义数据，而不能访问其他线程的数据。


下面的代码使用自定义数据特性来记录每个线程调用特定例程的次数。

```c
int call_tracking_routine(void)
{
    uint32_t call_count;

    if (k_is_in_isr()) {
        /* ignore any call made by an ISR */
    } else {
        call_count = (uint32_t)k_thread_custom_data_get();
        call_count++;
        k_thread_custom_data_set((void *)call_count);
    }

    /* do rest of routine's processing */
    ...
}
```


使用线程自定义数据，允许在线程的上下文中访问线程特定的信息，方法是将自定义数据作为指针传递给线程。