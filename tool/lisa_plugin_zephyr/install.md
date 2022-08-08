# 安装

:::info
在开始开发环境的搭建之前，请先确保本机已经安装了 **GIT** 工具。

若未安装，请访问[GIT官网](https://git-scm.com/)或参照网上教程进行下载安装。
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    groupId="operating-systems"
    defaultValue="windows"
    values={[
        {label: 'Windows', value: 'windows'},
        {label: 'macOS、Ubuntu', value: 'unix'}
    ]}
>
  <TabItem value="windows">
    
<p>下载 <a href="https://castor.iflyos.cn/castor/v3/lisaPluginZephyr/download?platform=windows">CSK6一键安装包</a> 并运行，根据安装引导进行安装。</p>

> **CSK6一键安装包** 是面向 Windows 操作系统的 CSK6 集成安装包，包含 CSK6 集成开发环境、CSK SDK 等，方便开发者能快速进行 CSK6 的应用开发。

  </TabItem>
  <TabItem value="unix">

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
</Tabs>

安装 lisa zephyr 完毕后，你可能需要了解一下如何通过 lisa zephyr 去开发应用。那么请参考下面的章节。

- [基础设置](../lisa_plugin_zephyr/basic.md)

- [命令详解](../lisa_plugin_zephyr/command_detail.md)

## 更新

当你的本机已经存在`lisa zephyr`命令行工具，并想更新到较新的版本来使用新版本带来的特性，可以通过以下命令进行。

```bash
lisa update zephyr
```

若你想更新 `lisa` 本身，可执行以下命令进行更新：

```bash
lisa update
```

## 终端命令行补全

lisa zep 目前支持以下平台和 shell 组合中的补全：

- Linux：bash

- macOS：bash

- windows：暂不支持

执行：

```bash
lisa completion-install
```