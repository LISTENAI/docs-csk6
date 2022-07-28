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

信号量可以在线程或中断中进行释放(give)。释放信号量会使其计数递增，直到计数达到上限。

A semaphore may be **taken** by a thread. Taking the semaphore decrements its count, unless the semaphore is unavailable (i.e. at zero). When a semaphore is unavailable a thread may choose to wait for it to be given. Any number of threads may wait on an unavailable semaphore simultaneously. When the semaphore is given, it is taken by the highest priority thread that has waited longest.

线程可以获取(take)信号量。获取信号量时其计数会递减，除非信号量无效（例如为零）。当信号量不可用时，线程可以等待，直到获取到信号量。多个线程可以同时等待某个无效的信号量。当信号量可用时，它会被优先级最高的、等待时间最久的线程获取到。

:::Note

You may initialize a “full” semaphore (count equal to limit) to limit the number of threads able to execute the critical section at the same time. You may also initialize an empty semaphore (count equal to 0, with a limit greater than 0) to create a gate through which no waiting thread may pass until the semaphore is incremented. All standard use cases of the common semaphore are supported.

:::

:::note

可以初始化一个full信号量（计数值等于最大值），用来限制某段代码的并发执行数量。也可以初始化一个空信号量(计数值为0)，用来阻塞线程，直到该信号量释放。

:::

:::note

The kernel does allow an ISR to take a semaphore, however the ISR must not attempt to wait if the semaphore is unavailable.

:::

:::note

内核允许在中断服务函数中获取信号量，但当信号量无效时，不能在中断服务函数中阻塞等待该信号量。

:::