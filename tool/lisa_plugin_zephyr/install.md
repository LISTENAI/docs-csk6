# 安装开发工具

## 获取 Lisa 并安装 Zephyr 开发环境


:::info
在开始开发环境的搭建之前，请先确保本机已经安装了 **GIT** 工具。

若未安装，请访问[GIT官网](https://git-scm.com/)或参照网上教程进行下载安装。
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="win"
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'macOS、Ubuntu', value: 'mac'}
    ]}
>
  <TabItem value="win">
    
<p>1. 下载 <a href="https://castor.iflyos.cn/castor/v3/lisaPluginZephyr/download?platform=windows">Lisa & Zephyr Installer</a> 并运行；</p>

<p>2. 根据安装引导进行安装。</p>

:::note
**Lisa & Zephyr Installer** 是面向Windows操作系统的开发的 CSK6 开发环境一体化安装包，支持 SDK 一键拉取与配置，方便开发者快速构建开发环境。
:::

  </TabItem>
  <TabItem value="mac">
    
<p>1. 安装 lisa zephyr 命令行工具</p>

在 **用户权限** 下执行：

使用 curl

```bash
curl -o- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```

或使用 wget

```bash
wget -qO- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```

<p>2. 安装 zephyr 对应环境</p>

```bash
lisa zep install
```

  </TabItem>
</Tabs>

安装 lisa zephyr 完毕后，你可能需要了解一下如何通过 lisa zephyr 去开发应用。那么请参考下面的章节。

- [基础设置](../lisa_plugin_zephyr/basic.md)

- [命令详解](../lisa_plugin_zephyr/command_detail.md)

