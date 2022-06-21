# CSK6烧录

## 概述
CSK6 lisa开发环境集成了烧录工具，开发者可通过指令完成烧录，烧录指令可以附带不同的选项和参数实现不同的操作，通过本章节学习，您将了解到：
- csk6应用项目的编译产物
- csk6的烧录方式

## 编译产物
基于csk6 sdk创建的app项目生成编译产物的方式是在该app项目根目录下执行编译指令:

```bash
lisa zep build -b csk6002_9s_nano
```
编译产物为`zephyr.bin`，默认生成路径：`app/build/zephyr/zephyr.bin`。

### 指定编译产物的输出路径
在执行编译命令时，带上 `--build-dir`和`path`相对路径或绝对路径可指定编译产物生成的路径，如下示例：

```bash
lisa zep build -b csk6002_9s_nano --build-dir C:\Users\xxx\Desktop\build
```
该命令执行后，编译产物会存放到 `C:\Users\xxx\Desktop\build`目录下。

:::tip
若不想每次都带上 `--build-dir` ，也支持更改默认编译产物输出路径：
lisa zep config build.dir-fmt "you_want_build_path"
:::

## 烧录指令的用法
```bash
lisa zep flash [opts] <args>
```
### 烧录指定编译产物
烧录指定编译产物时，可以通过带入编译产物所在的build文件夹路径来完成：
```bash
lisa zep flash --build-dir ./blinky/build
```

:::tip
lisa zep flash暂不支持直接带入`zephyr.bin`文件的烧录方式，需要将`zephyr.bin`所在的build目录带入，当您需要对一个`zephyr.bin`进行烧录时，可将`zephyr.bin`替换到任一项目的build目下，使用上述命令进行烧录。
:::

### 指定烧录工具
通过指定烧录工具如：jlink、pyocd、串口等工具来实现`zephyr.bin`编译产物的烧录。例如：
```bash
lisa zep flash --runner pyocd
```
当前烧录产物支持的 `runner`，以及默认设置烧录工具可以在 `app/build/zephyr/runners.yaml` 文件中找到,，具体如下：
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

从`runners.yaml`配置文件中可以看到，CSK-6-NanoKit开发板支持以下几种烧录方式:

- jlink

- pyocd

- csk(串口)

从配置文件可以看到，当不指定烧录工具时默认pyocd作为烧录工具。

#### 方式一：指定pyocd作为烧录工具
CSK6-NanoKit板载了DAPLink调试器芯片，开发者可通过DAPLink USB接口对CSK6芯片进行固件烧录。

**烧录指令：**

```bash
lisa zep flash --runner pyocd
```

烧录过程日志：
![](./files/burn_pyocd.png)

:::tip
该烧录方式仅支持带DAPLink调试器芯片的硬件板，若无板载DAPLink的硬件请选择其他烧录工具进行烧录。
:::

#### 方式二：指定jlink作为烧录工具
CSK6-NanoKit开发板预留了SWD烧录接口，开发者可以通过SWD接口将J-link仿真器和开发板连接。

**烧录指令：**

```bash
lisa zep flash --runner jlink
```
准备工作：
- `J-link`仿真器，并成功安装驱动，[J-link驱动下载](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/zephyr/%E5%B7%A5%E5%85%B7/JLink_Windows_V630d.exe)。

- 将J-link仿真器和CSK6-NanoKit通过SWD接口连接，接线方式如下：

![](./files/connect.png)

烧录过程日志：
![](./files/burn_jlink.png)

:::tip
该烧录方式需要硬件板子预留SWD接口。
:::

#### 方式三：指定csk(串口)作为烧录工具
CSK6-NanoKit板载了DAPLink调试器芯片，DAPLink虚拟了一个串口，开发者可通过指定的虚拟串口对csk6进行烧录。

**烧录指令：**

```
lisa zep flash --runner csk --port  \\.\COMXX
```

其中，COMXX为DAPLink在电脑设备管理器中的虚拟串口：
![](./files/uart_burn.png)

烧录过程日志：
![](./files/burn_uart.png)

:::tip
该烧录方式仅支持带DAPLink调试器芯片的硬件板，若无板载DAPLink的硬件请选择其他烧录工具进行烧录。
:::