# PC工具调试

视觉开发套件支持PC端查看摄像头预览图和识别结果，方便进行算法调试和问题排查。

#### 开启调试模式

1. 开启PC调试模式，开启调试模式后，设备会将Sensor的图像压缩传至PC端预览，同时输出算法识别结果。

2. 在"app_algo_hsd_sample_for_csk6"项目的根目录下找到 的 `prj.conf` 文件，中开启 `CONFIG_WEBUSB_ENABLE=y` 再进行编译、烧录

   

#### 工具获取

https://cloud.listenai.com/zephyr/applications/csk_view_finder_spd

#### 打开工具

运行工具目录下 csk_view_finder_spd\src\ 的 index.html 文件

#### 安装驱动

如果您的系统为Windows，请点击“Windows系统，使用必读”按钮，按照步骤安装驱动；安装驱动过程，需将usb接口连接电脑；

#### 使用工具查看

完成驱动安装后，拔掉所有usb接口，先插入供电接口，再插入数据接口

点击选择设备，点击“CSK View Finder”，点击“连接”，即可看到预览图和识别结果

#### 使用工具记录

点击“开始记录”按钮，工具则开始记录预览图和识别结果

点击“停止记录”按钮，工具则会打包压缩预览图和识别结果