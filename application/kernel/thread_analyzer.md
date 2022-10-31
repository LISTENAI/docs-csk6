# 线程分析器的使用

线程分析器作为zephyr的一个调试工具，用来跟踪线程信息例如线程的堆栈大小使用情况、线程运行时的其他统计信息。



## 常用API接口

### thread_analyzer_run

```c
void thread_analyzer_run(thread_analyzer_cb cb)
```

**接口说明：**

运行线程分析器并向回调提供信息。

**参数说明**：

| 字段 | 说明     |
| ---- | -------- |
| cb   | 回调函数 |

### thread_analyzer_print

```c
void thread_analyzer_print(void)
```

**接口说明：**

运行线程分析器并打印堆栈大小统计信息。



更多关于`Thread analyzer API`接口描述请查阅[Thread analyzer](https://docs.zephyrproject.org/latest/doxygen/html/group__thread__analyzer.html) 。



## 组件配置项

线程分析器组件配置项如下：

| 字段                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| THREAD_ANALYZER                 | 启用模块                                                     |
| THREAD_ANALYZER_USE_PRINTK      | 使用PRINTK输出进行线程统计                                   |
| THREAD_ANALYZER_USE_LOG         | 使用日志进行线程统计                                         |
| THREAD_ANALYZER_AUTO            | 自动运行线程分析器，使用此选项时，不需要向应用程序添加任何代码 |
| THREAD_ANALYZER_AUTO_INTERVAL   | 在自动模式下连续打印线程分析之间，模块休眠的时间             |
| THREAD_ANALYZER_AUTO_STACK_SIZE | 线程分析器自动计算线程的堆栈                                 |
| THREAD_NAME                     | 在内核中启用此选项以打印线程的名称                           |
| THREAD_RUNTIME_STATS            | 启用此选项以打印线程运行时数据，如利用率（此选项由THREAD_ ANALYZER自动选择） |



## 使用示例

当应用程序调用thread_analyzer_run() 或 thread_analyzer_print()时，分析器开始运行。

我们以[synchronization](./sync_semaphore.md)这个sample作为线程分析的例子，启动线程分析器需要需要在sample项目的`prj.conf`配置文件中打开以下配置：

```shell
# 启用线程分析器
CONFIG_THREAD_ANALYZER=y
# 使用PRINTK输出进行线程统计
CONFIG_THREAD_ANALYZER_USE_PRINTK=y
# 在内核中启用此选项以打印线程的名称
CONFIG_THREAD_NAME=y
# 自动运行线程分析器，使用此选项时，不需要向应用程序添加任何代码
CONFIG_THREAD_ANALYZER_AUTO=y
# 在自动模式下连续打印线程分析之间，模块休眠的时间单位(S)
CONFIG_THREAD_ANALYZER_AUTO_INTERVAL=5
```

当应用项目运行后，线程分析器将输出以下信息：

```shell
*** Booting Zephyr OS build v1.0.4-alpha.1  ***
thread_a: Hello World from cpu 0 on csk6011a_nano!
Thread analyze:
 thread_b            : STACK: unused 880 usage 144 / 1024 (14 %); CPU: 0 %
 thread_a            : STACK: unused 644 usage 380 / 1024 (37 %); CPU: 95 %
 thread_analyzer     : STACK: unused 556 usage 468 / 1024 (45 %); CPU: 0 %
 idle 00             : STACK: unused 288 usage 32 / 320 (10 %); CPU: 0 %
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
Thread analyze:
 thread_b            : STACK: unused 644 usage 380 / 1024 (37 %); CPU: 8 %
 thread_a            : STACK: unused 644 usage 380 / 1024 (37 %); CPU: 10 %
 thread_analyzer     : STACK: unused 556 usage 468 / 1024 (45 %); CPU: 0 %
 idle 00             : STACK: unused 272 usage 48 / 320 (15 %); CPU: 81 %
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
thread_b: Hello World from cpu 0 on csk6011a_nano!
thread_a: Hello World from cpu 0 on csk6011a_nano!
```

