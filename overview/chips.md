# 芯片介绍

## CSK6芯片简介


<div style={{ display: 'flex', flexWrap: 'wrap' }}>
<div style={{ flex: 1, minWidth: 345 }}>

CSK6 是聆思科技新一代的 AI 芯片 SoC 产品系列，采用多核异构架构，集成了 ARM Star MCU，HiFi4 DSP，以及聆思全新设计的 AI 神经网络处理内核 NPU，算力达到 128 GOPS。多核异构的设计使芯片能以较低功耗满足音频及图像视频的 AI 应用需求。

本系列芯片集成了 SRAM 与 PSRAM，支持内置或外接Flash，可提供最高 4 入 2 出的 Audio Codec，VGA 像素的 DVP 摄像头接口，多达 6 路的触控检测以及 SPI、UART、USB、SDIO、I2C、I2S 等各类外设接口，丰富接口支持各类应用方案的开发。

</div>
<div style={{ textAlign: 'center', minWidth: 180, marginLeft: 24 }}>
<img
  src={require('./images/chips/chip_6012.png').default}
  alt="Example banner"
  style={{ maxHeight: 280 }}
/>
</div>
</div>


## 芯片特性


<div  align="center"><img
  src={require('./images/chips/chip_arch_new.png').default}
  width="80%"
  alt="Example banner"
/></div>

- 三核异构AI处理器
    - ARM Star MCU：最高300MHz主频
    - HIFI4 DSP：最高300MHz主频
    - NPU：128GOPS算力

- 大容量内存资源
    - 1MB SRAM
    - 最高 8MB PSRAM
    - 内置最高支持8MB Flash，可选外置

- 完整的音视频接口
    - DVP摄像头接口：支持VGA
    - 4路麦克风输入
    - 2路扬声器输出
    - 支持SPI驱屏

- 丰富接口
    - 多达33个可灵活配置的GPIO
    - USB、UART、SDIO、I2C、I2S、SPI、PWM等外设接口
    - 2个定时器，8个独立通道
    - 支持4路LEDC与8路PWM输出
    - 内置6路触控按钮检测
    - SWD、JTAG调试接口

- 更多先进特性
    - 内置硬件乘法器、硬件除法器
    - 内部集成DC-DC，支持2.7V-5.5V供电
    - 支持硬件VAD，满足低功耗场景




## 芯片接口参数

| 接口 | 数量 | 特性 |
| ---- | ---- | --------------------- |
| DVP | 1 | 格式支持：YUV422, YUV420, Raw Data <br/> 图像尺寸/帧率(Raw Data)： 640x480/120fps , 1280x720/60fps |
| UART| 4 | 支持硬件流控(CTS/RTS) |
| SPI | 2 | 支持主/从模式 |
| I2C | 2 | 支持标准/快速/快速+模式 <br/> 支持主/从模式 |
| I2S | 3 | 输入支持TDM扩展 |
| DMIC | 4 | 数字MIC输入 |
| USB | 1 |USB 1.1 full speed <br/> 支持1K字节同步传输、64字节的Bulk和中断传输 |
| SDIO | 1 | 兼容SD控制器3.0标准规范 <br/> 支持UHS50/UHS104 SD卡 <br/> 支持 4bit/8bit SD总线|
| PWM | 8 | 支持4路LEDC输出 |
| Touch Pad | 6 | 触摸按钮检测 |
| SAR ADC | 4 | 分辨率：12bit <br/> 采样速率：最大1MHz |


## 不同型号关键参数对比

|  | CSK6002 | CSK6011A | CSK6012 |
| ---- | ---- | ---- | ---- |
| SRAM | 1MB | 1MB | 1MB |
| PSRAM | 8MB | 8MB | 8MB |
| FLASH | 8MB | External | External |
| Audio Codec -  ADC | 4 channel | 2 channel | 4 channel |
| Audio Codec -  DAC | 2 channel | 2 channel (single-ended) | 2 channel |
| GPIO | 32 | 33 | 26 |
| GPADC | 3 channel | 4 channel | 3 channel |

## 芯片资料下载

| 文件 | 说明 | 版本 | 发布日期 | 操作 |
| ---- | ---- | ---- | ---- | ---- |
| CSK6002 Datasheet | 描述芯片功能特性、详细参数的技术规格书。 | V1.8 | 2023.1.31 | [下载](./_downloads/CSK6002_Datasheet_V1.8.pdf) |
| CSK6011A Datasheet |  描述芯片功能特性、详细参数的技术规格书。 | V1.8 | 2023.1.31 | [下载](./_downloads/CSK6011A_Datasheet_V1.8.pdf) |
| CSK6012 Datasheet |  描述芯片功能特性、详细参数的技术规格书。 | V1.8 | 2023.1.31 | [下载](./_downloads/CSK6012_Datasheet_V1.8.pdf) |
| CSK6系芯片引脚功能表 | 描述了芯片各个GPIO的可映射功能。 | V1.0 | 2022.9.2 | [下载](./_downloads/60XX_IOMUX_V1.0.xlsx) |
| CSK6硬件设计指南 | 对基于CSK6芯片的硬件设计进行说明，包含常见外围电路的设计指引与硬件生产制造的注意事项说明。 |V1.1 | 2022.9.30 |  [下载](./_downloads/csk6_hardware_guide_V1.1.pdf) |
| CSK6011硬件参考设计 | 基于CSK6011A芯片的纯离线模组参考设计，包含硬件设计原理图、PCB源文件。 |V1.0 | 2023.1.1 |  [下载](./_downloads/CSK6011_ReferenceDesign_V1.zip) |
---

### 样片购买链接

[聆思科技淘宝官方店-CSK6芯片样片](https://item.taobao.com/item.htm?spm=a1z10.3-c.w4002-24537349320.9.50a32c114bZdOS&id=684096246720)


### CSK6技术交流QQ群
您可以使用 QQ APP 扫描以下二维码加入交流群，与我们建立联系。
<div  align="left"><img
  src={require('./images/chips/QRCode.png').default}
  width="30%"
  alt="Example banner"
/></div>