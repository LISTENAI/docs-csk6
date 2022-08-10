# 管道

A pipe is a kernel object that allows a thread to send a byte stream to another thread. Pipes can be used to synchronously transfer chunks of data in whole or in part.

管道是一个内核对象，它允许一个线程发送字节流到另一个线程。管道可以用来同步传输整个或部分数据块。

## 概念

The pipe can be configured with a ring buffer which holds data that has been sent but not yet received; alternatively, the pipe may have no ring buffer.

管道可以配置一个用于保存已发送但尚为接收的数据环形缓冲区；或者，管道可能没有环形缓冲区。

Any number of pipes can be defined (limited only by available RAM). Each pipe is referenced by its memory address.

可以定义任意数量的管道（仅受可用 RAM 限制）。每个管道都由其内存地址引用。

A pipe has the following key property:

一个管道有以下关键属性：

- A **size** that indicates the size of the pipe’s ring buffer. Note that a size of zero defines a pipe with no ring buffer.
- **size** 是管道的环形缓冲区的大小。注意，大小为 0 说明管道没有环形缓冲区。

A pipe must be initialized before it can be used. The pipe is initially empty.

在可以使用前，管道必须要初始化。管道最初是空的。

Data is synchronously sent either in whole or in part to a pipe by a thread. If the specified minimum number of bytes can not be immediately satisfied, then the operation will either fail immediately or attempt to send as many bytes as possible and then pend in the hope that the send can be completed later. Accepted data is either copied to the pipe’s ring buffer or directly to the waiting reader(s).

全部数据或部分数据通过线程同步发送到管道。如果不能立即满足指定的最小字节数，则操作将立即失败或尝试发送尽可能多的字节然后等待，希望稍后可以发送完成。接收的数据要么复制到管道的环形缓冲区，要么直接复制到等待的读取器。

Data is synchronously received from a pipe by a thread. If the specified minimum number of bytes can not be immediately satisfied, then the operation will either fail immediately or attempt to receive as many bytes as possible and then pend in the hope that the receive can be completed later. Accepted data is either copied from the pipe’s ring buffer or directly from the waiting sender(s).

线程从管道同步接收数据。如果不能立即满足指定的最小字节数，则操作将立即失败或尝试接收尽可能多的字节然后等待，希望稍后可以完成接收。接收的数据要么从管道环形缓冲区复制，要么直接从等待的发送者复制。

Data may also be flushed from a pipe by a thread. Flushing can be performed either on the entire pipe or on only its ring buffer. Flushing the entire pipe is equivalent to reading all the information in the ring buffer and waiting to be written into a giant temporary buffer which is then discarded. Flushing the ring buffer is equivalent to reading only the data in the ring buffer into a temporary buffer which is then discarded. Flushing the ring buffer does not guarantee that the ring buffer will stay empty; flushing it may allow a pended writer to fill the ring buffer.

线程也可以在管道中刷新数据。可以在整个管道或仅在其环形缓冲区上执行刷新。刷新整个管道相当于读取环形缓冲区中的所有信息并等待写入一个巨大的临时缓冲区，然后将其丢弃。刷新环形缓冲区相当于只将环形缓冲区中的数据读取到临时缓冲区中，然后将其丢弃。刷新环形缓冲区并不能保证环形缓冲区保持为空，刷新它可能允许挂起的写入器填充环形缓冲区。

:::info 注意
Flushing does not in practice allocate or use additional buffers.

刷新实际上并不分配或使用额外的缓冲区。
:::

:::info 注意
The kernel does NOT allow for an ISR to send or receive data to/from a pipe or flush even if it does not attempt to wait for space/data.

内核不允许 ISR 向/从 管道发送或接收数据或刷新，即使它不尝试等待 空间/数据。
:::

## 实现

A pipe is defined using a variable of type [k_pipe](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe) and an optional character buffer of type `unsigned char`. It must then be initialized by calling [k_pipe_init()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_init).

使用  [k_pipe](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe) 类型的变量和 `unsigned char` 类型的可选字符缓冲区定义管道。然后必须通过调用 [k_pipe_init()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_init) 对其进行初始化。

The following code defines and initializes an empty pipe that has a ring buffer capable of holding 100 bytes and is aligned to a 4-byte boundary.

以下代码定义并初始化一个空管道，该管道具有一个能够容纳 100 字节的环形缓冲区并与 4 字节范围对齐。

```c
unsigned char __aligned(4) my_ring_buffer[100];
struct k_pipe my_pipe;

k_pipe_init(&my_pipe, my_ring_buffer, sizeof(my_ring_buffer));
```

Alternatively, a pipe can be defined and initialized at compile time by calling [K_PIPE_DEFINE](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.K_PIPE_DEFINE).

或者，可以通过调用宏  [K_PIPE_DEFINE](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.K_PIPE_DEFINE) 定义和初始化管道。

The following code has the same effect as the code segment above. Observe that that macro defines both the pipe and its ring buffer.

下面的代码和上面定义的一样。请注意，该宏定义了管道及其环形缓冲区。

```c 
K_PIPE_DEFINE(my_pipe, 100, 4);
```

## 写数据到管道

Data is added to a pipe by calling [k_pipe_put()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_put).

调用 [k_pipe_put()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_put) 可将数据添加到管道。

The following code builds on the example above, and uses the pipe to pass data from a producing thread to one or more consuming threads. If the pipe’s ring buffer fills up because the consumers can’t keep up, the producing thread waits for a specified amount of time.

以下代码建立在上面的示例之上，并使用管道将数据从生产线程传递到一个或多个消费线程。如果管道的环形缓冲区因消费者无法跟上而填满，则生成线程会等待指定的时间。

```c
struct message_header {
    ...
};

void producer_thread(void)
{
    unsigned char *data;
    size_t total_size;
    size_t bytes_written;
    int    rc;
    ...

    while (1) {
        /* Craft message to send in the pipe */
        data = ...;
        total_size = ...;

        /* send data to the consumers */
        rc = k_pipe_put(&my_pipe, data, total_size, &bytes_written,
                        sizeof(struct message_header), K_NO_WAIT);

        if (rc < 0) {
            /* Incomplete message header sent */
            ...
        } else if (bytes_written < total_size) {
            /* Some of the data was sent */
            ...
        } else {
            /* All data sent */
            ...
        }
    }
} 
```

### 从管道中读取数据

Data is read from the pipe by calling [k_pipe_get()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_get).

调用 [k_pipe_get()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_get) 可从管道中读取数据。

The following code builds on the example above, and uses the pipe to process data items generated by one or more producing threads.

以下代码建立在上面的示例之上，并使用管道来处理一个或多个生产线程生成的数据项。

```c
void consumer_thread(void)
{
    unsigned char buffer[120];
    size_t   bytes_read;
    struct message_header  *header = (struct message_header *)buffer;

    while (1) {
        rc = k_pipe_get(&my_pipe, buffer, sizeof(buffer), &bytes_read,
                        sizeof(header), K_MSEC(100));

        if ((rc < 0) || (bytes_read < sizeof (header))) {
            /* Incomplete message header received */
            ...
        } else if (header->num_data_bytes + sizeof(header) > bytes_read) {
            /* Only some data was received */
            ...
        } else {
            /* All data was received */
            ...
        }
    }
}
```

Use a pipe to send streams of data between threads.

使用管道在线程之间发送数据流。

:::info 注意
A pipe can be used to transfer long streams of data if desired. However it is often preferable to send pointers to large data items to avoid copying the data.

如果需要，可以使用管道传输长数据流。然而，通常最好发送指向大数据项的指针以避免复制数据。
:::

### 刷新管道缓冲区

Data is flushed from the pipe’s ring buffer by calling [k_pipe_buffer_flush()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_buffer_flush).

调用 [k_pipe_buffer_flush()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_buffer_flush) 可刷新管道的环形缓冲区的数据。

The following code builds on the examples above, and flushes the pipe’s buffer.

以下代码建立在上面的示例之上，并刷新管道缓冲区。

```c
void monitor_thread(void)
{
    while (1) {
        ...
        /* Pipe buffer contains stale data. Flush it. */
        k_pipe_buffer_flush(&my_pipe);
        ...
    }
}
```

### 使用建议

Use a pipe to send streams of data between threads.

使用管道在线程之间发送数据流。

:::info 注意
A pipe can be used to transfer long streams of data if desired. However it is often preferable to send pointers to large data items to avoid copying the data.

如果需要，可以使用管道传输长数据流。然而，通常最好发送指向大数据项的指针以避免复制数据。
:::