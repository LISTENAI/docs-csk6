# 芯片

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

| 标题 | 版本 | 发布日期 | 操作 |
| ---- | ---- | ---- | ---- |
| CSK6002 技术规格书 | V1.4 | 2022.8.16 | [下载](./_downloads/6002_datasheet_V1.4_listenAI.pdf) |
| CSK6011A 技术规格书 | V1.4 | 2022.8.16 | [下载](./_downloads/6011A_datasheet_V1.4_listenAI.pdf) |
| CSK6012 技术规格书 | V1.4 | 2022.8.16 | [下载](./_downloads/6012_datasheet_V1.4_listenAI.pdf) |
| CSK60XX用户使用手册 | - | - | 敬请期待 |
