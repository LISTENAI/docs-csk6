# FIFOs

A FIFO is a kernel object that implements a traditional first in, first out (FIFO) queue, allowing threads and ISRs to add and remove data items of any size.

FIFO 是一个内核对象，它实现了传统的先进先出 (first in first out) 队列，允许在线程和中断 中添加、移除任意尺寸的数据项。

# 概念

Any number of FIFOs can be defined (limited only by available RAM). Each FIFO is referenced by its memory address.

可以定义任意数量的 FIFOs (受到RAM的限制)。每个 FIFO 通过其内存地址进行引用。

A FIFO has the following key properties:

FIFO 的关键属性包括：

- A **queue** of data items that have been added but not yet removed. The queue is implemented as a simple linked list.
- 已添加但尚未移除的数据项队列。队列是使用一个简单的单链表实现的。

A FIFO must be initialized before it can be used. This sets its queue to empty.

FIFO 必须先初始化再使用。初始化时会将队列设为空。

FIFO data items must be aligned on a word boundary, as the kernel reserves the first word of an item for use as a pointer to the next data item in the queue.

FIFO 的数据项必须 4 字节向上对齐，这是因为每个数据项的首个4字节是内核保留的，它被当做指针用来指向队列中的下一个数据项。

Consequently, a data item that holds N bytes of application data requires N+4 (or N+8) bytes of memory.

因此，如果应用程序需要 N 字节的数据项时，实际需要 N+4(或N+8) 字节的内存。

There are no alignment or reserved space requirements for data items if they are added with k_fifo_alloc_put(), instead additional memory is temporarily allocated from the calling thread’s resource pool.

如果使用 `k_fifo_alloc_put()` 添加数据的话，则不需要数据对齐或者保留空间的，这些额外的内存是临时从调用线程的资源池中分配的。

A data item may be added to a FIFO by a thread or an ISR. The item is given directly to a waiting thread, if one exists; otherwise the item is added to the FIFO’s queue. There is no limit to the number of items that may be queued.

数据项可以被线程或者中断添加到 FIFO 中。如果有线程在等待从这个 FIFO 中取数据，这个数据项则直接被给予这个线程；否则，该项会被直接添加到 FIFO 的队列中去。对可入队的数据项的数量没有任何限制。

A data item may be removed from a FIFO by a thread. If the FIFO’s queue is empty a thread may choose to wait for a data item to be given. Any number of threads may wait on an empty FIFO simultaneously. When a data item is added, it is given to the highest priority thread that has waited longest.

数据项可以被线程从 FIFO 中移除。如果该 FIFO 的队列为空，线程在这个 FIFO 上进行等待。多个线程可以同时在某个空 FIFO 上等待，当一个新的数据项被添加时，它会被给予优先级最高的、等待时间最久的线程。

:::note

The kernel does allow an ISR to remove an item from a FIFO, however the ISR must not attempt to wait if the FIFO is empty.

:::note

中断服务函数虽然也可以从 FIFO 中移除数据，但是如果 FIFO 为空，中断服务函数中不能进行等待。

:::