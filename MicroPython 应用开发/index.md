# MicroPython 应用开发

## 概述

为了使开发者可以提升开发 CSK 应用的效率，我们也致力于让开发者可以使用更高级的编程语言来进行应用开发。

与此同时，业界内较为广泛的应用是使得 Python 可以在微处理器上运行一个轻量化的版本。 [MicroPython](https://github.com/micropython/micropython) 便是这一方向上较为知名的一种实现。

我们在搭建 MicroPython 应用开发环境的同时，完完全全的保留了 Zephyr 原生应用开发的环境，使得你既可以快速的从原生应用上加入对 MicroPython 的支持，也可以在 MicroPython 应用项目内增加原生代码（如 C 语言）的业务实现。

## 快速开始


* [安装](install)


    * [获取 Lisa 并安装 Zephyr 开发环境](install#lisa-zephyr)


    * [安装 Lisa MicroPython 插件](install#lisa-micropython)


    * [安装 MicroPython SDK](install#micropython-sdk)


* [开始项目](start)


    * [概述](start#id2)


    * [创建项目](start#id3)


    * [编译](start#id4)


    * [烧录](start#id5)


* [运行代码](run)


    * [连接设备](run#id2)


    * [单行命令运行代码](run#id3)


    * [进入终端运行代码](run#id4)


    * [运行 PC 上的脚本文件](run#pc)


    * [在文件系统中执行](run#id5)


    * [从 C 执行 Python 语句](run#c-python)


    * [从 C 调用 Python 函数](run#id10)


* [打包程序到固件](bundle_program)


    * [打包方式](bundle_program#id2)


    * [如何选择打包方式](bundle_program#which-bundle-way-is-better)


## 高级应用


* [屏幕显示](advance/display)


    * [编译](advance/display#id2)


        * [启用配置](advance/display#id3)


        * [设备树配置](advance/display#id4)


        * [编译并烧录到设备](advance/display#id5)


    * [使用](advance/display#id6)


* [混合编程 (C + MicroPython)](advance/mixed_program)


    * [1. 编译配置](advance/mixed_program#id1)


        * [项目配置](advance/mixed_program#id2)


        * [板型配置](advance/mixed_program#id3)


    * [2. 文件系统配置](advance/mixed_program#id4)


    * [3. 启动 MicroPython](advance/mixed_program#micropython)


## 常见问题


* [内存使用相关](faq/memory)


    * [内存使用方式问题](faq/memory#id2)


    * [垃圾回收问题](faq/memory#id3)


* [文件系统相关](faq/file_system)


    * [文件系统需要配置多大](faq/file_system#id2)
