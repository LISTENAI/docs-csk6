# 简介

## CSK6开发套件

CSK6开发套件是聆思科技针对自研AI芯片 —— CSK6系列推出的开发板与配件组合方案，通过开发套件，您可以根据需求选用对应的芯片模组、开发板与功能配件，快速便捷地组合出完整的产品原型。搭配丰富的固件例程与完善的文档，您可以基于CSK6芯片快速玩转AI应用。

开发套件具备以下特性：
- 上手简单，硬件开箱即用，文档与例程配套完善
- 硬件资源丰富，满足开发过程中的各类功能验证、调试需求
- 高度灵活，搭配功能扩展板可衍生丰富玩法，构建完整的语音、视觉开发套件


![image](./images/nanokit_overview-_1.png)

## 硬件组成

开发套件按功能划分为**NanoKit开发板**与**功能扩展模块**。

### NanoKit开发板

NanoKit开发板是套件中的开发板主体，板载CSK6核心模组以及上手开发常用的硬件外设(如LED、按键、调试器等)，并将可用引脚全部引出至排针，方便用户快速进行应用开发与验证，CSK6核心模组集成了CSK6系芯片及其外围最小电路的单元，支持直接用于量产。

<div  align="center"><img
  src={require('./images/nanokit_board.png').default}
  width="100%"
  alt="Example banner"
/></div>


当前套件方案中的NanoKit开发板(含模组)型号有：

| 型号 | 特性 |
| -------- | ------ |
| [CSK6011-NanoKit](./csk6011_nanokit) | 板载CSK6011芯片模组(外置16M Flash)，具备网络扩展插槽 |
| [CSK6012-NanoKit](./csk6012_nanokit) | 板载CSK6012芯片模组(外置16M Flash)，具备网络扩展插槽 |
| [csk6002-9s-nano](./nanokit_csk6002_9s_nano) | 早期发布的开发板，板载CSK6002+XR819S模组，CSK6002内置8MB Flash |
| [csk6011a-9s-nano](./nanokit_csk6011a_9s_nano) | 早期发布的开发板，板载CSK6011A+XR819S模组，模组集成16MB Flash |

### 功能扩展模块

为方便开发者使用NanoKit套件快速搭建出最接近产品形态的硬件原型，套件提供了一系列支持即插即用的功能扩展模块，配合固件例程可以快速搭建出丰富且完整的应用。

<div  align="center"><img
  src={require('./images/nanokit_fun_board.png').default}
  width="100%"
  alt="Example banner"
/></div>

当前套件中支持的功能扩展板有：

| 型号 | 特性 |
| -------- | ------ |
| [语音功能模块](./nanokit_audio.md) | 集成麦克风、喇叭电路，方便进行语音业务的开发 |
| [视觉功能模块](./nanokit_vision.md) | 集成DVP、SPI摄像头电路，方便进行CV类业务的开发 |
| [引脚扩展板](./nanokit_extend.md) | 提供三组排针扩展，方便硬件调试与接入其他扩展板 |

:::tip
为了方便开发者更便捷地开发**语音类**与**视觉类**应用，我们通过套件成员的组成提供了[语音开发套件](./kit/audio_kit)与[视觉开发套件](./kit/vision_kit)两款方案套件，有兴趣的小伙伴可点击对应文档链接进行了解。


:::