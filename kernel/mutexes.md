# 互斥锁

Any number of mutexes can be defined (limited only by available RAM). Each mutex is referenced by its memory address.

可以定义任意数量的互斥量(受限于RAM)。每个互斥量通过其内存地址进行引用。

A mutex has the following key properties:

- A **lock count** that indicates the number of times the mutex has be locked by the thread that has locked it. A count of zero indicates that the mutex is unlocked.
- An **owning thread** that identifies the thread that has locked the mutex, when it is locked.

互斥量的关键属性如下：

- **锁计数**：表示线程锁定互斥量的次数。0表示该互斥量没有被锁定。
- **拥有线程**： 用来标识锁定互斥量的线程。

A mutex must be initialized before it can be used. This sets its lock count to zero.

互斥量必须先初始化再使用。初始化时会将其锁计数设为 0。

A thread that needs to use a shared resource must first gain exclusive rights to access it by **locking** the associated mutex. If the mutex is already locked by another thread, the requesting thread may choose to wait for the mutex to be unlocked.

当一个线程想使用共享资源时，它必须先**锁定**互斥量以获得专有的访问权限。如果该互斥锁已被另一个线程锁定，请求线程可以等待该互斥量被解锁。

After locking a mutex, the thread may safely use the associated resource for as long as needed; however, it is considered good practice to hold the lock for as short a time as possible to avoid negatively impacting other threads that want to use the resource. When the thread no longer needs the resource it must **unlock** the mutex to allow other threads to use the resource.

锁定互斥量后，线程可以长时间安全地使用相关联的资源。不过，一个好的做法是尽可能短的持有互斥量，因为这样能避免对其它需要使用这些资源的线程造成影响。当线程不再需要使用资源时，必须将互斥量 **解锁**，以允许其它线程可以使用该资源。

Any number of threads may wait on a locked mutex simultaneously. When the mutex becomes unlocked it is then locked by the highest-priority thread that has waited the longest.

多个线程可以同时等待某个被锁定的互斥量。当该互斥量被解锁后，它会被优先级最高的、等待时间最久的线程所使用。

:::note

Mutex objects are *not* designed for use by ISRs.

:::

:::note

不能在中断中使用互斥量。

:::

### 可重入锁（Reentrant Locking）

A thread is permitted to lock a mutex it has already locked. This allows the thread to access the associated resource at a point in its execution when the mutex may or may not already be locked.

线程可以锁定一个已经锁定的互斥量。这样做的好处是线程可以在执行的某个时刻（互斥量可能被锁定也可能未被锁定）访问该互斥量所关联的资源。

A mutex that is repeatedly locked by a thread must be unlocked an equal number of times before the mutex becomes fully unlocked so it can be claimed by another thread.

互斥量被一个线程多次锁定后，它必须被解锁相同的次数后才能被其它线程所获取到。

### 优先级继承

The thread that has locked a mutex is eligible for *priority inheritance*. This means the kernel will *temporarily* elevate the thread’s priority if a higher priority thread begins waiting on the mutex. This allows the owning thread to complete its work and release the mutex more rapidly by executing at the same priority as the waiting thread. Once the mutex has been unlocked, the unlocking thread resets its priority to the level it had before locking that mutex.

已锁定互斥量的线程具有 **优先级继承(priority inheritance)** 的能力。这意味着，如果有一个高优先级的线程开始等待这个互斥量，内核将 *临时* 提升占用互斥量线程的优先级。这样做的好处是，占用互斥量的线程可以与等待线程相同的优先级继续执行而不会被其抢占，因此可以更快速地执行并释放互斥量。互斥量一旦被解锁后，该线程的优先级会被恢复至锁定该互斥量前的优先级。

:::**Note**

The **[CONFIG_PRIORITY_CEILING](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_PRIORITY_CEILING)** configuration option limits how high the kernel can raise a thread’s priority due to priority inheritance. The default value of 0 permits unlimited elevation.

:::

:::note

内核由于优先级继承而提升线程的优先级时，配置选项 [CONFIG_PRIORITY_CEILING](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_PRIORITY_CEILING) 会限制其所能提升的最大优先级。默认值 0 允许内核可以对其进行无限制的提升。

:::

The owning thread’s base priority is saved in the mutex when it obtains the lock. Each time a higher priority thread waits on a mutex, the kernel adjusts the owning thread’s priority. When the owning thread releases the lock (or if the high priority waiting thread times out), the kernel restores the thread’s base priority from the value saved in the mutex.

当所属线程获得锁时，它的基本优先级保存在互斥锁中。每当有更高优先级的线程在互斥锁上等待时，内核就会调整所属线程的优先级。 当所属线程释放锁时(或者高优先级等待线程超时)，内核将根据互斥锁中保存的值恢复线程的基本优先级。

This works well for priority inheritance as long as only one locked mutex is involved. However, if multiple mutexes are involved, sub-optimal behavior will be observed if the mutexes are not unlocked in the reverse order to which the owning thread’s priority was previously raised. Consequently it is recommended that a thread lock only a single mutex at a time when multiple mutexes are shared between threads of different priorities.

当一个线程同时占用了两个或者多个互斥量时，内核不会完全支持优先级继承。这种情形会导致当所有的互斥量被释放后该线程的优先级不能恢复到它原先未被提升时的优先级。因此，当多个互斥量在不同的优先级的线程之间共享时，建议同一时刻只锁定一个互斥量。