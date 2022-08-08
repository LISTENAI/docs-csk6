# 快速开始

学习本文后，你将可以：

- 在 Ubuntu 、 macOS 、 Windows 上（ [安装 Linux 主机依赖](https://docs.zephyrproject.org/latest/develop/getting_started/installation_linux.html#installation-linux) 章节介绍了在其他 Linux 发行版上如何做）设置好了用命令行式的 CSK6 开发环境；
- 获取到 SDK 源码；
- 构建、在开发板上烧录并使一个示例程序可成功运行。

## 操作系统要求

选择你正在使用的操作系统。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{
    border: 'solid 1px #80808080',
    padding: 12,
    borderRadius: 12
  }}>
<Tabs
    groupId="operating-systems"
    defaultValue="windows"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'Windows', value: 'windows'},
        {label: 'macOS', value: 'mac'}
    ]}
>
  <TabItem value="ubuntu">

支持 Ubuntu 18.04 LTS 及更新的版本。

通常，为了保证软件源的时效性，推荐你在进入下一步之前先执行以下命令

```bash
sudo apt update
sudo apt upgrade
```

  </TabItem>

  <TabItem value="windows">

支持 Windows 10 及以上。若你的 Windows 版本未能满足要求，可参考 [Windows 客户端升级路径](https://docs.microsoft.com/zh-cn/windows/deployment/upgrade/windows-10-upgrade-paths) 进行升级。

  </TabItem>

  <TabItem value="mac">

支持 macOS Yosemite (10.10) 版本及以上。若你的 macOS 版本未能满足要求，请参考 [Apple 支持的此文章](https://support.apple.com/en-us/HT201541) 进行升级。

  </TabItem>

</Tabs>
</div>

## 安装依赖

接下来，你需要安装一些主机上必要的依赖。

<div style={{
    border: 'solid 1px #80808080',
    padding: 12,
    borderRadius: 12
  }}>
<Tabs
    groupId="operating-systems"
    defaultValue="windows"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'Windows', value: 'windows'},
        {label: 'macOS', value: 'mac'}
    ]}
>

  <TabItem value="ubuntu">

使用 <code>apt</code> 安装必要的依赖:

```bash
sudo apt install --no-install-recommends git wget
```

  </TabItem>
  <TabItem value="windows">
参考 <a href="https://git-scm.com/download/win">下载 Windows 上的 Git</a> 中的说明进行安装。
  </TabItem>
  <TabItem value="mac">

请在终端运行以下命令确定是否已经安装开发者工具:

```bash
xcode-select --install
```
  
  </TabItem>
</Tabs>
</div>


## 搭建开发环境

接着，安装 lisa zephyr 工具，并通过工具初始化 CSK6 SDK 所需的开发环境。

<div style={{
    border: 'solid 1px #80808080',
    padding: 12,
    borderRadius: 12
  }}>
<Tabs
    groupId="operating-systems"
    defaultValue="windows"
    values={[
        {label: 'Ubuntu', value: 'ubuntu'},
        {label: 'Windows', value: 'windows'},
        {label: 'macOS', value: 'mac'}
    ]}
>
  <TabItem value="windows">
    
<p>下载 <a href="https://castor.iflyos.cn/castor/v3/lisaPluginZephyr/download?platform=windows">CSK6一键安装包</a> 并运行，根据安装引导进行安装。</p>

> **CSK6一键安装包** 是面向 Windows 操作系统的 CSK6 集成安装包，包含 CSK6 集成开发环境、CSK SDK 等，方便开发者能快速进行 CSK6 的应用开发。

  </TabItem>
  <TabItem value="mac">

在 **用户权限** 下执行：

<Tabs
    defaultValue="curl"
    values={[
        {label: '使用 curl', value: 'curl'},
        {label: '使用 wget', value: 'wget'}
    ]}
>

<TabItem value="curl">

```bash
curl -o- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```
</TabItem>
<TabItem value="wget">

```bash
wget -qO- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```
</TabItem>
</Tabs>

> 该命令会在 `~/.listenai` 目录下，安装 CSK6 的集成开发环境以及 CSK SDK 的拉取，执行完毕后开发者能快速进行 CSK6 的应用开发。

  </TabItem>
  <TabItem value="ubuntu">

对于Ubuntu平台的开发者，你可以选用以下方式之一进行搭建：

__1、通过脚本在线安装__

在 **用户权限** 下执行：

<Tabs
    defaultValue="curl"
    values={[
        {label: '使用 curl', value: 'curl'},
        {label: '使用 wget', value: 'wget'}
    ]}
>

<TabItem value="curl">

```bash
curl -o- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```
</TabItem>
<TabItem value="wget">

```bash
wget -qO- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```
</TabItem>
</Tabs>

> 该命令会在 `~/.listenai` 目录下，安装 CSK6 的集成开发环境以及 CSK SDK 的拉取，执行完毕后开发者能快速进行 CSK6 的应用开发。

__2、通过snap离线安装__

- 下载[Ubuntu 18.04 snap离线包](https://cdn.iflyos.cn/public/lisa-binary/lisa_2.4.2.tgz)：

- 解压后执行：

```bash
./install.sh
```

或执行：

```bash
snap install lisa_2.4.2_amd64.snap
```

  </TabItem>
</Tabs>
</div>

## 编译 Hello world 示例

选择一个目录用于存放我们即将创建的项目，在这个目录下执行以下命令

:::warning 警告
  不支持一个带有空格的路径中构建 Zephyr 或创建应用。因此形如 `C:\Users\YourName\app` 的路径可用，但 `C:\Users\Your Name\app` 则不可用。
:::

```bash
lisa zep create
```

该命令会列出当前 CSK6 适配的项目 sample ，我们可选择任意一个作为我们的工程模板，创建在当前目录中。此处我们选择 `[hello_world]` 进行创建。

<img
  width="80%"
  src={require('./images/lisa_zep_create_sample.png').default}
  /> 

在命令行中进入刚创建的 hello_world 项目目录，执行编译命令。

```bash
cd hello_world
lisa zep build -b csk6002_9s_nano
```

## 烧录示例程序

以使用 **CSK-6-NanoKit 开发板** 为例，使用 Type-C 数据线连接开发板的 **DAPLINK USB** 。

执行以下指令：

```console
$ lisa zep flash
```

若烧录成功你将看到

![](./images/hello_world_flash_finish.png)

通过串口调试工具找到开发板对应的串口，以 115200 的波特率进行连接（在下图示例中使用 `screen` 工具连接串口）。对开发板复位后，可看到串口输出：

![](./images/hello_world_output.png)

> 如果你需要了解关于可用开发板的更多说明，可参考 [NanoKit 开发套件](../overview/nanokit/nanokit_introduction) 。

## 进阶路线

这里提供一些进阶的建议，帮助你了解更多如何在 CSK6 上进行开发：

#### 阶段一：了解 CSK 应用开发基础及示例

- 尝试其他的使用示例
  - [外设驱动说明及使用示例](./peripheral/overview)
  - [系统内核及使用示例](./kernel/overview)
  - [系统组件及使用示例](./modules/overview)
  - [音频组件及使用示例](./audio/overview)
  - [网络模块及使用示例](./network/overview)
- 学习有关 [应用开发](./application_development.md) 和 [lisa zephyr 工具使用](../tool/lisa_plugin_zephyr/index.md)
- 学习基于 `lisa zephyr` 的 [烧录与调试](../tool/lisa_plugin_zephyr/build_flash_debug.md) 特性，或者更多关于 [烧录与硬件调试](../gdbdebug/overview.md) 的内容

#### 阶段二：了解构建系统及配置系统

- [构建系统](../build/cmake/index.md)
- [Kconfig 配置系统](../build/kconfig/index.md)

#### 阶段三：了解设备树原理和使用方法

- [设备树概述](../build/dts/intro.md)

#### 阶段四：掌握自定义板型的添加、自定义驱动等功能开发

- [自定义板型及示例](./board)
- [自定义驱动及示例](./customdriver/custom-driver-video.md)

## 安装过程疑难解答

这里包含一些关于与安装过程相关的问题如何解决的议题。

### 更新 SDK 后再次检查 SDK 环境

当需要检查 SDK 环境是否有问题时，通常先执行以下命令

 ```bash
lisa info zep
```

正常情况下你将看到列出结果类似下图

![image](./images/lisa_info_zep_sample.png)

当 SDK 环境 **不完整** 时，可能会出现某些项显示为「未设置」，例如

![image](../quick_start/images/start_1.png)

若遇到类似上图中显示的「未设置」的提示，请运行下述命令，工具会尝试修复当前 SDK 环境

```bash
lisa zep doctor
```

## 请求帮助

你可以在聆思维护的代码仓库托管站点 LSCloud 中反馈你所遇到的问题或提交特性适配请求。

- **在 LSCloud 中提交工单** ： 请参考 [反馈章节](../quick_start/doc_issue.md) 更详尽地了解如何使用 [工单](https://cloud.listenai.com/zephyr/zephyr/-/issues) 来提交问题。
### 如何提问

:::tip 注意
在你提交一个新工单之前，请先尝试在已有的工单中搜索你的问题。你的问题可能在此之前已经有对应的答案了。
:::

当你新建工单时，应当按照模板要求填写对应描述。并且，当你进行描述时请尽量注意，不要只是含糊地说例如「这个跑不起来」或者询问「这个功能能不能用？」之类的问题。你应当尽可能描述这些内容：

1. 你想要达成什么目标
2. 你已经做了什么尝试（例如你输入过的命令）
3. 出现了什么现象（例如每一条命令的输出）

### 使用复制/粘贴

反馈问题时，请对文本信息进行 **复制/粘贴** ，而不是对它拍照或截图。这里的文本信息指代用于描述问题的源代码、终端命令或他们的输出。

这样做可以使得帮我们在尝试帮你解决问题时更容易看清楚问题，也更便于其他的用户搜索到相关的内容。