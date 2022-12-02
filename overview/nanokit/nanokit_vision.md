# 视觉功能模块

## 简介
视觉功能模块(NanoKit_vision_v1)是为方便开发者基于CSK6开发**视觉类应用**而设计的一款开发板功能扩展板，您可以使用它与NanoKit开发板一起配合搭建成支持视觉功能的硬件，开发如人脸锁、跟拍云台等有趣的应用。

<div  align="center"><img
  src={require('./images/nanokit_vision_1.jpg').default}
  width="70%"
  alt="Example banner"
/></div>

视觉功能板具备以下主要特性：

- 搭配CSK6011A芯片(开发板)使用
- 支持DVP与SPI两类摄像头接口模组接入
- 可直接与NanoKit开发板进行对插使用
- 支持通过引脚扩展板与NanoKit开发板进行桥接使用

## 板载资源介绍

<div  align="center"><img
  src={require('./images/nanokit_vision_2.jpg').default}
  width="80%"
  alt="Example banner"
/></div>

**NanoKit_vision 板载资源如下**

| 编号 | 硬件资源 | 说明 |
| ----- | -------- | ------ |
| 1 | 摄像头FPC座 |可用于连接摄像头模组软排线的连接器，该接口包含了DVP与SPI两种定义。 |
| 2 | 摄像头模组 | 默认配套GC023A DVP摄像头模组，图像分辨率：640x480px，镜头FOV：85°。[GC032A DataSheet下载](./_downloads/GC032A_DataSheet.pdf)|


## 视觉功能板的使用

### 引脚定义

| 芯片PIN引脚 | DVP接口功能定义 | SPI接口定义 |
| -------- | ---- | ---- | 
| PA4 | D4 | - | 
| PA5 | D5 | - | 
| PA6 | D6 | SPI0 D0 | 
| PA7 | CLK_POUT | MCLK |
| PA8 | D10 | SPI1 PCLK |
| PA9 | D11 | - |
| PA12 | PCLK | - |
| PA13 | HSYNC | - |
| PA14 | VSYNC | - |
| PA15 | - | SPI1 D0 |
| PB03 | I2C_SDA | I2C_SDA |
| PB04 | I2C_SCL | I2C_SCL |
| PB07 | D7 | - |
| PB08 | D8 | - |
| PB09 | D9 | SPI0 PCLK |

:::tip
模块的背面印有引脚功能丝印，用户可参照丝印进行引脚的辨认。
:::

### 与NanoKit开发板的连接

#### 方式一：直接与NanoKit开发板对插

<div  align="center"><img
  src={require('./images/use_vision_1.jpg').default}
  width="60%"
  alt="Example banner"
/></div>

:::note
视觉功能板摄像头FPC座NanoKit开发板的USB口位于同一侧。
:::

:::caution
拔插功能板时，请尽可能进行垂直方向的缓慢操作，比避免损坏NanoKit开发板排针引脚。
:::


#### 方式二：通过引脚扩展底板与NanoKit进行桥接

在有引脚扩展底板的情况下，可将视觉功能板插入已安装了NanoKit开发板的引脚扩展底板上。

<div  align="center"><img
  src={require('./images/use_vision_2.jpg').default}
  width="70%"
  alt="Example banner"
/></div>

## 资料下载

| 文件 | 操作 |
| -------------- | -------------|
| NanoKit_vision_v1 硬件原理图 | [下载](./_downloads/NanoKit_vision_v1_sch.pdf) |
