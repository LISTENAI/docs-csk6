# 录音
## 概述
acapture是CSK6 SDK提供的一个音频组件，基于acapture可实现音频采集的功能。本章节主要讲解如何基于acapture组件提供的接口实现录音的功能。

录音功能的一些特性：

- 支持的录音格式：16K/16bit/1ch~4ch

- csk6中支持4路的Audio Codec，故最多可以实现4通道的音频数据数据输入。

:::tip
本章节着重讲解acapture API接口的使用和如何实现录音的功能，更多关于音频框架以及工作原理的内容将在后续章节中描述，敬请期待。
:::

## API接口
acapture常用API接口如下：
```c
/**
 * @brief Create a acapture handle, This function creates and initializes an instance of the acapture
 * @param type audio stream type
 * @return acapture structure handle pointer if SUCCESS, NULL if failure.
 */
extern acapture_t* acap_create(void);

/**
 * @brief Destroy a acapture handle, This function destroy an instance of the acapture and free memory 
 * @return 0 if SUCCESS, NULL if failure.
 */
extern int acap_destroy(acapture_t* acap);

/**
 * @brief Set acapture stream formate
 * @param handle Pointer to acapture structure handle
 * @param fmt Pointer to auido format structure
 * @return 0 if SUCCESS, NULL if failure.
 */
extern int acap_set_fmt(acapture_t* acap,amedia_fmt_t* fmt);

/**
 * @brief Register event callback function
 * The registration event is called back to the AVF framework
 * @param handle Pointer to acapture structure handle
 * @param flags The flags of the callback event,only AVF_STREAM_EVENT_THRES_NOTIFY is availed for acapture .
 * @param callback event processing handler
 * @param priv_context The handle pointer passed to the callback
 * @param data Additional parameters for event callback registration
 * @return 0 if SUCCESS, negative errno code if failure.
 */
extern int acap_event_register(acapture_t* acap,acapture_event_flags_t flags,
acapture_event_callback_t callback,void* priv_context,uint32_t data);

/**
 * @brief Unregister event callback function Cancel the event callback function
 * @param handle Pointer to acapture structure handle
 * @param flags The flags of the callback event
 * @return 0 if SUCCESS, negative errno code if failure.
 */
extern int acap_event_unregister(acapture_t* acap,acapture_event_flags_t flags);

/**
 * @brief Start acapture to capture audio
 * @param handle Pointer to acapture structure handle
 * @return 0 if SUCCESS, negative errno code if failure.
 */
extern int acap_start(acapture_t* acap);

/**
 * @brief stop acapture capture audio, This function immediately stop the acapture and abandon cached data
 * @param handle Pointer to acapture structure
 * @return 0 if SUCCESS, negative errno code if failure.
 */
extern int acap_stop(acapture_t* acap);

/**
 * @brief Get acapture status
 * @param handle Pointer to acapture structure
 * @return acapture status.
 */
extern acapture_status_t acap_get_status(acapture_t* acap);

/**
 * @brief get acapture data, Get acapture's audio data. This function must be called in acapture's event callback
 * @param handle Pointer to acapture structure
 * @param buffer Pointer to buffer
 * @param len Want to get data length
 * @return 0 if SUCCESS, negative errno code if failure.
 */
extern int acap_get_datai(acapture_t* acap,char* buffer,uint32_t len);

```   
更多acapture API接口描述请看sdk `csk-sdk\modules\lib\sof_host\include\avf\modules\audio\acapture.h` 头文件。



## 使用示例

### 准备工作
本示例基于 `csk6002_9s_nano`开发板实现，开发者需要做如下准备：
- 一个`csk6002_9s_nano`开发板。
- mic+speaker扩展板，扩展板接两个mic和一个speaker输出。

开发板连接如下图示: 

![](./images/speaker.png)

### 获取sample项目
通过Lisa命令创建项目：
```
lisa zep create
```

![](./images/sample_create01.png)
依次按以下目录选择完成aplay sample创建：  
> boards → csk6 → subsys → avf → audio → acapture


### 设备树配置
本示例基于`csk6002_9s_nano`开发板，使用到了共享内存，因此需要在sample中重写`boad overlay`完成设备树配置。
```c
/ {
	chosen {
		/*
		 * shared memory reserved for the inter-processor communication
		 */
		zephyr,ipc_shm = &psram_share;
		zephyr,ipc = &mailbox0;
	};

};
```

### 组件配置
```shell
# LOG 配置，属于系统配置项
CONFIG_PRINTK=y
CONFIG_DEBUG=y
CONFIG_LOG=y
CONFIG_LOG_MODE_IMMEDIATE=y
CONFIG_LOG_DETECT_MISSED_STRDUP=n
CONFIG_LOG_BACKEND_SHOW_COLOR=y
CONFIG_LOG_BACKEND_FORMAT_TIMESTAMP=y
CONFIG_LOG_BACKEND_UART=y
CONFIG_LOG_BACKEND_UART_OUTPUT_TEXT=y
CONFIG_MAIN_STACK_SIZE=2048

# 给系统动态内存分配的内存空间
# sof峰值占用大概40k，所以这个值应该大于40k，具体设置为多少需要根据app本身对于内存的需求来确定。
CONFIG_HEAP_MEM_POOL_SIZE=250000

# 打开avf配置项
CONFIG_SOF_HOST=y
CONFIG_AVF_DEBUG_LEVEL=1
CONFIG_AVF_USE_BINARY_ARRAY=y

# 底层硬件通讯配置
CONFIG_IPM=y

# 打开cache配置
CONFIG_CACHE_MANAGEMENT=y
```

:::tip
名词说明：   
avf 全称：audio video framework，系统音视频框架   
sof 全称：sound open firmware，系统音频框架  

avf和sof的关系：avf是一个host端的业务框架，avf的底层驱动会引用sof提供的接口。
:::

### AVF底层固件和拓扑配置引用
CSK6采用双核异构架构，通过ARM核给DSP加载音频固件，并通过topology(拓扑)文件定义DSP的业务逻辑。ARM核通过IPC和共享内存控制和读取DSP的数据，在ARM调用对应的API接口即可轻松在DSP端进行录播音功能，因此需要在应用项目中增加以下配置，将DSP固件和拓扑结构加载到二进制数组文件中，并在应用开发中调用：
`dsp_resource.h`内容如下：
```c
/* dsp固件 */
static const unsigned char dsp_firmware[] = {
#include "dsp_firmware.inc"
};

/* dsp拓扑文件 */
static const unsigned char dsp_tplg[] = {
#include "dsp_tplg.inc"
};
```
在main函數中引用
```c
#include "dsp_resource.h"
```
在sample项目的根目录下`/resource`文件夹，包含DSP固件和拓扑文件:

- csk6_default.tplg     
AVF拓扑配置文件

- zephyr.bin    
AVF底层架构固件

该两个文件为音频架构的基础固件，在sample编译时被打包到编译产物中。目前开发者无法进行配置，在当前阶段，开发者有以下改动需求时需要联系FAE提供支持：

- 修改音频采样率16K/48K或通道数量1ch~4ch。

- 配置录音mic的顺序

:::tip
DSP部分音频框架的实现逻辑和工作原理本章节不展开讲解，开发者在本章节中只需要会用音频框架所提供的接口完成录音即可，后续的章节将对DSP部分内容进行讲解，敬请期待。
:::

### sample实现逻辑
基于csk6 sdk提供的acapture API接口实现录音和音频数据的返回。

:::tip
本示例中不保存音频数据，[录音和播音示例](./audio_record_play)章节将结合acapture和aplay实现基于开发板的录音和播音功能。
:::
### sample实现
```c
#include <zephyr.h>
#include <avf/framework/avf_platform.h>
#include <avf/modules/audio/acapture.h>
#include <avf/slogger.h>
#include "dsp_resource.h"

/* 音频数据回调的触发线，当硬件fifo数据超过1024时触发回调 */
#define ACAPTURE_DATA_EVENT_THRES (1024)
#define ACAPTURE_DATA_TOTAL_LENGTH (1024 * 100)
/* 音频缓存队列的长度为10 */
#define ACAPTURE_MSGQ_NUMBER (10)
typedef struct{
    char *pdata;
    int datalen;
} msgq_data_t;

struct k_msgq acapture_msgq;

/* 音频数据回调 */
static void acapture_data_process(void *priv, acapture_event_msg_t msg)
{
    acapture_t *handle = (acapture_t *)priv;
    msgq_data_t msgq_data;

    uint32_t avail;
    int32_t readlen;
    int ret = 0;

    /* 查询是否有数据事件通知 */
    if (msg.event_flags & AVF_STREAM_EVENT_THRES_NOTIFY)
    {
        /* avail为当前硬件fifo中实际缓存的音频数据长度(可取出的数据长度) */
        avail = msg.value.value;
        /* 动态申请空间用于存储音频数据 */
        msgq_data.pdata = k_malloc(sizeof(char) * avail);
        if (msgq_data.pdata == NULL){
            SLOGE(LOG_TAG, "[%s %d]k_malloc FAILED!", __FUNCTION__, __LINE__);
            return;
        }
        /* 读取音频数据,该函数必须在事件回调上下文中执行，readlen为acap_get_datai接口实际获取的音频数据长度 */
        readlen = acap_get_datai(handle, msgq_data.pdata, avail);
        if (readlen > 0){
            msgq_data.datalen = readlen;
            /* 将音频数据输出堆叠到缓存队列中，再到在业务逻辑中取出来作处理 */
            ret = k_msgq_put(&acapture_msgq, &msgq_data, K_NO_WAIT);
            if (ret)
            {
                /* 释放掉动态申请空间 */
                k_free(msgq_data.pdata);
                SLOGE(LOG_TAG, "[%s %d]msgq message dropped", __FUNCTION__,
                      __LINE__);
            }
        }else{
            k_free(msgq_data.pdata);
        }
    }
}

void main(void)
{
    acapture_t *acapture = NULL;
    /* 配置录音的格式参数：16k 16bit 1ch pcm格式 */
    amedia_fmt_t fmt = {
        .rate = 16000,
        .channels = 1,
        .bits = 16,
        .compr = AMEDIA_COMPR_PCM,
    };
    uint32_t recv_bytes = 0;
    int iret = 0;
    static char buffer[sizeof(msgq_data_t) * ACAPTURE_MSGQ_NUMBER];
    msgq_data_t msgq_data;

    /* 注册并初始化AVF框架 */
    avf_stream_platform_register(dsp_firmware, sizeof(dsp_firmware), dsp_tplg,
                                 sizeof(dsp_tplg));

    /* 初始化一个工作队列，用于缓存音频数据，队列的长度为50(可根据实际需求设置长度) */
    k_msgq_init(&acapture_msgq, buffer, sizeof(msgq_data_t), ACAPTURE_MSGQ_NUMBER);

    /* step1: 初始化acapture */
    acapture = acap_create();
    if (acapture == NULL)
    {
        printk("acap_create failed!\n");
        return;
    }
    printk("Create acapture success\n");

    /* step2: 设置音频数据回调，当acapture录音音频数据满ACAPTURE_DATA_EVENT_THRES时触发回调 */
    if (0 != (iret = acap_event_register(acapture, AVF_STREAM_EVENT_THRES_NOTIFY,
                                         acapture_data_process, acapture,
                                         ACAPTURE_DATA_EVENT_THRES)))
    {
        printk("Register data event callback failed,iret %d\n", iret);
        return;
    }
    printk("Register data event callback success.\n");

    /* step3: 设置acapture参数 */
    if (0 != (iret = acap_set_fmt(acapture, &fmt)))
    {
        printk("acap_set_fmt failed!\n");
        return;
    }
    printk("Set audio fmt<%d %d %d> to acapture success\n", fmt.rate, fmt.channels, fmt.bits);

    /* step4: 启动capture录音 */
    if (0 != (iret = acap_start(acapture)))
    {
        printk("acap_start failed.\n");
        return;
    }
    printk("Trigger capture start success.\n");

    /* step5: 获取音频数据 */
    for (;;)
    {
        /* 从队列获取音频数据 */
        iret = k_msgq_get(&acapture_msgq, &msgq_data, K_MSEC(500));
        if (iret != 0)
        {
            printk("Get audio data timeout.\n");
            goto _END;
        }
        printk("Get audio data length %d \n", msgq_data.datalen);
        k_free(msgq_data.pdata);
        recv_bytes += msgq_data.datalen;
        if (recv_bytes >= ACAPTURE_DATA_TOTAL_LENGTH)
        {
            break;
        }
    }
    
    /* step6: 停止acapture */
    acap_stop(acapture);

    /* step7: 销毁aplayer */
    if (0 != (iret = acap_destroy(acapture)))
    {
        printk("aplay_destroy failed.\n");
        goto _END;
    }
    printk("acapture run compelete and exit.\n");
_END:
    /* 清空message queue队列 */
    for (;;)
    {
        if (0 != k_msgq_get(&acapture_msgq, &msgq_data, K_NO_WAIT))
        {
            break;
        }
        k_free(msgq_data.pdata);
    }
}

```
### sample编译和烧录
#### 编译

在app根目录下通过以下指令完成编译：
```
lisa zep build -b csk6002_9s_nano
```
#### 烧录   

`csk6002_9s_nano`开发板通过USB连接PC，通过烧录指令完成烧录：
```
lisa zep flash --runner pyocd
```
#### 查看结果

**查看串口日志**

CSK6-NanoKit通过板载DAPlink虚拟串口连接电脑，或者将CSK6-NanoKit的日志串口`A03 TX A02 RX`外接串口板并连接电脑。
- 通过lisa提供的`lisa term`命令查看日志
- 或者在电脑端使用串口调试助手查看日志，默认波特率为115200。

日志结果：
```shell
*** Booting Zephyr OS build v1.0.3-alpha.1  ***
Create acapture success
Register data event callback success.
Set audio fmt<16000 1 16> to acapture success
Trigger capture start success.
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
Get audio data length 4096 
acapture run compelete and exit.
```
从日志可看到step5从音频缓存队列中获取音频数据的打印为`msgq_data.datalen`值为4096，即队列里每包数据为4096字节长度。


