# 开始项目

## 概述

在默认情况下，一个 MicroPython 应用项目将包含


1. 一个 Zephyr 应用的基本内容


2. 初始化 MicroPython 框架的 C 代码


3. MicroPython 脚本文件的主入口 main.py

## 创建项目

在终端中执行如下命令：

```bash
lisa mpy create
```

该命令将进入一个渐进式的交互流程，让你补充所要创建的项目的一些基础信息，用于对应用项目进行初始化的配置。

执行完成后，你可以在创建的目录中看到如下结构

```default
- boards/
- py/
  - main.py
- src/
- CMakeLists.txt
- Kconfig
- prj.conf
```

你可以 `main.py` 中看到最简单的一行 Python 代码

```Python
print('hello world')
```

## 编译

假设项目是为 csk6001_pico 创建的。

```bash
lisa mpy build -b csk6001_pico
```

## 烧录

假设你使用的是带了 DAPLink 的底板，那么通过 pyocd 烧录

```bash
lisa mpy flash --runner pyocd
```

该操作将 MicroPython 基础固件和包含 Python 脚本的文件系统烧录到设备中。

烧录完成后，按下设备上的 RESET 按钮重启设备，你可以在串口日志中看到 `main.py` 已生效并打印了 `hello world`。
