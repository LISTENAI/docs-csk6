# Zephyr CMake Package(包)

The Zephyr [CMake package](https://cmake.org/cmake/help/latest/manual/cmake-packages.7.html) is a convenient way to create a Zephyr-based application.

The Zephyr CMake package ensures that CMake can automatically select a Zephyr to use for building the application, whether it is a [Zephyr repository application](https://docs.zephyrproject.org/latest/develop/application/index.html#zephyr-repo-app), [Zephyr workspace application](https://docs.zephyrproject.org/latest/develop/application/index.html#zephyr-workspace-app), or a [Zephyr freestanding application](https://docs.zephyrproject.org/latest/develop/application/index.html#zephyr-freestanding-app).

When developing a Zephyr-based application, then a developer simply needs to write `find_package(Zephyr)` in the beginning of the application `CMakeLists.txt` file.

To use the Zephyr CMake package it must first be exported to the CMake user package registry. This is means creating a reference to the current Zephyr installation inside the CMake user package registry.

Zephyr [CMake Package](https://cmake.org/cmake/help/latest/manual/cmake-packages.7.html)(包) 非常适合创建基于 Zephyr 的应用。

Zephyr CMake Package(包) 确保 CMake 可以自动选择 Zephyr 用于编译应用，无论是[Zephyr 集成式应用](https://docs.zephyrproject.org/latest/develop/application/index.html#zephyr-workspace-app)，还是 [Zephyr 独立式应用](https://docs.zephyrproject.org/latest/develop/application/index.html#zephyr-freestanding-app)。

在开发基于 Zephyr 的应用时，开发者只需要在应用的目录 `CMakeLists.txt` 文件的开头写入 `find_package(Zephyr)` 即可。

要使用 Zephyr CMake Package(包) 必须先将其导出到 [CMake 用户包注册表](https://cmake.org/cmake/help/latest/manual/cmake-packages.7.html#user-package-registry)。上述的意思是在 CMake 用户包注册表中创建一个到当前 Zephyr 的引用。


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="ubuntu"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'macOS', value: 'mac'},
        {label: 'Windows', value: 'win'},
    ]}
>
<TabItem value="ubuntu">

In Linux, the CMake user package registry is found in:

`~/.cmake/package/Zephyr`

在 Linux 中，CMake 用户包注册表在:

`~/.cmake/package/Zephyr`

</TabItem>

<TabItem value="mac">

In macOS, the CMake user package registry is found in:

`~/.cmake/package/Zephyr`

在 macOS 中，CMake 用户包注册表在:

`~/.cmake/package/Zephyr`

</TabItem>

<TabItem value="win">

In Windows, the CMake user package registry is found in:

`HKEY_CURRENT_USER\Software\Kitware\CMake\Packages\Zephyr`

在 Windows 中，CMake 用户包注册表在:

`HKEY_CURRENT_USER\Software\Kitware\CMake\Packages\Zephyr`

</TabItem>

</Tabs>

The Zephyr CMake package allows CMake to automatically find a Zephyr base. One or more Zephyr installations must be exported. Exporting multiple Zephyr installations may be useful when developing or testing Zephyr freestanding applications, Zephyr workspace application with vendor forks, etc..

Zephyr CMake Package(包)允许 CMake 自动查找 Zephyr，必须导出一个或者多个 Zephyr。在开发或测试 Zephyr 独立式应用、带有供应商分支的 Zephyr 集成式应用等时，导出多个 Zephyr 可能很有用。

## Zephyr CMake package export (west)
## Zephyr CMake 包 导出 (Lisa)

When installing [Zephyr using west](https://zephyr-docs.listenai.com/getting_started/index.html#get-the-code) then it is recommended to export Zephyr using `west zephyr-export`.

使用 `Lisa Zephyr` 插件安装 Zephyr 时，建议使用 `lisa zep zephyr-export`。

## Zephyr CMake package export (without west)
## Zephyr CMake 包 导出 (无 Lisa)

Zephyr CMake package is exported to the CMake user package registry using the following commands:

```bash
cmake -P <PATH-TO-ZEPHYR>/share/zephyr-package/cmake/zephyr_export.cmake
```

This will export the current Zephyr to the CMake user package registry.

使用以下命令将 Zephyr CMake 包导出到 CMake 用户包注册表:

```bash
cmake -P <PATH-TO-ZEPHYR>/share/zephyr-package/cmake/zephyr_export.cmake
```

这会将当前的 Zephyr 导出到 CMake 用户包注册表中。

To also export the Zephyr Unittest CMake package, run the following command in addition:

```bash
cmake -P <PATH-TO-ZEPHYR>/share/zephyrunittest-package/cmake/zephyr_export.cmake
```

要导出 Zephyr 单元测试 CMake 包，需要运行以下命令:

```bash
cmake -P <PATH-TO-ZEPHYR>/share/zephyrunittest-package/cmake/zephyr_export.cmake
```



## Zephyr Base Environment Setting
## Zephyr 基础环境设置

The Zephyr CMake package search functionality allows for explicitly specifying a Zephyr base using an environment variable.

To do this, use the following `find_package()` syntax:

```cmake
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
```

This syntax instructs CMake to first search for Zephyr using the Zephyr base environment setting `ZEPHYR_BASE` and then use the normal search paths.

Zephyr CMake 包搜索功能允许使用环境变量指定 Zephyr base。

为此，使用以下 `find_package()` 语法:

```cmake
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
```

此语法说明 CMake 先使用 `ZEPHYR_BASE` 的环境变量搜索 Zephyr，然后再使用标准的搜索路径。

## Zephyr CMake Package Search Order
## Zephyr CMake 包搜索顺序

When Zephyr base environment setting is not used for searching, the Zephyr installation matching the following criteria will be used:

当 Zephyr base 环境变量不用于搜索时，Zephyr 将使用以下条件匹配:

- A Zephyr repository application will use the Zephyr in which it is located. For example:

```
<projects>/zephyr-workspace/zephyr
└── samples
    └── hello_world
```

- Zephyr workspace application will use the Zephyr that share the same workspace. For example:

```
<projects>/zephyr-workspace
├── zephyr
├── ...
└── my_applications
     └── my_first_app
```

in this example, `my_first_app` will use `<projects>/zephyr-workspace/zephyr` as this Zephyr is located in the same workspace as the Zephyr workspace application.

- Zephyr 集成式应用将使用共同 Zephyr SDK 目录。例如:

```
<projects>/zephyr-workspace
├── zephyr
├── ...
└── my_applications
     └── my_first_app
```

在本例中，`my_first_app` 将使用 `<projects>/zephyr-workspace/zephyr` 目录作为 Zephyr SDK。

:::info
The root of a Zephyr workspace is identical to west topdir if the workspace was installed using west
如果 Zephyr SDK 使用 `Lisa Zephyr` 插件安装，Zephyr SDK 的根目录与 `lisa zep topdir` 打印的目录相同。
:::

- Zephyr freestanding application will use the Zephyr registered in the CMake user package registry. For example:

```
<projects>/zephyr-workspace-1
└── zephyr                       (Not exported to CMake)

<projects>/zephyr-workspace-2
└── zephyr                       (Exported to CMake)

<home>/app
├── CMakeLists.txt
├── prj.conf
└── src
    └── main.c
```

in this example, only `<projects>/zephyr-workspace-2/zephyr` is exported to the CMake package registry and therefore this Zephyr will be used by the Zephyr freestanding application `<home>/app`.

If user wants to test the application with `<projects>/zephyr-workspace-1/zephyr`, this can be done by using the Zephyr Base environment setting, meaning set `ZEPHYR_BASE=<projects>/zephyr-workspace-1/zephyr`, before running CMake.

- Zephyr 集成式应用将使用 CMake 用户包注册表中的 Zephyr。例如:

```
<projects>/zephyr-workspace-1
└── zephyr                       (Not exported to CMake)

<projects>/zephyr-workspace-2
└── zephyr                       (Exported to CMake)

<home>/app
├── CMakeLists.txt
├── prj.conf
└── src
    └── main.c
```

该示例中，只有 `<projects>/zephyr-workspace-2/zephyr` 被导出到 CMake 用户包注册表中，因此该 Zephyr 将用于 `<home>/app` 的 Zephyr 集成式应用。

如果用户想用 `<projects>/zephyr-workspace-1/zephyr` 来测试应用，在运行 CMake 之前，你可以通过 `ZEPHYR_BASE=<projects>/zephyr-workspace-1/zephyr` 来设置 Zephyr Base 环境变量。

:::info
The Zephyr package selected on the first CMake invocation will be used for all subsequent builds. To change the Zephyr package, for example to test the application using Zephyr base environment setting, then it is necessary to do a pristine build first (See [Rebuilding an Application](https://docs.zephyrproject.org/latest/develop/application/index.html#application-rebuild)).

在第一次 CMake 运行中选择的 Zephyr 包将用于所有后续构建。要更改 Zephyr 包，例如使用 Zephyr base 环境设置测试应用，则需要先进行原始构建（请参阅[Rebuilding an Application](https://docs.zephyrproject.org/latest/develop/application/index.html#application-rebuild)）。
:::

## Zephyr CMake Package Version¶
## Zephyr CMake 包版本

When writing an application then it is possible to specify a Zephyr version number `x.y.z` that must be used in order to build the application.

Specifying a version is especially useful for a Zephyr freestanding application as it ensures the application is built with a minimal Zephyr version.

It also helps CMake to select the correct Zephyr to use for building, when there are multiple Zephyr installations in the system.

在编写应用程序时，必须指定一个 `x.y.z` 用于构建应用程序的 Zephyr 版本号。

指定版本号对于 Zephyr 独立式应用特别有用，因为它确保应用程序使用最小的 Zephyr 版本构建的。

当系统中有多个 Zephyr 时，它还有助于 CMake 选择正确的 Zephyr 用于构建。

For example:

```cmake
find_package(Zephyr 2.2.0)
project(app)
```

例如:

```cmake
find_package(Zephyr 2.2.0)
project(app)
```

will require `app` to be built with Zephyr 2.2.0 as minimum. CMake will search all exported candidates to find a Zephyr installation which matches this version criteria.

Thus it is possible to have multiple Zephyr installations and have CMake automatically select between them based on the version number provided, see [CMake package version](https://cmake.org/cmake/help/latest/command/find_package.html#version-selection) for details.

这样至少需要 `app` 使用 Zephyr 2.2.0 构建。CMake 将搜索所有导出的版本，以找到符合此版本 Zephyr SDK。

因此，可以有多个 Zephyr，并让 CMake 根据提供的版本号在它们之间自动选择，有关详细信息，请参阅[CMake 包版本](https://cmake.org/cmake/help/latest/command/find_package.html#version-selection)。

For example:

```
<projects>/zephyr-workspace-2.a
└── zephyr                       (Exported to CMake)

<projects>/zephyr-workspace-2.b
└── zephyr                       (Exported to CMake)

<home>/app
├── CMakeLists.txt
├── prj.conf
└── src
    └── main.c
```

in this case, there are two released versions of Zephyr installed at their own workspaces. Workspace 2.a and 2.b, corresponding to the Zephyr version.

例如：

```
<projects>/zephyr-workspace-2.a
└── zephyr                       (Exported to CMake)

<projects>/zephyr-workspace-2.b
└── zephyr                       (Exported to CMake)

<home>/app
├── CMakeLists.txt
├── prj.conf
└── src
    └── main.c
```

在这种情况下，有两个发布版本的 Zephyr SDK 已经安装在自己的电脑上。zephyr-workspace 2.a 和 2.b，对应于 Zephyr 版本。

To ensure `app` is built with minimum version `2.a` the following `find_package` syntax may be used:

```cmake
find_package(Zephyr 2.a)
project(app)
```

Note that both `2.a` and `2.b` fulfill this requirement.

为了确保 `app` 使用最小版本 2.a 构建，可以使用以下 `find_package` 语法:

```cmake
find_package(Zephyr 2.a)
project(app)
```

**请注意** `2.a` 和 `2.b` 版本都满足此要求。

CMake also supports the keyword `EXACT`, to ensure an exact version is used, if that is required. In this case, the application CMakeLists.txt could be written as:

```cmake
find_package(Zephyr 2.a EXACT)
project(app)
```

CMake 还支持关键字 `EXACT`，如果需要精确的版本，可以使用这个关键字。在这种情况下，应用 CMakeLists.txt 可以写成:

```cmake
find_package(Zephyr 2.a EXACT)
project(app)
```

In case no Zephyr is found which satisfies the version required, as example, the application specifies

```cmake
find_package(Zephyr 2.z)
project(app)
```

如果没找到满足所需版本的 Zephyr，例如：

```cmake
find_package(Zephyr 2.z)
project(app)
```

then an error similar to below will be printed:

```
Could not find a configuration file for package "Zephyr" that is compatible
with requested version "2.z".

The following configuration files were considered but not accepted:

  <projects>/zephyr-workspace-2.a/zephyr/share/zephyr-package/cmake/ZephyrConfig.cmake, version: 2.a.0
  <projects>/zephyr-workspace-2.b/zephyr/share/zephyr-package/cmake/ZephyrConfig.cmake, version: 2.b.0
```

然后将会打印类似以下的错误：

```
Could not find a configuration file for package "Zephyr" that is compatible
with requested version "2.z".

The following configuration files were considered but not accepted:

  <projects>/zephyr-workspace-2.a/zephyr/share/zephyr-package/cmake/ZephyrConfig.cmake, version: 2.a.0
  <projects>/zephyr-workspace-2.b/zephyr/share/zephyr-package/cmake/ZephyrConfig.cmake, version: 2.b.0
```

:::info
It can also be beneficial to specify a version number for Zephyr repository applications and Zephyr workspace applications. Specifying a version in those cases ensures the application will only build if the Zephyr repository or workspace is matching. This can be useful to avoid accidental builds when only part of a workspace has been updated.

为 Zephyr 集成式应用指定版本号也是有好处的，指定版本号可确保应用仅在 Zephyr 集成式应用匹配时才会构建。当更新了部分 Zephyr SDK 的代码时，这能有效的避免出现意外的构建。
:::

## Multiple Zephyr Installations (Zephyr workspace)
## 多个 Zephyr 

Testing out a new Zephyr version, while at the same time keeping the existing Zephyr in the workspace untouched is sometimes beneficial.

Or having both an upstream Zephyr, Vendor specific, and a custom Zephyr in same workspace.

For example:

```
<projects>/zephyr-workspace
├── zephyr
├── zephyr-vendor
├── zephyr-custom
├── ...
└── my_applications
     └── my_first_app
```

测试新的 Zephyr 版本，同时保持已经现有的 Zephyr 不变是有好处的。

或者在电脑上同时拥有最新的 Zephyr，供应商特定和自定义的 Zephyr。

例如：

```
<projects>/zephyr-workspace
├── zephyr
├── zephyr-vendor
├── zephyr-custom
├── ...
└── my_applications
     └── my_first_app
```

in this setup, `find_package(Zephyr)` has the following order of precedence for selecting which Zephyr to use:

- Project name: `zephyr`
- First project, when Zephyr projects are ordered lexicographical, in this case.
    - `zephyr-custom`
    - `zephyr-vendor`

This means that `my_first_app` will use `<projects>/zephyr-workspace/zephyr`.

It is possible to specify a Zephyr preference list in the application.

在此设置中，`find_package(Zephyr)` 选择哪个 Zephyr 具有一下优先顺序：

- 项目名称：`zephyr`
- 当 Zephyr 项目按字母顺序排列时：
    - `zephyr-custom`
    - `zephyr-vendor`
  
这种情况下， `my_first_app` 将使用 `<projects>/zephyr-workspace/zephyr`。

可以在应用中指定 Zephyr 偏好列表。

```cmake
set(ZEPHYR_PREFER "zephyr-custom" "zephyr-vendor")
find_package(Zephyr)

project(my_first_app)
```

the `ZEPHYR_PREFER` is a list, allowing for multiple Zephyrs. If a Zephyr is specified in the list, but not found in the system, it is simply ignored and `find_package(Zephyr)` will continue to the next candidate.

`ZEPHYR_PREFER` 是一个列表，允许有多个 Zephyr。如果列表中指定了 Zephyr，但在系统中未找到，则忽略该 Zephyr，并且 `find_package(Zephyr)` 会继续查找下一个。 

This allows for temporary creation of a new Zephyr release to be tested, without touching current Zephyr. When testing is done, the `zephyr-test` folder can simply be removed. Such a CMakeLists.txt could look as:

```cmake
set(ZEPHYR_PREFER "zephyr-test")
find_package(Zephyr)

project(my_first_app)
```

这允许临时创建一个新的 Zephyr 版本进行测试，而不需要修改当前 Zephyr。当测试完成后，可以简单地删除 `zephyr-test` 目录，那么 CMakeLists.txt 如下：

```cmake
set(ZEPHYR_PREFER "zephyr-test")
find_package(Zephyr)

project(my_first_app)
```

## Zephyr Build Configuration CMake package
## Zephyr 构建配置 CMake 包

The Zephyr Build Configuration CMake package provides a possibility for a Zephyr based project to control Zephyr build settings in a generic way.

It is similar to the per-user `.zephyrrc` file that can be used to set [Environment Variables](https://docs.zephyrproject.org/latest/develop/env_vars.html#env-vars), but it sets CMake variables instead. It also allows you to automatically share the build configuration among all users through the project repository. It also allows more advanced use cases, such as loading of additional CMake boilerplate code.

The Zephyr Build Configuration CMake package will be loaded in the Zephyr boilerplate code after initial properties and `ZEPHYR_BASE` has been defined, but before CMake code execution. This allows the Zephyr Build Configuration CMake package to setup or extend properties such as: `DTS_ROOT`, `BOARD_ROOT`, `TOOLCHAIN_ROOT` / other toolchain setup, fixed overlays, and any other property that can be controlled. It also allows inclusion of additional boilerplate code.

Zephyr 构建配置 CMake 包为基于 Zephyr 的项目提供了一种通用方式控制 Zephyr 构建设置的可能性。

它类似于每个用户可以设置 [环境变量](https://docs.zephyrproject.org/latest/develop/env_vars.html#env-vars) 的 `.zephyrrc` 文件，但是它设置的是 CMake 变量而不是环境变量。它还允许你自动地将构建配置分享到项目仓库中。还允许更复杂的用例，例如加载额外的 CMake 示例代码。

Zephyr 构建配置 CMake 包将会在初始化属性并且 `ZEPHYR_BASE` 已定义后在 Zephyr 示例代码中加载，但是在 CMake 代码执行前，这允许 Zephyr 构建配置 CMake 包来设置或扩展属性，例如：`DTS_ROOT`, `BOARD_ROOT`, `TOOLCHAIN_ROOT` 或者其他工具链设置，固定 overlays，以及任何其他可控制的属性。它还允许包含额外的示例代码。

To provide a Zephyr Build Configuration CMake package, create `ZephyrBuildConfig.cmake` and place it in a Zephyr workspace top-level folder as:

```
<projects>/zephyr-workspace
├── zephyr
├── ...
└── zephyr application (can be named anything)
     └── share/zephyrbuild-package/cmake/ZephyrBuildConfig.cmake
```

The Zephyr Build Configuration CMake package will not search in any CMake default search paths, and thus cannot be installed in the CMake package registry. There will be no version checking on the Zephyr Build Configuration package.

要提供 Zephyr 构建配置 CMake 包，请创建 `ZephyrBuildConfig.cmake` 并将其放置在 Zephyr SDK 顶层文件夹中，如下所示：

```
<projects>/zephyr-workspace
├── zephyr
├── ...
└── zephyr application (can be named anything)
     └── share/zephyrbuild-package/cmake/ZephyrBuildConfig.cmake
```

Zephyr 构建配置 CMake 包不会在任何 CMake 默认搜索路径中搜索，因此无法安装在 CMake 包注册表中，并且不会进行版本检查。

:::info
`share/zephyrbuild-package/cmake/ZephyrBuildConfig.cmake` follows the same folder structure as the Zephyr CMake package.

It is possible to place `ZephyrBuildConfig.cmake` directly in a `<zephyr application>/cmake` folder or another folder, as long as that folder is honoring the CMake package search algorithm.

`share/zephyrbuild-package/cmake/ZephyrBuildConfig.cmake` 遵循与 Zephyr CMake 包相同的文件夹结构。

只要该文件夹遵循 CMake 包搜索算法，就可以将 `ZephyrBuildConfig.cmake` 直接放置在 `<zephyr application>/cmake` 文件夹或其他文件夹中。
:::

A sample ZephyrBuildConfig.cmake can be seen below.

```c
# ZephyrBuildConfig.cmake sample code

# To ensure final path is absolute and does not contain ../.. in variable.
get_filename_component(APPLICATION_PROJECT_DIR
                       ${CMAKE_CURRENT_LIST_DIR}/../../..
                       ABSOLUTE
)

# Add this project to list of board roots
list(APPEND BOARD_ROOT ${APPLICATION_PROJECT_DIR})

# Default to GNU Arm Embedded toolchain if no toolchain is set
if(NOT ENV{ZEPHYR_TOOLCHAIN_VARIANT})
    set(ZEPHYR_TOOLCHAIN_VARIANT gnuarmemb)
    find_program(GNU_ARM_GCC arm-none-eabi-gcc)
    if(NOT ${GNU_ARM_GCC} STREQUAL GNU_ARM_GCC-NOTFOUND)
        # The toolchain root is located above the path to the compiler.
        get_filename_component(GNUARMEMB_TOOLCHAIN_PATH ${GNU_ARM_GCC}/../.. ABSOLUTE)
    endif()
endif()
```

可以看看下面一个 `ZephyrBuildConfig.cmake` 示例：

```c
# ZephyrBuildConfig.cmake sample code

# To ensure final path is absolute and does not contain ../.. in variable.
get_filename_component(APPLICATION_PROJECT_DIR
                       ${CMAKE_CURRENT_LIST_DIR}/../../..
                       ABSOLUTE
)

# Add this project to list of board roots
list(APPEND BOARD_ROOT ${APPLICATION_PROJECT_DIR})

# Default to GNU Arm Embedded toolchain if no toolchain is set
if(NOT ENV{ZEPHYR_TOOLCHAIN_VARIANT})
    set(ZEPHYR_TOOLCHAIN_VARIANT gnuarmemb)
    find_program(GNU_ARM_GCC arm-none-eabi-gcc)
    if(NOT ${GNU_ARM_GCC} STREQUAL GNU_ARM_GCC-NOTFOUND)
        # The toolchain root is located above the path to the compiler.
        get_filename_component(GNUARMEMB_TOOLCHAIN_PATH ${GNU_ARM_GCC}/../.. ABSOLUTE)
    endif()
endif()
```

## Zephyr Build Configuration CMake package (Freestanding application)
## Zephyr 构建配置 CMake 包(独立应用)

The Zephyr Build Configuration CMake package can be located outside a Zephyr workspace, for example located with a [Zephyr freestanding application](https://docs.zephyrproject.org/latest/develop/application/index.html#zephyr-freestanding-app).

Zephyr 构建配置 CMake 包可以位于 Zephyr SDK 之外，例如位于 Zephyr [独立应用](https://docs.zephyrproject.org/latest/develop/application/index.html#zephyr-freestanding-app)中。

Create the build configuration as described in the previous section, and then refer to the location of your Zephyr Build Configuration CMake package using the CMake variable `ZephyrBuildConfiguration_ROOT`.

如上一节所述的创建构建配置，然后使用 CMake 变量 `ZephyrBuildConfiguration_ROOT` 引用你的 Zephyr 构建配置 CMake 包的位置。

1.At the CMake command line, like this:

```bash
cmake -DZephyrBuildConfiguration_ROOT=<path-to-build-config> ...
```

1.在 CMake 命令行中，如下所示：

```bash
cmake -DZephyrBuildConfiguration_ROOT=<path-to-build-config> ...
```

2.At the top of your application’s top level `CMakeLists.txt`, like this:

```cmake
set(ZephyrBuildConfiguration_ROOT <path-to-build-config>)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
```

If you choose this option, make sure to set the variable **before** calling `find_package(Zephyr ...)`, as shown above.

2.在你的应用项目的根目录 `CMakeLists.txt` 中，如下所示：

```cmake
set(ZephyrBuildConfiguration_ROOT <path-to-build-config>)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
```

如果选择了此选项，请确保在调用 `find_package(Zephyr ...)` 之前设置变量，如上所示。

3.In a separate CMake script which is pre-loaded to populate the CMake cache, like this:

```cmake
# Put this in a file with a name like "zephyr-settings.cmake"
set(ZephyrBuildConfiguration_ROOT <path-to-build-config>
    CACHE STRING "pre-cached build config"
)
```

3.在预先加载以填充 CMake 缓存的单独 CMake 脚本中，如下所示：

```cmake
# 将此文件放在一个名为 "zephyr-settings.cmake" 的文件中
set(ZephyrBuildConfiguration_ROOT <path-to-build-config>
    CACHE STRING "pre-cached build config"
)
```

You can tell the build system to use this file by adding `-C zephyr-settings.cmake` to your CMake command line. This principle is useful when not using west as both this setting and Zephyr modules can be specified using the same file. See [Zephyr module Without West](https://docs.zephyrproject.org/latest/develop/modules.html#modules-without-west).

你可以通过添加 `-C zephyr-settings.cmake` 到 CMake 命令来告诉构建系统使用此文件。
此原则在不使用 `Lisa Zephyr`插件时很有用，因为可以使用同一个文件指定此设置和 Zephyr 模块。请参阅没有 `Lisa Zephyr` 插件的 [Zephyr 模块](https://docs.zephyrproject.org/latest/develop/modules.html#modules-without-west)。

## Zephyr CMake package source code
## Zephyr CMake 包源代码

The Zephyr CMake package source code in `<PATH-TO-ZEPHYR>/share/zephyr-package/cmake` contains the CMake config package which is used by CMake `find_package` function.

`<PATH-TO-ZEPHYR>/share/Zephyr-package/CMake` 中的 Zephyr CMake 包源代码包含 CMake `find_package` 函数使用的 CMake 配置包。

It also contains code for exporting Zephyr as a CMake config package.

它还包含将 Zephyr 导出为 CMake 配置包的代码。

The following is an overview of those files

以下是这些文件的描述

`CMakeLists.txt`

- The CMakeLists.txt file for the CMake build system which is responsible for exporting Zephyr as a package to the CMake user package registry. 

- CMake 构建系统的 CMakeLists.txt 文件，负责将 Zephyr 作为包导出到 CMake 用户包注册表。

`ZephyrConfigVersion.cmake`

- The Zephyr package version file. This file is called by CMake to determine if this installation fulfils the requirements specified by user when calling `find_package(Zephyr ...)`. It is also responsible for detection of Zephyr repository or workspace only installations.

- Zephyr 包版本文件。这个文件被 CMake 调用来确定这个安装是否满足用户在调用 `find_package(Zephyr ...)` 时指定的要求。它也负责检测 Zephyr 库或 Zephyr SDK 只安装。

`ZephyrUnittestConfigVersion.cmake`

- Same responsibility as `ZephyrConfigVersion.cmake`, but for unit tests. Includes `ZephyrConfigVersion.cmake`.

- 与 `ZephyrConfigVersion.cmake` 相同，但是用于单元测试。包含 `ZephyrConfigVersion.cmake`。

`ZephyrConfig.cmake`

- The Zephyr package file. This file is called by CMake to for the package meeting which fulfils the requirements specified by user when calling `find_package(Zephyr ...)`. This file is responsible for sourcing of boilerplate code.

- Zephyr 包文件。这个文件被 CMake 调用来确定这个安装是否满足用户在调用 `find_package(Zephyr ...)` 时指定的要求。这个文件负责获取样板代码。

`ZephyrUnittestConfig.cmake`

- Same responsibility as `ZephyrConfig.cmake`, but for unit tests. Includes `ZephyrConfig.cmake`.

- 与 `ZephyrConfig.cmake` 相同，但是用于单元测试。包含 `ZephyrConfig.cmake`。

`zephyr_package_search.cmake`

- Common file used for detection of Zephyr repository and workspace candidates. Used by `ZephyrConfigVersion.cmake` and `ZephyrConfig.cmake` for common code.

- 用于检测 Zephyr SDK 下符合要求的 CMake 包的通用文件。由 `ZephyrConfigVersion.cmake` 和 `ZephyrConfig.cmake` 用于公共代码。

`pristine.cmake`

- Pristine file for removing all files created by CMake during configure and generator time when exporting Zephyr CMake package. Running pristine keeps all package related files mentioned above.

- 导出 Zephyr CMake 包时，用于删除 CMake 在配置和生成期间创建的所有文件的原始文件。运行 pristine 会保留上面提到的所有与包相关的文件。
