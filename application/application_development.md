# 应用开发

阅读完本文后，你将学习到：

- 应用程序的项目结构，及各个需要重点了解的文件的职责
- 构建、运行应用程序的基础概念和基本操作
- 板型的概念及自定义板型的方式

:::note 注意
在本文档中，我们假设你的 **应用程序目录** 是 `<home>/app` , 且它的 **构建目录** 是 `<home>/app/build` (下文的概述中会提及这些术语的定义)。 在 Linux/macOS 上, `<home>` 等于 `~` 代表的路径, 在 Windows 上则是 `%userprofile%` 。
:::

## 概述

CSK6 SDK 基于 Zephyr ，而 Zephyr 所使用的构建系统基于 [CMake](https://www.cmake.org/) 。

该构建系统以应用程序为中心，需要基于 Zephyr 的应用程序来启动内核源代码树的构建。应用程序构建中，通过控制应用程序和 Zephyr 本身的配置和构建过程，将它们编译成一个二进制文件。

Zephyr 的基本目录包含 Zephyr 自己的源代码、内核配置选项和构建定义。

**应用程序目录** 中的文件将 Zephyr 与应用程序链接起来。此目录包含所有指定用于应用程序的文件，例如配置选项和源代码。

最简单形式的应用程序目录中包含以下内容：

```
<home>/app
├── CMakeLists.txt
├── prj.conf
└── src
    └── main.c
```

这些内容分别是：

- **CMakeLists.txt** ：该文件告诉构建系统在哪里寻找其他应用程序文件，并将应用程序目录与 Zephyr 的 CMake 构建系统链接。此链接提供了 Zephyr 构建系统支持的特性，例如特定于开发板的内核配置文件、在真实或仿真硬件上运行和调试已编译二进制文件的能力等等。

- **内核配置文件** ：应用程序通常会提供一个 Kconfig 配置文件（通常称为 `prj.conf`），该文件为一个或多个内核配置选项指定特定于应用程序的值。这些应用程序设置与特定于开发板的设置最终会合并以生成内核配置。

  查看 [Kconfig 配置](#kconfig-配置) 了解更详细的内容。

- **应用程序源代码文件** ：一个应用程序通常会提供一个或多个应用程序特定的文件，这些文件是用 C 或汇编语言编写的。这些文件通常位于名为 `src` 的子目录中。

下文中将描述如何创建、构建和运行 Zephyr 应用程序，并且提供更详细的参考资料。

## 应用类型

根据应用程序的源代码所在的位置，我们可以区分两种基本应用程序类型。

- 集成式应用
- 独立式应用

你可以在 [Zephyr CMake 包](../build/zephyr_cmake_package.md#zephyr-cmake-包) 部分中找到有关构建系统如何支持这些应用程序类型的更多信息。

### 集成式应用

集成式应用，指的是应用与 SDK 位于同一根目录内、但应用程序文件在 Zephyr SDK 仓库（以及文件夹）之外的应用。在以下示例中， `app` 目录即集成式应用：

```
app/
├─── .sdk/
│   ├─── .west/
│   │    └─── config
│   ├─── zephyr/
│   ├─── bootloader/
│   ├─── modules/
│   ├─── tools/
│   └─── <vendor/private-repositories>/
├── CMakeLists.txt
├── prj.conf
├── src/
│   └── main.c
└── west.yml
```

### 独立式应用

独立式应用指位于 Zephyr SDK 之外的 Zephyr 应用程序。在以下示例中， `app` 目录即独立式应用：

```
<home>/
├─── .listenai/csk6-sdk/
│     ├─── .west/
│     │    └─── config
│     ├── zephyr/
│     ├── bootloader/
│     ├── modules/
│     └── ...
│
└─── app/
     ├── CMakeLists.txt
     ├── prj.conf
     └── src/
         └── main.c
```

## 创建一个应用

跟着以下步骤按部就班即可创建一个新的应用目录。（请参阅 [示例应用](https://cloud.listenai.com/zephyr/example-application) Git 仓库获取其中独立的参考应用程序，或参阅 [使用示例](./peripheral/overview.md) 获取现有的由聆思提供的示例应用程序。）

1. 在你工作的电脑上创建一个应用目录，其位置在 Zephyr base 目录之外。

  例如，在一个 Unix 终端或 Windows 的 `cmd.exe` ，进入到你要创建应用程序的位置，输入：

  ```
  lisa zep create
  ```

2. 上一步的命令后，你将看到这样的交互式界面，选择 `hello_world` 示例，以它作为基础创建一个应用目录。

<img
width="80%"
src={require('./images/lisa_zep_create_sample.png').default}
/> 

3. 输入要创建的文件夹名称。

  <img
  width="80%"
  src={require('./images/lisa_zep_create_dir_sample.png').default}
  />

  :::warning 警告
  在一个带有空格的路径中构建 Zephyr 或创建应用都是不支持的。因此形如 `C:\Users\YourName\app` 的路径可用，但 `C:\Users\Your Name\app` 则不可用。
  :::

4. 进入到你创建的目录中，你将看到这样的目录结构

  ```
  hello_world/
  ├── CMakeLists.txt
  ├── prj.conf
  ├── prj_uefi.conf
  ├── README.rst
  ├── sample.yaml
  └── src/
      └── main.c
  ```

  在 `CMakeLists.txt` 中你可以看到

  ```c
  # SPDX-License-Identifier: Apache-2.0

  cmake_minimum_required(VERSION 3.20.0)

  find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
  project(hello_world)

  target_sources(app PRIVATE src/main.c)
  ```

  对 CMake 来说，在 `CMakeLists.txt` 中必须声明 `cmake_minimum_required()` ，它代表要求主机上的 CMake 版本号的最小限制。 Zephyr 包中也同样会声明这个限制。 CMake 将强制使用这两个调用中所声明的较新 CMake 版本。（例如，若应用中 `cmake_minimum_required(VERSION 3.20.0)` 而 Zephyr 中声明 `cmake_minimum_required(VERSION 3.18.0)` ，那么以更新的 `3.20.0` 作为最小版本号限制。）

  `find_package(Zephyr)` 表示引入 Zephyr 构建系统，该系统创建一个名为 `app` 的 CMake 目标（请参阅 [Zephyr CMake 包](../build/zephyr_cmake_package.md#zephyr-cmake-包) ）。你可以通过将源代码文件添加到此目标，来将它们包含在构建中。该 Zephyr 包将 `Zephyr-Kernel` 定义为 CMake 项目，并支持 `C` 、 `CXX` 、 `ASM` 语言。

  调用 `project(hello_world)` 是定义应用程序项目所必需的（括号中的参数代表项目名，可自定义）。它必须在 `find_package(Zephyr)` 之后调用，以避免干扰 Zephyr 的 `project(Zephyr-Kernel)` 。

  `target_sources(app PRIVATE src/main.c)` 表示将源代码文件添加到 `app` 目标。它也必须在 `find_package(Zephyr)` 之后调用。

5. 设置 Kconfig 配置选项。请参阅 [Kconfig 配置](#kconfig-配置) 。

6. 配置你的应用所需的设备树 overlay 。请参阅 [设置设备树 overlay](../build/dts/howtos.md#如何设置设备树-overlay) 。

## 引入构建系统变量

你可以控制 Zephyr 构建系统使用多个变量。该小节描述了 Zephyr 开发者应当了解的最重要的几个变量。

:::info 注意
变量 **BOARD** 、 **CONF_FILE** 和 **DTC_OVERLAY_FILE** 可以通过 3 种方式（按优先顺序）提供给构建系统：

* 调用 `lisa zep build` 时通过 `-D` 增加命令行参数。如果你有多个覆盖文件，你应该使用引号，例如  `"file1.overlay;file2.overlay"`
* 作为 [环境变量](./env_vars.md) 声明。
* 在 `CMakeLists.txt` 中以 `set(<VARIABLE> <VALUE>)` 声明。
:::

- **ZEPHYR_BASE** ：构建系统使用的 Zephyr 基本变量。 `find_package(Zephyr)` 会自动将其设置为缓存的 CMake 变量。但是 `ZEPHYR_BASE` 也可以设置为环境变量，以强制 CMake 使用特定的 Zephyr 安装。

- **BOARD** ：选择应用程序构建将用于默认配置的板型。

- **CONF_FILE** ：表示若干个 Kconfig 配置片段文件的名称。多个文件名用空格或分号分隔。每个文件都包含覆盖默认配置值的 Kconfig 配置值。
  
  请参阅 [初始配置](../build/kconfig/setting.md#初始配置) 。

- **OVERLAY_CONFIG** ：附加的 Kconfig 配置片段文件。多个文件名可以用空格或分号分隔。但你想要将 `CONF_FILE` 保持为其默认值，但“混入”了一些额外的配置选项时，此配置十分有用。

- **DTC_OVERLAY_FILE** ：要使用的若干个设备树覆盖文件。多个文件时用分号分隔。设备树覆盖文件如何使用请参阅 [设置设备树 Overlay](../build/dts/howtos.md#如何设置设备树-overlay) ;有关设备树和 Zephyr 的关系，请参阅 [设备树的介绍](../build/dts/intro.md) 。

- **ZEPHYR_MODULES** ：一个 CMake 列表，其中包含应在应用程序构建中使用的源代码、 Kconfig 等附加目录的绝对路径。有关详细信息，请参阅 [模块（外部项目）](https://docs.zephyrproject.org/latest/develop/modules.html#modules) 。如果你设置此变量，它必须是包含所有要使用的模块的完整列表，因为设置此变量后构建系统不会自动从通过 `lisa zep` 获取任何模块。

:::info 注意
你可以使用一个 [Zephyr 构建配置 CMake 包](../build/zephyr_cmake_package.md#cmake-build-config-package) 来为这些变量共享公用设置。
:::

## 应用 CMakeLists.txt

每一个应用都必须有一个 `CMakeLists.txt` 文件，它代表构建系统的入口点或最顶层。最终的 `zephyr.elf` 镜像包含应用和内核库。

本节介绍了你可以在 `CMakeLists.txt` 中执行的一些操作。请确保以下步骤按顺序执行。

1. 如果你只想要为一个板型构建，那么在你的应用中新起一行添加这个板型配置的名称。例如

  ```c
  set(BOARD csk6002_9s_nano)
  ```

  Zephyr 构建系统通过以下方式 **按顺序** 检查来确定 **BOARD** 的值（当找到 BOARD 变量时，CMake 就会停止通过下表的方式查找）：

    1. 由 CMake 缓存确定的任何先前使用的值都具有最高优先级。这可确保你不会尝试使用与在构建配置步骤中设置的不同的 **BOARD** 值运行构建。
    2. 任何在 CMake 命令行（直接或间接通过 `lisa zep build` ）使用 `-DBOARD=YOUR_BOARD` 配置的值，都将被检查并在其执行的过程中使用。
    3. 如果 [环境变量](./env_vars.md) 中设置了 `BOARD` ，则将使用其值。
    4. 最后，如果你按照前文所述在应用的 `CMakeLists.txt` 中设置 `BOARD` ，则将使用该值。


2. 如果你的应用程序使用一个或多个配置文件，而不是常见的 `prj.conf`（或 `prj_YOUR_BOARD.conf` ，其中 `YOUR_BOARD` 是板型名称），请将这些文件适当地设置到 **CONF_FILE** 变量中。如果一次性配置多个文件名，请用一个空格或分号将它们分开。若你想避免在单个位置设置 **CONF_FILE** ，可以使用 CMake 列表操作以模块化方式构建配置片段文件。例如：

  ```c
  set(CONF_FILE "fragment_file1.conf")
  list(APPEND CONF_FILE "fragment_file2.conf")
  ```

  请参阅 [初始配置](../build/kconfig/setting.md#初始配置) 了解更多详细信息。

3. 如果你的应用程序使用设备树覆盖，可能需要设置 [DTC_OVERLAY_FILE](#引入构建系统变量) 。请参阅 [设置设备树 Overlay](../build/dts/howtos.md#如何设置设备树-overlay) 。

4. 如果你的应用程序有自己的内核配置选项，请在与应用程序 `CMakeLists.txt` 的同级目录中创建一个 `Kconfig` 文件。

  有关 Kconfig 的详细文档，请参阅 [文档的 Kconfig 部分](../build/kconfig/index.md) 。

  一个（不典型的）高级用法是，如果你的应用程序有自己独特的配置**选项**，这些选项根据构建配置进行不同的设置。

  如果你只想基于现有的 Zephyr 配置选项设置特定于应用程序的**值**，请参阅上面的 **CONF_FILE** 描述。

  像这样构造你的 Kconfig 文件：

  ```c
  # SPDX-License-Identifier: Apache-2.0

  mainmenu "Your Application Name"

  # 你的应用配置选项可以在这里编写

  # 引用 Zephyr 根目录下的 Kconfig.zephyr
  #
  # 注意：所有的 'source' 语句都是以 Zephyr 根目录为基准的（取决于
  # 设置给 $ZEPHYR_BASE 的 $strtree 环境变量）。如果你想要 'source' 
  # 一个相对于当前 Kconfig 文件路径的配置，使用 'rsource' 语句（或者
  # 使用相对于 Zephyr 根目录的路径）。
  source "Kconfig.zephyr"
  ```

  :::info 注意
  `source` 语句中的环境变量是可直接展开的，所以不需要定义 `option env="ZEPHYR_BASE"` Kconfig “bounce”符号。如果使用这样的符号，它必须与环境变量同名。

  查看 [Kconfig 扩展](../build/kconfig/extensions.md) 了解更多信息。
  :::

  当 `Kconfig` 文件放置在应用程序目录中时，会自动检测到；如果该文件位于其他位置，但以绝对路径设置为 CMake 变量 **KCONFIG_ROOT** ，也可以被找到。

5. **在上述步骤添加完的声明之后**，增加声明该应用依赖 Zephyr ：

  ```c
  find_package(Zephyr)
  project(my_zephyr_app)
  ```

  :::info 注意
  我们支持显式设置 `ZEPHYR_BASE` 环境变量来强制设置特定的 Zephyr 安装路径的方式，如果这样做，上述示例的声明语句可改为 `find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})` 。 Zephyr 中的所有示例都支持 `ZEPHYR_BASE` 环境变量。
  :::

6. 接下来，将任何应用程序源文件添加到“app”目标库中，一个文件一行，如下所示：

  ```c
  target_sources(app PRIVATE src/main.c)
  ```

下面是一个简单的 `CMakeLists.txt` 示例：

```c
set(BOARD qemu_x86)

find_package(Zephyr)
project(my_zephyr_app)

target_sources(app PRIVATE src/main.c)
```

Cmake 属性 `HEX_FILES_TO_MERGE` 利用 Kconfig 和 CMake 提供的应用程序配置，让你可以将外部构建的 hex 文件与构建 Zephyr 应用程序时生成的 hex 文件合并。例如：

```c
set_property(GLOBAL APPEND PROPERTY HEX_FILES_TO_MERGE
    ${app_bootloader_hex}
    ${PROJECT_BINARY_DIR}/${KERNEL_HEX_NAME}
    ${app_provision_hex})
```

## 应用配置

### 应用配置目录

Zephyr 将使用的配置文件存在于应用程序配置目录中，但使用前文提及的使用参数声明绝对路径的方式除外，例如 `CONF_FILE` 、 `OVERLAY_CONFIG` 和 `DTC_OVERLAY_FILE` 。

应用程序配置目录由 `APPLICATION_CONFIG_DIR` 变量定义。

`APPLICATION_CONFIG_DIR` 将由以下具有最高优先级的源之一设置。

1. 如果用户使用 `-DAPPLICATION_CONFIG_DIR=<path>` 或在 CMake 文件中的 `find_package(Zephyr)` 之前指定了 `APPLICATION_CONFIG_DIR` ，则此文件夹将用作应用程序的配置目录。
2. 应用程序的源码目录。

### Kconfig 配置

应用配置选项通常在应用目录下的 `prj.conf` 中设置。例如，启用 GPIO 可通过以下语句声明：

```c
CONFIG_GPIO=y
```

一种开始学习如何配置的好方法是在 [现有示例](./peripheral/overview.md) 中查看示例配置。

有关设置 Kconfig 配置值的详细文档，请参阅 [设置 Kconfig 配置值](../build/kconfig/setting.md#设置-kconfig-配置值) ，该文档同一页面上的 [初始配置章节](../build/kconfig/setting.md#初始配置) 解释了初始配置是如何派生的。有关配置选项的完整列表，可通过 [Kconfig 搜索](https://docs.zephyrproject.org/latest/kconfig.html#kconfig-search) 检索。有关与 Kconfig 选项相关的安全信息，请参阅 [强化工具](https://docs.zephyrproject.org/latest/security/hardening-tool.html#hardening) 。

在 [文档的 Kconfig 部分](../build/kconfig/index.md) 中的其他内容也值得一读，特别是当你打算添加新配置选项的时候。

## 特定于应用的代码

特定于应用程序的源代码文件通常放置到应用程序的 `src` 目录中。如果应用程序需要添加大量文件，开发者可以在 `src` 下的子目录中将它们分组，子目录深度不受限制。

特定于应用程序的源代码中所使用的的符号前缀，不应与内核保留给内部使用的符号前缀重复。更详细的信息请参阅 [命名约定](https://github.com/zephyrproject-rtos/zephyr/wiki/Naming-Conventions) 。

### 第三方库源码

在应用程序的 `src` 目录之外构建库代码是可行的，但重要的是应用程序和库代码都面向相同的应用程序二进制接口 ( Application Binary Interface ，简写为 ABI )。在大多数架构上，都有控制 ABI 目标的编译器参数，因此库和应用程序都必须具有某些共同的编译器参数。胶水代码访问 Zephyr 内核头文件也可能很有用。

为了让开发者更容易集成第三方组件，Zephyr 构建系统定义了一系列 CMake 函数，使应用程序构建脚本可以访问 zephyr 编译器选项。这些函数在 [cmake/extensions.cmake](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/cmake/extensions.cmake) 中定义和声明用法，并遵循命名约定 `zephyr_get_<type>_<format>` 。

下述变量通常需要导出到第三方构建系统。
- `CMAKE_C_COMPILER` ， `CMAKE_AR` 。
- `ARCH` 和 `BOARD` ，以及用于标识 Zephyr 内核版本的若干变量。

[samples/application_development/external_lib](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/application_development/external_lib) 是一个示例项目，它演示了上述的一些功能。

## 构建应用程序

Zephyr 构建系统将应用程序的所有组件编译并链接到单个应用程序镜像中，该镜像可以在模拟硬件或真实硬件上运行。

与任何其他基于 CMake 的系统一样，构建过程分 [两个阶段](https://docs.zephyrproject.org/latest/build/cmake/index.html#cmake-details) 进行。首先，在指定生成器时使用 `cmake` 命令行工具生成构建文件（也称为构建系统）。此生成器确定构建系统将在第二阶段使用的本机构建工具。第二阶段运行本机构建工具，执行实际的构建源文件过程并生成镜像。要了解有关这些概念的更多信息，请参阅 CMake 官方文档中的 [CMake 介绍](https://cmake.org/cmake/help/latest/manual/cmake.1.html#description) 。

[lisa zephyr 插件](../tool/lisa_plugin_zephyr/index.md) 是默认用于构建 Zephyr 的工具，它是 CSK6 SDK 的伴生工具。它在后台最终调用 cmake 和底层构建工具（ `ninja` 或 `make` ）来完成构建工作的。而在 Windows 上，最终使用的是 `ninja` ，因为该平台不支持 `make` 。当你使用 `lisa zep build` 来构建你的应用程序，请知道它将默认使用 `ninja` 。

例如，让我们来尝试为 `csk6002_9s_nano` 编译 Hello World 示例：

```bash
lisa zep build -b csk6002_9s_nano samples/hello_world
```

### 基本用法

1. 进入到应用目录，以 `<home>/app` 为例。

2. 输入以下命令为命令行参数中指定的板型构建应用程序的 `zephyr.elf` 镜像：

  ```bash
  lisa zep build -b <board>
  ```

  如果需要，你可以使用在备用 `.conf` 文件中使用 `CONF_FILE` 参数指定的配置设置来构建应用程序。这些设置将覆盖应用程序的 `.config` 文件或其默认 `.conf` 文件中的设置。例如：

  ```bash
  lisa zep build -b <board> -- -DCONF_FILE=prj.alternate.conf
  ```

  如上一节所述，当你需要永久设置板型和配置设置时，你可以通过导出 **BOARD** 和 **CONF_FILE** 环境变量，或使用 `set()` 语句在 `CMakeLists.txt` 中设置它们的值。此外， `lisa zep` 允许你 [设置默认板型](https://docs.zephyrproject.org/latest/develop/west/build-flash-debug.html#west-building-config)。

### 构建目录内容

默认情况下，构建目录看起来长这样：

```bash
<home>/app/build
├── build.ninja
├── CMakeCache.txt
├── CMakeFiles
├── cmake_install.cmake
├── rules.ninja
└── zephyr
```

构建目录中最值得注意的文件是：
- `build.ninja` ，被执行用于构建应用程序。
- `zephyr` 目录，它是用于生成构建系统的工作目录，大部分生成的文件都是在其中创建和存储的。

运行 `ninja` 后，以下构建输出文件将被写入构建目录的 `zephyr` 子目录。（这里不是指包含 Zephyr 源代码等上文提及过的 **Zephyr base 目录**）

- `.config` ，包含用于构建应用程序的配置设置。

  :::info 注意
  每当配置更新，前一个版本的 `.config` 文件就会被保存为 `.config.old` 。这是出于方便的考量，这样一来比较新旧版本就很方便。
  :::

- 包含已编译内核和应用程序代码的各种目标文件（ `.o` 文件和 `.a` 文件）。

- `zephyr.elf` ，其中包含最终组合的应用程序和内核二进制文件。还支持其他二进制输出格式，例如 `.hex` 和 `.bin` 。

### 重新构建应用程序

当不断地测试更改时，应用程序开发通常是最快的。随着应用程序复杂度变得越来越高，频繁地重新构建应用程序可以减少调试的痛苦。在对应用程序的源文件、 CMakeLists.txt 文件或配置设置进行任何重大更改后，重新构建和测试通常是一个好主意。

:::tip 重要
Zephyr 构建系统仅重建可能受更改影响的应用程序镜像的部分。因此，重新构建应用程序通常比第一次构建应用程序要快得多。
:::

有些时候构建系统可能在重新编译一个或多个必要的文件失败，最终导致无法正确地重新构建应用程序。你可以通过以下过程强制让构建系统从头开始重新构建整个应用程序：

1. 在主机上打开终端控制台，然后进入到构建目录 `<home>/app/build` 。

2. 输入以下命令，直接删除应用程序的生成文件，但包含应用程序当前配置信息的 `.config` 文件除外。

  ```bash
  lisa zep build -t clean
  ```

  或者，输入以下命令以删除所有生成的文件，包括 `.config` 文件，其中包含这些板型的应用程序当前配置信息。

  ```
  lisa zep build -t pristine
  ```
  
  你可以利用 `lisa zephyr` 工具的功能在需要时自动 [使构建文件夹保持原始状态](https://docs.zephyrproject.org/latest/develop/west/build-flash-debug.html#west-building-config) 。

3. 通常按照上面 [构建应用程序](#构建应用程序) 中指定的步骤重新构建应用程序。

## 运行应用程序

Zephyr 支持的大多数开发板都允许你使用 `flash` 目标将已编译的二进制文件烧写，以将二进制文件复制到开发板并运行它。按照以下说明在真机上刷写和运行应用程序：

1. 如上文 [构建应用程序](#构建应用程序) 的描述构建你的应用。
2. 确保你的开发板连接到了你的主机电脑。通常情况下你通过连接 USB 完成这一步。
3. 在构建目录 `<home>/app/build` 中运行以下命令，将编译好的 Zephyr 镜像烧录并运行在你的开发板上：

  ```bash
  lisa zep flash
  ```

Zephyr 构建系统与开发板支持文件相结合以使用特定于硬件的工具将 Zephyr 二进制文件烧录到你的硬件，然后运行它。

每次运行 flash 命令时，你的应用程序都会重新构建并再次烧录。

在开发板支持不完整的情况下，可能不支持通过 Zephyr 构建系统进行烧录。如果你收到有关烧录支持不可用的错误消息，请查阅 [你的开发板文档](https://docs.zephyrproject.org/latest/boards/index.html#boards) 以获取有关如何对你的开发板进行烧录的更多信息。

:::info 注意
在 Linux 上开发时，通常需要安装特定于开发板的 udev 规则，以允许非 root 用户身份可通过 USB 设备访问你的开发板。如果烧录失败，请查阅开发板的对应文档查阅是否有必要。
:::

## 自定义板型与设备树

如果你正在开发的开发板型或平台尚未受 Zephyr 支持，你可以在你的应用程序中定义开发板与设备树，而无需将它们添加到 Zephyr SDK 中。

在 SDK 外维护的板型所需的结构，与在 Zephyr SDK 中的方式类似。通过使用这种结构，在完成初步开发后，将与平台相关的改动上传到 Zephyr 主仓会更容易。

使用以下结构将自定义板添加到你的应用程序或专用代码仓库：

```bash
boards/
CMakeLists.txt
prj.conf
README.rst
src/
```

`boards` 目录用于放置你要构建的开发板：

```bash
.
├── boards
│   └── x86
│       └── my_custom_board
│           ├── doc
│           │   └── img
│           └── support
└── src
```

### 板型

在 `board` 目录下为 `my_custom_board` 使用正确的架构文件夹名称（例如 `x86` 、 `arm` 等）。（有关板型架构列表，请参阅 [支持的板](https://docs.zephyrproject.org/latest/boards/index.html#boards) 。）

文档（在 `doc/` 下）和支持文件（在 `support/` 下）可选是否添加。

`my_custom_board` 的内容应遵循任何 Zephyr 板型的相同准则，并提供以下文件：

```bash
my_custom_board_defconfig
my_custom_board.dts
my_custom_board.yaml
board.cmake
board.h
CMakeLists.txt
doc/
dts_fixup.h
Kconfig.board
Kconfig.defconfig
pinmux.c
support/
```

当板型结构就绪后，即可通过使用 CMake 构建系统的 `-DBOARD_ROOT` 参数指定自定义板型信息的位置来构建针对该板型的应用程序：

```bash
lisa zep build -b <board name> -- -DBOARD_ROOT=<path to boards>
```

这一命令将使用你的自定义板型配置并生成 Zephyr 二进制文件到你的应用程序目录中。

:::info 注意
在 CMakeLists.txt 中指定 `BOARD_ROOT` 时，必须声明为绝对路径，例如 `list(APPEND BOARD_ROOT ${CMAKE_CURRENT_SOURCE_DIR}/<extra-board-root>` 。使用 `-DBOARD_ROOT=<board-root>` 时，则绝对路径和相对路径都可以。其中，相对路径视为相对于应用程序目录。
:::

### 设备树定义

设备树的目录树会从 `APPLICATION_SOURCE_DIR` 、 `BOARD_DIR` 和 `ZEPHYR_BASE` 中查找，但额外的树或 DTS_ROOT 可以通过创建此目录树来添加：

```
include/
dts/common/
dts/arm/
dts/
dts/bindings/
```

其中每个目录都是可选的。绑定目录包含绑定，其他目录包含可以从设备树源中包含的文件。

当目录结构就绪后，即可通过 `DTS_ROOT` CMake Cache 变量指定其位置来使用它：

```bash
lisa zep build -b <board name> -- -DDTS_ROOT=<path to dts root>
```

你还可以在应用程序 `CMakeLists.txt` 文件中定义该变量。确保这一操作在使用 `find_package(Zephyr ...)` 引入 Zephyr 构建模板之前。

:::info 注意
在 CMakeLists.txt 中指定 `DTS_ROOT` 时，必须声明为绝对路径，例如 `list(APPEND DTS_ROOT ${CMAKE_CURRENT_SOURCE_DIR}/<extra-dts-root>` 。使用 `-DDTS_ROOT=<dts-root>` 时，则绝对路径和相对路径都可以。其中，相对路径视为相对于应用程序目录。
:::

设备树源代码通过 C 预处理器传递，因此你可以引入位于 `DTS_ROOT` 目录中的文件。按照约定，设备树引入文件的扩展名为 `.dtsi` 。

你还可以使用预处理器来控制设备树文件的内容，方法是通过 `DTS_EXTRA_CPPFLAGS` CMake Cache 变量指定指令：

```bash
lisa zep build -b <board name> -- -DDTS_EXTRA_CPPFLAGS=-DTEST_ENABLE_FEATURE
```
