# 开始新项目

## 创建

选择一个目录用于存放我们即将创建的项目，在这个目录下执行以下命令

```console
$ lisa zep create
```

该命令会列出当前CSK6适配的项目sample，我们可选择任意一个作为我们的工程模板，创建在当前目录中。此处我们选择 hello_world 进行创建。

## 构建

cd 进刚创建的 hello_world 项目，执行编译命令。

```console
$ cd hello_world
$ lisa zep build -b csk6002_9s_nano
```

`lisa zep build` 指令用于编译当前目录的项目工程，`-b csk6002_9s_nano` 指定了NanoKit开发板作为我们编译的板型。

执行成功后，编译产物会在当前目录下的 build 文件夹内。

## 连接开发板

以使用 **CSK-6-NanoKit开发板** 为例，使用TypeC数据线连接开发板的 **DAPLINK USB**

更多的开发板使用说明，可参考 [NanoKit开发板](../overview/nanokit) 。

## 烧录

由于NanoKit开发板集成了DAPLINK烧录器，因此支持使用pyocd进行代码烧录，执行以下指令：

```console
$ lisa zep flash
```

:::info
开发板 `csk6002_9s_nano` 默认使用 `pyocd` 进行烧录， 若你使用jlink烧录器或使用csk适配的串口烧录，可通过带上参数 `--runner jlink` 或 `--runner csk` 进行烧录。
:::

## 运行

运行串口调试工具，选择连接开发板后生成的串口，波特率设置为115200，可观察到开发板上电(复位)时，串口输出:

`Hello World！csk6002`
