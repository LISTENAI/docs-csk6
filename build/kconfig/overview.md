
# 概述

The Zephyr kernel and subsystems can be configured at build time to adapt them for specific application and platform needs. Configuration is handled through Kconfig, which is the same configuration system used by the Linux kernel. The goal is to support configuration without having to change any source code.
csk6内核和子系统可以在构建时进行配置，以适应特定的应用程序和平台需求。它与Linux配置系统相同，通过Kconfig在无需更改任何源码下进行系统配置

Configuration options (often called symbols) are defined in Kconfig files, which also specify dependencies between symbols that determine what configurations are valid. Symbols can be grouped into menus and sub-menus to keep the interactive configuration interfaces organized.
The output from Kconfig is a header file autoconf.h with macros that can be tested at build time. Code for unused features can be compiled out to save space.
Kconfig 的作用是用来配置内核，它就是各种配置界面的源文件，这些文件指定了配置选项之间的依赖关系。内核的配置工具读取各个 Kconfig 文件，生成配置界面供开发人员配置内核，最后生成配置文件 .config。在编译以后，配置信息会在 autoconf.h 中生成宏头文件。

The following sections explain how to set Kconfig configuration options, go into detail on how Kconfig is used within the Zephyr project, and have some tips and best practices for writing Kconfig files.
以下部分解释了如何设置Kconfig配置选项，详细介绍如何在csk6项目中使用Kconfig，并提供一些编写Kconfig文件的技巧和最佳实践。

* [Kconfig 交互界面](./Kconfig_gui.md)
* [设置Kconfig配置](./Kconfig_custom.md)
* [小贴士与最佳实践](./Kconfig_tips_and_demo.md)
* [自定义 Kconfig 预处理函数](./Kconfig_custom.md)
* [Kconfig 拓展](./Kconfig_extension.md)