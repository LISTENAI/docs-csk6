
# 概述


csk6内核和子系统可以在构建时进行配置，以适应特定的应用程序和平台需求。它与Linux配置系统相同，通过Kconfig在无需更改任何源码下进行系统配置

Kconfig 的作用是用来配置内核，它就是各种配置界面的源文件，内核的配置工具读取各个 Kconfig 文件，生成配置界面供开发人员配置内核，最后生成配置文件 .config。在编译以后，配置信息会在 autoconf.h 中生成。

以下部分解释了如何设置Kconfig配置选项，详细介绍如何在csk6项目中使用Kconfig，并提供一些编写Kconfig文件的技巧和最佳实践。

* [Kconfig 交互界面](/build/kconfig/Kconfig_gui.md)
* [设置Kconfig配置](/build/kconfig/Kconfig_custom.md)
* [小贴士与最佳实践](/build/kconfig/Kconfig_tips_and_demo.md)
* [自定义 Kconfig 预处理函数](/build/kconfig/Kconfig_custom.md)
* [Kconfig 拓展](/build/kconfig/Kconfig_extension.md)