# 日志输出

日志是我们平时开发调试过程中高频使用的功能之一，本节将主要介绍日志功能的使用，通过本章节你讲了解到：
- 日志功能具备的特性
- 如何配置和启用日志功能

## 概述
Zephyr的日志组件提供了较为完整的日志级别控制和日志输出形式。包括但不限于
- 多等级日志输出控制
- 数据输出专用API


日志组件由前端和后端组成，前后端均提供了公共API，可由开发者自由处理消息流向。

默认情况下，使用内置前端和UART后端。


## 配置日志组件

要启用日志组件，需要在工程配置文件(prj.conf)中增加以下配置项：

```shell
# 使能LOG组件，通常在对应工程的prj.conf中设置。
CONFIG_LOG=y
# 由于日志组件默认调用console前端，故默认情况下，依赖console组件
CONFIG_CONSOLE=y
# 由于 日志组件默认后端是UART，故默认情况下，依赖UART组件
CONFIG_SERIAL=y
```


## 日志组件的使用
### 日志的分级
日志输出分为5个等级输出

    - LOG_LEVEL_NONE         -- 不显示任何日志数据
    - LOG_LEVEL_ERR          -- 只显示error级别的日志
    - LOG_LEVEL_WRN          -- 只显示error、warning级别的日志
    - LOG_LEVEL_INF          -- 只显示error、warning、info级别的日志
    - LOG_LEVEL_DBG          -- 显示所有级别的日志


对应不同级别，格式化字符输出对应的API接口如下：

    - LOG_ERR
    - LOG_WRN
    - LOG_INF
    - LOG_DBG
    - LOG_PRINTK

:::note
其中，LOG_PRINTK是不受等级限制的输出。
:::


对应不同级别数据输出也有不同API接口：

    - LOG_HEXDUMP_ERR
    - LOG_HEXDUMP_WRN
    - LOG_HEXDUMP_INF
    - LOG_HEXDUMP_DBG

### 使用示例
在应用程序中引入Zephyr日志组件支持模块化的日志管理。
```c
#include <logging/log.h>
LOG_MODULE_REGISTER(LOG_MODULE_NAME, LOG_MODULE_LEVEL_DBG);
```
参数说明：
- LOG_MODULE_NAME：用来指定该模块化log的名称
- LOG_MODULE_LEVEL_DBG：用于指定该模块化log的输出级别，若此参数未定义，则默认为 ``CONFIG_LOG_DEFAULT_LEVEL``。

代码示例：

```c
#include <zephyr.h>

#include <logging/log.h>
LOG_MODULE_REGISTER(main, LOG_LEVEL_DBG);

void main(void)
{
	LOG_INF("Hello Wolrd INF on %s", CONFIG_BOARD);
	LOG_ERR("Hello Wolrd ERR on %s", CONFIG_BOARD);
	LOG_DBG("Hello Wolrd DBG on %s", CONFIG_BOARD);
	LOG_WRN("Hello Wolrd WRN on %s", CONFIG_BOARD);
}
```
修改`LOG_LEVEL_DBG`日志等级进行日志过滤。
