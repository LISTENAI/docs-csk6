# USB 模块

本节将主要介绍使用USB功能模块，我们将了解到：
- Zephyr系统中USB协议栈的作用
- USB CDC的使用

:::info 
本文暂仅通过USB CDC进行USB功能的讲解，后续本章节将提供对更多USB子功能的讲解和示例说明。
:::

## USB协议栈
Zephyr RTOS使用 [USB协议栈](https://docs.zephyrproject.org/latest/reference/usb/index.html) 来管理USB设备，USB协议栈是一个硬件独立的接口，介于USB设备控制器驱动程序和客户应用程序(含USB设备类驱动程序)之间，它包含以下功能：

-  向下使用统一的API接口与usb驱动层进行交互，方便USB底层驱动移植
-  响应标准设备请求并返回标准描述符，本质上是对usb2.0手册中第9章表9-3中的标准设备请求的实现。
-  向上提供API接口供USB device class或应用层程序使用

:::tip 
更多USB设备的支持的功能，详见 [USB Device Support](https://docs.zephyrproject.org/latest/reference/usb/index.html)
:::



## USB CDC 的使用

Zephyr RTOS官方提供了丰富的[USB示例工程](https://docs.zephyrproject.org/latest/samples/subsys/usb/usb.html)， 涵盖了UAC、CDC、DFU、MSC、HID等设备类以及复合设备的使用示例，方便用户开发。

usb cdc class是usb device class的一种，经常被用来模拟为串口。

本节通过基于hello_world工程进行修改实现USB CDC功能，来了解USB的使用。

本例使用usb cdc来模拟串口，并基于串口添加日志的输出和shell的输入功能。

### 创建一个hello_world
执行  ``lisa zep create`` 指令，在模板中选择hello_world创建一个helloworld工程

### 修改工程
#### 添加app.overlay文件
在prj.conf同级目录下添加app.overlay文件，文件内容如下：
```c
	/*
	 * Copyright (c) 2021 listenai Intelligent Technology (anhui) Co., Ltd.
	 *
	 * SPDX-License-Identifier: Apache-2.0
	 */

	/ {
		 chosen {
				 zephyr,console = &cdc_acm_uart0;
				 zephyr,shell-uart = &cdc_acm_uart0;
		 };
	};

	&zephyr_udc0 {
		 cdc_acm_uart0: cdc_acm_uart0 {
				 compatible = "zephyr,cdc-acm-uart";
				 label = "CDC_ACM_0";
		 };
	};
```
#### 添加kconfig文件
在prj.conf同级目录下添加Kconfig文件，文件内容如下：
```shell
	# Copyright (c) 2021 listenai Intelligent Technology (anhui) Co., Ltd.
	# SPDX-License-Identifier: Apache-2.0

	# 添加下面两行
	config USB_DEVICE_PID
		 default USB_PID_CONSOLE_SAMPLE

	source "Kconfig.zephyr"
```

#### 修改prj.config
在prj.conf文件中添加下面的配置：
```shell
	CONFIG_USB_DEVICE_STACK=y
	CONFIG_USB_DEVICE_PRODUCT="Zephyr USB console sample"

	CONFIG_SERIAL=y
	CONFIG_UART_LINE_CTRL=y
	CONFIG_USB_UART_CONSOLE=y

	CONFIG_SHELL=y
	CONFIG_SHELL_BACKEND_SERIAL_INIT_PRIORITY=51
```
#### 修改main.c
在src/main.c文件中添加下面的修改：
```c
	/* 头文件添加下面2行 */
	#include <usb/usb_device.h>
	#include <drivers/uart.h>

	void main(void)
	{
		/* main函数中添加下面3行代码 */
		if (usb_enable(NULL)) {
				 return;
		 }

		...
	}
```

### 编译烧录
#### 编译
执行 ``lisa zep build -b csk6011a_nano`` 指令，指定我们使用的开发板板型进行编译。

#### 烧录
执行 `lisa zep flash ` 指令进行固件烧录。

#### 观察实验结果
- 连接开发板的usb到PC
- 在设备管理器中可观察到通过USB CDC虚拟出的COM口，查看串口号
- 打开串口软件连接此串口，可观察到日志输出。

