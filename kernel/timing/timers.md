# 定时器
 
定时器是一个内核对象，它使用内核的系统时钟来测量时间的流逝。当达到定时器的指定时间时，它可以执行应用程序定义的操作，或者它可以简单地记录到期时间并等待应用程序读取其状态。

* [概念](#concepts)
* [实现](#impl)
    - [定义定时器](#dat)
    - [使用定时器过期函数](#uatef)
    - [读取定时器状态](#rts)
    - [使用定时器状态同步](#utss)
* [用途建议](#su)
* [配置选项](#co)
* [API参考](#apiref)

## <span id="concepts">概念</span>

可以定义任意数量的定时器（仅受可用RAM限制）。每个定时器都由它的内存地址引用。
 
定时器具有以下关键属性：

  * duration 指定第一个定时器到期前的时间间隔的持续时间，这是一个`k_timeout_t`值，可以通过不同的单位进行初始化。

  * period 指定第一个定时器到期后所有定时器到期之间的时间间隔的时间段，也是一个`k_timeout_t`值。它必须是非负数。`K_NO_WAIT`(即零)或 `K_FOREVER`意味着定时器是单次定时器，在单次到期后停止。（例如，假设一个定时器以200ms持续时间和75ms的周期启动，它首先会在200ms过期后再每隔75ms执行一次。）

  * expiry 每次定时器到期时执行的到期函数功能由系统时钟中断处理程序执行。如果不需要到期函数，则把函数指定为NULL。

  * 如果定时器在运行过程中提前停止，它会执行停止回调函数。函数在调用停止定时器的线程上下文执行。如果不需要停止函数，则把函数制定为NULL。

  * status 是一个状态值，指自从上次读取状态值以来，定时器已过期的次数。
 
初始化时需对到期函数和停止函数赋值，将定时器的状态设置为零，并将定时器设置为**停止**状态。

timer 通过指定持续时间和周期来**启动**定时器。。定时器的状态重置为零，然后定时器进入**运行**状态并开始倒计时直到到期。
 
请注意，定时器的持续时间和周期参数指定将要经过**最小延迟**。由于内部系统定时器的精度（以及运行时的交互，如中断延迟），通过从相关系统时间API读取来衡量，可能已经过去了更多时间。但但至少这段时间肯定已经过去了。

当一个正在运行的定时器到期时它的状态时递增的，并且定时器执行它的到期函数（如果存在的话）；如果一个线程正在等待定时器，它将会被解除阻塞状态。如果定时器的周期为零，那么定时器就会进入停止状态；否则定时器重会新启动，它持续时间等于它的周期
  
如果有需要，可以在倒计时中间停止运行定时器。定时器的状态保持不变，然后定时器进入停止状态并执行它的停止函数（如果存在的话）。如果一个线程正在等待定时器，它将会被解除阻塞状态。允许尝试停止未运行的定时器，但对定时器没有影响，因为它已经停止了。

如果有需要，运行中的定时器可以在倒计时中间重新启动。定时器的状态重设为零，然后定时器使用调用者指定的新的持续时间和周期值进行倒计时。如果一个线程正在等待定时器，它将会继续等待。

可以随时直接读区定时器的状态，用来确认自上次读取其状态以来定时器已过期的次数。读取定时器的状态会把它的值重置为零。还可以读取定时器到期前的剩余时间；零表示定时器已停止。
 
线程可以通过与定时器**同步**来间接读区定时器状态。这会阻塞线程，直到定时器状态非零为止（表明它至少已过期一次）或定时器停止；如果定时器状态已经非零或定时器已经停止，则线程继续进行而不等待。同步操作返回定时器的状态并将它重置为零。

:::info 注意
只有一个用户应该检查任何给定定时器的状态，因为读取状态（直接或间接）会改变它的值。类似地，一次只能有一个线程与给定的定时器同步。ISR不允许与定时器同步，因为ISR不允许阻塞。
:::


## <span id="impl">实现</span>

### <span id="dat">定义定时器</span>

定时器是使用 `k_timer` 类型定义变量的。必须通过调用 `k_timer_init()` 来初始化。

下面的代码定义并初始化了一个定时器。
```
struct k_timer my_timer;
extern void my_expiry_function(struct k_timer *timer_id);

k_timer_init(&my_timer, my_expiry_function, NULL);
```
 
通过 [K_TIMER_DEFINE](https://docs.zephyrproject.org/2.7.0/reference/kernel/timing/timers.html#c.K_TIMER_DEFINE) 定义定时器后，它将在编译时被定义和初始化。

下面的代码与上面的代码具有相同的效果。
```
K_TIMER_DEFINE(my_timer, my_expiry_function, NULL);
```

### <span id="uatef">使用定时器过期函数</span>

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

:::info 注意
如果线程没有其他任务要做，它可以简单地在两个协议之间休眠，而不需要使用定时器。 
:::

## <span id="su">用途建议</span>

使用定时器在指定时间后启动异步操作。

使用定时器确定是否经过了指定的时间。特别是,当需要比较简单的 [k_sleep()](#) 和 [k_usleep()](#) 调用更高的精度和/或单元控制时，应该使用定时器。

在执行涉及时间限制的操作时，应该使用定时器执行其他任务。

:::info 注意
如果需要测量线程执行操作所需的时间，它可以直接读取[系统时钟或硬件时钟](#),而不是使用定时器。
:::

## <span id="co">配置选项</span>

相关配置选项：

* None
  没有

## <span id="apiref">API参考</span>

详情请打开[API参考](https://docs.zephyrproject.org/2.7.0/reference/kernel/timing/timers.html#api-reference)。

相关示例请查看[sample/timers](../../application/kernel/timer.md)。