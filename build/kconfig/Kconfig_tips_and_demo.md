# 小贴士与最佳实践

This page covers some Kconfig best practices and explains some Kconfig behaviors and features that might be cryptic or that are easily overlooked.  
本篇涵盖了一些 Kconfig 最佳实践，并解释了一些 Kconfig 难以理解和容易忽略的作用和特性。

>The official Kconfig documentation is [kconfig-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html) and [kconfig-macro-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-macro-language.html).  
官方的Kconfig文档是 [kconfig-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html) 和 [kconfig-macro-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-macro-language.html).  

* What to turn into Kconfig options
* [什么可以变为 Kconfig 的选项](#wttiko)
* What not to turn into Kconfig options
* [什么不可以变为 Kconfig 的选项](#wnttiko)
    - Options enabling individual devices
    - [启用单个设备的选项](#oeid)
    - Options that specify a device in the system by name
    - [按名称指定系统中设备的选项](#otsaditsbn)
    - Options that specify fixed hardware configuration
    - [按指定固件硬件配置选项](#otsfhc)
* `select` statements
* `select` 语句
    - `select` pitfalls
    - `select` 陷阱
    - Alternatives to `select`
    - `select` 备用方案
    - Using `select` for helper symbols
    - 使用 `select` 帮助选项
    - `select` recommendations
    - `select` 建议
* (Lack of) conditional includes
* (缺乏)条件引用
* “Stuck” symbols in menuconfig and guiconfig
*  menuconfig 和 guiconfig中的"stuck"选项
*  Assignments to promptless symbols in configuration files
*  对配置文件中非提示选项的赋值
*  `depends on` and `string/int/hex` symbols
*  `depends on` 和 `string/int/hex` 选项
*  menuconfig symbols
*  `menuconfig` 选项
*  Checking changes in menuconfig/guiconfig
*  检查 menuconfig/guiconfig 中的更改
*  Checking changes with scripts/kconfig/lint.py
*  检查更改 `scripts/kconfig/lint.py`
*  Style recommendations and shorthands
*  风格建议和简写
    - Factoring out common dependencies
    - 分解常见的依赖项
    - Redundant defaults
    - 冗余默认值
    - Common Kconfig shorthands
    - 常用Kconfig和简写
    - Prompt strings
    - 提示字符串
    - Header comments and other nits
    - 标题注释和其他细节
* Lesser-known/used Kconfig features
* 使用频率较低的 Kconfig 特性
    - The imply statement
    - imply 声明
    - Optional prompts
    - [可选提示](#op)
    - Optional choices
    - 可选选项
    - visible if conditions

## <span id="wttiko">什么能变为 Kconfig 的选项</span>

When deciding whether something belongs in Kconfig, it helps to distinguish between symbols that have prompts and symbols that don’t.  
它有助于区别有提示选项和没有提示选项，是决定它是否作为Kconfig配置的依据。

If a symbol has a prompt (e.g. bool "Enable foo"), then the user can change the symbol’s value in the menuconfig or guiconfig interface (see Interactive Kconfig interfaces), or by manually editing configuration files. Conversely, a symbol without a prompt can never be changed directly by the user, not even by manually editing configuration files.  
如果有提示选项（例如 `bool "Enable foo"`）那么用户可以在 menuconfig 或 guiconfig 界面中更改选项的值(参考 [Kconfig 交互界面](./Kconfig_gui.md)) ，或者手动编辑配置文件。

Only put a prompt on a symbol if it makes sense for the user to change its value.  
只有用户更改选项值有作用时，才在选项上放提示。

Symbols without prompts are called hidden or invisible symbols, because they don’t show up in menuconfig and guiconfig. Symbols that have prompts can also be invisible, when their dependencies are not satisfied.  
没有提示的选项称为不可见选项，因为它们不显示在 `menuconfig` 和 `guiconfig` 中。具有提示的选项如果不满足它们的依赖关系时，也可能是不可见的。

Symbols without prompts can’t be configured directly by the user (they derive their value from other symbols), so less restrictions apply to them. If some derived setting is easier to calculate in Kconfig than e.g. during the build, then do it in Kconfig, but keep the distinction between symbols with and without prompts in mind.
没有提示的选项不能由用户直接配置（它们的值来自其他选项），因此对它们的限制较少。如果某些派生设置在Kconfig中进行运算比构建时更容易，则在Kconfig中进行，但要记住有提示和无提示选项之间的区别。

See the optional prompts section for a way to deal with settings that are fixed on some machines and configurable on other machines.  
请参考 [可选提示](#op) 部分，用于处理某些设备上固定的设置和其他设备上可配置的设置。

## <span id="wnttiko">什么不能变为 Kconfig 的选项</span>

In Zephyr, Kconfig configuration is done after selecting a target board. In general, it does not make sense to use Kconfig for a value that corresponds to a fixed machine-specific setting. Usually, such settings should be handled via devicetree instead.  
在csk6系列中，Kconfig配置是在选择板型后完成的。一般来说，将Kconfig用于对应于固定设备特定设置的值是没有用的。通常，这类设置应该通过设备树去处理。

In particular, avoid adding new Kconfig options of the following types:  
特别是避免添加以下类型的Kconfig选项:

### <span id="oeid">启用单个设备的选项</span>

Existing examples like `CONFIG_I2C_0` and `CONFIG_I2C_1` were introduced before Zephyr supported devicetree, and new cases are discouraged. See Write device drivers using devicetree APIs for details on how to do this with devicetree instead.
在csk6支持设备树之前已经介绍了[CONFIG_I2C_0](#) 和 [CONFIG_I2C_1](#)等示例，不鼓励使用新的示例。有关如何使用设备树操作的详细信息，请参考 [设备树api编写设备驱动程序](#)。

### <span id="otsaditsbn">按名称指定系统中设备的选项</span>

For example, if you are writing an I2C device driver, avoid creating an option named MY_DEVICE_I2C_BUS_NAME for specifying the bus node your device is controlled by. See Device drivers that depend on other devices for alternatives.
例如，如果你正在编写 I2C 设备驱动程序，请避免创建一个名为`MY_DEVICE_I2C_BUS_NAME`去指定你的设备控制的总线节点。替代方案，请参考 [依赖其他设备的驱动程序](#).

Similarly, if your application depends on a hardware-specific PWM device to control an RGB LED, avoid creating an option like `MY_PWM_DEVICE_NAME`. See Applications that depend on board-specific devices for alternatives.  
同样，如果你的应用依赖于特定硬件的PWM设备来控制RGB LED,请避免创建`MY_PWM_DEVICE_NAME`这样的选项，请参考 [依赖特定板型设备的应用程序](#)

### <span id="otsfhc">按指定固件硬件配置选项</span>

For example, avoid Kconfig options specifying a GPIO pin.  
例如，避免Kconfig指定GPIO引脚。

An alternative applicable to device drivers is to define a GPIO specifier with type phandle-array in the device binding, and using the GPIO devicetree API from C. Similar advice applies to other cases where devicetree.h provides Hardware specific APIs for referring to other nodes in the system. Search the source code for drivers using these APIs for examples.  
一种可代替的方法是设备驱动程序在设备绑定中定义类型为 phandle-array 的GPIO 说明符 和 使用C语言CPIO设备树 API。