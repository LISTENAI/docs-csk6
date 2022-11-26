# SDK Sample 说明

本章节对 CSK6 语音合成 SDK 示例 app_xtts_sample_for_csk6 进行说明，让开发者能够更快速了解示例的实现逻辑。

## 概述

该 Sample 展示了对SDK接口的基本调用，实现了可通过 shell 传递文本调用语音合成并通过语音套件播放的能力。

## 获取 Sample

执行以下命令拉取 [Sample 项目](https://cloud.listenai.com/zephyr/applications/app_algo_xtts_sample_for_csk6) 到本地，注意代码仓在本地存放的路径不能有中文名称，否则容易引起错误；

```bash
lisa zep create --from-git https://cloud.listenai.com/zephyr/applications/app_algo_xtts_sample_for_csk6.git
```

## sample 目录结构

```c
app_algo_xtts_sample_for_csk6
├─ .sdk/         // SDK
├─ boards/       // 设备树板型文件
├─ resource/     // 资源文件
└─ src/          // sample 代码
   ├─ transfer/  // 串口传输实现
   └─ main.c     // 主程序入口
```

## 组件配置

```shell
CONFIG_NEWLIB_LIBC=y
CONFIG_SYSTEM_WORKQUEUE_STACK_SIZE=2048
CONFIG_HEAP_MEM_POOL_SIZE=204800
CONFIG_LOG=y

# PSRAM 配置
CONFIG_CSK6_PSRAM=y
CONFIG_CSK_HEAP=y
CONFIG_CSK_HEAP_MEM_POOL_SIZE=40960

# licak算法底层框架配置 
CONFIG_LICAK=y
CONFIG_LICAK_MODULES_ALG_XTTS=y
CONFIG_LICAK_DISABLE_MULTI_HEAP_INIT=y

# Shell 能力
CONFIG_SHELL=y
CONFIG_SHELL_LOG_BACKEND=n

# 日志配置
CONFIG_LOG=y
CONFIG_LOG_MODE_IMMEDIATE=n
CONFIG_LOG_BACKEND_UART=y
CONFIG_LOG_BACKEND_UART_OUTPUT_TEXT=y
```

## 设备树配置

设备树配置文件 `csk6012_c3_nano.overlay`，在 `/boards` 目录下：

```c
/delete-node/ &psram_ap;

/ {
    chosen {
        /*
         * shared memory reserved for the inter-processor communication
         */
        zephyr,ipc = &mailbox0;
    };

};


&csk6012_c3_nano_pinctrl {
    pinctrl_uart1_tx_default: uart1_tx_default{
        pinctrls = <UART1_TXD_GPIOA_12>;
    };
    pinctrl_uart1_rx_default: uart1_rx_default{
        pinctrls = <UART1_RXD_GPIOA_13>;
    };
};

/* uart1 用于向上位机接收命令，传输合成音频 */
&uart1 {
    pinctrl-0 = <&pinctrl_uart1_tx_default &pinctrl_uart1_rx_default>;
    pinctrl-names = "default";
    current-speed = <921600>;
    status = "okay";
};

/* psram 配置 */
&psram0 {
    psram_ap: psram_ap@30780000 {
        compatible = "zephyr,memory-region","listenai,csk6-psram-partition";
        reg = <0x30780000 0x00080000>;
        status = "okay";
        zephyr,memory-region = "PSRAMAP";
    };
};

```

## 代码实现

```c
licak_xtts_t *xtts = NULL;

void main(void) {
	LOG_INF("XTTS Sample started on [%s]", CONFIG_BOARD);

  // 初始化 SDK
	licak_init();
  // 初始化串口传输逻辑
	transfer_init();

  // 创建 XTTS 实例
	xtts = xtts_create(XTTS_MODE_OFFLINE);

  // 监听 XTTS 状态
	xtts_register_callback(xtts, demo_callback, NULL);

	pcl_set_handler(transfer_handler);
}
```

## Shell 使用

默认将 `uart0` 作为 shell 交互串口，故直接连接 DAPLink 口作为串口即可。

### 命令介绍

| 命令 | 说明 |
| --- | --- |
| `tts play <text>` | 播放合成文本 |
| `tts synth <text>` | 调用合成文本，只生成不播放，生成的音频数据在回调中返回，若有连接 uart2 串口则会通过串口协议发送到上位机 |
| `tts stop` | 停止播放。在调用 `tts play <text>` 后生效。 |

### 使用示例

```shell
tts play hello
tts play 'hello world'
```
:::info 注意
上述命令的 `<text>` ，若合成文本为英文，可直接使用，例如 `tts play hello` ，表示播放「`hello`」；若合成文本为中文，需要先转换为十六进制再传，例如「你好」的十六进制表示为 `0xe4 0xbd 0xa0 0xe5 0xa5 0xbd` ，那么在命令中调用则为 `tts play '\xe4\xbd\xa0\xe5\xa5\xbd'` 。
:::