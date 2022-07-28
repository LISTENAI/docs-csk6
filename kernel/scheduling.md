# 调度

The kernel’s priority-based scheduler allows an application’s threads to share the CPU.

内核的调度器是基于优先级的，它允许多个应用程序线程共享 CPU。

## 概念

The scheduler determines which thread is allowed to execute at any point in time; this thread is known as the **current thread.**

调度器的主要作用是判断将要执行哪个线程。被调度器选定的线程叫做**当前线程(current thread)。**

There are various points in time when the scheduler is given an opportunity to change the identity of the current thread. These points are called **reschedule points**. Some potential reschedule points are:

- transition of a thread from running state to a suspended or waiting state, for example by **`[k_sem_take()](https://docs.zephyrproject.org/latest/kernel/services/synchronization/semaphores.html#c.k_sem_take)`** or **`[k_sleep()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_sleep)`**.
- transition of a thread to the [ready state](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#thread-states), for example by **`[k_sem_give()](https://docs.zephyrproject.org/latest/kernel/services/synchronization/semaphores.html#c.k_sem_give)`** or **`[k_thread_start()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_start)`**
- return to thread context after processing an interrupt
- when a running thread invokes **`[k_yield()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_yield)`**

调度器可以切换当前线程，这些时刻被称为**重调度点(reschedule points)**。

以下为一些重调度点：

- 线程从运行(running)状态转为挂起(suspended)状态或者等待(waiting)状态的时，比如调用 **`[k_sem_take()](https://docs.zephyrproject.org/latest/kernel/services/synchronization/semaphores.html#c.k_sem_take)`** 或 **`[k_sleep()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_sleep)`**.
- 线程转换为就绪(ready)状态时，比如调用 **`[k_sem_give()](https://docs.zephyrproject.org/latest/kernel/services/synchronization/semaphores.html#c.k_sem_give)`** 或 **`[k_thread_start()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_thread_start)`**.
- 处理中断后返回线程上下文.
- 当正在运行的线程调用时 **`[k_yield()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_yield)`**

A thread sleeps when it voluntarily initiates an operation that transitions itself to a suspended or waiting state.

当线程主动发起一个操作，将自己转换为挂起(suspend)或等待(waiting)状态时，线程就进入睡眠(sleep)状态。

Whenever the scheduler changes the identity of the current thread, or when execution of the current thread is replaced by an ISR, the kernel first saves the current thread’s CPU register values. These register values get restored when the thread later resumes execution.

无论什么时候，当调度器切换线程，或者当前线程被中断抢占，内核都会先保存当前线程的上下文。当这个线程被重新调度时，首先会恢复上下文。

## 调度算法

The kernel’s scheduler selects the highest priority ready thread to be the current thread. When multiple ready threads of the same priority exist, the scheduler chooses the one that has been waiting longest.

调度器会执行优先级最高的就绪线程。当多个优先级一样的就绪线程存在时，调度器会执行等待时间最长的线程。

A thread’s relative priority is primarily determined by its static priority. 

线程的相对优先级主要由它的静态优先级决定。

However, when both earliest-deadline-first scheduling is enabled (`CONFIG_SCHED_DEADLINE`) and a choice of threads have equal static priority, then the thread with the earlier deadline is considered to have the higher priority. Thus, when earliest-deadline-first scheduling is enabled, two threads are only considered to have the same priority when both their static priorities and deadlines are equal. The routine `k_thread_deadline_set()` is used to set a thread’s deadline.

然而，当使能最早截止时间优先调度算法(`CONFIG_SCHED_DEADLINE`)并且线程具有相同的静态优先级，调度器会执行截止时间最早的线程。因此，当使能了使能最早截止时间优先调度算法时，只有当两个线程的静态优先级和最后期限相等时，它们才被认为具有相同的优先级。使用`k_thread_deadline_set` 设置线程截止时间。

:::note

Execution of ISRs takes precedence over thread execution, so the execution of the current thread may be replaced by an ISR at any time unless interrupts have been masked. This applies to both cooperative threads and preemptive threads.

:::

:::note

中断执行优先于线程执行，因此，除非屏蔽了中断，否则中断随时可抢占当前线程。这适用于协作线程和抢占线程。

:::

The kernel can be built with one of several choices for the ready queue implementation, offering different choices between code size, constant factor runtime overhead and performance scaling when many threads are added.

内核选择不同实现的就绪(ready)队列来构建应用，当添加多个线程时，可以从代码大小，运行时间开销和性能扩展之间提供不同的选择：

- 单链表就绪队列 Simple linked-list ready queue (CONFIG_SCHED_DUMB)
    
    The scheduler ready queue will be implemented as a simple unordered list, with very fast constant time performance for single threads and very low code size. 
    
    调度器就绪队列使用简单的无序列表进行实现，优点为时间开销小，并且代码量少。
    
    This implementation should be selected on systems with constrained code size that will never see more than a small number (3, maybe) of runnable threads in the queue at any given time.
    
    因此内存敏感的系统且列队内只需要管理较少线程的情况下可选用该算法。
    
     On most platforms (that are not otherwise using the red/black tree) this results in a savings of ~2k of code size.
    
    节省大约2KB的代码空间。
    
- 红黑树就绪队列 Red/black tree ready queue (`CONFIG_SCHED_SCALABLE`)
    
    The scheduler ready queue will be implemented as a red/black tree. 
    
    调度器就绪队列使用红黑树实现。
    
    This has rather slower constant-time insertion and removal overhead, and on most platforms (that are not otherwise using the red/black tree somewhere) requires an extra ~2kb of code. 
    
    红黑树在插入，查询，删除三个操作上都有较大的时间开销。
    
    在Zephyr中大多数情况下使用红黑树会额外开销2KB的代码空间。
    
    The resulting behavior will scale cleanly and quickly into the many thousands of threads.
    
    红黑树可以干净（cleanly）而快速（quickly）地扩展到数千个线程中。
    
    Use this for applications needing many concurrent runnable threads (> 20 or so). Most applications won’t need this ready queue implementation.
    
    适用于需要很多并发运行线程的应用程序(>20)。
    
    大多数应用程序不需要这种就绪队列实现。
    
- 多链表队列 Traditional multi-queue ready queue (`CONFIG_SCHED_MULTIQ`)
    
    When selected, the scheduler ready queue will be implemented as the classic/textbook array of lists, one per priority (max 32 priorities).
    
    调度器就绪队列使用链表数组实现，由一个数组加多个链表组成。
    
    This corresponds to the scheduler algorithm used in Zephyr versions prior to 1.12.
    
    不译（大意说在Zephyr 1.12之前就是用的这种就绪队列）
    
    It incurs only a tiny code size overhead vs. the “dumb” scheduler and runs in O(1) time in almost all circumstances with very low constant factor. 
    
    与单链表调度器相比，它只会带来很小的代码开销，并且在几乎所有环境下时间复杂度为O(1)。
    
    But it requires a fairly large RAM budget to store those list heads, and the limited features make it incompatible with features like deadline scheduling that need to sort threads more finely, and SMP affinity which need to traverse the list of threads.
    
    但是它需要相当大的RAM来存储这些列表头，支持的特征有限，比如，不支持对截止时期(deadline)进行更精细排序。
    
    Typical applications with small numbers of runnable threads probably want the DUMB scheduler.
    
    少量可运行线程的应用程序使用单链表调度器即可。
    

The wait_q abstraction used in IPC primitives to pend threads for later wakeup shares the same backend data structure choices as the scheduler, and can use the same options.

`wait_q` 使用IPC原语抽象实现，用于存放等待该内核对象的线程。

可用下列配置：

- 可拓展wait_q Scalable wait_q implementation (CONFIG_WAITQ_SCALABLE)
    
    When selected, the wait_q will be implemented with a balanced tree. Choose this if you expect to have many threads waiting on individual primitives. 
    
    选中后，wait_q将使用平衡树实现。如果有许多线程等待单个原语(individual primitives)，则可以选择此选项。
    
    There is a ~2kb code size increase over **`[CONFIG_WAITQ_DUMB](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_WAITQ_DUMB)`**
     (which may be shared with **`[CONFIG_SCHED_SCALABLE](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_SCHED_SCALABLE)`**
    ) if the red/black tree is not used elsewhere in the application, and pend/unpend operations on “small” queues will be somewhat slower (though this is not generally a performance path).
    
    如果未在应用程序中的其他地方使用红黑树，则与 `[CONFIG_WAITQ_DUMB](https://docs.zephyrproject.org/latest/reference/kconfig/CONFIG_WAITQ_DUMB.html#cmdoption-arg-CONFIG_WAITQ_DUMB)`
    
    相比，代码大小增加了约 2KB。在“小”队列上执行暂挂/取消暂挂操作会稍微慢一些。
    
- 单链表wait_q Simple linked-list wait_q (CONFIG_WAITQ_DUMB)
    
    When selected, the wait_q will be implemented with a doubly-linked list. Choose this if you expect to have only a few threads blocked on any single IPC primitive.
    
    选中后，`wait_q` 将使用双向链接列表来实现。如果有少量线程等待单个原语(individual primitives)，则可以选择此选项。
    

## 协作式时间分片 Cooperative Time Slicing

Once a cooperative thread becomes the current thread, it remains the current thread until it performs an action that makes it unready. 

一旦协作式线程成为当前线程(current thread)，它将一直占用CPU，直到执行一个操作使其成为未就绪态(unready)。

Consequently, if a cooperative thread performs lengthy computations, it may cause an unacceptable delay in the scheduling of other threads, including those of higher priority and equal priority.

如果一个协作线程执行长时间运行，它可能会导致其他线程调度中的不可接受的延迟，包括那些更高优先级和同等优先级的线程。

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dadd1ce7-210e-45ce-a920-b4a8ba9adf41/Untitled.png)

To overcome such problems, a cooperative thread can voluntarily relinquish the CPU from time to time to permit other threads to execute. A thread can relinquish the CPU in two ways:

- Calling **`[k_yield()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_yield)`** puts the thread at the back of the scheduler’s prioritized list of ready threads, and then invokes the scheduler. All ready threads whose priority is higher or equal to that of the yielding thread are then allowed to execute before the yielding thread is rescheduled. If no such ready threads exist, the scheduler immediately reschedules the yielding thread without context switching.
- Calling **`[k_sleep()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_sleep)`** makes the thread unready for a specified time period. Ready threads of *all* priorities are then allowed to execute; however, there is no guarantee that threads whose priority is lower than that of the sleeping thread will actually be scheduled before the sleeping thread becomes ready once again.

为了解决这些问题，协作式线程可以主动让出CPU来允许其他线程执行。

可以通过两种方式让出CPU:

- 调用 **`[k_yield()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_yield)`** 将该线程置于调度器的就绪线程列表后，然后调用调度器。允许所有优先级高于或等于该线程的就绪线程在重新调度该线程之前执行。如果不存在这样的就绪线程，调度程序将立即重新调度产生的线程，而不需要进行上下文切换。
- 调用 **`[k_sleep()](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html#c.k_sleep)`** 会使线程在指定的时间段内处于未就绪状态，然后允许所有优先级的就绪线程执行。但是，不能保证那些优先级低于休眠线程的线程会在休眠线程再次就绪之前被调度。

## 抢占式线程时间片 Preemptive Time Slicing

Once a preemptive thread becomes the current thread, it remains the current thread until a higher priority thread becomes ready, or until the thread performs an action that makes it unready. 

一旦抢占线程成为当前线程，它将一直保持当前线程，直到更高优先级的线程就绪，或者直到该线程执行一个动作使其成为未就绪态(unready)。

Consequently, if a preemptive thread performs lengthy computations, it may cause an unacceptable delay in the scheduling of other threads, including those of equal priority.

因此，如果抢占式线程执行冗长的操作，可能会导致其他线程(包括同等优先级的线程)的调度出现不可接受的延迟。

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0334335f-a274-4233-9050-425a55ba778c/Untitled.png)

To overcome such problems, a preemptive thread can perform cooperative time slicing (as described above), or the scheduler’s time slicing capability can be used to allow other threads of the same priority to execute.

为了克服这些问题，抢占式线程可以执行协作时间切片，或者调度程序的时间片能力可以用于允许其他具有相同优先级的线程执行。

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70b7e135-0f0e-442f-b0ef-e5274e1e2161/Untitled.png)

The scheduler divides time into a series of **time slices**
, where slices are measured in system clock ticks. The time slice size is configurable, but this size can be changed while the application is running.

调度程序将时间划分为一系列时间片，其中时间片以系统时钟节拍来度量。时间片大小是可配置的，但是这个大小可以在应用程序运行时更改。

At the end of every time slice, the scheduler checks to see if the current thread is preemptible and, if so, implicitly invokes k_yield() on behalf of the thread. This gives other ready threads of the same priority the opportunity to execute before the current thread is scheduled again. If no threads of equal priority are ready, the current thread remains the current thread.

在每个时间片的末尾，调度器会检查当前线程是否可抢占，如果是，则隐式地调用`k_yield()`。这给了具有相同优先级的其他就绪线程在再次调度当前线程之前执行的机会。如果没有相等优先级的线程就绪，则保持不变。

Threads with a priority higher than specified limit are exempt from preemptive time slicing, and are never preempted by a thread of equal priority. This allows an application to use preemptive time slicing only when dealing with lower priority threads that are less time-sensitive.

优先级高于指定限制的线程(`CONFIG_TIMESLICE_PRIORITY`)不会被抢占时间切片，并且永远不会被同等优先级的线程抢占。这允许应用程序仅在处理较低优先级、时间敏感性较低的线程时使用抢占式时间切片。

NOTE：The kernel’s time slicing algorithm does not ensure that a set of equal-priority threads receive an equitable amount of CPU time, since it does not measure the amount of time a thread actually gets to execute. However, the algorithm does ensure that a thread never executes for longer than a single time slice without being required to yield.

:::note

内核的时间切片算法不能确保一组同等优先级的线程获得均等的CPU时间，因为它不能度量线程实际执行的时间。但是，该算法确保线程不会在不需要`yield`的情况下执行超过单个时间片的时间。

:::

## 调度器锁

A preemptible thread that does not wish to be preempted while performing a critical operation can instruct the scheduler to temporarily treat it as a cooperative thread by calling k_sched_lock(). This prevents other threads from interfering while the critical operation is being performed.

如果不希望在执行关键操作时被线程抢占， 那么可以调用`k_sched_lock()`来指示调度器将其临时视为协作式线程。这可以防止其他线程在执行关键操作时进行干扰。

Once the critical operation is complete the preemptible thread must call k_sched_unlock() to restore its normal, preemptible status.

一旦关键操作完成，可抢占线程必须调用`k_sched_unlock()`来恢复其正常的可抢占状态。

If a thread calls k_sched_lock() and subsequently performs an action that makes it unready, the scheduler will switch the locking thread out and allow other threads to execute. When the locking thread again becomes the current thread, its non-preemptible status is maintained.

如果一个线程调用`k_sched_lock()`，并随后执行一个使其变为未就绪态的操作，调度器将切换线程，并允许其他线程执行。当该线程再次变成当前线程时，它的不可抢占状态被保持。

NOTE：Locking out the scheduler is a more efficient way for a preemptible thread to prevent preemption than changing its priority level to a negative value.

:::note

对于可抢占线程来说，锁定调度器比将其改为协作式线程更有效地防止抢占。

:::

## 线程睡眠

A thread can call k_sleep() to delay its processing for a specified time period. During the time the thread is sleeping the CPU is relinquished to allow other ready threads to execute. Once the specified delay has elapsed the thread becomes ready and is eligible to be scheduled once again.

线程可以调用`k_sleep()`进行延迟。在线程睡眠期间，CPU被让出，以允许其他准备好的线程执行。一旦指定的延迟过去，线程就准备好了，可以再次被调度。

A sleeping thread can be woken up prematurely by another thread using k_wakeup(). This technique can sometimes be used to permit the secondary thread to signal the sleeping thread that something has occurred without requiring the threads to define a kernel synchronization object, such as a semaphore. Waking up a thread that is not sleeping is allowed, but has no effect.

使用`k_wakeup()`，另一个线程可以提前唤醒正在睡眠的线程。这种技术可以用于其他线程向睡眠线程发出发生了某事的信号，而不需要线程定义一个内核同步对象，比如信号量。唤醒一个非睡眠状态的线程是允许的，但是没有效果。

## 忙等待 Busy Waiting

A thread can call k_busy_wait() to perform a busy wait that delays its processing for a specified time period without relinquishing the CPU to another ready thread.

线程可以调用`k_busy_wait()`来执行忙等待，将其处理延迟一段指定的时间，不会进行上下文切换。

A busy wait is typically used instead of thread sleeping when the required delay is too short to warrant having the scheduler context switch from the current thread to another thread and then back again.

当所需的延迟太短，无法保证调度程序上下文从当前线程切换到另一个线程，然后再切换回来时，通常使用忙等待来代替线程睡眠。

