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
对配置文件中的非提示符号（或不可见符号）的赋值总是被忽略。非提示符号通过例如`default`和间接从`select`其他选项获取。

