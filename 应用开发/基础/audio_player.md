# 音频播放器 - lisa_player

## 概述

lisa_player 是一个音频播放器, 目前已经支持功能:


* 播放控制: 播放、暂停、恢复、停止;


* 播放资源: 文件系统资源、ram资源、网络资源;


* 支持的音频格式: mp3、wav;


* 支持的pcm格式: 16k16bit1ch;

TODO 功能:


* P1: 增加 PCM 格式: 不同pcm格式音频, 进行重采样播放;


* P1: 查询播放进度、音频长度;


* P1: 音量查询、控制;


* P2: 新音频格式: aac、hls、m3u8


* P2: 支持双播放器, 混音;  (优先级低)


* P2: 支持 https (优先级低)

当前已知问题:


* 未支持重采样，所以 mp3 暂时只能播放原采样为 16k 的单通道音频；

## 快速使用

本节主要以 **samples/board/csk6001/subsys/sof_host** 示例, 进行讲解。


* 打开 **sof_host** 示例文件夹的 **prj.conf** 文件, 修改宏配置:

    | CONFIG_LISA_PLAYER_SHELL_DEFINE_FILE

     | 设置默认要播放的本地文件路径

     |
    | CONFIG_LISA_PLAYER_SHELL_DEFINE_URL

      | 设置默认要播放的网络文件

       |
    | CONFIG_EXAMPLE_WIFI_SSID

                 | 设置 wifi ssid

       |
    | CONFIG_EXAMPLE_WIFI_PASSWORD

             | 设置 wifi 密码

         |

* 编译、烧录固件;


* 使用串口工具, 访问 csk6 的调试 shell (推荐使用: **lisa term** 命令行, 安装: **lisa install @lisa-plugin/term -g** )


* 使用 shell 命令使用示例功能:

> | lplayer init

>                          | 初始化播放器;

>         |
> | lplayer set_repeat {count}

>            | 设置播放的重复次数 (测试用) , 可支持文件播放、网络资源播放;

>  |
> | lplayer start file {path}

>             | 播放本地文件, 不带 {path} 参数时，播放默认指定资源;

>    |
> | lplayer start url {path}

>              | 播放网络文件, 不带 {path} 参数时，播放默认指定资源;

>    |
> | lplayer pause

>                         | 暂停播放, 恢复应该使用 resume, 而不是 start;

>    |
> | lplayer resume

>                        | 播放被暂停后, 用于恢复播放;

>                    |
> | lplayer destory

>                       | 停止播放; 可重新使用 start 进行播放新内容;

>         |
> | lplayer destory

>                       | 销毁播放器相关资源;

>                         |
具体实现, 可参考: **modules/lib/listenai/lisa_player/src/lisa_player_shell.c**

## 使用说明

### 启用 csk6 dsp

TODO:  略, 等补充

### 启用 wifi 功能

TODO:  略, 等补充

### 启用依赖的模块


* CONFIG_ZPORT_SAL : Zephyr 的系统抽象层, 为了方便适配其他 rtos 系统而设计;

以下模块, 均基于 *ZPORT_SAL* 的接口来开发

> | CONFIG_ZPORT_ESP

>                      | 使能 zport_esp 模块, 该模块主要包含从 esp 移植的各类组件;

>  |
> | CONFIG_ZE_TCP_TRANSPORT

>               | tcp传输模块, http、websocket 模块, 均依赖些模块;

>     |
> | CONFIG_ZE_TCP_TRANSPORT_ENABLE_SSL

>    | 使能 tcp 传输模块的 ssl 功能;

>                    |
> | CONFIG_ZE_HTTP_CLIENT

>                 | 使能 ze_http_client 模块;

>                   |
> | CONFIG_ZE_HTTP_CLIENT_ENABLE_HTTPS

>    | 使能 ze_http_client 模块的 https 支持;

>         |
> | CONFIG_BASE64

>                         | http auth 功能需要依赖 base64_encode;

>         |
### 启用 **ze_adf** 模块

esp-adf 是乐鑫开源的音频开发框架, 本模块主要移其核心 pipeline 流处理模块, 用于实现 csk6 上的流业务处理, 如播放器功能;

> | CONFIG_ZE_ADF

>                         | 使能 **ze_adf** 模块;

>                           |
> | CONFIG_ZE_ADF_HTTP_STREAM_ENABLE

>      | 使能 http_steam 流处理模块;

>                    |
> | CONFIG_ZE_ADF_FS_STREAM_ENABLE

>        | 使能 fs_steam 流处理模块;

>                      |
> | CONFIG_ZE_ADF_MEMORY_STREAM_ENABLE

>    | 使能 memory_steam 流处理模块;

>                  |
> | CONFIG_ZE_ADF_AVF_STREAM_ENABLE

>       | 使能 avf_steam 流处理模块, 该模块为输出模块, 将音频输出到 dsp 侧, 实现播放;

>  |
### 启用 **lisa_player**

> | CONFIG_LISA_PLAYER

>                    | 使能 lisa_player 模块;

>                                 |
> | CONFIG_LISA_PLAYER_AUDIO_STRCASECMP_ENABLE

>  | 默认要打开, newlibc 实现不完全;

>                              |
### 调试/测试功能

> | CONFIG_LISA_PLAYER_SHELL_ENABLE

>             | 使能 lisa_player 的 shell 功能, 可通过 shell 操作 lisa_player:

>  |
> | CONFIG_LISA_PLAYER_SHELL_DEFINE_FILE

>        | 配置默认的文件播放路径;

>                                          |
> | CONFIG_LISA_PLAYER_SHELL_DEFINE_URL

>         | 配置默认的网络播放地址;

>                                          |
## 接口文档


### *group* lisa_player_interface()
lisa player 音频播放器 

### Typedefs


### )

### )

### )
播放器事件回调函数指针 


* **Parameters**

    
    * **event** – 播放器事件 


    * **user** – 用户自定义的数据 


### Enums


### )
播放器事件类型 

*Values:*


### )
播放器异常事件 代表播放器无法完成/继续播放，这种情况下，应该调用 `lisa_player_cleanup()`， 初始化新的播放器，进行使用； 


### )
播放器已准备就绪的事件通知 


### )
播放已开始的事件通知 


### )
播放已停止的事件通知 


### )
播放已暂停的事件通知 


### )
播放已恢复的事件通知 


### )
资源播放完成的事件通知 


### )
播放器的状态 

*Values:*


### )
正在播放中 


### )
暂停状态 


### )
播放停止（同 IDEL 状态） 


### )
播放器状态错误 


### )
播放器的标识 

目前支持两个播放器实例，在调用 `lisa_player_init()` 时，通过参数传入， 每个播放器标识，只会创建一个播放器实例。 

*Values:*


### )
播放器一 


### )
播放器二 


### )
### Functions


### )
初始化播放器 

支持双播放器，即可以初始化2个播放器实例。（目前不支持同时播放）

```default
// 配置初始化参数
lisa_player_params_t params = {
     .type = LISA_PLAYER_TYPE_ONE,
     .cb = player_event,
};

// 初始化播放器一
lisa_player_t *player = lisa_player_init(&params);

// 初始化失败时，返回的播放器实例为 NULL
if (player == NULL) {
     ZPORT_LOGE(TAG, "lisa_player_init failed");
}
```

 


* **Parameters**

    
    * **params** – 播放器配置 



* **Returns**

    lisa_player_t\* 返回播放器实例，如果初始化失败，则返回 `NULL`。



### )
设置播放器回调函数 


* **Parameters**

    
    * **ins** – 播放器实例 


    * **callback** – 播放器回调函数 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
清理播放器实例 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
预设要播放的URL 


* **Parameters**

    
    * **ins** – 播放器实例 


    * **url** – 要播放的链接，目前支持 http 协议的链接 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
获取正在播放的URL 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    char\* 返回 URL 指针 



### )
预设要播放的文件 


* **Parameters**

    
    * **ins** – 播放器实例 


    * **filepath** – 要播放的文件的全路径，如: `/NAND:/a/b/c.mp3` 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
获取当前正在播放的文件 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    char\* 返回正在播放的文件全路径 



### )
预计要播放的资源内存地址，播放器将直接从该地址向后取资源； 


* **Parameters**

    
    * **ins** – 播放器实例 


    * **address** – 资源内存地址 


    * **len** – 资源的长度 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
开始播放资源 

在调用播放前，必须先调用`prepare`函数预设要播放的资源，如: lisa_player_prepare_url()

**NOTE**: 该接口只能在播放器状态为 `LISA_PLAYER_STATUS_STOPPED` 的时候进行调用， 如果调用播放暂停了，应该调用 lisa_player_resume() 来进行恢复；


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
暂停播放 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
恢复播放 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
停止播放 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
获取播放器状态 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    lisa_player_state_e 播放器的状态 



### )
跳转播放进度 


### *Todo:*)

**NOTE**: 未实现 


* **Parameters**

    
    * **ins** – 播放器实例 


    * **progress_ms** – 音频资源的进度，单位是毫秒 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
获取当前的播放进度 


### *Todo:*)

**NOTE**: 未实现 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    uint32_t 播放进度，单位为毫秒数 



### )
获取音频的长度 


### *Todo:*)

**NOTE**: 未实现 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    uint32_t 播放器总长度，单位为毫秒 



### )
设置播放音量（TODO） 


### *Todo:*)

**NOTE**: 未实现 


* **Parameters**

    
    * **ins** – 播放器实例 


    * **volume** – 播放器音量值 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
获取当前播放器的音量 


### *Todo:*)

**NOTE**: 未实现 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    uint8_t 播放器音量值 



### )
设置/取消静音 


### *Todo:*)

**NOTE**: 未实现 


* **Parameters**

    
    * **ins** – 播放器实例 


    * **muted** – 播放器实例 



* **Returns**

    lisa_err_t 执行结果 



* **Returns**

    
    * **0** – 成功 


    * **-1** – 失败 




### )
查询播放器是否被静音 


### *Todo:*)

**NOTE**: 未实现 


* **Parameters**

    
    * **ins** – 播放器实例 



* **Returns**

    true 已静音 



* **Returns**

    false 未静音 



### )
*#include <lisa_player.h>*播放器配置 


### )
*#include <lisa_player.h>*播放器
