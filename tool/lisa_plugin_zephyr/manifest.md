# 提货单

此页面包含有关 lisa zep 的多存储库模型、提货单文件和 `lisa zep manifest` 命令的详细信息。

## 多存储库模型

lisa zep 对 [SDK 工作区](https://docs.zephyrproject.org/latest/glossary.html#term-west-workspace) 中的存储库及其历史的总览如下图所示（尽管此示例的某些部分特定于上游 Zephyr 对 lisa zep 的使用）：

![west-mr-model](images/west-mr-model.png)

提货单仓库的历史是一条浮动在灰色平面上的 Git 提交。父提交指向子提交使用实线箭头。下面的平面包含了工作区中的所有项目仓库的 Git 提交历史，其中每个项目仓库都由一个矩形框架包围。在每个项目仓库中，父/子提交关系也用实线箭头显示。

提货单仓库中的每个提交（同样，对于上游 Zephyr，这是 zephyr 仓库本身）都有一个提货单文件。提货单文件在每个提交中指定了对应于每个项目仓库的提交。这个关系在图中用虚线箭头显示。每个虚线箭头指向提货单仓库中的提交，并且指向项目仓库中的提交。

请注意以下重要细节：

- 可以添加项目（如在提货单仓库提交 `D` 和 `E` 之间 `P1`），也可以删除项目（同一提货单仓库提交之间的 `P2`）

- 项目和提货单仓库历史不必顺序相邻：
  - `P2` 从 `A` 到 `B` 不变，同时 `P1` 和 `P3` 从 `F` 到 `G` 不变。
  - `P3` 自 `A → B` 向前移动
  - `P3` 自 `C → D` 向后移动
  
  在项目历史中向后移动的一种用法是通过回到引入回归之前的修订来 “回滚” 回归。

- 项目仓库提交可以被跳过：`P3` 从 `B → C` 向前移动多个提交。

- 在上面的图中，没有项目仓库 “同时” 有两个修订：每个提货单文件都只引用一个项目中的提交。这可以通过使用分支名作为提货单修订来放宽，但代价是能够分清提货单仓库历史。

## 提货单文件

提货单(manifest)是 YAML 文件。有一个顶级货单栏和一些子栏，如下所示:

```YAML
manifest:
  remotes:
    # 项目 URL 的简称
  projects:
    # 项目清单
  defaults:
    # 默认项目配置
  self:
    # 与货单存储相关的配置
    # 例如，包含 manifest.yml 的存储库
  version: "<schema-version>"
  group-filter:
    # 要启用或者禁用的项目组列表
```

在 YAML 术语中，YAML 文件包含一个带有 manifest 字段。

manifest 包含子字段，如 `default`, `remotes`, `projects`, `self`。当然，manifest 的子字段都是可选的。

## Remotes 

`remotes` 指定远端项目的 URL 地址。

每一个 `remotes` 都有一个 `name`(名称) 和 一个 `url-base` 字段，这为项目提供了完整 Git 项目的 URL 地址。可以通过将特定于项目的路径附加到远程 URL 库来设置项目的 URL（正如我们将在下面看到的，项目还可以指定它们完成的 URL）。

例如:

```YAML
manifest:
  # ...
  remotes:
    - name: remote1
      url-base: https://git.example.com/base1
    - name: remote2
      url-base: https://git.example.com/base2
```

下面表格列出了 `remotes` 中的字段和说明。

| 字段 | 说明 |
| ---- | ------ |
| name | 必须，remote 的唯一名称   |
| url-base | 必须，远程项目的 URL 地址 |

上面示例给出两个 `remote`，分别名为 `remote1` 和 `remote2`。`url-base` 项目的地址分别是 `https://git.example.com/base1` 和 `https://git.example.com/base2`，你也可以使用 `SSH` URL 地址方式，只要是 Git 支持的格式就行。

## Projects

`projects` 是一个项目仓库的序列列表。其中每一个项目都有一个唯一(name)名称，可以指定项目 Git 远程 URL 地址，项目的修改提交 commit，以及项目应该存放在本机上的哪个路径下。

下面这个例子，我们假设上面给出 `remotes`：

```YAML
manifest:
  projects:
    - name: proj1
      remote: remote1
      path: extra/project-1
    - name: proj2
      repo-path: my-path
      remote: remote2
      revision: v1.3
    - name: proj3
      url: https://github.com/user/project-three
      revision: abcde413a111
  remotes:
    - name: remote1
      url-base: https://git.example.com/base1
    - name: remote2
      url-base: https://git.example.com/base2
```

上面的 YAML 文件：

- `proj1` 有一个 `remote` 值为 `remote1` 的字段，它的 Git 项目 URL 地址为：`https://git.example.com/base1/proj1` ，URL 地址由 `remotes` 中 `url-base` 后面附加一个 / 和项目名来组合成 URL。

  在本地，这个项目会被克隆到 CSK SDK 工作空间的根目录下的 extra/project-1 目录中，`path` 字段指定了这个值。

  由于没有指定项目 commit，默认情况下使用 master 分支。当下一次更新时，项目的最新提交将作为一个分离的 HEAD 来更新。

- `proj2` 有一个 `remote` 和 `repo-path` 字段，所以它的 URL 地址是： `https://git.example.com/base2/my-path`。如果 `repo-path` 字段存在，它会在拉取项目仓库 URL 时覆盖默认的名称。

  由于项目没有 `path` 字段，因此默认情况下使用其名称，它会被克隆到一个名为 proj2 的目录中。当更新时，`revision` v1.3 的 Git tag 将会被更新到本地上。

- `proj3`有一个 url 字段，更新时将会从这个 URL 中更新项目。

  本地路径默认的名称为 `proj3`，下一次更新时将会从提交 abcde413a111 更新。

下表列出了可用 `projects` 字段和说明：

| 字段 | 说明 |
| ---- | ---- |
| name | 必须的，项目的唯一名称，名称不能是保留值 "west" 或 "manifest" 之一，该名称在 YAML 文件中必须是唯一的。 |
| remote, url | 必须有其中一个，不需要两个都写。如果 `project` 有 `remote` 字段，那么 `remotes` 的 `url-base` 字段将与 `project` 的 `name` （或者 `repo-path`， 如果有的话） 字段组合形成一个 URL |
| repo-path | 可选，如果值不为空，那么将会跟 `remotes` 的 `url-base` 字段组合成 URL，而不是跟 `project` 中 `name`，`project` 不能同时存在 `url` 和 `repo-path` 字段 |
| revision | 可选，SDK 更新时会从该字段拉取代码更新。默认情况下，这会创建一个新的 HEAD 分支出来以避免与本地分支造成冲突。如果该字段不填，则使用 `defaults` 中 `revision` 字段(如果存在的话)。`project` `revision` 可以是分支(branch)，标签(tag) 或者 SHA。 如果未指定其他的值，则默认 `revision` 为 master |
| path | 可选，克隆仓库到本地 SDK 的顶层目录的相对路径。如果缺少 `project` 的 `name` 字段，则将其用作目录名称 |
| clone-path | 可选，如果给定，一个正整数，它在克隆的仓库中创建一个浅历史，限制为给定的提交数量。这只能在如果 `revision` 字段的值是一个分支(branch)或者标签(tag) 时使用 |
| west-commands | 如果给定，它的值是项目中 YAML 文件的相对路径，该文件描述了该项目提供的其他 west 命令。这个文件按照惯例命名为 west-commands.yml。 |
| import | 可选，如果为 `true` 则将项目从给定仓库中的 YAML 文件导入到当前 YAML 文件中。 |
| groups | 可选，项目所属的组(group)列表，请参阅 [项目组与活跃的项目](#项目组与活跃的项目) |
| submodules | 可选，你可以使用 `lisa zep update` 更新代码同时更新 Git 子模块的代码，请参阅 [项目的 Git 子模块](#项目的git子模块) |

## Defaults 

`defaults` 字段可以为项目提供默认值，可以指定 `remote` 中 `name` 和 `revision`。另一种使用默认值编写相同提货单的方法是:

```YAML
manifest:
  defaults:
    remote: remote1
    revision: v1.3

  remotes:
    - name: remote1
      url-base: https://git.example.com/base1
    - name: remote2
      url-base: https://git.example.com/base2

  projects:
    - name: proj1
      path: extra/project-1
      revision: master
    - name: proj2
      repo-path: my-path
      remote: remote2
    - name: proj3
      url: https://github.com/user/project-three
      revision: abcde413a111
```

下表列出 `defaults` 可用的字段和说明：

| 字段 | 说明 |
| ---- | ---- |
| remote | 可选，如果 `project` 中没有 `url` 和 `remote` 字段，那么这个字段将会默认为 `projects` 中 `remote` 字段的值 |
| revision | 可选，如果 `project` 中没有 `revision` 字段，那么这个字段会默认为 `projects` 中 `revision` 字段的值 |

## Self

`self` 字段用于控制提货单仓库本身。

作为一个例子，让我们看一下 zephyr 仓库的 West.yml 的这个片段:

```YAML
manifest:
  # ...
  self:
    path: zephyr
    west-commands: scripts/west-commands.yml
```

这确保了 zephyr 仓库被克隆到路径 `zephyr` 中，self 字段声明了 west-commands.yml 文件所在的路径，其路径相对仓库根目录中的 `scripts` 文件夹下。

下表列出 `self` 可用的字段和说明：

| 字段 | 说明 |
| ---- | ---- |
| path | 可选，克隆项目到相对于 SDK 顶层目录的相对路径。如果未指定值，则默认情况下将使用提货单仓库 URL 中的路径组件的基名。例如，如果 URL 是 `https://git.example.com/project-repo`，则仓库将被克隆到目录 project-repo |
| west-commands | 可选，跟 `project` 中 `west-commands` 字段意思一样 |
| import | 可选，跟 `project` 中 `west-commands` 字段意思一样，但是允许从提货单仓库中其他文件导入项目 |

## 项目组与活跃的项目

你可以使用 `groups` 和 `group-filter` 字段将 [提货单文件](#提货单文件) 项目分组，并过滤哪些启用的组。这些字段在提货单文件中描述如下:

```YAML
manifest:
  projects:
    - name: some-project
      groups: ...
  group-filter: ...
```

你可以使用 `group-filter` 字段来启用或禁用项目组(即 `projects` 中的 `groups`)。所有 `groups` 都被禁用的 `project` 是不可用的，lisa zep 会忽略这些项目，除非你要求不要忽略它们。

下一章介绍 (project groups) 项目组；下面的章节介绍 [启用和禁用的项目组](#启用和禁用项目组) 和 [可用和不可用的项目](#可用和不可用项目)。并且会附带上讲解的例子。

最后，[组过滤和导入](#组过滤和导入) 简单概述了如何与 [导入提货单](#导入提货单) 功能交互。

### 项目组

你可以在 `manifest: projects:` 中添加一个项目到一个或多个组。`groups` 字段是一个组名列表，组名是字符串。

例如，在这个提货单片段中：

```YAML
manifest:
  projects:
    - name: project-1
      groups:
        - groupA
    - name: project-2
      groups:
        - groupB
        - groupC
    - name: project-3
```

在这些项目中的组：
- `project-1`：一个组，名为 `groupA`
- `project-2`：两个组，名为 `groupB` 和 `groupC`
- `project-3`：没有组

项目组名不能包含逗号 (,)、冒号 (:) 或空格。

组名不能以减号 (-) 或加号 (+) 开头，但是它们可以在名称内包含这些字符。例如，`foo-bar` 和 `foo+bar` 是有效的组，但是 `-foobar` 和 `+foobar` 不是。

组名是任意字符串，组名是大小写敏感的。

任何项目不能同时使用 `import:` 和 `groups:` (这避免了一些语义难以指定的边界情况)。

### 启用和禁用项目组

默认情况下启用所有的项目组，你可以在提货单文件中启用或禁用组。

在提货单文件中，`manifest: group-filter:` 是一个 YAML 列表，用于启用和禁用组。

要启用组，请在其名称前加上加号 (+)。例如，启用 `groupA` 的例子：

```YAML
manifest:
  group-filter: [+groupA]
```

尽管对于默认启用的组来说是多余的，但是它可以用来覆盖导入的提货单文件中的设置。请参见 [组过滤和导入](#组过滤和导入)。

要禁用组，请在其名称前加上减号 (-)。例如，禁用 `groupA` 和 `groupB` 的例子：

```YAML
manifest:
  group-filter: [-groupA,-groupB]
```

:::info
```YAML
因为 `group-filter` 是一个 YAML 列表，所以你可以写成这样：

```YAML
manifest:
  group-filter:
    - -groupA
    - -groupB
```

但是，这种语法显得更难读不易于理解，所以不建议使用。
:::

除了提货单文件外，你可以使用 `manifest.group-filter` 配置选项来决定哪些组启用或者禁用。这个选项是一个用逗号分隔的组列表，用于启用或禁用组。

要启用一个组，请将其名称添加到列表前缀为 + 列表中。要禁用一个组，请将其名称添加到列表前缀为 - 列表中。例如，设置 `manifest.group-filter` 为 `+groupA`,`-groupB` 启用 `groupA`，禁用 `groupB`。

配置选项的值会覆盖提货单文件中任何数据。你可以将其看作是将 `manifest.group-filter` 配置选项添加到 YAML 的 `manifest: group-filter:` 列表中，并且有着 "最后一个获胜" 的语义。

### 可用和不可用项目

默认情况下，所有的项目都是可用状态。没有组(groups)的项目(projects)也始终处于可用状态。如果所有的组都被禁用，那么项目就处于不可用状态。这是禁用项目的唯一方式。

默认情况下，大多数对项目操作的 lisa zep 命令将忽略不可用的项目。例如，当运行不带参数的 `lisa zep update` 命令时不会更新不可用的项目。另一个例子是，运行 `lisa zep list` 命令时不会打印不可用的项目的信息。

### 项目组示例

本节包含项目组和可用项目的示例，示例使用 `manifest: group-filter:` YAML 列表和 `manifest.group-filter` 配置列表来演示如何一起工作。

请注意，以下提货单中的 `defaults` 和 `remotes` 的数据不是有关联的，只是为了使示例完整且独立。

#### 示例 1：没有禁用的组

整个提货单文件如下：

```YAML
manifest:
  projects:
    - name: foo
      groups:
        - groupA
    - name: bar
      groups:
        - groupA
        - groupB
    - name: baz

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

`manifest.group-filter` 配置选项没有设置（你可以通过运行 `lisa zep config -D manifest.group-filter` 来确保这一点）。

没有组被禁用，因为所有组都是默认可用的。因此，三个项目（`foo`, `bar`, 和 `baz`）都是可用的。请注意，没有办法禁用项目 `baz`，因为它没有组。

#### 示例 2：禁用一个组

整个提货单文件如下：

```YAML
manifest:
  projects:
    - name: foo
      groups:
        - groupA
    - name: bar
      groups:
        - groupA
        - groupB

  group-filter: [-groupA]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

由于 `groupA` 已禁用，项目 `foo` 是不可用的。项目 `bar` 是可用的，因为 `groupB` 没有被禁用。

#### 示例 3：禁用多个组

整个提货单文件如下：

```YAML
manifest:
  projects:
    - name: foo
      groups:
        - groupA
    - name: bar
      groups:
        - groupA
        - groupB

  group-filter: [-groupA,-groupB]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

`foo` 和 `bar` 都是不可用的，因为它们的所有组都被禁用了。

#### 示例 4：通过配置禁用一个组

整个提货单文件如下：

```YAML
manifest:
  projects:
    - name: foo
      groups:
        - groupA
    - name: bar
      groups:
        - groupA
        - groupB

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

将 `manifest.group-filter` 配置项设置为 `-groupA` (你可以通过运行 `lisa zep config manifest.group-filter -- -groupA` 来确保这一点；额外的 `--` 是必要的，因为命令行参数解析器不会认为 `-groupA` 为命令行选项 `-g` 且值为 `roupA`);

那么整个提货单文件变成这样：

```YAML
manifest:
  projects:
    - name: foo
      groups:
        - groupA
    - name: bar
      groups:
        - groupA
        - groupB
    
  group-filter: [-groupA]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

项目 `foo` 是不可用的，因为 `groupA` 已被 `manifest.group-filter` 配置项禁用了。项目 `bar` 是可用的，因为 `groupB` 没有被禁用。

#### 示例 5：通过配置覆盖禁用的组

整个提货单文件如下：

```YAML
manifest:
  projects:
    - name: foo
    - name: bar
      groups:
        - groupA
    - name: baz
      groups:
        - groupA
        - groupB

  group-filter: [-groupA]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

将 `manifest.group-filter` 配置项设置为 `+groupA` (你可以通过运行 `lisa zep config manifest.group-filter +groupA` 来确保这一点);

那么整个提货单文件变成这样：

```YAML
manifest:
  projects:
    - name: foo
    - name: bar
      groups:
        - groupA
    - name: baz
      groups:
        - groupA
        - groupB

  group-filter: [+groupA]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

在这种情况下，`groupA` 已启用：`manifest.group-filter` 配置项的优先级高于提货单文件中的 `manifest: group-filter:` `[-groupA]`。

因此，项目 `foo` 和 `bar` 都是可用的。

#### 示例 6：通过配置覆盖多个禁用的组

整个提货单文件如下：

```YAML
manifest:
  projects:
    - name: foo
    - name: bar
      groups:
        - groupA
    - name: baz
      groups:
        - groupA
        - groupB

  group-filter: [-groupA,-groupB]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

将 `manifest.group-filter` 配置项设置为 `+groupA,+groupB` (你可以通过运行 `lisa zep config manifest.group-filter "+groupA,+groupB"` 来确保这一点)。

那么整个提货单文件变成这样：

```YAML
manifest:
  projects:
    - name: foo
    - name: bar
      groups:
        - groupA
    - name: baz
      groups:
        - groupA
        - groupB

  group-filter: [+groupA,+groupB]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

在这种情况下，`groupA` 和 `groupB` 都已启用，因为配置值覆盖了提货单文件中两个组的内容。

因此，项目 `foo` 和 `bar` 都是可用的。

#### 示例 7：通过配置禁用多个组

整个提货单文件如下：

```YAML
manifest:
  projects:
    - name: foo
    - name: bar
      groups:
        - groupA
    - name: baz
      groups:
        - groupA
        - groupB

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

将 `manifest.group-filter` 配置项设置为 `-groupA,-groupB` (你可以通过运行 `lisa zep config manifest.group-filter -- "-groupA,-groupB"` 来确保这一点)。

那么整个提货单文件变成这样：

```YAML
manifest:
  projects:
    - name: foo
    - name: bar
      groups:
        - groupA
    - name: baz
      groups:
        - groupA
        - groupB

  group-filter: [-groupA,-groupB]

  defaults:
    remote: example-remote
  remotes:
    - name: example-remote
      url-base: https://git.example.com
```

这种情况下，`groupA` 和 `groupB` 已禁用。

因此，项目 `foo` 和 `bar` 都是不可用的。

### 组过滤和导入

本节简单介绍 `manifest: group-filter` 的值结合提货单导入的原理。有关更详细的信息，请参阅 [提货单导入详情](#提货单导入详情)。

简而言之：

- 如果你只导入一个提货单，`group-filter` 中禁用的组也会在你的提货单中禁用
- 你可以覆盖提货单文件中的 `manifest: group-filter:` 值，SDK 中的 `manifest.group-filter` 配置项，或者两者都覆盖。

这里有些例子。

#### 示例 1：无覆盖

你正在使用这个 `parent/west.yml` 提货单：

```YAML
# parent/west.yml:
manifest:
  projects:
    - name: child
      url: https://git.example.com/child
      import: true
    - name: project-1
      url: https://git.example.com/project-1
      groups:
        - unstable
```

`child/west.yml` 如下：

```YAML
# child/west.yml:
manifest:
  group-filter: [-unstable]
  projects:
    - name: project-2
      url: https://git.example.com/project-2
    - name: project-3
      url: https://git.example.com/project-3
      groups:
        - unstable
```

只有 `child` 和 `project-2` 在已解析的提货单中是可用的。

在 `child/west.yml` 中，组 `unstable` 已禁用，而这个组没有被 `parent/west.yml` 覆盖。因此，已解析的提货单的 `group-filter` 值是 `[-unstable]`。

由于项目 `project-1` 和 `project-3` 在组 `unstable` 中，并且没有在任何其他组中，因此它们是不可用的。

#### 示例 2：覆盖导入的group-filter

你正在使用这个 `parent/west.yml` 提货单：

```YAML
# parent/west.yml:
manifest:
  group-filter: [+unstable,-optional]
  projects:
    - name: child
      url: https://git.example.com/child
      import: true
    - name: project-1
      url: https://git.example.com/project-1
      groups:
        - unstable
```

`child/west.yml` 如下：

```YAML
# child/west.yml:
manifest:
  group-filter: [-unstable]
  projects:
    - name: project-2
      url: https://git.example.com/project-2
      groups:
        - optional
    - name: project-3
      url: https://git.example.com/project-3
      groups:
        - unstable
```

只有 `child`, `project-1` 和 `project-3` 项目是可用的。

`child/west.yml` 中的 `[-unstable]` `group filter` 被 `parent/west.yml` 覆盖，因此组 `unstable` 处于可用状态。由于项目 `project-1` 和 `project-3` 在组 `unstable` 中，因此它们也是可用的。

同理， `parent/west.yml` 文件禁用了组 `optional`，因此项目 `project-2` 是不可用的。

`parent/west.yml` 中指定的 `group-filter` 值是 `[+unstable,-optional]`。

#### 示例 3：通过配置覆盖导入的group-filter

你正在使用这个 `parent/west.yml` 提货单：

```YAML
# parent/west.yml:
manifest:
  projects:
    - name: child
      url: https://git.example.com/child
      import: true
    - name: project-1
      url: https://git.example.com/project-1
      groups:
        - unstable
```

`child/west.yml` 如下：

```YAML
# child/west.yml:
manifest:
  group-filter: [-unstable]
  projects:
    - name: project-2
      url: https://git.example.com/project-2
      groups:
        - optional
    - name: project-3
      url: https://git.example.com/project-3
      groups:
        - unstable
```

如果你运行：

```bash
lisa zep config manifest.group-filter +unstable,-optional
```

那么只有 `child`、`project-1` 和 `project-3` 项目是可用的。

`child/west.yml` 中的 `-unstable` `group filter` 在 `manifest.group-filter` 配置选项被覆盖，因此 `unstable` 组处于可用状态。由于项目 `project-1` 和 `project-3` 在 `unstable` 组中，所以它们也是可用的。

同理，配置项禁用了 `optional` 组，所以 `project-2` 是不可用的。

最后一个 group filter 由 `parent/west.yml` 指定，然后，`manifest.group-filter` 配置项的值是 `[+unstable,-optional]`。


## 项目的Git子模块

你可以使用 [上面](#提货单文件) 描述的简短的 submodules 字段来强制 `lisa zep update` 处理项目的 git 仓库中配置的任何 [Git 子模块](https://git-scm.com/book/en/v2/Git-Tools-Submodules)。submodules 字段可以放到 projects 字段中，如下所示：

```YAML
manifest:
  projects:
    - name: some-project
      submodules: ...
```

`submodules` 字段可以是布尔值或者是映射(mappings)列表。我们将按顺序描述这些。

### 选项 1：布尔值

这是使用 `submodules` 最简单的方式。

如果 `submodules` 字段是 `true`，那么 `lisa zep update` 将会在更新项目时递归更新项目的子模块。如果 `submodules` 是 `false` 或者不填，那么它没有任何效果。

例如，假如你有一个 `foo` 源码仓库，它有一些子模块，并且你想要 `lisa zep update` 保持所有子模块同步，以及在同一个工作区中另一个名为 `bar` 的项目。

你可以用这个提货单文件来做此操作：

```YAML
manifest:
  projects:
    - name: foo
      submodules: true
    - name: bar
```

在这里，`lisa zep update` 将会初始化并更新 `foo` 中的所有子模块。如果 `bar` 项目有子模块，那么它们将被忽略，因为 `bar` 中没有声明 submodules 字段。

### 选项 2：映射列表

`submodules` 字段也可能是映射列表，每个映射都是一个子模块的配置。每个子模块都会被递归更新。你可以用 `git` 命令手动追踪和更新未列出的子模块；无论是否存在，它们都会被 `lisa` 忽略。

`path` 字段必须与子模块相对于其父项目的路径完全匹配，如 `git submodule status` 的打印结果。`name` 字段是可选的，但是目前暂时不会用到。

例如，假如你有一个 `foo` 源码仓库，它有很多子模块，并且你想要 `lisa zep update` 保持其中一些子模块同步，以及在同一个工作区中另一个名为 `bar` 的项目。

你可以用这个提货单文件来做此操作：

```YAML
manifest:
  projects:
    - name: foo
      submodules:
        - path: path/to/foo-first-sub
        - name: foo-second-sub
          path: path/to/foo-second-sub
    - name: bar
```

在这里，`lisa zep update` 将会递归初始化并只更新 `foo` 中的子模块 `path/to/foo-first-sub` 和 `path/to/foo-second-sub`。`bar` 中的子模块会被忽略。

## 导入提货单

你可以是用上面简要描述的 `import` 字段将其他提货单文件中的项目导入进你的 `west.yml` 中。这个字段可以是一个项目或者自身部分的属性：

```YAML
manifest:
  projects:
    - name: some-project
      import: ...
  self:
    import: ...
```

你可以使用 `self: import:` 从包含 `west.yml` 的源码仓库中加载额外的文件。你可以使用 `project: … import:` 来加载该项目的 Git 历史中定义的文件。

`Lisa` 按以下顺序从各个提货单文件中解析最终提货单：

- 在 `self` 字段中导入文件
- 你的 `west.yml` 文件
- 在 `projects` 字段中导入文件

在解析的过程中，Lisa 会忽略已在其他文件中定义的项目。例如，`west.yml` 中名为 `foo` 的项目使 Lisa 忽略从项目列表中导入的其他名为 foo 的项目。

`import` 字段可以是布尔值、路径、映射或者序列。我们将用示例按顺序来讲解这些内容：

- [布尔值](#manifest-opt-1)
  - [示例 1.1：Zephyr 版本下游](#manifest-ext1-1)
  - [示例 1.2：“滚动发布” Zephyr 下游](#manifest-ext1-2)
  - [示例 1.3：Zephyr 版本下游和 fork 模块](#manifest-ext1-3)
- [相对路径](#manifest-opt-2)
  - [示例 2.1：具有路径的 Zephyr 下游](#manifest-ext2-1)
  - [示例 2.2：提货单文件目录的下游](#manifest-ext2-2)
  - [示例 2.3：持续集成重写](#manifest-ext2-3)
- [映射](#manifest-opt-3):
    - [示例 3.1：name allowlist 的下游](#manifest-ext3-1)
    - [示例 3.2：path allowlist 的下游](#manifest-ext3-2)
    - [示例 3.3：path blocklist 的下游](#manifest-ext3-3)
    - [示例 3.4：导入到一个子目录](#manifest-ext3-4)
- [序列](#manifest-opt-4):
    - [示例 4.1：提货单文件序列的下游](#manifest-ext4-1)
    - [示例 4.2：导入顺序的说明](#manifest-ext4-2)

### 疑难笔记

如果你使用此功能并发现 Lisa 的行为令人困惑，请尝试 [解析你的提货单](#解析提货单) 查看导入后的最终结果。

### 选项1：布尔值 {#manifest-opt-1}

这是使用 `import` 的简单方式。

如果 `projects` 字段中 `import` 为 `true`，则 Lisa 从 `p1` 仓库的根目录中导入 `west.yml` 文件，如果 `import` 为 `false` 或不填，则没有任何效果。例如，这个 manifest 将从 `p1` git 仓库的 `v1.0` tag 中导入 `west.yml` 文件：

```YAML
manifest:
  # ...
  projects:
    - name: p1
      revision: v1.0
      import: true    # Import west.yml from p1's v1.0 git tag
    - name: p2
      import: false   # Nothing is imported from p2.
    - name: p3        # Nothing is imported from p3 either.
```

在 `self` 字段中设置 `import` 为 `true` 或者 `false` 是错误的，如下所示：

```YAML
manifest:
  # ...
  self:
    import: true  # Error
```

#### 示例 1.1：Zephyr 版本的下游 {#manifest-ext1-1}

你有一个源码仓库想用 Zephyr v1.14.1 LTS 版本。你想通过 lisa zep 来维护代码，并且你不想去修改任何主线上的代码。

也就是说，你想要的代码目录结构是这样的：

```
my-downstream/
├── .west/                     # west 目录
├── zephyr/                    # 主线 Zephyr
│   └── west.yml               # 导入该文件的 v1.14.1 版本 
├── modules/                   # 主线 Zephyr 的模块
│   ├── hal/
│   └── [...other directories..]
├── [ ... other projects ...]  # 其他主线仓库
└── my-repo/                   # 你的下游仓库
    ├── west.yml               
    └── [...other files..]
```

你可以通过下面 `my-repo/west.yml` 来做这些操作：

```YAML
# my-repo/west.yml:
manifest:
  remotes:
    - name: zephyrproject-rtos
      url-base: https://github.com/zephyrproject-rtos
  projects:
    - name: zephyr
      remote: zephyrproject-rtos
      revision: v1.14.1
      import: true
```

然后你可以像这样在你的电脑上创建项目，假设 `my-repo` 托管在 `https://git.example.com/my-repo`：

```bash
lisa zep init -m https://git.example.com/my-repo my-downstream
cd my-downstream
lisa zep update
```

`lisa zep init` 后，`my-downstream/my-repo` 将会被克隆下来。

`lisa zep update`， 在 `zephyr` 仓库的 `West.yml` 修订版 `v1.14.1` 中定义的所有项目也将被克隆到 `my-downstream` 中。

在这种情况下，你可以添加和提交任何代码到 `my-repo`，包括你自己 Zephyr 应用，驱动程序等等，参考[应用开发](../../application/application_development.md)。

#### 示例 1.2：“滚动发布” Zephyr 下游 {#manifest-ext1-2}

这类似于[示例 1.1：Zephyr 版本的下游](#manifest-ext1-1)，只不过 zephyr 仓库将使用 `revision: main`：

```
# my-repo/west.yml:
manifest:
  remotes:
    - name: zephyrproject-rtos
      url-base: https://github.com/zephyrproject-rtos
  projects:
    - name: zephyr
      remote: zephyrproject-rtos
      revision: main
      import: true
```

你可以以同样的方式创建项目：

```bash
west init -m https://git.example.com/my-repo my-downstream
cd my-downstream
west update
```

这时候，无论何时运行 `lisa zep update`，`zephyr` 仓库中的特殊 [manifest-rev](https://docs.zephyrproject.org/latest/develop/west/workspaces.html#west-manifest-rev) 分支将呗更新为指向 URL `https://github.com/zephyrproject-rtos/zephyr` `main` 的分支。

然后，[manifest-rev](https://docs.zephyrproject.org/latest/develop/west/workspaces.html#west-manifest-rev) 中的 `zephyr/west.yml` 的内容将从 Zephyr 导入项目。这让你可以及时了解 Zephyr 项目的最新变化。代价是运行 `lisa zep update` 不会产生可重现的结果，因为每次运行它远程主分支都会发生变化。

同样重要的是要理解，在解析导入时 lisa zep 会**忽略工作树**的 `zephyr/west.yml`。lisa zep 始终使用导入的 manifests 的内容，因为它们从导入时已提交到最新的 `manifest-rev`。

你只能在提货单仓库工作树中才能从文件系统导入提货单。参见 [示例 2.2：提货单文件目录的下游](#manifest-ext2-2)。

#### 示例 1.3：Zephyr 版本下游和 fork 模块 {#manifest-ext1-3}

这提货单类似于[示例 1.1：Zephyr 版本的下游](#manifest-ext1-1)，除了：

- 是 zephyr 2.0 的下游
- 包括该版本中包含的 `modules/hal/nordic` 模块的下游分支

```YAML
# my-repo/west.yml:
manifest:
  remotes:
    - name: zephyrproject-rtos
      url-base: https://github.com/zephyrproject-rtos
    - name: my-remote
      url-base: https://git.example.com
  projects:
    - name: hal_nordic         # higher precedence
      remote: my-remote
      revision: my-sha
      path: modules/hal/nordic
    - name: zephyr
      remote: zephyrproject-rtos
      revision: v2.0.0
      import: true             # imported projects have lower precedence

# subset of zephyr/west.yml contents at v2.0.0:
manifest:
  defaults:
    remote: zephyrproject-rtos
  remotes:
    - name: zephyrproject-rtos
      url-base: https://github.com/zephyrproject-rtos
  projects:
  # ...
  - name: hal_nordic           # lower precedence, values ignored
    path: modules/hal/nordic
    revision: another-sha
```

上述的提货单文件， 名为 `hal_nordic` 的项目：

- 是从 `https://git.example.com/hal_nordic` 克隆，而不是 `https://github.com/zephyrproject-rtos/hal_nordic`。
- `lisa zep update` 更新的提交是 `my-sha`，而不是主线的提交 `another-sha`

换句话说，当你的顶级提货单定义了一个项目，如 `hal_nordic`，lisa zep 将会忽略稍后在解析导入时发现的任何其他定义。

这意味着在定义 `hal_nordic` 时，你必须将 `path: modules/hal/nordic` 复制到 `my-repo/west.yml` 中。`zephyr/west.yml` 的值被完全忽略。如果在实践中出现困惑，请参阅 [解析提货单](#解析提货单) 获取故障排除建议。

当你运行 `lisa zep update` 时，lisa zep 会：

- 更新 zephyr `manifest-rev` 中的 `v2.0.0` 标签
- 在 `manifest-rev` 中导入 `zephyr/west.yml`
- 本地检查除了 `hal_nordic` 之外的所有 zephyr 项目的 `v2.0.0` 修订版
- 从 `my-sha` 更新 `hal_nordic`，而不是 `another-sha`


### 选项2：相对路径 {#manifest-opt-2}

`import` 值也可以是提货单文件或包含提货单文件的目录的相对路径。该路径是相对 `projects` 的根目录或是 `import` 字段所在的 `self` 仓库 。

这是一个例子：

```YAML
manifest:
  projects:
    - name: project-1
      revision: v1.0
      import: west.yml
    - name: project-2
      revision: main
      import: p2-manifests
  self:
    import: submanifests
```

这将导入以下内容：

- `manifest-rev` 处的 `project-1/west.yml` 的内容，运行 `lisa zep update` 后，它指向项目仓库 Git `v1.0` 标签
- 目录树 `Project-2/p2-maniests` 中任何 YAML 文件在 `main` 分支的最新提交，由 `lisa zep update` 获取，按文件名排序
- 提货单仓库中 `submanifests` 目录中的 YAML 文件，与它们在文件系统上一样，按文件名排序

注意 `projects` 导入如何使用 `manifest-rev` 从 Git 获取数据，而 `self` 导入如何从文件系统获取数据。因为，lisa 将提货单仓库的版本控制权留给你。

#### 示例 2.1：具有路径的 Zephyr 的下游 {#manifest-ext2-1}

这是编写与[示例 1.1：Zephyr 版本的下游](#manifest-ext1-1)相同的方法。

```
manifest:
  remotes:
    - name: zephyrproject-rtos
      url-base: https://github.com/zephyrproject-rtos
  projects:
    - name: zephyr
      remote: zephyrproject-rtos
      revision: v1.14.1
      import: west.yml
```

配置 `import: west.yml` 意思是在 zephyr 项目中使用 `west.yml` 文件。这个例子是人为设计的，但表达这个想法。

在实践中，如果你要导入的提货单文件的名称不是 `west.yml`，将会非常有用。

#### 示例 2.2：提货单文件目录的下游 {#manifest-ext2-2}

你的 Zephyr 下游有很多额外的仓库。实际上，由于数量太多，你想要将它们分成多个提货单文件，并且要在单个提货单仓库中跟踪所有这些文件，如下所示：

```
my-repo/
├── submanifests
│   ├── 01-libraries.yml
│   ├── 02-vendor-hals.yml
│   └── 03-applications.yml
└── west.yml
```

除了 `zephyr/west.yml` 中项目外， 你想将 `my-repo/submanifests` 中的所有文件添加到 `my-repo/west.yml` 文件中。你想跟踪 Zephyr 仓库 `main` 分支最新代码而不是使用固定提交。

方法如下：

```YAML
# my-repo/west.yml:
manifest:
  remotes:
    - name: zephyrproject-rtos
      url-base: https://github.com/zephyrproject-rtos
  projects:
    - name: zephyr
      remote: zephyrproject-rtos
      revision: main
      import: true
  self:
    import: submanifests
```

提货单文件在解析期间按一下顺序导入：

1. `my-repo/submanifests/01-libraries.yml`
2. `my-repo/submanifests/02-vendor-hals.yml`
3. `my-repo/submanifests/03-applications.yml`
4. `my-repo/west.yml`
5. `zephyr/west.yml`

:::info 
在这个示例中，`.yml` 文件名前面带有数字，以确保它们按照指定的顺序导入。

你可以选择任意名称，lisa zep 在导入前按目录中文件名进行排序。
:::

请注意，`submanifests` 中提货单文件是如何在 `my-repo/west.yml` 和 `zephyr/west.yml` 之前导入的。通常，在 `projects` 中的提货单文件和主提货单文件之前处理 `self` 中的 `import`。

这意味着在 `my-repo/submanifests` 中定义的项目具有最高的优先级，例如，如果  `01-libraries.yml` 定义了 `hal_nordic`，那么 `zephyr/west.yml` 中同名的项目被忽略。同样，有关疑问，请参阅[解析提货单](#解析提货单)。

这可能看起来很奇怪，但是它允许你在“事后”重新定义项目，正如我们将在下一个示例看到的那样。

#### 示例 2.3：持续集成重写 {#manifest-ext2-3}

你的持续集成系统需要从开发人员的分支（而不是主线开发分支）获取并测试你的项目目录中的多个仓库，以查看更改是否能够很好协同工作。

从[示例 2.2：提货单文件目录的下游](#manifest-ext2-2)开始, CI 脚本在 `my-repo/submanifests` 中添加一个文件 `00-ci.yml`，包含一下内容：

```YAML
# my-repo/submanifests/00-ci.yml:
manifest:
  projects:
    - name: a-vendor-hal
      url: https://github.com/a-developer/hal
      revision: a-pull-request-branch
    - name: an-application
      url: https://github.com/a-developer/application
      revision: another-pull-request-branch
```

CI 脚本在 `my-repo/submanifests` 中生成此文件后运行 `lisa zep update`。`00-ci.yml` 中定义的项目比 `my-repo/submanifests` 中其它的定义有更高的优先级，因为名称 `00-co.yml` 位于其他文件名之前。

因此，`lisa zep update` 总是在名为 `a-vendor-hal` 和 `an-application` 的项目中检查开发分支，即使这些相同的项目也在其他地方定义。

### 选项3：映射 {#manifest-opt-3}

`import` 字段还包含具有以下字段的映射：

- `file`：可选，要导入的提货单文件或目录的名称。如果没有指定，则默认为 `west.yml`。
- `name-allowlist`：可选，项目名，或者存放着项目名的序列。
- `path-allowlist`：可选，如果存在，则要匹配路径或者项目路径序列。这是一种 shell 风格的通配模式，目前使用 [pathlib](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.match) 实现，请注意，这意味着区分大小写是特定于平台的。
- `name-blocklist`：可选，跟 `name-allowlist` 类似，但包含的是要排除的项目名。
- `path-blocklist`：可选，跟 `path-allowlist` 类似，但包含的是要排除的项目路径。
- `path-prefix`：可选，如果给定，这将被添加到项目中项目的路径以及任何导入项目的路径中。这可用于将这些项目放在项目的子目录中。
  
#### 示例 3.1：name allowlist 的下游 {#manifest-ext3-1}

下面是一对提货单文件，代表一条主线和一条下游线。然而，下游线不想使用所有的主线项目。我们假设主线 `west.yml` 托管在 `https://git.example.com/mainline/manifest`。

```YAML
# mainline west.yml:
manifest:
  projects:
    - name: mainline-app                # included
      path: examples/app
      url: https://git.example.com/mainline/app
    - name: lib
      path: libraries/lib
      url: https://git.example.com/mainline/lib
    - name: lib2                        # included
      path: libraries/lib2
      url: https://git.example.com/mainline/lib2

# downstream west.yml:
manifest:
  projects:
    - name: mainline
      url: https://git.example.com/mainline/manifest
      import:
        name-allowlist:
          - mainline-app
          - lib2
    - name: downstream-app
      url: https://git.example.com/downstream/app
    - name: lib3
      path: libraries/lib3
      url: https://git.example.com/downstream/lib3
```

单个文件中等效的 manifest 如下：

```YAML
manifest:
  projects:
    - name: mainline
      url: https://git.example.com/mainline/manifest
    - name: downstream-app
      url: https://git.example.com/downstream/app
    - name: lib3
      path: libraries/lib3
      url: https://git.example.com/downstream/lib3
    - name: mainline-app                   # imported
      path: examples/app
      url: https://git.example.com/mainline/app
    - name: lib2                           # imported
      path: libraries/lib2
      url: https://git.example.com/mainline/lib2
```

如果没有使用 allowlist，则会导入 mainline manifest 中的 `lib` 项目。

#### 示例 3.2：path allowlist 的下游 {#manifest-ext3-2}

下面的示例演示如何使用 `path-allowlist` 只使用 mainline 中 libraries 路径：

```YAML
# mainline west.yml:
manifest:
  projects:
    - name: app
      path: examples/app
      url: https://git.example.com/mainline/app
    - name: lib
      path: libraries/lib                  # included
      url: https://git.example.com/mainline/lib
    - name: lib2
      path: libraries/lib2                 # included
      url: https://git.example.com/mainline/lib2

# downstream west.yml:
manifest:
  projects:
    - name: mainline
      url: https://git.example.com/mainline/manifest
      import:
        path-allowlist: libraries/*
    - name: app
      url: https://git.example.com/downstream/app
    - name: lib3
      path: libraries/lib3
      url: https://git.example.com/downstream/lib3
```

单个文件中等效的 manifest 如下：

```YAML
manifest:
  projects:
    - name: lib                          # imported
      path: libraries/lib
      url: https://git.example.com/mainline/lib
    - name: lib2                         # imported
      path: libraries/lib2
      url: https://git.example.com/mainline/lib2
    - name: mainline
      url: https://git.example.com/mainline/manifest
    - name: app
      url: https://git.example.com/downstream/app
    - name: lib3
      path: libraries/lib3
      url: https://git.example.com/downstream/lib3
```

#### 示例 3.3：path blocklist 的下游 {#manifest-ext3-3}

这是一个示例，展示如何排除 mainline 中公共路径前缀的所有供应商 HALs，为目标芯片添加自己的版本，并保留其他所有内容。

```YAML
# mainline west.yml:
manifest:
  defaults:
    remote: mainline
  remotes:
    - name: mainline
      url-base: https://git.example.com/mainline
  projects:
    - name: app
    - name: lib
      path: libraries/lib
    - name: lib2
      path: libraries/lib2
    - name: hal_foo
      path: modules/hals/foo     # excluded
    - name: hal_bar
      path: modules/hals/bar     # excluded
    - name: hal_baz
      path: modules/hals/baz     # excluded

# downstream west.yml:
manifest:
  projects:
    - name: mainline
      url: https://git.example.com/mainline/manifest
      import:
        path-blocklist: modules/hals/*
    - name: hal_foo
      path: modules/hals/foo
      url: https://git.example.com/downstream/hal_foo
```

单个文件中等效的 manifest 如下：

```YAML
manifest:
  defaults:
    remote: mainline
  remotes:
    - name: mainline
      url-base: https://git.example.com/mainline
  projects:
    - name: app                  # imported
    - name: lib                  # imported
      path: libraries/lib
    - name: lib2                 # imported
      path: libraries/lib2
    - name: mainline
      repo-path: https://git.example.com/mainline/manifest
    - name: hal_foo
      path: modules/hals/foo
      url: https://git.example.com/downstream/hal_foo
```

#### 示例 3.4：导入到一个子目录 {#manifest-ext3-4}

你希望导入一个提货单和它的 projects，将所有内容放入你的 SDK 的一个子目录中。

例如，假设你想从项目 `foo` 导入这个提货单 `bar` 和 `baz` 添加到你的 SDK 中：

```YAML
# foo/west.yml:
manifest:
  defaults:
    remote: example
  remotes:
    - name: example
      url-base: https://git.example.com
  projects:
    - name: bar
    - name: baz
```

你不需要将它们导入到顶层的 SDK 目录，而是需要将三个项目仓库放到一个 `external-code` 子目录中，如下所示：

```
workspace/
└── external-code/
    ├── foo/
    ├── bar/
    └── baz/
```

你可以使用以下提货单完成此操作：

```YAML
manifest:
  projects:
    - name: foo
      url: https://git.example.com/foo
      import:
        path-prefix: external-code
```

单个文件中等效的 manifest 如下：

```YAML
# foo/west.yml:
manifest:
  defaults:
    remote: example
  remotes:
    - name: example
      url-base: https://git.example.com
  projects:
    - name: foo
      path: external-code/foo
    - name: bar
      path: external-code/bar
    - name: baz
      path: external-code/baz
```

### 选项4：序列 {#manifest-opt-4}

`import` 字段还可以包含文件、目录和映射的序列。

#### 示例 4.1：提货单文件序列的下游 {#manifest-ext4-1}

此示例 manifest 等效于[示例 2.2：提货单文件目录的下游](#manifest-ext2-2)中的 manifest：

```YAML
# my-repo/west.yml:
manifest:
  projects:
    - name: zephyr
      url: https://github.com/zephyrproject-rtos/zephyr
      import: west.yml
  self:
    import:
      - submanifests/01-libraries.yml
      - submanifests/02-vendor-hals.yml
      - submanifests/03-applications.yml
```

#### 示例 4.2：导入顺序说明 {#manifest-ext4-2}

这个更复杂的例子展示了 lisa zep 导入提货单文件的顺序：

```YAML
# my-repo/west.yml
manifest:
  # ...
  projects:
    - name: my-library
    - name: my-app
    - name: zephyr
      import: true
    - name: another-manifest-repo
      import: submanifests
  self:
    import:
      - submanifests/libraries.yml
      - submanifests/vendor-hals.yml
      - submanifests/applications.yml
  defaults:
    remote: my-remote
```

在这个例子中，lisa zep 按以下顺序解析导入：

1. `my-repo/submanifests` 中列出的文件按照它们出现的顺序排在第一位（例如，`libraries.yml` 在 `applications.yml` 之前，因为这是一个文件序列），而 `self: import: ` 中的内容总是先导入。

2. 接着导入 `my-repo/west.yml`（项目 `my-library` 等等，只要它们尚未在 `submanifests` 中的某处定义）

3. 再接着就是 `zephyr/west.yml`，因为这是 `my-repo/west.yml` 中项目列表中的第一个 `import` 字段

4. 最后是 `another-manifest-repo/submanifests`（按文件名排序），因为这是最后一个项目 `import`

## 提货单导入详情

本节更正式地描述了 lisa zep 如何解析使用 `import` 的提货单文件。

### 概述

`import` 字段可放在提货单中 `projects` 和 `self`。 如下所示：

```YAML
# Top-level manifest file.
manifest:
  projects:
    - name: foo
      import: import-1
    - name: bar
      import: import-2
    # ...
    - name: baz
      import: import-N
  self:
    import: self-import
```

`import` 字段是可填可不填。如果缺少 `import-1`、`...`、`import-N` 中的任何一个，lisa zep 将不会从该项目导入其他提货单数据。如果缺少 `self-import`，不会导入 提货单仓库中的其他文件（除了顶层文件）。

解析提货单导入的最终结果是：

- 项目列表，通过将顶层文件中定义的 `projects` 与导入文件中定义的 `projects` 组合生成
- 一组扩展命令，从顶层文件中 `west-commands` 字段和任何导入的文件中提取
- 一个 `group-filter` 列表，由顶层 `group-filter` 和导入的 `group-filter` 组合而成

通过一下顺序完成导入：

1. 先导入 `manifests` 中的 `self-import`。
   
2. 接着处理顶层提货单文件中定义 `import`。

3. 接着按顺序导入 `import-1`、`...`、`import-N` 

当单个 `import` 字段引用多个提货单文件时，它们按以下顺序处理：

- 如果 `import` 的值是命名目录的相对路径（或文件为目录的映射），则它包含的提货单文件按字母顺序处理 - 即按文件名排序。
- 如果它的值时一个序列，它的字段会按照它们出现的顺序递归导入。
  
如有必要，此过程会递归进行。例如，如果 `import-1` 生成一个包含 `import` 字段的提货单文件，则在进一步处理其他内容之前，它会使用相同的规则递归解析。

### Projects

本节将介绍如何创建最终 `projects` 列表。

Projects 按名称标识。如果相同名称出现在多个在 manifest 中，第一个将会被使用，其他的会被忽略。例如，如果 `import-1` 包含一个名为 `bar` 的项目，则会被忽略，因为顶层 `west.yml` 已经使用该名称定义了一个项目。

由 `import-1` 到 `import-N` 命名的文件的内容是从 Git 在其项目中最新的 `manifest-rev` 修订中导入的。这些修订可以通过运行 `lisa zep update` 更新`rev-1` 到 `rev-N` 的值。如果任何 `manifest-rev` 引用丢失或过时，`lisa zep update` 也会从远程 URL 中获取项目数据并更新引用。

另请注意，所有导入的提货单，从根提货单到定义项目 `P` 的仓库，必须是最新的以便于 lisa zep 更新 `P` 本身。例如，如果 `baz/west.yml` 定义了 `P`，`lisa zep update P` 将会更新 `baz` 项目中的 `manifest-rev` 分支，以及更新本地的 git clone 中的 `P` 项目的 `manifest-rev` 分支。令人困惑的是，更新 `baz` 可能会导致 `P` 被 `baz/west.yml` 移除，这“应该”导致 `lisa zep update P` 失败，并且出现无法识别的项目！

因此，如果 `P` 在导入的 manifest 中定义，则不能运行 `lisa zep update P`；你必须更新这个项目与所有其他项目一起使用 `lisa zep update`。

默认情况下，如果项目的修订号是一个 SHA 或 tag，并且已经在本地可用，lisa zep 不会在网络上获取任何项目数据，因此，除非确实需要，否则更新额外的项目不会花费太多时间。请参阅 [update.fetch](./config.md#内置配置选项) 配置选项以获取更多信息。

### 扩展

处理导入时发现的所有使用 `west-commands` 定义的扩展命令都可以在解析的提货单中使用。

如果导入的提货单文件在其 `self:` 区域有一个 `west-commands:` 定义，则在导入提货单时，将会添加到导入提货单时的可用扩展命令集合中。因此，这些扩展命令将会替换任何添加后的相同名称的扩展命令。

### Group filters

解析的 manifest 有一个 `group-filter` 值，它是由顶级 manifest 和导入的 manifest 的 `group-filter` 值组合而成。

导入顺序中较早出现的提货单文件具有更高的优先级，因此将会把它们添加在最后的 `group-filter` 中。

换句话说：
- `self-import` 解析的 submanifest 具有组过滤器(group filter) `self-filter`
- 顶级提货单文件具有组过滤器 `top-filter`
- `import-1` 到 `import-N` 解析的 submanifests 具有组过滤器 `filter-1` 到 `filter-N`
  
最终解析的 `group-filter` 的值为 `filter1 + filter-2 + ... + filter-N + top-filter + self-filter`，其中 `+` 在这里指的是列表连接。

:::info 
这个列表中的过滤器的出现顺序对于上面的内容有重要的影响。

最终连接列表中的最后一个过滤器 “获胜”， 并决定组是否启用或禁用。
:::

例如，在 `[-foo] + [+foo]` 中，组 foo 启用。但是，在 `[+foo] + [-foo]` 中，组 foo 禁用。

为简单起见，lisa zep 和本文档可能会省略使用这些规则冗余的级联过滤器。例如，`[+foo] + [-foo]` 可以简写为 `[-foo]`，因为上面描述的原因。另一个例子，`[-foo] + [+foo]` 可以简写为空列表 `[]`，因为所有组都默认启用。

## 提货单命令

`lisa zep manifest` 命令可以用来操作提货单文件。它接受一个操作，以及操作特定的参数。

以下部分描述每个操作，并提供一个简单的签名来使用。运行 `lisa zep manifest -h` 可以查看所有选项的详细信息。

### 解析提货单

`--resolve` 操作输出一个与当前 manifest 及其所有[导入提货单](#导入提货单) 等效的提货单文件。

```bash
lisa zep manifest --resolve [-o outfile]
```

这个操作的主要用途是查看执行任何 `import`(导入) 之后的 “最终” manifest 内容。

打印每个导入的提货单文件的详细信息，以及 manifest 解析时的项目处理方式，使用 `-v` 设置最大的详细信息级别。

```bash
lisa zep -v manifest --resolve
```

### 冻结提货单

`--freeze` 操作输出一个冻结的 manifest:

```bash
lisa zep manifest --freeze [-o outfile]
```

“冻结”的 manifest 是一个提货单文件，其中每个项目的版本都是一个 SHA。你可以使用 `--freeze` 来生成一个与当前提货单文件等效的冻结 manifest。使用 `-o` 选项指定输出文件；如果没有指定，则使用标准输出。

### 验证提货单

`--validate` 操作要么当前提货单文件有效时成功，要么因错误而失败，

```bash
lisa zep manifest --validate
```

错误信息可以帮助诊断错误。

### 获取提货单路径

`--path` 操作输出到顶层提货单文件的路径:

```bash
lisa zep manifest --path
```

输出是一个某种格式的路径，例如 `/path/to/workspace/west.yml`。路径格式取决于你的操作系统。