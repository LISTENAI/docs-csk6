# 文件系统相关

`Lisa Plugin Zephyr` 提供了几个命令，用于对文件系统打包、烧录。

**WARNING**: 文件系统相关操作依赖于当前工程的编译产物，请确保你已经执行过 `lisa zep build` 相关的应用程序编译操作。另外，你的工程项目需要有对应文件系统相关的分区信息。

## 快速上手

在你的工程目录下执行以下命令和操作，能快速打包和烧录。

执行：

```bash
lisa zep fs:init
```

此时你的工程目录会生成 `resource` 文件夹，并会根据你的分区 `node-label` 在该文件夹内创建供该分区使用的文件夹。此处举个例子，初始化好的文件夹为 `resource/lfs1`。

尝试把一些文件/文件夹，扔进 `resource/lfs1` 中吧。

一切就绪后，执行：（此处可以根据自己使用烧录器，添加 `--runner` 参数，默认不填为 `jlink` 烧录）

```bash
lisa zep fs:flash
```
<!-- 
## 分区文件夹初始化

…

## 打包：默认分区文件夹

…

## 打包：自定义分区文件夹

… -->

## 串口烧录

:::tip
该功能特性仅在插件 `1.5.2` 及以上版本支持，执行 `lisa info zephyr` 检查本地的插件版本，并可通过 `lisa update zephyr` 更新到最新插件版本。
:::

```bash
lisa zep fs:flash --runner csk --port [port]
```

例如，windows下：

```bash
lisa zep fs:flash --runner csk --port "\\.\COM36"
```