# 概述

**LISA (Listenai Independent Software Architecture)** 是聆思智能提供的软件框架，支持客户通过命令行工具使用并管理聆思提供的软件包。

通过 lisa 作为顶级命令，后面带上对应的子命令启动，比如:

```bash
lisa -v
lisa login
lisa info
```

**Lisa-Plugin-Zephyr** 是基于 Lisa 生态的一个命令行插件。使用它你能很便捷地对CSK6应用程序进行 **构建**、 **烧录**、 **调试** 等等功能。

该插件的调用，通过 lisa zep 来作为顶级命令，后面带上对应的子命令、选项和参数：

```bash
lisa zep <command> [opts] <args>
```
