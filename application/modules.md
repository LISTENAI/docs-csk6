# 模块

Zephyr relies on the source code of several externally maintained projects in order to avoid reinventing the wheel and to reuse as much well-established, mature code as possible when it makes sense. In the context of Zephyr’s build system those are called modules. These modules must be integrated with the Zephyr build system, as described in more detail in other sections on this page.  
csk6依赖于几个外部维护项目的源码，以免重复造轮子，在有用的情况下尽可能重用成熟的代码。在csk6的构建系统中，这些称为模块。这些模块必须于csk6构建系统集成，本章节其他部分将对它进行更详细的描述。

Zephyr depends on several categories of modules, including but not limited to:  
csk6包括但不限于依赖这些模块：

* Debugger integration  
  调试器集成
* Silicon vendor Hardware Abstraction Layers (HALs)  
  芯片供应商硬件抽象层（HAL）
* Cryptography libraries  
  密码库
* File Systems  
  文件系统
* Inter-Process Communication (IPC) libraries  
  进程间通讯（IPC）库

This page summarizes a list of policies and best practices which aim at better organizing the workflow in Zephyr modules.  
本章节总结了一系列如何更好地组织csk6模块中工作流的策略和最佳实践列表。

## <span id="moduleRep">模块存储库</span>

* All modules included in the default manifest shall be hosted in repositories under the zephyrproject-rtos GitHub organization.  
  默认清单包含的所有模块都应托管在 zephyr cloud.listenai.com 组织下的存储库中。

* The module repository codebase shall include a module.yml file in a zephyr/ folder at the root of the repository.  
  默认存储库代码库应在存储库根目录zephyr/文件夹中包含一个module.yml文件。

* Module repository names should follow the convention of using lowercase letters and dashes instead of underscores. This rule will apply to all new module repositories, except for repositories that are directly tracking external projects (hosted in Git repositories); such modules may be named as their external project counterparts.  
  模块存储库名称应遵循使用小写字母和破折号（而不是下横线）的约定。此规则适用于所有新模块存储库，除了直接跟踪外部项目（托管在git存储库中）的存储库；这些模块可以命名为它们的外部项目产物。
  :::info 
  Existing module repositories that do not conform to the above convention do not need to be renamed to comply with the above convention.  
  不符合上述约定的现有模块存储库不需要为了符合上述约定而重新命名。
  :::

* Modules should use “zephyr” as the default name for the repository main branch. Branches for specific purposes, for example, a module branch for an LTS Zephyr version, shall have names starting with the ‘zephyr_’ prefix.  
  模块应使用 “zephyr” 作为存储库主要分支的默认名称。用于特定目的的分支，例如LTS zephyr版本的模块分支，名称应该以"zephyr_"前缀开头。

* If the module has an external (upstream) project repository, the module repository should preserve the upstream repository folder structure.  
  如果模块有一个外部（上游）项目存储库，那么模块存储库应该保留上游存储库的文件夹结构。
  :::info
  It is not required in module repositories to maintain a ‘master’ branch mirroring the master branch of the external repository. It is not recommended as this may generate confusion around the module’s main branch, which should be ‘zephyr’.  
  在模块存储库中不需要维护一个镜像外部存储库的主分支的"master" 分支。不建议这样去做，因为这可能会使模块的主分支产生混乱，它应在zephyr分支。
  :::

## <span id="docrequirements">文件要求</span>

All Zephyr module repositories shall include an .rst file documenting:
所有csk6模块存储库都包含一个.rst文件，其中记录：

  * the scope and the purpose of the module
    模块的范围和目的

  * how the module integrates with Zephyr
    模块如何和csk6集成

  * the owner of the module repository
    模块存储库的所有者

  * synchronization information with the external project (commit, SHA, version etc.)
    与外部项目（提交、SHA、版本等）的同步信息

  * licensing information as described in Licensing requirements and policies.
    [许可证要求和政策](#)中所述的许可信息

The file shall be required for the inclusion of the module and the contained information should be kept up to date.  
该文件必须包括模块和包含的信息应该保持最新。

## <span id="moduleRep">在csk6构建系统中集成模块</span>

The build system variable ZEPHYR_MODULES is a CMake list of absolute paths to the directories containing Zephyr modules. These modules contain CMakeLists.txt and Kconfig files describing how to build and configure them, respectively. Module CMakeLists.txt files are added to the build using CMake’s add_subdirectory() command, and the Kconfig files are included in the build’s Kconfig menu tree.  
构建系统变量 **ZEPHYR_MODULES** 是包含csk6模块目录绝对路径的[CMake](https://cmake.org/cmake/help/latest/manual/cmake-language.7.html#lists)列表。这些模块分别包含描述如何构建和配置它们的`CMakeLists.txt`和`Kconfig`文件。使用CMake的[add_subdirectory()](https://cmake.org/cmake/help/latest/command/add_subdirectory.html)命令把`Kconfig`模块的`CMakeLists.txt`文件添加到构建中，`Kconfig`文件包含在构建的Kconfig菜单树中。

If you have west installed, you don’t need to worry about how this variable is defined unless you are adding a new module. The build system knows how to use west to set ZEPHYR_MODULES. You can add additional modules to this list by setting the ZEPHYR_EXTRA_MODULES CMake variable or by adding a ZEPHYR_EXTRA_MODULES line to .zephyrrc (See the section on Setting Variables for more details). This can be useful if you want to keep the list of modules found with west and also add your own.  
如果你安装了[lisa zep](../tool/lisa_plugin_zephyr/install.md)插件，则无需担心如何定义此变量，除非你添加一个新的模块。构建系统需要知道如何使用 west 来设置 **ZEPHYR_MODULES**。你可以通过设置 **ZEPHYR_EXTRA_MODULES** CMake 变量或添加 **ZEPHYR_EXTRA_MODULES** 行来把其他模块添加到`.zephyrrc`列表中。(有关详情信息，请参考 [设置变量](https://docs.zephyrproject.org/2.7.0/application/index.html#env-vars)部分)。它有利于你想通过保存在west中找到的模块列表并添加自的模块列表。

:::info 注意
If the module FOO is provided by west but also given with `-DZEPHYR_EXTRA_MODULES=/<path>/foo` then the module given by the command line variable ZEPHYR_EXTRA_MODULES will take precedence. This allows you to use a custom version of FOO when building and still use other Zephyr modules provided by west. This can for example be useful for special test purposes.  
如果模块 `FOO` 由 [west](https://docs.zephyrproject.org/2.7.0/guides/west/index.html#west) 提供的，但也是由 `-DZEPHYR_EXTRA_MODULES=/<path>/foo` 提供的，那么命令行变量 `ZEPHYR_EXTRA_MODULES` 给出的模块将优先。它允许你 `FOO` 在构建时使用自定义版本，并且仍然使用west提供的其他zephyr模块。例如，它可用于特殊的测试目的。
:::

See Basics for more on west workspaces.    
有关 west 工作空间的更多信息，请查看[Basics](https://docs.zephyrproject.org/2.7.0/guides/west/basics.html#west-basics)。

Finally, you can also specify the list of modules yourself in various ways, or not use modules at all if your application doesn’t need them.  
最后，你还可以通过各种方式自己指定模块列表，或者应用程序不需要模块时不适用它们。

## <span id="myfd">模块yaml文件说明</span>

A module can be described using a file named zephyr/module.yml. The format of zephyr/module.yml is described in the following:  
可以使用名为 `zephyr/module.yml` 的文件描述模块：

### <span id="mn">模块名称</span>

Each Zephyr module is given a name by which it can be referred to in the build system.  
每个csk6模块都有一个名称，可以在构建系统中引用它。

The name may be specified in the zephyr/module.yml file:  
名称可以在 `zephyr/module.yml` 文件中指定：
```
name: <name>
```

In CMake the location of the Zephyr module can then be referred to using the CMake variable `ZEPHYR_<MODULE_NAME>_MODULE_DIR` and the variable `ZEPHYR_<MODULE_NAME>_CMAKE_DIR` holds the location of the directory containing the module’s CMakeLists.txt file.  
在 CMake 中，zephyr模块的位置可以使用 CMake 变量 `ZEPHYR_<MODULE_NAME>_MODULE_DIR` 引用，变量 `ZEPHYR_<MODULE_NAME>_CMAKE_DIR` 保存包含模块的 `CMakeLists.txt` 文件的目录位置。

:::info 注意
When used for CMake and Kconfig variables, all letters in module names are converted to uppercase and all non-alphanumeric characters are converted to underscores (_). As example, the module foo-bar must be referred to as ZEPHYR_FOO_BAR_MODULE_DIR in CMake and Kconfig.  
当用于CMake和Kconfig变量时，模块名称中的所有字母都转换为大写，所有非字母数字字符都转换为下划线（_）。例如，在CMake和Kconfig中，模块`foo-bar`必须被`ZEPHYR_FOO_BAR_MODULE_DIR`引用。
:::

Here is an example for the Zephyr module foo:  
这是csk6模块的示例foo:
```
name:foo
```

:::info 注意
If the name field is not specified then the Zephyr module name will be set to the name of the module folder. As example, the Zephyr module located in `<workspace>/modules/bar` will use bar as its module name if nothing is specified in zephyr/module.yml.  
如果未指定`name`字段， 则csk6模块名称将设置为模块文件夹的名称。例如，如果在 `zephyr/module.yml` 中没有指定任何内容， 在 `<workspace>/modules/bar` 中的 csk6模块将使用`bar`作为模块名称。
:::

### <span id="mn">模块集成文件(模块内)</span>

Inclusion of build files, CMakeLists.txt and Kconfig, can be described as:  
包含构建文件`CMakeLists.txt`和`kconfig`可以描述为：
```
build:
  cmake: <cmake-directory>
  kconfig: <directory>/Kconfig
```

The `cmake: <cmake-directory>` part specifies that `<cmake-directory>` contains the `CMakeLists.txt` to use. The `kconfig: <directory>/Kconfig` part specifies the Kconfig file to use. Neither is required: `cmake` defaults to `zephyr`, and `kconfig` defaults to `zephyr/Kconfig`.  
`cmake: <cmake-directory>` 部分指定 `<cmake-directory>` 包含要使用的 `CMakeLists.txt` 。`kconfig: <directory>/Kconfig`部分指定要使用的Kconfig文件。不需要`cmake`默认为`zephyr`和kconfig默认为`zephyr/Kconfig`。

Here is an example module.yml file referring to CMakeLists.txt and Kconfig files in the root directory of the module:  
这是一个 `module.yml` 文件的示例。它引用了模块根目录的 `CMakeLists.txt` 和 `Kconfig` 文件：
```
build:
  cmake: .
  kconfig: Kconfig
```

### <span id="bsi">构建系统集成</span>

When a module has a module.yml file, it will automatically be included into the Zephyr build system. The path to the module is then accessible through Kconfig and CMake variables.  
当一个模块有一个 `module.yml` 文件时，它会自动包含在csk6构建系统中。然后，可以通过 Kconfig 和 CMake 变量访问模块的路径。

In both Kconfig and CMake, the variable `ZEPHYR_<MODULE_NAME>_MODULE_DIR` contains the absolute path to the module.  
在 Kconfig 和 CMake 中，变量 `ZEPHYR_<MODULE_NAME>_MODULE_DIR` 包含模块的绝对路径。

In CMake, `ZEPHYR_<MODULE_NAME>_CMAKE_DIR` contains the absolute path to the directory containing the CMakeLists.txt file that is included into CMake build system. This variable’s value is empty if the module.yml file does not specify a CMakeLists.txt.   
在CMake中，`ZEPHYR_<MODULE_NAME>_CMAKE_DIR` 包含到 CMake 构建系统中的 `CMakeLists.txt` 文件目录的绝对路径。如果 module.yml 文件没有指定CMakeLists.txt, 那么该变量的值为空。

To read these variables for a Zephyr module named foo:  
要读取名 `foo` 的csk6模块的这些变量：

  * In CMake: use `${ZEPHYR_FOO_MODULE_DIR}` for the module’s top level directory, and `${ZEPHYR_FOO_CMAKE_DIR}` for the directory containing its CMakeLists.txt  
    在 CMake 中: `${ZEPHYR_FOO_MODULE_DIR}`用于模块的顶部目录，包含它的`CMakeLists.txt`的目录使用`${ZEPHYR_FOO_CMAKE_DIR}`。

  * In Kconfig: use $(ZEPHYR_FOO_MODULE_DIR) for the module’s top level directory  
    在 Kconfig: 使用 `$(ZEPHYR_FOO_MODULE_DIR)` 做为模块的顶部目录。

Notice how a lowercase module name foo is capitalized to FOO in both CMake and Kconfig.  
注意在CMake和Kconfig中，小写模块名`foo`是如何大写为`FOO`的。

These variables can also be used to test whether a given module exists. For example, to verify that foo is the name of a Zephyr module:  
这些变量还可用于测试给定模块是否存在。例如，要验证`foo`是csk6模块的名称：

```
if(ZEPHYR_FOO_MODULE_DIR)
  # Do something if FOO exists.
endif()
```

In Kconfig, the variable may be used to find additional files to include. For example, to include the file `some/Kconfig` in module `foo`:  
在Kconfig中，该变量可用于查找要包含的其他文件。例如，要在模块`foo`中包含文件`some/Kconfig`：
 
```
source "$(ZEPHYR_FOO_MODULE_DIR)/some/Kconfig"
```

During CMake processing of each Zephyr module, the following two variables are also available:  
在每个Zephyr模块的CMake处理过程中，还可以使用以下两个变量：

  * the current module’s top level directory: ${ZEPHYR_CURRENT_MODULE_DIR}  
    当前模块的顶部目录：`${ZEPHYR_CURRENT_MODULE_DIR}`
  * the current module’s CMakeLists.txt directory: ${ZEPHYR_CURRENT_CMAKE_DIR}
    当前模块的`CMakeLists.txt`目录：`${ZEPHYR_CURRENT_CMAKE_DIR}`

This removes the need for a Zephyr module to know its own name during CMake processing. The module can source additional CMake files using these CURRENT variables. For example:    
这样就不需要Zephyr模块在CMake处理过程中知道自己的名称。该模块可以使用这些 `CURRENT` 变量来获取其他CMake文件。例如：
```
include(${ZEPHYR_CURRENT_MODULE_DIR}/cmake/code.cmake)
```

It is possible to append values to a Zephyr CMake list variable from the module’s first CMakeLists.txt file. To do so, append the value to the list and then set the list in the PARENT_SCOPE of the CMakeLists.txt file. For example, to append bar to the FOO_LIST variable in the Zephyr CMakeLists.txt scope:  
可以从模块的第一个 CMakeLists.txt 文件向 Zephyr CMake 列表变量追加值。。为此，将该值附加到列表，然后在 CMakeLists.txt 文件的 PARENT_SCOPE 中设置列表。例如，要将 `bar` 附加到 Zephyr CMakeLists.txt 作用域中的 `FOO_LIST` 变量:

```
list(APPEND FOO_LIST bar)
set(FOO_LIST ${FOO_LIST} PARENT_SCOPE)
```

An example of a Zephyr list where this is useful is when adding additional directories to the SYSCALL_INCLUDE_DIRS list.  
Zephyr列表的一个示例是，在`SYSCALL_INCLUDE_DIRS`列表中添加其他目录时很有用。

### <span id="bsi">csk6模块依赖</span>

A Zephyr module may be dependent on other Zephyr modules to be present in order to function correctly. Or it might be that a given Zephyr module must be processed after another Zephyr module, due to dependencies of certain CMake targets.  
为了正常工作，一个csk6模块可能依赖于其他模块。或者，由于某些CMake目标的依赖性，给定的csk6模块必须在另一个csk6模块之后处理。

Such a dependency can be described using the depends field.  
这样的依赖关系可以使用 `dependency` 字段来描述。

```
build:
  depends:
    - <module>
```

Here is an example for the Zephyr module foo that is dependent on the Zephyr module bar to be present in the build system:  
以下是csk6模块示例 `foo` , 它依赖于 `bar` 构建系统中存在的zephyr模块：
```
name: foo
build:
  depends:
  - bar
```

This example will ensure that bar is present when foo is included into the build system, and it will also ensure that bar is processed before foo.  
这个例子将确保当`foo`包含到构建系统中时，`bar`存在，并且它还将确保在`foo`之前处理`bar`。

### <span id="bsi">模块集成文件(外部)</span>

Module integration files can be located externally to the Zephyr module itself. The MODULE_EXT_ROOT variable holds a list of roots containing integration files located externally to Zephyr modules.  
模块集成文件可以位于 csk6 模块本身的外部。`MODULE_EXT_ROOT` 变量包含一个根列表，其中包含位于 csk6 模块外部的集成文件。

#### <span id="mifiz">csk6中的模块集成文件</span>

The Zephyr repository contain CMakeLists.txt and Kconfig build files for certain known Zephyr modules.  
Zephyr 存储库包含某些已知 Zephyr 模块的 `CMakeLists.txt` 和 `Kconfig` 构建文件。

Those files are located under  
这些文件位于
```
<ZEPHYR_BASE>
└── modules
    └── <module_name>
        ├── CMakeLists.txt
        └── Kconfig
```

#### <span id="mifiacl">自定义位置中的模块集成文件</span>

You can create a similar MODULE_EXT_ROOT for additional modules, and make those modules known to Zephyr build system.  
你可以为其他模块创建类似的 `MODULE_EXT_ROOT` ，并且让 csk6 构建系统知道这些模块。

Create a MODULE_EXT_ROOT with the following structure  
使用以下结构创建`MODULE_EXT_ROOT`：
```
<MODULE_EXT_ROOT>
└── modules
    ├── modules.cmake
    └── <module_name>
        ├── CMakeLists.txt
        └── Kconfig
```

and then build your application by specifying -DMODULE_EXT_ROOT parameter to the CMake build system. The MODULE_EXT_ROOT accepts a CMake list of roots as argument.  
然后通过向 CMake 构建系统指定 `-DMODULE_EXT_ROOT` 参数来构建应用程序。`MODULE_EXT_ROOT` 接受根的 CMake 列表作为参数。

A Zephyr module can automatically be added to the MODULE_EXT_ROOT list using the module description file zephyr/module.yml, see Build settings.  
可以使用模块描述文件 `Zephyr/module.yml` 将 csk6 模块自动添加到 `MODULE_EXT_ROOT` 列表中，请参考[构建设置](#bs)。

:::info 注意
ZEPHYR_BASE is always added as a MODULE_EXT_ROOT with the lowest priority. This allows you to overrule any integration files under `<ZEPHYR_BASE>/modules/<module_name>` with your own implementation your own MODULE_EXT_ROOT.  
`ZEPHYR_BASE` 始终作为优先级最低的 `MODULE_EXT_ROOT` 添加。它允许你使用自己的`MODULE_EXT_ROOT`实现来推翻`<ZEPHYR_BASE>/modules/<module_name>`下的任何集成文件。
:::

The modules.cmake file must contain the logic that specifies the integration files for Zephyr modules via specifically named CMake variables.  
`modules.cmake` 文件必须包含通过专门命名的 CMake 变量为 Zephyr 模块指定集成文件的逻辑。

To include a module’s CMake file, set the variable `ZEPHYR_<MODULE_NAME>_CMAKE_DIR` to the path containing the CMake file.  
若要包含模块的 CMake 文件，请将变量`ZEPHYR_<MODULE_NAME>_CMAKE_DIR` 设置为包含 CMake 文件的路径。

To include a module’s Kconfig file, set the variable `ZEPHYR_<MODULE_NAME>_KCONFIG` to the path to the Kconfig file.  
要包含模块的 Kconfig 文件，请将变量 `ZEPHYR_<MODULE_NAME>_KCONFIG` 设置为 KCONFIG 文件的路径。

The following is an example on how to add support the the FOO module.  
下面是一个关于如何添加对 `FOO` 模块的支持的示例。

Create the following structure  
创建以下示例：
```
<MODULE_EXT_ROOT>
└── modules
    ├── modules.cmake
    └── foo
        ├── CMakeLists.txt
        └── Kconfig
```

and inside the modules.cmake file, add the following content  
在 `modules.cmake` 文件中，添加以下内容
```
set(ZEPHYR_FOO_CMAKE_DIR ${CMAKE_CURRENT_LIST_DIR}/foo)
set(ZEPHYR_FOO_KCONFIG   ${CMAKE_CURRENT_LIST_DIR}/foo/Kconfig)
```

#### <span id="mif">模块集成文件(zephyr/Module.yml)</span>

The module description file zephyr/module.yml can be used to specify that the build files, CMakeLists.txt and Kconfig, are located in a Module integration files (external).  
模块描述文件 `zephyr/Module.yml` 可用于指定构建文件 `CMakeLists.txt` 和 `Kconfig` 位于模块集成文件(外部)中。

Build files located in a MODULE_EXT_ROOT can be described as:  
`MODULE_EXT_ROOT` 中的构建文件可以描述为：
```
build:
  cmake-ext: True
  kconfig-ext: True
```

This allows control of the build inclusion to be described externally to the Zephyr module.  
这允许在csk6模块外部描述构建包含的控制。

The Zephyr repository itself is always added as a Zephyr module ext root.  
csk6 存储库本身始终作为 csk6 模块 ext 根目录添加。

### <span id="bs">构建设置</span>

It is possible to specify additional build settings that must be used when including the module into the build system.  
可以指定在将模块包含到生成系统中时必须使用的其他生成设置。

All root settings are relative to the root of the module.  
所有`root`设置都相对于模块的根。

Build settings supported in the module.yml file are:    
`module.yml` 文件中支持的构建设置如下：

  * board_root: Contains additional boards that are available to the build system. Additional boards must be located in a `<board_root>/boards` folder.  
    `board_root` : 包含用于生成系统的其他板。其他板必须位于 `<board_root>/boards` 文件夹中。
  * dts_root: Contains additional dts files related to the architecture/soc families. Additional dts files must be located in a `<dts_root>/dts` folder.  
    `dts_root` : 包含与体系结构/soc 系列相关的其他 dts 文件，其他 dts 文件必须位于 `<dts_root>/dts` 文件夹中。
  * soc_root: Contains additional SoCs that are available to the build system. Additional SoCs must be located in a `<soc_root>/soc` folder.  
    `soc_root` : 包含构建系统可用的其他 SoC。其他 SoC 必须位于 `<soc_root>/soc` 文件夹中。
  * arch_root: Contains additional architectures that are available to the build system. Additional architectures must be located in a `<arch_root>/arch` folder.  
    `arch_root` : 包含可用于生成系统的其他架构。其他架构必须位于 `<arch_root>/arch` 文件夹中。
  * module_ext_root: Contains CMakeLists.txt and Kconfig files for Zephyr modules, see also Module integration files (external).  
    `module_ext_root` : 包含 Zephyr 模块的 CMakeLists.txt 和 Kconfig 文件 , 请参考[模块集成文件(外部)](#bsi)

Example of a module.yaml file containing additional roots, and the corresponding file system layout.  
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

requires the following folder structure:  
需要以下文件夹结构:
```
<zephyr-module-root>
├── arch
├── boards
├── dts
├── modules
└── soc
```

### <span id="mi">模块包含</span>

#### <span id="uw">使用west</span>

If west is installed and ZEPHYR_MODULES is not already set, the build system finds all the modules in your west installation and uses those. It does this by running west list to get the paths of all the projects in the installation, then filters the results to just those projects which have the necessary module metadata files.  
如果 west 已安装，**ZEPHYR_MODULES** 尚未设置，则构建系统将查找你的 `west安装` 中的所有模块并使用这些模块。它通过运行 `west list` 获取安装中所有项目的路径，然后将结果过滤到具有必要模块元数据文件的项目。

Each project in the west list output is tested like this:  
`west list` 中的每个项目都经过如下测试：  

  * If the project contains a file named zephyr/module.yml, then the content of that file will be used to determine which files should be added to the build, as described in the previous section.  
    如果项目包含一个名为 `zephyr/module.yml` 的文件，那么将使用该文件的内容来确定应该将哪些文件添加到构建中，如前一节所述。
  * Otherwise (i.e. if the project has no zephyr/module.yml), the build system looks for zephyr/CMakeLists.txt and zephyr/Kconfig files in the project. If both are present, the project is considered a module, and those files will be added to the build.
    否则(即如果项目没有 `zephyr/module.yml`) ，构建系统将在项目中查找 `zephyr/CMakeLists.txt` 和 `zephyr/Kconfig` 文件。如果两者都存在，则将项目视为模块，并将这些文件添加到生成中。
  * If neither of those checks succeed, the project is not considered a module, and is not added to **ZEPHYR_MODULES**.
    如果这两个检查都没有成功，那么项目就不被认为是一个模块，也不会被添加到 **ZEPHYR_MODULES** 中。

#### <span id="wuw">没有使用west</span>

If you don’t have west installed or don’t want the build system to use it to find Zephyr modules, you can set ZEPHYR_MODULES yourself using one of the following options. Each of the directories in the list must contain either a zephyr/module.yml file or the files zephyr/CMakeLists.txt and Kconfig, as described in the previous section.  
如果你没有安装 west，或者不希望构建系统使用它来查找 csk6 模块，可以使用下列选项之一自己设置 **ZEPHYR_MODULES**。列表中的每个目录必须包含 `zephyr/module.yml` 文件或者 `zephyr/CMakeLists.txt` 和 `Kconfig` 文件，如前一节所述。

1. At the CMake command line, like this:  
   在 CMake 命令行中，如下所示:
  ```
  cmake -DZEPHYR_MODULES=<path-to-module1>[;<path-to-module2>[...]] ...
  ```

2. At the top of your application’s top level CMakeLists.txt, like this:  
   在应用程序的顶级 `CMakeLists.txt` 的顶部，如下所示:  
   ```
    set(ZEPHYR_MODULES <path-to-module1> <path-to-module2> [...])
    find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
   ```
   If you choose this option, make sure to set the variable before calling find_package(Zephyr ...), as shown above.  
   如果选择此选项，请确保在调用 `find_package(Zephyr ...)` **之前**设置变量，如上所示。

3. In a separate CMake script which is pre-loaded to populate the CMake cache, like this:   
   在一个单独的 CMake 脚本中，该脚本被预先加载来填充 CMake 缓存，如下所示:
   ```
   # Put this in a file with a name like "zephyr-modules.cmake"
    set(ZEPHYR_MODULES <path-to-module1> <path-to-module2>
      CACHE STRING "pre-cached modules")
   ```
    You can tell the build system to use this file by adding -C zephyr-modules.cmake to your CMake command line.  
    你可以通过在 CMake 命令行中添加 `-C zephyr-modules.cmake` 来告诉构建系统使用这个文件。

#### <span id="num">没有使用模块</span>

If you don’t have west installed and don’t specify ZEPHYR_MODULES yourself, then no additional modules are added to the build. You will still be able to build any applications that don’t require code or Kconfig options defined in an external repository.  
如果你没有安装 west，也没有自己指定 **ZEPHYR_MODULES**则不会向构建添加其他模块。你仍然可以构建任何不需要在外部存储库中定义代码或 Kconfig 选项的应用程序。