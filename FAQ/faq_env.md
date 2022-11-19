# 环境搭建常见问题

---

### 安装 CSK6一键安装包 时提示 “已保护你的电脑”

**现象描述**

在Windows系统上运行 CSK6一键安装包 时，提示 “Windows已保护你的电脑”，如图：
<div  align="left"><img
  src={require('./images/env_smartscreen.jpg').default}
  width="70%"
  alt="Example banner"
/></div>

**可能原因**

系统开启了SmartScreen，对部分安装程序产生告警。

**解决方法**

点击 “更多信息”，选择**仍要运行**。

---

### 安装 CSK6一键安装包 后执行 lisa 相关命令无内容输出

**可能原因**

安装完成后，环境变量对已打开的应用不会生效。

**解决方法**

重新启动你正在使用的终端程序（例如 powershell, cmd 等等）。

---

### 安装 CSK6一键安装包 时被360软件阻止

**可能原因**

部分杀毒软件对安装操作处理策略较为敏感。

**解决方法**

您可考虑暂时关闭该安全软件，或根据以下指引为安装目标添加白名单。

360安全卫士白名单添加
- 1.在主界面中打开设置；
- 2.在设置中点击"安全防护中心"->"开发者模式"，勾选"将编译程序及编译输出...提高开发效率。"，并添加计划安装CSK6一键安装包的路径。

360杀毒白名单添加
- 1.在主界面中打开设置；
- 2.在设置中点击"文件白名单"，取消勾选"定期扫描白名单中...的文件"选项；
- 3.点击"新增路径"，并选择计划安装CSK6一键安装包的路径，点击确定。

---

### lisa info zep 命令报错 “无法加载文件”

**现象描述**

* windows平台下安装csk6开发环境后，在powershell运行 Lisa info zep 查询环境安装是否成功时出现 `lisa:无法加载文件 D:\LSITENAI\LISA\lisa\bin\lisa.ps1,因此在系统上禁止运行脚本。xxxxxx`。
* 由于PowerShell执行.ps1文件导致。

**解决方法**

powershell运行一下指令：  
```c
set-executionpolicy -Scope CurrentUser remotesigned
```
---
### lisa zep 命令报错 “Unable to …”

**现象描述**

windows平台下出现 `Unable to create process using xxx`

**解决方法**

执行以下命令进行修复
```bash
lisa zep doctor
```

若问题依旧无法解决，请执行以下命令检查环境是否缺失
```bash
lisa info zep
```

---
### Linux系统下无法识别到CSK USB设备

**现象描述**

Linux平台下，连接开发板后无法识别到CSK USB设备(如：CSK View Finder)

**可能原因**

需要先为USB设备添加udev规则

**解决方法一**

1.在 **/etc/udev/rules.d** 目录下创建一个名为 ``99-listenai.rules`` 的文件，在文件中添加以下内容并保存：

```bash
KERNEL=="ttyACM[0-9]*",MODE="0666"
KERNEL=="ttyUSB[0-9]*",MODE="0666"
SUBSYSTEM=="usb", ENV{DEVTYPE}=="usb_device", ATTR{idVendor}=="0d28", ATTR{idProduct}=="0204", MODE="0666"
SUBSYSTEM=="usb", ENV{DEVTYPE}=="usb_device", ATTR{idVendor}=="0483", ATTR{idProduct}=="7918", MODE="0666"
SUBSYSTEM=="usb", ENV{DEVTYPE}=="usb_device", ATTR{idVendor}=="77a1", ATTR{idProduct}=="7919", MODE="0666"
SUBSYSTEM=="usb", ENV{DEVTYPE}=="usb_device", ATTR{idVendor}=="2fe3", ATTR{idProduct}=="000a", MODE="0666"
```

2.执行一次以下指令：

```bash
sudo udevadm control --reload-rules && sudo udevadm trigger
```
**解决方法二**

通过一键脚本实现udev规则添加，执行以下命令：

```bash
wget -qO- https://cdn.iflyos.cn/public/cskTools/udev/install.sh | sudo bash
```

若需卸载上述添加的udev规则，可执行以下命令：

```bash
wget -qO- https://cdn.iflyos.cn/public/cskTools/udev/uninstall.sh | sudo bash
```