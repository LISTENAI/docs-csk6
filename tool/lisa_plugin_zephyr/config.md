# 配置

This page documents west’s configuration file system, the west config command, and configuration options used by built-in commands. For API documentation on the west.configuration module, see [west.configuration](https://docs.zephyrproject.org/latest/develop/west/west-apis.html#west-apis-configuration).

此页面记录了 Lisa Zephyr 的配置文件系统，lisa zep config 命令，以及内置命令使用的配置选项。有关 `west.configuration` 模块的 API 文档，请参见 [west.configuration](https://docs.zephyrproject.org/latest/develop/west/west-apis.html#west-apis-configuration).

## West Configuration Files
## Lisa Zephyr 配置文件

West’s configuration file syntax is INI-like; here is an example file:

Lisa Zephyr 配置文件语法跟 INI 类似；如下所示：

```INI
[manifest]
path = zephyr

[zephyr]
base = zephyr
```

Above, the `manifest` section has option `path` set to `zephyr`. Another way to say the same thing is that `manifest.path` is `zephyr` in this file.

在上面例子中，`manifest` 中的选项 `path` 被设置为 `zephyr`。另一种说法是，`manifest.path` 是 `zephyr`。

There are three types of configuration file:

1. **System**: Settings in this file affect west’s behavior for every user logged in to the computer. Its location depends on the platform:

    - Linux: `/etc/westconfig`
    - macOS: `/usr/local/etc/westconfigwestconfig`
    - Windows: `%PROGRAMDATA%\west\config`
  
2. **Global** (per user): Settings in this file affect how west behaves when run by a particular user on the computer.
    - All platforms: the default is `.westconfig` in the user’s home directory.
    - Linux note: if the environment variable `XDG_CONFIG_HOME` is set, then `$XDG_CONFIG_HOME/west/config` is used.
    - Windows note: the following environment variables are tested to find the home directory: `%HOME%`, then `%USERPROFILE%`, then a combination of `%HOMEDRIVE%` and `%HOMEPATH%`.
  
3. **Local**: Settings in this file affect west’s behavior for the current [west workspace](https://docs.zephyrproject.org/latest/glossary.html#term-west-workspace). The file is `.west/config`, relative to the workspace’s root directory.

配置文件有三种类型：

1. **系统**：这个文件中的设置会影响 Lisa Zephyr 对每个登录到计算机的用户的行为。它的位置取决于平台：
    - Linux: `/etc/westconfig`
    - macOS: `/usr/local/etc/westconfig`
    - Windows: `%PROGRAMDATA%\west\config`
  
2. **全局** (每个用户)：这个文件中的设置会影响 Lisa Zephyr 在指定用户在计算机上运行时的行为。
    - 全部平台：默认是用户的主目录中的 `.westconfig`
    - Linux: 如果设置环境变量 `XDG_CONFIG_HOME`，那么 `$XDG_CONFIG_HOME/west/config` 将被使用。
    - Windows：测试以下环境变量以查找用户目录：`%HOME%`, 然后 `%USERPROFILE%`, 然后组合 `%HOMEDRIVE%` 和 `%HOMEPATH%`。

3. **本地**：这个文件中的设置会影响 Lisa Zephyr 在当前 [SDK 目录](https://docs.zephyrproject.org/latest/glossary.html#term-west-workspace) 中的行为。文件是 `.west/config`，相对于工作区的根目录。
  
A setting in a file which appears lower down on this list overrides an earlier setting. For example, if `color.ui` is `true` in the system’s configuration file, but false in the workspace’s, then the final value is `false`. Similarly, settings in the user configuration file override system settings, and so on.

显示在此列表下方的文件中的设置会覆盖之前的设置。例如，如果系统配置文件中的 `color.ui` 设置为 `true`，但是工作区的设置是 `false`，那么最终的值是 `false`。户配置文件中的设置会覆盖系统设置，以此类推。

## west config 
## lisa zep config

The built-in `config` command can be used to get and set configuration values. You can pass `west config` the options `--system`, `--global`, or `--local` to specify which configuration file to use. Only one of these can be used at a time. If none is given, then writes default to `--local`, and reads show the final value after applying overrides.

内置的 `config` 命令可以用来获取和设置配置。你可以通过 `lisa zep config` 参数 `--system`, `--global`, 或 `--local` 来指定需要使用的配置文件。只能使用一个。如果没有指定，那么写入默认为 `--local`，并在应用覆盖后读取显示最终值。

Some examples for common uses follow; run `west config -h` for detailed help, and see [Built-in Configuration Options](https://docs.zephyrproject.org/latest/develop/west/config.html#west-config-index) for more details on built-in options.

一些常用的例子；运行 `lisa zep config -h` 以获取详细帮助，并查看 [内置配置选项](https://docs.zephyrproject.org/latest/develop/west/config.html#west-config-index) 以获取更多详细信息。

To set manifest.path to some-other-manifest:

设置 manifest.path 为 some-other-manifest：

```bash
lisa zep config manifest.path some-other-manifest
```

Doing the above means that commands like `west update` will look for the [west manifest](https://docs.zephyrproject.org/latest/glossary.html#term-west-manifest) inside the `some-other-manifest` directory (relative to the workspace root directory) instead of the directory given to `west init`, so be careful!

执行上述操作意味着诸如 `lisa zep update` 的命令会在 `some-other-manifest` 目录（相对于工作区根目录）中查找 [提货单](https://docs.zephyrproject.org/latest/glossary.html#term-west-manifest)，而不是 `lisa zep use-sdk` 设置的目录，所以要小心！

To read `zephyr.base`, the value which will be used as `ZEPHYR_BASE` if it is unset in the calling environment (also relative to the workspace root):

读取 `zephyr.base`，如果在调用环境中未设置，那么将被用作 `ZEPHYR_BASE`（相对于工作区根目录）。

```bash
lisa zep config zephyr.base
```

You can switch to another zephyr repository without changing `manifest.path` – and thus the behavior of commands like `west update` – using:

你可以在不更改 `manifest.path` 的情况下切换到另一个 zephyr 库，从而改变诸如 `lisa zep update` 之类的命令的行为，使用：


```bash
lisa zep config zephyr.base some-other-zephyr
```

This can be useful if you use commands like `git worktree` to create your own zephyr directories, and want commands like `west build` to use them instead of the zephyr repository specified in the manifest. (You can go back to using the directory in the upstream manifest by running `west config zephyr.base zephyr`.)

如果你使用 `git worktree` 之类的命令来创建自己的 zephyr 目录，并希望 `lisa zep build` 之类的命令使用它们而不是在 manifest 中指定的 zephyr 库，那么这可能是一个有用的方法。(你可通过运行 `lisa zep config zephyr.base zephyr` 回撤到默认的路径)

To set `color.ui` to `false` in the global (user-wide) configuration file, so that west will no longer print colored output for that user when run in any workspace:

在全局配置文件中设置 `color.ui` 为 `false`，这样 Lisa Zephyr 将不会在任何工作区中执行时为该用户打印颜色输出，

```bash
lisa zep config --global color.ui false
```

To undo the above change:

撤销上述更改：

```bash
lisa zep config --global color.ui true
```

## Built-in Configuration Options
## 内置配置选项

The following table documents configuration options supported by west’s built-in commands. Configuration options supported by Zephyr’s extension commands are documented in the pages for those commands.

下表记录了 Lisa Zephyr 内置命令支持的配置选项。Zephyr 的扩展命令支持的配置选项记录在这些命令的页面中。

| 选项 | 说明 |
| ---- | ---- |
| `color.ui` | Boolean. If `true` (the default), then west output is colorized when stdout is a terminal. <br /> 布尔值，如果为 `true`（默认值），lisa zep 会输出颜色的 log |
| `commands.allow_extensions` | Boolean, default true, disables [Extensions](https://docs.zephyrproject.org/latest/develop/west/extensions.html#west-extensions) if false <br /> 布尔值，默认为 `true`，如果 为 `false` 则禁用 [Extensions](https://docs.zephyrproject.org/latest/develop/west/extensions.html#west-extensions)  |
| `manifest.group-filter` | String, default empty. A comma-separated list of project groups to enable and disable within the workspace. Prefix enabled groups with `+` and disabled groups with `-`. For example, the value `"+foo,-bar"` enables group `foo` and disables `bar`. See [Project Groups and Active Projects.](https://docs.zephyrproject.org/latest/develop/west/manifest.html#west-manifest-groups) <br /> 字符串，默认为空。启用或者禁用项目组的列表。前缀 `+` 启用，`-` 是禁用。例如，`"+foo,-bar"` 启用 `foo` 组，禁用 `bar` 组，详情请参考[Project Groups and Active Projects.](https://docs.zephyrproject.org/latest/develop/west/manifest.html#west-manifest-groups) |
| `manifest.path` | String, relative path from the [west workspace](https://docs.zephyrproject.org/latest/glossary.html#term-west-workspace) root directory to the manifest repository used by `west update` and other commands which parse the manifest. Set locally by `west init`. <br /> 字符串，从 [SDK 根目录](https://docs.zephyrproject.org/latest/glossary.html#term-west-workspace)到 `lisa zep update` 和解析提货单的其他命令使用的提货单仓库的相对路径。由 `lisa zep use-sdk` 在本地设置 |
| `update.fetch` | String, one of `"smart"` (the default behavior starting in v0.6.1) or `"always"` (the previous behavior). If set to `"smart"`, the [west update](https://docs.zephyrproject.org/latest/develop/west/built-in.html#west-update) command will skip fetching from project remotes when those projects’ revisions in the manifest file are SHAs or tags which are already available locally. The `"always"` behavior is to unconditionally fetch from the remote. <br /> 字符串，`"smart"` 或者 `"always"` 之一。如果设置为 `"smart"`, 当提货单文件中的项目提交中本地已经有 SHA 或标签时，`lisa zep update` 命令将跳过从远程项目获取。`"always"` 行为是无条件从远程获取 |
| `update.name-cache` | String. If non-empty, `west update` will use its value as the `--name-cache` option’s value if not given on the command line. <br /> 字符串，如果不为空，`lisa zep update` 将使用其值作为 `--name-cache` 选项的值（如果未在命令行中给出）|
| `update.narrow` | Boolean. If `true`, `west update` behaves as if `--narrow` was given on the command line. The default is `false`. <br /> 布尔值，如果为 `true`，`lisa zep update` 的行为就像在命令行上给出了 `--narrow` 一样。默认值是 `false` |
| `update.path-cache` | String. If non-empty, `west update` will use its value as the `--path-cache` option’s value if not given on the command line. <br /> 字符串，如果不为空，如果没有在命令行中给出 `lisa zep update` 将使用它的值作为 `--path-cache` 选项的值 |
| `update.sync-submodules` | Boolean. If `true` (the default), west update will synchronize Git submodules before updating them. <br /> 布尔值，如果未 `true`(默认值)，`lisa zep update` 将在更新前同步 Git 子模块 |
| `zephyr.base` | String, default value to set for the `ZEPHYR_BASE` environment variable while the west command is running. By default, this is set to the path to the manifest project with path `zephyr` (if there is one) during `west init`. If the variable is already set, then this setting is ignored unless `zephyr.base-prefer` is `"configfile"`. <br /> 字符串，当 Lisa zephyr 命令运行时为 `ZEPHYR_BASE` 环境变量设置默认值。默认情况下，在 `lisa zep use-sdk` 期间使用配置文件中的 `[manifest]` `path` 的值 `zephyr`（如果有的话） 作为 `zephyr.base` 的值。如果变量已经设置，那么忽略这个设置，除非 `zephyr.base-prefer` 是 `"configfile"` |
| `zephyr.base-prefer` | String, one the values `"env"` and `"configfile"`. If set to `"env"` (the default), setting `ZEPHYR_BASE` in the calling environment overrides the value of the `zephyr.base` configuration option. If set to `"configfile"`, the configuration option wins instead. <br /> 字符串，值为 `"env"` 或 `"configfile"`，如果设置为 `"env"`（默认值），在调用环境中设置 `ZEPHYR_BASE` 会覆盖 `zephyr.base` 的值。如果设置为 `"configfile"`，则会使用 `zephyr.base` 的值 |