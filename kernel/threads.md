# 线程
# 概述

This section describes kernel services for creating, scheduling, and deleting independently executable threads of instructions.

A *thread* is a kernel object that is used for application processing that is too lengthy or too complex to be performed by an ISR.

Any number of threads can be defined by an application (limited only by available RAM). Each thread is referenced by a *thread id* that is assigned when the thread is spawned。

本节主要描述线程的创建、调度和删除。

线程作为一个内核对象，用于应用程序处理过于冗余复杂的应用程序。

应用程序可以定义任意数量的线程(受RAM的限制)。每个线程都可通过线程 id进行引用，这个线程 id 是在线程产生时分配的。

A thread has the following key properties:

- A **stack area**, which is a region of memory used for the thread’s stack. The **size** of the stack area can be tailored to conform to the actual needs of the thread’s processing. Special macros exist to create and work with stack memory regions.
- A **thread control block** for private kernel bookkeeping of the thread’s metadata. This is an instance of type [k_thread](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread%20%22k_thread%22).
- An **entry point function**, which is invoked when the thread is started. Up to 3 **argument values** can be passed to this function.
- A **scheduling priority**, which instructs the kernel’s scheduler how to allocate CPU time to the thread. (See [Scheduling](https://docs.zephyrproject.org/latest/kernel/services/scheduling/index.html#scheduling-v2).)
- A set of **thread options**, which allow the thread to receive special treatment by the kernel under specific circumstances. (See [Thread Options](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#thread-options-v2).)
- A **start delay**, which specifies how long the kernel should wait before starting the thread.

线程具有以下关键属性:

- 栈区域：用于线程的栈区域。Zephyr提供一些宏来定义线程栈区域。
- 线程控制块：用于管理线程的一个数据结构。详见`k_thread`。
- 入口函数：线程启动时调用的函数。该函数最多能接收 3 个参数。
- 调度优先级：指示内核的调度器如何给该线程分配 CPU 时间。
- 启动时延：线程在启动前需要等待的时间。

# 生命周期

## 线程创建

A thread must be created before it can be used. The kernel initializes the thread control block as well as one end of the stack portion. The remainder of the thread’s stack is typically left uninitialized.

线程必须先创建、再使用。创建线程时，内核将初始化线程栈区域的控制块区域以及栈的尾部。栈区域的其它部分通常都是未初始化的。

Specifying a start delay of [K_NO_WAIT](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_NO_WAIT%20%22K_NO_WAIT%22) instructs the kernel to start thread execution immediately. Alternatively, the kernel can be instructed to delay execution of the thread by specifying a timeout value – for example, to allow device hardware used by the thread to become available.

如果线程的启动时延是`K_NO_WAIT`，内核将立即启动线程。也可以指定一个超时时间，让内核延迟启动该线程。例如，让线程需要使用的设备就绪后再启动线程。

The kernel allows a delayed start to be canceled before the thread begins executing. A cancellation request has no effect if the thread has already started. A thread whose delayed start was successfully canceled must be re-spawned before it can be used.

如果延迟启动的线程还未启动，内核可以取消该线程。如果线程已经启动了，则内核在尝试取消它时不会有如何效果。如果延迟启动的线程被成功地取消了，它必须被再次创建后才能再次使用。

# 代码实现

## 线程结束

Once a thread is started it typically executes forever. However, a thread may synchronously end its execution by returning from its entry point function. This is known as **termination**.

线程一旦启动，它通常会一直运行下去。不过，线程也可以从它的入口点函数中返回，从而结束执行。这种结束方式叫做 **正常结束（terminaltion）**。

A thread that terminates is responsible for releasing any shared resources it may own (such as mutexes and dynamically allocated memory) prior to returning, since the kernel does *not* reclaim them automatically.

正常结束的线程需要在返回前释放它所拥有的共享资源（例如互斥量、动态分配的内存）。内核不会自动回收这些资源。

In some cases a thread may want to sleep until another thread terminates. This can be accomplished with the [k_thread_join()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_join%20%22k_thread_join%22) API. This will block the calling thread until either the timeout expires, the target thread self-exits, or the target thread aborts (either due to a [k_thread_abort()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_abort%20%22k_thread_abort%22) call or triggering a fatal error).

在某些情况下，一个线程想休眠直到另外一个线程结束。这个功能可以通过`k_thread_join()` 来实现。这将阻塞调用线程，直到超时到期、目标线程退出或目标线程中止(由于`k_thread_abort()`调用或触发致命错误)。

Once a thread has terminated, the kernel guarantees that no use will be made of the thread struct. The memory of such a struct can then be re-used for any purpose, including spawning a new thread. 

Note that the thread must be fully terminated, which presents race conditions where a thread’s own logic signals completion which is seen by another thread before the kernel processing is complete. Under normal circumstances, application code should use [k_thread_join()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_join%20%22k_thread_join%22) or [k_thread_abort()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_abort%20%22k_thread_abort%22) to synchronize on thread termination state and not rely on signaling from within application logic.

一旦线程结束，内核保证不会使用该线程结构。这块结构的内存可被重用于任何目的，包括创建新线程。

注意，线程必须完全终止，否则将出现竞争条件，即线程自己的逻辑信号在内核处理完成之前被另一个线程看到完成。在正常情况下，应用程序代码应该使用`k_thread_join()`或`k_thread_abort()`在线程终止结束上进行同步，而不依赖于应用程序逻辑内部的信号。

## 线程终止 Thread Aborting

A thread may asynchronously end its execution by **aborting**. The kernel automatically aborts a thread if the thread triggers a fatal error condition, such as dereferencing a null pointer.

线程可以通过 **异常终止 （aborting）** 异步结束其执行。如果线程触发了一个致命错误（例如引用了空指针），内核将自动终止该线程。

A thread can also be aborted by another thread (or by itself) by calling [k_thread_abort()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_abort%20%22k_thread_abort%22). However, it is typically preferable to signal a thread to terminate itself gracefully, rather than aborting it.

其它线程（或线程自己）可以调用 `k_thread_abort()` 终止一个线程。不过，更优雅的做法是向线程发送一个信号，让该线程自己结束执行。

As with thread termination, the kernel does not reclaim shared resources owned by an aborted thread.

线程终止时，内核不会自动回收该线程拥有的共享资源。

## 线程挂起 Thread Suspension

A thread can be prevented from executing for an indefinite period of time if it becomes **suspended**. The function [k_thread_suspend()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_suspend%20%22k_thread_suspend%22) can be used to suspend any thread, including the calling thread. Suspending a thread that is already suspended has no additional effect.

如果一个线程被挂起（suspended），它将在若干周期内内暂停执行。函数`k_thread_suspend()`可以用于挂起包括调用线程在内的所有线程。对已经挂起的线程再次挂起时不会产生任何效果。

Once suspended, a thread cannot be scheduled until another thread calls [k_thread_resume()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_resume%20%22k_thread_resume%22) to remove the suspension.

线程一旦被挂起，它将一直不能被调度，除非另一个线程调用 `k_thread_resume()` 取消挂起。

NOTE：A thread can prevent itself from executing for a specified period of time using [k_sleep()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_sleep%20%22k_sleep%22). However, this is different from suspending a thread since a sleeping thread becomes executable automatically when the time limit is reached.

注解：线程可以使用 k_sleep() 睡眠一段指定的时间。不过，这与挂起不同，睡眠线程在睡眠时间完成后会自动运行。

## 线程状态 Thread States

A thread that has no factors that prevent its execution is deemed to be **ready**, and is eligible to be selected as the current thread.

如果一个线程没有其他条件阻止它运行，则可认为该线程处于就绪态，是可以运行的。

A thread that has one or more factors that prevent its execution is deemed to be **unready**, and cannot be selected as the current thread.

不译

The following factors make a thread unready:

- The thread has not been started.
- The thread is waiting for a kernel object to complete an operation. (For example, the thread is taking a semaphore that is unavailable.)
- The thread is waiting for a timeout to occur.
- The thread has been suspended.
- The thread has terminated or aborted.

有下面因素可以让线程处于未就绪态：

- 该线程未开始
- 该线程在阻塞等待其他条件（比如该线程正在等待获取信号量）
- 该线程等待超时执行
- 该线程已经被挂起
- 该线程已经结束或终止

![Thread States](https://docs.zephyrproject.org/latest/_images/thread_states.svg)

# 线程栈对象 Thread Stack objects

Every thread requires its own stack buffer for the CPU to push context.

每个线程都需有一块独占的内存块保存线程的上下文。

Depending on configuration, there are several constraints that must be met:

- There may need to be additional memory reserved for memory management structures
- If guard-based stack overflow detection is enabled, a small write- protected memory management region must immediately precede the stack buffer to catch overflows.
- If userspace is enabled, a separate fixed-size privilege elevation stack must be reserved to serve as a private kernel stack for handling system calls.
- If userspace is enabled, the thread’s stack buffer must be appropriately sized and aligned such that a memory protection region may be programmed to exactly fit.

根据配置的不同，有几个必须满足的约束条件：

- 可能需要为内存管理结构保留额外的内存
- 如果启用了基于保护的堆栈溢出检测，则必须在堆栈缓冲区的前面立即设置一个小的写保护内存管理区域来捕获溢出。

The alignment constraints can be quite restrictive, for example some MPUs require their regions to be of some power of two in size, and aligned to its own size.

暂不译

Because of this, portable code can’t simply pass an arbitrary character buffer to [k_thread_create()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_create%20%22k_thread_create%22). Special macros exist to instantiate stacks, prefixed with K_KERNEL_STACK and K_THREAD_STACK.

因此，可移植代码不能简单地将缓冲区传递给`k_thread_create()`。需要使用实例化堆栈的特殊宏，以`K_KERNEL_STACK`和`K_THREAD_STACK`为前缀。

## 内核栈 Kernel-only Stacks

If it is known that a thread will never run in user mode, or the stack is being used for special contexts like handling interrupts, it is best to define stacks using the K_KERNEL_STACK macros.

如果一个线程永远不会在用户模式下运行，或者堆栈被用于处理中断等特殊情况，最好是使用`K_KERNEL_STACK`宏来定义堆栈。

These stacks save memory because an MPU region will never need to be programmed to cover the stack buffer itself, and the kernel will not need to reserve additional room for the privilege elevation stack, or memory management data structures which only pertain to user mode threads.

这些堆栈节省内存，因为一个MPU区域将永远不需要被编程来覆盖堆栈本身，而且内核将不需要为特权提升堆栈或只属于用户模式线程的内存管理数据结构预留额外的空间。

## 线程栈 Thread stacks

If it is known that a stack will need to host user threads, or if this cannot be determined, define the stack with K_THREAD_STACK macros. This may use more memory but the stack object is suitable for hosting user threads.

如果一个堆栈需要承载用户线程，或者无法确定，就用K_THREAD_STACK宏定义堆栈。这可能会使用更多的内存，但堆栈对象适合承载用户线程。

在没有配置`CONFIG_USERSPACE`的情况下，线程栈等同于内核栈。

## 线程优先级 Thread Priorities

A thread’s priority is an integer value, and can be either negative or non-negative. Numerically lower priorities takes precedence over numerically higher values. For example, the scheduler gives thread A of priority 4 *higher* priority over thread B of priority 7; likewise thread C of priority -2 has higher priority than both thread A and thread B.

线程的优先级是一个整数值，可以是非负数或负数的。数值较低的优先级优先于数值较高的值。例如，优先级为4的线程A比优先级为7的线程B更高的优先级;同样，优先级为-2的线程C的优先级高于线程A和线程B。

The scheduler distinguishes between two classes of threads, based on each thread’s priority.

- A *cooperative thread* has a negative priority value. Once it becomes the current thread, a cooperative thread remains the current thread until it performs an action that makes it unready.
- A *preemptible thread* has a non-negative priority value. Once it becomes the current thread, a preemptible thread may be supplanted at any time if a cooperative thread, or a preemptible thread of higher or equal priority, becomes ready.

调度程序根据每个线程的优先级区分两类线程：

- 协作式线程使用负数优先级数值。一旦变为当前线程，协作线程将会持续保留，直到它执行动作进入未就绪状态。
- 抢占线程的优先级是**非负数。**一旦变为当前线程，抢占线程可以被高优先级的抢占线程和协作线程抢占。

A thread’s initial priority value can be altered up or down after the thread has been started. Thus it is possible for a preemptible thread to become a cooperative thread, and vice versa, by changing its priority.

线程的初始优先级值可以在线程启动后更改。因此，通过改变优先级，一个可抢占式线程有可能成为一个协作式线程，反之亦然。

The kernel supports a virtually unlimited number of thread priority levels. The configuration options [CONFIG_NUM_COOP_PRIORITIES](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_NUM_COOP_PRIORITIES%20%22CONFIG_NUM_COOP_PRIORITIES%22) and [CONFIG_NUM_PREEMPT_PRIORITIES](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_NUM_PREEMPT_PRIORITIES%20%22CONFIG_NUM_PREEMPT_PRIORITIES%22) specify the number of priority levels for each class of thread, resulting in the following usable priority ranges:

Zephyr内核可以支持无限上的优先级数。可以通过CONFIG_NUM_COOP_PRIORITIES 和CONFIG_NUM_PREEMPT_PRIORITIES 进行配置。产生以下可用的优先级范围:

- 协作式线程: (`-CONFIG_NUM_COOP_PRIORITIES` to -1
- 抢占式线程: 0 to (`CONFIG_NUM_PREEMPT_PRIORITIES` - 1)

![Thread Priorities](https://docs.zephyrproject.org/latest/_images/priorities.svg)

For example, configuring 5 cooperative priorities and 10 preemptive priorities results in the ranges -5 to -1 and 0 to 9, respectively.

例如配置5个协作优先级和10个抢占优先级，其取值范围分别为-5 ~ -1和0 ~ 9。



# 线程自定义数据 Thread Custom Data

Every thread has a 32-bit custom data area, accessible only by the thread itself, and may be used by the application for any purpose it chooses. The default custom data value for a thread is zero.

每个线程都有一个32位的自定义数据区，只有线程自己可以访问，应用程序可以选择用于任何目的。线程的默认自定义数据值为零。

NOTE：Custom data support is not available to ISRs because they operate within a single shared kernel interrupt handling context.

注意：ISRs不支持自定义数据，因为它们在一个共享内核中断处理上下文中操作。

By default, thread custom data support is disabled. The configuration option CONFIG_THREAD_CUSTOM_DATA can be used to enable support.

默认情况下，线程自定义数据支持是禁用的。可以使用配置选项`CONFIG_THREAD_CUSTOM_DATA`来启用支持。

The k_thread_custom_data_set() and k_thread_custom_data_get() functions are used to write and read a thread’s custom data, respectively. A thread can only access its own custom data, and not that of another thread.

`k_thread_custom_data_set()`和`k_thread_custom_data_get()`函数分别用于写入和读取线程的自定义数据。一个线程只能访问它自己的自定义数据，而不能访问其他线程的数据。

The following code uses the custom data feature to record the number of times each thread calls a specific routine.

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

Use thread custom data to allow a routine to access thread-specific information, by using the custom data as a pointer to a data structure owned by the thread.

通过使用自定义数据作为线程拥有的数据结构的指针，使用线程自定义数据允许例程访问线程特定的信息。