# 消息队列

A message queue is a kernel object that implements a simple message queue, allowing threads and ISRs to asynchronously send and receive fixed-size data items.  
消息队列是实现简单消息队列的内核对象，允许线程和ISR异步发送和接收固定大小的数据项。

## 概念

Any number of message queues can be defined (limited only by available RAM). Each message queue is referenced by its memory address.  
可以定义任意数量的消息队列（仅受可用RAM限制）。每个消息队列都由其内存地址引用。

A message queue has the following key properties:  
消息队列具有以下关键属性：

 * A ring buffer of data items that have been sent but not yet received.  
    已发送但尚未接收的数据项的**环形缓冲区**。

 * A data item size, measured in bytes.  
    **数据项大小**, 以字节为单位。

 * A maximum quantity of data items that can be queued in the ring buffer.  
    可以在环形缓冲区中排队的**最大数据项数量**。

The message queue’s ring buffer must be aligned to an N-byte boundary, where N is a power of 2 (i.e. 1, 2, 4, 8, …). To ensure that the messages stored in the ring buffer are similarly aligned to this boundary, the data item size must also be a multiple of N.  
消息队列的环形缓冲区必须与N字节边界对齐，其中N时2的幂（即1，2，4，8，……）。为了确保存储在环形缓冲区中的消息与边界对齐，数据项大小也必须时N的倍数量。

A message queue must be initialized before it can be used. This sets its ring buffer to empty.  
消息队列必须先初始化才能使用。它会将环形缓冲区设置为空。

A data item can be sent to a message queue by a thread or an ISR. The data item pointed at by the sending thread is copied to a waiting thread, if one exists; otherwise the item is copied to the message queue’s ring buffer, if space is available. In either case, the size of the data area being sent must equal the message queue’s data item size.  
数据项可以通过线程或 ISR **发送**到消息队列。发送线程指向的数据项被复制到一个等待线程（如果存在）；否则，如果空间可用，则将该项目复制到信息队列的环形缓冲区。在任何一种情况下，正在发送的数据区域的大小都必须等于消息队列的数据项大小。

If a thread attempts to send a data item when the ring buffer is full, the sending thread may choose to wait for space to become available. Any number of sending threads may wait simultaneously when the ring buffer is full; when space becomes available it is given to the highest priority sending thread that has waited the longest.  
如果一个线程的环形缓冲区已满时尝试发送数据项，则发送线程可以选择等待空间变为可用。当环形缓冲区满时，任意数量的发送线程可以同时等待；当空间可用时，它会分配等待时间最长优先级最高的发送线程。

A data item can be received from a message queue by a thread. The data item is copied to the area specified by the receiving thread; the size of the receiving area must equal the message queue’s data item size.  
线程可以从消息队列接收数据项。数据项复制到接收线程指定的区域；接收区域的大小必须等于消息队列的数据项大小。

If a thread attempts to receive a data item when the ring buffer is empty, the receiving thread may choose to wait for a data item to be sent. Any number of receiving threads may wait simultaneously when the ring buffer is empty; when a data item becomes available it is given to the highest priority receiving thread that has waited the longest.  
如果一个线程尝试在环形缓冲区为空时接收数据项，则接收线程可以选择等待发送数据项。当环缓冲区为空时，任何数量的接收线程都可能同时等待; 当空间可用时，它会分配等待时间最长优先级最高的接收线程。

A thread can also **peek** at the message on the head of a message queue without removing it from the queue. The data item is copied to the area specified by the receiving thread; the size of the receiving area must equal the message queue’s data item size.  
线程还可以在不把它从队列中删除的情况下查看消息队列头部的消息。将数据项复制到接收线程指定的区域；接收区域的大小必须等于消息队列的数据项大小。

:::info 注意
The kernel does allow an ISR to receive an item from a message queue, however the ISR must not attempt to wait if the message queue is empty.  
内核允许ISR从消息队列接收数据项，但如果消息队列为空时，ISR不得尝试等待。
:::

## 实现

### 定义消息队列

A message queue is defined using a variable of type k_msgq. It must then be initialized by calling k_msgq_init().  
消息队列是使用 [k_msgq](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.k_msgq) 类型变量来定义的，它必须通过 [k_msgq_init()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.k_msgq_init) 来初始化。

The following code defines and initializes an empty message queue that is capable of holding 10 items, each of which is 12 bytes long.  
下面的代码定义并初始化了一个空消息队列，该队列能容纳10个数据项，每个数据项的长度为12字节。

```
struct data_item_type {
    uint32_t field1;
    uint32_t field2;
    uint32_t field3;
};

char __aligned(4) my_msgq_buffer[10 * sizeof(struct data_item_type)];
struct k_msgq my_msgq;

k_msgq_init(&my_msgq, my_msgq_buffer, sizeof(struct data_item_type), 10);
```

Alternatively, a message queue can be defined and initialized at compile time by calling K_MSGQ_DEFINE.  
或者可以再编译时，通过调用[K_MSGQ_DEFINE](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.K_MSGQ_DEFINE)来定义和初始化消息队列。

The following code has the same effect as the code segment above. Observe that the macro defines both the message queue and its buffer.  
下面的代码与上面的代码段具有相同的效果。请注意，该宏同时定义了消息队列及其缓冲区。
```
K_MSGQ_DEFINE(my_msgq, sizeof(struct data_item_type), 10, 4);
```

The following code demonstrates an alignment implementation for the structure defined in the previous example code. aligned means each data_item_type will begin on the specified byte boundary. aligned(4) means that the structure is aligned to an address that is divisible by 4.  
下面的代码演示了前面示例代码中定义的结构的对齐实现。`aligned` 意味着每个 `data_item_type` 将从指定的字节边界开始。`aligned(4)` 表示结构与可被4整除的地址对齐。
```
typedef struct {
    uint32_t field1;
    uint32_t field2;
    uint32_t field3;
}__attribute__((aligned(4))) data_item_type;
```

### 写入消息队列

A data item is added to a message queue by calling k_msgq_put().  
通过调用 [k_msgq_put()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.k_msgq_put) 将数据项添加到消息队列。

The following code builds on the example above, and uses the message queue to pass data items from a producing thread to one or more consuming threads. If the message queue fills up because the consumers can’t keep up, the producing thread throws away all existing data so the newer data can be saved.  
下面的代码以上面的示例为基础，并使用消息队列将数据项从生产线程传递到一个或多个消费线程。如果消息队列因消费者跟不上而填满，则生产线程会丢弃所有现有数据，以便保存较新的数据。

```
void producer_thread(void)
{
    struct data_item_type data;

    while (1) {
        /* create data item to send (e.g. measurement, timestamp, ...) */
        data = ...

        /* send data to consumers */
        while (k_msgq_put(&my_msgq, &data, K_NO_WAIT) != 0) {
            /* message queue is full: purge old data & try again */
            k_msgq_purge(&my_msgq);
        }

        /* data item was successfully added to message queue */
    }
}
```

### 读取消息队列

A data item is taken from a message queue by calling k_msgq_get().  
通过调用 [k_msgq_get()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.k_msgq_get) 从消息队列中获取数据项。

The following code builds on the example above, and uses the message queue to process data items generated by one or more producing threads. Note that the return value of k_msgq_get() should be tested as -ENOMSG can be returned due to k_msgq_purge().  
下面的代码以上面的示例为基础，并使用消息队列处理一个或多个生产线程生成的数据项。注意，应该测试 [k_msgq_get()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.k_msgq_get)的返回值，因为[k_msgq_purge()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.k_msgq_purge)返回`-ENOMSG`。
```
void consumer_thread(void)
{
    struct data_item_type data;

    while (1) {
        /* get a data item */
        k_msgq_get(&my_msgq, &data, K_FOREVER);

        /* process data item */
        ...
    }
}
```

### 查看消息队列

A data item is read from a message queue by calling k_msgq_peek().  
通过调用 [k_msgq_peek()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#c.k_msgq_peek)从消息队列读取数据项。

The following code peeks into the message queue to read the data item at the head of the queue that is generated by one or more producing threads.  
下面的代码查看消息队列，来读取由一个或多个生产线程生成的队列头部的数据项。
```
void consumer_thread(void)
{
    struct data_item_type data;

    while (1) {
        /* read a data item by peeking into the queue */
        k_msgq_peek(&my_msgq, &data);

        /* process data item */
        ...
    }
}
```

## 建议用途

Use a message queue to transfer small data items between threads in an asynchronous manner.  
使用消息队列以异步方式在线程之间传输小数据项。

:::info 注意
A message queue can be used to transfer large data items, if desired. However, this can increase interrupt latency as interrupts are locked while a data item is written or read. The time to write or read a data item increases linearly with its size since the item is copied in its entirety to or from the buffer in memory. For this reason, it is usually preferable to transfer large data items by exchanging a pointer to the data item, rather than the data item itself.  
如果需要，可以使用消息队列传输大型数据项。但是，当数据项被写入或读取时，中断会被锁定，这会增加中断延迟。写入或读取数据项的时间随其大小线性增加，因为该数据项会被完全复制到内存中的缓冲区或从缓冲区中复制。因此，通常最好通过交换指向数据项的指针而不是数据项本身来传输大型数据项。

A synchronous transfer can be achieved by using the kernel’s mailbox object type.  
可以通过使用内核的邮箱对象类型来实现同步传输。
:::

## 配置选项

Related configuration options:  
 相关配置选项:

 * None. 没有.

## API参考

相关内容，请参考[消息队列API](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html#api-reference)。