# SDK Sample 说明

本章节对 CSK6S 视觉 SDK 示例 app_algo_hsd_sample_for_csk6 进行说明，让开发者能够更快速了解示例的实现逻辑。

## 概述

该 Sample 展示了对 SDK 接口的基本调用，实现了获取 Sensor 图像并将算法处理后的结果传输到 PC 端实时预览。

## 获取 Sample

执行以下命令拉取 [Sample 项目](https://cloud.listenai.com/zephyr/applications/app_algo_hsd_sample_for_csk6) 到本地，注意代码仓在本地存放的路径不能有中文名称，否则容易引起错误；

```bash
lisa zep create --from-git https://cloud.listenai.com/zephyr/applications/app_algo_hsd_sample_for_csk6.git
```

## sample 目录结构

```c
app_algo_hsd_sample_for_csk6
├─.sdk   //视觉SDK
├─boards //设备树板型文件
├─mock   //图片信息，用于无摄像头时的运行测试
├─remote
│  ├─boards
│  └─src
├─resource //资源文件
└─src    //sample 代码
```

## 组件配置

项目基础组件配置配置,在 `prj.conf` 文件:

```shell title="prf.conf"
CONFIG_PRINTK=y
CONFIG_DEBUG=y
CONFIG_LOG=y
# CONFIG_LOG_MODE_IMMEDIATE=y
CONFIG_LOG_DETECT_MISSED_STRDUP=n
CONFIG_LOG_BACKEND_SHOW_COLOR=y
CONFIG_LOG_BACKEND_FORMAT_TIMESTAMP=y
CONFIG_LOG_BACKEND_UART=y
CONFIG_LOG_BACKEND_UART_OUTPUT_TEXT=y
CONFIG_LOG_BUFFER_SIZE=4096
CONFIG_MAIN_STACK_SIZE=8192

#system heap size,users can define it according to the actual usage
CONFIG_HEAP_MEM_POOL_SIZE=90000
CONFIG_CSK_HEAP=y
CONFIG_CSK_HEAP_MEM_POOL_SIZE=342736

#avf
CONFIG_AVF=y
# CONFIG_AVF_DSP_XIP=y
# CONFIG_AVF_DSP_RUN_ADDRESS=0x60000000
CONFIG_AVF_DEBUG_LEVEL=1
CONFIG_AVF_USE_BINARY_ARRAY=y
# CONFIG_AVF_DSP_FIRMWARE_LOAD_DEBUG=y

# dvp
CONFIG_GPIO=y
CONFIG_I2C=y
CONFIG_VIDEO=y
CONFIG_VIDEO_CSK6_DVP=y
CONFIG_GC032A_DRIVER=y

CONFIG_VIDEO_BUFFER_POOL_SZ_MAX=921800
CONFIG_VIDEO_BUFFER_POOL_NUM_MAX=3
CONFIG_VIDEO_CUSTOM_SECTION=y
CONFIG_VIDEO_CUSTOM_SECTION_NAME=".psram_section"

#licak
CONFIG_LICAK=y
CONFIG_LICAK_MODULES_ALG_HSD_DBG=y
CONFIG_LICAK_MODULES_ALG_HSD=y
CONFIG_LICAK_DISABLE_MULTI_HEAP_INIT=y

#IPM and GPIO for avf driver
CONFIG_IPM=y

#cache
CONFIG_CACHE_MANAGEMENT=y

# CONFIG_AVF_DSP_FIRMWARE_LOAD_DEBUG=y

# nothing here
CONFIG_WEBUSB=y
CONFIG_WEBUSB_LOG_LEVEL_DBG=y
CONFIG_STDOUT_CONSOLE=y
CONFIG_USB_DEVICE_STACK=y
CONFIG_USB_DEVICE_BOS=y
CONFIG_SERIAL=y
CONFIG_UART_INTERRUPT_DRIVEN=y
CONFIG_UART_LINE_CTRL=y

CONFIG_LOG=y
CONFIG_THREAD_NAME=y
CONFIG_ASSERT=y
# CONFIG_LOG_PRINTK=y
CONFIG_USB_DRIVER_LOG_LEVEL_ERR=y
CONFIG_USB_DEVICE_LOG_LEVEL_ERR=y
CONFIG_CONSOLE=y

CONFIG_FPU=y
CONFIG_NEWLIB_LIBC=y
CONFIG_NEWLIB_LIBC_NANO=n

CONFIG_CAMERA_MONITOR=n
CONFIG_SPEED_OPTIMIZATIONS=y

CONFIG_GC032A_FPS_20=y
```

:::tip
在使用 PC 端图像预览工具前，需要将 USB 数据传输配置 `CONFIG_WEBUSB=y` 设置为 y，重新编译并烧录固件。

:::

## 设备树配置

设备树配置文件`csk6011a_nano.overlay`，在`/boards`目录下：

```c title="boards/csk6011a_nano.overlay"
/delete-node/ &psram_ap;
/delete-node/ &psram_cp;
/delete-node/ &psram_share;

/ {
	chosen {
		/*
		 * shared memory reserved for the inter-processor communication
		 */
		zephyr,ipc_shm = &psram_share;
		zephyr,ipc = &mailbox0;
	};

};
/* psram配置*/
&psram0 {
	psram_cp: psram_cp@30000000 {
		compatible = "listenai,csk6-psram-partition";
		reg = <0x30000000 0x4e0000>;
		status = "okay";
	};
  psram_ap: psram_ap@304e0000 {
    compatible = "zephyr,memory-region","listenai,csk6-psram-partition";
    reg = <0x304e0000 0x300000>;
    status = "okay";
    zephyr,memory-region = "PSRAMAP";
  };
  psram_share: psram_share@307e0000 {
    compatible = "listenai,csk6-psram-partition";
    reg = <0x307e0000 0x20000>;
    status = "okay";
  };
};


/* GPIO配置 */
&csk6011a_nano_pinctrl{
                /* uart pin脚配置 */
                pinctrl_uart1_tx_default: uart1_tx_default{
                    pinctrls = <UART1_TXD_GPIOA_10>;
                };
                /* i2c pin脚配置 */
                pinctrl_i2c0_scl_default: i2c0_scl_default{
                        pinctrls = <I2C0_SCL_GPIOB_04>;
                };

                pinctrl_i2c0_sda_default: i2c0_sda_default{
                        pinctrls = <I2C0_SDA_GPIOB_03>;
                };
                /* dvp pin脚配置 */
                pinctrl_dvp_clkout_default: dvp_clkout_default{
                    pinctrls = <CLKP_OUT_GPIOA_07>;
                };

               // ...
};

/* gc032a摄像头i2c配置 */
&i2c0 {
        status = "okay";
        pinctrl-0 = <&pinctrl_i2c0_scl_default &pinctrl_i2c0_sda_default>;
        pinctrl-names = "default";

        gc032a: gc032a@21 {
            compatible = "galaxyc,gc032a";
            status = "okay";
            label = "GC032A";
            reg = <0x21>;
            reset-gpios = <&gpioa 6 0>;
            /* 关联gc30a2和dvp */
            port {
                gc032a_ep_out: endpoint {
                    remote-endpoint = <&dvp_ep_in>;
                };
			};
		};

};
/* 串口配置 */
&uart0 {
        current-speed = <921600>;
};

/* 摄像头dvp配置 */
&dvp {
    status = "okay";
    sensor-label = "GC032A";
    clock-prescaler = <6>;
    data-align-type = "high_align";
    pclk-polarity = "post_edge_sampling";
    hsync-polarity = "active_high";
    vsync-polarity = "active_low";

    pinctrl-0 = <
                &pinctrl_dvp_clkout_default
                &pinctrl_dvp_vsync_default
                &pinctrl_dvp_hsync_default
                &pinctrl_dvp_pclk_default
                &pinctrl_dvp_d4_default
                &pinctrl_dvp_d5_default
                &pinctrl_dvp_d6_default
                &pinctrl_dvp_d7_default
                &pinctrl_dvp_d8_default
                &pinctrl_dvp_d9_default
                &pinctrl_dvp_d10_default
                &pinctrl_dvp_d11_default
                >;
    pinctrl-names = "default";

  /* 关联gc30a2和dvp */
	port {
		dvp_ep_in: endpoint {
			remote-endpoint = <&gc032a_ep_out>;
		};
	};

};

```

## 软件实现流程图

![](./_images/flowchart.png)

## 代码实现

```c
// ...

/* 获取识别结果 */
void on_receive_hsd_result(hsd_t *hsd, hsd_event event, void *data,
    void *user_data) {
  /* 头肩识别结果 */
  if (event == HSD_EVENT_HEAD_SHOULDER) {
    hsd_head_shoulder_detect *result = (hsd_head_shoulder_detect *)data;
    LOG_INF("head shoulder cnt: %d", result->track_count);

    // ...

  /* 手势识别结果 */
  } else if (event == HSD_EVENT_GESTURE_RECOGNIZE) {
    head_shoulder_detect *result = (head_shoulder_detect *)data;
    LOG_INF("gesture result id: %d ,state: %d", result->id, result->gesture_state);
  }
}

// ...

void main(void) {

  //  ...

  /* 系统初始化 */
  if (0 != licak_init()) {
    printk("LICAK init failed,exit.\n");
    return;
  }

  video = device_get_binding(VIDEO_DEV);

  if (video == NULL) {
    LOG_ERR(
        "Video device %s not found, "
        "fallback to software generator.",
        VIDEO_DEV);

    return;
  }

  /* video 初始化 */
  struct video_format fmt;
  fmt.pixelformat = VIDEO_PIX_FMT_VYUY;
  fmt.width = IMAGE_WIDTH;
  fmt.height = IMAGE_HEIGHT;
  fmt.pitch = fmt.width * 2;
  if (video_set_format(video, VIDEO_EP_OUT, &fmt)) {
    LOG_ERR("Unable to set video format");
    return;
  }

  /* 创建算法引擎实例 */
  hsd_t *hsd = hsd_create(HSD_FLAG_HEAD_SHOULDER | HSD_FLAG_GESTURE_RECOGNIZE);

  if (hsd == NULL) {
    LOG_ERR("Create HSD instance failed.");
    return;
  }

  /* 注册算法结果回调 */
  hsd_event_register(hsd, HSD_EVENT_HEAD_SHOULDER, on_receive_hsd_result, NULL);
  hsd_event_register(hsd, HSD_EVENT_GESTURE_RECOGNIZE, on_receive_hsd_result,
      NULL);

  // ...

  /* 配置算法参数 */
  int ret = hsd_set_params(hsd, HSD_PARAM_HEAD_SHOULDER_DETECT_THRES, 0.6f);
  ret = hsd_set_params(hsd, HSD_PARAM_HEAD_SHOULDER_DETECT_LOSS_CNT, 5);
  ret = hsd_set_params(hsd, HSD_PARAM_HEAD_SHOULDER_DETECT_PIXESIZE, 40);
  ret = hsd_set_params(hsd, HSD_PARAM_HEAD_SHOULDER_DETECT_TIMEOUT, 10);

  /* 启动识别 */
  hsd_start(hsd, video);
  // ...
}

```

## 摄像头配置

Sample 中所使用的摄像头为 `GC032A` ，驱动实现位于 `gc032a/zephyr` 目录中。

该摄像头的帧率最高支持到 30fps ，但默认值我们调整为 20fps ，这样的做法有助于每一帧的画面可以获取更多的进光量，从而提升算法处理的识别成功率。

对于这款摄像头来说，15fps 的时候，进光量是最大的，因此我们提供了 15fps/20fps/30fps 三档配置，你可以根据你的需求，酌情选择适合你的配置。

```shell title="prf.conf"
# 默认配置，20fps
CONFIG_GC032A_FPS_20=y
# 15fps
CONFIG_GC032A_FPS_15=y
# 30fps
CONFIG_GC032A_FPS_30=y
```

## 算法参数及配置说明

### 算法开放配置的参数

当前视觉 SDK，针对头肩检测与手势识别，算法层面支持以下参数参数的配置：

| 参数                                      | type    | 功能说明                     | 取值范围 |
| ----------------------------------------- | ------- | ---------------------------- | -------- |
| `HSD_PARAM_HEAD_SHOULDER_DETECT_THRES`    | `float` | **头肩检测阈值**             | (0, 1)   |
| `HSD_PARAM_HEAD_SHOULDER_DETECT_LOSS_CNT` | `int`   | **头肩跟踪允许丢失的次数。** | (1, 10)  |
| `HSD_PARAM_HEAD_SHOULDER_DETECT_PIXESIZE` | `int`   | **像素值大小。**             | (1, 480) |
| `HSD_PARAM_HEAD_SHOULDER_DETECT_TIMEOUT`  | `int`   | **头肩检测超时时间。**       | (1, 100) |

### 参数说明

#### `HSD_PARAM_HEAD_SHOULDER_DETECT_PIXESIZE`

**参数说明:**  
像素值大小，头肩检测框 w，h 要大于该像素值才返回头肩框。

**调优方向：**  
像素值越小，检测距离越远。

#### `HSD_PARAM_HEAD_SHOULDER_DETECT_THRES`

**参数说明：**  
头肩检测阈值，大于该阈值认为是有效头肩框并输出头肩框结果。

**调优方向：**  
由于算法鲁棒性问题，阈值太低可能产生较多虚警。

#### `HSD_PARAM_HEAD_SHOULDER_DETECT_LOSS_CNT`

**参数说明：**  
头肩跟踪允许丢失的次数，主要是指允许容忍检测算法无法连续检测到目标的次数，如果超过允许连续检测丢失的次数，则会删掉跟踪目标。

**调优方向：**  
由于有时头肩检测不一定检测成功，需要通过改参数容忍丢失的次数，下次触发检测时候保证跟踪帧连续。

#### `HSD_PARAM_HEAD_SHOULDER_DETECT_TIMEOUT`

**参数说明：**  
头肩检测超时时间，是指的跟踪目标在遮挡情况下，允许消失的的最长时。如果在这个时间如果超时，无法再次识别。

**调优方向：**  
在快速移动或者遮挡物的环境下，可根据需要设置超时时间，其他场景下可用默认值或不设置。

## 参数配置参考

| 头肩跟随距离          | 参考参数                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------- |
| 头肩跟随有效范围 0~5m | HSD_PARAM_HEAD_SHOULDER_DETECT_THRES 0.35<br />HSD_PARAM_HEAD_SHOULDER_DETECT_PIXESIZE 15~30 |
| 头肩跟随有效范围 0~3m | HSD_PARAM_HEAD_SHOULDER_DETECT_THRES 0.35<br />HSD_PARAM_HEAD_SHOULDER_DETECT_PIXESIZE 40~60 |

:::tip
以上参数仅供参考，HSD_PARAM_HEAD_SHOULDER_DETECT_PIXESIZE 的值可根据 PC 端预览工具显示的头肩框的 w，h 来确定，HSD_PARAM_HEAD_SHOULDER_DETECT_THRES 则建议使用推荐值 0.35。
:::
