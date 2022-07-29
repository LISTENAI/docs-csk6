# 定时器

A timer is a kernel object that measures the passage of time using the kernel’s system clock. When a timer’s specified time limit is reached it can perform an application-defined action, or it can simply record the expiration and wait for the application to read its status.  
定时器是一个内核对象，它使用内核的系统时钟来测量时间的流逝。当达到定时器的指定时间时，它可以执行应用程序定义的操作，或者它可以简单地记录到期时间并等待应用程序读取其状态。

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
 duration 指定第一个定时器到期前的时间间隔的持续时间，这是一个`k_timeout_t`值，可以通过不同的单位进行初始化。

  * A period specifying the time interval between all timer expirations after the first one, also a k_timeout_t. It must be non-negative. A period of K_NO_WAIT (i.e. zero) or K_FOREVER means that the timer is a one shot timer that stops after a single expiration. (For example then, if a timer is started with a duration of 200 and a period of 75, it will first expire after 200ms and then every 75ms after that.)  
  period 指定第一个定时器到期后所有定时器到期之间的时间间隔的时间段，也是一个`k_timeout_t`值。它必须是非负数。`K_NO_WAIT`(即零)或 `K_FOREVER`意味着定时器是单次定时器，在单次到期后停止。（例如，假设一个定时器以200ms持续时间和75ms的周期启动，它首先会在200ms过期后再每隔75ms执行一次。）

  * An expiry function that is executed each time the timer expires. The function is executed by the system clock interrupt handler. If no expiry function is required a NULL function can be specified.  
  expiry 每次定时器到期时执行的到期函数功能由系统时钟中断处理程序执行。如果不需要到期函数，则把函数指定为NULL。

  * A stop function that is executed if the timer is stopped prematurely while running. The function is executed by the thread that stops the timer. If no stop function is required a NULL function can be specified.  
  如果定时器在运行过程中提前停止，它会执行停止回调函数。函数在调用停止定时器的线程上下文执行。如果不需要停止函数，则把函数制定为NULL。

  * A status value that indicates how many times the timer has expired since the status value was last read.  
  status 是一个状态值，指自从上次读取状态值以来，定时器已过期的次数。

A timer must be initialized before it can be used. This specifies its expiry function and stop function values, sets the timer’s status to zero, and puts the timer into the stopped state.  
初始化时需对到期函数和停止函数赋值，将定时器的状态设置为零，并将定时器设置为**停止**状态。

A timer is started by specifying a duration and a period. The timer’s status is reset to zero, then the timer enters the running state and begins counting down towards expiry.  
timer 通过指定持续时间和周期来**启动**定时器。。定时器的状态重置为零，然后定时器进入**运行**状态并开始倒计时直到到期。

Note that the timer’s duration and period parameters specify minimum delays that will elapse. Because of internal system timer precision (and potentially runtime interactions like interrupt delay) it is possible that more time may have passed as measured by reads from the relevant system time APIs. But at least this much time is guaranteed to have elapsed.  
请注意，定时器的持续时间和周期参数指定将要经过**最小延迟**。由于内部系统定时器的精度（以及运行时的交互，如中断延迟），通过从相关系统时间API读取来衡量，可能已经过去了更多时间。但但至少这段时间肯定已经过去了。

When a running timer expires its status is incremented and the timer executes its expiry function, if one exists; If a thread is waiting on the timer, it is unblocked. If the timer’s period is zero the timer enters the stopped state; otherwise the timer restarts with a new duration equal to its period.  
当一个正在运行的定时器到期时它的状态时递增的，并且定时器执行它的到期函数（如果存在的话）；如果一个线程正在等待定时器，它将会被解除阻塞状态。如果定时器的周期为零，那么定时器就会进入停止状态；否则定时器重会新启动，它持续时间等于它的周期

A running timer can be stopped in mid-countdown, if desired. The timer’s status is left unchanged, then the timer enters the stopped state and executes its stop function, if one exists. If a thread is waiting on the timer, it is unblocked. Attempting to stop a non-running timer is permitted, but has no effect on the timer since it is already stopped.    
如果有需要，可以在倒计时中间停止运行定时器。定时器的状态保持不变，然后定时器进入停止状态并执行它的停止函数（如果存在的话）。如果一个线程正在等待定时器，它将会被解除阻塞状态。允许尝试停止未运行的定时器，但对定时器没有影响，因为它已经停止了。

A running timer can be restarted in mid-countdown, if desired. The timer’s status is reset to zero, then the timer begins counting down using the new duration and period values specified by the caller. If a thread is waiting on the timer, it continues waiting.  
如果有需要，运行中的定时器可以在倒计时中间重新启动。定时器的状态重设为零，然后定时器使用调用者指定的新的持续时间和周期值进行倒计时。如果一个线程正在等待定时器，它将会继续等待。

A timer’s status can be read directly at any time to determine how many times the timer has expired since its status was last read. Reading a timer’s status resets its value to zero. The amount of time remaining before the timer expires can also be read; a value of zero indicates that the timer is stopped.  
可以随时直接读区定时器的状态，用来确认自上次读取其状态以来定时器已过期的次数。读取定时器的状态会把它的值重置为零。还可以读取定时器到期前的剩余时间；零表示定时器已停止。

A thread may read a timer’s status indirectly by synchronizing with the timer. This blocks the thread until the timer’s status is non-zero (indicating that it has expired at least once) or the timer is stopped; if the timer status is already non-zero or the timer is already stopped the thread continues without waiting. The synchronization operation returns the timer’s status and resets it to zero.  
线程可以通过与定时器**同步**来间接读区定时器状态。这会阻塞线程，直到定时器状态非零为止（表明它至少已过期一次）或定时器停止；如果定时器状态已经非零或定时器已经停止，则线程继续进行而不等待。同步操作返回定时器的状态并将它重置为零。

:::info 
Only a single user should examine the status of any given timer, since reading the status (directly or indirectly) changes its value. Similarly, only a single thread at a time should synchronize with a given timer. ISRs are not permitted to synchronize with timers, since ISRs are not allowed to block.  
只有一个用户应该检查任何给定定时器的状态，因为读取状态（直接或间接）会改变它的值。类似地，一次只能有一个线程与给定的定时器同步。ISR不允许与定时器同步，因为ISR不允许阻塞。
:::


## <span id="impl">实现</span>

### <span id="dat">定义定时器</span>

A timer is defined using a variable of type k_timer. It must then be initialized by calling k_timer_init().  
定时器是使用 `k_timer` 类型定义变量的。必须通过调用 `k_timer_init()` 来初始化。

The following code defines and initializes a timer.  
下面的代码定义并初始化了一个定时器。
```
struct k_timer my_timer;
extern void my_expiry_function(struct k_timer *timer_id);

k_timer_init(&my_timer, my_expiry_function, NULL);
```

Alternatively, a timer can be defined and initialized at compile time by calling K_TIMER_DEFINE.  
通过 [K_TIMER_DEFINE](https://docs.zephyrproject.org/2.7.0/reference/kernel/timing/timers.html#c.K_TIMER_DEFINE) 定义定时器后，它将在编译时被定义和初始化。

The following code has the same effect as the code segment above.  
下面的代码与上面的代码具有相同的效果。
```
K_TIMER_DEFINE(my_timer, my_expiry_function, NULL);
```

### <span id="uatef">使用定时器过期函数</span>

The following code uses a timer to perform a non-trivial action on a periodic basis. Since the required work cannot be done at interrupt level, the timer’s expiry function submits a work item to the system workqueue, whose thread performs the work.  
下面的代码使用定时器定期执行重要的操作。由于不能在中断级别完成所需的任务，因此定时器的到期函数将任务项提交给[系统工作队列](../../kernel/workqueue.md)线程执行。
```
void my_work_handler(struct k_work *work)
{
    /* do the processing that needs to be done periodically */
    ...
}

K_WORK_DEFINE(my_work, my_work_handler);

void my_timer_handler(struct k_timer *dummy)
{
    k_work_submit(&my_work);
}

K_TIMER_DEFINE(my_timer, my_timer_handler, NULL);

...

/* start periodic timer that expires once every second */
k_timer_start(&my_timer, K_SECONDS(1), K_SECONDS(1));
```

### <span id="rts">读取定时器状态</span>

The following code reads a timer’s status directly to determine if the timer has expired on not.  
下面的代码直接读取定时器的状态来确认定时器是否已过期。

```
K_TIMER_DEFINE(my_status_timer, NULL, NULL);

...

/* start one shot timer that expires after 200 ms */
k_timer_start(&my_status_timer, K_MSEC(200), K_NO_WAIT);

/* do work */
...

/* check timer status */
if (k_timer_status_get(&my_status_timer) > 0) {
    /* timer has expired */
} else if (k_timer_remaining_get(&my_status_timer) == 0) {
    /* timer was stopped (by someone else) before expiring */
} else {
    /* timer is still running */
}
```

### <span id="utss">使用定时器状态同步</span>

The following code performs timer status synchronization to allow a thread to do useful work while ensuring that a pair of protocol operations are separated by the specified time interval.
下面的代码执行定时器状态同步来允许线程执行可用的任务，同时确保这协议操作按指定的时间间距分开。

```
K_TIMER_DEFINE(my_sync_timer, NULL, NULL);

...

/* do first protocol operation */
...

/* start one shot timer that expires after 500 ms */
k_timer_start(&my_sync_timer, K_MSEC(500), K_NO_WAIT);

/* do other work */
...

/* ensure timer has expired (waiting for expiry, if necessary) */
k_timer_status_sync(&my_sync_timer);

/* do second protocol operation */
...
```

:::info
If the thread had no other work to do it could simply sleep between the two protocol operations, without using a timer.  
如果线程没有其他任务要做，它可以简单地在两个协议之间休眠，而不需要使用定时器。 
:::

## <span id="su">用途建议</span>

Use a timer to initiate an asynchronous operation after a specified amount of time.  
使用定时器在指定时间后启动异步操作。

Use a timer to determine whether or not a specified amount of time has elapsed. In particular, timers should be used when higher precision and/or unit control is required than that afforded by the simpler k_sleep() and k_usleep() calls.  
使用定时器确定是否经过了指定的时间。特别是,当需要比较简单的 [k_sleep()](#) 和 [k_usleep()](#) 调用更高的精度和/或单元控制时，应该使用定时器。

Use a timer to perform other work while carrying out operations involving time limits.  
在执行涉及时间限制的操作时，应该使用定时器执行其他任务。

:::info
If a thread needs to measure the time required to perform an operation it can read the system clock or the hardware clock directly, rather than using a timer.  
如果需要测量线程执行操作所需的时间，它可以直接读取[系统时钟或硬件时钟](#),而不是使用定时器。
:::

## <span id="co">配置选项</span>

Related configuration options:  
相关配置选项：

* None
  没有

## <span id="apiref">API参考</span>

详情请打开[API参考](https://docs.zephyrproject.org/2.7.0/reference/kernel/timing/timers.html#api-reference)。

相关示例请查看[sample/timers](../../application/kernel/timer.md)。