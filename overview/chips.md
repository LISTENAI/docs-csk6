# 芯片

## 芯片简介

<div  align="center"><img
  src={require('./images/chips/chip_6012.png').default}
  width="30%"
  alt="Example banner"
/></div>



CSK6是聆思科技新一代的AI芯片SoC产品系列，采用多核异构架构，集成了ARM Star MCU，HiFi4 DSP，以及聆思全新设计的AI神经网络处理内核NPU，算力达到128GOPS。多核异构的设计使芯片能以较低功耗有效支持音频及图像视频的AI应用需求。

本系列芯片集成了1M Byte的SRAM并支持PSRAM和Flash的扩展，提供4入2出的Audio Codec，VGA像素的DVP摄像头接口，多达6路触控检测，以及SPI、UART、USB、SDIO、I2C、I2S等各类接口，丰富接口支持各类应用方案的开发。




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

- 大容量内容资源
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
    - USB、UART、SDIO、I2C、I2S、SPI等外设接口
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
| DVP | 1 | 格式支持：YUV422, YUV420, Raw Data <br/> 图像尺寸(Raw Data)： 640x480/120fps , 1280x720/60fps |
| UART| 4 | 支持硬件流控(CTS/RTS) <br/> 支持红外 |
| SPI | 2 | 支持3线SPI <br/> 支持主/从模式 |
| I2C | 2 | 支持标准/快速/快速+模式 <br/> 支持主/从模式 |
| I2S | 3 | 输入支持TDM扩展 |
| DMIC | 4 | 数字MIC输入 |
| USB | 1 |USB 1.1 full speed <br/> 支持1K字节同步传输、64字节的Bulk和中断传输 |
| SDIO | 1 | 兼容SD控制器3.0标准规范 <br/> 支持UHS50/UHS104 SD卡 <br/> 支持4位/8位模式|
| PWM | 8 | 支持4路LEDC输出 |
| Touch Pad | 6 | 触摸按钮检测 |
| SAR ADC | 4 | 分辨率:12bit <br/> 采样速率:最大1MHz |


## 芯片资料下载

| 标题 | 版本 | 发布日期 | 操作 |
| ---- | ---- | ---- | ---- |
| CSK60XX技术规格书 | - | - | 敬请期待 |
| CSK60XX用户使用手册 | - | - | 敬请期待 |


:::note
若您需要了解芯片相关的信息，请访问[聆思官网](https://listenai.com/) 或联系聆思商务获取。
:::