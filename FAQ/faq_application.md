# 应用开发常见问题
---
### 系统常用接口查询
CSK6 SDK 系统接口的.h文件在`csk-sdk\zephyr\include\zephyr`目录下。            
例如:     
系统重启接口在`csk-sdk\zephyr\include\zephyr\sys\reboot.h` 文件中可以找到：

```c
extern FUNC_NORETURN void sys_reboot(int type);
```

系统延迟的接口在`csk-sdk\zephyr\include\zephyr\kernel.h`文件中可以找到：    
```c
static inline int32_t k_msleep(int32_t ms)
{
	return k_sleep(Z_TIMEOUT_MS(ms));
}
```
CSK6 SDK 第三方库接口的.h文件通常在modules目录下。    
例如:     
LVGL 接口.h文件在modules的`csk-sdk\modules\lib\gui\lvgl\lvgl.h`路径下。

littlefs 文件系统接口.h文件在modules的`csk-sdk\modules\fs\littlefs\lfs.h`路径下。

---
### 视觉sample修改PC端图像预览分辨率的方法
- 头肩追踪和手势识别`app_algo_hsd_sample_for_csk6`示例在`webusb_render.c`文件中修改；   
- 人脸识别`app_algo_fd_sample_for_csk6`示例则在`main.c`中修改。   

修改的参数为：  
```c
#define WEBUSB_IMAGE_DOWNSAMPLING (2)
#define WEBUSB_IMAGE_SCALE (1.0f / WEBUSB_IMAGE_DOWNSAMPLING)
```
其中：   
`WEBUSB_IMAGE_DOWNSAMPLING`为压缩的倍数，目前仅支持设置为2的倍数(2、4、6、8)。   
`WEBUSB_IMAGE_SCALE`表示PC预览图像压缩率，该值为1时代表不压缩，也就是传输原始图像。   


### 一键拉取 sample 和 SDK 异常解决方法
当遇到拉取的 SDK 和 sample 编译后烧录到开发板上出现黑屏的情况，或者可通过以下命令尝试重新初始化 SDK 环境：

```c
lisa zep init-app 
lisa zep update
```
更多关于`lisa zep update`介绍请查看 Lisa 内置命令：[lisa zep update](https://docs.listenai.com/chips/600X/tool/lisa_plugin_zephyr/command_detail)




### RTC的精度可以达到多少

**回答**

rtc用于芯片内部时钟模块，一般用于计时/日历/闹钟功能，输出计时最小单元是秒。目前RTC可选时钟源有3个：内部RCO，外部24M，外部32768晶体，使用不同时钟源存在各自的误差，使用时需提前知晓。目前SDK中使用的是外部24M。

不同时钟源情况下的精度说明
- 1）内部RC0：internal RC的精度是比较低的，他的初始值在26KHz附近，随着芯片的不同，它的范围在24KHz -- 28KHz，也就是有正负5%的初始值的误差，我们是可以通过一个校正的寄存器把这个初始的频率矫正到32K附近（芯片出厂不做校验）。
internal RC的高低温特性在-40度到85度的范围，变化在正负3%
- 2）外部24M：外部24M只能分配至32000Hz，但RTC内部是计算1秒的时间，是按照32768这个数字来计算的，所以这个导致了会有(32768-32000)/32000 * 100% 这样的一个误差
-3）外部32768晶体：误差只考虑外部晶体自身的误差

