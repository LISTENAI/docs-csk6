# 管道

管道是一个内核对象，它允许一个线程发送字节流到另一个线程。管道可以用来同步传输整个或部分数据块。

## 概念

管道可以配置一个用于保存已发送但尚为接收的数据环形缓冲区；或者，管道可能没有环形缓冲区。

可以定义任意数量的管道（仅受可用 RAM 限制）。每个管道都由其内存地址引用。

一个管道有以下关键属性：

- **size** 是管道的环形缓冲区的大小。注意，大小为 0 说明管道没有环形缓冲区。

在可以使用前，管道必须要初始化。管道最初是空的。

全部数据或部分数据通过线程同步发送到管道。如果不能立即满足指定的最小字节数，则操作将立即失败或尝试发送尽可能多的字节然后等待，希望稍后可以发送完成。接收的数据要么复制到管道的环形缓冲区，要么直接复制到等待的读取器。

线程从管道同步接收数据。如果不能立即满足指定的最小字节数，则操作将立即失败或尝试接收尽可能多的字节然后等待，希望稍后可以完成接收。接收的数据要么从管道环形缓冲区复制，要么直接从等待的发送者复制。

线程也可以在管道中刷新数据。可以在整个管道或仅在其环形缓冲区上执行刷新。刷新整个管道相当于读取环形缓冲区中的所有信息并等待写入一个巨大的临时缓冲区，然后将其丢弃。刷新环形缓冲区相当于只将环形缓冲区中的数据读取到临时缓冲区中，然后将其丢弃。刷新环形缓冲区并不能保证环形缓冲区保持为空，刷新它可能允许挂起的写入器填充环形缓冲区。

:::info 注意
刷新实际上并不分配或使用额外的缓冲区。
:::

:::info 注意
内核不允许 ISR 向/从 管道发送或接收数据或刷新，即使它不尝试等待 空间/数据。
:::

## 实现

使用  [k_pipe](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe) 类型的变量和 `unsigned char` 类型的可选字符缓冲区定义管道。然后必须通过调用 [k_pipe_init()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_init) 对其进行初始化。

以下代码定义并初始化一个空管道，该管道具有一个能够容纳 100 字节的环形缓冲区并与 4 字节范围对齐。

```c
unsigned char __aligned(4) my_ring_buffer[100];
struct k_pipe my_pipe;

k_pipe_init(&my_pipe, my_ring_buffer, sizeof(my_ring_buffer));
```

或者，可以通过调用宏  [K_PIPE_DEFINE](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.K_PIPE_DEFINE) 定义和初始化管道。

下面的代码和上面定义的一样。请注意，该宏定义了管道及其环形缓冲区。

```c 
K_PIPE_DEFINE(my_pipe, 100, 4);
```

## 写数据到管道

调用 [k_pipe_put()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_put) 可将数据添加到管道。

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

调用 [k_pipe_get()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_get) 可从管道中读取数据。

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

使用管道在线程之间发送数据流。

:::info 注意
如果需要，可以使用管道传输长数据流。然而，通常最好发送指向大数据项的指针以避免复制数据。
:::

### 刷新管道缓冲区

调用 [k_pipe_buffer_flush()](https://docs.zephyrproject.org/latest/kernel/services/data_passing/pipes.html#c.k_pipe_buffer_flush) 可刷新管道的环形缓冲区的数据。

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

使用管道在线程之间发送数据流。

:::info 注意
如果需要，可以使用管道传输长数据流。然而，通常最好发送指向大数据项的指针以避免复制数据。
:::