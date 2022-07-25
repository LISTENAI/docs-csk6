# 自定义驱动添加

## 概述
在实际项目的应用场景中，开发者往往需要基于CSK6接入新的硬件外设，例如摄像头、显示屏、触摸屏等，需要添加自定义驱动。csk6 sdk支持开发者在app应用目录下增加自定义驱动，本章节以增加型号为 BF30A2 摄像头驱动为例，展示如何在app应用项目下完成自定义驱动的添加。

## 添加自定义驱动文件
在Zephyr应用程序目录下建立驱动目录drivers，并添加 BF30A2 显示屏驱动的.c文件，具体如下：
```
app
├── drivers
|    ├── video
|    |    ├── CMakeLists.txt
|    |    ├── Kconfig.bf30a2
|    |    └── bf30a2.c
|    ├── CMakeLists.txt
|    └── Kconfig.drivers
└── dts
    └──bindings
        └──video
            ├── vendor-prefixes.txt
            └── byd,bf30a2.yaml
```
- driver 目录下可以添加多个驱动文件目录，例如本示例中需要添加摄像头驱动，则新增 video 文件夹，添加显示屏驱动时可增加display文件夹。
- dts 目录存放自定义驱动的设备树绑定文件(byd,bf30a2.yaml)和厂商信息文件(vendor-prefixes.txt)。
- BF30A2示例驱动文件包下载[点击这里下载](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/zephyr/%E5%8A%9F%E8%83%BD%E6%96%87%E4%BB%B6/drivers.zip)。
### 修改自定义驱动的 CMake 文件
- 根据添加的自定义驱动修改 drivers/video 目录下的CMakeLists.txt文件，内容如下：
```c
# SPDX-License-Identifier: Apache-2.0
zephyr_library_sources_ifdef(CONFIG_VIDEO_BF30A2	bf30a2.c)
```
CONFIG_VIDEO_BF30A2 为自定添加驱动的配置名称，bf30a2.c为自定义驱动的.c文件。

- 在drivers根目录下的CMakeLists.txt文件，将自定义驱动文件夹添加到CMakeLists：
```c
add_subdirectory_ifdef(CONFIG_VIDEO_BF30A2 video)
```
### 修改自定义驱动的 Kconfig 文件
- 修改自定义驱动的Kconfig文件

Kconfig.nv3030b是摄像头驱动代码bf30a2.c中要使用的配置选项，具体可参考csk6sdk/driver目录下对应类型驱动的Kconfig文件来完成修改，以下是BF30A2的Kconfig内容：
```
# BF30A2 driver

# Copyright (c) 2022 listenai
# SPDX-License-Identifier: Apache-2.0

config VIDEO_BF30A2
	bool "1/15 inch QVGA CMOS Image Sensor BF30A2"
	help
	  Enable driver for BF30A2 CMOS digital image sensor device.

config VIDEO_BF30A2_RECEIVE_BUF_NUM
	int "Must be greater than or equal to 2"
	default 2
	help
	  Config the number of buffers that the bf30a2 driver receives raw data.

config VIDEO_BF30A2_RECEIVE_THREAD_PRIORITY
	int "the priority of thread"
	default -15
	help
	  Config the priority of thread.

config VIDEO_BF30A2_TIMER_TIMEOUT
	int "timeout of ms"
	default 5
	help
	  Config the timeout value for timer.

config VIDEO_BF30A2_INIT_PRIORITY
	int "Init priority"
	default 80
	help
	  BF30A2 driver initialization priority.
```

- 在drivers根目录下的Kconfig.drivers文件中引用自定义驱动的Kconfig:
```c
rsource "video/Kconfig.bf30a2"
```

### 修改自定义驱动的设备树绑定文件(.ymal)
为了硬件上的灵活性，Zephyr引入了设备树，通过设备树绑定的方式将设备树转换为C宏来使用。Zephyr的设备树绑定文件可能不包含我们要用的硬件设备，这就需要我们自己添加。同样设备树绑定文件也可以纳入app的目录进行管理，在app目录下添加dts目录，里面放置设备树绑定文件。
.yaml文件可参考`csk6sdk/dts/bindings/video/`目录下对应类型驱动的.ymal文件来完成修改，以下是`byd,bf30a2.yaml`文件内容：

```c
# Copyright (c) 2022, listenai
# SPDX-License-Identifier: Apache-2.0

description: 1/15 inch QVGA CMOS Image Sensor

compatible: "byd,bf30a2"

properties:
    pd-gpios:
      type: phandle-array
      required: false
      description: pd-gpios
    pwr-gpios:
      type: phandle-array
      required: false
      description: power-gpios
    product-id:
      type: int
      required: false
      description: product-id
    csk6-spec:
      type: boolean
      required: false
      description: csk6-spec
    label:
      type: string
      required: true
      description: label
    reg :
      type: array
      required: true
      description: reg
    spi:
      type: phandle
      required: false
      description: spi-bus
    pwms:
      type: phandle-array
      required: false
      description: pwm output to xclk
    xclk-freq:
      type: int
      required: false
      description: xclk-freq
    xclk-gpios:
      type: phandle-array
      required: false
      description: xclk-gpios


include: i2c-device.yaml
```
vendor-prefixes.txt为供应商前缀注册，具体内容如下：
```c
newvision    NEWVISION Microelectronics Co., Ltd.
```
## 应用项目配置
### CMake文件指定编译自定义驱动
在app项目根目录下的CMakeLists.txt文件中通过`add_subdirectory(drivers)`来指定使用自定义的驱动(drivers)：
```c
app
└── CMakeLists.txt
```
CMakeLists修改后的内容：
```c
# SPDX-License-Identifier: Apache-2.0

cmake_minimum_required(VERSION 3.20.0)

find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(hello_world)
target_sources(app PRIVATE src/main.c)

# 引用自定义驱动
add_subdirectory(drivers)

zephyr_code_relocate(drivers/video/bf30a2.c ITCM_TEXT)、

```
### 设备树配置
在应用根目录`/boards/csk6002_9s_nano.overlay`添加摄像头I2C和SPI引脚对应的设备树配置：
```c
&csk6002_9s_nano_pinctrl{
                /* bf30a2 I2C config */
                pinctrl_i2c1_scl_default: i2c1_scl_default{
                        pinctrls = <&pinmuxa 13 9>;
                };
                
                pinctrl_i2c1_sda_default: i2c1_sda_default{
                        pinctrls = <&pinmuxa 12 9>;
                };   

                /* bf30a2 SPI config */
                pinctrl_spi1_sclk_default: spi1_sclk_default {
                    pinctrls = < &pinmuxa 8 7 >;
                };

                pinctrl_spi1_mosi_default: spi1_mosi_default {
                    pinctrls = < &pinmuxa 7 7 >;
                };

                pinctrl_spi1_cs_default: spi1_cs_default {
                    pinctrls = < &pinmuxa 9 7 >;
                };

};

&spi1 {
        status = "okay";
        spi-max-frequency = <100000000>;
        pinctrl-0 = <&pinctrl_spi1_sclk_default &pinctrl_spi1_mosi_default &pinctrl_spi1_cs_default>; 
            pinctrl-names = "default";
};

&i2c1 {
        status = "okay";
        pinctrl-0 = <&pinctrl_i2c1_scl_default &pinctrl_i2c1_sda_default>; 
        pinctrl-names = "default";

        bf30a2: bf30a2@6e {
                compatible = "byd,bf30a2";
                status = "okay";
                label = "VIDEO";
                reg = <0x6e>;
                xclk-gpios = <&gpioa 11 0>;
                product-id = <0x3b02>;
                spi = <&spi1>;
        };
};
```
### 应用组件配置
在应用跟目录下`prj.conf`组件配置文件里增加video配置：
```c
# video
CONFIG_SPI=y
CONFIG_I2C=y
CONFIG_DMA=y
CONFIG_PWM=y
CONFIG_VIDEO=y
CONFIG_VIDEO_BF30A2=y
CONFIG_VIDEO_BUFFER_POOL_SZ_MAX=25600
CONFIG_SCHED_MULTIQ=y
```

### 应用代码中引用摄像头设备
上述配置完成了自定义驱动所需要的操作，开发者即可在应用代码中使用自定义驱动，使用的方式和sdk默认支持的设备驱动方式一样，这里不展开说明，以下是BF30A2使用示例:
```c
#define VIDEO_DEV DT_LABEL(DT_INST(0, byd_bf30a2))
const struct device *video = device_get_binding(VIDEO_DEV);

if (!device_is_ready(video)) {
		LISA_LOGE(TAG, "ipm device is null.\n");
		return;
	}

```

## 驱动扩展
本章节仅以BF30A2自定义驱动为例说明，开发者在实际项目开发过程中可能还会遇到显示屏、触摸屏等外设驱动的自定义开发，可参考本章节自定义驱动的说明，以及sdk默认驱动示例完成自定义驱动的添加。
sdk默认支持的显示屏驱动(sdk/driver/display)：
- display_ili9xxx(ili9340、ili9341、ili9488等)
- display_st7789v

sdk默认支持的触摸屏驱动(sdk/driver/kscan)：
- kscan_ft5336
- kscan_bl6xxx

sdk默认支持的摄像头屏驱动(sdk/driver/video)：
- ov9655