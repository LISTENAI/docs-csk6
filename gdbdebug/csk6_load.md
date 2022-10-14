# CSK6 烧录

## 概述
CSK6 Lisa 开发环境集成了烧录工具，开发者可通过指令完成烧录，烧录指令可以附带不同的选项和参数实现不同的操作，通过本章节学习，您将了解到：
- csk6 应用项目的编译产物
- csk6 的烧录方式

## CSK6的烧录方式
| 烧录方式 | 烧录方式说明                                                 | 接口引脚                             |
| -------- | ------------------------------------------------------------ | ------------------------------------ |
| SWD烧录  | 可使用JLink、DAPLink等仿真调试器进行烧录。                   | PA0(SWDCLK)、PA1(SWDIO)、RESETN、GND |
| 串口烧录 | 在PB01引脚外部拉低时对芯片进行上电，可使芯片进入串口烧录模式，此模式下可通过指定的UART接口写入固件。 | PB01(CBT_1)、PA15(RX)、PA18(TX)   |

## 编译产物
基于 csk6 sdk 创建的 app 项目生成编译产物的方式是在该 app 项目根目录下执行编译指令:

```bash
lisa zep build -b csk6002_9s_nano
```
编译产物为 `zephyr.bin`，默认生成路径：`app\build\zephyr\zephyr.bin`。

### 指定编译产物的输出路径
在执行编译命令时，带上 `--build-dir` 和 `path` 相对路径或绝对路径可指定编译产物生成的路径，如下示例：

```bash
lisa zep build -b csk6002_9s_nano --build-dir C:\Users\xxx\Desktop\build
```
该命令执行后，编译产物会存放到 `C:\Users\xxx\Desktop\build` 目录下。

:::tip
若不想每次都带上 `--build-dir` ，也支持更改默认编译产物输出路径：
lisa zep config build.dir-fmt "you_want_build_path"
:::

## 烧录指令的用法
```bash
lisa zep flash [opts] <args>
```
### 烧录指定编译产物
烧录指定编译产物时，可以通过带入编译产物所在的 build 文件夹路径来完成：
```bash
lisa zep flash --build-dir .\blinky\build
```

:::tip
`lisa zep flash` 暂不支持直接带入 `zephyr.bin` 文件的烧录方式，需要将 `zephyr.bin` 所在的 build目录 带入，当你需要对一个 `zephyr.bin` 进行烧录时，可将`zephyr.bin` 替换到任一项目的 build 目下，使用上述命令进行烧录。
:::

### 指定烧录工具
通过指定烧录工具如：jlink、pyocd、串口等工具来实现`zephyr.bin`编译产物的烧录。例如：
```bash
lisa zep flash --runner pyocd
```
当前烧录产物支持的 `runner`，以及默认设置烧录工具可以在 `app\build\zephyr\runners.yaml` 文件中找到，具体如下：
```bash
# Available runners configured by board.cmake.
runners:
- jlink
- pyocd
- csk

# Default flash runner if --runner is not given.
flash-runner: pyocd

# Default debug runner if --runner is not given.
debug-runner: pyocd
```

从 `runners.yaml` 配置文件中可以看到，CSK-6-NanoKit 开发板支持以下几种烧录方式:

- jlink

- pyocd

- csk(串口)

从配置文件可以看到，当不指定烧录工具时默认 pyocd 作为烧录工具。

## 烧录方式

### 指定 pyocd 烧录方式

![](./files/nano.png)

从上图系统框图可看到，CSK6-NanoKit 板载了 DAPLink 调试器芯片，DAPLink和CSK芯片模组通过SWD和串口两种方式连接，开发者可通过指定烧录工具(pyocd或csk)的方式来选择SWD或者是串口烧录，两者是二选一的关系，

**准备工作：**

将 DAPLink USB 接口连接至PC。


**烧录指令：**

```bash
lisa zep flash --runner pyocd
```

烧录过程日志：
![](./files/burn_pyocd.png)

:::tip
本烧录方式仅支持带 DAPLink 调试器芯片的开发板，若无 DAPLink 的硬件请选择其他烧录工具进行烧录。
:::

### 指定 J-Link 烧录方式

CSK6-NanoKit 开发板预留了 SWD 烧录接口，开发者可以通过 SWD 接口将 J-Link 仿真器和开发板连接。

**烧录指令：**

```bash
lisa zep flash --runner jlink
```
准备工作：
- `J-Link` 仿真器，并成功安装驱动，[J-Link 驱动下载](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/zephyr/%E5%B7%A5%E5%85%B7/JLink_Windows_V630d.exe)。

- 将 J-Link 仿真器和 CSK6-NanoKit 通过 SWD 接口连接，接线方式如下：

![](./files/connect.png)

烧录过程日志：
![](./files/burn_jlink.png)

:::info
该烧录方式需要PCBA预留 SWD 接口。

若您使用的是NanoKit开发板，请不要使用 DAPLink USB 接口对开发板进行供电，已避免板载调试芯片对SWD接口造成占用。
:::


### 指定 CSK 串口烧录方式

#### CSK6-NanoKit 串口烧录有两种方式：
- **通过板载`DAPLink`虚拟串口烧录**

通过上文`指定 pyocd 作为烧录工具`小节可知，`CSK6-NanoKit` 板载了 `DAPLink` 调试器芯片，`DAPLink` 默认接到了`CSK6`的烧录串口`PA15(RX)`、 `PA18(TX)`，开发者可通过指定参数的方式通过 `DAPLink` 对 `CSK6` 进行烧录，该方式仅需要将 `DAPLink` 的 USB 接口接 PC 端即可。

DAPLink 在电脑设备管理器中的虚拟串口为`USB串行设备(COMXX)`如下图所示：
![](./files/uart_burn.png)


:::tip

通过此方式进行串口烧录时，请确保该串口未被其他串口调试工具占用。

:::

- **外接串口烧录**

通过串口转接板接 CSK6 的`PA15(RX)`、`PA18(TX)`串口烧录，该方式需要让 `CSK6` 先进入烧录模式后才能开始烧录，CSK6 进入烧录模式的方法：拉低PB1引脚上电即可进入烧录模式。


**烧录指令：**
以烧录默认应用程序为例：

```
lisa zep exec cskburn -s \\.\COMxx -C 6 0x0 .\build\zephyr\zephyr.bin -b 748800
```
> 参数说明
- COMxx: 为被电脑所识别到的COM编号，如COM13
- 0x00：默认应用程序的烧录地址，后面跟待烧录固件的路径
- b 748800：使用748800的波特率

烧录过程日志：
![](./files/burn_uart.jpg)


