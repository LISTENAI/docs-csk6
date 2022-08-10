# 优化方式


## Stack Sizes 栈大小

Stack sizes of various system threads are specified generously to allow for usage in different scenarios on as many supported platforms as possible. You should start the optimization process by reviewing all stack sizes and adjusting them for your application:

系统线程的堆栈大小默认较大，以允许在尽可能多平台上的不同场景中使用。可以根据实际应用来调整堆栈大小为最佳的数值。

**[CONFIG_ISR_STACK_SIZE](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_ISR_STACK_SIZE)** 

默认2048字节

**[CONFIG_MAIN_STACK_SIZE](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_MAIN_STACK_SIZE)** 

默认1024字节

**[CONFIG_IDLE_STACK_SIZE](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_IDLE_STACK_SIZE)** 

默认320字节

**[CONFIG_SYSTEM_WORKQUEUE_STACK_SIZE](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_SYSTEM_WORKQUEUE_STACK_SIZE)**

默认1024字节

**[CONFIG_PRIVILEGED_STACK_SIZE](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_PRIVILEGED_STACK_SIZE)**

默认1024字节，取决于用户空间(userspace)

## Unused Peripherals 未使用外设

Some peripherals are enabled by default. You can disable unused peripherals in your project configuration, for example:

有些外设是默认启用的。可以在项目配置中禁用未使用的外设，比如说：

`CONFIG_GPIO=n`

`CONFIG_SPI=n`

## Various Debug/Informational Options 调试信息选项

The following options are enabled by default to provide more information about the running application and to provide means for debugging and error handling:

以下选项在默认情况下被启用，它提供应用程序给i他运行中更多信息以及调试和错误处理的手段。

**[CONFIG_BOOT_BANNER](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_BOOT_BANNER)**

This option can be disabled to save a few bytes.

禁用后可以节省内存。

**[CONFIG_DEBUG](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_DEBUG)**

This option can be disabled for production builds

这个选项在生产构建中可以被禁用

## MPU/MMU Support MPU/MMU 支持

Depending on your application and platform needs, you can disable MPU/MMU support to gain some memory and improve performance. Consider the consequences of this configuration choice though, because you’ll lose advanced stack checking and support.

根据应用和平台需要，可以禁用 MPU/MMU 支持以获得一些内存并提高性能。禁用 MPU/MMU 将失去高级堆栈检查和支持。