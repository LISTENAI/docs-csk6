# 系统与软件

本节主要介绍CSK6芯片开发体系的整体系统架构。通过本章节，你将了解到：

* CSK6芯片的SDK基本信息

* CSK6芯片的SDK组成

* 进行CSK6芯片开发的基本路径

## CSK6 SDK base Zephyr

### Zephyr介绍

CSK6使用Zephyr RTOS作为首选的操作系统。

Zephyr RTOS是一款由Linux基金会主导的、针对资源受限设备进行优化过的开源RTOS，为高性能、低功耗的物联网应用而设计。因为其先进的特性，越来越多的芯片厂商也将Zephyr RTOS作为其优先适配的操作系统。

Zephyr RTOS具备以下优点：
- 开源，越来越多开发者的参与使其不断完善，保持先进
- 模块化&高度可配置，用户可通过配置对自己的应用轻松进行裁剪以适配不同场景
- 安全性高

Zephyr RTOS可以在操作系统层面与CSK6芯片有高匹配度的结合，使CSK6芯片充分发挥其先进的性能，因此聆思提供了对CSK6系列芯片的初始Zephyr支持，包括Zephyr各类子系统与示例。开发者可通过丰富的示例快速上手各类芯片外设的开发。

是聆思针对CSK6芯片生成的一个Zephyr项目分支，为CSK6芯片提供了Zephyr RTOS下的库、驱动程序与示例，开发者可通过此SDK进行CSK6芯片的开发。在后续的《快速开始》章节中我们将详细讲解其使用方法。


### CSK6 SDK 说明

CSK6 沿用了 *Zephyr* 的设计， 采用 *SDK* 与 *项目工程* 分离的形式，通过构建系统，将项目工程的代码与 SDK 进行关联编译。

这意味着 SDK 与 项目源码 是可以存放在不同的路径下的。

这样做有两个好处，一方面是可以最大的保证项目源码的简洁，另一方面 SDK 也可以进行小版本的快速升级，而应用程序不会受其影响。

CSK6 SDK 源码是开放的，你可以直接从 [Zephyr-CSK-SDK](https://cloud.listenai.com/zephyr/zephyr) 获取到 SDK 源码。

:::tip
更详细的SDK获取方式，请参照《快速上手》章节。
:::

### CSK6 SDK 目录结构

了解Zephyr源代码的目录结构有利于我们建立对SDK的整体框架认知，有助于后续我们查找与编写相关特性的代码。

| 目录| 说明|
| ----- | ---------------------------------------------------------- |
| arch | 存放与芯片架构及其系统内核相关的平台文件与代码 |
| soc | SoC相关代码和配置文件 |
| boards | 与开发板板型相关的代码与配置文件，每个子目录代表一个板型，如定义了硬件板载资源的dts文件(如csk6002_c3_nano.dts)，通过dts文件快速了解开发板各外设接口的定义 |
| doc | Zephyr技术文档源文件与生成文档的工具 |
| drivers | 设备驱动源码 |
| dts | 包含描述与芯片、板型相关的设备树文件，如外设的寄存器定义等 |
| include | 公共API头文件 |
| kernel | 与芯片架构无关的操作内核代码 |
| lib | 库代码，包括标准的C库 |
| samples | RTOS使用例程 |
| scripts | 用于构建、测试Zephyr应用的程序与工具 |
| cmake | 构建Zephyr系统所需脚本 |
| subsys | 一些子系统的代码，如USB、文件系统、网络、无线通讯等 |
| tests | Zephyr功能测试、标准测试代码 |
| misc | 其他杂项代码 |
 
:::tip
1.更多SDK的目录信息可参照 [Zephyr文档中心-目录架构说明](https://zephyr-docs.listenai.com/application/index.html#source-tree-structure)

2.对刚接触SDK的开发者来说，以关注boards、dts、samples、drivers这几个与芯片、开发板相关性较大的目录为主，随着对SDK的熟悉，将逐步加深对SDK整体的了解。
:::