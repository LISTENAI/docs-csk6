# 工作队列线程

A workqueue is a kernel object that uses a dedicated thread to process work items in a first in, first out manner. Each work item is processed by calling the function specified by the work item. A workqueue is typically used by an ISR or a high-priority thread to offload non-urgent processing to a lower-priority thread so it does not impact time-sensitive processing.

工作队列（workqueue ）是一个使用特定线程来运行工作项（work items）的内核对象，其方式为先进先出，通过调用工作项指定的函数来处理每个工作项。工作队列的一个典型应用是在ISR或者高优先级中去分担部分工作到一个低优先级的线程中，·目的是减少ISR或高优先级任务的处理时长，所以它不影响时间敏感的处理。

Any number of workqueues can be defined (limited only by available RAM). Each workqueue is referenced by its memory address.

可以定义无上限的工作队列（仅受RAM限制）。每个工作队列通过地址引用。

A workqueue has the following key properties:

- A **queue** of work items that have been added, but not yet processed.
- A **thread** that processes the work items in the queue. The priority of the thread is configurable, allowing it to be either cooperative or preemptive as required.

工作队列有下列关键属性：

- 一个已经添加了工作项，但未进行处理的队列。
- 一个处理队列中的工作项的线程。该线程的优先级是可以配置的，允许为协作式线程或抢占式线程。

Regardless of workqueue thread priority the workqueue thread will yield between each submitted work item, to prevent a cooperative workqueue from starving other threads.

不管工作队列优先级如何，工作队列线程将在提交工作项之后进行让出（yield）CPU，防止协作式工作队列饿死其他线程。

A workqueue must be initialized before it can be used. This sets its queue to empty and spawns the workqueue’s thread. The thread runs forever, but sleeps when no work items are available.

工作队列必须在使用前初始化。工作队列创建时会清空队列和创建一个工作队列的线程。这个线程在没有工作项时睡眠，其他时间处于就绪态。

## 工作项生命周期

Any number of **work items** can be defined. Each work item is referenced by its memory address.

可以定义无上限的工作项。每个工作项可以通过地址进行引用。

A work item is assigned a **handler function**, which is the function executed by the workqueue’s thread when the work item is processed. This function accepts a single argument, which is the address of the work item itself. The work item also maintains information about its status.

每个工作项都被分配一个处理函数（handler function），这是工作队列线程在执行工作项时执行的函数。处理函数唯一的形参就是工作项句柄，可在工作项句柄中获取工作项状态。

A work item must be initialized before it can be used. This records the work item’s handler function and marks it as not pending.

工作项必须在使用前初始化。初始化时工作项时会分配处理函数，然后标记为未完成。

A work item may be queued (K_WORK_QUEUED) by submitting it to a workqueue by an ISR or a thread. Submitting a work item appends the work item to the workqueue’s queue. 

在ISR或线程中，工作项可被添加到工作队列中，此时工作项处于`K_WORK_QUEUED` 状态。

Once the workqueue’s thread has processed all of the preceding work items in its queue the thread will remove the next work item from the queue and invoke the work item’s handler function. 

一旦工作队列的线程处理完其队列中所有前面的工作项，该线程将从工作队列中移除下一个工作项并调用该工作项的处理函数。

Depending on the scheduling priority of the workqueue’s thread, and the work required by other items in the queue, a queued work item may be processed quickly or it may remain in the queue for an extended period of time.

根据工作队列线程的调度优先级，以及队列中其他工作项所需的时间长短，那么队列中的工作项可能被迅速处理，也可能在队列中停留较长的一段时间。

A delayable work item may be scheduled (K_WORK_DELAYED) to a workqueue; see Delayable Work.

工作项可以标记为延迟工作项（`K_WORK_DELAYED`），参考可延迟工作。

A work item will be running (K_WORK_RUNNING) when it is running on a work queue, and may also be canceling (K_WORK_CANCELING) if it started running before a thread has requested that it be cancelled.

当工作队列正在运行时，工作项可被执行（`K_WORK_CANCELING`）。如果该工作项还未被执行，也可被取消（`K_WORK_CANCELING`）。

A work item can be in multiple states; for example it can be:

- running on a queue;
- marked canceling (because a thread used **`[k_work_cancel_sync()](https://docs.zephyrproject.org/latest/kernel/services/threads/workqueue.html#c.k_work_cancel_sync)`** to wait until the work item completed);
- queued to run again on the same queue;
- scheduled to be submitted to a (possibly different) queue

工作项可处于多种状态，比如说：

- 标记为运行（`K_WORK_RUNNING`）
- 标记为取消（`K_WORK_CANCELING`）
- 在相同队列中再次运行
- 计划提交到队列中

all simultaneously. A work item that is in any of these states is pending (k_work_is_pending()) or busy (k_work_busy_get()).

可以通过`k_work_is_pending()` 或`k_work_busy_get()` 获取工作项状态。

A handler function can use any kernel API available to threads. However, operations that are potentially blocking (e.g. taking a semaphore) must be used with care, since the workqueue cannot process subsequent work items in its queue until the handler function finishes executing.

处理函数可以调用任何适用于线程的内核API。但是，带阻塞相关的接口（如`k_sem_take`）需要斟酌使用。

The single argument that is passed to a handler function can be ignored if it is not required. If the handler function requires additional information about the work it is to perform, the work item can be embedded in a larger data structure. The handler function can then use the argument value to compute the address of the enclosing data structure with CONTAINER_OF, and thereby obtain access to the additional information it needs.

根据实际需求，选择性使用处理函数的形参。如果处理函数需要更多的信息，可以将工作项句柄作为结构体成员。处理函数调用`CONTAINER_OF` 宏获取到结构体地址，从而获取更多的信息。

A work item is typically initialized once and then submitted to a specific workqueue whenever work needs to be performed. If an ISR or a thread attempts to submit a work item that is already queued the work item is not affected; the work item remains in its current place in the workqueue’s queue, and the work is only performed once.

一个工作项目通常被初始化一次，在需要执行工作项时提交给工作队列。提交一个已经在工作队列中工作项是不会产生任何影响，不会影响该工作项在工作队列中的位置，并且只会执行一次。

A handler function is permitted to re-submit its work item argument to the workqueue, since the work item is no longer queued at that time. This allows the handler to execute work in stages, without unduly delaying the processing of other work items in the workqueue’s queue.

在工作项执行完成以后，工作项允许重新分配处理函数，在不同阶段时分配不同的处理函数，能避免工作队列中有冗余的工作项。


## 可延迟工作

An ISR or a thread may need to schedule a work item that is to be processed only after a specified period of time, rather than immediately. This can be done by scheduling a delayable work item to be submitted to a workqueue at a future time.

如果在ISR或线程中需要调度一个工作项在指定周期后执行，那么通过可延迟的工作项（delayable work item）在将来的某个时间提交到工作队列中完成。

A delayable work item contains a standard work item but adds fields that record when and where the item should be submitted.

一个可延迟工作项结构在标准工作项结构的基础上额外添加字段，用于描述何时将在工作项添加到制定的队列。

A delayable work item is initialized and scheduled to a workqueue in a similar manner to a standard work item, although different kernel APIs are used. 

可延迟工作项的初始化和排到工作队列中的行为与标准工作项一致，只是调用的内核API不同。

When the schedule request is made the kernel initiates a timeout mechanism that is triggered after the specified delay has elapsed. Once the timeout occurs the kernel submits the work item to the specified workqueue, where it remains queued until it is processed in the standard manner.

在工作项添加完成后，内核启动超时机制，在指定的延迟后被触发。一旦超时发生，内核就会把工作项目提交给指定的工作队列，工作项一直被排在工作队列中，以标准工作项方式被处理。

Note that work handler used for delayable still receives a pointer to the underlying non-delayable work structure, which is not publicly accessible from k_work_delayable. To get access to an object that contains the delayable work object use this idiom:

延迟工作项处理函数的形参是标准工作项句柄，如果想获取延迟工作项的句柄，需要使用如下方法：

```c
static void work_handler(struct k_work *work)
{
        struct k_work_delayable *dwork = k_work_delayable_from_work(work);
        struct work_context *ctx = CONTAINER_OF(dwork, struct work_context,
                                                timed_work);
        ...
```

## 可触发工作

因为k_poll为P2，故暂不译该部分。

## 系统工作队列

The kernel defines a workqueue known as the *system workqueue*, which is available to any application or kernel code that requires workqueue support. The system workqueue is optional, and only exists if the application makes use of it.

内核定义了系统工作队列，用于任何应用或者内核代码。系统工作队列是可选项，只有在应用程序使用它的情况下才存在。

:::note

Additional workqueues should only be defined when it is not possible to submit new work items to the system workqueue, since each new workqueue incurs a significant cost in memory footprint. A new workqueue can be justified if it is not possible for its work items to co-exist with existing system workqueue work items without an unacceptable impact; for example, if the new work items perform blocking operations that would delay other system workqueue processing to an unacceptable degree.

:::

:::note

只有在系统工作队列无法满足需求的时候，才建议新创建一个工作队列， 因为每个工作队列都会占用较大的内存。如果新的工作项执行阻塞性操作，会使其他系统工作队的处理延迟到不可接受的程度。那么这种情况下，可以新建一个工作队列。

:::