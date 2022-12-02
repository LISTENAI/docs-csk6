import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 开发指引

## 导读

开始接触本章节之前，需要先学习CSK6 <a href="../../application/getting_start" target="_blank">[环境搭建]</a> ，完成 CSK6 的环境搭建和熟悉基本开发方式，再进行本章节的操作。


## 硬件准备

   本指引所用的硬件实验平台为 [视觉开发套件](/chips/600X/overview/nanokit/kit/vision_kit)(6011A-Nanokit 开发板，视觉功能模块，引脚扩展板，USB-C 数据线)
   > 套件购买链接：<a href="https://item.taobao.com/item.htm?spm=a230r.1.14.1.3ce31674ICib4M&id=687851402211&ns=1&abbucket=5#detailt" target="_blank">聆思CSK6视觉开发套件</a>

在本实验中，我们将使用到开发板上的**两个USB接口**，分别用于**连接PC预览工具输出预览图像**和**烧录固件、查看日志**。

实验中请使用两条USB数据线分别连接开发板的两个USB接口到电脑。

<img
  width="60%"
  src={require('./images/board_desc.jpg').default}
  /> 

如图，组装好开发套件后，使用USB数据线对开发板进行供电后，若电源LED D2(红)和DAPLink LED D4(蓝)亮起则表示套件可正常工作。

## 项目概述

我们提供了视觉SDK与配套的人脸识别Sample。该 Sample 展示了对SDK接口的基本调用，实现了获取Sensor图像并将图像数据输入算法进行人脸识别、人脸特征值比对，配合按键实现人脸注册、人脸特征值比对、清除本地人脸特征值等功能。

## 获取源码

### 获取并初始化Sample与SDK

执行以下命令后，将拉取 [Sample 项目](https://cloud.listenai.com/zephyr/applications/app_algo_fd_sample_for_csk6) 和SDK到本地并自动完成初始化，注意代码仓在本地存放的路径不能有中文名称，否则容易引起错误；

```bash
lisa zep create --from-git https://cloud.listenai.com/zephyr/applications/app_algo_fd_sample_for_csk6.git
```

<img
  width="90%"
  src={require('./images/lisa_zep_update_succeed.png').default}
  />

:::tip
当初次拉取 SDK 和 sample 后出现以下情况时，可尝试通过FAQ指引解决：   
1.拉取SDK操作中断   
2.编译烧录到开发板上出现预览图像黑屏   
 
FAQ指引：     
- <a href="../../FAQ/faq_application#一键拉取-sample-和-sdk-异常解决方法" target="_blank">一键拉取-sample-和-sdk-异常解决方法。</a>
:::

## 修改配置

### 打开PC端图像预览功能
打开 项目的根目录下找到 的 `prj.conf` 文件，将 `CONFIG_WEBUSB=n` 改为`CONFIG_WEBUSB=y` 。


## 编译固件

```
lisa zep build -b csk6011a_nano
```

> 当您需要重新编译所有链接(如更换版型)时，可选择Rebuild整个项目工程，可在上述编译命令> 中增加 -p 参数，即
>
> ` lisa zep build -b csk6011a_nano -p ` 
> 
> 更多编译参数的使用，详见 <a href="/chips/600X/tool/lisa_plugin_zephyr/build_flash_debug#原始编译" target="_blank">命令行工具-编译。</a>

## 烧录应用程序

```
lisa zep flash
```

## 烧录资源

前面我们完成了应用程序烧录，接下来我们将算法运行所需的资源进行烧录，我们可以在`app_algo_fd_sample_for_csk6/resource/res.overlay` 文件中看到这些资源所占用的分区。

| 资源           | 分区配置              |
| -------------- | --------------------- |
| DSP固件资源 | `<0x400000 0x100000>` |
| 算法模型资源   | `<0x500000 0x800000>` |

:::note

DSP固件资源是运行在csk6 DSP和NPU上的程序，包含视觉算法程序等；
算法模型资源是视觉算法运行所需要的模型资源文件。

:::

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
:::tip
1.当您在 Windows WSL2 环境下对csk6 进行固件烧录时无法找到设备且出现以下错误信息时：   
`waiting for a debug probe to be connect...`    
可尝试通过以下FAQ指引解决：  

- <a href="../../FAQ/faq_build_flash#wsl2环境下无法进行烧录" target="_blank">Windows WSL2环境下无法识别USB设备问题。</a>

2.当您遇到无法烧录且有以下提示时：    
`entering-update-mode...`    
`ERRO：Failed entering update mode `   
可尝试以下FAQ指引尝试解决：   

- <a href="../../FAQ/faq_build_flash#执行串口烧录时提示entering-update-mode-但无法正常完成烧录" target="_blank">执行串口烧录时提示entering-update-mode-但无法正常完成烧录。</a>
:::
  </TabItem>

  <TabItem value="unix">

```bash
lisa zep exec cskburn -s PORT -C 6 0x400000 ./resource/cp.bin -b 748800
lisa zep exec cskburn -s PORT -C 6 0x500000 ./resource/res.bin -b 748800
```

其中的 `PORT` 代表开发套件连接到 PC 上对应的串口号。例如：`/dev/ttyACM0`

:::tip
下常见问题及解决方法：    
1.当您在 Linux 系统环境下对 csk6 进行固件烧录时无法找到设备且出现以下错误信息时：   
`waiting for a debug probe to be connect...`    
可尝试通过以下FAQ指引解决：  

- <a href="../../FAQ/faq_env#linux系统下无法识别到csk-usb设备" target="_blank">Linux系统下无法识别到CSK USB设备解决方法。</a>    



2.当您遇到无法烧录且有以下提示时：    
`ERRO：Failed entering update mode `   
可尝试以下FAQ指引尝试解决：  


- <a href="../../FAQ/faq_build_flash#执行串口烧录时，提示entering-update-mode-但无法正常完成烧录" target="_blank">执行串口烧录时提示entering-update-mode-但无法正常完成烧录。</a>

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
lisa zep -v flash --runner jlink --bin-file resource/cp.bin --flash-opt="--base-address=0x18400000"
lisa zep -v flash --runner jlink --bin-file resource/res.bin --flash-opt="--base-address=0x18500000"
```

:::info提示
使用此方式烧录时，仅连接 CSK6 USB 接口即可，不连接 DAPLink USB 接口，以避免板载调试芯片对SWD接口造成占用。
:::

## 查看结果

连接开发板的 DAPLink USB ，使用串口调试工具打开 COM 口（波特率为 115200 ），使用开发板上的 reset 按键进行复位后，即可看到以下日志输出。

```c
*** Booting Zephyr OS build 959efbd0bd28  ***
[00:00:00.048,000] [<inf> main: - Device name: DVPI
 
[00:00:00.049,000] [<inf> main: Alloc video buffer: 614400 
[00:00:00.050,000] [<inf> main: Alloc video buffer: 614400 
[00:00:00.277,000] [<inf> fd: Setup resource [face_align] which in <0x185a6d40,0x1547984> type: 0 
[00:00:00.279,000] [ <inf> fd: Setup resource [face_detect] which in <0x18500060,0x683232> type: 1 
[00:00:00.280,000] [ <inf> fd: Setup resource [face_verify] which in <0x1881bfa0,0x3911360> type: 2 
[00:00:00.281,000] [ <inf> fd: Setup resource [anti_spoofing] which in <0x18720c20,0x1028976> type: 3
[00:00:50.749,000] [ <inf> main: not detected face feature [ 
[00:01:06.099,000] [ <inf> main: face feature save success [ 
[00:01:14.699,000] [ <inf> main: feature_compare score = 0.999192 [ 
[00:01:16.663,000] [ <inf> main: feature_compare score = 0.998432 [ 
```
