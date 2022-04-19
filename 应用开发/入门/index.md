# 入门

本节主要讲解 CSK6 应用开发的必要过程。通过本章节，你可以快速了解到:


* 如何进行项目的常用操作；（基于 **lisa zep**）


* CSK6 应用程序的项目结构；


* 项目的构建流程；

## 概述

CSK6 项目采用的是 **SDK源码** 与 **应用源码** 分离的形式。本节我们所讲的应用工程，
是指应用源码部分。

应用程序目录中的文件，会将应用程序和 SDK 链接到一起。这个目录主要包含特定的应用程序文
件，如: 配置文件、源代码、板型支持文件等。

最简单的应用程序包含以下内容:

```none
<home>/app
├── CMakeLists.txt
├── prj.conf
└── src
    └── main.c
```


* **CMakeLists.txt** : 用于声明应用程序的源码文件位置，并将应用目录与 SDK 的构建系统链接起来;


* **内核配置文件** : 通用命名为 **prj.conf** ，这是应用程序提供的一个 Kconfig 配置文件，该文
件为一个或者多个内核配置选项，指定特定于应用的值。这些配置与特定的板型配置，合并生成最终的内核配置；

更多信息请参见下面的 [Kconfig 选项文档](https://docs.zephyrproject.org/latest/reference/kconfig/index.html) 。


* **应用源码文件** : 应用程序提供的应用源码文件，这些文件一般我们放在 **src** 目录下；

只要有了以上这个最简单的应用程序，就可以使用 CMake 来创建构建目录，并构建应用程序。
这些构建产物都将位于构建目录（不同于项目目录）。

接下来，我们将通过实际操作，来讲解如何创建、构建、运行 CSK6 的应用程序。

**NOTE**: 以下所有操作示例，都是基于 [csk6001_pico](https://docs.zephyrproject.org/latest/guides/build/kconfig/setting.html) 开发板，并通过 [lisa zep](https://docs.zephyrproject.org/latest/guides/build/kconfig/setting.html) 来进行相关的项目操作。

## 创建项目

按照以下操作，我们可以快速创建一个新的应用项目:


1. 在你想要存放的项目目录下，运行以下命令

```console
lisa zep create
```

**WARNING**: 应用项目的存放路径，不支持带空格（全路径）

当你运行了这个命令，**zep** 会从 SDK 中查找符合条件的示例程序，提供选择，最后通过示例程序来创建新的项目。


2. 选择示例程序

此处我们选择 **hello_world** 示例程序；


3. 输入项目名称

此处我们输出 **FirstApp** 作为项目名称，然后按 **回车** 确认；

**NOTE**: 此处也可以直接回车，代表直接使用示例名称，作为项目名称；

至此我们的项目已创建完成。可以看到多了一个 **FirstApp** 文件夹，进入文件夹，我们就可以看到以下文件了。

```none
<home>/FirstApp
├── CMakeLists.txt
├── prj.conf
├── sample.yaml
├── README.rst
└── src
    └── main.c
```

**NOTE**: **lisa zep create** 的操作，主要是从 **SDK源码** 中，将 samples 文件夹中，
符合条件的示例文件拷贝到当前目录中，以此来减少文件夹的创建、拷贝等操作。

## 配置

项目主要配置以下几个对象: 内核、设备树、系统功能、应用功能。

而配置的途径，主要有以下几种:


* **lisa zep menuconfig** : 这个操作相当于执行 **menuconfig** , 只会生效在当前构建产物中，
如果清除了构建产物，则配置失效；

关于 **MenuConfig** 的介绍及使用，可以参考: [MenuConfig](https://docs.zephyrproject.org/latest/guides/build/kconfig/setting.html) ;


* **Kconfig 声明文件** : **xxx.Kconfig** 文件主要用于新增应用程序的 **自定义配置** ；

具体可以参考 [设置 Kconfig](https://docs.zephyrproject.org/latest/guides/build/kconfig/setting.html)


* **Kconfig 配置文件** : 通用命名为 **prj.conf** ，是最常用的应用程序配置文件。

比如可以通过以下配置，来打开对 C++ 的支持:

```none
CONFIG_CPLUSPLUS=y
```

更多 **Kconfig 选项** 可以查阅 [Kconfig 选项文档](https://docs.zephyrproject.org/latest/reference/kconfig/index.html) 。

**NOTE**: CSK6 应用程序项目，是可以面向不同板型的。如果项目对于特定板型，需要有特定的配
置时，可以通过 **./board/<板型名称>.conf** 来进行特别的配置。如: **./board/csk6001_pico.conf**


* **overlay 文件** : **设置树** 覆盖配置文件，一般命名为 **app.overlay** ，主
要用于修改、增加新的设备配置。比如修改默认 flash 分区等。

具体可以查看 [设备树覆盖配置](https://docs.zephyrproject.org/latest/guides/dts/howtos.html#set-devicetree-overlays) 。

**NOTE**: 可以通过 **./board/<板型名称>.overlay** 来进行特别的配置，可以参考示例:
samples/subsys/openamp/board/csk6001.overlay

## 构建

CSK6 SDK 的构建系统是基于 [CMake](https://docs.zephyrproject.org/latest/guides/dts/howtos.html#set-devicetree-overlays) 来进行的。

但为了避免安装构建系统复杂的工具依赖，一般我们都是使用 **lisa zep build** 来构建项目。

运行以下命令，可以编译我们上面创建的 **FirstApp** 项目:

```shell
# 指定板型、程序目录，进行构建
lisa zep build -b csk6001_pico ./FirstApp
```

或者

```shell
# 进入应用目录
cd FirstApp
# 指定板型，进行构建
lisa zep build -b csk6001_pico
```

通过运行以上目录，我们可以在运行命令的目录下，得到一个 **build** 文件夹（该文件夹
我们称为 **构建目录**）。

构建产物都存放于 **构建目录** 下，如二进行程序 **build/zephyr/zephyr.bin** 。

常用的构建选项:


* **-b** : 指定开发板板型；


* **-c** : 先清理构建产物，再进行构建；


* **-d** : 指定 **构建目录** ；

CSK6 SDK 的构建，主要分为两个阶段:


* **配置阶段** : 执行 CMakeLists.txt，使用 CMake 来组织构建，生成对应的构建脚本；


* **构建阶段** : 由 Make 或 Ninja 来执行构建脚本，构建目标结果，编译输出应用程序；

**NOTE**: 配置阶段产生的构建脚本，在大部分情况下的代码修改，是可以重复用于构建程序的。但某些
情况下，则需要重新执行 *配置阶段* ，生成新的构建脚本，一般情况下，构建脚本可以自动发现
并自动重新配置。但有些时候不会，比如使用 **-b** 选项指定不同板型，则需要手动清理编译产物。

构建系统是一个比较复杂的设计，具体可以查看 [Zephyr 构建系统](https://docs.zephyrproject.org/latest/guides/build/index.html#build-system-cmake) 。

## 烧录

CSK6 集成于 ROM 中的烧录，支持 **JLink** 和 **Uart** 两种方式。 [csk6001_pico](https://docs.zephyrproject.org/latest/guides/build/kconfig/setting.html) 将默认集成 DAP-Link ，
本节所讲解的烧录，主要以 JLink 为主。

**NOTE**: 关于 *csk6001_pico* 与 jlink 如何连接，具体可以查看 [csk6001_pico](https://docs.zephyrproject.org/latest/guides/build/kconfig/setting.html)

### 烧录应用程序

连接 jlink 后，执行以下命令，可以对编译结果进行烧录。

```shell
lisa zep flash
```

**zep flash** 默认是通过 JLink 的方式进行烧录，将二进制程序烧录到默认的 Flash 位置（ **0x18000000** ）。

同时，**zep flash** 也支持烧录其他资源，如: 文件系统资源、非应用分区资源等。

### 烧录文件系统资源


1. **构建资源** : 执行 `lisa zep fs:build` 创建/构建 文件系统资源；

该命令首先会根据设备树的 **Flash 分区配置** ，自动在 *./resources* 文件夹下生成对应的分区文件夹；

**NOTE**: 如果对应的 *<分区名>* 文件夹已存在，则不会重新创建；

然后会再根据 *设备树* 配置的文件系统类型，自动将 *./resources/<分区名>* 打包成二进制资源，
构建后的二进制资源为 *./build/resources/<分区名>.bin* ；


2. **烧录资源** : 执行 `lisa zep fs:flash` ，将构建的 *<分区名>.bin* 烧录到分区地址（设备树定义）；

## 调试

**WARNING**: TODO
