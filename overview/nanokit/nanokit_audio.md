# 语音功能板 v1

## 简介
语音功能板(NanoKit_audio_v1)是为方便开发者基于CSK6开发**语音类应用**而设计的一款开发板功能扩展板，您可以使用它与NanoKit开发板一起配合搭建成支持语音交互功能的硬件，开发如智能音箱、语音交互机器人等有趣的应用。

<div  align="center"><img
  src={require('./images/nanokit_audio_1.png').default}
  width="80%"
  alt="Example banner"
/></div>

语音功能板(NanoKit_audio_v1)具备以下主要特性：

- 最高支持4路模拟麦输入与2路数字麦输入
- 支持外部回采输入
- 可直接与NanoKit开发板进行对插使用
- 支持通过引脚扩展板与NanoKit开发板进行桥接使用

## 板载资源介绍

<div  align="center"><img
  src={require('./images/audio_board.png').default}
  width="100%"
  alt="Example banner"
/></div>

**NanoKit_audio_v1 板载资源如下**

| 编号 | 硬件资源 | 说明 |
| ----- | -------- | ------ |
| 1 | MIC0/1接口 | AudioADC 0/1通道，默认接两路模拟MIC。 |
| 2 | 喇叭接口 | 用于外接扬声器进行音频输出。|
| 3 | 外接回采接口 | 需要接入外部回采时，可通过此接口座接入，需将模式开关切至[EXT_AEC]，使用AudioADC3通道。|
| 4 | MIC2/3接口 | AudioADC 2/3通道，进行4MIC功能开发时可使用，需将模式开关切至[MIC2]与[MIC3]。|
| 5 | AudioADC 2通道模式开关 | 默认=[SPK_AEC]时，此通道用于功放硬回采，需外接MIC至此通道时，需拨至[MIC2]。 |
| 6 | AudioADC 3通道模式开关 | =[EXT_AEC]，可作为外部回采输入；需外接MIC至此通道时，需拨至[MIC3]。|
| 7 | ADC按键组 | 预留用于需要按键输入的应用开发，使用**GPIOB_5**引脚，按压不同按键，ADC读取到的电压(对应阻值)不同。|
| 8 | 数字MIC座| 预留用于数字MIC调试，使用 **GPIOB_7**(dmic01_dat)与 **GPIOB_8**(dmic01_clk)引脚。|


## 语音功能板的使用

### 模式的切换

通过对语音功能板上两个AudioADC通道模式开关的切换，可以满足以下语音开发场景

| 场景 | SPK_AEC/MIC2 | EXT_AEC/MIC3 | 说明 |
| -------- | ---- | ---- | ---- |
| 单/双模拟MIC+自带回采 | SPK_AEC | 均可 | 两路MIC使用0/1通路，回采使用2通路 |
| 单/双模拟MIC+外接回采 | 均可 | EXT_AEC | 两路MIC使用0/1通路，回采使用3通路，接EXT_AEC座 |
| 三模拟MIC+自带回采 | SPK_AEC | MIC3 | 三路MIC使用0/1/3通道 |
| 四模拟MIC+无/软回采 | MIC2 | MIC3 | 四路MIC使用0~3通道，无硬件回采 |
| 单/双数字MIC | SPK_AEC | EXT_AEC | 使用数字麦(DMIC0/1)，两路回采均可使用 |

:::note
由于CSK6011芯片没有AudioADC 2/3通道引脚，因此当使用CSK6011的NanoKit开发板时，仅能使用语音功能板进行【单/双模拟MIC+无硬件回采】和【单/双数字MIC+无硬件回采】的开发。
:::

### 与NanoKit开发板的连接

#### 方式一：直接与NanoKit开发板对插

<div  align="center"><img
  src={require('./images/use_audio_1.png').default}
  width="90%"
  alt="Example banner"
/></div>

:::note
语音功能板SPK座与NanoKit开发板的USB口位于同一侧。

拔插功能板时，请尽可能进行垂直方向的缓慢操作，比避免损坏NanoKit开发板排针引脚。
:::


#### 方式二：通过引脚扩展底板与NanoKit进行桥接

在有引脚扩展底板的情况下，可将语音功能板插入已安装了NanoKit开发板的引脚扩展底板上。

## 资料下载

| 文件 | 操作 |
| -------------- | -------------|
| NanoKit_aduio_v1 硬件原理图 | 敬请期待 |
