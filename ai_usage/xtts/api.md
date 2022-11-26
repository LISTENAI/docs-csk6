# 接口说明


以下说明来自 AI 能力基础 SDK licak （ LISTENAI independent csk6-base ability kit ） 中的 xtts ( X-Text-To-Speech ) 模块。

要使这些接口实现加入编译，Kconfig 配置中至少需要选择

```conf
CONFIG_LICAK=y
CONFIG_LICAK_MODULES_ALG_XTTS=y
CONFIG_LICAK_DISABLE_MULTI_HEAP_INIT=y
```

## 使用说明

目前推荐的使用方式，以伪代码表示可描述为

```c
licak_init();
licak_xtts_t* xtts = xtts_create(XTTS_MODE_OFFLINE);
const char* text = "合成文本测试";
xtts_player_start(xtts, text, strlen(text));
```

其中代表的含义为

1. 加载 DSP 固件；
2. 通知创建对应算法引擎实例；
3. 传输要合成的文本字符串，调用接口播放合成后的音频。

## 结构定义

主要描述用户侧需要关心的结构体定义，未在此处列出的接口，则暂不需要过多关心。

### `enum licak_xtts_mode`

XTTS 工作模式，包括
* `XTTS_MODE_OFFLINE` 离线模式
* `XTTS_MODE_ONLINE` 在线模式（Coming soon）

### `enum xtts_event_t`

回调中的事件类型，包括
* `XTTS_EVENT_START` TTS 播放开始
* `XTTS_EVENT_STOP` TTS 播放停止
* `XTTS_EVENT_DATA` TTS 音频数据，此时回调的 data 类型为 `xtts_frame_data_t*`

### `struct xtts_frame_data_t`

回调中的音频数据。

```c
typedef struct {
  /** PCM 数据 */
  void *data;
  /** 数据长度 */
  uint32_t len;
} xtts_frame_data_t;
```

### `xtts_event_callback_t`

事件回调函数类型。

* `event` 为 `XTTS_EVENT_START` 时，代表 TTS 播放开始，`data` 为 `NULL` 
* `event` 为 `XTTS_EVENT_STOP` 时，代表 TTS 播放停止，`data` 为 `NULL` 
* `event` 为 `XTTS_EVENT_DATA` 时，代表 TTS 的数据回调，`data` 类型为 `xtts_frame_data_t*`

## 函数

> 以下函数中，除了特殊注明，否则返回值都为整型。其含义为，返回 0 代表执行成功，否则为负数表示错误。

### `xtts_create`

创建 XTTS 实例。

| 参数 | 类型 | 含义 |
| --- | --- | --- |
| mode | `licak_xtts_mode` | 运行模式。XTTS_OFFLINE 离线模式，XTTS_ONLINE 在线模式。 |

**返回**

若创建成功则返回 XTTS 实例，否则为 NULL 并打印 ERROR 信息。

### `xtts_player_start`

文本合成语音并开始播放。

| 参数 | 类型 | 含义 |
| --- | --- | --- |
| xtts | `licak_xtts_t *` | XTTS 实例 | 
| text | `char *` | 要合成的文本内容，使用 UTF-8 编码 | 
| len | `uint32_t` | 文本长度 | 

### `xtts_player_stop`

停止播放 TTS 。若未在播放，则调用无效。

| 参数 | 类型 | 含义 |
| --- | --- | --- |
| xtts | `licak_xtts_t *` | XTTS 实例 | 

### `xtts_synth_text`

文本合成语音，但不自动播放。音频数据将通过回调回传，参阅 `xtts_register_callback` 注册回调。

| 参数 | 类型 | 含义 |
| --- | --- | --- |
| xtts | `licak_xtts_t *` | XTTS 实例 | 
| text | `char *` | 要合成的文本内容，使用 UTF-8 编码 | 
| len | `uint32_t` | 文本长度 | 

### `xtts_register_callback`

注册事件回调。当重复注册同一个函数回调时将返回错误。

| 参数 | 类型 | 含义 |
| --- | --- | --- |
| xtts | `licak_xtts_t *` | XTTS 实例 | 
| callback | `xtts_event_callback_t` | 回调函数指针 |
| user_data | `void *` | 用户数据 |

### `xtts_unregister_callback`

取消注册事件回调。

| 参数 | 类型 | 含义 |
| --- | --- | --- |
| xtts | `licak_xtts_t *` | XTTS 实例 | 
| callback | `xtts_event_callback_t` | 回调函数指针 |

### `xtts_destroy`

销毁 XTTS 实例。

| 参数 | 类型 | 含义 |
| --- | --- | --- |
| xtts | `licak_xtts_t *` | XTTS 实例 | 

