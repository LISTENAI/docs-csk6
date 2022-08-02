# 引脚控制

This is a high-level guide to pin control. See Pin Control API for API reference material.  
这是引脚控制的高级指南。有关API参考资料，请参考 [引脚控制API](https://docs.zephyrproject.org/latest/hardware/pinctrl/index.html#pinctrl-api)
## 介绍

The hardware blocks that control pin multiplexing and pin configuration parameters such as pin direction, pull-up/down resistors, etc. are named pin controllers. The pin controller’s main users are SoC hardware peripherals, since the controller enables exposing peripheral signals, like for example, map I2C0 SDA signal to pin PX0. Not only that, but it usually allows configuring certain pin settings that are necessary for the correct functioning of a peripheral, for example, the slew-rate depending on the operating frequency. The available configuration options are vendor/SoC dependent and can range from simple pull-up/down options to more advanced settings such as debouncing, low-power modes, etc.  
控制引脚复用和引脚配置参数(如引脚方向、上拉/下拉电阻等)的硬件模块称为**引脚控制器**。引脚控制器的主要使用者是 SoC 硬件外围设备，因为控制器可以公开外微信号，如将 `I2C0` `SDA` 信号映射到引脚 `PX0`。不仅如此，为了外设的正常运行，它还允许配置某些引脚设置，例如，根据工作频率的转速。可用的配置选项是供应商/SoC提供的，范围从简单的上拉/下拉选项到更高级的设置，例如，消抖、低功耗模式等。

The way pin control is implemented in hardware is vendor/SoC specific. It is common to find a centralized approach, that is, all pin configuration parameters are controlled by a single hardware block (typically named pinmux), including signal mapping. Fig. 35 illustrates this approach. PX0 can be mapped to UART0_TX, I2C0_SCK or SPI0_MOSI depending on the AF control bits. Other configuration parameters such as pull-up/down are controlled in the same block via CONFIG bits. This model is used by several SoC families, such as many from NXP and STM32.  
引脚控制在硬件上的实现方式是特定于供应商/SoC的。通常可以找到一种集中式方法，即所有引脚配置参数都由单个硬件模块（通常称为pinmux）控制，包括信号映射。[图35](#picture35)说明了这种方式。根据`AF`控制位, `PX0`可以映射到`UART0_TX`,`I2C0_SCK`或`SPI0_MOSI`。其他配置参数（如上拉/下拉）通过`CONFIG`位在同一块种控制。该模型被多个SoC系列使用，例如NXP 和 STM32等多个系列。
![图35](images/hw-cent-control.svg)
<center><span id="picture35">图35</span>引脚控制集中到单个引脚块的示例</center>

Other vendors/SoCs use a distributed approach. In such case, the pin mapping and configuration are controlled by multiple hardware blocks. Fig. 36 illustrates a distributed approach where pin mapping is controlled by peripherals, such as in Nordic nRF SoCs.  
其他供应商/SoC使用分布式方法。在这种情况下，引脚映射和配置由多个硬件模块控制。[图36](#picture36)说明了一种分布式方法，其中引脚映射由外围设备控制，例如在 Nordic nRF SoC中。
![图36](images/hw-dist-control.svg)

<center><span id="picture36">图36</span>分布在外围寄存器和每个引脚块之间的引脚控制实例</center>

From a user perspective, there is no difference in pin controller usage regardless of the hardware implementation: a user will always apply a state. The only difference lies in the driver implementation. In general, implementing a pin controller driver for a hardware that uses a distributed approach requires more effort, since the driver needs to gather knowledge of peripheral dependent registers.  
从用户角度来看，无论硬件如何实现，引脚控制起的使用都是一样的：用户总是应用一个状态。唯一的区别在于驱动程序的实现。一般来说，为使用分布式方法的硬件实现引脚控制起驱动程序需要更多时间，因为驱动程序需要收集与外围设备相关的寄存器知识。

### 引脚控制与GPIO

Some functionality covered by a pin controller driver overlaps with GPIO drivers. For example, pull-up/down resistors can usually be enabled by both the pin control driver and the GPIO driver. In Zephyr context, the pin control driver purpose is to perform peripheral signal multiplexing and configuration of other pin parameters required for the correct operation of that peripheral. Therefore, the main users of the pin control driver are SoC peripherals. In contrast, GPIO drivers are for general purpose control of a pin, that is, when its logic level is read or controlled manually.  
引脚控制起驱动程序覆盖的一些功能与GPIO驱动程序重叠。例如，上拉/下拉电阻通常可以通过引脚控制驱动程序和 GPIO 驱动程序启用。在csk6上下文中，引脚控制驱动程序的目的是执行外设信号复用和配置该外设正确操作所需的其他引脚参数。因此，引脚控制驱动程序的主要使用者是 SoC 外围设备。

## 状态模型

For a device driver to operate correctly, a certain pin configuration needs to be applied. Some device drivers require a static configuration, usually set up at initialization time. Others need to change the configuration at runtime depending on the operating conditions, for example, to enable a low-power mode when suspending the device. Such requirements are modeled using states, a concept that has been adapted from the one in the Linux kernel. Each device driver owns a set of states. Each state has a unique name and contains a full pin configuration set (see Table 38). This effectively means that states are independent of each other, so they do not need to be applied in any specific order. Another advantage of the state model is that it isolates device drivers from pin configuration.  
为了使设备驱动程序正确运行，需要应用特定的引脚配置。一些设备驱动程序需要静态配置，通常在初始化时设置。其他人则需要根据运行条件在运行时更改配置，例如，在挂起设备时启用低功耗模式。这些需求时使用**状态**建模的，这是一个从Linux内核中改编而来的概念。每个设备驱动程序都拥有一组状态。每个状态都有一个唯一的名称并包含一个完整的引脚配置集（[参考表38](#table38)）。这意味着状态是相互独立的，因此它们不需要以任何特定的顺序使用。状态模型的另外一个优点是它将设备驱动程序与引脚配置隔离开来。

<table>
    <tr>
        <th colspan="4">UART0 外围设备</th>
    </tr>
    <tr>
        <th colspan="2">默认状态</th>
        <th colspan="2">睡眠状态</th>
    </tr>
    <tr>
        <th>TX</th>
        <th>
            * Pin:PA0  
            * Pull:没有  
            * 低功耗：否  
        </th>
        <th>TX</th>
        <th>
            * Pin:PA0 
            * Pull:没有 
            * 低功耗：是  
        </th>
    </tr>
    <tr>
        <th>RX</th>
        <th>
            * Pin:PA1  
            * Pull:上拉  
            * 低功耗：否  
        </th>
        <th>RX</th>
        <th>
            * Pin:PA1  
            * Pull:没有  
            * 低功耗：是 
        </th>
    </tr>
</table>
<center><span id="table38">表38</span>使用状态模型编码的管脚配置示例</center>
### 标准状态

The name assigned to pin control states or the number of them is up to the device driver requirements. In many cases a single state applied at initialization time will be sufficient, but in some other cases more will be required. In order to make things consistent, a naming convention has been established for the most common use cases. Table 39 details the standardized states and its purpose.  
分配给引脚控制状态的名称或它们的数量取决于设备驱动程序的要求。在许多情况下，在初始化时应用单个状态就足够了，但在其他情况下需要更多状态。为了保持一致性，我们为最常见的用例建立了一个变数命名规则。[表39](#table39)详细说明了标准化状态及用途。

|状态|识别符|用途|
|----|----|----|
|`default`|[PINCTRL_STATE_DEFAULT](https://docs.zephyrproject.org/latest/hardware/pinctrl/index.html#c.PINCTRL_STATE_DEFAULT)|State of the pins when the device is in operational state 当设备处于工作状态时引脚的状态|
|`sleep`|[PINCTRL_STATE_SLEEP](https://docs.zephyrproject.org/latest/hardware/pinctrl/index.html#c.PINCTRL_STATE_SLEEP)|State of the pins when the device is in low power or sleep modes 当设备处于低功耗或睡眠模式时引脚的状态|

Note that other standard states could be introduced in the future.  
请注意，将来可能会引入其他标准状态。

### 自定义状态

Some device drivers may require using custom states beyond the standard ones. To achieve that, the device driver needs to have in its scope definitions for the custom state identifiers named as PINCTRL_STATE_{STATE_NAME}, where {STATE_NAME} is the capitalized state name. For example, if mystate has to be supported, a definition named PINCTRL_STATE_MYSTATE needs to be in the driver’s scope.  
有些设备驱动程序可能需要使用超出标准状态的自定义状态。为了实现这一点，设备驱动程序需要在它范围内定义名为`PINCTRL_STATE_{STATE_NAME}`自定义状态标识符。其中 `{STATE_NAME}` 是大写的状态名称。例如，如果必须支持 `mystate`，则需要在驱动程序的作用域中包含名为 `PINCTRL_STATE_MYSTATE` 的定义。

:::info 注意
It is important that custom state identifiers start from PINCTRL_STATE_PRIV_START  
自定义状态表示服必须从[PINCTRL_STATE_PRIV_START](https://docs.zephyrproject.org/latest/hardware/pinctrl/index.html#c.PINCTRL_STATE_PRIV_START) 开始
:::

If custom states need to be accessed from outside the driver, for example to perform dynamic pin control, custom identifiers should be placed in a header that is publicly accessible.  
如果需要从驱动程序外部访问自定义状态，例如执行动态引脚控制，则应将自定义标识符放在可公开访问的标头中。

### 跳过状态

In most situations, the states defined in Devicetree will be the ones used in the compiled firmware. However, there are some cases where certain states will be conditionally used depending on a compilation flag. A typical case is the sleep state. This state is only used in practice if CONFIG_PM_DEVICE is enabled. If a firmware variant without device power management is needed, one should in theory remove the sleep state from Devicetree to not waste ROM space storing such unused state.  
在大多数情况下，在设备树定义的状态将是编译固件中使用的状态。但是，在某些情况下，一些状态根据编译标志有条件地使用。一个典型的例子是 `睡眠` 状态,只有在`CONFIG_PM_DEVICE`启用的情况下，才会在实际中使用这种状态。如果需要一个没有设备电源管理的固件，理论上应该从设备树移除 `睡眠` 状态，以免浪费存储这种未使用状态的ROM空间。

States can be skipped by the pinctrl Devicetree macros if a definition named PINCTRL_SKIP_{STATE_NAME} expanding to 1 is present when pin control configuration is defined. In case of the sleep state, the pinctrl API already provides such definition conditional to the availability of device power management:  
如果在定义引脚控制配置时存在扩展名为`PINCTRL_SKIP_{STATE_NAME}`的定义，则 `pinctrl` 设备树宏可以跳过状态。对于睡眠状态，`pinctrl` API已经根据电源管理的可用性提供了这样的定义：
```
#ifndef CONFIG_PM_DEVICE
/** If device power management is not enabled, "sleep" state will be ignored. */
#define PINCTRL_SKIP_SLEEP 1
#endif
```

## 动态引脚控制

Dynamic pin control refers to the capability of changing pin configuration at runtime. This feature can be useful in situations where the same firmware needs to run onto slightly different boards, each having a peripheral routed at a different set of pins. This feature can be enabled by setting CONFIG_PINCTRL_DYNAMIC.  
动态引脚控制是指在运行时改变引脚配置的能力。这个特性在同一固件需要运行不同的电路板上的情况下非常游泳，每个电路板都有一个外围设备路由到不同引脚集的。可以通过设置 `CONFIG_PINCTRL_DYNAMIC` 来启用此特性。 

:::info 注意
Dynamic pin control should only be used on devices that have not been initialized. Changing pin configurations while a device is operating may lead to unexpected behavior. Since Zephyr does not support device de-initialization yet, this functionality should only be used during early boot stages.  
动态引脚控制应该只用于尚未初始化的设备。在设备运行时更改引脚配置可能会导致其他意外情况。由于CSK6还不支持设备反初始化，因此这个功能智能在早期启动阶段使用。
:::