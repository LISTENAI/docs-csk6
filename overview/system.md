# 系统与软件

本节主要介绍CSK6芯片开发体系的系统与软件信息。通过本章节，你将了解到：

* CSK6芯片的SDK的基本信息

* CSK6芯片所用RTOS的信息

## 基于Zephyr RTOS的 CSK6 SDK

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

CSK6 SDK 沿用了 *Zephyr* 的设计， 采用 *SDK* 与 *项目工程* 分离的形式，通过构建系统，将项目工程的代码与 SDK 进行关联编译。

这意味着 SDK 与 项目源码 是可以存放在不同的路径下的。

这样做有两个好处，一方面是可以最大的保证项目源码的简洁，另一方面 SDK 也可以进行小版本的快速升级，而应用程序不会受其影响。

CSK6 SDK 源码是开放的，你可以直接从 [Zephyr-CSK-SDK](https://cloud.listenai.com/zephyr/zephyr) 获取到 SDK 源码。

:::tip
更详细的SDK获取方式，请参照[《快速上手》](../application/getting_start.md)章节。
:::
