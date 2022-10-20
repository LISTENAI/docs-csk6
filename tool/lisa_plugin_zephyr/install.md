# 安装/更新

## 安装

可查看 [快速开始](../../application/getting_start.md) 章节，进行首次工具的安装。

安装 lisa zep 完毕后，你可能需要了解一下如何通过 lisa zep 去开发应用。那么请参考下面的章节。

- [基础设置](../lisa_plugin_zephyr/basic.md)

- [命令详解](../lisa_plugin_zephyr/command_detail.md)

## 更新

当你的本机已经存在`lisa zep`命令行工具，并想更新到较新的版本来使用新版本带来的特性，可以通过以下命令进行。

#### 更新 `lisa zep` 工具到最新 `latest` 版本

```bash
lisa update zephyr
```

#### 更新 `lisa zep` 工具到最新 `beta` 版本

配置环境变量 `LISA_ENV` 的值为 `debug`。

- windows系统:

当前使用的终端为cmd时
```
set LISA_ENV="debug"
lisa update zephyr
```

当前使用的终端为powershell时
```
$env:LISA_ENV="debug"
lisa update zephyr
```

- macOS或者Linux系统:
```
export LISA_ENV="debug" 
lisa update zephyr
```
