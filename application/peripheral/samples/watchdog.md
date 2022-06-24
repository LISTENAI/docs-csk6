# WatchDog

## 概述
Watch Dog(看门狗)是一种监控系统软件的运行状况的手段。稳定运行的软件会在执行完特定指令后进行喂狗，若在一定周期内看门狗没有收到来软件程序的喂狗信号，则认为软件运行出现了异常，进入中断处理程序或强制系统复位，本章节通过示例介绍看门狗的基本使用方法。

## 准备工作  
本示例基于 `csk6002_9s_nano`开发板来实现，需要做如下准备：
- 准备一个`csk6002_9s_nano`开发板
- 通过串口连接PC端查看日志

## 创建项目
通过Lisa命令创建项目：
```
lisa zep create
```

![](./files/uart_create01.png)
依次按一下目录选择完成watchdog sample创建：  
> boards/ --> csk6/ --> driver/ --> wdt

## 示例实现
### 组件配置
在prj.conf文件中打开uart功能配置:
```c
# watchdog 配置
CONFIG_WATCHDOG=y
CONFIG_WDT_CSK6=y
```
### 应用逻辑实现分析      
### 应用逻辑  
- 启动看门狗，设置超时时间为16S。
- 10S后进行喂狗操作，超时时间清零重新计时。
- 计时16S超时后触发中断，第一次触发中断时做一次`feed watchdog`操作，第二次触发中断不做任何处理，等待`watchdog`重启系统。

### API接口 
示例中主要用到以下WatchDog API接口，更多API接口可以在zephyr官网[Watchdog Interface API](https://docs.zephyrproject.org/latest/doxygen/html/group__watchdog__interface.html)中看到。

```c
/*启动看门狗*/
int wdt_setup(const struct device * dev, uint8_t options)	

/*feed wdt操作*/
int wdt_feed(const struct device * dev, int channel_id)

/*设置超时时间，超时后触发中断*/
int wdt_install_timeout(const struct device *dev,  const struct wdt_timeout_cfg *cfg)
```
### 应用逻辑实现
**主函数**

```c
void main(void)
{
    /* 通过设备树获取watchdog设备实例 */
    const struct device *wdt;
    wdt = DEVICE_DT_GET(DT_NODELABEL(wdt));

    struct wdt_timeout_cfg wdt_config = {
        .flags = WDT_FLAG_RESET_SOC,
        .window.min = 0,
        .window.max = WDT_MAX_WINDOW,
    };

	/* 设置watchdog回调事件 */
	wdt_config.callback = wdt_callback;

    /* 设置watchdog超时时间，超时后触发中断 */
    wdt_channel_id = wdt_install_timeout(wdt, &wdt_config);

    /* 启动watchdog*/
    err = wdt_setup(wdt, WDT_OPT_PAUSE_HALTED_BY_DBG);

    /* waiting for Feeding watchdog */
    uint32_t count = 0;
    for (int i = 0; i < WDT_FEED_TRIES; ++i) {
        k_msleep(1000);
        printk("Waiting for feed watchdog, %ds...\n", ++count);
    }
    /* 执行一次Feed watchdog 操作*/
    wdt_feed(wdt, wdt_channel_id);

    /* 等待watchdog重启系统 */
    count = 0;
    while (1) {
        k_msleep(1000);
        printk("Waiting for reset, %ds...\n", ++count);
    }
}
```
**中断处理：**

在第一次超时进入中断时执行一次`Feed watchdog`操作，16S后再次触发中断，此时不做任何处理，等待watchdog重启系统。
```c
static void wdt_callback(const struct device *wdt_dev, int channel_id)
{	
	static bool is_handled = false;

	if (!is_handled) {
		is_handled = !is_handled;
		wdt_feed(wdt_dev, channel_id);
		printk("Handled watchdog interrupt and feed the dog.System will reset after 16s.\n");
	} else {
		printk("Handled watchdog interrupt again, wait for reset.\n");
	}
}
```
:::tip
进入中断后不做任何处理到watchdog触发系统重启大概0.5S，由底层驱动设置。
:::
## 编译和烧录
### 编译

在app根目录下通过以下指令完成编译：
```
lisa zep build -b csk6002_9s_nano
```
### 烧录   

`csk6002_9s_nano`开发板通过USB连接PC，通过烧录指完成烧录：
```
lisa zep flash --runner pyocd
```
### 查看结果

**查看日志：**

CSK6-NanoKit通过板载DAPlink虚拟串口连接电脑，或者将CSK6-NanoKit的日志串口`A03 TX A02 RX`外接串口板并连接电脑。
- 通过lisa提供的`lisa term`命令查看日志
- 或者在电脑端使用串口调试助手查看日志，默认波特率为115200。


*** Booting Zephyr OS build fd83997719ed  ***
Watchdog sample application, May 30 2022 22:14:35
Attempting to test pre-reset callback, 0x18001381
wdt_channel_id=16252.
Waiting for feed watchdog, 1s...
...
Waiting for feed watchdog, 10s...
Waiting for reset, 1s...

...
Waiting for reset, 16s...
Handled watchdog interrupt and feed the dog.System will reset after 16s.
Waiting for reset, 1s...
...
Waiting for reset, 16s...
Handled watchdog interrupt again, wait for reset.

*** Booting Zephyr OS build fd83997719ed  ***
Watchdog sample application, May 30 2022 22:15:20
...
```
 从日志可以看到，watchdog在第一次触发中断时执行了一次`feed watchdog`操作，第二次触发中断不做任何处理，`watchdog`重启了系统，符合示例的实现预期。