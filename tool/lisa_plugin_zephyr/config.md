# 配置

此页面记录了 lisa zep 的配置文件系统，lisa zep config 命令，以及内置命令使用的配置选项。有关 `west.configuration` 模块的 API 文档，请参见 [west.configuration](https://docs.zephyrproject.org/latest/develop/west/west-apis.html#west-apis-configuration).

## lisa zep 配置文件

lisa zep 配置文件语法跟 INI 类似；如下所示：

```INI
[manifest]
path = zephyr

[zephyr]
base = zephyr
```

在上面例子中，`manifest` 中的选项 `path` 被设置为 `zephyr`。也可以说，`manifest.path` 是 `zephyr`。

配置文件有三种类型：

1. **系统**：这个文件中的设置会影响 lisa zep 对每个登录到计算机的用户的行为。它的位置取决于平台：

    - Linux: `/etc/westconfig`
    - macOS: `/usr/local/etc/westconfig`
    - Windows: `%PROGRAMDATA%\west\config`

2. **全局** (每个用户)：这个文件中的设置会影响在计算机上的指定用户运行 lisa zep 的行为。

    - 全部平台：默认是用户的主目录中的 `.westconfig`
    - Linux: 如果设置环境变量 `XDG_CONFIG_HOME`，那么 `$XDG_CONFIG_HOME/west/config` 将被使用。
    - Windows：测试以下环境变量以查找用户目录：`%HOME%`, 然后 `%USERPROFILE%`, 然后组合 `%HOMEDRIVE%` 和 `%HOMEPATH%`。

3. **本地**：这个文件中的设置会影响 lisa zep 在当前 [SDK 目录](https://docs.zephyrproject.org/latest/glossary.html#term-west-workspace) 中的行为。文件是 `.west/config`，相对于工作区的根目录。
  
在上述列出的三类文件中，如果出现重复的设置项，后一个的设置将覆盖之前的设置。例如，如果系统配置文件中的 `color.ui` 设置为 `true`，但是工作区的设置是 `false`，那么最终的值是 `false`。户配置文件中的设置会覆盖系统设置，以此类推。

## lisa zep config

内置的 `config` 命令可以用来获取和设置配置。你可以通过 `lisa zep config` 参数 `--system`, `--global`, 或 `--local` 来指定需要使用的配置文件。只能使用一个。如果没有指定，那么写入默认为 `--local`，并在应用覆盖后读取显示最终值。

下面列举一些常用的例子；运行 `lisa zep config -h` 以获取详细帮助，并查看 [内置配置选项](https://docs.zephyrproject.org/latest/develop/west/config.html#west-config-index) 以获取更多详细信息。

设置 manifest.path 为 some-other-manifest：

```bash
lisa zep config manifest.path some-other-manifest
```
执行上述操作意味着诸如 `lisa zep update` 的命令会在 `some-other-manifest` 目录（相对于工作区根目录）中查找 [提货单](https://docs.zephyrproject.org/latest/glossary.html#term-west-manifest)，而不是 `lisa zep use-sdk` 设置的目录，所以要小心！

读取 `zephyr.base` 的值，如果 `zephyr.base` 未设置则返回环境变量的 `ZEPHYR_BASE` 值（相对于工作区根目录）。

```bash
lisa zep config zephyr.base
```

你可以在不更改 `manifest.path` 的情况下切换到另一个 zephyr 库，从而改变诸如 `lisa zep update` 之类的命令的行为，使用：


```bash
lisa zep config zephyr.base some-other-zephyr
```

如果你使用 `git worktree` 之类的命令来创建自己的 zephyr 目录，并希望 `lisa zep build` 之类的命令使用它们而不是在 manifest 中指定的 zephyr 库，那么这可能是一个有用的方法。(你可通过运行 `lisa zep config zephyr.base zephyr` 回撤到默认的路径)

在全局配置文件中设置 `color.ui` 为 `false`，这样 lisa zep 将不会在任何工作区中执行时为该用户打印颜色输出，

```bash
lisa zep config --global color.ui false
```

撤销上述更改：

```bash
lisa zep config --global color.ui true
```

## 内置配置选项

下表记录了 lisa zep 内置命令支持的配置选项。Zephyr 的扩展命令支持的配置选项记录在这些命令的页面中。

| 选项 | 说明 |
| ---- | ---- |
| `color.ui` | 布尔值，如果为 `true`（默认值），lisa zep 会输出颜色的 log |
| `commands.allow_extensions` | 布尔值，默认为 `true`，如果 为 `false` 则禁用 [Extensions](https://docs.zephyrproject.org/latest/develop/west/extensions.html#west-extensions)  |
| `manifest.group-filter` | 字符串，默认为空。启用或者禁用项目组的列表。前缀 `+` 启用，`-` 是禁用。例如，`"+foo,-bar"` 启用 `foo` 组，禁用 `bar` 组，详情请参考[Project Groups and Active Projects.](https://docs.zephyrproject.org/latest/develop/west/manifest.html#west-manifest-groups) |
| `manifest.path` | 字符串，从 [SDK 根目录](https://docs.zephyrproject.org/latest/glossary.html#term-west-workspace)到 `lisa zep update` 和解析提货单的其他命令使用的提货单仓库的相对路径。由 `lisa zep use-sdk` 在本地设置 |
| `update.fetch` | 字符串，`"smart"` 或者 `"always"` 之一。如果设置为 `"smart"`, 当提货单文件中的项目提交中本地已经有 SHA 或标签时，`lisa zep update` 命令将跳过从远程项目获取。`"always"` 行为是无条件从远程获取 |
| `update.name-cache` | 字符串，如果不为空，`lisa zep update` 将使用其值作为 `--name-cache` 选项的值（如果未在命令行中给出）|
| `update.narrow` | 布尔值，如果为 `true`，`lisa zep update` 的行为就像在命令行上给出了 `--narrow` 一样。默认值是 `false` |
| `update.path-cache` | 字符串，如果不为空，如果没有在命令行中给出 `lisa zep update` 将使用它的值作为 `--path-cache` 选项的值 |
| `update.sync-submodules` | 布尔值，如果未 `true`(默认值)，`lisa zep update` 将在更新前同步 Git 子模块 |
| `zephyr.base` | 字符串，当 lisa zep 命令运行时为 `ZEPHYR_BASE` 环境变量设置默认值。默认情况下，在 `lisa zep use-sdk` 期间使用配置文件中的 `[manifest]` `path` 的值 `zephyr`（如果有的话） 作为 `zephyr.base` 的值。如果变量已经设置，那么忽略这个设置，除非 `zephyr.base-prefer` 是 `"configfile"` |
| `zephyr.base-prefer` | 字符串，值为 `"env"` 或 `"configfile"`，如果设置为 `"env"`（默认值），在调用环境中设置 `ZEPHYR_BASE` 会覆盖 `zephyr.base` 的值。如果设置为 `"configfile"`，则会使用 `zephyr.base` 的值 |