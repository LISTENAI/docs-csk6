# 小贴士与最佳实践

本篇涵盖了一些 Kconfig 最佳实践，并解释了一些 Kconfig 难以理解和容易忽略的作用和特性。

:::info 注意
官方的Kconfig文档是 [kconfig-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html) 和 [kconfig-macro-language.rst](https://www.kernel.org/doc/html/latest/kbuild/kconfig-macro-language.html).  
:::

* [什么可以变为 Kconfig 的选项](#wttiko)
* [什么不可以变为 Kconfig 的选项](#wnttiko)
    - [启用单个设备的选项](#oeid)
    - [按名称指定系统中设备的选项](#otsaditsbn)
    - [按指定固件硬件配置选项](#otsfhc)
* [`select` 语句](#ss)
    - [`select` 陷阱](#sp)
    - [`select` 备用方案](#ats)
    - [使用 `select` 帮助选项](#usfhs)
    - [`select` 建议](#sr)
* [(缺乏)有条件引用](#loci)
*  [menuconfig 和 guiconfig中的"stuck"选项](#ssimag)
*  [对配置文件中非提示选项的赋值](#atpsicf)
*  [`depends on` 和 `string/int/hex` 选项](#doass)
*  [`menuconfig` 选项](#ms)
*  [检查 menuconfig/guiconfig 中的更改](#ccimg)
*  [检查更改 `scripts/kconfig/lint.py`](#ccws)
*  [风格建议和简写](#sras)
    - [分解常见的依赖项](#focd)
    - [冗余默认值](#rd)
    - [常用的 Kconfig 简写](#cks)
    - [提示字符串](#ps)
    - [标题注释和其他细节](#hcaon)
* [使用频率较低的 Kconfig 特性](#lkkf)
    - [imply 声明](#tis)
    - [可选提示符](#op)
    - [可选选项](#oc)
    - [`visible if` 条件](#vic)
* [其他资源](#or)

## <span id="wttiko">什么能变为 Kconfig 的选项</span>

在决定某物是否属于 Kconfig 时，这个判断依据有助于区分有提示的符号和没有提示的符号。

如果有提示选项（例如 `bool "Enable foo"`）那么用户可以在 menuconfig 或 guiconfig 界面中更改选项的值(参考 [Kconfig 交互界面](./Kconfig_gui.md)) ，或者手动编辑配置文件。

只有用户更改选项值有作用时，才在选项上放提示。

没有提示的选项称为不可见选项，因为它们不显示在 `menuconfig` 和 `guiconfig` 中。具有提示的选项如果不满足它们的依赖关系时，也可能是不可见的。

没有提示的选项不能由用户直接配置（它们的值来自其他选项），因此对它们的限制较少。如果某些派生设置在Kconfig中进行运算比构建时更容易，则在Kconfig中进行，但要记住有提示和无提示选项之间的区别。

请参考 [可选提示](#op) 部分，用于处理某些设备上固定的设置和其他设备上可配置的设置。

## <span id="wnttiko">什么不能变为 Kconfig 的选项</span>

在csk6系列中，Kconfig配置是在选择板型后完成的。一般来说，将Kconfig用于对应于固定设备特定设置的值是没有用的。通常，这类设置应该通过设备树去处理。

特别是避免添加以下类型的Kconfig选项:

### <span id="oeid">启用单个设备的选项</span>

在csk6支持设备树之前已经介绍了[CONFIG_I2C_0](#) 和 [CONFIG_I2C_1](#)等示例，不鼓励使用新的示例。有关如何使用设备树操作的详细信息，请参考 [设备树api编写设备驱动程序](#)。

### <span id="otsaditsbn">按名称指定系统中设备的选项</span>

举个例子，当你正在编写 I2C 设备驱动程序，请避免创建一个名为`MY_DEVICE_I2C_BUS_NAME`去指定设备控制的总线节点。可以使用以下替代方案，请参考[依赖其他设备的驱动程序](#)。

同样，如果你的应用依赖于特定硬件的PWM设备来控制RGB LED,请避免创建`MY_PWM_DEVICE_NAME`这样的选项，请参考 [依赖特定板型设备的应用程序](#)

### <span id="otsfhc">按指定固件硬件配置选项</span>
 
例如，避免Kconfig选项指定GPIO引脚。

一种可代替的方法是设备驱动程序在设备绑定中定义类型为 phandle-array 并使用C语言的GPIO设备树API。类似的建议也适用于 devicetree.h 为引用系统中的其他节点提供[特定硬件API](#)的其他情况。例如，在源代码中搜索使用这些 API 的驱动程序。

可以使用特定应用程序的设备树[绑定](#)来标记board的特定属性。有关示例，请参考[tests/drivers/gpio/gpio_basic_api](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/tests/drivers/gpio/gpio_basic_api)

有关的应用程序，请参考 [Blinky](#) 了解基于设备树的替代方案。

### <span id="ss">`select` 语句</span>

Select 语句用于一个选项是 `y`时强制另外一个选项为`y`。例如，下面的代码在 `USB_CONSOLE` 是 `y`的时候强制 `CONSOLE`为`y`:

```
config CONSOLE
     bool "Console support"

...

config USB_CONSOLE
     bool "USB console support"
     select CONSOLE
```

本节介绍一些Select的陷阱和好用的方法。

### <span id="sp">`select` 陷阱</span>

`select` 一开始就像一个常用的功能，但是过度使用可能会导致配置问题。

例如，假设一个不知道（或者只是忘记了） USB_CONSOLE 选项的开发者在 CONSOLE选项添加一个新的依赖：
```
config CONSOLE
     bool "Console support"
     depends on STRING_ROUTINES
```
 
即使`STRING_ROUTINES`为`n`的时候，启用`USB_CONSOLE`也会强制`CONSOLE`为`y`。
 
为了解决这个问题，还需要把`STRING_ROUTINES` 依赖添加到 `USB_CONSOLE`。

```
config USB_CONSOLE
     bool "USB console support"
     select CONSOLE
     depends on STRING_ROUTINES

...

config STRING_ROUTINES
     bool "Include string routines"
```
 
从`if`和`menu`语句中继承的依赖关系更加隐蔽，这种情况很常见。

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

实际上，这通常会放大问题，因为任何添加到`STRING_ROUTINES`的依赖选项现在都需要复制到`CONSOLE` 和 `USB_CONSOLE`.

通常，每当更新选项依赖时，（直接或间接）选择它的所有选项的依赖关系都必须更新。即使对于上面最简单的情况来说，这在实践中也经常被忽视。

除了简单的辅助选项, 特别要避免互相选择的选项链，如下面的[使用`select`辅助选项](#usfhs)

自由使用`select`还会使kconfig文件难以阅读，这是既由于额外的依赖关系，也是由于`select`非本地性质造成的，它隐藏了可能启用选项的方式。

### <span id="ats">`select` 备用方案</span>

对于上面示例，更好的解决方案是通常把`select`转变为`depends on`:
```
config CONSOLE
     bool "Console support"

...

config USB_CONSOLE
     bool "USB console support"
     depends on CONSOLE
```

这就不可能生成无效配置，并且只需要一个地方更新依赖关系即可。

是否反对使用`depends on`,取决于配置文件需要启用`USB_CONSOLE`也需要启用`CONSOLE`:  

```
CONFIG_CONSOLE=y
CONFIG_USB_CONSOLE=y
```

归根结底是一种权衡，但是如果启用`CONSOLE`是规范，那么缓解措施是使`CONSOLE`默认为`y`:
```
config CONSOLE
     bool "Console support"
     default y
```

这只在配置文件中给出一个赋值:
```
CONFIG_USB_CONSOLE=y
```

请注意，不想启用 `CONSOLE` 的配置文件必须明确禁止它:
```
CONFIG_CONSOLE=n
```

### <span id="usfhs">使用`select`帮助选项</span>

`select` 一个安全好用的用法是设置捕捉某些条件的“帮助”选项。这样的辅助选项最好没有提示符和依赖关系。

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

使得其他选项使用通用方法去检查FPU是否支持，而无需查找特定的架构。

```
config FPU
     bool "Support floating point operations"
     depends on CPU_HAS_FPU
```

另外一种方法是可能在若干个位置重复设置如下依赖关系:
```
config FPU
     bool "Support floating point operations"
     depends on SOC_FOO || SOC_BAR || ...
```

不可见帮助选项没有`select`也可以有用。例如：下面的代码定义了一个帮助符号，如果机器有一些任意定义的"large"内存量，则该选项的值为`y`:
```
config LARGE_MEM
     def_bool MEM_SIZE >= 64
``` 

:::info 注意
这是以下内容的缩写
```
config LARGE_MEM
  bool
  default MEM_SIZE >= 64
```
:::

### <span id="sr">`select`建议</span>

这里有一些`select`推荐用法：

* 避免选择带有提示符或依赖关系的选项. 宁愿`depends on` .如果配置文件中的`depends on`过于麻烦，可以考虑最常见的值添加到Kconfig默认值。  
  
     极少数情况例外，包括可能你确认选择中和已选择的选项的依赖关系永远同步。例如，当处理在同一个`if`中彼此相邻定义的两个简单选项时。  

     这是常识，但要注意`select`通常在实践中引起问题。最干净和安全的解决方式是使用`depends on`。

## <span id="loci">(缺乏)有条件包含</span>

`if`块将每个依赖项添加到`if`项里面，就像`depends on`使用。

有关`if`一个常见的误解是认为下面代码有条件地包含`Kconfig.other`文件。

```
if DEP
source "Kconfig.other"
endif
```

实际上，它们没有条件包含在Kconfig，`if`对于`source`来说没有特殊意义。

:::info 注意
条件包含将无法实现，因为`if`条件可能包含（直接或间接）对尚未定义的选项向前引用。
:::
 
假设上面`Kconfig.other`包含这个定义：
```
config FOO
     bool "Support foo"
```

在这种情况下，`FOO`最终会得到这个定义：
```
config FOO
     bool "Support foo"
     depends on DEP
```

注意的是，在`Kconfig.other`中，将`DEP`依赖添加到`FOO`的定义中是多余的，因为DEP依赖项已经由`if DEP`添加了。

一般来说，尽量避免添加冗余依赖项。它们会使Kconfig文件的结构更难理解，也会使更改更容易出错，因为很难发现相同的依赖项被添加了两次。

## <span id="ssimag">menuconfig 和 guiconfig中的"stuck"选项</span>

有一个常见的问题与相互依赖的配置选项与提示有关:

```
config FOO
     bool "Foo"

config STACK_SIZE
     hex "Stack size"
     default 0x200 if FOO
     default 0x100
```

假设这里的目的是在`FOO`启用时使用更大的堆栈，并且配置最初禁用了`FOO`。另外记住，zephyr通过合并配置文件（包括 prj.conf）在构建项目中创建初始配置。此配置文件在运行`menuconfig`或`guiconfig`之前就存在。

第一次进入配置界面时，`STACK_SIZE`的值是0x100。启用`FOO`后，你认为`STACK_SIZE`的值更改为0x200，但它仍保持0x100。

要了解发生了什么，请记住`STACK_SIZE`有一个提示符，这意味着它可以由用户配置，考虑到所有Kconfig必须从初始配置开始，如下所示：
```
CONFIG_STACK_SIZE=0x100
```

由于Kconfig无法知道0x100的值来自默认值还是用户输入的，所以它必须假设它来自用户输入。由于`STACK_SIZE`是用户可配置的，因此应遵循配置文件中的值，并忽略任何符号的默认值。这就是为什么在切换`FOO`时`STACK_SIZE`仍保持在`0x100`的原因

正确的解决方法取决你想做什么，下面是一些不同场景和建议:

* 如果 `STACK_SIZE` 始终可以无需用户配置自动获得，则只要删除提示符：
    ```
    config STACK_SIZE
        hex
        default 0x200 if FOO
        default 0x100
    ```
    Symbols without prompts ignore any value from the saved configuration.  
    没有提示符的选项会忽略已保存在配置中的任何值。

* 如果`STACK_SIZE`通常是用户配置，但在启用`FOO`时需要设置0x200，那么在启用`FOO`时禁用它的提示符，如[可选提示符]中所述：  
    ```
    config STACK_SIZE
        hex "Stack size" if !FOO
        default 0x200 if FOO
        default 0x100
    ```

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
 
    只要禁用`CUSTOM_STACK_SIZE`，`STACK_SIZE`就会忽略保存在配置中的值。

尝试在`menuconfig`界面中进行更改配置是一种好的方式，它能确保你的配置能按照你的预期方式运行。这在进行类似这样复杂的配置更改时尤为重要。

## <span id="atpsicf">对配置文件中非提示选项的赋值</span>

对配置文件中的非提示符号（或不可见符号）的赋值总是被忽略。非提示符号通过如`default`和间接从`select`其他选项获取。

造成混乱的一个原因是打开输出的配置文件(`zephyr/.config`)，查看隐藏符号的一系列赋值，并当配置被 Kconfig 读回时必须遵循这些赋值。实际上，对于`zephyr/.config`中的隐藏符号与其他配置文件的所有赋值一样，都会被忽略。

要理解为什么 `zephyr/.config` 仍然包含对隐藏符号的赋值，可以知道 `zephyr/.config` 有两个不同的用途:

:::info 注意
可以从menuconfig中生成更接近保存配置的最小配置，而不需要完成的配置输出。
:::

## <span id="doass">`depends on` 和 `string/int/hex` </span>

`depends on` 不仅能使用`bool`符号，还能使用`string`、`int`和`hex`符号（以及choices）.
 
下面的Kconfig定义将隐藏`FOO_DEVICE_FREQUENCY`符号，并禁用`FOO_DEVICE`时禁用该选项的任何输出。
```
config FOO_DEVICE
     bool "Foo device"

config FOO_DEVICE_FREQUENCY
     int "Foo device frequency"
     depends on FOO_DEVICE
```

通常，检查 `menuconfig` 界面中是否只显示相关选项时一个好的方案。当`FOO_DEVICE` 被禁用（隐藏），`FOO_DEVICE_FREQUENCY`显示会让选项之间的关系更难理解。即使代码在禁用`FOO_DEVICE`时从不查看`FOO_DEVICE_FREQUENCY`。


## <span id="ms">`menuconfig` 选项 </span>

如果选项`FOO`的定义后面跟着其他依赖`FOO`的选项，那么这些选项就成为`FOO`的子项。如果`FOO`定义为`config FOO` ,则子项在`FOO`中将缩进显示。使用`menuconfig FOO`定义的`FOO`，取而代之的是把子菜单放在`FOO`的独立菜单中。

`menuconfig`对定值没有影响，它只是一个显示选项。

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

在`menuconfig`界面中显示如下：
```
[*] Foo subsystem  --->
```
 
值得注意的是，将没有子元素的选项设为菜单配置没有意义。应该避免使用，因为它看起来跟所有子项一样，都不可见：
```
[*] I have no children  ----
[*] All my children are invisible  ----
```

## <span id="ccimg">检查 menuconfig/guiconfig 中的更改</span>

在添加新的符号或对 Kconfig 文件进行其他更改时，最好随后在 [menuconfig](Kconfig_gui.md) 或 guiconfig 中查找这些符号。要快速获得一个符号，使用跳转功能(按`/`)。

以下是一些需要检查的事项：

* 这些符号放在合适的位置了吗？检查它们是否出现在菜单中靠近相关的选项有意义的地方。
  如果一个选项依赖于另一个选项，那么把它放在它所依赖的选项之后通常是个好的方式。
  在`menuconfig`界面中，它所依赖的选项将缩紧显示。如果把若干个选项放在它们以来的选项之后，也可以这样做。

* 是否容易从提示符中猜出选项的作用？

* 如果添加了很多选项，它们所有值的组合是否有意义？
  例如：如果添加了两个符号`FOO_SUPPORT`和`NO_FOO_SUPPORT`,并且两个选项都同时启用，那么这样的配置就毫无意义。在这种情况下，最好使用单个`FOO_SUPPORT`。

* 是否有任何重复的依赖项？
  这可以通过选择一个选项和按`?`查看选项信息来检查。如果存在重复的依赖关系，那么使用选项信息中显示`included via ...`路径来确认它们的来源。

## <span id="ccws">检查更改 `scripts/kconfig/lint.py`</span>

更改Kconfig后，可以使用[scripts/kconfig/lint.py](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/scripts/kconfig/lint.py)脚本来检查一些潜在问题，例如未使用的和无法启用的选项。使用`--help`查看可用选项。
 
有些检查必然带有一点启发性，因此检查标记的选项并不一定意味着存在问题。如果检查返回一个假建议，例如由于标记粘贴在C`(CONFIG_FOO_##index##_BAR)`中，那么就忽略它。

当研究未知选项 `FOO_BAR` 时，最好执行`git grep FOO_BAR`来查找引用，使用`git grep FOO`和`git grep BAR`搜索选项名的某些组件也是一个好的方式，因为它可以帮助发现标记黏贴。

## <span id="sras">风格建议和简写</span>
 
本节提供一些样式建议，并解释一些常见的 Kconfig 简写。

### <span id="focd">分解常见的依赖项</span>

如果一系列符号/选项共用一个公共依赖项，可以使用`if`。

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

:::info 注意
在代码内部的第二个版本转换为第一个版本。
:::

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

如果 `FOO_SUPPORT` 为 `n`，则整个菜单都会消失。

### <span id="rd">冗余默认值</span>

`bool`符号隐式默认为`n`，`string`符号隐式默认为空字符串。因此`default n` 和 `default ""` 是冗余的。

csk6中推荐的样式是跳过`bool`和`string`符号的冗余默认值。这也生成了更清晰的文档：（如果<dependencies, possibly inherited>，则隐式默认为n而不是n）。

:::info 注意
默认值`default n `/` default ""`不冗余的一种情况是在若干个位置定义选项，并希望在以后的定义中覆盖默认值`y`。
:::

但是，应该始终为 `int` 和 `hex` 符号提供默认值，因为它们隐式默认为空字符串。这在一定程度上是为了与 C Kconfig 工具兼容，尽管与其他符号类型相比，隐式的0默认值不太可能达到预期效果.

### <span id="cks">常用的 Kconfig 简写</span>

Kconfig 有两个处理提示和默认值的简写。

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

  csk中首选第一种样式，它更简短。

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

在同一个定义中同时使用 `<type> "prompt"`和 `def_<type> <value>` 简写是多余的，因为它给出了两次类型。

`def_<type> <value>`简写通常只对没有提示符的选项有用，而且不容易理解。

:::info 注意   
在多个位置定义选项（例如在csk中的`Kconfig.defconfig`）,最好只为该选项的“base”定义提供符号类型，并对其余定义使用 `default` (而不是 `def_<type> value`)。这样，如果删除了该选项的基本定义，则该符号最终将没有类型，该类型将生成指向其他定义的警告。这使得额外的定义更容易发现和删除。
:::

### <span id="ps">提示字符串</span>

对于启用驱动程序/子系统 FOO 的 Kconfig 选项，请考虑仅使用“FOO”作为提示符，而不是类似“Enable FOO support”之类的命令。它通常在一个选项的上下文是清晰的，这个选项可以打开或关闭，并保持一致。

### <span id="hcaon">标题注释和其他细节</span>

一些格式化上的细节帮助保持一致:

* 将此格式用于`Kconfig`文件顶部的任何标题注释:
  ```
    # <Overview of symbols defined in the file, preferably in plain English>
    (Blank line)
    # Copyright (c) 2019 ...
    # SPDX-License-Identifier: <License>
    (Blank line)
    (Kconfig definitions)
  ```

* 将注释格式化为 `# 评论` 而不是 `#评论`

* 在每个顶部`if`和`endif`之前/之后放一个空行

* 对于每个缩进使用一个tab

* 用两个额外空格缩进帮助文本

## <span id="lkkf">使用频率较低的 Kconfig 特性</span>

本章节列出一些更隐晦的Kconfig行为和特性，它们可能仍然可以派上用场。

### <span id="tis">imply 声明</span>

`imply`语句和`select`类似，但遵循依赖关系并不强制使用值。例如，下面代码可以用在 FOO SoC 上默认启用 USB 键盘支持，同时仍允许用户关闭它：

```
config SOC_FOO
     bool "FOO SoC"
     imply USB_KEYBOARD

...

config USB_KEYBOARD
     bool "USB keyboard support"
```

`imply` 就像一个建议行为，而 `select` 强制使用一个值。

### <span id="op">可选提示符</span>

可以在选项提示符上放一个条件，使用户可以选择配置该条件。例如，`MASK`在某些板型上硬编码为0xFF,而在其他板型上可配置的值可以表示如下：

```
config MASK
     hex "Bitmask" if HAS_CONFIGURABLE_MASK
     default 0xFF
```

:::info 注意 
这是以下内容的简写：
```
config MASK
  hex
  prompt "Bitmask" if HAS_CONFIGURABLE_MASK
  default 0xFF
```
:::

板子选择 `HAS_CONFIGURABLE_MASK` 帮助符号时表明它`MASK`是可配置的。当`MASK`可配置时，它也将默认为0xFF。

### <span id="oc">可选选项</span>

使用关键字`optional`定义选项, 可以不选择任何符号关闭整个选项:

```
choice
     prompt "Use legacy protocol"
     optional

config LEGACY_PROTOCOL_1
     bool "Legacy protocol 1"

config LEGACY_PROTOCOL_2
     bool "Legacy protocol 2"

endchoice
```

在 `menuconfig` 界面中，这会显示为 `[*] Use legacy protocol (Legacy protocol 1) --->` ，例如，可以不使用任何符号关闭选项。

### <span id="vic">`visible if` 条件</span>

在菜单上设置`visible if`会隐藏菜单和里面的所有符号，同时仍然允许符号的默认值生效。
  
作为一个示例，可以考虑以下代码：

```
menu "Foo subsystem"
     depends on HAS_CONFIGURABLE_FOO

config FOO_SETTING_1
     int "Foo setting 1"
     default 1

config FOO_SETTING_2
     int "Foo setting 2"
     default 2

endmenu
```

当`HAS_CONFIGURABLE_FOO`为`n`时，不会为`FOO_SETTING_1`和`FOO_SETTING_2`生成配置输出，因为上面代码逻辑等价于下面代码：

```
config FOO_SETTING_1
     int "Foo setting 1"
     default 1
     depends on HAS_CONFIGURABLE_FOO

config FOO_SETTING_2
     int "Foo setting 2"
     default 2
     depends on HAS_CONFIGURABLE_FOO
```

如果我们希望`HAS_CONFIGURABLE_FOO`为`n`时这些符号仍然获得它们的默认值，但是用户不能配置它们，那么我们可以使用`visible if`:
```
menu "Foo subsystem"
     visible if HAS_CONFIGURABLE_FOO

config FOO_SETTING_1
     int "Foo setting 1"
     default 1

config FOO_SETTING_2
     int "Foo setting 2"
     default 2

endmenu
```

这里的逻辑等价于下面的内容：
```
config FOO_SETTING_1
     int "Foo setting 1" if HAS_CONFIGURABLE_FOO
     default 1

config FOO_SETTING_2
     int "Foo setting 2" if HAS_CONFIGURABLE_FOO
     default 2
```

:::info 注意 
有关[可选提示符](#op)的含义，请参阅可选提示部分。
:::

当`HAS_CONFIGURABLE_FOO`为`n`时，我们可以得到以下符号的配置输出，而不是没有输出：
```
...
CONFIG_FOO_SETTING_1=1
CONFIG_FOO_SETTING_2=2
...
```

## <span id="or">其他资源</span>

[Kconfiglib 文档字符串](https://github.com/ulfalizer/Kconfiglib/blob/master/kconfiglib.py)的符号值入门部分将详细介绍如何运算符号值。
