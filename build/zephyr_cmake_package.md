# Zephyr CMake Package(包)

Zephyr [CMake Package](https://cmake.org/cmake/help/latest/manual/cmake-packages.7.html)(包) 非常适合创建基于 Zephyr 的应用。

Zephyr CMake Package(包) 确保 CMake 可以自动选择 Zephyr 用于编译应用，无论是[Zephyr 集成式应用](../application/application_development.md#集成式应用)，还是 [Zephyr 独立式应用](../application/application_development.md#独立式应用)。

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

在 Linux 中，CMake 用户包注册表在:

`~/.cmake/package/Zephyr`

</TabItem>

<TabItem value="mac">

在 macOS 中，CMake 用户包注册表在:

`~/.cmake/package/Zephyr`

</TabItem>

<TabItem value="win">

在 Windows 中，CMake 用户包注册表在:

`HKEY_CURRENT_USER\Software\Kitware\CMake\Packages\Zephyr`

</TabItem>

</Tabs>

Zephyr CMake Package(包)允许 CMake 自动查找 Zephyr，必须导出一个或者多个 Zephyr。在开发或测试 Zephyr 独立式应用、带有供应商分支的 Zephyr 集成式应用等时，导出多个 Zephyr 可能很有用。

## 导出 Zephyr CMake 包

可使用 `lisa zep` 的以下命令导出。

```bash
lisa zep zephyr-export
```

## Zephyr 基础环境设置

Zephyr CMake 包搜索功能允许使用环境变量指定 Zephyr base。

为此，使用以下 `find_package()` 语法:

```cmake
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
```

此语法说明 CMake 先使用 `ZEPHYR_BASE` 的环境变量搜索 Zephyr，然后再使用标准的搜索路径。

## Zephyr CMake 包搜索顺序

当 Zephyr base 环境变量不用于搜索时，Zephyr 将使用以下条件匹配:

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
Zephyr SDK 的根目录即为 `lisa zep topdir` 打印出的目录。
:::

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
在第一次 CMake 运行中选择的 Zephyr 包将用于所有后续构建。要更改 Zephyr 包，例如使用 Zephyr base 环境设置测试应用，则需要先进行原始构建（请参阅[重新构建应用程序](../application/application_development.md#重新构建应用程序)）。
:::

## Zephyr CMake 包版本

在编写应用程序时，可以指定一个 `x.y.z` 的版本，在指定版本后，必须用该版本进行编译。

指定版本号对于 Zephyr 独立式应用特别有用，因为它确保应用程序使用最小的 Zephyr 版本构建的。

当系统中有多个 Zephyr 时，它还有助于 CMake 选择正确的 Zephyr 用于构建。

例如:

```cmake
find_package(Zephyr 2.2.0)
project(app)
```

这样至少需要 `app` 使用 Zephyr 2.2.0 构建。CMake 将搜索所有导出的版本，以找到符合此版本 Zephyr SDK。

因此，可以有多个 Zephyr，并让 CMake 根据提供的版本号在它们之间自动选择，有关详细信息，请参阅[CMake 包版本](https://cmake.org/cmake/help/latest/command/find_package.html#version-selection)。

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

为了确保 `app` 使用最小版本 2.a 构建，可以使用以下 `find_package` 语法:

```cmake
find_package(Zephyr 2.a)
project(app)
```

**请注意** `2.a` 和 `2.b` 版本都满足此要求。

CMake 还支持关键字 `EXACT`，如果需要精确的版本，可以使用这个关键字。在这种情况下，应用 CMakeLists.txt 可以写成:

```cmake
find_package(Zephyr 2.a EXACT)
project(app)
```

如果没找到满足所需版本的 Zephyr，例如：

```cmake
find_package(Zephyr 2.z)
project(app)
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
为 Zephyr 集成式应用指定版本号也是有好处的，指定版本号可确保应用仅在 Zephyr 集成式应用匹配时才会构建。当更新了部分 Zephyr SDK 的代码时，这能有效的避免出现意外的构建。
:::

## 多个 Zephyr 

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

`ZEPHYR_PREFER` 是一个列表，允许有多个 Zephyr。如果列表中指定了 Zephyr，但在系统中未找到，则忽略该 Zephyr，并且 `find_package(Zephyr)` 会继续查找下一个。 

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

## Zephyr 构建配置 CMake 包(独立应用)

Zephyr 构建配置 CMake 包可以位于 Zephyr SDK 之外，例如位于 Zephyr [独立应用](../application/application_development.md#独立式应用)中。

如上一节所述的创建构建配置，然后使用 CMake 变量 `ZephyrBuildConfiguration_ROOT` 引用你的 Zephyr 构建配置 CMake 包的位置。有下列几种方式：

1. 在你的应用项目的根目录 `CMakeLists.txt` 中，如下所示：

    ```cmake
    set(ZephyrBuildConfiguration_ROOT <path-to-build-config>)
    find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
    ```

    如果选择了此选项，请确保在调用 `find_package(Zephyr ...)` 之前设置变量，如上所示。

2. 在预先加载以填充 CMake 缓存的单独 CMake 脚本中，如下所示：

    ```cmake
    # 将此文件放在一个名为 "zephyr-settings.cmake" 的文件中
    set(ZephyrBuildConfiguration_ROOT <path-to-build-config>
        CACHE STRING "pre-cached build config"
    )
    ```

    你可以通过添加 `-C zephyr-settings.cmake` 到 CMake 命令来告诉构建系统使用此文件。

## Zephyr CMake 包源代码

`<PATH-TO-ZEPHYR>/share/Zephyr-package/CMake` 中的 Zephyr CMake 包源代码包含 CMake `find_package` 函数使用的 CMake 配置包。

它还包含将 Zephyr 导出为 CMake 配置包的代码。

以下是这些文件的描述

`CMakeLists.txt`

- CMake 构建系统的 CMakeLists.txt 文件，负责将 Zephyr 作为包导出到 CMake 用户包注册表。

`ZephyrConfigVersion.cmake`

- Zephyr 包版本文件。这个文件被 CMake 调用来确定这个安装是否满足用户在调用 `find_package(Zephyr ...)` 时指定的要求。它也负责检测 Zephyr 库或 Zephyr SDK 只安装。

`ZephyrUnittestConfigVersion.cmake`

- 与 `ZephyrConfigVersion.cmake` 相同，但是用于单元测试。包含 `ZephyrConfigVersion.cmake`。

`ZephyrConfig.cmake`

- Zephyr 包文件。这个文件被 CMake 调用来确定这个安装是否满足用户在调用 `find_package(Zephyr ...)` 时指定的要求。这个文件负责获取样板代码。

`ZephyrUnittestConfig.cmake`

- 与 `ZephyrConfig.cmake` 相同，但是用于单元测试。包含 `ZephyrConfig.cmake`。

`zephyr_package_search.cmake`

- 用于检测 Zephyr SDK 下符合要求的 CMake 包的通用文件。由 `ZephyrConfigVersion.cmake` 和 `ZephyrConfig.cmake` 用于公共代码。

`pristine.cmake`

- 导出 Zephyr CMake 包时，用于删除 CMake 在配置和生成期间创建的所有文件的原始文件。运行 pristine 会保留上面提到的所有与包相关的文件。
