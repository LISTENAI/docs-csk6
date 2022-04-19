# FAQ

## 开发板使用

**使用TypeC线连接启用DFU功能开发板后，无法识别为有效设备**

【解决方法】：部分TypeC线为供电线，请确认使用的TypeC线具备数据传输功能。


---

## 工具安装

**安装lisa&Zephyr plug安装包后执行lisa -v无内容输出**

【解决方法】：若使用powershell，需使用超级管理员运行。


---

## SDK获取

todo


---

## 固件开发

todo


---

## 固件烧录

**使用Jlink烧录固件后，固件无法正常运行，后续固件烧录概率性失败。**

【可能原因】：使用在线模组WIFI功能情况下，外部供电电流不足可能导致模组运转和Jlink运行异常。

【解决方法】


* 检查是否使用了Jlink的VCC输出对板子供电，若是，请使用USB供电；


* 若使用USB供电问题未解决，请使用非扩展坞的USB接口进行供电。


---

## PyOCD使用

**Win10 Powershell 无法正常或异常退出。**

【解决方法】：暂无解决办法， Windows 用户建议使用 cmd。

**运行 pyocd 命令缓慢，存在卡顿**

【解决方法】：目前只在同时打开串口（也就是 DAPLink 虚拟出来的串口）与运行其他 pyocd 命令（下载/调试）时发现，建议先关闭串口。

**提示权限不足/缺乏 USB 驱动**

【解决方法】：参照 [PyOCD安装指引](https://pyocd.io/docs/installing.html) 解决，一般来说，windows 用户需要安装 libUSB, Linux 用户需要增加 udev 规则。

**Linux系统如何安装 udev 规则**

【解决方法】：按照 [PyOCD udev ReadMe](https://github.com/pyocd/pyOCD/blob/main/udev/README) 进行安装，需要注意的是，淘宝买的 Daplink 一般使用山寨 MCU，因此 pyOCD 源码目录的规则不能直接使用，要增加一项 udev 规则，把实际的 daplink USB PID, VID 填入(可使用 lsu 命令查看)规则中才能生效。

**参照上述指引依旧安装 udev 规则失败**

【解决方法】：可尝试以下指令：

```shell
sudo /lib/systemd/systemd-udevd --daemon
sudo udevadm control --reload
sudo udevadm trigger
```
