# 添加自定义板型

## 概述
在前面的[设备树](../build/dts/intro.md)章节中描述了硬件板型资源的层级数据结构和使用方法，csk6 sdk默认支持了`csk6002_9s_nano`等开发板板型，开发者在使用官方的开发板时进行应用开发时可以直接使用这些板型。

但在实际的应用场景中，开发者往往会基于CSK6芯片构建自己的硬件产品，为方便应用开发和项目代码集中管理，开发者可能需要根据自己的硬件情况新增一个板型。

csk6 sdk支持开发者在app应用目录下新增一个应用级别的board，通过本章节的学习，您将了解到：
- 新增一个板型的正确方法
- 如何针对新的硬件适配自定义板型

## 添加自定义board

csk6 sdk适配了`csk6002_9s_nano`开发板，对应的board配置文件在`zephyr\boards\arm\csk6002_9s_nano`目录下，目录文件结构如下：
```
└── csk6002_9s_nano
    ├──  board.cmake
    ├──  CMakeLists.txt
    ├──  csk6002_9s_nano_defconfig
    ├──  csk6002_9s_nano_pinctrl.dtsi
    ├──  csk6002_9s_nano.dts
    ├──  csk6002_9s_nano.yaml
    ├──  Kconfig.board
    └──  Kconfig.defconfig
```

同样，在app目录下添加boards板型文件时也必须遵守`boards/<arch>/<board_name>`格式，本章节以添加新板型`csk6002_myboard`为例，在app目录下完成新增board的实现。

添加board一般的做法是在SDK的`zephyr/boards`目录下寻找一个使用相同soc的board作为模板，再根据硬件的差异对dts和配置文件进行修改，Zephyr sdk也提供了添加board的sample，位于`zephyr/samples/application_development/out_of_tree_board`目录下。

本章节将基于csk6 sdk 提供的blinky sample项目，新建一个名为`csk6002_myboard`的板型，并使用这个新的板型对blinky sample进行编译与运行。

### 步骤一：创建应用项目，以便在应用项目上增加自定义板型
创建blinky sample项目步骤如下：  
![](./images/lisa_zep_create.png)

首先创建一个sample，可以是hello_world或者其他应用项目，并在sample项目的基础上添加自定义板型。  

### 步骤二：在app目录下为新的板型`csk6002_myboard`添加板型配置文件

在刚创建的sample的工程目录下创建 `boards\arm\csk6002_myboard`目录

将SDK的 `zephyr\boards\arm\csk6002_9s_nano` 目录下的所有内容拷贝到`csk6002_myboard`目录下，并把文件的所有 **csk6002_9s_nano** 名称修改为 **csk6002_myboard**。

```
app目录
└── boards
	└── arm
        └── csk6002_myboard
            ├──  board.cmake
            ├──  CMakeLists.txt
            ├──  csk6002_myboard_defconfig
            ├──  csk6002_myboard_pinctrl.dtsi
            ├──  csk6002_myboard.dts
            ├──  csk6002_myboard.yaml
            ├──  Kconfig.board
            └──  Kconfig.defconfig
```
配置文件中的`csk6002_9s_nano`字段需要同步改成`csk6002_myboard`。

- csk6002_myboard_defconfig文件

```
CONFIG_BOARD_csk6002_myboard=y
```

- csk6002_myboard_pinctrl.dtsi文件

```
csk6002_myboard_pinctrl:csk6002_pinctrl
```

- csk6002_myboard.dts文件  

```
#include "csk6002_myboard_pinctrl.dtsi"

/ {
        model = "csk6002 myboard";
        compatible = "csk,csk6002_myboard";
```

- csk6002_myboard.yaml文件

```
identifier: csk6002_myboard
```

- Kconfig.board文件

```
config BOARD_csk6002_myboard
   bool "csk6002_myboard Board"
   depends on SOC_CSK6
```

- Kconfig.defconfig文件

```
if BOARD_csk6002_myboard
config BOARD
   default "csk6002_myboard"
endif # BOARD_csk6002_myboard
```

### 步骤三：CMake文件修改

在`app/CMakeLists.txt`(注意不是boards目录下的`CMakeLists.txt`)文件中添加`set(BOARD_ROOT ${CMAKE_CURRENT_LIST_DIR})`编译配置，指定项目编译时引用app目录下的board配置：

```
# SPDX-License-Identifier: Apache-2.0

cmake_minimum_required(VERSION 3.20.0)

# 指定使用app目录下的自定义boards
set(BOARD_ROOT ${CMAKE_CURRENT_LIST_DIR})

find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(blinky)

target_sources(app PRIVATE src/main.c)
```

### 步骤四：修改dts和配置文件

#### .dts文件修改
在[设备树](../build/dts/intro.md)章节中可学习到`.dts`文件是设备树的源文件，用来定义硬件设备的细节，比如定义一个uart设备，并定义其引脚信息等。
参考`csk6002_9s_nano`配置在该文件中完成`leds`、`gpio_keys`、`wifi_module`、`uart0`、`flash0`、 `psram0`、`spi0`等外设的设备树配置，更多关于设备树配置和规则请查阅[设备树](../build/dts/intro.md)章节。

修改示例：

csk6002_myboard相对csk6002_9s_nano在硬件上硬件选用了不同的wifi模组，那么对应的wifi设备树配置需要做如下改动：

```shell
    wifi_module: xr819s {
            compatible = "wifi,xr819s";
            label = "WiFi module";
            dataready-gpios = <&gpioa 16 0>;
            reset-gpios = <&gpioa 17 0>;
            sdio-clk-gpios = <&gpioa 20 0>;
            sdio-cmd-gpios = <&gpioa 18 0>;
            sdio-dat0-gpios = <&gpioa 19 0>;
            status = "okay";
    };
```
同理，其他pin脚有不一样的也需要同步修改dts设备树对应的配置。
### 步骤五：编译烧录
#### 编译 

在app根目录下通过以下指令完成编译，编译时指定配置好的新board板型`csk6002_myboard`：
```
lisa zep build -b csk6002_myboard
```
#### 烧录  

`csk6002_myboard`开发板通过USB连接PC，通过烧录指令烧录：
```
lisa zep flash
```

:::tip
如果您的硬件板型不带daplink，可通过J-link或串口烧录，详细的烧录方式可在[csk6 烧录](../gdbdebug/csk6_load.md)章节中查看。
:::

#### 查看结果 

CSK6-NanoKit通过板载DAPlink虚拟串口连接电脑，或者将CSK6-NanoKit的日志串口`A03 TX A02 RX`外接串口板并连接电脑。
- 通过lisa提供的`lisa term`命令查看日志
- 或者在电脑端使用串口调试助手查看日志，默认波特率为115200。

以上即为基于csk6 sdk适配`csk6002_myboard`开发板的过程。