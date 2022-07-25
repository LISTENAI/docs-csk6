# Shell

* Overview [概述](#overview)
  - Connecting to Segger RTT via TCP (on macOS, for example)  
    [通过 TCP 连接 Segger RTT(例如在macOS上)](#ctsrvt)
* Commands [命令](#commands)
  - Creating commands
    [创建命令](#createcommands)
  - Dictionary commands
    字典命令
  - Commands execution
    命令执行
  - Built-in commands
    内置命令
* Tab Feature 标签特性
* History Feature 历史特性
* Wildcards Feature 通配符特性
* Meta Keys Feature 元键特性
* Getopt Feature Getopt特性
* Obscured Input Feature 模糊输入特性
* Shell Logger Backend Feature Shell记录器后端特性
* Usage 用法
* API Reference API参考

## <span id="overview">概述</span>

This module allows you to create and handle a shell with a user-defined command set. You can use it in examples where more than simple button or LED user interaction is required. This module is a Unix-like shell with these features:  
此模块允许你创建和处理具有用户定义命令集的shell。你可以在需要简单的按钮或LED等用户交互的示例中使用它。这个模块是一个类似Unix的shell，具有以下特性：

* Support for multiple instances.  
    支持多个实例。
* Advanced cooperation with the Logging.  
    与Logging高级合作。
* Support for static and dynamic commands.  
    支持静态和动态命令。
* Support for dictionary commands.  
    支持字典命令。
* Smart command completion with the Tab key.  
    使用`Tab`键完成命令补全。
* Built-in commands: clear, shell, colors, echo, history and resize.  
    内置命令：clear, shell, colors, echo, history and resize。
* Viewing recently executed commands using keys: ↑ ↓ or meta keys.  
    使用`↑` `↓`键：或元键查看最近执行的命令。
* Text edition using keys: ←, →, Backspace, Delete, End, Home, Insert.  
    使用 `←`, `→`, `Backspace`, `Delete`, `End`, `Home`, `Insert` 键进行文本编辑。  
* Support for ANSI escape codes: VT100 and ESC[n~ for cursor control and color printing.  
    支持ANSI转义符：`VT100` 和 `ESC[n~` 用于光标控制和彩色打印
* Support for editing multiline commands.  
    支持编辑多行命令。
* Built-in handler to display help for the commands.  
    显示命令帮助的内置处理程序。
* Support for wildcards: * and ?.  

    支持通配符: `*` 和 `?`。
* Support for meta keys.  
    支持元键。
* Support for getopt.  
    支持getopt。
* Kconfig configuration to optimize memory usage.  
   使用Kconfig配置优化内存。

:::info
 Some of these features have a significant impact on RAM and flash usage, but many can be disabled when not needed. To default to options which favor reduced RAM and flash requirements instead of features, you should enable CONFIG_SHELL_MINIMAL and selectively enable just the features you want.  
 其中有一些特性对RAM和FLASH的使用影响很大，但是很多特性在不需要的时候可以禁用它们。默认情况下，应该启用`CONFIG_SHELL_MINIMAL`并选择性地启用你需要的特性。
:::

The module can be connected to any transport for command input and output. At this point, the following transport layers are implemented:  
该模块可以连接到任何传输命令的输入和输出。这将实现以下传输层：

* Segger RTT
* SMP
* Telnet
* UART
* USB接口
* DUMMY - 不是物理传输层.

## <span id="ctsrvt">通过 TCP 连接 Segger RTT(例如在macOS上)</span>

On macOS JLinkRTTClient won’t let you enter input. Instead, please use following procedure:  
在macOS上， JLinkRTTClient 不允许输入，请使用以下步骤：

* Open up a first Terminal window and enter:  
  ```
  JLinkRTTLogger -Device NRF52840_XXAA -RTTChannel 1 -if SWD -Speed 4000 ~/rtt.log
  ```
  (change device if required)  
  (根据需要更换设备)

* Open up a second Terminal window and enter:  
  打开第二个终端窗口并输入：
  ```
  nc localhost 19021
  ```

* Now you should have a network connection to RTT that will let you enter input to the shell.  
  现在你应该有一个到 RTT 的网络连接，它允许你进行shell输入。

## <span id="commands">命令</span>

Shell commands are organized in a tree structure and grouped into the following types:  
Shell命令以树状结构分为以下类型：

* Root command (level 0): Gathered and alphabetically sorted in a dedicated memory section.  
    根命令（等级0）：在专用内存部分中收集并按字母顺序排序。
* Static subcommand (level > 0): Number and syntax must be known during compile time. Created in the software module.  
    静态子命令（等级>0）：在编译期间必须知道编号和语法。在软件模块中创建。
* Dynamic subcommand (level > 0): Number and syntax does not need to be known during compile time. Created in the software module.  
    动态子命令（等级>0）：在编译期间不需要知道编号和语法。在软件模块中创建。

### <span id="createcommands">创建命令</span>

Use the following macros for adding shell commands:  
使用以下宏添加shell命令：

* SHELL_CMD_REGISTER - Create root command. All root commands must have different name.  
  [SHELL_CMD_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_REGISTER) - 创建根命令。所有根命令必须有不同的名称。

* SHELL_COND_CMD_REGISTER - Conditionally (if compile time flag is set) create root command. All root commands must have different name.  
  [SHELL_COND_CMD_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD_REGISTER) - 条件（如果设置了编译时标志）创建根命令。所有根命令必须具有不同的名称。

* SHELL_CMD_ARG_REGISTER - Create root command with arguments. All root commands must have different name.  
  [SHELL_CMD_ARG_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_ARG_REGISTER) - 创建带参数的根命令。所有根命令必须具有不同的名称。

* SHELL_COND_CMD_ARG_REGISTER - Conditionally (if compile time flag is set) create root command with arguments. All root commands must have different name.  
  [SHELL_COND_CMD_ARG_REGISTER](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD_ARG_REGISTER) - 条件（如果设置了编译时标志）创建带参数的根命令。所有根命令必须具有不同的名称。

* SHELL_CMD - Initialize a command.  
  [SHELL_CMD](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD) - 初始化命令。
* SHELL_COND_CMD - Initialize a command if compile time flag is set.  
  [SHELL_COND_CMD](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD) - 如果设置了编译时间标志，则初始化命令。

* SHELL_EXPR_CMD - Initialize a command if compile time expression is non-zero.  
  [SHELL_EXPR_CMD](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_EXPR_CMD) - 如果编译时表达式不为零，则初始化命令。

* SHELL_CMD_ARG - Initialize a command with arguments.  
  [SHELL_CMD_ARG](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_CMD_ARG) - 使用参数初始化命令。

* SHELL_COND_CMD_ARG - Initialize a command with arguments if compile time flag is set.  
  [SHELL_COND_CMD_ARG](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_COND_CMD_ARG) - 如果设置了编译时间标志，则使用参数初始化命令。

* SHELL_EXPR_CMD_ARG - Initialize a command with arguments if compile time expression is non-zero.  
  [SHELL_EXPR_CMD_ARG](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_EXPR_CMD_ARG) - 如果编译时表达式不为零，则使用参数初始化命令

* SHELL_STATIC_SUBCMD_SET_CREATE - Create a static subcommands array.  
  [SHELL_STATIC_SUBCMD_SET_CREATE](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_STATIC_SUBCMD_SET_CREATE) - 创建一个静态子命令数组。

* SHELL_SUBCMD_DICT_SET_CREATE - Create a dictionary subcommands array.  
  [SHELL_SUBCMD_DICT_SET_CREATE](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_SUBCMD_DICT_SET_CREATE) - 创建一个字典子命令数组。

* SHELL_DYNAMIC_CMD_CREATE - Create a dynamic subcommands array.  
  [SHELL_DYNAMIC_CMD_CREATE](https://docs.zephyrproject.org/2.7.0/reference/shell/index.html#c.SHELL_DYNAMIC_CMD_CREATE) - 创建一个动态子命令数组。

Commands can be created in any file in the system that includes `include/shell/shell.h`. All created commands are available for all shell instances.