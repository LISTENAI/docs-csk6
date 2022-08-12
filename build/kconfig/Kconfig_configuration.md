# 设置Kconfig配置

[menuconfig](./Kconfig_gui.md) 可用于在应用程序开发期间测试配置，本页说明如何进行永久设置。

可以在[Kconfig搜索页](https://zephyr-docs.listenai.com/kconfig.html)中找到所有 Kconfig 选项的自动生成列表。

:::info 注意
在对 Kconfig 文件进行更改之前，最好也浏览一下Kconfig - [小贴士与最佳实践](./Kconfig_tips_and_demo.md)。
:::

## Kconfig 中可见与不可见的符号

在进行Kconfig更改时，了解可见和不可见选项之间的区别非常重要

* 可见选项是用来提示配置定义的，可见选项显示在交互式配置界面中（因此可见），并且可以在配置文件中设置。

这是个可见选项的示例：
```
config FPU
   bool "Support floating point operations"
   depends on HAS_FPU
```

选项在`menuconfig`显示如下，可以进行切换
```
[ ] Support floating point operations
```
 
* 不可见选项是没有提示的选项。交互界面中不显示不可见选项，用户无法直接控制选项值。然而，他们可以从默认值或其他选项中获取值。

这是一个不可见选项的实例：
```
config CPU_HAS_FPU
   bool
   help
     This symbol is y if the CPU has a hardware floating point unit.
```
  
在这种情况下，`CPU_HAS_FPU`通过其他选项启用。`select CPU_HAS_FPU`

## 在配置文件中设置选项

可见选项可以通过配置文件设置来配置。初始配置是通过board中的 `xxx_defconfig` 文件和应用程序中的 `prj.conf` 合并而成。有关详细信息，请参考下面详细的[初始配置](#config_init)。

配置文件中的使用语法如下：
```
CONFIG_<symbol name>=<value>
```

等号周围不应该有空格。

布尔类型选项可以设置**y**或**n**去启用或禁止。上面示例中FPU选项就是这样启用：
```
CONFIG_FPU=y
```

:::info 注意
布尔型选项也可以设置n如下格式的注释:`# CONFIG_SOME_OTHER_BOOL is not set`
这是您将在合并配置`zephyr/.config`中看到的格式.这种风格之所以被使用是因为历史原因：Kconfig配置文件可以被解析为makefile（尽管Zephyr不使用这个）。有`n`-与未设置变量对应的值选项简化了Make中的测试。
:::

其他选项类型设置如下：
```
CONFIG_SOME_STRING="cool value"
CONFIG_SOME_INT=123
```

注释使用：  
```
# This is a comment
```
 
只有满足选项的依赖关系时，才会考虑配置文件的赋值。否则将会打印警告。想要知道选项依赖关系是什么，请使用[交互式配置界面](./Kconfig_gui.md)(您可以使用 `/` 跳转)，或在[Kconfig搜索页](https://docs.zephyrproject.org/latest/build/kconfig/setting.html)

## <span id="config_init">初始配置</span>

应用程序的初始配置来自于合并三个来源的配置设置：

1. 一个 `BOARD` 特定配置文件存储在 `boards/<architecture>/<BOARD>/<BOARD>_defconfig`。

2. 任何前缀为 CONFIG_ 的 CMake 缓存项

3. 应用程序设置 `./prj.conf`
 
应用程序配置可以来自以下源。默认情况下`prj.conf`使用。

1. 如果`CONF_FILE`设置后，其中指定的配置文件将合并用作应用程序配置。 `CONF_FILE` 可通过多种方式设置：

   1. 在 `CMakeLists.txt`, 在调用之前`find_package(Zephyr)`
   2. 通过 `lisa zep build` 参数 `-DCONF_FILE=<conf file(s)>` 传递
   3. 来自 CMake 变量缓存

2.  如果`CONF_FILE` 被设置，并且单个配置文件形式 `prj_<build>.conf` 被使用，那么如果文件 `boards/<BOARD>_<build>.conf` 与文件存在同一文件夹中  `prj_<build>.conf` ,是用 `prj_<build>.conf` 和 `boards/<BOARD>_<build>.conf` 合并而来

3. 如果`prj_<BOARD>.conf`存在应用目录中，它会被使用。

4. 如果`boards/<BOARD>.conf`存在于应用程序目录中，则结果与prj.conf合并使用。 

5. 如果board版本使用`boards/<BOARD>_<revision>.conf`存在应用程序目录中，则结果与`prj.conf`和`boards/<BOARD>.conf`合并使用。

6. 如果`prj.conf`存在应用目录中，则使用它。

所有的配置文件都将从应用程序的配置目录中获取，除了带有 `CONF_FILE` 参数给出的绝对路径的文件。

有关如何定义应用程序配置目录，请参考[应用程序配置目录](http://localhost:3000/chips/600X/application/application_development#%E5%BA%94%E7%94%A8%E9%85%8D%E7%BD%AE%E7%9B%AE%E5%BD%95)。

如果在`<BOARD>_defconfig`和应用配置中都指定了选项，则应用配置中的赋值优先使用。

合并后的配置保存在`zephyr/.config`构建目录中。

只要 `zephyr/.config`存在并配置是最新的，它都优先级高于任何BOARD和应用程序配置文件的合并配置。`zephyr/.config`也可在[交互式配置界面](./Kconfig_gui.md)进行更改配置。

## 配置不可见选项
 
更改board的默认配置时，您可能必须在`boards/<architecture>/<BOARD>/Kconfig.defconfig`的常规`Kconfig`中完成配置不可见选项。.

:::info 注意
这种类型的配置项即使是用户在外面的`.config` 文件中去做赋值配置，也是没有用的，还是会以`.defconfig`中的为准，这就是我们这样子设计的，不是一个架构上的缺陷或问题。
:::

`Kconfig.defconfig`的赋值依赖于多个位置定义Kconfig选项。例如，假设我们想在 `FOO_WIDTH` 设置为32:
```
config FOO_WIDTH
    int
```

为此，我们将扩展`Kconfig.defconfig`的`FOO_WIDTH`的定义：
```
if BOARD_MY_BOARD

config FOO_WIDTH
    default 32

endif
```

:::info 注意
因为选项(int)的类型已经在第一个定义位置给出，所以不需要在这里重复。在选项的“基本”定义中只给出一次类型是一个好方式。
:::

在`Kconfig.defconfig`文件默认的赋值优先于默认选项的“base”定义中给出的值。这是通过在内部首先包含 `Kconfig.defconfig`文件来实现的。`Kconfig.defconfig`使用满足的条件配置第一个`default`，其中空条件对应 `if y`(始终满足)

值得注意的是，来自顶层的条件`if`是判断选项属性的，因此`if BOARD_MY_BOARD`条件成立，那么上面的默认值等于32。

:::warning 警告
在多个位置定义选项时，依赖项是被“或”运算，而不是“与”运算。通过在多个位置定义选项，不可能使选项的依赖关系受到限制。

例如，下面选项的依赖关系是：`DEP1 || DEP2`
```
config FOO
  ...
  depends on DEP1

config FOO
  ...
  depends on DEP2
```

当更改`Kconfig.defconfig`配置时，请始终在交互配置界面其中一个选项中检查依赖关系。通常需要从选项的基本定义中重复依赖项，避免弱化选项的依赖项。
:::

## Kconfig.defconfig文件机制

这种配置方案的机制是避免在交互式配置界面中配置固定`BOARD`板型的设置。如果所有board配置都通过`<BOARD>_defconfig`去完成，则所有选项都必须可见，因为 `<BOARD>_defconfig` 中的值对不可见符号没有影响。
  
将固定设置让用户可配置会使配置界面更杂乱无章，使得配置更容易意外地创建有问题的配置和难以理解。

在处理固定板型的设置时，还要考虑是否应该通过设备树去处理。

## 配置选项

有两种配置Kconfig的`choice`方法：

  
1. 通过在配置文件中设置一个选项。将选项设置为 `y`，其他选项自动设置值为`n` 。  
   如果多个选项设置为`y`，则只有最后一个设置为`y`的才会被使用（其他值为`n`）。  
   这使应用程序中`prj.conf`的一个选项覆盖board一个defconfig选项。  

2. 通过更改`Kconfig.defconfig`choice中的`default`。  
  与选项一样，更改选项的默认值是通过多个位置定义的选项来完成。为此，这个选项必须有一个名称。  
  例如：假设一个选项具的有以下基本定义（这里选项名称是`FOO`）
```
choice FOO
    bool "Foo choice"
    default B

config A
    bool "A"

config B
    bool "B"

endchoice
```
 
更改`FOO`的默认值为`A`，你需要添加以下定义到`Kconfig.defconfig`
```
choice FOO
    default A
endchoice
```

这个`Kconfig.defconfig`方法应该在选择的依赖关系可能无法满足时使用。在这种情况下，只要用户使选项可见，就会设置默认选项。

## 更多Kconfig资源

[小贴士与最佳实践](./Kconfig_tips_and_demo.md)页面有写一些编写Kconfig文件的提示。

[kconfiglib.py](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/scripts/kconfig/kconfiglib.py)（位于文件顶部）详细介绍了选项值的计算方式。
