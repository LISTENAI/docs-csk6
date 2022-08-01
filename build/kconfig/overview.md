
# 概述

csk6内核和子系统可以在构建时进行配置，以适应特定的应用程序和平台需求。它与Linux配置系统相同，目的是通过`Kconfig`在无需更改任何源码下进行系统配置

配置选项（通常也称作符号）在若干个 Kconfig 文件中定义，并且根据不同符号之间的依赖关系来决定最终配置是否可用。选项可以分组为菜单和子菜单，用来保持交互式配置的架构。  
Kconfig 的输出是一个包含可测试的宏的头文件 autoconf.h，通过宏来控制未使用的特性进行编译，从而节省空间。

以下部分解释了如何设置Kconfig配置选项，详细介绍如何在csk6项目中使用`Kconfig`，并提供一些编写Kconfig文件的技巧和最佳实践。

* [Kconfig 交互界面](./Kconfig_gui.md)
* [设置Kconfig配置](./Kconfig_custom.md)
* [小贴士与最佳实践](./Kconfig_tips_and_demo.md)
* [自定义 Kconfig 预处理函数](./Kconfig_custom.md)
* [Kconfig 拓展](./Kconfig_extension.md)
