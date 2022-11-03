# PC 查看工具

:::caution注意
目前该功能处于实验性阶段，工作可能并不稳定。
:::

视觉开发套件支持 PC 端查看摄像头预览图和识别结果，方便进行效果调试和问题排查。

## 使用准备

### 第一步：开启 PC 调试模式

开启 PC 调试模式后，设备会在输出算法识别结果的同时，将图像压缩传至 PC 端供用户预览。

在 `app_algo_hsd_sample_for_csk6` 项目的根目录下找到 `prj.conf` 文件，将其中的 `CONFIG_WEBUSB=n` 改为 `CONFIG_WEBUSB=y` ，再进行固件编译、烧录。如已开启，则跳到下一步；

```bash
lisa zep build -b csk6011a_nano
lisa zep flash
```

### 第二步：PC 工具获取

拉取 [PC 工具项目](https://cloud.listenai.com/zephyr/applications/csk_view_finder_spd) 到本地

```bash
git clone https://cloud.listenai.com/zephyr/applications/csk_view_finder_spd.git
```

### 第三步：打开工具

使用 Chrome 内核的浏览器，打开项目 `csk_view_finder_spd/src` 目录下的 `index.html` 文件；

### 第四步：安装驱动

- 如果你使用的是 Windows 系统，请点击网页上的【 Windows 系统，使用必读】按钮，按照步骤安装驱动；安装驱动过程，需将 CSK6 USB 接口连接电脑；
- 如果你使用的是 Mac/Linux 系统，请忽略本步骤。

## 开始使用

### 使用工具查看

1. 使用TypeC数据线连接 CSK6 USB 接口至电脑，若在PC端可看到如下图提示，说明设备已被识别成功

![](./_images/webusb_detected.png)

2. 点击“选择设备”按钮，选择“CSK View Finder”选项，点击“连接”，即可看到预览图和识别结果；

![](./_images/webusb_choose_device.png)

### 使用工具记录

点击“开始记录”按钮，工具则开始记录预览图和识别结果；

点击“停止记录”按钮，工具则会将刚才记录的图像和识别结果进行打包压缩；
