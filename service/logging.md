日志
=======

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

日志（Logging） API 提供了一个通用接口来处理开发者发出的消息。消息通过前端传递，然后由正活跃的后端处理。如果需要，可以使用自定义前端和后端。

日志记录功能摘要：

- 延迟日志以减少打印日志所需的时间 —— 日志消息并不是在调用时就处理和发送，而是将耗时的操作转移到已知上下文。
- 支持多个后端（最多 9 个）。
- 自定义前端支持。启用后，任何后端都不能处于活动状态。
- 模块级别的编译时过滤。
- 运行时过滤，每个后端互不影响。
- 基于模块实例级别的额外运行时过滤。
- 时间戳，基于用户提供的函数。
- 用于转储数据的专用 API 。
- 用于处理瞬态字符串的专用 API 。
- Panic 支持 - 在 Panic 模式下，日志切换到阻塞、同步处理。
- Printk 支持 - printk 消息可重定向到日志输出。
- 为多域/多处理器系统设计做好准备。

Logging v2 引入了以下更改：

- 可选使用 64 位时间戳
- 支持日志中打印浮点变量
- 支持日志使用的变量扩展机器字的大小（例如在 32 位架构上使用 64 位值）
- 不需要对 `%s` 格式说明符进行特殊处理
- 扩展用于转储数据的 API 以接受格式化字​​符串
- 提高内存利用率。延迟模式下，日志记录缓冲区可适用于更多日志消息。
- 日志消息不再碎片化。它是独立的内存块，简化了域外处理（例如离线处理）
- 提高在用户空间打日志的性能
- 提高了记录到完整缓冲区和消息时的性能。
- 由于来自环形缓冲区的分配比来自 memslab 的分配更复杂，因此在正常情况下会略微降低性能。
- 日志 API 没有变化
- 日志到前端可以与后端一起使用。
- 日志后端 API 扩展了处理 v2 消息的函数。

:::info 注意
Logging v1 已弃用！v2 支持与上面列出的扩展相同的一组函数。但是，日志记录后端 API 是不同的。SDK 中的所有后端都支持 v2 API。任何自定义后端都必须适配 v2 。 v1 支持将在 3.1 发布后删除。
:::

Logging API 在编译时和运行时都是高度可配置的。使用 Kconfig 选项（请参阅 [全局 Kconfig 选项](#logging_kconfig) ），可以将日志逐渐从编译中删除，以在不需要日志时减少镜像大小和执行时间。在编译期间，可以根据模块和严重级别过滤掉日志。

也可以使用专用 API 编译日志相关函数，然后在运行时对其进行过滤。运行时过滤对于每个后端和每个日志消息源都是独立的。日志消息的来源可以是模块或模块的特定实例。

系统中有四个可用的严重级别： error 、 warning 、 info 和 debug 。对于每个严重级别，日志 API（[include/logging/log.h](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/include/logging/log.h)）都有一组专用宏。 Logger API 也有用于记录数据的宏。

对于每个级别，以下宏都是可用的：

- `LOG_X` 用于标准的类似 printf 的消息，例如 [`LOG_ERR`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_ERR) 。
- `LOG_HEXDUMP_X` 用于转储数据，例如 [`LOG_HEXDUMP_WRN`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_HEXDUMP_WRN) 。
- `LOG_INST_X` 用于与特定实例关联的标准类似 printf 的消息，例如 [`LOG_INST_INF`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_INST_INF) 。
- `LOG_INST_HEXDUMP_X` 用于转储与特定实例关联的数据，例如 [`LOG_INST_HEXDUMP_INF`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_INST_HEXDUMP_INF)

有两种配置类别： **模块配置** 和 **全局配置** 。当日志记录在全局启用时，它也将用于模块。但是，模块可以在本地禁用日志记录。每个模块都可以指定自己的日志记录级别。模块必须在使用 API 之前定义 `LOG_LEVEL` 宏。除非设置了全局覆盖，否则将遵循模块日志记录级别。全局覆盖只能 **提高** 日志记录级别。它不能用于降低以前设置的更高的模块日志记录级别。也可以通过提供系统中存在的最大严重性级别（ [`CONFIG_LOG_MAX_LEVEL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MAX_LEVEL) ）来全局限制日志，这里的 *最大* 指的是最低严重性（例如，如果系统中的最大级别设置为 info ，则意味着可存在 error 、 warning 和 info 级别，但 debug 日志被排除在外）。

使用日志的每个模块都必须指定其唯一名称，并自己将其注册到日志中。如果模块包含多个文件，可以只在一个文件中执行注册，但每个文件必须定义一个模块名称。

Logger 的默认前端设计为线程安全的，并最大限度地减少了记录消息所需的时间。默认情况下，当调用日志记录 API 时，不会立刻执行字符串格式化或访问传输等耗时的操作。当调用日志 API 时，会创建一条消息并将其添加到列表中。使用专用的、可配置的日志消息池缓冲区。有两种类型的消息：标准和 hexdump 。每条消息都包含源 ID（模块或实例 ID )和可能用于多处理器系统的域 ID 、时间戳和严重性级别。标准消息包含指向字符串和参数的指针。 hexdump 消息包含复制的数据和字符串。

全局 Kconfig 选项 {#logging_kconfig}
----------------------

这些选项可以在路径 [subsys/logging/Kconfig](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/subsys/logging/Kconfig) 中找到。

[`CONFIG_LOG`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG) ：全局开关，打开/关闭日志记录。

操作模式：

[`CONFIG_LOG_MODE_DEFERRED`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_DEFERRED) ：延迟模式。

[`CONFIG_LOG_MODE_IMMEDIATE`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_IMMEDIATE) ：即时（同步）模式。

[`CONFIG_LOG_MODE_MINIMAL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_MINIMAL) ：最小占用模式。

[`CONFIG_LOG1`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG1) ：使用不推荐使用的日志记录版本。

过滤选项：

[`CONFIG_LOG_RUNTIME_FILTERING`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_RUNTIME_FILTERING) ：启用运行时的过滤重新配置。

[`CONFIG_LOG_DEFAULT_LEVEL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DEFAULT_LEVEL) ：默认级别；对未设置自己的日志级别的模块，将使用此日志级别。

[`CONFIG_LOG_OVERRIDE_LEVEL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_OVERRIDE_LEVEL) ：当未设置或设置低于覆盖值时，覆盖模块日志记录级别。

[`CONFIG_LOG_MAX_LEVEL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MAX_LEVEL) ：可编译进固件的最大（最低严重性）级别。

处理选项：

[`CONFIG_LOG_MODE_OVERFLOW`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_OVERFLOW) ：当无法分配新消息时，丢弃最旧的消息。

[`CONFIG_LOG_BLOCK_IN_THREAD`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BLOCK_IN_THREAD) ：如果启用，当无法分配新的日志消息时，线程上下文将阻塞至超时时间（ [`CONFIG_LOG_BLOCK_IN_THREAD_TIMEOUT_MS`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BLOCK_IN_THREAD_TIMEOUT_MS) ）或直到分配日志消息。

[`CONFIG_LOG_PRINTK`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PRINTK) ：将 printk 调用重定向到日志记录。

[`CONFIG_LOG_PRINTK_MAX_STRING_LENGTH`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PRINTK_MAX_STRING_LENGTH) ： printk 可处理的最大字符串长度。较长的字符串被裁剪。

[`CONFIG_LOG_PROCESS_TRIGGER_THRESHOLD`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PROCESS_TRIGGER_THRESHOLD) ：日志处理触发阈值。当缓冲的日志消息数量达到阈值时，专用线程（参见 [`log_thread_set()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_thread_set) ）被唤醒。如果启用了 [`CONFIG_LOG_PROCESS_THREAD`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PROCESS_THREAD) ，则内部线程使用此阈值。

[`CONFIG_LOG_PROCESS_THREAD`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PROCESS_THREAD) ：启用后，将创建处理日志处理的日志线程。

[`CONFIG_LOG_PROCESS_THREAD_STARTUP_DELAY_MS`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PROCESS_THREAD_STARTUP_DELAY_MS) ：延迟（毫秒），之后开始记录线程。

[`CONFIG_LOG_BUFFER_SIZE`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BUFFER_SIZE) ：专用于消息池的字节数。单个消息能够存储最多 3 个参数的标准日志，或具有 32 个字节的 hexdump 消息（包含 12 字节数据）。在 v2 中，它表示专用于循环数据包缓冲区的缓冲区大小。

[`CONFIG_LOG_DETECT_MISSED_STRDUP`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DETECT_MISSED_STRDUP) ：启用检测丢失的瞬态字符串处理。

[`CONFIG_LOG_STRDUP_MAX_STRING`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_STRDUP_MAX_STRING) ：可以使用 `log_strdup()` 复制的最长字符串。

[`CONFIG_LOG_STRDUP_BUF_COUNT`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_STRDUP_BUF_COUNT) ： `log_strdup()` 使用的池中 buffer 的数量。

[`CONFIG_LOG_DOMAIN_ID`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DOMAIN_ID) ：域 ID。在多域系统中有效。

[`CONFIG_LOG_FRONTEND`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FRONTEND) ： 将日志定向到自定义前端。

[`CONFIG_LOG_FRONTEND_ONLY`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FRONTEND_ONLY) ： 消息发送到前端时不使用后端。

[`CONFIG_LOG_TIMESTAMP_64BIT`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_TIMESTAMP_64BIT) ：64 位时间戳。

格式化选项：

[`CONFIG_LOG_FUNC_NAME_PREFIX_ERR`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FUNC_NAME_PREFIX_ERR) ：在标准 ERROR 日志消息前添加函数名称前缀。 hexdump 消息不会添加。

[`CONFIG_LOG_FUNC_NAME_PREFIX_WRN`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FUNC_NAME_PREFIX_WRN) ：在标准 WARNING 日志消息前添加函数名称前缀。 hexdump 消息不会添加。

[`CONFIG_LOG_FUNC_NAME_PREFIX_INF`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FUNC_NAME_PREFIX_INF) ：在标准 INFO 日志消息前添加函数名称前缀。 hexdump 消息不会添加。

[`CONFIG_LOG_FUNC_NAME_PREFIX_DBG`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FUNC_NAME_PREFIX_DBG) ：在标准 DEBUG 日志消息前添加函数名称前缀。 hexdump 消息不会添加。

[`CONFIG_LOG_BACKEND_SHOW_COLOR`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BACKEND_SHOW_COLOR) ：启用后， error 级别显示红色， warning 级别显示黄色。

[`CONFIG_LOG_BACKEND_FORMAT_TIMESTAMP`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BACKEND_FORMAT_TIMESTAMP) ：如果启用，时间戳格式化为 *hh:mm:ss:mmm,uuu* 。否则以原始格式打印。

后端选项：

[`CONFIG_LOG_BACKEND_UART`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BACKEND_UART) ：启用内置 UART 后端。

用法 {#log_usage}
-----

### 在模块中使用日志

为了在模块中使用日志，必须指定模块的唯一名称，并且必须使用 [`LOG_MODULE_REGISTER`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_MODULE_REGISTER) 注册模块。第二个参数是可选的，表示模块的编译时日志级别。如果未提供自定义日志级别，则使用默认日志级别 ( [`CONFIG_LOG_DEFAULT_LEVEL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DEFAULT_LEVEL) )。

```c
#include <zephyr/logging/log.h>
LOG_MODULE_REGISTER(foo, CONFIG_FOO_LOG_LEVEL);
```

如果模块由多个文件组成，那么 `LOG_MODULE_REGISTER()` 应该出现在其中一个合适的文件中。每个其他文件都应使用 [`LOG_MODULE_DECLARE`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_MODULE_DECLARE) 来声明其在模块中的成员资格。第二个参数是可选的，表示模块的编译时日志级别。如果未提供自定义日志级别，则使用默认日志级别 ( [`CONFIG_LOG_DEFAULT_LEVEL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DEFAULT_LEVEL) )。

```c
#include <zephyr/logging/log.h>
/* 在所有该模块内的文件中声明 */
LOG_MODULE_DECLARE(foo, CONFIG_FOO_LOG_LEVEL);
```

为了在头文件中实现的函数中使用日志 API，必须在调用日志 API 之前在函数体中使用 [`LOG_MODULE_DECLARE`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_MODULE_DECLARE) 宏。第二个参数是可选的，表示模块的编译时日志级别。如果未提供自定义日志级别，则使用默认日志级别 ( [`CONFIG_LOG_DEFAULT_LEVEL`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DEFAULT_LEVEL) )。

```c
#include <zephyr/logging/log.h>

static inline void foo(void)
{
 LOG_MODULE_DECLARE(foo, CONFIG_FOO_LOG_LEVEL);

 LOG_INF("foo");
}
```

SDK 提供了专用 Kconfig 模板 ( [subsys/logging/Kconfig.template.log_config](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/subsys/logging/Kconfig.template.log_config) ) 可用于创建本地日志级别配置。

下面的示例介绍了模板的用法。结果将生成 `CONFIG_FOO_LOG_LEVEL` ：

```c
module = FOO
module-str = foo
source "subsys/logging/Kconfig.template.log_config"
```

### 在一个模块实例中使用日志

如果模块会用于创建出多个实例，并且这些实例在系统中广泛使用，那 [在模块中使用日志](#在模块中使用日志) 将导致日志泛滥。为了解决这一问题， Logger 提供了用于过滤的工具，它旨在服务实例级别而不是模块级别。在这种情况下，可以为特定实例启用日志记录。

为了使用实例级过滤，必须执行以下步骤：

- 在实例结构中声明了指向特定日志结构的指针。 `LOG_INSTANCE_PTR_DECLARE` 用于此目的。

    ```c
    #include <zephyr/logging/log_instance.h>

    struct foo_object {
    LOG_INSTANCE_PTR_DECLARE(log);
    uint32_t id;
    }
    ```

- 模块必须为实例化提供宏。在那个宏中，记录实例被注册并且记录实例指针在对象结构中被初始化。

    ```c
    #define FOO_OBJECT_DEFINE(_name)                             \
    LOG_INSTANCE_REGISTER(foo, _name, CONFIG_FOO_LOG_LEVEL) \
    struct foo_object _name = {                             \
        LOG_INSTANCE_PTR_INIT(log, foo, _name)          \
    }
    ```


请注意，当日志被禁用时，日志实例和指向该实例的指针不会被创建。

为了在源码文件中使用实例日志 API，必须使用 [`LOG_LEVEL_SET`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_LEVEL_SET) 设置编译时日志级别。

```c
LOG_LEVEL_SET(CONFIG_FOO_LOG_LEVEL);

void foo_init(foo_object *f)
{
 LOG_INST_INF(f->log, "Initialized.");
}
```

为了在头文件中使用实例日志记录 API，必须使用 [`LOG_LEVEL_SET`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_LEVEL_SET) 设置编译时日志级别。

```c
static inline void foo_init(foo_object *f)
{
 LOG_LEVEL_SET(CONFIG_FOO_LOG_LEVEL);

 LOG_INST_INF(f->log, "Initialized.");
}
```

### 控制日志

可以使用 [include/zephyr/logging/log_ctrl.h](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/include/logging/log_ctrl.h) 中定义的 API 来控制日志记录。 Logger 必须先初始化才能使用。可选地，用户可以提供返回时间戳值的函数。如果未提供，则 [`k_cycle_get_32`](https://docs.zephyrproject.org/3.1.0/kernel/services/timing/clocks.html#c.k_cycle_get_32) 用于时间戳。 [`log_process()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_process) 函数用于触发处理一条日志消息（如果挂起）。如果有更多消息排队，则函数返回 true。

以下片段显示了如何在简单的死循环中处理日志记录。

```c
#include <zephyr/log_ctrl.h>

void main(void)
{
 log_init();

 while (1) {
     if (log_process() == false) {
         /* sleep */
     }
 }
}
```

如果日志是从线程处理的，则可以启用一个功能，当缓冲一定数量的日志消息时唤醒处理线程（请参阅 [`CONFIG_LOG_PROCESS_TRIGGER_THRESHOLD`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PROCESS_TRIGGER_THRESHOLD) ）。也可以启用内部日志记录线程（参见 [`CONFIG_LOG_PROCESS_THREAD`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_PROCESS_THREAD) ）。在这种情况下，日志线程被初始化并且日志消息被隐式处理。

打印 panic 日志 {#logging_panic}
-------------

如果系统出现错误情况，通常不能再依赖调度程序或中断。在这种情况下，延迟日志消息处理不是一种可选项。日志控制 API 提供了进入 panic 模式后可用的函数 ( [`log_panic()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_panic) )，在这种情况下应该调用该函数。

当 [`log_panic()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_panic) 被调用时， `_panic_` 通知被发送到所有活动的后端。一旦通知所有后端，所有缓冲的消息都会被刷新。从那一刻起，所有日志调用都以阻塞方式处理。

结构 {#log_architecture}
------------

日志记录由 3 个主要部分组成：

-   前端
-   核心
-   后端

日志消息由日志源生成，日志源可以是模块或模块的实例。

### 默认前端

当在日志源（例如 [`LOG_INF`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_INF) ）中调用日志 API 时会使用默认前端，并负责过滤消息（编译和运行时）、为消息分配缓冲区、创建消息并提交该消息。由于可以在中断中调用日志记录 API，因此前端需要经过优化以尽可能快地打印日志消息。

#### 日志消息 v1

每条日志消息都由一个或多个固定大小的块组成，这些块是从固定大小的缓冲区（ [Memory Slabs](https://docs.zephyrproject.org/3.1.0/kernel/memory_management/slabs.html#memory-slabs-v2) ）池中分配的。消息头块包含日志条目详细信息，例如：源 ID 、时间戳、严重级别和数据（字符串指针和参数或原始数据）。消息还包含一个引用计数器，指示有多少用户仍在使用此消息。一旦最后一个用户指示可以释放它，它用于将消息返回到池中。如果日志中使用超过 3 个参数或 12 个字节的原始数据，则日志消息由链接在一起的多个块形成。当消息正文被填满时，它被放入列表中。触发日志处理时，会从待处理消息列表中删除一条消息。如果禁用运行时过滤，则消息将传递给所有活动的后端；否则消息仅传递给那些从该特定源（基于消息中的源 ID ）和严重级别请求消息的后端。迭代所有后端后，该消息被视为已处理，但该消息可能仍在由后端使用。因为消息是从池中分配的，所以并不强制要求按顺序释放消息。后端的处理是异步的，并且当最后一个用户指示可以释放消息时释放内存。这也意味着如果后端实现不正确，可能会导致池一直保持为空。

#### 日志消息 v2

日志消息 v2 包含消息描述符（源、域和级别）、时间戳、格式化字符串详细信息（请参阅 [Cbprintf 打包](https://docs.zephyrproject.org/3.1.0/services/formatted_output.html#cbprintf-packaging) ）和可选数据。日志消息 v2 存储在连续的内存块中（与 v1 相反）。内存是从循环数据包缓冲区（[Multi Producer Single Consumer Packet Buffer](https://docs.zephyrproject.org/3.1.0/kernel/data_structures/mpsc_pbuf.html#mpsc-pbuf)）分配的。使用这一缓冲区有这么一些效果：

- 每条消息都是独立的、连续的内存块，因此它适用于复制消息（例如，用于离线处理）。
- 由于不使用固定大小的块，因此可以更好地利用内存。
- 消息必须按顺序释放。后端处理是同步的。后端可以为延迟处理制作副本。

日志消息具有以下格式：

<table>
<colgroup>
<col style={{width: "26%"}}/>
<col style={{width: "74%"}}/>
</colgroup>
<tbody>
<tr ><td rowspan="10">消息头</td>
<td><p>2 位: MPSC 包 buffer 头</p></td>
</tr>
<tr ><td><p>1 位: 跟踪信息/日志消息标识</p></td>
</tr>
<tr ><td><p>3 位: 域 ID</p></td>
</tr>
<tr ><td><p>3 位: 级别</p></td>
</tr>
<tr ><td><p>10 位: Cbprintf 包长度</p></td>
</tr>
<tr ><td><p>12 位: 数据长度</p></td>
</tr>
<tr ><td><p>1 位: 保留位</p></td>
</tr>
<tr ><td>

指针: 指向源描述 [^1]

</td>
</tr>
<tr ><td>

32 或 64 位: 时间戳 [^1]

</td>
</tr>
<tr ><td>

可选填充 [^2]

</td>
</tr>
<tr ><td rowspan="3"><p>Cbprintf</p>
<div >
<div >包</div>
<div >(可选)</div>
</div>
</td>
<td><p>头</p></td>
</tr>
<tr ><td><p>参数</p></td>
</tr>
<tr ><td><p>添加的字符串</p></td>
</tr>
<tr ><td colspan="2"><p>Hexdump 数据 (可选)</p></td>
</tr>
<tr ><td colspan="2"><p>用于对齐的填充 (可选)</p></td>
</tr>
</tbody>
</table>

#### 日志消息分配

前端可能无法分配消息。如果系统生成的日志消息数量大于它在特定时间范围内可处理的数量，就会发生这种情况。处理这种情况有两种策略：

- 无溢出 - 如果无法为消息分配空间，则删除新日志。
- 溢出 - 最旧的待处理消息被释放，直到可以分配新消息。由 [`CONFIG_LOG_MODE_OVERFLOW`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_OVERFLOW) 启用。请注意，它会降低性能，因此建议调整缓冲区大小和启用日志的数量以限制丢弃操作。

#### 运行时过滤 {#logging_runtime_filtering}

如果启用了运行时过滤，那么对于每个日志记录源，都会在 RAM 中声明一个过滤器结构。这种过滤器使用 32 位，分为 10 个 3 位插槽。除了 *插槽 0* ，每个 slot 都存储系统中一个后端的当前过滤器。*插槽 0* （位 0-2）用于聚合给定日志记录源的最大过滤器设置。聚合槽确定是否为给定条目创建日志消息，因为它指示是否至少有一个后端期望该日志条目。当核心处理消息时检查后端槽以确定给定后端是否接受消息。与编译时过滤相反，由于编译了日志，二进制占用量增加了。

在下面的示例中，后端 1 设置为接收错误（*插槽 1*），后端 2 设置为接收信息级别（*插槽 2*）。插槽 3-9 未使用。聚合过滤器（*插槽 0*）设置为 info 级别，并且来自该特定源的高达此级别的消息将被缓冲。

| 插槽 0 | 插槽 1 | 插槽 2 | 插槽 3 | ... | 插槽 9 |
| --- | --- | --- | --- | --- | --- |
| INF | ERR | INF | OFF | ... | OFF |

### 自定义前端

自定义前端通过 [`CONFIG_LOG_FRONTEND`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FRONTEND) 启用。日志调用被定向到在 [include/logging/log_frontend.h](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/include/logging/log_frontend.h) 中声明的函数。如果启用选项 [`CONFIG_LOG_FRONTEND_ONLY`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_FRONTEND_ONLY) 则不会创建日志消息并且不处理后端。否则，自定义前端可以与后端共存（在 v1 中不可用）。

### 日志字符串 {#logging_strings}

#### Logging v1

由于日志消息仅包含参数的值，因此当使用 `%s` 时，只存储了字符串的地址。因为字符串变量参数可能是临时的、分配在堆栈上或可修改的，所以 logger 提供了一种机制和专用的缓冲池来保存字符串的副本。缓冲区大小和计数是可配置的（请参阅 [`CONFIG_LOG_STRDUP_MAX_STRING`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_STRDUP_MAX_STRING) 和 [`CONFIG_LOG_STRDUP_BUF_COUNT`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_STRDUP_BUF_COUNT) ）。

如果字符串参数是瞬态的，用户必须调用 [`log_strdup()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_strdup) 将传递的字符串从池中复制到缓冲区中。请参阅下面的示例。如果无法分配 strdup 缓冲区，则会记录一条警告消息并返回一个错误代码，指示应增加 [`CONFIG_LOG_STRDUP_BUF_COUNT`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_STRDUP_BUF_COUNT) 。缓冲区与日志消息一起被释放。

```c
char local_str[] = "abc";

LOG_INF("logging transient string: %s", log_strdup(local_str));
local_str[0] = '\0'; /* 字符串可被修改，日志记录中使用的是字符串的副本 */
```

当启用 [`CONFIG_LOG_DETECT_MISSED_STRDUP`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DETECT_MISSED_STRDUP) 时， Logger 将扫描每个日志消息并报告是否找到字符串格式说明符并且字符串地址不在只读内存部分或不属于专用于字符串重复的内存池。它表示在日志消息的调用中没有使用如上例中 `LOG_INF` 般使用 [`log_strdup()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_strdup) 。

#### Logging v2

字符串参数由 [Cbprintf 打包](https://docs.zephyrproject.org/3.1.0/services/formatted_output.html#cbprintf-packaging) 处理，因此不需要特殊操作。

### 日志后端

使用 [`LOG_BACKEND_DEFINE`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.LOG_BACKEND_DEFINE) 注册日志记录后端。该宏在专用内存部分创建一个实例。后端可以动态启用 ( [`log_backend_enable()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_backend_enable) ) 和禁用。启用[运行时过滤](#logging_runtime_filtering)后， [`log_filter_set()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_filter_set) 可用于动态更改给定后端的模块日志过滤。模块由源 ID 和域 ID 标识。如果通过遍历所有已注册的源已知源名称，则可以检索源 ID。

日志记录最多支持 9 个并发后端。日志消息在处理阶段被传递到每个后端。此外，当调用 [`log_backend_panic()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_backend_panic) 后，日志记录进入 panic 模式时，后端会收到通知。在那个调用后端应该切换到同步的、无中断的操作，或者如果不支持，则自行关闭。有时，日志记录可能会使用 [`log_backend_dropped()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_backend_dropped) 通知后端有关丢弃消息的数量。消息处理 API 是特定于版本的。

#### Logging v1

日志后端接口包含以下处理函数：

- [`log_backend_put`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_backend_put) - 后端以延迟模式获取日志消息。
- [`log_backend_put_sync_string()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_backend_put_sync_string) - 后端以即时模式获取带有格式化字符串消息的日志消息。
- [`log_backend_put_sync_hexdump()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_backend_put_sync_hexdump) - 后端以即时模式获取带有 hexdump 消息的日志消息。

日志消息包含一个引用计数器，用于跟踪有多少后端正在处理该消息。在接收到消息后，后端必须通过对该消息调用 [`log_msg_get()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_msg_get) 来声明它，这会增加一个引用计数器。处理完消息后，后端将消息 ([`log_msg_put()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_msg_put)) 放回，并减少引用计数器。在最后一个 [`log_msg_put()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_msg_put) 上，当引用计数器数字为 0 时，消息被返回到池中。如何处理消息取决于后端。

:::info 注意
如果后端在处理完消息后没有调用 [`log_msg_put()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_msg_put) ，则消息池可能会始终为空。如果消息仍被标记为正在使用（使用非零引用计数器），则日志记录核心无法强制将消息返回到池中。
:::

```c
#include <zephyr/logging/log_backend.h>

void put(const struct log_backend *const backend,
     struct log_msg *msg)
{
 log_msg_get(msg);

 /* message processing */

 log_msg_put(msg);
}
```

#### Logging v2

[`log_backend_msg2_process()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_backend_msg2_process) 用于处理消息。这在标准和 hexdump 消息很常见，因为日志消息 v2 包含带有参数和数据的字符串。在延迟和即时日志中都很常见。

#### 消息格式

日志记录提供了一组可供后端用来格式化消息的函数。可在 [include/logging/log_output.h](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/include/logging/log_output.h) 中查看可用函数。

使用 [`log_output_msg_process()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_output_msg_process) 或 [`log_output_msg2_process()`](https://docs.zephyrproject.org/3.1.0/services/logging/index.html#c.log_output_msg2_process) 格式化的日志消息，输出示例如下。

```bash
[00:00:00.000,274] <info> sample_instance.inst1: logging message
```

### 基于字典的日志 {#logging_guide_dictionary}

基于字典的日志记录，以二进制格式输出日志消息，而不是可读性高的文本。这种二进制格式将参数编码为原生存储格式的格式化字符串，这比它们的等价文本更紧凑。对于静态定义的字符串（包括格式字符串和任何字符串参数），引用到经过编码的 ELF 文件，而不是对整个字符串。在构建时创建的字典包含这些引用和实际字符串之间的映射。这允许离线解析器从字典中获取字符串来解析日志消息。这种二进制格式允许在某些情况下更紧凑地表示日志消息。但是，这需要使用离线解析器，并且不像基于文本的日志消息那样直观。

请注意，Python 的 `struct` 模块不支持 `long double` 。因此，带有 `long double` 的日志消息将不会显示正确的值。

#### 配置

以下是与基于字典的日志记录相关的 kconfig 选项：

- [`CONFIG_LOG_DICTIONARY_SUPPORT`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_DICTIONARY_SUPPORT) 启用基于字典的日志记录支持。这应该由需要它的后端启用。
- UART 后端可用于基于字典的日志记录。以下是 UART 后端的附加配置：
    - [`CONFIG_LOG_BACKEND_UART_OUTPUT_DICTIONARY_HEX`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BACKEND_UART_OUTPUT_DICTIONARY_HEX) 告诉 UART 后端为基于字典的日志记录输出十六进制字符。当需要通过终端和控制台手动捕获日志数据时，这很有用。 
    - [`CONFIG_LOG_BACKEND_UART_OUTPUT_DICTIONARY_BIN`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_BACKEND_UART_OUTPUT_DICTIONARY_BIN) 告诉 UART 后端输出二进制数据。

#### 用法

当启用基于字典的日志记录（通过关联的日志后端）时，将在 build 目录中创建一个名为 `log_dictionary.json` 的 JSON 数据库文件。此数据库文件包含解析器正确解析日志数据的所需信息。请注意，此数据库文件仅适用于同一次构建，任何其他构建都不能使用。

像这样使用日志解析器：

```bash
./scripts/logging/dictionary/log_parser.py <build dir>/log_dictionary.json <log data file>
```

解析器接受两个必传的参数，其中第一个是 JSON 数据库文件的完整路径，第二个是包含日志数据的文件。如果日志数据文件包含十六进制字符（例如，当 `CONFIG_LOG_BACKEND_UART_OUTPUT_DICTIONARY_HEX=y` 时），则在末尾添加一个可选参数 `--hex` 。这告诉解析器在解析之前，先将十六进制字符转换为二进制。

有关如何使用日志解析器，请参阅 [基于字典的日志记录示例](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/subsys/logging/dictionary) 。

限制和建议
-------------------------------
### Logging v1

有以下限制：

- 带参数的字符串 (*%s*) 需要特殊处理（请参阅 [日志字符串](#logging_strings) ）。
- 日志无法记录 double 和 float 变量，因为参数是字长。
- 不能记录大于字大小的变量。
- 字符串中的参数数量限制为 15 个。

### Logging v2

解决了 v1 的主要限制。但是，为了使大多数日志记录功能都能正常工作，使用时应遵循以下建议：

- 启用 [`CONFIG_LOG_SPEED`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_SPEED) 可稍微加快延迟日志记录，但代价是内存占用量略有增加。
- 推荐使用支持 C11 的 `_Generic` 关键字的编译器。没有它，日志记录性能会显着下降。请参阅 [Cbprintf 打包](https://docs.zephyrproject.org/3.1.0/services/formatted_output.html#cbprintf-packaging)。
- 当支持 `_Generic` 时，在编译期间确定应使用哪种打包方法： *静态* 或 *运行时* 。它是通过在参数列表中搜索任何字符串指针来完成的。如果字符串指针与字符串以外的格式说明符一起使用，例如 `%p` ，建议将其强制转换为 `void *` 。

```c
LOG_WRN("%s", str);
LOG_WRN("%p", (void *)str);
```

性能
---------

这些性能参数是通过在 `qemu_x86` 上执行 [tests/subsys/logging/log_benchmark](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/tests/subsys/logging/log_benchmark) 得出的。这是一个粗略的比较，以提供一个大概理解。总体而言，日志记录 v2 在大多数方面都得到了改进，其中用户空间日志记录的改进最大。这是以日志消息占用更大内存为代价的。

| Feature 特性 | v1 | v2 | 总结 |
| --- | --- | --- | --- |
| 内核日志 | 7us | 7us[^3] 或 11us | 无明显变化 |
| 用户日志 | 86us | 13us | **很大提升** |
| 复写的内核日志 | 23us | 10us[^4] 或 15us | **提升** |
| 瞬态字符串日志 | 16us | 42us | **降低** |
| 瞬态字符串用户日志 | 111us | 50us | **提升** |
| 内存利用率 [^4] | 416 | 518 | 小幅提升 |
| 内存占用 (测试)[^5] | 3.2k | 2k | **提升** |
| 内存占用 (应用程序)[^6] | 6.2k | 3.5k | **提升** |
| 消息占用 [^7] | 15 字节 | 47[^3] 或 32 字节 | **降低** |

栈占用
-----------

启用日志记录后，它会影响使用日志记录 API 的上下文的堆栈使用。如果堆栈被优化，它可能会导致堆栈溢出。堆栈使用取决于模式和优化。平台之间的差异也很大。通常，当使用 [`CONFIG_LOG_MODE_DEFERRED`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_DEFERRED) 时，堆栈使用量相对较小，因为日志记录仅限于创建和存储日志消息。当使用 [`CONFIG_LOG_MODE_IMMEDIATE`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_IMMEDIATE) 时，日志消息由后端处理，其中包括字符串格式。在这种模式下，堆栈使用将取决于使用的后端。

[tests/subsys/logging/log_stack](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/tests/subsys/logging/log_stack) 测试通过使用的模式、优化和平台来描述堆栈使用情况。测试仅使用默认后端。

下面列出了一些平台特征，他们记录了打印在附带两个 `integer` 参数的日志消息的栈占用描述：

| 平台 | 延迟模式 | 延迟模式（未优化） | 即时模式 | 即时模式（未优化） |
| --- | --- | --- | --- | --- |
| ARM Cortex-M3 | 40 | 152 | 412 | 783 |
| x86 | 12 | 224 | 388 | 796 |
| riscv32 | 24 | 208 | 456 | 844 |
| xtensa | 72 | 336 | 504 | 944 |
| x86_64 | 32 | 528 | 1088 | 1440 |   

API 引用
-------------

请参阅 [Logger System](https://zephyr-docs.listenai.com/doxygen/html/group__logger.html) 。


注解
-------------

[^1]: 取决于平台，并且时间戳大小字段可能会（在 32 位和 64 位之间）交换。

[^2]: cbprintf 包对齐可能需要它

[^3]: [`CONFIG_LOG_SPEED`](https://zephyr-docs.listenai.com/kconfig.html#CONFIG_LOG_MODE_DEFERRED) 启用时。

[^4]: 具有若干参数的日志消息的数量，除以专用用于日志记录 2048 字节。

[^5]: 日志记录子系统内存占用：[tests/subsys/logging/log_benchmark](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/tests/subsys/logging/log_benchmark) ，其中未使用过滤和格式化特性。

[^6]: 日志记录子系统内存占用：[samples/subsys/logging/logger](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/subsys/logging/logger) 。

[^7]: 在 `Cortex M3` 上具有 2 个参数的日志消息（不包括字符串）的平均大小

