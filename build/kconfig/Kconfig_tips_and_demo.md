# 小贴士与最佳实践

This page covers some Kconfig best practices and explains some Kconfig behaviors and features that might be cryptic or that are easily overlooked.  
本篇涵盖了一些 Kconfig 最佳实践，并解释了一些 Kconfig 难以理解和容易忽略的作用和特性。

:::info
The official Kconfig documentation is [kconfig-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html) and [kconfig-macro-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-macro-language.html).  
官方的Kconfig文档是 [kconfig-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html) 和 [kconfig-macro-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-macro-language.html).  
:::

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
* [`select` 语句](#ss)
    - [`select` pitfalls](#sp)
    - `select` 陷阱
    - Alternatives to `select`
    - [`select` 备用方案](#ats)
    - Using `select` for helper symbols
    - [使用 `select` 帮助选项](#usfhs)
    - `select` recommendations
    - [`select` 建议](#sr)
* (Lack of) conditional includes
* [(缺乏)有条件引用](#loci)
* “Stuck” symbols in menuconfig and guiconfig
*  [menuconfig 和 guiconfig中的"stuck"选项](#ssimag)
*  Assignments to promptless symbols in configuration files
*  [对配置文件中非提示选项的赋值](#atpsicf)
*  `depends on` and `string/int/hex` symbols
*  [`depends on` 和 `string/int/hex` 选项](#doass)
*  menuconfig symbols
*  [`menuconfig` 选项](#ms)
*  Checking changes in menuconfig/guiconfig
*  [检查 menuconfig/guiconfig 中的更改](#ccimg)
*  Checking changes with scripts/kconfig/lint.py
*  [检查更改 `scripts/kconfig/lint.py`](#ccws)
*  Style recommendations and shorthands
*  [风格建议和简写](#sras)
    - Factoring out common dependencies
    - [分解常见的依赖项](#focd)
    - Redundant defaults
    - [冗余默认值](#rd)
    - Common Kconfig shorthands
    - [常用Kconfig和简写](#cks)
    - Prompt strings
    - [提示字符串](#ps)
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
例如，避免Kconfig选项指定GPIO引脚。

An alternative applicable to device drivers is to define a GPIO specifier with type phandle-array in the device binding, and using the GPIO devicetree API from C. Similar advice applies to other cases where devicetree.h provides Hardware specific APIs for referring to other nodes in the system. Search the source code for drivers using these APIs for examples.  
一种可代替的方法是设备驱动程序在设备绑定中定义类型为 phandle-array 并使用C语言的GPIO设备树API。类似的建议也适用于 devicetree.h 为引用系统中的其他节点提供[特定硬件API](#)的其他情况。例如，在源代码中搜索使用这些 API 的驱动程序。

An application-specific devicetree binding to identify board specific properties may be appropriate. See [tests/drivers/gpio/gpio_basic_api](#) for an example.  
可以使用特定应用程序的设备树[绑定](#)来标记board的特定属性。有关示例，请参考[tests/drivers/gpio/gpio_basic_api](https://github.com/zephyrproject-rtos/zephyr/tree/main/tests/drivers/gpio/gpio_basic_api)

For applications, see Blinky for a devicetree-based alternative.
有关的应用程序，请参考 [Blinky](#) 了解基于设备树的替代方案。

### <span id="ss">`select` 语句</span>

The select statement is used to force one symbol to y whenever another symbol is y. For example, the following code forces CONSOLE to y whenever USB_CONSOLE is y:  
Select 语句用于一个选项是 `y`时强制另外一个选项为`y`。例如，下面的代码在 `USB_CONSOLE` 是 `y`的时候强制 `CONSOLE`为`y`:

```
config CONSOLE
     bool "Console support"

...

config USB_CONSOLE
     bool "USB console support"
     select CONSOLE
```

This section covers some pitfalls and good uses for select.  
本节介绍一些Select的陷阱和好用的方法。

### <span id="sp">`select` 陷阱</span>

select might seem like a generally useful feature at first, but can cause configuration issues if overused.  
`select` 一开始就像一个常用的功能，但是过度使用可能会导致配置问题。

For example, say that a new dependency is added to the CONSOLE symbol above, by a developer who is unaware of the USB_CONSOLE symbol (or simply forgot about it):  
例如，假设一个不知道（或者只是忘记了） USB_CONSOLE 选项的开发者在 CONSOLE选项添加一个新的依赖：
```
config CONSOLE
     bool "Console support"
     depends on STRING_ROUTINES
```

Enabling USB_CONSOLE now forces CONSOLE to y, even if STRING_ROUTINES is n.  
即使`STRING_ROUTINES`为`n`的时候，启用`USB_CONSOLE`也会强制`CONSOLE`为`y`。

To fix the problem, the STRING_ROUTINES dependency needs to be added to USB_CONSOLE as well:  
为了解决这个问题，还需要添加`STRING_ROUTINES` 依赖到 `USB_CONSOLE`。

```
config USB_CONSOLE
     bool "USB console support"
     select CONSOLE
     depends on STRING_ROUTINES

...

config STRING_ROUTINES
     bool "Include string routines"
```

More insidious cases with dependencies inherited from if and menu statements are common.  
从`if`和`menu`语句中继承的依赖关系更加隐蔽，这种情况很常见。

An alternative attempt to solve the issue might be to turn the depends on into another select:
解决这个问题可以尝试把`depends on`转换成另外一个`select`。
```
config CONSOLE
     bool "Console support"
     select STRING_ROUTINES

...

config USB_CONSOLE
     bool "USB console support"
     select CONSOLE
```

In practice, this often amplifies the problem, because any dependencies added to STRING_ROUTINES now need to be copied to both CONSOLE and USB_CONSOLE.  
实际上，这通常会放大问题，因为任何添加到`STRING_ROUTINES`的依赖选项现在都需要复制到`CONSOLE` 和 `USB_CONSOLE`.

In general, whenever the dependencies of a symbol are updated, the dependencies of all symbols that (directly or indirectly) select it have to be updated as well. This is very often overlooked in practice, even for the simplest case above.  
通常，每当更新选项依赖时，（直接或间接）选择它的所有选项的依赖关系都必须更新。即使对于上面最简单的情况来说，这在实践中也经常被忽视。

Chains of symbols selecting each other should be avoided in particular, except for simple helper symbols, as covered below in Using select for helper symbols.  
除了简单的辅助选项, 特别要避免互相选择的选项链，如下面的[使用`select`辅助选项](#usfhs)

Liberal use of select also tends to make Kconfig files harder to read, both due to the extra dependencies and due to the non-local nature of select, which hides ways in which a symbol might get enabled.
自由使用`select`还会使kconfig文件难以阅读，这是既由于额外的依赖关系，也是由于`select`非本地性质造成的，它隐藏了可能启用选项的方式。

### <span id="ats">`select` 备用方案</span>

For the example in the previous section, a better solution is usually to turn the select into a depends on:  
对于上面示例，更好的解决方案是通常把`select`转变为`depends on`:
```
config CONSOLE
     bool "Console support"

...

config USB_CONSOLE
     bool "USB console support"
     depends on CONSOLE
```

This makes it impossible to generate an invalid configuration, and means that dependencies only ever have to be updated in a single spot.  
这就不可能生成无效配置，并且只需要一个地方更新依赖关系即可。

An objection to using depends on here might be that configuration files that enable USB_CONSOLE now also need to enable CONSOLE:  
是否反对使用`depends on`,取决于配置文件需要启用`USB_CONSOLE`也需要启用`CONSOLE`:  

```
CONFIG_CONSOLE=y
CONFIG_USB_CONSOLE=y
```

This comes down to a trade-off, but if enabling CONSOLE is the norm, then a mitigation is to make CONSOLE default to y:  
归根结底是一种权衡，但是如果启用`CONSOLE`是规范，那么缓解措施是使`CONSOLE`默认为`y`:
```
config CONSOLE
     bool "Console support"
     default y
```

This gives just a single assignment in configuration files:  
这只在配置文件中给出一个赋值:
```
CONFIG_USB_CONSOLE=y
```

Note that configuration files that do not want CONSOLE enabled now have to explicitly disable it:  
请注意，不想启用 `CONSOLE` 的配置文件必须明确禁止它:
```
CONFIG_CONSOLE=n
```

### <span id="usfhs">使用`select`帮助选项</span>

A good and safe use of select is for setting “helper” symbols that capture some condition. Such helper symbols should preferably have no prompt or dependencies.  
`select` 一个安全好用的用法是设置捕捉某些条件的“帮助”选项。这样的辅助选项最好没有提示符和依赖关系。

For example, a helper symbol for indicating that a particular CPU/SoC has an FPU could be defined as follows:  
例如，用于特定CPU/SOC的辅助选项可以如下定义：

```
config CPU_HAS_FPU
     bool
     help
       If y, the CPU has an FPU

...

config SOC_FOO
     bool "FOO SoC"
     select CPU_HAS_FPU

...

config SOC_BAR
     bool "BAR SoC"
     select CPU_HAS_FPU
```

This makes it possible for other symbols to check for FPU support in a generic way, without having to look for particular architectures:  
使得其他选项使用通用方法去检查FPU是否支持，而无需查找特定的架构。

```
config FPU
     bool "Support floating point operations"
     depends on CPU_HAS_FPU
```

The alternative would be to have dependencies like the following, possibly duplicated in several spots:  
另外一种方法是可能在若干个位置重复设置如下依赖关系:
```
config FPU
     bool "Support floating point operations"
     depends on SOC_FOO || SOC_BAR || ...
```

Invisible helper symbols can also be useful without select. For example, the following code defines a helper symbol that has the value y if the machine has some arbitrarily-defined “large” amount of memory:  
不可见帮助选项没有`select`也可以有用。例如：下面的代码定义了一个帮助符号，如果机器有一些任意定义的"large"内存量，则该选项的值为`y`:
```
config LARGE_MEM
     def_bool MEM_SIZE >= 64
``` 

:::info
这是以下内容的缩写
```
config LARGE_MEM
  bool
  default MEM_SIZE >= 64
```
:::

### <span id="sr">`select`建议</span>

In summary, here are some recommended practices for select:  
这里有一些`select`推荐用法：

* Avoid selecting symbols with prompts or dependencies. Prefer depends on. If depends on causes annoying bloat in configuration files, consider adding a Kconfig default for the most common value.

Rare exceptions might include cases where you’re sure that the dependencies of the selecting and selected symbol will never drift out of sync, e.g. when dealing with two simple symbols defined close to one another within the same if.

Common sense applies, but be aware that select often causes issues in practice. depends on is usually a cleaner and safer solution.

* 避免选择带有提示符或依赖关系的选项. 宁愿`depends on` .如果配置文件中的`depends on`过于麻烦，可以考虑最常见的值添加到Kconfig默认值。
极少数情况例外，包括可能你确认选择中和已选择的选项的依赖关系永远同步。例如，当处理在同一个`if`中彼此相邻定义的两个简单选项时。
这是常识，但要注意`select`通常在实践中引起问题。最干净和安全的解决方式是使用`depends on`。

## <span id="loci">(缺乏)有条件包含</span>

if blocks add dependencies to each item within the if, as if depends on was used.  
`if`块将每个依赖项添加到`if`项里面，就像`depends on`使用。

A common misunderstanding related to if is to think that the following code conditionally includes the file Kconfig.other:  
有关`if`一个常见的误解是认为下面代码有条件地包含`Kconfig.other`文件。

```
if DEP
source "Kconfig.other"
endif
```

In reality, there are no conditional includes in Kconfig. if has no special meaning around a source.  
实际上，它们没有条件包含在Kconfig，`if`对于`source`来说没有特殊意义。

:::info
Conditional includes would be impossible to implement, because if conditions may contain (either directly or indirectly) forward references to symbols that haven’t been defined yet.  
条件包含将无法实现，因为`if`条件可能包含（直接或间接）对尚未定义的选项向前引用。
:::

Say that Kconfig.other above contains this definition:  
假设上面`Kconfig.other`包含这个定义：
```
config FOO
     bool "Support foo"
```

In this case, FOO will end up with this definition:  
在这种情况下，`FOO`最终会得到这个定义：
```
config FOO
     bool "Support foo"
     depends on DEP
```

Note that it is redundant to add depends on DEP to the definition of FOO in Kconfig.other, because the DEP dependency has already been added by if DEP.  
注意的是，在`Kconfig.other`中，将`DEP`依赖添加到`FOO`的定义中是多余的，因为DEP依赖项已经由`if DEP`添加了。

In general, try to avoid adding redundant dependencies. They can make the structure of the Kconfig files harder to understand, and also make changes more error-prone, since it can be hard to spot that the same dependency is added twice.  
一般来说，尽量避免添加冗余依赖项。它们会使Kconfig文件的结构更难理解，也会使更改更容易出错，因为很难发现相同的依赖项被添加了两次。

## <span id="ssimag">menuconfig 和 guiconfig中的"stuck"选项</span>

There is a common subtle gotcha related to interdependent configuration symbols with prompts. Consider these symbols:
有一个常见的问题与相互依赖的配置选项与提示有关:

```
config FOO
     bool "Foo"

config STACK_SIZE
     hex "Stack size"
     default 0x200 if FOO
     default 0x100
```

Assume that the intention here is to use a larger stack whenever FOO is enabled, and that the configuration initially has FOO disabled. Also, remember that Zephyr creates an initial configuration in zephyr/.config in the build directory by merging configuration files (including e.g. prj.conf). This configuration file exists before menuconfig or guiconfig is run.  
假设这里的目的是在`FOO`启用时使用更大的堆栈，并且配置最初禁用了`FOO`。另外记住，zephyr通过合并配置文件（包括 prj.conf）在构建项目中创建初始配置。此配置文件在运行`menuconfig`或`guiconfig`之前就存在。

When first entering the configuration interface, the value of STACK_SIZE is 0x100, as expected. After enabling FOO, you might reasonably expect the value of STACK_SIZE to change to 0x200, but it stays as 0x100.  
第一次进入配置界面时，`STACK_SIZE`的值是0x100。启用`FOO`后，你认为`STACK_SIZE`的值更改为0x200，但它仍保持0x100。

To understand what’s going on, remember that STACK_SIZE has a prompt, meaning it is user-configurable, and consider that all Kconfig has to go on from the initial configuration is this:  
要了解发生了什么，请记住`STACK_SIZE`有一个提示符，这意味着它可以由用户配置，考虑到所有Kconfig必须从初始配置开始，如下所示：
```
CONFIG_STACK_SIZE=0x100
```

Since Kconfig can’t know if the 0x100 value came from a default or was typed in by the user, it has to assume that it came from the user. Since STACK_SIZE is user-configurable, the value from the configuration file is respected, and any symbol defaults are ignored. This is why the value of STACK_SIZE appears to be “frozen” at 0x100 when toggling FOO.  
由于Kconfig无法知道0x100的值来自默认值还是用户输入的，所以它必须假设它来自用户输入。由于`STACK_SIZE`是用户可配置的，因此应遵循配置文件中的值，并忽略任何符号的默认值。这就是为什么在切换`FOO`时`STACK_SIZE`仍保持在`0x100`的原因

The right fix depends on what the intention is. Here’s some different scenarios with suggestions:  
正确的解决方法取决你想做什么，下面是一些不同场景和建议:

* If STACK_SIZE can always be derived automatically and does not need to be user-configurable, then just remove the prompt:
* 如果 `STACK_SIZE` 始终可以无需用户配置自动获得，则只要删除提示符：
    ```
    config STACK_SIZE
        hex
        default 0x200 if FOO
        default 0x100
    ```
    Symbols without prompts ignore any value from the saved configuration.  
    没有提示符的选项会忽略已保存在配置中的任何值。

* If STACK_SIZE should usually be user-configurable, but needs to be set to 0x200 when FOO is enabled, then disable its prompt when FOO is enabled, as described in optional prompts:
* 如果`STACK_SIZE`通常是用户配置，但在启用`FOO`时需要设置0x200，那么在启用`FOO`时禁用它的提示符，如[可选提示符]中所述：  
    ```
    config STACK_SIZE
        hex "Stack size" if !FOO
        default 0x200 if FOO
        default 0x100
    ```

* If STACK_SIZE should usually be derived automatically, but needs to be set to a custom value in rare circumstances, then add another option for making STACK_SIZE user-configurable:  
* 如果`STACK_SIZE`通常是自动获得，但在极少数情况下需要设置为自定义值，则在另一个选项中使`STACK_SIZE`成为用户配置选项：
    ```
    config CUSTOM_STACK_SIZE
        bool "Use a custom stack size"
        help
            Enable this if you need to use a custom stack size. When disabled, a
            suitable stack size is calculated automatically.

    config STACK_SIZE
        hex "Stack size" if CUSTOM_STACK_SIZE
        default 0x200 if FOO
        default 0x100
    ```
    As long as CUSTOM_STACK_SIZE is disabled, STACK_SIZE will ignore the value from the saved configuration.  
    只要禁用`CUSTOM_STACK_SIZE`，`STACK_SIZE`就会忽略保存在配置中的值。

It is a good idea to try out changes in the menuconfig or guiconfig interface, to make sure that things behave the way you expect. This is especially true when making moderately complex changes like these.  
尝试在`menuconfig`界面中进行更改配置是一种好的方式，它能确保你的配置能按照你的预期方式运行。这在进行类似这样复杂的配置更改时尤为重要。

## <span id="atpsicf">对配置文件中非提示选项的赋值</span>

Assignments to hidden (promptless, also called invisible) symbols in configuration files are always ignored. Hidden symbols get their value indirectly from other symbols, via e.g. default and select.  
对配置文件中的非提示符号（或不可见符号）的赋值总是被忽略。非提示符号通过如`default`和间接从`select`其他选项获取。


A common source of confusion is opening the output configuration file (zephyr/.config), seeing a bunch of assignments to hidden symbols, and assuming that those assignments must be respected when the configuration is read back in by Kconfig. In reality, all assignments to hidden symbols in zephyr/.config are ignored by Kconfig, like for other configuration files.  
造成混乱的一个原因是打开输出的配置文件(`zephyr/.config`)，查看隐藏符号的一系列赋值，并当配置被 Kconfig 读回时必须遵循这些赋值。实际上，对于`zephyr/.config`中的隐藏符号与其他配置文件的所有赋值一样，都会被忽略。

To understand why zephyr/.config still includes assignments to hidden symbols, it helps to realize that zephyr/.config serves two separate purposes:  
要理解为什么 `zephyr/.config` 仍然包含对隐藏符号的赋值，可以知道 `zephyr/.config` 有两个不同的用途:

:::info
A minimal configuration, which can be generated from within the menuconfig interfaces, could be considered closer to just a saved configuration, without the full configuration output.
可以从menuconfig中生成更接近保存配置的最小配置，而不需要完成的配置输出。
:::

## <span id="doass">`depends on` 和 `string/int/hex` </span>

depends on works not just for bool symbols, but also for string, int, and hex symbols (and for choices).  
`depends on` 不仅能使用`bool`符号，还能使用`string`、`int`和`hex`符号（以及choices）.

The Kconfig definitions below will hide the FOO_DEVICE_FREQUENCY symbol and disable any configuration output for it when FOO_DEVICE is disabled.  
下面的Kconfig定义将隐藏`FOO_DEVICE_FREQUENCY`符号，并禁用`FOO_DEVICE`时禁用该选项的任何输出。
```
config FOO_DEVICE
     bool "Foo device"

config FOO_DEVICE_FREQUENCY
     int "Foo device frequency"
     depends on FOO_DEVICE
```
In general, it’s a good idea to check that only relevant symbols are ever shown in the menuconfig/guiconfig interface. Having FOO_DEVICE_FREQUENCY show up when FOO_DEVICE is disabled (and possibly hidden) makes the relationship between the symbols harder to understand, even if code never looks at FOO_DEVICE_FREQUENCY when FOO_DEVICE is disabled.  
通常，检查 `menuconfig` 界面中是否只显示相关选项时一个好的方案。当`FOO_DEVICE` 被禁用（隐藏），`FOO_DEVICE_FREQUENCY`显示会让选项之间的关系更难理解。即使代码在禁用`FOO_DEVICE`时从不查看`FOO_DEVICE_FREQUENCY`。


## <span id="ms">`menuconfig` 选项 </span>

If the definition of a symbol FOO is immediately followed by other symbols that depend on FOO, then those symbols become children of FOO. If FOO is defined with config FOO, then the children are shown indented relative to FOO. Defining FOO with menuconfig FOO instead puts the children in a separate menu rooted at FOO.  
如果选项`FOO`的定义后面跟着其他依赖`FOO`的选项，那么这些选项就成为`FOO`的子项。如果`FOO`定义为`config FOO` ,则子项在`FOO`中将缩进显示。使用`menuconfig FOO`定义的`FOO`，取而代之的是把子菜单放在`FOO`的独立菜单中。

menuconfig has no effect on evaluation. It’s just a display option.  
`menuconfig`对定值没有影响，它只是一个显示选项。

menuconfig can cut down on the number of menus and make the menu structure easier to navigate. For example, say you have the following definitions:  
menuconfig可以减少菜单的数量，使菜单结构更容易导航。例如，假设你有以下定义：

```
menu "Foo subsystem"

config FOO_SUBSYSTEM
     bool "Foo subsystem"

if FOO_SUBSYSTEM

config FOO_FEATURE_1
     bool "Foo feature 1"

config FOO_FEATURE_2
     bool "Foo feature 2"

config FOO_FREQUENCY
     int "Foo frequency"

... lots of other FOO-related symbols

endif # FOO_SUBSYSTEM

endmenu
```

In this case, it’s probably better to get rid of the menu and turn FOO_SUBSYSTEM into a menuconfig symbol:  
在这种情况下，最好去掉`menu`并把`FOO_SUBSYSTEM`转为`menuconfig`选项。

```
menuconfig FOO_SUBSYSTEM
     bool "Foo subsystem"

if FOO_SUBSYSTEM

config FOO_FEATURE_1
     bool "Foo feature 1"

config FOO_FEATURE_2
     bool "Foo feature 2"

config FOO_FREQUENCY
     int "Foo frequency"

... lots of other FOO-related symbols

endif # FOO_SUBSYSTEM
```

In the menuconfig interface, this will be displayed as follows:  
在`menuconfig`界面中显示如下：
```
[*] Foo subsystem  --->
```

Note that making a symbol without children a menuconfig is meaningless. It should be avoided, because it looks identical to a symbol with all children invisible:  
值得注意的是，将没有子元素的选项设为菜单配置没有意义。应该避免使用，因为它看起来跟所有子项一样，都不可见：
```
[*] I have no children  ----
[*] All my children are invisible  ----
```

## <span id="ccimg">检查 menuconfig/guiconfig 中的更改</span>

When adding new symbols or making other changes to Kconfig files, it is a good idea to look up the symbols in menuconfig or guiconfig afterwards. To get to a symbol quickly, use the jump-to feature (press /).  
在添加新的符号或对 Kconfig 文件进行其他更改时，最好随后在 [menuconfig](Kconfig_gui.md) 或 guiconfig 中查找这些符号。要快速获得一个符号，使用跳转功能(按`/`)。

Here are some things to check:  
以下是一些需要检查的事项：

* Are the symbols placed in a good spot? Check that they appear in a menu where they make sense, close to related symbols.
  If one symbol depends on another, then it’s often a good idea to place it right after the symbol it depends on. It will then be shown indented relative to the symbol it depends on in the menuconfig interface. This also works if several symbols are placed after the symbol they depend on.
* 这些符号放在合适的位置了吗？检查它们是否出现在菜单中靠近相关的选项有意义的地方。
  如果一个选项依赖于另一个选项，那么把它放在它所依赖的选项之后通常是个好的方式。
  在`menuconfig`界面中，它所依赖的选项将缩紧显示。如果把若干个选项放在它们以来的选项之后，也可以这样做。

* Is it easy to guess what the symbols do from their prompts?
* 是否容易从提示符中猜出选项的作用？
* If many symbols are added, do all combinations of values they can be set to make sense?
  For example, if two symbols FOO_SUPPORT and NO_FOO_SUPPORT are added, and both can be enabled at the same time, then that makes a nonsensical configuration. In this case, it’s probably better to have a single FOO_SUPPORT symbol.
* 如果添加了很多选项，它们所有值的组合是否有意义？
  例如：如果添加了两个符号`FOO_SUPPORT`和`NO_FOO_SUPPORT`,并且两个选项都同时启用，那么这样的配置就毫无意义。在这种情况下，最好使用单个`FOO_SUPPORT`。

* Are there any duplicated dependencies?
  This can be checked by selecting a symbol and pressing ? to view the symbol information. If there are duplicated dependencies, then use the Included via ... path shown in the symbol information to figure out where they come from.  

* 是否有任何重复的依赖项？
  这可以通过选择一个选项和按`?`查看选项信息来检查。如果存在重复的依赖关系，那么使用选项信息中显示`included via ...`路径来确认它们的来源。

## <span id="ccws">检查更改 `scripts/kconfig/lint.py`</span>

After you make Kconfig changes, you can use the scripts/kconfig/lint.py script to check for some potential issues, like unused symbols and symbols that are impossible to enable. Use --help to see available options.   
更改Kconfig后，可以使用[scripts/kconfig/lint.py](https://github.com/zephyrproject-rtos/zephyr/blob/main/scripts/kconfig/lint.py)脚本来检查一些潜在问题，例如未使用的和无法启用的选项。使用`--help`查看可用选项。


Some checks are necessarily a bit heuristic, so a symbol being flagged by a check does not necessarily mean there’s a problem. If a check returns a false positive e.g. due to token pasting in C (CONFIG_FOO_##index##_BAR), just ignore it.  
有些检查必然带有一点启发性，因此检查标记的选项并不一定意味着存在问题。如果检查返回一个假建议，例如由于标记粘贴在C`(CONFIG_FOO_##index##_BAR)`中，那么就忽略它。

When investigating an unknown symbol FOO_BAR, it is a good idea to run git grep FOO_BAR to look for references. It is also a good idea to search for some components of the symbol name with e.g. git grep FOO and git grep BAR, as it can help uncover token pasting.  
当研究未知选项 `FOO_BAR` 时，最好执行`git grep FOO_BAR`来查找引用，使用`git grep FOO`和`git grep BAR`搜索选项名的某些组件也是一个好的方式，因为它可以帮助发现标记黏贴。

## <span id="sras">风格建议和简写</span>

This section gives some style recommendations and explains some common Kconfig shorthands.  
本节提供一些样式建议，并解释一些常见的 Kconfig 简写。

### <span id="focd">分解常见的依赖项</span>

If a sequence of symbols/choices share a common dependency, the dependency can be factored out with an if.  
如果一系列符号/选项共用一个公共依赖项，可以使用`if`。

As an example, consider the following code:  
例如，考虑以下代码：

```
config FOO
     bool "Foo"
     depends on DEP

config BAR
     bool "Bar"
     depends on DEP

choice
     prompt "Choice"
     depends on DEP

config BAZ
     bool "Baz"

config QAZ
     bool "Qaz"

endchoice
```

Here, the DEP dependency can be factored out like this:  
在这里，`DEP` 依赖关系可以像下面这样分解:

```
if DEP

config FOO
     bool "Foo"

config BAR
     bool "Bar"

choice
     prompt "Choice"

config BAZ
     bool "Baz"

config QAZ
     bool "Qaz"

endchoice

endif # DEP
```

:::info
Internally, the second version of the code is transformed into the first.  
在代码内部的第二个版本转换为第一个版本。
:::

If a sequence of symbols/choices with shared dependencies are all in the same menu, the dependency can be put on the menu itself:  
如果具有共用依赖关系的一系列符号/选项都在同一个菜单中，那么这个依赖关系可以放在菜单本身上:
```
menu "Foo features"
     depends on FOO_SUPPORT

config FOO_FEATURE_1
     bool "Foo feature 1"

config FOO_FEATURE_2
     bool "Foo feature 2"

endmenu
```

If `FOO_SUPPORT` is `n`, the entire menu disappears.
如果 `FOO_SUPPORT` 为 `n`，则整个菜单都会消失。

### <span id="rd">冗余默认值</span>

bool symbols implicitly default to n, and string symbols implicitly default to the empty string. Therefore, default n and default "" are (almost) always redundant.  
`bool`符号隐式默认为`n`，`string`符号隐式默认为空字符串。因此`default n` 和 `default ""` 是冗余的。


The recommended style in Zephyr is to skip redundant defaults for bool and string symbols. That also generates clearer documentation: (Implicitly defaults to n instead of n if <dependencies, possibly inherited>).  
csk6中推荐的样式是跳过`bool`和`string`符号的冗余默认值。这也生成了更清晰的文档：（如果<dependencies, possibly inherited>，则隐式默认为n而不是n）。

:::info 
The one case where default n/default "" is not redundant is when defining a symbol in multiple locations and wanting to override e.g. a default y on a later definition.  
默认值`default n `/` default ""`不冗余的一种情况是在若干个位置定义选项，并希望在以后的定义中覆盖默认值`y`。
:::

Defaults should always be given for int and hex symbols, however, as they implicitly default to the empty string. This is partly for compatibility with the C Kconfig tools, though an implicit 0 default might be less likely to be what was intended compared to other symbol types as well.  
但是，应该始终为 `int` 和 `hex` 符号提供默认值，因为它们隐式默认为空字符串。这在一定程度上是为了与 C Kconfig 工具兼容，尽管与其他符号类型相比，隐式的0默认值不太可能达到预期效果.

### <span id="cks">常用Kconfig和简写</span>

Kconfig has two shorthands that deal with prompts and defaults.  
Kconfig 有两个处理提示和默认值的简写。

* `<type> "prompt" is a shorthand` for giving a symbol/choice a type and a prompt at the same time. These two definitions are equal:  
* `<type> "prompt"` 是同时提供符号/选择类型和提示符的简写。这两个定义是相等的:
  ```
  config FOO
    bool "foo"
  ```
  ```
  config FOO
    bool
    prompt "foo"
  ```

  The first style, with the shorthand, is preferred in Zephyr.  
  csk中首选第一种样式，它更简短。

* `def_<type> <value>` is a shorthand for giving a type and a value at the same time. These two definitions are equal:
* `def_<type> <value>` 是同时给出类型和值的缩写。这两个定义是相等的：
  ```
  config FOO
    def_bool BAR && BAZ
  ```
  ```
  config FOO
    bool
    default BAR && BAZ
  ```

Using both the `<type> "prompt"` and the `def_<type> <value>` shorthand in the same definition is redundant, since it gives the type twice.  
在同一个定义中同时使用 `<type> "prompt"`和 `def_<type> <value>` 简写是多余的，因为它给出了两次类型。

The `def_<type> <value>` shorthand is generally only useful for symbols without prompts, and somewhat obscure.  
`def_<type> <value>`简写通常只对没有提示符的选项有用，而且不容易理解。

:::info 
For a symbol defined in multiple locations (e.g., in a Kconfig.defconfig file in Zephyr), it is best to only give the symbol type for the “base” definition of the symbol, and to use default (instead of `def_<type> value`) for the remaining definitions. That way, if the base definition of the symbol is removed, the symbol ends up without a type, which generates a warning that points to the other definitions. That makes the extra definitions easier to discover and remove.  
在多个位置定义选项（例如在csk中的`Kconfig.defconfig`）,最好只为该选项的“base”定义提供符号类型，并对其余定义使用 `default` (而不是 `def_<type> value`)。这样，如果删除了该选项的基本定义，则该符号最终将没有类型，该类型将生成指向其他定义的警告。这使得额外的定义更容易发现和删除。
:::

### <span id="ps">提示字符串</span>

For a Kconfig symbol that enables a driver/subsystem FOO, consider having just “Foo” as the prompt, instead of “Enable Foo support” or the like. It will usually be clear in the context of an option that can be toggled on/off, and makes things consistent.
