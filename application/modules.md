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