# 常见问题

## 开发板使用

### 使用 Type-C 线连接启用 DFU 功能的开发板后，无法识别为有效设备

【可能原因】：部分 Type-C 线仅支持供电，而不支持数据传输

【解决方法】：更换为确保具备数据传输功能的 TypeC 线。


---

## 工具安装

### 安装 CSK6 一键安装包后执行 lisa 相关命令无内容输出

【可能原因】：安装完成后，环境变量对已打开的应用不会生效

【解决方法】：重新启动你正在使用的终端程序（例如 powershell, cmd 等等）。


---

## 固件开发

### 使用32M Flash 的 Nano 板烧录程序后无法运行

【可能原因】：32M Flash 的 Nano 板Flash Reset有缺陷，无法通过 CSK 的硬件 Reset 脚复位 Flash，所以烧录完成后烧录器发出的硬件 Reset 指令无效。


【解决方法】：使用32M Flash 的 Nano 板烧录程序后需要断电复位。

---

## 固件烧录

### 使用Jlink烧录固件后，固件无法正常运行，后续固件烧录概率性失败

【可能原因】：使用在线模组WIFI功能情况下，外部供电电流不足可能导致模组运转和Jlink运行异常。

【解决方法】


* 检查是否使用了Jlink的VCC输出对板子供电，若是，请使用USB供电；


* 若使用USB供电问题未解决，请使用非扩展坞的USB接口进行供电。


---

## PyOCD使用

### 运行 pyocd 命令缓慢，存在卡顿

【解决方法】：目前只在同时打开串口（也就是 DAPLink 虚拟出来的串口）与运行其他 pyocd 命令（下载/调试）时发现，建议先关闭串口。

### 提示权限不足/缺乏 USB 驱动

【解决方法】：参照 [PyOCD安装指引](https://pyocd.io/docs/installing.html) 解决，一般来说，windows 用户需要安装 libUSB, Linux 用户需要增加 udev 规则。

### Linux系统如何安装 udev 规则

【解决方法】：按照 [PyOCD udev ReadMe](https://github.com/pyocd/pyOCD/blob/main/udev/README.md) 进行安装，需要注意的是，淘宝买的 Daplink 一般使用山寨 MCU，因此 pyOCD 源码目录的规则不能直接使用，要增加一项 udev 规则，把实际的 daplink USB PID, VID 填入(可使用 lsu 命令查看)规则中才能生效。

### 参照上述指引依旧安装 udev 规则失败

【解决方法】：可尝试以下指令：

```shell
sudo /lib/systemd/systemd-udevd --daemon
sudo udevadm control --reload
sudo udevadm trigger
```
