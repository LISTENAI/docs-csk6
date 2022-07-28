# 中断

## 概述

An ISR has the following key properties:

- An **interrupt request (IRQ) signal** that triggers the ISR.
- A **priority level** associated with the IRQ.
- An **interrupt handler function** that is invoked to handle the interrupt.
- An **argument value** that is passed to that function.

中断有下面关键属性：

- 触发中断的请求信号（ISR）
- 中断优先级
- 中断服务函数
- 中断服务函数的参数

An IDT or a vector table is used to associate a given interrupt source with a given ISR. Only a single ISR can be associated with a specific IRQ at any given time.

中断向量表(vector table)用来关联中断请求和中断服务函数。在任何时刻，一个中断请求只对应一个中断服务函数。

Multiple ISRs can utilize the same function to process interrupts, allowing a single function to service a device that generates multiple types of interrupts or to service multiple devices (usually of the same type). The argument value passed to an ISR’s function allows the function to determine which interrupt has been signaled.

可以用同一个函数，来处理多个中断请求。这些中断请求可以是同一个外设不同类型的中断， 也可以是多个外设的中断。中断函数通过参数值来确定是哪个中断信号触发的。

The kernel provides a default ISR for all unused IDT entries. This ISR generates a fatal system error if an unexpected interrupt is signaled.

内核提供了默认的中断服务函数对未用到的中断。如果有非法中断触发，中断服务函数产生一个系统致命错误。

The kernel supports **interrupt nesting**. This allows an ISR to be preempted in mid-execution if a higher priority interrupt is signaled. The lower priority ISR resumes execution once the higher priority ISR has completed its processing.

内核支持**中断嵌套**(interrupt nesting)。高优先级的中断可以抢占正在执行的低优先级中断，高优先级执行完中断服务函数后，会继续执行低优先级中断。

An ISR’s interrupt handler function executes in the kernel’s **interrupt context**. This context has its own dedicated stack area (or, on some architectures, stack areas). The size of the interrupt context stack must be capable of handling the execution of multiple concurrent ISRs if interrupt nesting support is enabled.

中断服务函数在内核的中断上下文中执行。内核中断上下文具有自己的专用堆栈。如果使能了**中断嵌套**，中断上下文堆栈的大小，必须能够满足多个并发 ISR 的中断处理。

:::note

Many kernel APIs can be used only by threads, and not by ISRs. In cases where a routine may be invoked by both threads and ISRs the kernel provides the [k_is_in_isr()](https://docs.zephyrproject.org/latest/kernel/services/interrupts.html#c.k_is_in_isr) API to allow the routine to alter its behavior depending on whether it is executing as part of a thread or as part of an ISR.

:::

:::note

很多内核接口只能在线程中使用，而不能在中断中使用。如果一个函数允许被线程和中断调用，可以用 [k_is_in_isr()](https://docs.zephyrproject.org/latest/kernel/services/interrupts.html#c.k_is_in_isr)来判断上下文是否在中断中，从而进行不同的处理

:::

## 中断屏蔽 Preventing Interruptions

In certain situations it may be necessary for the current thread to prevent ISRs from executing while it is performing time-sensitive or critical section operations.

当在线程中执行时间敏感或关键操作时，需要阻止中断处理，这种操作称之为 **中断屏蔽**。

A thread may temporarily prevent all IRQ handling in the system using an **IRQ lock**. This lock can be applied even when it is already in effect, so routines can use it without having to know if it is already in effect. The thread must unlock its IRQ lock the same number of times it was locked before interrupts can be once again processed by the kernel while the thread is running.

在线程中可以使用中断锁(IRQ lock)暂时屏蔽中断请求处理。即使中断锁已经生效，但仍可以再次调用，所以调用者不需要知道是否已经生效。线程释放锁的次数，必须与调用锁的次数相同，才能真正的恢复该线程运行时的中断响应。

:::note

The IRQ lock is thread-specific. If thread A locks out interrupts then performs an operation that puts itself to sleep (e.g. sleeping for N milliseconds), the thread’s IRQ lock no longer applies once thread A is swapped out and the next ready thread B starts to run.

This means that interrupts can be processed while thread B is running unless thread B has also locked out interrupts using its own IRQ lock. (Whether interrupts can be processed while the kernel is switching between two threads that are using the IRQ lock is architecture-specific.)

When thread A eventually becomes the current thread once again, the kernel re-establishes thread A’s IRQ lock. This ensures thread A won’t be interrupted until it has explicitly unlocked its IRQ lock.

If thread A does not sleep but does make a higher-priority thread B ready, the IRQ lock will inhibit any preemption that would otherwise occur. Thread B will not run until the next [reschedule point](https://docs.zephyrproject.org/latest/kernel/services/scheduling/index.html#scheduling-v2) reached after releasing the IRQ lock.

:::

:::note

中断锁是线程特有的。如果线程A进行了锁中断的操作后再睡眠(睡眠若干毫秒)，线程A被挂起，准备执行B线程，那么线程A中的中断锁就不再生效。

这意味着在执行线程B时，中断仍然可以被触发，除非在线程B中调用中断锁。

当再次执行线程A，内核将重新使能中断锁，确保线程A不会被中断直到线程A释放中断锁。

如果线程A没有睡眠，但此时一个高优先级线程B就绪，中断锁将禁止任何可能的抢占。只有线程A释放了中断锁，线程B才有可能被调度运行。

:::

Alternatively, a thread may temporarily **disable** a specified IRQ so its associated ISR does not execute when the IRQ is signaled. The IRQ must be subsequently **enabled** to permit the ISR to execute.

还有另一种做法，在线程中临时**禁用**某个中断请求，这样当对应中断信号产生时，不会执行中断服务函数。但在线程处理后，尽快重新**使能**该中断请求，这样才能恢复其中断处理的响应。

:::note

Disabling an IRQ prevents *all* threads in the system from being preempted by the associated ISR, not just the thread that disabled the IRQ.

:::

:::note

禁用中断请求可以防止所有线程被中断抢占，而不仅仅是禁用IRQ的线程。

:::

### 零延迟中断 Zero Latency Interrupts

Preventing interruptions by applying an IRQ lock may increase the observed interrupt latency. A high interrupt latency, however, may not be acceptable for certain low-latency use-cases.

通过中断锁来屏蔽中断可能会增加中断延迟。然而，对于某些需要低延迟的场景，高中断延迟是不可接受的。

The kernel addresses such use-cases by allowing interrupts with critical latency constraints to execute at a priority level that cannot be blocked by interrupt locking. These interrupts are defined as *zero-latency interrupts*.

内核允许对延迟有要求的中断在使用中断锁后仍能触发。这些中断被定义为零延迟中断(Zero Latency Interrupts)。

 The support for zero-latency interrupts equires [CONFIG_ZERO_LATENCY_IRQS](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_ZERO_LATENCY_IRQS) to be enabled. In addition to that, the flag **`IRQ_ZERO_LATENCY`** must be passed to [IRQ_CONNECT](https://docs.zephyrproject.org/latest/kernel/services/interrupts.html#c.IRQ_CONNECT)or [IRQ_DIRECT_CONNECT](https://docs.zephyrproject.org/latest/kernel/services/interrupts.html#c.IRQ_DIRECT_CONNECT) macros to configure the particular interrupt with zero latency.

零延迟中断需要使能[CONFIG_ZERO_LATENCY_IRQS](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_ZERO_LATENCY_IRQS)。另外，需要在[IRQ_CONNECT](https://docs.zephyrproject.org/latest/kernel/services/interrupts.html#c.IRQ_CONNECT) 或 [IRQ_DIRECT_CONNECT](https://docs.zephyrproject.org/latest/kernel/services/interrupts.html#c.IRQ_DIRECT_CONNECT)中配置为 **`IRQ_ZERO_LATENCY`** 。

Zero-latency interrupts are expected to be used to manage hardware events directly, and not to interoperate with the kernel code at all. They should treat all kernel APIs as undefined behavior (i.e. an application that uses the APIs inside a zero-latency interrupt context is responsible for directly verifying correct behavior). Zero-latency interrupts may not modify any data inspected by kernel APIs invoked from normal Zephyr contexts and shall not generate exceptions that need to be handled synchronously (e.g. kernel panic).

零延迟中断用于直接管理硬件中断，不会经过Zephyr内核。在零延迟中断服务函数中使用内核API，需要用户去保证API使用的正确性。零延迟中断不得修改从正常Zephyr上下文调用的内核API所检查的任何数据，也不得产生需要同步处理的异常(例如内核panic)。


## Offloading ISR Work 中断工作转移

An ISR should execute quickly to ensure predictable system operation. If time consuming processing is required the ISR should offload some or all processing to a thread, thereby restoring the kernel’s ability to respond to other interrupts.

中断服务函数应该快速执行，以确保系统正常运行。如果需要执行耗时的处理，中断处理函数应该将一些或所有的处理都分担给一个辅助线程(helper thread)，从而恢复内核对其他中断的响应能力。

The kernel supports several mechanisms for offloading interrupt-related processing to a thread.

- An ISR can signal a helper thread to do interrupt-related processing using a kernel object, such as a FIFO, LIFO, or semaphore.
- An ISR can instruct the system workqueue thread to execute a work item. (See [Workqueue Threads](https://docs.zephyrproject.org/latest/kernel/services/threads/workqueue.html#workqueues-v2).)

内核支持多种方法去分担中断服务函数的处理给线程。

- 在中断服务函数中使用内核对象(如FIFO、LIFO或信号量)通知辅助线程执行与中断相关的处理。
- 在中断服务函数中指示系统工作队列线程执行工作项([工作队列](workqueue.md))。

When an ISR offloads work to a thread, there is typically a single context switch to that thread when the ISR completes, allowing interrupt-related processing to continue almost immediately. However, depending on the priority of the thread handling the offload, it is possible that the currently executing cooperative thread or other higher-priority threads may execute before the thread handling the offload is scheduled.

中断服务函数执行完成后，内核会执行一次 **上下文切换**，尽可能保证立即执行辅助线程。但由于线程优先级的关系，也可能调度到其他的优先级更高的线程或协程。