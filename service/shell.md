# Shell

* [概述](#overview)
  - [通过 TCP 连接 Segger RTT(例如在macOS上)](#ctsrvt)
* [命令](#commands)
  - [创建命令](#createcommands)
  - [字典命令](#dictcommands)
  - [命令执行](#execcommands)
  - [内置命令](#bic)
* [Tab辅助功能](#tf)
* [历史记录](#hf)
* [通配符特性](#wf)
* [Meta键特性](#mkf)
* [Getopt特性](#gf)
* [隐藏输入特性](#oif)
* [记录器后端特性](#slbfs)
* [用法](#usage)
* [API参考](#apiref)

## <span id="overview">概述</span>

此模块允许你创建和处理具有用户自定义命令集的shell。举个例子，你可以在需要使用使用简单按钮或LED控制等用户交互的场景中使用。这个模块是一个类似Unix的shell，具有以下特性：

* 支持多个实例。
* 与Logging高级合作。
* 支持静态和动态命令。
* 支持字典命令。
* 使用`Tab`键完成命令补全。
* 内置命令：clear, shell, colors, echo, history and resize。
* 使用`↑` `↓`键：或Meta键查看最近执行的命令。
* 使用 `←`, `→`, `Backspace`, `Delete`, `End`, `Home`, `Insert` 键进行文本编辑。  
* 支持ANSI转义符：`VT100` 和 `ESC[n~` 用于光标控制和彩色打印
* 支持编辑多行命令。
* 显示命令帮助的内置处理程序。
* 支持通配符: `*` 和 `?`。
* 支持Meta键。
* 支持getopt。
* 使用Kconfig配置优化内存。

:::info 注意
 其中有一些特性对RAM和FLASH的使用影响很大，但是很多特性在不需要的时候可以禁用它们。默认情况下，应该启用`CONFIG_SHELL_MINIMAL`并选择性地启用你需要的特性。
:::


该模块可以连接到任何传输命令的输入和输出。这将实现以下传输层：

* Segger RTT
* SMP
* Telnet
* UART
* USB接口
* DUMMY - 不是物理传输层.

## <span id="ctsrvt">通过 TCP 连接 Segger RTT(例如在macOS上)</span>
  
在macOS上， JLinkRTTClient 不允许输入，请使用以下步骤：

* 打开第一个终端窗口并输入:  
  ```
  JLinkRTTLogger -Device NRF52840_XXAA -RTTChannel 1 -if SWD -Speed 4000 ~/rtt.log
  ``` 
  (根据需要更换设备)

* 打开第二个终端窗口并输入：
  ```
  nc localhost 19021
  ```

* 现在你应该有一个到 RTT 的网络连接，它允许你进行shell输入。

## <span id="commands">命令</span>

Shell命令以树状结构分为以下类型：

* 根命令（等级0）：在专用内存部分中收集并按字母顺序排序。
* 静态子命令（等级>0）：在编译期间必须知道编号和语法。在软件模块中创建。
* 动态子命令（等级>0）：在编译期间不需要知道编号和语法。在软件模块中创建。

### <span id="createcommands">创建命令</span>

使用以下宏添加shell命令：

* [SHELL_CMD_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_REGISTER) - 创建根命令。所有根命令必须有不同的名称。
* [SHELL_COND_CMD_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD_REGISTER) - 条件（如果设置了编译时标志）创建根命令。所有根命令必须具有不同的名称。
* [SHELL_CMD_ARG_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_ARG_REGISTER) - 创建带参数的根命令。所有根命令必须具有不同的名称。
* [SHELL_COND_CMD_ARG_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD_ARG_REGISTER) - 条件（如果设置了编译时标志）创建带参数的根命令。所有根命令必须具有不同的名称。
* [SHELL_CMD](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD) - 初始化命令。
* [SHELL_COND_CMD](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD) - 如果设置了编译时间标志，则初始化命令。
* [SHELL_EXPR_CMD](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_EXPR_CMD) - 如果编译时表达式不为零，则初始化命令。
* [SHELL_CMD_ARG](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_ARG) - 使用参数初始化命令。
* [SHELL_COND_CMD_ARG](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD_ARG) - 如果设置了编译时间标志，则使用参数初始化命令。
* [SHELL_EXPR_CMD_ARG](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_EXPR_CMD_ARG) - 如果编译时表达式不为零，则使用参数初始化命令
* [SHELL_STATIC_SUBCMD_SET_CREATE](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_STATIC_SUBCMD_SET_CREATE) - 创建一个静态子命令数组。
* [SHELL_SUBCMD_DICT_SET_CREATE](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_SUBCMD_DICT_SET_CREATE) - 创建一个字典子命令数组。
* [SHELL_DYNAMIC_CMD_CREATE](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_DYNAMIC_CMD_CREATE) - 创建一个动态子命令数组。

可以在系统中包含`include/shell/shell.h`的任何文件中创建命令。所有创建的命令都可以用在所有shell实例。

#### <span id="staticcommands">静态命令</span>

演示如何使用静态子命令创建根命令的示例代码。

![static_cmd](images/static_cmd.png)

```
/* 创建子命令 (等级 1 命令) 数组示例. */
SHELL_STATIC_SUBCMD_SET_CREATE(sub_demo,
        SHELL_CMD(params, NULL, "Print params command.",
                                               cmd_demo_params),
        SHELL_CMD(ping,   NULL, "Ping command.", cmd_demo_ping),
        SHELL_SUBCMD_SET_END
);
/* Creating root (level 0) command "demo" */
SHELL_CMD_REGISTER(demo, &sub_demo, "Demo commands", NULL);
```

示例实现可以在这位置找到：[samples/subsys/shell/shell_module/src/main.c](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/samples/subsys/shell/shell_module/src/main.c)

### <span id="dictcommands">字典命令</span>

这是一种特殊的静态命令。每当你想在命令处理程序中使用一对：（字符串<->对应数据）时，都可以使用字典命令。字符串通常是对给定数据的口头描述。其思想是使用字符串作为命令语法，可以由shell提示，并且可以使用相应的数据来处理命令。

举个例子，假设你创建了一个命令来设置ADC增益。这是一个可以使用字典的完美场地。字典将一组对：(string: gain_value, int: value) ,其中 int 值可以与 ADC 驱动程序 API 一起使用。

这个任务的抽象代码如下：
```
static int gain_cmd_handler(const struct shell *shell,
                            size_t argc, char **argv, void *data)
{
        int gain;

        /* data is a value corresponding to called command syntax */
        gain = (int)data;
        adc_set_gain(gain);

        shell_print(shell, "ADC gain set to: %s\n"
                           "Value send to ADC driver: %d",
                           argv[0],
                           gain);

        return 0;
}

SHELL_SUBCMD_DICT_SET_CREATE(sub_gain, gain_cmd_handler,
        (gain_1, 1), (gain_2, 2), (gain_1_2, 3), (gain_1_4, 4)
);
SHELL_CMD_REGISTER(gain, &sub_gain, "Set ADC gain", NULL);
```

这是它在shell中的样子：  
![dict_cmd](images/dict_cmd.png)

#### <span id="dynamiccommands">动态命令</span>
 
这是演示如何使用静态和动态子命令创建根命令的示例代码。开始时，动态命令列表为空。可以通过输入以下命令添加新命令：
```
dynamic add <new_dynamic_command>
```
 
新添加的命令可以使用`Tab`键提示自动补全。  
![dynamic_cmd](images/dynamic_cmd.png)

```
/* Buffer for 10 dynamic commands */
static char dynamic_cmd_buffer[10][50];

/* commands counter */
static uint8_t dynamic_cmd_cnt;

/* Function returning command dynamically created
 * in  dynamic_cmd_buffer.
 */
static void dynamic_cmd_get(size_t idx,
                            struct shell_static_entry *entry)
{
        if (idx < dynamic_cmd_cnt) {
                entry->syntax = dynamic_cmd_buffer[idx];
                entry->handler  = NULL;
                entry->subcmd = NULL;
                entry->help = "Show dynamic command name.";
        } else {
                /* if there are no more dynamic commands available
                 * syntax must be set to NULL.
                 */
                entry->syntax = NULL;
        }
}

SHELL_DYNAMIC_CMD_CREATE(m_sub_dynamic_set, dynamic_cmd_get);
SHELL_STATIC_SUBCMD_SET_CREATE(m_sub_dynamic,
        SHELL_CMD(add, NULL,"Add new command to dynamic_cmd_buffer and"
                  " sort them alphabetically.",
                  cmd_dynamic_add),
        SHELL_CMD(execute, &m_sub_dynamic_set,
                  "Execute a command.", cmd_dynamic_execute),
        SHELL_CMD(remove, &m_sub_dynamic_set,
                  "Remove a command from dynamic_cmd_buffer.",
                  cmd_dynamic_remove),
        SHELL_CMD(show, NULL,
                  "Show all commands in dynamic_cmd_buffer.",
                  cmd_dynamic_show),
        SHELL_SUBCMD_SET_END
);
SHELL_CMD_REGISTER(dynamic, &m_sub_dynamic,
           "Demonstrate dynamic command usage.", cmd_dynamic);
```

示例实现可以在以下位置找到：[samples/subsys/shell/shell_module/src/dynamic_cmd.c](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/samples/subsys/shell/shell_module/src/dynamic_cmd.c)。

### <span id="execcommands">命令执行</span>

每个命令或子命令有一个处理程序。Shell 执行在命令树中最里面找到的处理程序，并且进一步的子命令(没有处理程序)作为参数传递。括号内的字符作为一个参数处理。如果 shell 找不到处理程序，它将显示错误消息。

还可以使用任何活动后端和函数 [shell_execute_cmd()](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.shell_execute_cmd)。 如下所示：

```
void main(void)
{
        /* Below code will execute "clear" command on a DUMMY backend */
        shell_execute_cmd(NULL, "clear");

        /* Below code will execute "shell colors off" command on
         * an UART backend
         */
        shell_execute_cmd(shell_backend_uart_get_ptr(),
                          "shell colors off");
}
```
 
通过设置 Kconfig [CONFIG_SHELL_BACKEND_DUMMY](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_BACKEND_DUMMY.html#std-kconfig-CONFIG_SHELL_BACKEND_DUMMY) 选项启动 DUMMY 后端。

#### <span id="handlercommand">命令处理程序</span>

简单的命令处理程序实现:

```
static int cmd_handler(const struct shell *shell, size_t argc,
                        char **argv)
{
        ARG_UNUSED(argc);
        ARG_UNUSED(argv);

        shell_fprintf(shell, SHELL_INFO, "Print info 注意 message\n");

        shell_print(shell, "Print simple text.");

        shell_warn(shell, "Print warning 警告 text.");

        shell_error(shell, "Print error text.");

        return 0;
}
```

函数 [shell_fprintf()](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.shell_fprintf)或 shell 打印宏：[shell_print](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.shell_print)、[shell_info 注意](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.shell_info 注意)、[shell_warn](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.shell_warn) 和 [shell_error](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.shell_error) 可以从命令处理程序或线程中使用，但不能从中断上下文中使用。相反，中断处理程序应该使用 [Logging](#) 进行打印。

#### <span id="commandhelp">命令帮助</span>

每个用户定义的命令或子命令都可以有自己的帮助信息。可以使用相应的宏创建命令或子命令帮助：[SHELL_CMD_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_REGISTER) 、[SHELL_CMD_ARG_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_ARG_REGISTER)、[SHELL_CMD](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD) 和 [SHELL_CMD_ARG](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_ARG)。
 
当使用 `-h` 或 `--help` 参数使用命令或子命令时，Shell 将打印此帮助消息。

#### <span id="parentcommands">父命令</span>

在子命令处理程序中，你可以访问传递给命令或父命令的参数, 具体取决于你对 `argv` 的索引方式。

* 使用正数索引`argv`时，可以访问参数。
* 使用负数索引`argv`时，可以访问父命令。
* 处理程序所属的子命令的`argv`索引为0。

```
static int cmd_handler(const struct shell *shell, size_t argc,
                       char **argv)
{
        ARG_UNUSED(argc);

        /* If it is a subcommand handler parent command syntax
         * can be found using argv[-1].
         */
        shell_print(shell, "This command has a parent command: %s",
                      argv[-1]);

        /* Print this command syntax */
        shell_print(shell, "This command syntax is: %s", argv[0]);

        /* Print first argument */
        shell_print(shell, "%s", argv[1]);

        return 0;
}
```

### <span id="bic">内置命令</span>

`CONFIG_SHELL_CMDS`为`y`时激活这些命令。

* **clear** - 清除屏幕。
* **history** - 显示最近输入的命令。
* **resize** - 当终端宽度不超过80个字符或每次改变终端宽度后必须执行。它确保正确的多行文本显示和`←`, `→`, `End`, `Home`键处理。目前，这个命令只能在打开了UART流控制的情况下使用。它也可以用一个子命令来调用： 
  - **default** - Shell 将终端宽度 = 80 发送到终端并假定成功提交。

下面这些命令需要`CONFIG_SHELL_CMDS_RESIZE` 设置为 `y`额外激活。

* **select** - 可用于设置新的root命令。退出到主命令树使用 alt+r。 此命令需要 `CONFIG_SHELL_CMDS_SELECT` 设置为 `y` 额外激活。

* **shell** - 包含有用的shell相关子命令的根命令，如：
  - **echo** -  切换 shell echo。
  - **colors** - 切换彩色语法。在蓝牙shell限制传输的字节数情况下可能有帮助。
  - **stats** - 显示shell统计信息。

## <span id="tf">Tab辅助功能</span>


Tab 按钮可用在建议命令或子命令。这个特性是通过[CONFIG_SHELL_TAB](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_TAB.html#std-kconfig-CONFIG_SHELL_TAB)设置为 `y` 启用的。它还可以用于部分或完全自动补全命令。这个特性通过[CONFIG_SHELL_TAB_AUTOCOMPLETION](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_TAB_AUTOCOMPLETION.html#std-kconfig-CONFIG_SHELL_TAB_AUTOCOMPLETION) 设置为 `y` 激活。当用户开始编写命令并且按下`Tab`按钮时，shell将可能执行3种操作其中之一：

* 自动补全命令。
* 提示可用命令，在可能的情况下补全部分命令。
* 如果没有可用或匹配的命令，则不会执行任何操作。

![tab_prompt](images/tab_prompt.png)

## <span id="hf">历史记录</span>

这个特性在 shell 中启动命令历史记录。它通过 [CONFIG_SHELL_HISTORY](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_HISTORY.html#std-kconfig-CONFIG_SHELL_HISTORY) 设置为 `y` 激活。 可以使用 `↑` `↓` 或 `Ctrl + n` 和 `Ctrl + p`键进行访问。可以存储的命令数量取决于 [CONFIG_SHELL_HISTORY_BUFFER](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_HISTORY_BUFFER.html#std-kconfig-CONFIG_SHELL_HISTORY_BUFFER) 参数的大小。

## <span id="wf">通配符特性</span>

Shell模块可以处理通配符。当扩展命令及其子命令没有处理程序时，通配符会被正确解释。例如： 如果你想把`app`和`app_test`模块日志记录级别设置为`err`  ，可以执行以下命令。
```
log enable err a*
```

![wildcard](images/wildcard.png)

这个特性通过[CONFIG_SHELL_WILDCARD](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_WILDCARD.html#std-kconfig-CONFIG_SHELL_WILDCARD)设置为`y`激活。

## <span id="mkf">Meta键特性</span>
 
Shell 模块支持以下Meta键:

| Meta键   | 行为                                                         |
| ------ | ------------------------------------------------------------ |
| Ctrl+a | 将光标移动到行首。 |
| Ctrl+b | 将光标向后移动一个字符。 |
| Ctrl+c | 保留屏幕上的最后一个命令，并在新行中启动一个新命令。 |
| Ctrl+d | 删除光标下的字符。    |
| Ctrl+e | 将光标移到行尾。     |
| Ctrl+f | 将光标向前移动一个字符。 |
| Ctrl+k | 删除从光标到行尾的内容。 |
| Ctrl+l | 清除屏幕并将当前键入的命令保留在屏幕顶部。 |
| Ctrl+n | 在历史中移动到下一个条目。    |
| Ctrl+p | 在历史中移动到以前的条目。 |
| Ctrl+u | 清除当前类型化的命令。   |
| Ctrl+w | 移除光标左侧的单词或单词的一部分。用句点而不是空格分隔的词被视为一个词。 |
| Alt+b  | 将光标向后移动一个单词。  |
| Alt+f  | 将光标向前移动一个单词。   |

这个特性通过 [CONFIG_SHELL_METAKEYS](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_METAKEYS.html#std-kconfig-CONFIG_SHELL_METAKEYS) 设置为 `y` 激活.

## <span id="gf">Getopt特性</span>

除了子命令之外，一些shell用户可能还需要使用的选项。参数字符串，寻找支持的选项。通常，此任务由 `getopt` 函数完成。

为此，shell支持FreeBSD项目中可用的 getopt 库。我们进行了修改，以便它被shell的所有实例同时使用，因此它的调用需要多一个参数。

示例用法：

```
while ((char c = shell_getopt(shell, argc, argv, "abhc:")) != -1) {
   /* some code */
}
```

这个模块通过 [CONFIG_SHELL_GETOPT](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_GETOPT.html#std-kconfig-CONFIG_SHELL_GETOPT) 设置为 `y` 激活。

## <span id="oif">隐藏输入特性</span>

使用隐藏输入特性，shell 可以用于实现登录提示或其他用户交互，用户输入的字符不应该显示在屏幕上，例如输入密码时。

一旦隐藏输入被接受，通常需要将 shell 返回到正常操作。这样的运行时控制可以通过 `shell_obscure_set` 函数实现。

使用此特性的登陆和注销命令在示例：[samples/subsys/shell/shell_module/src/main.c](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/subsys/shell/shell_module/src/main.c)和配置文件[samples/subsys/shell/shell_module/prj_login.conf](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/subsys/shell/shell_module/prj_login.conf)中。

这个特性在启动时设置 [CONFIG_SHELL_START_OBSCURED](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_START_OBSCURED.html#std-kconfig-CONFIG_SHELL_START_OBSCURED) 为 `y` 激活。无论采用哪种方式设置，该选项仍然可以在运行时被控制。 [CONFIG_SHELL_CMDS_SELECT](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_CMDS_SELECT.html#std-kconfig-CONFIG_SHELL_CMDS_SELECT) 通过 `shell_set_root_cmd` 函数防止输入登录以外的任何命令。同样，[CONFIG_SHELL_PROMPT_UART](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_PROMPT_UART.html#std-kconfig-CONFIG_SHELL_PROMPT_UART) 允许你在启动时设置提示，但以后可以使用`shell_prompt_change`函数进行更改。

## <span id="slbfs">记录器后端特性</span>
  
Shell 实例可以充当 [Logging](#) 后端。Shell 确保日志消息与 Shell 输出正确复用.来自日志记录器线程的日志消息在 shell 线程中进行排队和处理。如果队列已满，日志记录器线程将阻塞可配置的时间量，并在该时间阻塞记录器线程上下文。最旧的日志消息在超时后从队列中删除，新消息加入队列。使用 `shell stats show` 命令检索shell实例删除的日志消息数。日志队列大小和超时时 [SHELL_DEFINE](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_DEFINE) 参数。

这个特性通过[CONFIG_SHELL_LOG_BACKEND](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_SHELL_LOG_BACKEND.html#std-kconfig-CONFIG_SHELL_LOG_BACKEND) 设置为 `y` 激活。

:::warning 警告 
当系统中使用多个后端时，必须仔细设置排队超时。Shell 实例的传输速度可能很慢或者被阻塞，例如，被一个具有硬件流控制的 UART。 如果超时设置得太高，日志记录器线程可能会被阻塞，并影响其他日志记录器后端。
:::

:::warning 警告 
由于 Shell 是一个复杂的日志记录器后端，如果应用程序在 shell 线程运行之前崩溃，它就不能输出日志。在这种情况下，你可以启用一个简单的日志记录后端，例如UART（[CONFIG_LOG_BACKEND_UART](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_LOG_BACKEND_UART.html#std-kconfig-CONFIG_LOG_BACKEND_UART)）或者 RTT ([CONFIG_LOG_BACKEND_RTT](https://docs.zephyrproject.org/2.7.0/reference/kconfig/CONFIG_LOG_BACKEND_RTT.html#std-kconfig-CONFIG_LOG_BACKEND_RTT)),它们在系统初始化更早期间可用。
:::

## <span id="usage">用法</span>

要创建新的shell实例，用户需要使用 `menuconfig` 激活请求的后端。

下面的代码显示了这个库的一个简单用例:

```
void main(void)
{

}

static int cmd_demo_ping(const struct shell *shell, size_t argc,
                         char **argv)
{
        ARG_UNUSED(argc);
        ARG_UNUSED(argv);

        shell_print(shell, "pong");
        return 0;
}

static int cmd_demo_params(const struct shell *shell, size_t argc,
                           char **argv)
{
        int cnt;

        shell_print(shell, "argc = %d", argc);
        for (cnt = 0; cnt < argc; cnt++) {
                shell_print(shell, "  argv[%d] = %s", cnt, argv[cnt]);
        }
        return 0;
}

/* Creating subcommands (level 1 command) array for command "demo". */
SHELL_STATIC_SUBCMD_SET_CREATE(sub_demo,
        SHELL_CMD(params, NULL, "Print params command.",
                                               cmd_demo_params),
        SHELL_CMD(ping,   NULL, "Ping command.", cmd_demo_ping),
        SHELL_SUBCMD_SET_END
);
/* Creating root (level 0) command "demo" without a handler */
SHELL_CMD_REGISTER(demo, &sub_demo, "Demo commands", NULL);

/* Creating root (level 0) command "version" */
SHELL_CMD_REGISTER(version, NULL, "Show kernel version", cmd_version);
```

用户可以使用 `Tab` 键去完成命令/子命令或者查看当前输入的命令级别的可用子命令。例如，当光标位于命令行的开头并按下 `Tab` 键时，用户将看到所有根命令(级别0):
```
clear  demo  shell  history  log  resize  version
```

:::info 注意
 若要查看可用于特定命令的子命令，必须先在此命令后键入`空格`，然后按 `Tab` 键。
:::
 
这些命令由不同的模块注册，例如: 

* **clear**, **shell**, **history** 和 **resize** 是由 [subsys/shell/shell.c](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/subsys/shell/shell.c) 注册的内置命令

* **demo** 和 **version** 已通过main.c在上面的示例代码中注册。
* **log** 已被 [subsys/logging/log_cmds.c](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/subsys/logging/log_cmds.c)注册。

然后，如果用户键入 demo 命令并且按下 `Tab` 键，shell将只打印为该命令注册的子命令：
```
params  ping
```

## <span id="apiref">API参考</span>

详细请打开 [API参考](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#api-reference) 进行了解。

相关的示例请参考 [samples/shell_sample](../application/shell_sample.md)。