# 视觉开发套件

## 简介
为方便开发者快速搭建可用于围绕CSK6系芯片开发**视觉类应用**的硬件原型，我们基于开发套件方案提供了**视觉开发套件**。

<div  align="center"><img
  src={require('./images/vision_kit_1.jpg').default}
  width="80%"
  alt="Example banner"
/></div>


视觉开发套件具备以下主要特性：

- 包含CSK6011-NanoKit开发板、视觉功能模块与引脚扩展板
- 支持DVP或SPI接口摄像头
- 配套视觉SDK与Sample，套件开箱即用

## 使用说明

### 硬件组成

视觉开发套件由以下套件成员组成：

| 成员 | 说明 | 使用指引 | 下载 |
| ------ | ------ | ------ | ------ |
| CSK6011-NanoKit开发板 | 开发板主体，板载CSK6011A芯片模组 | [使用说明文档](../csk6011_nanokit) | [原理图](../_downloads/CSK6011-NanoKit_v1_sch.pdf) |
|  视觉功能模块 | 兼容DVP&SPI双接口设计，默认配套DVP摄像头模组（GC032A 30万像素），即插即用 | [使用说明文档](../nanokit_vision) | [原理图](../_downloads/NanoKit_vision_v1_sch.pdf) |
| 引脚扩展板 | 提供三组排针扩展，方便硬件调试或接入其他扩展板 | [使用说明文档](../nanokit_extend) | - |
| 摄像头支架 | 可插入视觉功能模块插槽的亚克力支架，可用于支撑摄像头以获得更好的成像角度 | - | - |

:::tip
- 使用摄像头模组时，请撕开用于保护模组镜头的保护膜，以保证良好的成像质量
- 套件中各成员硬件的使用说明可参照上述型号对应的使用说明书
:::

### 摄像头支架配件的使用
为方便开发者在开发视觉应用时可以让摄像头模组拥有更好的角度，我们在开发套件中配套了一个小巧的配件 ———— 摄像头支架。

<div  align="center"><img
  src={require('./images/stents_1.jpg').default}
  width="50%"
  alt="Example banner"
/></div>

当视觉开发套件平放于桌面时，可以选择将摄像头支架竖立固定在视觉模块的插槽内，并让摄像头倚靠在支架上，从而更方便地采集图像。

摄像头支架的安装过程请参照以下步骤：

<div  align="center"><img
  src={require('./images/use_stents.jpg').default}
  width="100%"
  alt="Example banner"
/></div>

安装完成后，调整摄像头排线倚靠于支架上，开始玩转视觉应用吧！

<div  align="center"><img
  src={require('./images/stents_2.jpg').default}
  width="50%"
  alt="Example banner"
/></div>

### 视觉套件芯片引脚使用情况(DVP摄像头)

| 芯片PIN引脚 | 功能占用 |
| -------- | ---- | 
| *PA2 | 日志串口:UART0_RXD |
| *PA3 | 日志串口:UART0_TXD |
| PA4 | DVP:D4 |
| PA5 | DVP:D5 |
| PA6 | DVP:D6 |
| PA7 | DVP:CLK_POUT | 
| PA8 | DVP:D10 |
| PA9 | DVP:D11 |
| PA12 | DVP:PCLK |
| PA13 | DVP:HSYNC |
| PA14 | DVP:VSYNC |
| PB03 | DVP:I2C_SDA |
| PB04 | DVP:I2C_SCL |
| *PB05 | 按键 |
| *PB06 | LED |
| PB07 | DVP:D7 |
| PB08 | DVP:D8 |
| PB09 | DVP:D9 |
| *PB010 | USB：DP，使用上位机软件预览图像时占用 |
| *PB011 | USB：DM，使用上位机软件预览图像时占用|

:::info
带*的引脚为不影响视觉功能的非必要引脚，可根据具体开发需要进行使用。
:::


### 软件资源配套

为方便开发者拿到视觉开发套件后可以便捷地体验其AI能力与开发，我们提供了视觉SDK与配套的指引文档，您可以通过文档的指引快速搭建起实验环境，进行AI应用的开发。

| AI SDK | 说明 | 操作 |
| -------- | ------ | ------ |
| 头肩&手势识别 | 检测图像中的头肩位置，识别手势，可返回目标位置与得分 | [阅读指引文档](../../../ai_usage/hsgd/intro) |
| 人脸识别 | 检测图像中人脸信息，选取画面中分值最高的人脸，返回人脸边界框、人脸标定点、头部姿态角度、人脸识别特征等 | [阅读指引文档](../../../ai_usage/fd/intro) |

更多视觉AI能力敬请期待。

---
### 套件购买链接

[聆思科技淘宝官方店-视觉开发套件](https://item.taobao.com/item.htm?spm=a230r.1.14.1.3ce31674ICib4M&id=687851402211&ns=1&abbucket=5#detail)

### 开发套件快速体验

视觉开发套件默认配备头肩&手势识别AI能力，开箱即可快速完成产品体验。
<video src="https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/zephyr/%E5%8A%9F%E8%83%BD%E6%96%87%E4%BB%B6/video-6.mp4" controls="controls" width="600" height="500">您的浏览器不支持播放该视频！</video>

