# 模块

zephyr依赖与几个外部维护项目的源码，以免重复造轮子，在有用的情况下尽可能重用成熟的代码。在zephyr的构建系统中，这些称为模块。这些模块必须于zephyr构建系统集成，本章节其他部分将对它进行更详细的描述。

zephyr包括但不限于依赖这些模块：

* 调试器集成
* 芯片供应商硬件抽象层（HAL）
* 密码库
* 文件系统
* 进程间通讯（IPC）库

本章节总结了一系列如何更好地组织zephyr模块中工作流的策略和最佳实践列表。

## <span id="moduleRep">模块代码仓库</span>

* 默认清单包含的所有模块都应托管在 [zephyr cloud.listenai.com](https://cloud.listenai.com/zephyr) 结构下的代码仓库中。

* 默认代码仓库代码库应在代码仓库根目录`zephyr/`文件夹中包含一个module.yml文件。

* 模块代码仓库名称应遵循使用小写字母和破折号（而不是下横线）的约定。此规则适用于所有新模块代码仓库，除了直接跟踪外部项目（托管在git代码仓库中）的代码仓库；这些模块可以命名为它们的外部项目产物。
  :::info 
  不符合上述约定的现有模块代码仓库不需要为了符合上述约定而重新命名。
  :::

* 模块应使用 "zephyr" 作为代码仓库主要分支的默认名称。用于特定目的的分支，例如LTS zephyr版本的模块分支，名称应该以"zephyr_"前缀开头。

* 如果模块有一个外部（上游）项目代码仓库，那么模块代码仓库应该保留上游代码仓库的文件夹结构。
  :::info
  不需要维护一个与外部代码仓库主分支成镜像关系的“master”分支，之所以不建议这样去做，因为这可能会使模块的主分支(这里是"zephyr")产生混乱，它应在zephyr分支。
  :::

## <span id="docrequirements">文档要求</span>

所有zephyr模块代码仓库都包含一个.rst文件，其中记录：

  * 模块的范围和目的
  * 模块如何和zephyr集成
  * 模块代码仓库的所有者
  * 与外部项目（提交、SHA、版本等）的同步信息

该文件是包含模块所必需的，而且它(所包含)的信息应该保持最新

## <span id="moduleRep">在zephyr构建系统中集成模块</span>

构建系统变量 **ZEPHYR_MODULES** 是包含zephyr模块目录绝对路径的[CMake](https://cmake.org/cmake/help/latest/manual/cmake-language.7.html#lists)列表。这些模块分别包含描述如何构建和配置它们的`CMakeLists.txt`和`Kconfig`文件。使用CMake的[add_subdirectory()](https://cmake.org/cmake/help/latest/command/add_subdirectory.html)命令把`Kconfig`模块的`CMakeLists.txt`文件添加到构建中，`Kconfig`文件包含在构建的Kconfig菜单树中。
 
如果你安装了[lisa zep](../tool/lisa_plugin_zephyr/install.md)命令行工具，则无需担心如何定义此变量，除非你添加一个新的模块。构建系统需要知道如何使用 lisa zep 设置的  **ZEPHYR_MODULES**。你可以通过设置 **ZEPHYR_EXTRA_MODULES** CMake 变量或添加 **ZEPHYR_EXTRA_MODULES** 行来把其他模块添加到`.zephyrrc`列表中。(有关详情信息，请参考 [设置变量](https://docs.zephyrproject.org/2.7.0/application/index.html#env-vars)部分)。它有利于你想通过保存在lisa zep中找到的模块列表并添加自的模块列表。

:::info 注意
如果模块 `FOO` 是由 [lisa zep](https://docs.zephyrproject.org/2.7.0/guides/lisa zep/index.html#lisa zep) 提供的，但也是由 `-DZEPHYR_EXTRA_MODULES=/<path>/foo` 提供的，那么命令行变量 `ZEPHYR_EXTRA_MODULES` 给出的模块将优先。它允许你在构建时使用自定义版本的 `FOO` ，并且仍然使用lisa zep提供的其他zephyr模块。例如，它可用于特殊的测试目的。
:::
 
有关 lisa zep 工作空间的更多信息，请查看[Basics](https://docs.zephyrproject.org/latest/develop/west/basics.html#west-basics)。

最后，你还可以通过各种方式自己指定模块列表，如果你的应用程序不需要，则不需要使用模块。

## <span id="myfd">模块yaml文件说明</span>

可以使用名为 `zephyr/module.yml` 的文件描述模块：

### <span id="mn">模块名称</span>

每个zephyr模块都有一个名称，可以在构建系统中引用它。

名称可以在 `zephyr/module.yml` 文件中指定：
```
name: <name>
```

在 CMake 中，zephyr模块的位置可以使用 CMake 变量 `ZEPHYR_<MODULE_NAME>_MODULE_DIR` 引用，变量 `ZEPHYR_<MODULE_NAME>_CMAKE_DIR` 保存包含模块的 `CMakeLists.txt` 文件的目录位置。

:::info 注意
当用于CMake和Kconfig变量时，模块名称中的所有字母都转换为大写，所有非字母数字字符都转换为下划线（_）。例如，在CMake和Kconfig中，模块`foo-bar`需要转换为`ZEPHYR_FOO_BAR_MODULE_DIR`引用。
:::

这是zephyr模块 `foo` 的示例:
```
name:foo
```

:::info 注意
如果未指定`name`字段， 则zephyr模块名称将被设置为模块文件夹的名称。例如，如果在 `zephyr/module.yml` 中没有指定任何内容， 在 `<workspace>/modules/bar` 中的 zephyr模块将使用`bar`作为模块名称。
:::

### <span id="mn">模块集成文件(模块内)</span>

包含build中`CMakeLists.txt`和`kconfig`可以描述为：
```
build:
  cmake: <cmake-directory>
  kconfig: <directory>/Kconfig
```

`cmake: <cmake-directory>` 部分指定 `<cmake-directory>` 包含要使用的 `CMakeLists.txt` 。`kconfig: <directory>/Kconfig`部分指定要使用的Kconfig文件。不需要`cmake`默认为`zephyr`和kconfig默认为`zephyr/Kconfig`。

这是一个 `module.yml` 文件的示例。它引用了模块根目录的 `CMakeLists.txt` 和 `Kconfig` 文件：
```
build:
  cmake: .
  kconfig: Kconfig
```

### <span id="bsi">构建系统集成</span>

当一个模块有一个 `module.yml` 文件时，它会自动包含在zephyr构建系统中。然后，可以通过 Kconfig 和 CMake 变量访问模块的路径。

在 Kconfig 和 CMake 中，变量 `ZEPHYR_<MODULE_NAME>_MODULE_DIR` 包含模块的绝对路径。

在CMake中，`ZEPHYR_<MODULE_NAME>_CMAKE_DIR` 包含了 CMake 构建系统中的 `CMakeLists.txt` 文件目录的绝对路径。如果 module.yml 文件没有指定CMakeLists.txt, 那么该变量的值为空。
 
要读取名 `foo` 的zephyr模块的这些变量：

  * 在 CMake 中: `${ZEPHYR_FOO_MODULE_DIR}`用于模块的顶部目录，包含它的`CMakeLists.txt`的目录使用`${ZEPHYR_FOO_CMAKE_DIR}`。

  * 在 Kconfig: 使用 `$(ZEPHYR_FOO_MODULE_DIR)` 做为模块的顶部目录。

注意在CMake和Kconfig中，小写模块名`foo`是如何大写为`FOO`的。

这些变量还可用于测试给定模块是否存在。例如，要验证`foo`是否为zephyr模块的名称：

```
if(ZEPHYR_FOO_MODULE_DIR)
  # Do something if FOO exists.
endif()
```

在Kconfig中，该变量可用于查找要包含的其他文件。例如，要在模块`foo`中包含文件`some/Kconfig`：
 
```
source "$(ZEPHYR_FOO_MODULE_DIR)/some/Kconfig"
```
 
在每个Zephyr模块的CMake处理过程中，还可以使用以下两个变量：

  * 当前模块的顶部目录：`${ZEPHYR_CURRENT_MODULE_DIR}`
  * 当前模块的`CMakeLists.txt`目录：`${ZEPHYR_CURRENT_CMAKE_DIR}`

这样就不需要Zephyr模块在CMake处理过程中知道自己的名称。该模块可以使用这些 `CURRENT` 变量来获取其他CMake文件。例如：
```
include(${ZEPHYR_CURRENT_MODULE_DIR}/cmake/code.cmake)
```

可以从模块的第一个 CMakeLists.txt 文件向 Zephyr CMake 列表变量追加值。为此，将该值附加到列表，然后在 CMakeLists.txt 文件的 PARENT_SCOPE 中设置列表。例如，要将 `bar` 附加到 Zephyr CMakeLists.txt 作用域中的 `FOO_LIST` 变量:

```
list(APPEND FOO_LIST bar)
set(FOO_LIST ${FOO_LIST} PARENT_SCOPE)
```

Zephyr列表的一个示例是，在`SYSCALL_INCLUDE_DIRS`列表中添加其他目录时很有用。

### <span id="zmdz">zephyr模块依赖</span>

一个zephyr模块可能依赖于其他模块。或者，由于某些CMake目标的依赖性，给定的zephyr模块必须在另一个zephyr模块之后处理。

这样的依赖关系可以使用 `dependency` 字段来描述。

```
build:
  depends:
    - <module>
```

以下是zephyr模块示例 `foo` , 它依赖于构建系统中存在的zephyr模块`bar`：
```
name: foo
build:
  depends:
  - bar
```

这个例子将确保当`foo`包含到构建系统中时，`bar`需要存在，并且它还将确保在`foo`之前处理`bar`。

### <span id="mife">模块集成文件(外部)</span>

模块集成文件可以位于 zephyr 模块本身的外部。`MODULE_EXT_ROOT` 变量包含一个根列表，其中包含位于 zephyr 模块外部的集成文件。

#### <span id="mifiz">zephyr中的模块集成文件</span>

Zephyr 代码仓库包含某些已知 Zephyr 模块的 `CMakeLists.txt` 和 `Kconfig` 构建文件。

这些文件位于
```
<ZEPHYR_BASE>
└── modules
    └── <module_name>
        ├── CMakeLists.txt
        └── Kconfig
```

#### <span id="mifiacl">自定义位置中的模块集成文件</span>

你可以为其他模块创建类似的 `MODULE_EXT_ROOT` ，并且让 zephyr 构建系统知道这些模块。

使用以下结构创建`MODULE_EXT_ROOT`：
```
<MODULE_EXT_ROOT>
└── modules
    ├── modules.cmake
    └── <module_name>
        ├── CMakeLists.txt
        └── Kconfig
```

然后通过向 CMake 构建系统指定 `-DMODULE_EXT_ROOT` 参数来构建应用程序。`MODULE_EXT_ROOT` 接受根的 CMake 列表作为参数。

可以使用模块描述文件 `Zephyr/module.yml` 将 zephyr 模块自动添加到 `MODULE_EXT_ROOT` 列表中，请参考[构建设置](#bs)。

:::info 注意
`ZEPHYR_BASE` 始终作为优先级最低的 `MODULE_EXT_ROOT` 添加。这样允许了你使用自己的`MODULE_EXT_ROOT`实现来否决`<ZEPHYR_BASE>/modules/<module_name>`下的任何集成文件。
:::

`modules.cmake` 文件必须包含通过专门命名的 CMake 变量为 Zephyr 模块指定集成文件的逻辑。

若要包含模块的 CMake 文件，请将变量`ZEPHYR_<MODULE_NAME>_CMAKE_DIR` 设置为包含 CMake 文件的路径。

若要包含模块的 Kconfig 文件，请将变量 `ZEPHYR_<MODULE_NAME>_KCONFIG` 设置为 Kconfig 文件的路径。

下面是一个关于如何添加对 `FOO` 模块的支持的示例。

创建以下示例：
```
<MODULE_EXT_ROOT>
└── modules
    ├── modules.cmake
    └── foo
        ├── CMakeLists.txt
        └── Kconfig
```
 
在 `modules.cmake` 文件中，添加以下内容
```
set(ZEPHYR_FOO_CMAKE_DIR ${CMAKE_CURRENT_LIST_DIR}/foo)
set(ZEPHYR_FOO_KCONFIG   ${CMAKE_CURRENT_LIST_DIR}/foo/Kconfig)
```

#### <span id="mif">模块集成文件(zephyr/module.yml)</span>
 
模块描述文件 `zephyr/module.yml` 可用于指定构建文件 `CMakeLists.txt` 和 `Kconfig` 位于模块集成文件(外部)中。

`MODULE_EXT_ROOT` 中的构建文件可以描述为：
```
build:
  cmake-ext: True
  kconfig-ext: True
```

这允许在zephyr模块外部描述构建包含的控制。

zephyr 代码仓库本身始终作为 zephyr 模块 ext 根目录添加。

### <span id="bs">构建设置</span>

可以指定在将模块包含到生成系统中时必须使用的其他生成设置。

所有`root`设置都相对于模块的根。
 
`module.yml` 文件中支持的构建设置如下：

  * `board_root` : 包含用于生成系统的其他板。其他板必须位于 `<board_root>/boards` 文件夹中。
  * `dts_root` : 包含与芯片架构/soc 系列相关的其他 dts 文件，其他 dts 文件必须位于 `<dts_root>/dts` 文件夹中。
  * `soc_root` : 包含构建系统可用的其他 SoC。其他 SoC 必须位于 `<soc_root>/soc` 文件夹中。
  * `arch_root` : 包含可用于生成系统的其他架构。其他架构必须位于 `<arch_root>/arch` 文件夹中。
  * `module_ext_root` : 包含 Zephyr 模块的 CMakeLists.txt 和 Kconfig 文件 , 请参考[模块集成文件(外部)](#mife)

包含附加根的文件的示例`module.yaml`，以及相应的文件系统布局。
```
build:
  settings:
    board_root: .
    dts_root: .
    soc_root: .
    arch_root: .
    module_ext_root: .
```

需要以下文件夹结构:
```
<zephyr-module-root>
├── arch
├── boards
├── dts
├── modules
└── soc
```

### <span id="mi">包含模块</span>

#### <span id="uw">使用lisa zep</span>

如果 lisa zep 命令行工具已安装(命令行工具已经包含了west)，**ZEPHYR_MODULES** 尚未设置，则构建系统将查找你的 `lisa zep安装` 中的所有模块并使用这些模块。通过运行 `lisa zep list` 获取安装中所有项目的路径，然后将结果过滤到具有必要模块元数据文件的项目。
 
`lisa zep list` 中的每个项目都经过如下测试：  

  * 如果项目包含一个名为 `zephyr/module.yml` 的文件，那么将使用该文件的内容来确定应该将哪些文件添加到构建中，如前一节所述。
  * 否则(即如果项目没有 `zephyr/module.yml`) ，构建系统将在项目中查找 `zephyr/CMakeLists.txt` 和 `zephyr/Kconfig` 文件。如果两者都存在，则将项目视为模块，并将这些文件添加到构建中。
  * 如果这两个检查都没有成功，那么项目就不被认为是一个模块，也不会被添加到 **ZEPHYR_MODULES** 中。

#### <span id="wuw">没有使用lisa zep</span>

如果你没有安装 lisa zep，或者不希望构建系统使用它来查找 zephyr 模块，可以使用下列选项之一自己设置 **ZEPHYR_MODULES**。列表中的每个目录必须包含 `zephyr/module.yml` 文件或者 `zephyr/CMakeLists.txt` 和 `Kconfig` 文件，如前一节所述。

1. 在 CMake 命令行中，如下所示:
  ```
  cmake -DZEPHYR_MODULES=<path-to-module1>[;<path-to-module2>[...]] ...
  ```

2. 在应用程序的顶级 `CMakeLists.txt` 的顶部，如下所示:  
   ```
    set(ZEPHYR_MODULES <path-to-module1> <path-to-module2> [...])
    find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
   ```
   如果选择此选项，请确保在调用 `find_package(Zephyr ...)` **之前**设置变量，如上所示。

3. 在一个单独的 CMake 脚本中，该脚本被预先加载来填充 CMake 缓存，如下所示:
   ```
   # Put this in a file with a name like "zephyr-modules.cmake"
    set(ZEPHYR_MODULES <path-to-module1> <path-to-module2>
      CACHE STRING "pre-cached modules")
   ```
    你可以通过在 CMake 命令行中添加 `-C zephyr-modules.cmake` 来告诉构建系统使用这个文件。

#### <span id="num">没有使用模块</span>

如果你没有安装 lisa zep，也没有自己指定 **ZEPHYR_MODULES**则不会向构建添加其他模块。你仍然可以构建任何不需要在外部代码仓库中定义代码或 Kconfig 选项的应用程序。
