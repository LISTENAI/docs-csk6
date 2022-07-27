# 信号量

Any number of semaphores can be defined (limited only by available RAM). Each semaphore is referenced by its memory address.

可以定义任意数量的信号量(受限于RAM)。每个信号量通过其内存地址进行引用。

A semaphore has the following key properties:

- A **count** that indicates the number of times the semaphore can be taken. A count of zero indicates that the semaphore is unavailable.
- A **limit** that indicates the maximum value the semaphore’s count can reach.

信号量的关键属性如下：

- 计数值： 信号量可以被获取的次数。计数为零表示该信号量不可用。
- 边界值： 信号量的计数器能达到的最大值。

A semaphore must be initialized before it can be used. Its count must be set to a non-negative value that is less than or equal to its limit.

信号量必须先初始化再使用。信号量的计数必须被初始化为非负值，且小于等于边界值。

A semaphore may be **given** by a thread or an ISR. Giving the semaphore increments its count, unless the count is already equal to the limit.

线程或 中断可以释放(give)一个信号量。释放信号量时其计数会递增，除非计数已等于上限。

A semaphore may be **taken** by a thread. Taking the semaphore decrements its count, unless the semaphore is unavailable (i.e. at zero). When a semaphore is unavailable a thread may choose to wait for it to be given. Any number of threads may wait on an unavailable semaphore simultaneously. When the semaphore is given, it is taken by the highest priority thread that has waited longest.

线程可以获取(take)信号量。获取信号量时其计数会递减，除非信号量无效（例如为零）。当信号量不可用时，线程可以等待，直到获取到信号量。多个线程可以同时等待某个无效的信号量。当信号量可用时，它会被优先级最高的、等待时间最久的线程获取到。

:::Note

You may initialize a “full” semaphore (count equal to limit) to limit the number of threads able to execute the critical section at the same time. You may also initialize an empty semaphore (count equal to 0, with a limit greater than 0) to create a gate through which no waiting thread may pass until the semaphore is incremented. All standard use cases of the common semaphore are supported.

:::

:::note

可以初始化一个`full`信号量(计数值等于最大值)来限制能够同时执行临界区的线程数。 也可以初始化一个空信号量(计数值等于0，限制值大于0)来创建条件，在信号量计数值增加前，等待的线程不能满足该条件。 

:::

:::note

The kernel does allow an ISR to take a semaphore, however the ISR must not attempt to wait if the semaphore is unavailable.

:::

:::note

内核允许中断服务函数去获取信号量，不过如果信号量的信号值无效时，中断不能阻塞等待。

:::