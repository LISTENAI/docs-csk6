# 接口说明

以下说明来自 AI 能力基础 SDK `licak` （ _LISTENAI independent csk6-base ability kit_ ） 中的 `hsd` 模块。

要使这些接口实现加入编译，Kconfig 配置中至少需要选择

```c
CONFIG_LICAK=y
CONFIG_LICAK_MODULES_ALG_HSD=y
```

## 使用说明

目前推荐的使用方式，以伪代码表示可描述为

```c
licak_init();
hsd = hsd_create();
hsd_start(hsd, video_dev);
```

其中代表的含义为

1. 加载 DSP 固件；
2. 通知创建对应算法引擎实例；
3. 启动监听流程，开始向算法引擎传输图像数据。

对于一个完整的使用流程示例，请参考 [app_algo_hsd_sample_for_csk6](https://cloud.listenai.com/zephyr/applications/app_algo_hsd_sample_for_csk6) 项目。

## 结构定义

主要描述用户侧需要关心的结构体定义，未在此处列出的接口，则暂不需要过多关心。

### `hsd_t`

模块实例

```c
typedef struct {
	/* 运行状态 */
	hsd_status_t status;
	/* 特性标识 */
	int flag;
  // ... 其他内部属性无需关心
} hsd_t;
```

- 其中的 `flag` 属性将在下文的的 `hsd_create(flag)` 中详细介绍。
- `status` 包括以下几种状态。

	```c
	typedef enum {
		HSD_STATUS_UNKNOWN = 0, /* This status is unknown and exists only if the hsd is
															uninitialized or in some other abnormal */
		HSD_STATUS_IDLE, /* This status is idle */
		HSD_STATUS_RUNNING, /* This status is running */
	} hsd_status_t;
	```

### `hsd_head_shoulder_detect`

```c
typedef struct {
	/* 传输给算法识别的图像 buffer */
	void *data;
	/* 图像宽度 */
	uint32_t width;
	/* 图像高度 */
	uint32_t height;
	/* 图像颜色格式，具体定义在 video.h 中 */
	uint32_t pixel_format;
	/* 图像 buffer 的总长度 */
	uint32_t len;
	/* 算法结果识别到的头肩个数 */
	int track_count;
	/* 算法结果识别到的头肩数组，长度根据 track_count 而定 */
	head_shoulder_detect *result;
} hsd_head_shoulder_detect;
```

该结构体为 `hsd_event_register(hsd, HSD_EVENT_HEAD_SHOULDER, callback, NULL);` 时，回调中返回的 `data` 类型。

### `head_shoulder_detect`

头肩/手势检测结果。当模块初始化为只识别头肩时，成员中的 `gesture_state`, `gesture_scores` 与 `gesture_status` 则不具备有效值。

```c
/* 头肩检测结果 */
typedef struct {
	/* 头肩位置 */
	ifr_rect rect;
	/* 得分 */
	float score;
	float iou_score;
	int detect_loss_cnt;
	/* 头肩 id */
	int id;
	int loss_cnt_thres;
	int update;
	/* 引擎输出的手势状态，手势状态主要是选择手势得分最大的那个 */
	GESTURE_STAT gesture_state;
	/* 各手势得分，用户可以根据手势的得分情况选择手势状态 */
	float gesture_scores[GESTRUE_COUNT];
	/* 各个手势状态信息，1 代表该手势得分大于阈值，0 代表手势得分小于阈值 */
	int gesture_status[GESTRUE_COUNT];
} __packed head_shoulder_detect;
```

其中的 `ifr_rect rect` 代表头肩检测框的位置和大小。其定义为

```c
typedef struct {
	/* 横坐标 */
	int x;
	/* 纵坐标 */
	int y;
	/* 宽度 */
	int w;
	/* 高度 */
	int h;
} __packed ifr_rect;
```

#### 当使用手势识别时

通过 `hsd_event_register(hsd, HSD_EVENT_GESTURE_RECOGNIZE, callback, NULL);` 注册回调，则回调中的 `data` 为此类型。

这里的 `GESTURE_STAT` 指的是

```c
/* 手势 */
typedef enum {
	GESTURE_OTHER = 0,
	GESTURE_LIKE = 1,
	GESTURE_OK = 2,
	GESTURE_STOP = 3,
	GESTURE_YES = 4,
	GESTURE_SIX = 5,
	GESTRUE_COUNT,
	RESTURE_MAX = 0xFFFFFFFF,
} GESTURE_STAT;
```

| 枚举           | 含义 |
| -------------- | ---- |
| `GESTURE_LIKE` | 👍   |
| `GESTURE_OK`   | 👌   |
| `GESTURE_STOP` | 🤚   |
| `GESTURE_YES`  | ✌️   |
| `GESTURE_SIX`  | 🤙   |

## 函数定义

:::info 注意
下文中提及的 `video.h` 指的是 zephyr 中对应的 video 驱动
:::

### `hsd_create`

```c
/**
 * @brief 创建 HSD 实例
 *
 * @param flag 使能标识
 * @return hsd_t*
 */
extern hsd_t *hsd_create(HSD_FLAG flag);
```

创建 HSD 实例。若创建失败，则会返回 NULL ，并在日志打印错误原因。

目前可能出现的错误：

- CP 固件无法正常加载
- 算法资源无法正常加载

> HSD 实例本质为单例，若重复调用会返回 NULL 。

| 参数 | 类型  | 含义                                                                                                           |
| ---- | ----- | -------------------------------------------------------------------------------------------------------------- |
| flag | `int` | 启用的标识。若需同时启用多个标志，可使用 _位或_ 串起来传参（参见下例）。可用 flag 见下方 `HSD_FLAG` 枚举定义。 |

标识定义：

```c
typedef enum {
	HSD_FLAG_FACE_DETECT = 0x1, // 人脸检测
	HSD_FLAG_FACE_RECOGNIZE = 0x2, // 人脸识别
	HSD_FLAG_FACE_ALIGN = 0x4, // 人脸对齐
	HSD_FLAG_HEAD_SHOULDER = 0x8, // 头肩
	HSD_FLAG_GESTURE_RECOGNIZE = 0x10, // 手势识别
} HSD_FLAG;

#define HSD_FLAG_DEFAULT HSD_FLAG_HEAD_SHOULDER
```

示例：

```c
// 只使用头肩
hsd_t *hsd = hsd_create(HSD_FLAG_HEAD_SHOULDER);
hsd_t *hsd = hsd_create(HSD_FLAG_DEFAULT);  // HSD_FLAG_DEFAULT 表示只启用头肩

// 使用头肩加手势
hsd_t *hsd = hsd_create(HSD_FLAG_HEAD_SHOULDER | HSD_FLAG_GESTURE_RECOGNIZE);
```

### `hsd_start`

```c
/**
 * @brief 启动图像监听，持续发送给算法引擎
 *
 * @param hsd 实例
 * @param dev video 设备实例
 * @return int 执行结果，0 为成功，其他为失败
 */
extern int hsd_start(hsd_t *hsd, const struct device *dev);
```

启动对相机数据的监听，调用后启动线程不断将图像数据传输到算法进行处理。

| 参数 | 类型                   | 含义                               |
| ---- | ---------------------- | ---------------------------------- |
| hsd  | `hsd_t*`               | HSD 实例指针，从 `hsd_create` 创建 |
| dev  | `const struct device*` | video 设备                         |

### `hsd_stop`

```c
/**
 * @brief 结束图像监听
 *
 * @param hsd 实例
 * @return int 执行结果，0 为成功，其他为失败
 */
extern int hsd_stop(hsd_t *hsd);
```

结束 `hsd_start` 启动的监听。

| 参数 | 类型     | 含义                               |
| ---- | -------- | ---------------------------------- |
| hsd  | `hsd_t*` | HSD 实例指针，从 `hsd_create` 创建 |

### `hsd_destroy`

```c
/**
 * @brief 销毁实例
 *
 * @param hsd 实例指针
 * @return int
 */
extern int hsd_destroy(hsd_t *hsd);
```

销毁 `hsd_create` 创建的实例。执行后也将清理算法所创建的资源，移除所有事件及其事件回调。

| 参数 | 类型     | 含义                               |
| ---- | -------- | ---------------------------------- |
| hsd  | `hsd_t*` | HSD 实例指针，从 `hsd_create` 创建 |

### `hsd_event_register`

```c
/**
 * @brief 注册事件回调。事件类型与回调组合为标识，当已注册相同类型的同一回调，将返回错误
 *
 * @param hsd 实例指针
 * @param event 事件类型
 * @param msg_callback 回调函数
 * @param user_data 用户数据
 * @return int 返回 0 时代表已添加对应回调
 */
extern int hsd_event_register(hsd_t *hsd, hsd_event event, hsd_event_callback_t msg_callback,
			      void *user_data);
```

| 参数         | 类型                   | 含义                               |
| ------------ | ---------------------- | ---------------------------------- |
| hsd          | `hsd_t*`               | HSD 实例指针，从 `hsd_create` 创建 |
| event        | `hsd_event`            | 监听事件类型，定义见下方           |
| msg_callback | `hsd_event_callback_t` | 回调函数，定义见下方               |
| user_data    | `void*`                | 用户数据，配置后在回调时传入       |

事件类型：

```c
typedef enum {
	/**
	 * @brief 人脸识别
	 *
	 */
	HSD_EVENT_FACE_RECOGNIZE,
	/**
	 * @brief 人脸注册
	 *
	 */
	HSD_EVENT_FACE_REGISTER,
	/**
	 * @brief 头肩检测
	 *
	 */
	HSD_EVENT_HEAD_SHOULDER,
	/**
	 * @brief 手势识别
	 *
	 */
	HSD_EVENT_GESTURE_RECOGNIZE,
	/**
	 * @brief 运行状态变更
	 *
	 */
	HSD_EVENT_STATUS_CHANGED,
} hsd_event;
```

回调函数定义：

```c

/**
 * @brief 事件回调类型，不同事件对应不同返回。
 *
 * @param hsd 指针
 * @param event 事件类型
 * @param data 事件数据指针
 * @param user_data 用户数据
 */
typedef void (*hsd_event_callback_t)(hsd_t *hsd, hsd_event event, void *data, void *user_data);
```

根据 `event` 不同， `data` 指针指向的结构也不同：
- `event` 为 `HSD_EVENT_HEAD_SHOULDER` 时， `data` 为 `hsd_head_shoulder_detect` ；
- `event` 为 `HSD_EVENT_GESTURE_RECOGNIZE` 时， `data` 为 `head_shoulder_detect` ， `result` 中带 `gesture_state` 等相关参数；
- `event` 为 `HSD_EVENT_STATUS_CHANGED` 时， `data` 为 `hsd_status_data` ;
- 其他 `event` 暂不生效

### `hsd_event_unregister`

```c
/**
 * @brief 取消注册事件回调
 *
 * @param hsd 实例指针
 * @param event 事件类型
 * @param msg_callback 回调函数
 * @return int 返回 0 时代表找到对应回调，并移除成功
 */
extern int hsd_event_unregister(hsd_t *hsd, hsd_event event, hsd_event_callback_t msg_callback);
```

取消事件监听。

| 参数         | 类型                   | 含义                               |
| ------------ | ---------------------- | ---------------------------------- |
| hsd          | `hsd_t*`               | HSD 实例指针，从 `hsd_create` 创建 |
| event        | `hsd_event`            | 监听事件类型                       |
| msg_callback | `hsd_event_callback_t` | 回调函数                           |

### `hsd_set_params`

```c
/**
 * @brief 设置算法参数
 *
 * @param hsd 实例
 * @param param 参数类型，从 hsd_param 中选择
 * @param value 参数值
 * @return int 执行结果，0 为成功，其他为失败
 */
extern int hsd_set_params(hsd_t *hsd, hsd_param param, float value);
```

设置算法参数。不同参数有不同范围限制，若设置参数值不合法，则返回将返回非 0 值表示设置错误。

| 参数  | 类型        | 含义                               |
| ----- | ----------- | ---------------------------------- |
| hsd   | `hsd_t*`    | HSD 实例指针，从 `hsd_create` 创建 |
| param | `hsd_param` | 参数类型，定义与范围见下方定义     |
| value | `float`     | 参数值，取值应符合参数定义         |

参数类型：

```c
/* 参数类型 */
typedef enum {
	/**
	 * 头肩检测阈值，大于该阈值认为是有效头肩框。范围: (0, 1)
	 * 注意：由于算法鲁棒性问题，阈值太低肯能产生较多虚警
	 */
	HSD_PARAM_HEAD_SHOULDER_DETECT_THRES = 5001,
	/**
	 * 头肩跟踪允许丢失的次数。范围: [1, 10]
	 * 由于有时头肩检测不一定检测成功，需要通过改参数容忍丢失的次数，下次触发检测时候保证跟踪帧连续
	 */
	HSD_PARAM_HEAD_SHOULDER_DETECT_LOSS_CNT = 5002,
	/* 像素值大小。头肩检测框 w,h 要大于该像素值才返回头肩框。范围: [1, 480] */
	HSD_PARAM_HEAD_SHOULDER_DETECT_PIXESIZE = 5004,
	/* 头肩检测超时时间。范围: [1, 100] */
	HSD_PARAM_HEAD_SHOULDER_DETECT_TIMEOUT = 5011,
	HSD_PARAM_MAX = 0xFFFFFFFF,
} hsd_param;
```

### `hsd_get_params`

```c
/**
 * @brief 获取当前参数值
 *
 * @param hsd 实例
 * @param param 参数类型
 * @param value [out] 参数值
 * @return int 执行结果，0 为成功，其他为失败
 */
extern int hsd_get_params(hsd_t *hsd, hsd_param param, float *value);
```

获取参数值。

| 参数  | 类型        | 含义                               |
| ----- | ----------- | ---------------------------------- |
| hsd   | `hsd_t*`    | HSD 实例指针，从 `hsd_create` 创建 |
| param | `hsd_param` | 参数类型                           |
| value | `float*`    | 参数值指针                         |

示例：

```c
float value;
hsd_get_params(hsd, HSD_PARAM_HEAD_SHOULDER_DETECT_THRES, &value);
printk("HSD_PARAM_HEAD_SHOULDER_DETECT_THRES value: %f\n", value);
```

### `hsd_exec`

```c
/**
 * @brief 单次执行获取结果
 *
 * @param hsd 实例指针
 * @param buffer video_dequeue 出来的 buffer
 * @param fmt video 设备的 format 信息
 * @return int
 */
extern int hsd_exec(hsd_t *hsd, struct video_buffer *buffer, struct video_format fmt);
```

单次执行获取算法结果。算法结果从回调中返回。

| 参数   | 类型                    | 含义                                 |
| ------ | ----------------------- | ------------------------------------ |
| hsd    | `hsd_t*`                | HSD 实例指针，从 `hsd_create` 创建   |
| buffer | `struct video_buffer *` | 图像 buffer 。类型定义参考 `video.h` |
| fmt    | `struct video_format`   | 图像格式。类型定义参考 `video.h`     |
