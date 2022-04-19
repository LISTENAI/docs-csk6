# 日志

## 概述

zephyr的日志组件提供了较为完整的日志级别控制和日志输出形式。包括但不限于

> 
> * 多等级日志输出控制


> * 延迟日志输出


> * 时间戳


> * 数据输出专用API


> * 模块级编译时过滤

日志组件由前端和后端组成，前后端均提供了公共API，可由开发者自由处理消息流向。默认情况下，使用内置前端和UART后端。

## 配置组件

需要在工程配置中设置

> 
> * CONFIG_LOG=y


> * CONFIG_CONSOLE=y


> * CONFIG_SERIAL=y

> > 设置 ‘CONFIG_LOG=y’即使能LOG组件，通常在对应工程的prj.conf中设置。

> > 设置 ‘CONFIG_CONSOLE=y’是由于日志组件默认调用console前端，故默认情况下，依赖console组件。

> > 设置 ‘CONFIG_SERIAL=y’是由于 日志组件默认后端是UART，故默认情况下，依赖UART组件

日志组件使用


1. 日志输出分为5个等级输出

> 
>     * LOG_LEVEL_NONE         – 不显示任何日志数据


>     * LOG_LEVEL_ERR          – 只显示error级别的日志


>     * LOG_LEVEL_WRN          – 只显示error、warning级别的日志


>     * LOG_LEVEL_INF          – 只显示error、warning、info级别的日志


>     * LOG_LEVEL_DBG          – 显示所有级别的日志

对应不同级别，格式化字符输出分别有不同API

> 
> * LOG_ERR


> * LOG_WRN


> * LOG_INF


> * LOG_DBG

另外多一个不受等级限制的输出

> 
> * LOG_PRINTK

对应不同级别，数据输出也有不同API

> 
> * LOG_HEXDUMP_ERR


> * LOG_HEXDUMP_WRN


> * LOG_HEXDUMP_INF


> * LOG_HEXDUMP_DBG


1. zephyr日志组件支持模块化的日志管理

```c
#include <logging/log.h>
LOG_MODULE_REGISTER(LOG_MODULE_NAME, LOG_MODULE_LEVEL_DBG);
```

第一个参数，用来指定该模块化log的名称，第二个参数用于指定该模块化log的输出级别，若第二个参数未定义，则默认为 `CONFIG_LOG_DEFAULT_LEVEL`。
