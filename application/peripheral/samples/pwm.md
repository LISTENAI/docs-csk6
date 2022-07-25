# PWM

## 概述
PWM是我们常用的外设功能之一，本节将通过示例展示PWM API接口和使用方法。

csk6的pwm有以下特性：
- 支持8路的pwm通道
- 支持的频率范围：
- 每个通道的时钟源是否可以独立？


## PWM常用接口

### 设置PWM 输出周期和脉冲宽度

```c
int pwm_pin_set_usec(const struct device * dev, uint32_t channel, uint32_t period, uint32_t pulse, pwm_flags_t flags)	
```

**参数说明**

| 参数    | 说明        |
| ------- | ----------- |
| dev     | pwm设备实例 |
| channel | 通道        |
| period  | 频率        |
| pulse   | 脉冲宽度    |
| flags   | PWM标志     |

其中period和pulse的单位是microseconds，受Zephyr接口单位microseconds的限制，导致了最小的周期为2us，也就是500kHz，

<br/>

## 使用示例

### 准备工作
首先，实现Blinky_pwm示例的预期效果需要硬件开发板上必须有一个GPIO(带pwm输出功能)连接了一个LED灯，在`csk6002_9s_nano`开发板上是有这个设计的，通过查看开发板底板原理图，你可以看到LED对应的电路设计如下图所示，我们可以看到LED1(Green)对应的控制引脚为:GPIOA_05，GPIOA_05可复用为pwm输出功能。
![](./files/led_pin.png)

### 获取sample项目
`CSK6 SDK`提供了Blinky_pwm的sample，你可以在任一期望放置项目工程的目录下输出以下指令创建一个Blinky_pwm项目：
```
lisa zep create
```
![](./files/liza_zep_create.png)

\> basic → blinky_pwm

Blinky pwm sample创建成功。

### 示例项目组件配置
在prj.conf文件中添加项目基础组件配置配置:
```shell
CONFIG_STDOUT_CONSOLE=y
CONFIG_PRINTK=y
# 打开pwm配置
CONFIG_PWM=y
# 打开日志配置
CONFIG_LOG=y
CONFIG_LOG_PRINTK=y
CONFIG_LOG_MODE_IMMEDIATE=y
CONFIG_PWM_LOG_LEVEL_DBG=y
```
### 设备树配置
`csk6002_9s_nano.dts`设备树配置文件中已经实现了`pwmled`的配置，具体如下:

```c
{
    model = "csk6002 9s nano";
    compatible = "csk,csk6002_9s_nano";
    aliases {
            pwm-led0 = &green_pwm_led;

    };

    pwmleds {
		compatible = "pwm-leds";
		green_pwm_led: green_pwm_led {
			pwms = <&pwm5 5 PWM_POLARITY_NORMAL>;
			label = "User BOARD_LED_2 - PWM0";
		};
};
```
**pwmled 设备树配置说明：**

| 字段                                  | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| green_pwm_led(green_pwm_led:)                         | pwm_led 设备树的 node label，可通过 node label 获取 pwm_led设备树的配置信息 |
| green_pwm_led(:green_pwm_led)                         | pwm_led 设备树的 node id，可通过 node id获取 pwm_led设备树的配置信息 |
| gpios = <&pwm5 5 PWM_POLARITY_NORMAL> | &pwm5 ：pwm _5<br />5：通道<br />PWM_POLARITY_NORMAL： pwm 引脚 flag |
| User BOARD_LED_2 - PWM0               | pwm_led 节点的 label 属性[(Label propert)](https://docs.Zephyrproject.org/latest/build/dts/intro.html#important-properties)，通过传入device_get_binding()接口可以获取pwm的设备实例 |



### 

### 示例实现逻辑

- 此例程使用PWM控制LED灯以1Hz的频率闪烁，每4秒频率翻倍直到64hz，此后每4秒频率减半，直到恢复到1Hz完成一个闪烁周期，以先快后慢的闪烁方式循环。

- 部分PWM硬件无法实现1Hz的频率控制，这个sample在启动时会对硬件进行校准，适当减小最大PWM周期，直到找到匹配硬件的值。

### 示例实现 
```c
#include <zephyr.h>
#include <sys/printk.h>
#include <device.h>
#include <drivers/pwm.h>

#define PWM_LED0_NODE	DT_ALIAS(pwm_led0)

/* 获取设备树配置 */
#define PWM_CTLR	DT_PWMS_CTLR(PWM_LED0_NODE)
#define PWM_CHANNEL	DT_PWMS_CHANNEL(PWM_LED0_NODE)
#define PWM_FLAGS	DT_PWMS_FLAGS(PWM_LED0_NODE)

#define MIN_PERIOD_USEC	(USEC_PER_SEC / 64U)
#define MAX_PERIOD_USEC	USEC_PER_SEC

void main(void)
{
    const struct device *pwm;
    uint32_t max_period;
    uint32_t period;
    uint8_t dir = 0U;
    int ret;

    printk("PWM-based blinky\n");

    /* 获取`pwm_led0`设备实例 */
    pwm = DEVICE_DT_GET(PWM_CTLR);
    if (!device_is_ready(pwm)) {
        printk("Error: PWM device %s is not ready\n", pwm->name);
        return;
    }

    /*
        * In case the default MAX_PERIOD_USEC value cannot be set for
        * some PWM hardware, decrease its value until it can.
        *
        * Keep its value at least MIN_PERIOD_USEC * 4 to make sure
        * the sample changes frequency at least once.
        */
    printk("Calibrating for channel %d...\n", PWM_CHANNEL);
    max_period = MAX_PERIOD_USEC;
    /* 对硬件进行校准，适当减小最大PWM周期，到找匹配的值 */
    while (pwm_pin_set_usec(pwm, PWM_CHANNEL,
                max_period, max_period / 2U, PWM_FLAGS)) {
        max_period /= 2U;
        if (max_period < (4U * MIN_PERIOD_USEC)) {
            printk("Error: PWM device "
                    "does not support a period at least %u\n",
                    4U * MIN_PERIOD_USEC);
            return;
        }
    }

    printk("Done calibrating; maximum/minimum periods %u/%u usec\n",
            max_period, MIN_PERIOD_USEC);

    period = max_period;
    /* pwm输出配置实现LED闪烁频率控制 */
    while (1) {
        /* 设置pwm参数，通道、频率(max_period=125000HZ)、脉宽(50%)、标志(PWM_POLARITY_NORMAL) */
        ret = pwm_pin_set_usec(pwm, PWM_CHANNEL,
                        period, period / 2U, PWM_FLAGS);
        if (ret) {
            printk("Error %d: failed to set pulse width\n", ret);
            return;
        }
        /* 改变pwm频率和脉宽实现LED的动态亮度显示 */
        period = dir ? (period * 2U) : (period / 2U);
        if (period > max_period) {
            period = max_period / 2U;
            dir = 0U;
        } else if (period < MIN_PERIOD_USEC) {
            period = MIN_PERIOD_USEC * 2U;
            dir = 1U;
        }

        k_sleep(K_SECONDS(4U));
    }
    }

```

### 编译和烧录
#### 编译
在sample根目录下通过以下指令完成编译：
```
lisa zep build -b csk6002_9s_nano
```
#### 烧录
`csk6002_9s_nano`通过USB连接PC，通过烧录指令开始烧录：

```
lisa zep flash --runner pyocd
```
完成烧录后，可看到终端输出 “烧录成功” 的提示，如图：
![](./files/flash.png)

#### 查看结果 

预期的效果应如下视频所示，开发板上的LED灯(绿)以先快后慢的方式循环闪烁，如果在你的卡发板上实现了这个效果，那么恭喜，你顺利的完成了LED的控制，在CSK6的开发上又迈出了一步！

<video src="https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/zephyr/%E6%96%87%E6%A1%A3%E8%A7%86%E9%A2%91%E4%BB%93/blinky_pwm.mp4" controls="controls" width="500" height="300">您的浏览器不支持播放该视频！</video>