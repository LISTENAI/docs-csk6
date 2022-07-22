# 基础命令
本章介绍 `Lisa Zephyr` 一些常用的基础命令，让你快速了解到如何使用 `Lisa Zephyr` 插件进行 CSK 应用的开发。

## 初始化 CSK SDK
此命令会从远端拉取 SDK 到本地，如下所示：
```bash
lisa zep use-sdk ./my-zephyr-sdk --default
```
当前你已经拉取并初始化好 SDK 了，你需要运行 ```lisa zep update```命令更新 SDK 所需要的功能模块。

有关 use-sdk 命令更多详情信息，请阅读 [use-sdk](../lisa_plugin_zephyr/command_detail.md#use-sdk) 。

## 设置编译环境
在构建项目前，除了要拉取 SDK 外，仍需要初始化 CSK 的编译环境

```bash
lisa zep use-env csk6
```

目前支持的较常用的编译环境有 `csk6`、 `csk6-dsp`

1、此命令会在用户目录下的文件夹 `.listenai/lisa-zephyr/package`，通过 `lisa` 安装所需的编译环境包。

2、缓存当前所设置的编译环境 `csk6`。

设置成功后，在执行 `lisa zep` 相关命令时，类沙盒的环境变量，均会自动按照所设置的编译环境，进行设置。

有关 use-env 命令更多的详细信息，请阅读 [use-env](../lisa_plugin_zephyr/command_detail.md#use-env) 。

## 创建项目
通过上述的步骤，你终于完成应用开发的前步骤了，接下来就是创建项目进行开发了，命令如下：

```bash
lisa zep create
```




![image](./images/create_1.png)

使用 上下键 操作，左右键/空格键 打开/关闭 文件夹， 回车键 确认选择。

选择想要创建的sample工程后，可以修改创建的文件夹名，默认为该sample工程原来的名字。

## 其他

有关`Lisa Zephyr`命令其他的信息，请阅读以下页面：

[内置命令](../lisa_plugin_zephyr/command_detail.md)

[构建、烧录与调试](../lisa_plugin_zephyr/build_flash_debug.md)

[文件系统相关](../lisa_plugin_zephyr/filesystem.md)
