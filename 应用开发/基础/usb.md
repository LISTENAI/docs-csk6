# USB

Zephyr提供了对usb设备的支持，见 [USB device
support](https://docs.zephyrproject.org/latest/reference/usb/index.html)

Zephyr使用
[USB协议栈](https://docs.zephyrproject.org/latest/reference/usb/uds.html)来管理USB设备，USB协议栈是一个硬件独立的接口，介于USB设备控制器驱动程序和USB设备类驱动程序或客户应用程序之间。


* 向下使用统一的API接口与usb驱动层进行交互，方便USB底层驱动移植


* 响应标准设备请求并返回标准描述符，本质上是对usb2.0手册中第9章表9-3中的标准设备请求的实现。


* 向上提供API接口供USB device class或应用层程序使用

## USB使用示例

[USB device support
samples](https://docs.zephyrproject.org/latest/samples/subsys/usb/usb.html)提供了很多USB
Device
Class的使用示例，涵盖了UAC、CDC、DFU、MSC、HID等设备类以及复合设备的使用示例，方便用户开发。

下面以USB CDC作为例子了解USB的使用。

## USB CDC 使用示例

usb cdc class是usb device class的一种，经常被用来模拟串口。本例使用usb cdc来模拟串口，并基于串口添加日志的输出和shell的输入功能。

### 参考链接


* [USB device stack CDC ACM
support](https://docs.zephyrproject.org/latest/reference/usb/uds_cdc_acm.html)


* [Console oevr USB CDC
ACM](https://docs.zephyrproject.org/latest/samples/subsys/usb/console/README.html)

**NOTE**: 以下所有操作示例，都是基于csk6001_pico开发板来进行相关的项目操作。

### Hello_world基本工程

本例子是基于简单的hello_world代码添加USB CDC适配。[hello_world示例代码](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/boards/csk6001/subsys/usb/cdc/console_shell)
### 修改

在项目目录下添加下面的修改，即可使用usb cdc的console和shell功能

#### app.overlay

在prj.conf同级目录下添加app.overlay文件，文件内容如下

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

#### kconfig

在prj.conf同级目录下添加Kconfig文件，文件内容如下

```makefile
# Copyright (c) 2021 listenai Intelligent Technology (anhui) Co., Ltd.
# SPDX-License-Identifier: Apache-2.0

# 添加下面两行
config USB_DEVICE_PID
     default USB_PID_CONSOLE_SAMPLE

source "Kconfig.zephyr"
```

#### prj.conf

在prj.conf文件中添加下面的配置

```default
CONFIG_USB_DEVICE_STACK=y
CONFIG_USB_DEVICE_PRODUCT="Zephyr USB console sample"

CONFIG_SERIAL=y
CONFIG_UART_LINE_CTRL=y
CONFIG_USB_UART_CONSOLE=y

CONFIG_SHELL=y
CONFIG_SHELL_BACKEND_SERIAL_INIT_PRIORITY=51
```

#### src/main.c

在src/main.c文件中添加下面的修改

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

修改后的代码与[csk6001 usb
cdc示例代码](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/boards/csk6001/subsys/usb/cdc/console_shell)类似

### 编译和烧录

#### 编译

```shell
west build -p auto -b csk6001_pico zephyr/samples/hello_world
```

#### 烧录

```shell
west flash
```

### 测试

#### windows


* 连接csk6001的usb到PC


* 在设备管理器中查看串口号


* 打开串口软件连接此串口即可


* 串口日志如下：

```default
Hello World! csk6001_pico

Hello World! csk6001_pico



uart:~$ Hello World! csk6001_pico

Hello World! csk6001_pico

Hello World! csk6001_pico

Hello World! csk6001_pico

uart:~$

uart:~$

uart:~$ Hello World! csk6001_pico

Hello World! csk6001_pico

Hello World! csk6001_pico

Hello World! csk6001_pico

Hello World! csk6001_pico
```

#### linux


* 连接csk6001的usb到PC


* 使用`lsusb`查看是否有usb设备插入


* 使用`ls /dev/ttyACM\*`查看串口


* 使用`minicom -D /dev/ttyACM\*`连接并打开相应串口，注意`\*`号为相应的串口号

**NOTE**: 本sdk基于zephyr版本为2.7。

## 其他的usb逻辑开发


* Zephyr usb介绍参考：[USB device
support](https://docs.zephyrproject.org/latest/reference/usb/index.html)


* USB应用示例代码参考：[USB device support
samples](https://docs.zephyrproject.org/latest/samples/subsys/usb/usb.html)
