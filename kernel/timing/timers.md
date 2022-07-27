# 定时器

A timer is a kernel object that measures the passage of time using the kernel’s system clock. When a timer’s specified time limit is reached it can perform an application-defined action, or it can simply record the expiration and wait for the application to read its status.  
定时器是一个内核对象，它使用内核的系统时钟来测量时间的流逝。当达到定时器的指定时间限制时，它可以执行应用程序定义的操作，或者它可以简单地记录到期时间并等待应用程序读取其状态。

* Concepts 
    [概念](#concepts)
* Implementation
    [实现](#impl)
    - Defining a Timer
        [定义定时器](#dat)
    - Using a Timer Expiry Function
        [使用定时器过期函数](#uatef)
    - Reading Timer Status
        [读取定时器状态](#rts)
    - Using Timer Status Synchronization
        [使用定时器状态同步](#utss)
* Suggested Uses
    [用途建议](#su)
* Configuration Options
    [配置选项](#co)
* API Reference
    [API参考](#apiref)

## <span id="concepts">概念</span>

Any number of timers can be defined (limited only by available RAM). Each timer is referenced by its memory address.  
可以定义任意数量的定时器（仅受可用RAM限制）。每个定时器都由它的内存地址引用。

A timer has the following key properties:  
定时器具有以下关键属性：

  * A duration specifying the time interval before the timer expires for the first time. This is a k_timeout_t value that may be initialized via different units.  
  指定第一个计时器到期前的时间间隔的持续时间。这是一个`k_timeout_t`值，可以通过不同的单位进行初始化。

  * A period specifying the time interval between all timer expirations after the first one, also a k_timeout_t. It must be non-negative. A period of K_NO_WAIT (i.e. zero) or K_FOREVER means that the timer is a one shot timer that stops after a single expiration. (For example then, if a timer is started with a duration of 200 and a period of 75, it will first expire after 200ms and then every 75ms after that.)  
  指定第一个计时器到期后所有计时器到期之间的时间间隔的时间段，也是一个`k_timeout_t`值。它必须是非负数。`K_NO_WAIT`(即零)或 `K_FOREVER`意味着计时器是单次计时器，在单次到期后停止。（例如，如果一个计时器以200ms持续时间和75ms的周期启动，它首先会在200ms过期后再每隔75ms执行一次。）

  * An expiry function that is executed each time the timer expires. The function is executed by the system clock interrupt handler. If no expiry function is required a NULL function can be specified.  
  每次计时器到期时执行的到期函数功能由系统时钟中断处理程序执行。如果不需要到期函数，则把函数指定为NULL。

  * A stop function that is executed if the timer is stopped prematurely while running. The function is executed by the thread that stops the timer. If no stop function is required a NULL function can be specified.  
  如果计时器在运行过程中提前停止，它会执行一种停止函数。这种函数由停止计时器的线程执行。如果不需要停止函数，则把函数制定为NULL。

  * A status value that indicates how many times the timer has expired since the status value was last read.  
  一个状态值，指自从上次读取状态值以来，计时器已过期的次数。

A timer must be initialized before it can be used. This specifies its expiry function and stop function values, sets the timer’s status to zero, and puts the timer into the stopped state.  
定时器必须先初始化然后才能使用。这指定了它的到期函数和停止函数值，将计时器的状态设置为零，并将计时器设置为**停止**状态。

A timer is started by specifying a duration and a period. The timer’s status is reset to zero, then the timer enters the running state and begins counting down towards expiry.  
通过指定持续时间和周期来**启动**计时器。计时器的状态重置为零，然后计时器进入**运行**状态并开始倒计时直到到期。

Note that the timer’s duration and period parameters specify minimum delays that will elapse. Because of internal system timer precision (and potentially runtime interactions like interrupt delay) it is possible that more time may have passed as measured by reads from the relevant system time APIs. But at least this much time is guaranteed to have elapsed.  
请注意，计时器的持续时间和周期参数指定将要经过**最小延迟**。由于内部系统计时器的精度（以及运行时的交互，如中断延迟），通过从相关系统时间API读取来衡量，可能已经过去了更多时间。但但至少这段时间肯定已经过去了。

When a running timer expires its status is incremented and the timer executes its expiry function, if one exists; If a thread is waiting on the timer, it is unblocked. If the timer’s period is zero the timer enters the stopped state; otherwise the timer restarts with a new duration equal to its period.  
当一个正在运行的计时器到期时它的状态时递增的，并且计时器执行它的到期函数（如果存在的话）；如果一个线程正在等待计时器，它将会被解除阻塞状态。如果计时器的周期为零，那么计时器就会进入停止状态；否则计时器重会新启动，它持续时间等于它的周期

A running timer can be stopped in mid-countdown, if desired. The timer’s status is left unchanged, then the timer enters the stopped state and executes its stop function, if one exists. If a thread is waiting on the timer, it is unblocked. Attempting to stop a non-running timer is permitted, but has no effect on the timer since it is already stopped.  


A running timer can be restarted in mid-countdown, if desired. The timer’s status is reset to zero, then the timer begins counting down using the new duration and period values specified by the caller. If a thread is waiting on the timer, it continues waiting.

