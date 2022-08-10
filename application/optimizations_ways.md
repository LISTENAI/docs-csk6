# 优化方式


## 栈大小


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

## 未使用外设


有些外设是默认启用的。可以在项目配置中禁用未使用的外设，比如说：

`CONFIG_GPIO=n`

`CONFIG_SPI=n`

## 调试信息选项


以下选项在默认情况下被启用，它提供应用程序运行中更多信息以及调试和错误处理的手段。

**[CONFIG_BOOT_BANNER](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_BOOT_BANNER)**


禁用后可以节省内存。

**[CONFIG_DEBUG](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_DEBUG)**


这个选项在生产构建中可以被禁用

## MPU/MMU 支持


根据应用和平台需要，可以禁用 MPU/MMU 支持以获得一些内存并提高性能。禁用 MPU/MMU 将失去高级堆栈检查和支持。