# 系统线程

A system thread is a thread that the kernel spawns automatically during system initialization.

The kernel spawns the following system threads:

系统线程是内核在系统初始化期间自动生成的线程。

内核会创建以下系统线程:

### Main thread 主线程

This thread performs kernel initialization, then calls the application’s main() function (if one is defined).

这个线程执行内核初始化，然后调用应用程序的main()函数(如果有定义)。

By default, the main thread uses the highest configured preemptible thread priority (i.e. 0). If the kernel is not configured to support preemptible threads, the main thread uses the lowest configured cooperative thread priority (i.e. -1).

默认情况下，主线程配置为最高的可抢占线程优先级(即0)。如果内核没有配置支持可抢占线程，主线程配置为最低的协作线程优先级(即-1)。

The main thread is an essential thread while it is performing kernel initialization or executing the application’s main() function; this means a fatal system error is raised if the thread aborts. If main() is not defined, or if it executes and then does a normal return, the main thread terminates normally and no error is raised.

主线程(main thread)在执行内核初始化或执行应用程序的`main()`函数时是一个基本线程。这意味着如果该线程中止(abort)，会引发一个致命的系统错误。如果`main()`没有被定义，或者它执行后做了一个正常的返回，那么主线程就会正常结束，不会引发错误。

### Idle thread 空闲线程

This thread executes when there is no other work for the system to do. If possible, the idle thread activates the board’s power management support to save power; otherwise, the idle thread simply performs a “do nothing” loop. The idle thread remains in existence as long as the system is running and never terminates.

当系统中无其他就绪线程存在时，会执行空闲线程(idle thread)。可以在空闲线程中执行电源管理模块以省电，否则空闲线程只会执行一个“什么都不做”的循环。只要系统在运行，空闲线程就一直存在，并且永远不会结束。

The idle thread always uses the lowest configured thread priority. If this makes it a cooperative thread, the idle thread repeatedly yields the CPU to allow the application’s other threads to run when they need to.

空闲线程永远配置为最低优先级线程。如果这使它成为一个协作式线程，那么空闲线程会反复让出CPU，以使应用程序的其他线程在需要的时候运行。

The idle thread is an essential thread, which means a fatal system error is raised if the thread aborts.

空闲线程是一个必不可少的线程，这意味着如果线程中止，会引发一个致命的系统错误。

Additional system threads may also be spawned, depending on the kernel and board configuration options specified by the application. For example, enabling the system workqueue spawns a system thread that services the work items submitted to it. (See Workqueue Threads.)

根据应用程序和内核的配置，也会创建其他的系统线程。比如，如果使用了系统工作队列(system workqueue)，会创建一个系统线程用于执行工作项(work items)。