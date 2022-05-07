# 应用代码结构

## 概述

CSK6应用的目录，是独立于 SDK 的。这样不仅可以保证用户目录的简洁，也可以有效的降低 SDK 升级所带来的切换成本。CSK6 的编译系统是基于 cmake 来进行的，编译应用的时候，也会同时编译 SDK 相关的库，最后将这些库链接为一个二进制文件。


## 应用目录

下面是一个比较典型的应用目录：

```
    app
    ├── boards
    ├── drivers
    ├── dts
    ├── src
    ├── prj.conf
    ├── CMakeLists.txt
    └── KConfig
```

**目录说明**

* src: 存放应用源码的目录（也可以使用其他名称，但不建议）；

* prj.conf: 应用程序配置文件，具体可以参考：[项目配置](./kconfig.md)

* CMakeLists.txt: cmake 编译脚本文件；

*非必选*

* boards: 存放不同版型的配置(**非必选**)，具体使用可以参考：[Board 的使用](./board.md)

* drivers: 存放新硬件驱动的目录(**非必选**)，具体可以参考：[添加自定义驱动](../extension/custom_driver.md)

* dts: 存放自定义设备树的目录(**非必选**)，一般配合自定义驱动使用；具体可以参考：[添加自定义驱动](../extension/custom_driver.md)

* KConfig: 应用自定义配置项，具体可以参考：[添加自定义配置](./kconfig.md#添加自定义配置)

