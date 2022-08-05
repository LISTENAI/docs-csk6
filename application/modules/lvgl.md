# LVGL

本节将主要介绍csk6 sdk提供的LVGL系统组件的基础信息和能力，并通过示例展示如何基于LVGL进行GUI的开发，通过本章节我们将掌握：

- 理解LVGL的关键概念
- 在CSK6开发板上运行一个LVGL Sample 

:::tip

本章节介绍的LVGL组件版本为LVGL8，Sample 基于LVGL8实现。

:::

## LVGL简介
LVGL全称Light and Versatile Graphics Library，是一个开源的GUI库，具备资源消耗小、可移植度高的特点，因此很适合在嵌入式设备上使用。

作为一个图形库，LVGL也自带了丰富的GUI控件可以供开发者直接使用，如常用的按钮，图表，列表，滑块等，此外还支持多种图形动画的调用，相比传统驱屏绘制GUI，开发者不需要大量的代码编写量和反复的效果验证，就可以搭建出一个比较满意的GUI应用。


## LVGL关键概念

在开始LVGL的Sample实验前，让我们先简单了解以下LVGL一些比较重要的概念，方便对后续Sample验证的理解。

**Display：** 在LVGL中一个物理显示器对应一个显示器驱动，LVGL支持多个物理显示器。

**Screen：** 一个Display创建多个Screen，可以理解为页面，Screen上可以添加各种LVGL支持的组件。

**Object：** object是LVGL构建GUI的基本单位，每个Widgets都属于Object，上面的Screen(页面)也是一个Object。object使用父子树形结构，只允许有一个父节点，允许有多个子节点。screen做为根节点，允许没有父节点。

:::tip
更多的LVGL重要功能说明，可访问 [LVGL文档中心](https://docs.lvgl.io/7.11/overview/index.html) 进行了解。
:::

## 常用API接口

### lv_btn_create

```c
lv_obj_t * lv_btn_create(lv_obj_t * par, const lv_obj_t * copy)
```
**接口说明**

创建按钮对象。

**参数说明**

| 字段 | 说明                                                      |
| ---- | --------------------------------------------------------- |
| par  |                                                           |
| copy | 复制指向标签对象的指针，如果不为 NULL，则将从中复制新对象 |



### lv_obj_align

```c
void lv_obj_align(lv_obj_t * obj, const lv_obj_t * base, lv_align_t align, lv_coord_t x_ofs, lv_coord_t y_ofs)

```

**接口说明**

将一个对象与另一个对象对齐。

**参数说明**

| 字段  | 说明                                                         |
| ----- | ------------------------------------------------------------ |
| obj   | 指向要对齐的对象的指针                                       |
| base  | 指向对象的基指针（如果为 NULL，则使用父对象）。 'obj' 将与其对齐。 |
| align | 对齐类型（参见 'lv_align_t' 枚举）                           |
| x_ofs | 对齐后的坐标偏移量                                           |
| y_ofs | 对齐后的y坐标偏移量                                          |



### lv_btn_set_fit

```c
static inline void lv_btn_set_fit(lv_obj_t * btn, lv_fit_t fit)
```

**接口说明**

将一个对象与另一个对象对齐。

**参数说明**

| 字段 | 说明                       |
| ---- | -------------------------- |
| btn  | 指向按钮对象的指针         |
| fit  | 来自 `lv_fit_t` 的适配策略 |



```c
lv_obj_t * lv_label_create(lv_obj_t * par, const lv_obj_t * copy)
```

**接口说明**

创建标签对象。

**参数说明**

| 字段 | 说明                                                      |
| ---- | --------------------------------------------------------- |
| par  | 指向一个对象的指针，它将是新建标签的父对象                |
| copy | 复制指向标签对象的指针，如果不为 NULL，则将从中复制新对象 |

LVGL支持丰富的界面开发接口，这里不一一列举，更多接口请查阅csk6sdk中lv头文件：

`csk-sdk\modules\lib\gui\lvgl8\src\widgets\lv_label.h`。



## LVGL 使用示例

### 创建Sample

通过Lisa命令创建项目：
```
lisa zep create
```
依次按以下目录选择完成adc sample的创建：  
> boards → csk6 → subsys → display → lvgl8 → SimpleShow

### 组件配置

针对csk6002_9s_nano开发板的硬件配置：
``lvgl`` 工程目录下`boards/csk6002_9s_nano.conf`增加如下配置：   

```shell
# 启用KSCAN配置
CONFIG_KSCAN=y
CONFIG_LVGL_POINTER_KSCAN_SWAP_XY=y
CONFIG_LVGL_POINTER_KSCAN=y
CONFIG_LVGL_POINTER_KSCAN_DEV_NAME="BL6XXX"

CONFIG_DISPLAY=y
# 开发板使用的屏幕是 ST7789V
CONFIG_LVGL_DISPLAY_DEV_NAME="ST7789V"
# 开发板使用的屏幕宽
CONFIG_LVGL_HOR_RES_MAX=320
# 开发板使用的屏幕高
CONFIG_LVGL_VER_RES_MAX=170
# 屏幕的DPI值
CONFIG_LVGL_DPI=100
CONFIG_LV_COLOR_DEPTH_16=y
CONFIG_LV_COLOR_16_SWAP=y
```

``lvgl`` 工程通用配置文件 ``prj.conf`` ，在文件中增加以下配置选项：

```shell
CONFIG_HEAP_MEM_POOL_SIZE=16384
CONFIG_MAIN_STACK_SIZE=2048
# 显示配置
CONFIG_DISPLAY=y
CONFIG_DISPLAY_LOG_LEVEL_ERR=y
# 日志配置
CONFIG_LOG=y
CONFIG_LOG_STRDUP_BUF_COUNT=16

# LVGL8配置
CONFIG_LVGL8=y
CONFIG_LV_USE_LABEL=y
CONFIG_LV_USE_BTN=y

# 启用GPIO驱动(屏幕控制引脚使用)
CONFIG_GPIO=y
# 启用SPI驱动(屏幕使用SPI作为数据总线)
CONFIG_SPI=y
# 启用ST7789V display驱动
CONFIG_ST7789V=y
# 启用I2C配置
CONFIG_I2C=y
# 启用BL6XX KSCAN触摸设备驱动
CONFIG_KSCAN_BL6XXX=y
```
### 设备树配置

#### **LCD 显示屏SPI设备树配置：**

```c
&csk6002_9s_nano_pinctrl{
				/* SPI pin 脚配置 */
                pinctrl_spi0_sclk_default: spi0_sclk_default {
                        pinctrls = < &pinmuxa 15 6 >;
                };
                pinctrl_spi0_mosi_default: spi0_mosi_default {
                        pinctrls = < &pinmuxa 10 6 >;
                };
                pinctrl_spi0_miso_default: spi0_miso_default {
                        pinctrls = < &pinmuxa 17 6 >;
                };
                pinctrl_spi0_cs_default: spi0_cs_default {
                        pinctrls = < &pinmuxa 12 6 >;
                }; 
};
/* st7789v spi设备树配置 */
&spi0 {
        status = "okay";
        pinctrl-0 = <&pinctrl_spi0_sclk_default &pinctrl_spi0_mosi_default &pinctrl_spi0_miso_default &pinctrl_spi0_cs_default>; 
        pinctrl-names = "default";

        st7789v@0 {
                compatible = "sitronix,st7789v";
                label = "ST7789V";
                status = "okay";
                spi-max-frequency = <20000000>;
                reg = <0>;
                cmd-data-gpios = <&gpioa 14 1>;
                reset-gpios = <&gpiob 6 1>;
                width = <320>;
                height = <170>;
                x-offset = <0>;
                y-offset = <35>;
                // reg:0xBB
                vcom = <0x1e>;
                // reg:0xB7
                gctrl = <0x35>;
                // reg:0xC3
                vrhs = <0x0b>;
                // reg:0xC4
                vdvs = <0x20>;
                // reg:0x36
                mdac = <0xA3>;
                // reg:0x26
                gamma = <0x01>;
                // reg:0x3a
                colmod = <0x05>;
                // reg:0xc0
                lcm = <0x2c>;
                // reg:0xb2
                porch-param = [0c 0c 00 33 33];
                // reg:0xDF
                cmd2en-param = [5a 69 02 01];
                // reg:0xD0
                pwctrl1-param = [a4 a1];
                // reg:0xE0
                pvgam-param = [d0 06 0b 07 07 24 2e 32 46 37 13 13 2d 33];
                // reg:0xE1
                nvgam-param = [d0 02 06 09 08 05 29 44 42 38 14 14 2a 30];
                // reg:b0
                ram-param = [00 F0];
                // reg:b1
                rgb-param = [CD 08 14];
        };
};

```

#### **触摸屏I2C引脚配置**

```c

...				/* 触控屏i2c pin脚配置 */
                pinctrl_i2c0_scl_default: i2c0_scl_default{
                        pinctrls = <&pinmuxb 2 8>;
                };
                
                pinctrl_i2c0_sda_default: i2c0_sda_default{
                        pinctrls = <&pinmuxb 3 8>;
                };    
...

/* 触控屏i2c配置 */
&i2c0 {
        status = "okay";
        pinctrl-0 = <&pinctrl_i2c0_scl_default &pinctrl_i2c0_sda_default>; 
        pinctrl-names = "default";
        bl6xxx@0 {
                compatible = "betterlife,bl6xxx";
                reg = <0>;
                label = "BL6XXX";
                status = "okay";
                int-gpios = <&gpioa 3 0>;
                reset-gpios = <&gpioa 2 0>;
        };
};
```

### 应用逻辑实现

```c
#include <device.h>
#include <drivers/display.h>
#include <lvgl.h>
#include <stdio.h>
#include <string.h>
#include <zephyr.h>

#define LOG_LEVEL CONFIG_LOG_DEFAULT_LEVEL
#include <logging/log.h>
LOG_MODULE_REGISTER(app);

void main(void)
{
	uint32_t count = 0U;
	char count_str[11] = {0};
	const struct device *display_dev;
    /*创建btn label对象*/
	lv_obj_t *hello_world_label;
    /* 创建count label对象 */
	lv_obj_t *count_label;
	
    /* 进行设备的绑定，CONFIG_LVGL_DISPLAY_DEV_NAME已在prj.conf中定义为ST7789V */
	display_dev = device_get_binding(CONFIG_LVGL_DISPLAY_DEV_NAME);

	if (display_dev == NULL) {
		LOG_ERR("device not found.  Aborting test.");
		return;
	}

	if (IS_ENABLED(CONFIG_LVGL_POINTER_KSCAN)) {
		lv_obj_t *hello_world_button;

		hello_world_button = lv_btn_create(lv_scr_act(), NULL);
        /* 对这个lable做位置的排列，位置为页面正中间，后面两个参数为x/y坐标偏移量 */
		lv_obj_align(hello_world_button, NULL, LV_ALIGN_CENTER, 0, 0);
		lv_btn_set_fit(hello_world_button, LV_FIT_TIGHT);
        /* 将count_label作为一个lable，并将其父节点配置为默认的screen */
		hello_world_label = lv_label_create(hello_world_button, NULL);
	} else {
		hello_world_label = lv_label_create(lv_scr_act(), NULL);
	}
	
    /* 将创建的对象做为lable使用，设置text内容为"Hello world!" */
	lv_label_set_text(hello_world_label, "Hello world!");
	lv_obj_align(hello_world_label, NULL, LV_ALIGN_CENTER, 0, 0);

	count_label = lv_label_create(lv_scr_act(), NULL);
	/* 对这个lable做位置的排列，位置为底部的中间 */
    lv_obj_align(count_label, NULL, LV_ALIGN_IN_BOTTOM_MID, 0, 0);
	
    /* 执行任务handler，进行屏幕内容刷新 */
	lv_task_handler();
	display_blanking_off(display_dev);
	
   	/* 一个while循环中，每隔1秒做一次count_label的text的数值递增1 */
	while (1) {
		if ((count % 100) == 0U) {
			sprintf(count_str, "%d", count/100U);
			lv_label_set_text(count_label, count_str);
		}
        /* 需要定期执行lv_task_handler */
		lv_task_handler();
		k_sleep(K_MSEC(10));
		++count;
	}
}
```



### 编译和烧录

#### 编译

在当前工程目录中执行 以下指令进行编译：

```
lisa zep build -b csk6002_9s_nano
```

#### 烧录

编译完成后，执行以下指令进行固件烧录：

```
lisa zep flash --runner pyocd
```

#### 查看结果

烧录完成后，可观察到设备显示屏出现图像，中央有一个txt内容为"Hello world!"的button，下方为一个不断递增的计数值，如图：
![image](./images/lvgl_helloworld.png)


本章节Sample仅简单展示了LVGL的GUI功能，更多的控件、高级功能应用用户可以自行阅读LVGL库接口说明或前往 [LVGL官方文档](https://docs.lvgl.io/7.11/overview/index.html) 进行了解。

