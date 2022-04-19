# 命令使用

## 创建项目

```bash
lisa mpy create
```

执行该命令后将会开始提示你进行一些初始化的配置。

在终端中的提示通常更为简练，避免增加使用者的理解成本。本章会详细介绍部分的配置对应含义。

### 文件系统大小

文件系统用于存放 Python 代码，及其需要引用的依赖、资源等文件，默认使用 512KB。

如果你对自己所需的大小心中有数，你可以在这一步指定你想要的大小，单位为 KB。如果你暂时不能确定，也可以先保留默认值，等过后再来决定最终的大小。

当你的 py 目录内容最终确认后，你可以执行以下命令来得到一个文件系统所需的最小值。

```bash
lisa mpy fs:calc
```

一个只有 `hello world` 代码的 py 目录在执行后的输出形如

```bash
> lisa mpy fs:calc
✔ 所需大小至少为 4096 bytes，在设备树文件（.overlay）中可对应替换为 0x1000
```

需要注意的是，当你的程序中需要对文件系统进行“写”的操作时，你需要考虑为可能的操作预留一定的空间，这样有助于确保程序的安全性。

### 项目名

创建的项目将使用项目名来创建，编译脚本中也会将其作为对应的目标值。

**WARNING**: 强烈建议 **不要使用** 中文字符，否则在执行编译过程中可能会遇到编码不兼容的错误。

## 编译

```bash
lisa mpy build [opts] <args>
```

本质上来讲 MicroPython 应用也仍是一个标准的 Zephyr 项目，可以参考 lisa plugin zephyr 中的 [编译，烧录](../Lisa Plugin Zephyr/app_build_flash#lisa-zephyr-app-build-flash) 章节查看关于编译的更多详细参数的使用。

## 烧录

```bash
lisa mpy flash [opts] <args>
```

有别于在 lisa plugin zephyr 中的烧录环节，在这一步骤中，默认情况下执行此命令会先将基础固件烧录到设备中，再将 Python 脚本目录打包并烧录到文件系统分区。

如果你只想执行烧录文件系统的操作，可以执行

```bash
lisa mpy flash --fs
```

又或者你只想执行烧录固件的操作，则执行

```bash
lisa mpy flash --firmware
```

## 连接设备

插件通过 mpremote 工具来对设备进行连接，它的交互本质是串口通讯。

执行以下命令在 PC 上列出可用的 MicroPython 串口设备：

```bash
lisa mpy connect list
```

选择对应的设备进行连接，下面是该命令的输出可能的结果

Windows

```bash
> lisa mpy connect list
COM3 AQ00RHXYA 0403:6001 FTDI None
COM4 0700000000140022470000144E503054A5A5A5A597969908 0d28:0204 Microsoft None
```

Unix

```bash
> lisa mpy connect list
/dev/cu.BLTH None 0000:0000 None None
/dev/cu.Bluetooth-Incoming-Port None 0000:0000 None None
/dev/cu.usbmodem14331302 0700000000140022470000144e503054a5a5a5a597969908 0d28:0204 ARM DAPLink CMSIS-DAP
```

复制对应的串口地址，执行连接命令即可进入交互式终端，以 `COM3` 为例，则执行

```bash
lisa mpy connect COM3
```

运行后终端中将出现

```bash
Connected to MicroPython at COM3
Use Ctrl-] to exit this shell

>>>
```

在此处可用的操作基本与在 PC 机上直接运行 `python` 命令时一致。

## 运行代码

教程式的介绍可以参考 [运行代码](../../MicroPython 应用开发/run#mpy-run-code) 的描述，下文主要讲解关于命令的使用和参数含义。

对于运行代码这一操作，从形式上来区分可以分为下列几种

### 单行命令运行代码

通常有两种形式，单行执行表达式语句

```bash
lisa mpy exec "print('hello world')"
```

为了帮助理解，你可以类比到 `python`，等同于 `python -c "print('hello world')"`。

运行一个 PC 机上的 .py 文件。

```bash
lisa mpy run ./main.py
```

等同于 `python ./main.py`。

### 终端中运行代码

执行下述命令可进入交互式终端（ [MicroPython 的 REPL](https://listenai.github.io/MicroPythonDocCN/reference/repl.html) ）

```bash
# 标准使用
lisa mpy connect <address>
# 最简化
lisa mpy
```

进入终端后，运行代码与 PC 上使用 `python` 命令类似。

### 在存储中运行代码

这一个方式的逻辑在于，当 MicroPython 固件启动的时候，会在文件系统中检测是否存在名为 main.py 的代码文件，有则开始执行。因此，在文件系统中存储并更新代码文件后，重启设备也能使其运行相应的代码。

要更新文件到文件系统中，可以通过烧录的方式（参考 烧录），也可以通过 `cp` 命令来操作。

```bash
lisa mpy cp main.py :
```

若要复制整个目录，则可执行

```bash
lisa mpy cp -r . :
```

## 文件系统操作

在设备上执行文件系统命令

```bash
$ lisa mpy <command>
```

`<command>` 可以是：


* `cat <file..>` 显示设备上一个或多个文件的内容


* `ls` 列出当前目录


* `ls <dirs...>` 列出给定的目录


* `cp [-r] <src...> <dest>` 复制文件；使用 “:” 作为前缀来指定设备上的文件


* `rm <src...>` 删除设备上的文件


* `mkdir <dirs...>` 在设备上创建目录


* `rmdir <dirs...>` 删除设备上的目录

## 编译为 .mpy 文件

在 MicroPython 的定义中，.mpy 文件是一种包含预编译代码的二进制容器文件格式。参见 [MicroPython .mpy 文件](https://listenai.github.io/MicroPythonDocCN/reference/mpyfiles.html) 。

以 CSK6 为例，要编译出可用于设备上的 .mpy 文件，执行

```bash
lisa mpy cross -march=armv7emsp main.py
```

将编译出的 `.mpy` 文件复制到文件系统后，你就可以通过 `import main` 的方式来调用该文件中的代码，使用方式与调用 `.py` 文件别无二致。

这里的 `-march=armv7emsp` 代码设备的平台，要查看具体使用什么参数进行编译可在设备上执行以下代码段。

```python
import sys
sys_mpy = sys.implementation.mpy
arch = [None, 'x86', 'x64',
    'armv6', 'armv6m', 'armv7m', 'armv7em', 'armv7emsp', 'armv7emdp',
    'xtensa', 'xtensawin'][sys_mpy >> 10]
print('mpy version:', sys_mpy & 0xff)
print('mpy flags:', end='')
if arch:
    print(' -march=' + arch, end='')
if not sys_mpy & 0x200:
    print(' -mno-unicode', end='')
print()
```

该代码段来自 [MicroPython .mpy 文件](https://listenai.github.io/MicroPythonDocCN/reference/mpyfiles.html) 的文档。

## 软重启设备

前文已经提及，当你进入/退出交互式终端时，固件会自动软重启一次，但有时候也许你期望一个更简单的操作。那么你可以执行

```bash
lisa mpy reset
```
