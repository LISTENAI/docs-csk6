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

