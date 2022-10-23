# C3网络模块

## 简介
C3网络模块(CSK-MOD-C3)是为方便开发者基于CSK6开发**无线网络应用**而设计的一款开发板功能扩展板，它可以通过安装在具备**网络扩展插槽**的NanoKit开发板的上，使NanoKit开发板具备WIFI、蓝牙等无线联网能力，从而让您可以更方便地在应用上增加、调试、验证无线网络功能，配合音频、视觉配件等还可以快速验证**在离线语音交互**、**在线AI视觉处理**等应用。

<div  align="center"><img
  src={require('./images/nanokit_c3_1.jpg').default}
  width="60%"
  alt="Example banner"
/></div>

C3网络模块具备以下主要特性：

- 搭配具备网络扩展插槽的NanoKit开发板使用，如[CSK6011-NanoKit](./csk6011_nanokit)、[CSK6012-NanoKit](./csk6012_nanokit)
- 板载ESP32-C3网络模组，支持WIFI、BLE功能
- 与NanoKit配合使用时，C3网络芯片作为CSK6的网络通道芯片(网卡)使用，为CSK6提供网络链锯，不承载网络业务处理逻辑
- TCP Upload 速率 ＞ 9 Mbps，TCP Download 速率 ＞ 4 Mbps


## 板载资源介绍

<div  align="center"><img
  src={require('./images/nanokit_c3_2.jpg').default}
  width="80%"
  alt="Example banner"
/></div>

**C3网络模块 板载资源如下**

| 编号 | 硬件资源 | 说明 |
| ----- | -------- | ------ |
| 1 | ESP32-C3模组 | 模组型号：ESP32-C3-MINI-1-N4 |
| 2 | 模组烧录与串口引脚   | 2.54mm引脚公座，引出ESP32-C3模组的引脚(EN/TXD0/RXD0/GND/IO9)，可用于对模组进行固件烧录与调试。|
| 3 | 网络模块插针 | 用于连接NanoKit开发板的网络扩展插槽，进行数据通讯。|


## C3网络功能模块的使用

### 网络模块与CSK6芯片连接关系与引脚定义

<div  align="left"><img
  src={require('./images/nanokit_c3_3.jpg').default}
  width="50%"
  alt="Example banner"
/></div>

| No. | C3模组引脚 | CSK6芯片引脚 | 说明 |
| ----| -------- | ---- | ---- | 
| 1 | C3_CHIP_EN | GPIOA_10 | 模组RESET引脚 | 
| 2 | C3_GPIO4 | GPIOA_11 | DATA READY引脚 | 
| 3 | C3_GPIO5 | GPIOA_16 | HAND SHAKE引脚 | 
| 4 | C3_SPI0_MOSI (GPIO7) | SPI1_MOSI (GPIOA_19) | SPI数据引脚 |
| 5 | C3_SPI0_CS (GPIO10) | SPI1_CS (GPIOA_17) | SPI片选 |
| 6 | C3_SPI0_MISO (GPIO2) | SPI1_MISO (GPIOA_18) | SPI数据引脚 |
| 7 | C3_SPI0_CLK (GPIO6) | SPI1_CLK (GPIOA_20) | SPI时钟 |


:::tip
模块的背面印有引脚功能丝印，用户可参照丝印进行引脚功能的辨认。
:::

### 与NanoKit开发板的连接

将C3网络功能模块**引脚插座朝下**插入NanoKit开发板上方的网络扩展插槽中，如图：

<div  align="center"><img
  src={require('./images/nanokit_c3_4.jpg').default}
  width="60%"
  alt="Example banner"
/></div>


### 编译版型的选择

当在NanoKit开发板上使用C3网络功能模块且应用中需使用到相关网络功能时，需在进行固件编译时选择对应的带c3定义的版型，如下：

| 开发板组合 | 编译所用板型 |
| --------- | ------------ |
| [CSK6011-NanoKit](./csk6011_nanokit) + C3网络功能模块  | ``csk6011a_c3_nano`` |
| [CSK6012-NanoKit](./csk6012_nanokit) + C3网络功能模块  | ``csk6012_c3_nano`` |

:::tip
在终端命令行执行 **lisa zep boards** 命令可查看当前SDK支持的所有CSK6相关版型。

:::

### C3模组固件的烧录

C3网络功能模块在出厂时默认已经烧录了所需的固件，**一般情况下用户不需要接触到此操作**。在如调试、排查问题等特殊场景下需要进行C3固件烧录时，可参照以下资源进行操作：

| 资源 | 说明 |
| -------------- | -------------|
| [烧录工具与指引](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/zephyr/%E5%B7%A5%E5%85%B7/flash_download_tool_3.9.2.zip) | C3模组烧录所需的工具，内含操作指引文档。 |
| [C3模组固件](./_downloads/esp-hosted-merged.bin) | 用于烧录进模组的固件镜像。|



## 资料下载

| 文件 | 操作 |
| -------------- | -------------|
| C3网络功能模块 硬件原理图 | [下载](./_downloads/csk-mod-c3_v1.1_sch.pdf) |
