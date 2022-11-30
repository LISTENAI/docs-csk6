import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 开发指引

## 导读

开始接触本章节之前，需要先学习 CSK6 [环境搭建](../../application/getting_start)，完成 CSK6 的环境搭建和熟悉基本开发方式，再进行本章节的操作。


## 硬件准备

本指引所用的硬件实验平台为 [语音开发套件](/chips/600X/overview/nanokit/kit/audio_kit)(6012-Nanokit 开发板，语音功能模块，引脚扩展板，USB-C 数据线) 。

在本实验中，我们将使用到开发板上的 **DAPLink USB 接口**，用于**烧录固件、查看日志、shell 交互**。

## 项目概述

我们提供了 XTTS SDK 与配套的 XTTS Sample。这个 Sample 展示了对 SDK 接口的基本调用，实现了可通过 shell 传递文本调用语音合成并通过语音套件播放的能力。

## 获取源码

### 获取并初始化 Sample 与 SDK

执行以下命令拉取 [Sample 项目](https://cloud.listenai.com/zephyr/applications/app_algo_xtts_sample_for_csk6) 到本地，注意代码仓在本地存放的路径不能有中文名称，否则容易引起错误；

```bash
lisa zep create --from-git https://cloud.listenai.com/zephyr/applications/app_algo_xtts_sample_for_csk6.git
```
<img
  width="80%"
  src={require('../_images/lisa_zep_update_succeed.png').default}
  />

:::tip
常见拉取SDK异常问题及解决办法：

[一键拉取-sample-和-sdk-异常解决方法。](../../FAQ/faq_application.md#一键拉取-sample-和-sdk-异常解决方法)
:::

## 编译固件

```
lisa zep build -b csk6012_c3_nano
```

> 若需抛弃已有编译产物，进行全量编译(Rebuild)，可在上述编译命令中增加 ``-p`` 参数。
>
> 编译参数的使用，详见 [命令行工具-编译](/chips/600X/tool/lisa_plugin_zephyr/build_flash_debug#原始编译)

## 烧录应用程序

```
lisa zep flash --runner pyocd
```

## 烧录资源

前面我们完成了应用程序烧录，接下来我们将算法运行所需的资源进行烧录，我们可以在`app_xtts_sample_for_csk6/resource/res.overlay` 文件中看到这些资源所占用的分区。

| 资源           | 分区配置              |
| -------------- | --------------------- |
| XTTS 框架资源  | `<0x100000 0x200000>` |
| 算法模型资源   | `<0x300000 0x800000>` |

### 使用串口烧录

使用 USB 线接上 DAPLink USB 口进行烧录，依次执行以下命令，完成资源的烧录。

<div style={{
    border: 'solid 1px #80808080',
    padding: 12,
    borderRadius: 12
  }}>
<Tabs
    groupId="operating-systems"
    defaultValue="windows"
    values={[
        {label: 'Windows', value: 'windows'},
        {label: 'macOS / Linux', value: 'unix'}
    ]}
>
  <TabItem value="windows">

```bash
lisa zep exec cskburn -s \\.\COMx -C 6 0x100000 .\resource\cp.bin -b 748800
lisa zep exec cskburn -s \\.\COMx -C 6 0x300000 .\resource\res_xxx.bin -b 748800
```

其中的 `COMx` 代表开发套件连接到 PC 上对应的串口号。例如：`COM3`

`res_xxx.bin` 代表发音人资源文件名称，例如：`res_qianqian.bin`。详细可参考 [《发音人资源》](./speak_flavor_res.md) 说明。

:::tip
Windows 下常见异常及解决办法：

[1.Windows WSL2环境下无法识别USB设备问题](../../FAQ/faq_build_flash.md#wsl2环境下无法进行烧录)

[2.执行串口烧录时提示entering-update-mode-但无法正常完成烧录](../../FAQ/faq_build_flash.md#执行串口烧录时提示entering-update-mode-但无法正常完成烧录)

:::
  </TabItem>

  <TabItem value="unix">

```bash
lisa zep exec cskburn -s PORT -C 6 0x100000 ./resource/cp.bin -b 748800
lisa zep exec cskburn -s PORT -C 6 0x300000 ./resource/res_xxx.bin -b 748800
```

其中的 `PORT` 代表开发套件连接到 PC 上对应的串口号。例如：`/dev/ttyACM0`
    
`res_xxx.bin` 代表发音人资源文件名称，例如：`res_qianqian.bin`。详细可参考 [《发音人资源》](./speak_flavor_res.md) 说明。
    

:::tip
Linux系统下常见问题及解决方法：

[1.Linux系统下无法识别到CSK USB设备解决方法。](https://docs.listenai.com/chips/600X/FAQ/faq_env#linux%E7%B3%BB%E7%BB%9F%E4%B8%8B%E6%97%A0%E6%B3%95%E8%AF%86%E5%88%AB%E5%88%B0csk-usb%E8%AE%BE%E5%A4%87)

[2.执行串口烧录时提示entering-update-mode-但无法正常完成烧录](../../FAQ/faq_build_flash.md#执行串口烧录时提示entering-update-mode-但无法正常完成烧录)
:::

  </TabItem>

</Tabs>
</div>


### 使用 JLink 烧录

此烧录方式需要配套 JLink 设备进行使用，使用 USB 线接上 CSK6 USB 口进行供电，并参照以下接线方式连接 JLink :

<img
  width="60%"
  src={require('../../gdbdebug/files/connect.png').default}
  />

依次执行以下命令，完成资源的烧录。

```bash
lisa zep -v flash --runner jlink --bin-file resource/cp.bin --flash-opt="--base-address=0x18100000"
lisa zep -v flash --runner jlink --bin-file resource/res.bin --flash-opt="--base-address=0x18300000"
```

:::info提示
使用此方式烧录时，仅连接 CSK6 USB 接口即可，不连接 DAPLink USB 接口，以避免板载调试芯片对SWD接口造成占用。
:::

## 查看结果

连接开发板的 DAPLink USB ，使用串口调试工具打开 COM 口（波特率为 115200 ），使用开发板上的 reset 按键进行复位后，即可看到以下日志输出。

```shell
*** Booting Zephyr OS build 3e15ca75bd89  ***
[00:00:00.004,000] <inf> main: XTTS Sample started on [csk6012_c3_nano]


uart:~$ [00:00:00.110,000] <inf> transfer: devices UART_1 is ready

uart:~$
```

## 在 Shell 中使用

默认将 `uart0` 作为 shell 交互串口，故直接连接 DAPLink 口作为串口即可。

### 命令介绍

| 命令 | 说明 |
| --- | --- |
| `tts play <text>` | 播放合成文本 |
| `tts synth <text>` | 调用合成文本，只生成不播放，生成的音频数据在回调中返回，若有连接 uart2 串口则会通过串口协议发送到上位机 |
| `tts stop` | 停止播放。在调用 `tts play <text>` 后生效。 |

:::info提示
为了提供更好的TTS合成效果和用户可自行控制合成方式，我们提供了一套标记设置，通过这些标记可自由实现理想的合成音频，使用方式请参考[《简单文本标注用户手册》](./text_mark_guide.md)
:::

### 使用示例

```shell
uart:~$ tts play hello
TTS play 'hello' success!
uart:~$ tts play 'hello world'
TTS play 'hello world' success!
```

:::info 注意
上述命令的 `<text>` ，若合成文本为英文，可直接使用，例如 `tts play hello` ，表示播放「`hello`」；若合成文本为中文，需要先转换为十六进制再传，例如「你好」的十六进制表示为 `0xe4 0xbd 0xa0 0xe5 0xa5 0xbd` ，那么在命令中调用则为 `tts play '\xe4\xbd\xa0\xe5\xa5\xbd'` 。
:::
