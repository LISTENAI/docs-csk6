# 接口说明

以下说明来自 AI 能力基础 SDK `licak` （ _`LISTENAI independent csk6-base ability kit`_ ） 中的 `fd` ( _`face detect`_ ) 模块。

要使这些接口实现加入编译，Kconfig 配置中至少需要选择

```c
CONFIG_LICAK=y
CONFIG_LICAK_MODULES_ALG_FD=y
```

## 使用说明

目前推荐的使用方式，以伪代码表示可描述为

```c
licak_init();
fd = fd_create(*cfg);
fd_set_params(fd, param, *value);
fd_exec(fd, *pic, *result)
fd_control(fd, FD_CMD_COMPARE_FEATURE, &data, &result);
```

其中代表的含义为

1. 加载 DSP 固件；
2. 创建对应算法引擎实例；
3. 设置算法参数；
4. 执行单次人脸检测；
5. 人脸特征值比对。

对于一个完整的使用流程示例，请参考 [app_algo_fd_sample_for_csk6](https://cloud.listenai.com/zephyr/applications/app_algo_fd_sample_for_csk6.git) 项目。

## 结构定义

主要描述用户侧需要关心的结构体定义，未在此处列出的接口，则暂不需要过多关心。

### `fd_t`
模块实例
```c
typedef struct {
    const struct device *dev; 
    void *user_data;
    struct k_sem _compelete_sem;
    struct k_mutex _inner_mutex;
    struct k_msgq exec_msg;
    struct k_msgq compare_feat_msg;
    struct k_thread _running_thread;
	k_tid_t _running_tid;
    avf_stream_platform_t *_platform;
} fd_t;
```

### `fd_face_recog_result_t`
```c
/* FD_EVENT_FACE_RECOGNIZE 事件返回的数据结构 */
typedef struct {
    uint8_t detect_cnt;    //检测到的人脸个数
    fd_face_recog_data_t *detect_data;  //人脸识别结果
} __packed fd_face_recog_result_t;
```
该结构体为人脸检测接口`fd_exec(fd, &pic_buf, &result);` 返回的 `result` 类型。


### `fd_face_recog_data_t`
人脸识别引擎结果
```c
/* 人脸识别引擎结果 */
typedef struct {
    fd_rect_t   detect_rect; /* 检测框 */
    float       detect_score; /* 检测框分数 */
    float       detect_iou_score; 
    float		anti_spoofing_score; /* 活体得分 */
    int			anti_spoofing_status; /* 活体通过 */
    fd_point_t  align_points[FD_MAX_ALIGIN_POINTS]; /* 标定点数组 */
    int			align_points_size; /* 标定点个数 */
    float       head_yaw; /* yaw角度 */
    float       head_pitch; /* pitch角度 */
    float       head_roll; /* roll角度 */
    int			head_pose_status;  /* 质量检测通过(头姿角度小于门限值)  */
    float		feature[FD_MAX_FEATURE_DIMS]; /* 人脸识别特征数组 */
    int			feature_dim; /* 人脸识别特征维度 */
} __packed fd_face_recog_data_t;
```

其中的 `fd_rect_t` 代表人脸检测框的位置和大小。其定义为：

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
} __packed fd_rect_t;
```

## 函数定义

### 概览

| 函数名                                           | 用途简介                 |
| ----------------------------------------------- | ------------------------ |
| [`fd_create`](#fd_create)                       | 创建实例                 |
| [`fd_set_params`](#fd_set_params)               | 设置参数值   |
| [`fd_get_params`](#fd_get_params) | 获取参数值   |
| [`fd_exec`](#fd_exec)                          | 传输图像数据获取人脸检测结果 |
| [`fd_control`](#fd_set_params)                  | 人脸特征值比对   |


### `fd_create`
```c
/**
 * @brief 创建 fd 实例
 * 
 * @param cfg 初始化配置指针,数据结构fd_config_t
 * @return fd_t* 执行结果, NULL为创建失败
 */
extern fd_t *fd_create(void *cfg);
```
创建 FD 实例。若创建失败，则会返回 NULL ，并在日志打印错误原因。

目前可能出现的错误：

- CP 固件无法正常加载
- 算法资源无法正常加载

> FD 实例本质为单例，若重复调用会返回 NULL 。

| 参数 | 类型  | 含义                                                                                                           |
| ---- | ----- | -------------------------------------------------------------------------------------------------------------- |
| cfg | `struct fd_algo` | 启用的标识。|

```c
/* 引擎实例配置 */
typedef struct {
    fd_algo  algo;     //引擎算法
} fd_config_t;

```
- 其中的 `algo` 包括以下几种状态:

```c
/* 引擎算法 */
typedef enum {
    FD_ALGO_FACE_RECOGNIZE,   //人脸识别全流程
} fd_algo;
```

使用示例：

```c
fd_config_t cfg;
cfg.algo = FD_ALGO_FACE_RECOGNIZE;
fd = fd_create((void *)&cfg);
```

### `fd_set_params`
```c
/**
 * @brief 设置算法参数
 * 
 * @param fd 实例
 * @param param 参数类型，从 fd_param 中选择
 * @param value 参数值指针，数据类型依赖不同的参数类型
 * @return int 执行结果，0 为成功，其他为失败
 */
extern int fd_set_params(fd_t *fd, fd_param param, void *value);
```

设置算法参数。不同参数有不同范围限制，需严格按约束设置。

| 参数  | 类型        | 含义                               |
| ----- | ----------- | ---------------------------------- |
| fd    | `fd_t*`     | FD 实例指针，从 `fd_create` 创建  |
| param | `fd_param`  | 参数类型，定义与范围见下方定义     |
| value | `void *`     | 参数值指针         |

参数类型：

```c
/* 算法参数类型 */
typedef enum {
    /**
    * 检测框最终门限
    * 数据类型: float
    * 范围: (0, 1)
    */
    FD_PARAM_FACE_DETECT_THRES				= 20001,    

    /**
    * 检测框最小像素值门限
    * 数据类型: float
    * 范围: (0, 640)
    */
    FD_PARAM_FACE_DETECT_PIXESIZE			= 20002,    

    /**
    * 质量检测偏航角门限
    * 数据类型: float
    * 范围: (0, 180)
    */  
    FD_PARAM_FACE_ALIGN_YAWTHRES		    = 30002,	

    /**
    * 质量检测俯仰角门限
    * 数据类型: float
    * 范围: (0, 180)
    */  
    FD_PARAM_FACE_ALIGN_PITCHTHRES	        = 30003,	

    /**
    * 质量检测翻滚角门限
    * 数据类型: float
    * 范围: (0, 180)
    */  
    FD_PARAM_FACE_ALIGN_ROLLTHRES		    = 30004,	

    /**
    * 活体识别门限
    * 数据类型: float
    * 范围: [0, 1)
    * 备注：0表示关闭活体检测
    */
    FD_PARAM_ANTI_SPOOFING_THRES            = 50002,   

} fd_param;
```

使用示例：

```c
float value = 0.4;
fd_set_params(fd, FD_PARAM_FACE_DETECT_THRES, &value);  
```

:::tip
未在此处列出的参数，暂时不需要设置。
:::

### `fd_get_params`

```c
/**
 * @brief 获取当前参数值
 * 
 * @param fd 实例
 * @param param 参数类型
 * @param value [out] 参数值指针，数据类型依赖不同的参数类型
 * @return int 执行结果，0 为成功，其他为失败
 */
extern int fd_get_params(fd_t *fd, fd_param param, void *value);
```

获取参数值。

| 参数  | 类型       | 含义                             |
| ----- | ---------- | -------------------------------- |
| fd    | `fd_t *`   | FD 实例指针，从 `fd_create` 创建 |
| param | `fd_param` | 参数类型                         |
| value | `void *`   | 参数值指针                       |

使用示例：

```c
float value;

fd_get_params(fd, FD_PARAM_FACE_DETECT_THRES，&value);
printk("FD_PARAM_FACE_DETECT_THRES value: %f\n", value);
```

:::info
fd_get_params 参数参考 [`fd_set_params`](#fd_set_params) 
:::


### `fd_exec`

```c
/**
 * @brief 单次执行获取结果
 * 
 * @param fd 实例指针
 * @param buffer 图像数据(暂只支持VGA和QVGA)
 * @param result 返回识别结果
 * @return int 
 */
extern int fd_exec(fd_t *fd, pic_buffer_t *buf, fd_face_recog_result_t *result);
```

单次执行获取人脸检测结果接口。

| 参数   | 类型                    | 含义                                 |
| ------ | ----------------------- | ------------------------------------ |
| fd    | `fd_t*`                | FD 实例指针，从 `fd_create` 创建   |
| buf   | `struct pic_buffer_t*` | 图像数据 buffer  |
| result    | `struct fd_face_recog_result_t*`   | 人脸检测结果   |

使用示例：

```c
fd_face_recog_result_t result;
pic_buffer_t pic_buf;

fd_exec(fd, &pic_buf, &result);
```

### `fd_control`
```c
/**
 * @brief 人脸特征值比较
 * 
 *  FD_CMD_COMPARE_FEATURE命令：
 *      数据类型 - fd_cmd_compare_feature_data_t
 *      结果类型 - fd_cmd_compare_feature_result_t
 *
 * @param fd 实例
 * @param cmd 命令类型
 * @param data 命令数据
 * @param result [out] 返回命令执行后的结果数据
 * @return int 执行结果，0 为成功，其他为失败
 */
extern int fd_control(fd_t *fd, fd_cmd cmd, void *data, void *result);
```

人脸特征值比对接口。

| 参数   | 类型                    | 含义                                 |
| ------ | ----------------------- | ------------------------------------ |
| fd    | `fd_t*`                | FD 实例指针，从 `fd_create` 创建   |
| cmd   | `struct fd_cmd`        | 比对方式类型  |
| data    | `struct fd_cmd_compare_feature_data_t*`               | 待比较的人脸特征值数据   |
| result  | `struct fd_cmd_compare_feature_result_t*`   | 人脸特征值比对得分   |

`fd_cmd` 包含以下类型：  

```c
/* 命令类型 */
typedef enum {
    FD_CMD_COMPARE_FEATURE,       //计算两个特征的相似度，返回相似度得分
} fd_cmd ;
```

使用示例：

```c
fd_cmd_compare_feature_data_t data;
fd_cmd_compare_feature_result_t result;

data.feature_dim = FD_MAX_FEATURE_DIMS;//特征值维度
data.feature_src = fr.feature_nvs;//本地特征值
data.feature_dst = fr.feature;//待比较的人脸特征值

ret = fd_control(fr.fd, FD_CMD_COMPARE_FEATURE, &data, &result);

if(result.score > 0.95){
    done = 1;
}
```
