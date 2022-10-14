import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 开发指引

## 导读

开始接触本章节之前，需要先学习 CSK6 [快速开始](../../application/getting_start)，完成 CSK6 的环境搭建和熟悉基本开发方式，再进行本章节的操作。


## 硬件准备

1. 硬件准备

   6011A-Nanokit 开发板，视觉模组，引脚扩展板，USB-C 数据线 x 2

2. 硬件组装与连接

    按以下方式组装好开发套件，并同时接入两个USB口，如红灯和蓝灯亮起则表示连接正常；

<img
  width="60%"
  src={require('./_images/board_desc.jpg').default}
  /> 

## 项目概述

我们提供了视觉SDK与配套的头肩&手势识别Sample。这个Sample展示了对SDK接口的基本调用，实现了获取Sensor图像并将算法处理后的结果传输至PC上位机。

## 获取源码

### 获取 Sample

执行以下命令拉取 [Sample 项目](https://cloud.listenai.com/zephyr/applications/app_algo_hsd_sample_for_csk6) 到本地，注意代码仓在本地存放的路径不能有中文名称，否则容易引起错误；

```bash
git clone https://cloud.listenai.com/zephyr/applications/app_algo_hsd_sample_for_csk6.git
```

### 拉取项目 SDK

在 `app_algo_hsd_sample_for_csk6` 目录下，执行以下命令；

```bash
lisa zep init-app       # 拉取SDK
lisa zep update         # 初始化环境
```

<img
  width="70%"
  src={require('./_images/lisa_zep_update_succeed.png').default}
  />

## 修改配置

### 打开PC端图像预览功能
打开 项目的根目录下找到 的 `prj.conf` 文件，将 `CONFIG_WEBUSB_ENABLE=n` 改为`CONFIG_WEBUSB_ENABLE=y` 。



## 编译固件

```
lisa zep build -b csk6011a_nano
```

## 烧录应用程序

```
lisa zep flash
```

## 烧录资源

前面我们完成了应用程序烧录，接下来我们将算法运行所需的资源进行烧录，我们可以在`app_algo_hsd_sample_for_csk6/resource/res.overlay` 文件中看到这些资源所占用的分区。

| 资源           | 分区配置              |
| -------------- | --------------------- |
| 音视频框架资源 | `<0x400000 0x100000>` |
| 算法模型资源   | `<0x500000 0x1ee000>` |

我们提供了串口、JLink两种烧录方式，可根据情况选择合适的烧录方式。

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
lisa zep exec cskburn -s \\.\COMx -C 6 0x400000 .\resource\cp.bin -b 748800
lisa zep exec cskburn -s \\.\COMx -C 6 0x500000 .\resource\res.bin -b 748800
```

其中的 `COMx` 代表开发套件连接到 PC 上对应的串口号。例如：`COM3`

  </TabItem>

  <TabItem value="unix">

```bash
lisa zep exec cskburn -s PORT -C 6 0x400000 ./resource/cp.bin -b 748800
lisa zep exec cskburn -s PORT -C 6 0x500000 ./resource/res.bin -b 748800
```

其中的 `PORT` 代表开发套件连接到 PC 上对应的串口号。例如：`/dev/ttyACM0`

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
lisa zep -v flash --runner jlink --bin-file resource/cp.bin --flash-opt="--base-address=0x18400000"
lisa zep -v flash --runner jlink --bin-file resource/res.bin --flash-opt="--base-address=0x18500000"
```

:::info提示
使用此方式烧录时，仅连接 CSK6 USB 接口即可，不连接 DAPLink USB 接口，以避免板载调试芯片对SWD接口造成占用。
:::

## 查看结果

连接开发板的 DAPLink USB ，使用串口调试工具打开 COM 口（波特率为 921600 ），使用开发板上的 reset 按键进行复位后，即可看到以下日志输出。

```c
*** Booting Zephyr OS build 36309bca986d  ***
[00:00:03.185,000] <inf> hsd: Setup resource [head_shoulder] which in <0x18500031,0xa6ce0>
[00:00:03.187,000] <inf> hsd: Setup resource [gesture] which in <0x185a6d11,0x132448>
- Device name: DVPI
[00:00:03.315,000] <inf> hsd: fmt: [VYUY] width [640] height [480]
[00:00:03.316,000] <inf> hsd: Alloc video buffer: 614400
[00:00:03.317,000] <inf> hsd: Alloc video buffer: 614400
[00:00:03.318,000] <inf> hsd: Alloc video buffer: 614400
Heap at 0x305c9530 contains 42841 units in 16 buckets

  bucket#    min units        total      largest      largest
             threshold       chunks      (units)      (bytes)
  -----------------------------------------------------------
       15        32769            1        42831       342640

342640 free bytes, 0 allocated bytes, overhead = 96 bytes (0.0%)
[00:00:03.515,000] <inf> main: head shoulder cnt: 1
[00:00:03.516,000] <inf> main: gesture result id: 0 ,state: 0
[00:00:03.608,000] <inf> main: head shoulder cnt: 1
[00:00:03.609,000] <inf> main: gesture result id: 0 ,state: 0
[00:00:03.700,000] <inf> main: head shoulder cnt: 1
[00:00:03.701,000] <inf> main: gesture result id: 0 ,state: 0
[00:00:03.792,000] <inf> main: head shoulder cnt: 1
[00:00:03.793,000] <inf> main: gesture result id: 0 ,state: 0
[00:00:03.884,000] <inf> main: head shoulder cnt: 1
[00:00:03.885,000] <inf> main: gesture result id: 0 ,state: 0
[00:00:03.976,000] <inf> main: head shoulder cnt: 1
[00:00:03.976,000] <inf> main: gesture result id: 0 ,state: 0
[00:00:04.068,000] <inf> main: head shoulder cnt: 1
[00:00:04.069,000] <inf> main: gesture result id: 0 ,state: 0
[00:00:04.159,000] <inf> main: head shoulder cnt: 1
```
