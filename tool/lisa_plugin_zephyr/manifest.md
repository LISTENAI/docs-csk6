# 提货单

本章会详细介绍提货单的详细信息。

## 提货单文件

West manifests are YAML files. Manifests have a top-level `manifest` section with some subsections, like this:

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

In YAML terms, the manifest file contains a mapping, with a `manifest` key. Any other keys and their contents are ignored (west v0.5 also required a `west` key, but this is ignored starting with v0.6).

在 YAML 术语中，YAML 文件包含一个带有 manifest 字段。

The manifest contains subsections, like defaults, remotes, projects, and self. In YAML terms, the value of the manifest key is also a mapping, with these “subsections” as keys. As of west v0.10, all of these “subsection” keys are optional.

manifest 包含子字段，如 `default`, `remotes`, `projects`, `self`。当然，manifest 的子字段都是可选的。

The projects value is a list of repositories managed by west and associated metadata. We’ll discuss it soon, but first we will describe the remotes section, which can be used to save typing in the projects list.

这部分可以不翻译

## Remotes 

The remotes subsection contains a sequence which specifies the base URLs where projects can be fetched from.

`remotes` 指定远端项目的 URL 地址。

Each remotes element has a name and a “URL base”. These are used to form the complete Git fetch URL for each project. A project’s fetch URL can be set by appending a project-specific path onto a remote URL base. (As we’ll see below, projects can also specify their complete fetch URLs.)

每一个 `remotes` 都有一个 `name`(名称) 和 一个 `url-base` 字段，这为项目提供了完整 Git 项目的 URL 地址。

For example:

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

The remotes keys and their usage are in the following table.

小表列出了 `remotes` 中的字段和说明。

| 字段 | 说明 |
| ---- | ------ |
| name | 必须，remote 的唯一名称   |
| url-base | 必须，远程项目的 URL 地址 |

Above, two remotes are given, with names remote1 and remote2. Their URL bases are respectively https://git.example.com/base1 and https://git.example.com/base2. You can use SSH URL bases as well; for example, you might use git@example.com:base1 if remote1 supported Git over SSH as well. Anything acceptable to Git will work.

上面示例给出两个 `remote`，分别名为 `remote1` 和 `remote2`。`url-base` 项目的地址分别是 https://git.example.com/base1 和 https://git.example.com/base2，你也可以使用 `SSH` URL 地址方式，只要是 Git 支持的格式就行。

## Projects

The projects subsection contains a sequence describing the project repositories in the west workspace. Every project has a unique name. You can specify what Git remote URLs to use when cloning and fetching the projects, what revisions to track, and where the project should be stored on the local file system.

`projects` 指定了项目的信息。每一个项目都有一个唯一(name)名称，可以指定项目 Git 远程 URL 地址，项目的修改提交 commit，以及项目应该存放在本机上的位置。

Here is an example. We’ll assume the remotes given above.

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
```

上面的 YAML 文件：

- proj1 has remote remote1, so its Git fetch URL is https://git.example.com/base1/proj1. The remote url-base is appended with a / and the project name to form the URL.
  
  `proj1` 有一个 `remote` `remote1`，它的 Git 项目 URL 地址为：https://git.example.com/base1/proj1，`remote`，`remote` `url-base` 后面附加一个/和项目名来形成 URL。

  Locally, this project will be cloned at path extra/project-1 relative to the west workspace’s root directory, since it has an explicit path attribute with this value.

  在本地，这个项目会被克隆到 CSK SDK 工作空间的根目录下的 extra/project-1 目录中，`path` 字段指定了这个值。

  Since the project has no revision specified, master is used by default. The current tip of this branch will be fetched and checked out as a detached HEAD when west next updates this project.

  由于没有指定项目 commit，默认情况下使用 master 分支。当下一次更新时，项目的最新提交将作为一个分离的 HEAD 来更新。

- proj2 has a remote and a repo-path, so its fetch URL is https://git.     example.com/base2/my-path. The repo-path attribute, if present, overrides the default name when forming the fetch URL.
  
  `proj2` 有一个 `remote` 和 `repo-path` 字段，所以它的 URL 地址是： https://git.example.com/base2/my-path。如果 `repo-path` 字段存在，它会在拉取项目仓库 URL 时覆盖默认的名称。

  Since the project has no path attribute, its name is used by default. It will be cloned into a directory named proj2. The commit pointed to by the v1.3 tag will be checked out when west updates the project.

  由于项目没有 `path` 字段，因此默认情况下使用其名称，它会被克隆到一个名为 proj2 的目录中。当更新时，`revision` v1.3 的 Git tag 将会被更新到本地上。

- proj3 has an explicit url, so it will be fetched from https://github.com/user/project-three.
  
  `proj3`有一个 url 字段，更新时将会从这个 URL 中更新项目。

  Its local path defaults to its name, proj3. Commit abcde413a111 will be checked out when it is next updated.

  本地路径默认的名称为 `proj3`，下一次更新时将会从提交 abcde413a111 更新。

The available project keys and their usage are in the following table. Sometimes we’ll refer to the defaults subsection; it will be described next.

下表列出了可用 `projects` 字段和说明：

| 字段 | 说明 |
| ---- | ---- |
| name | Mandatory; a unique name for the project. The name cannot be one of the reserved values “west” or “manifest”. The name must be unique in the manifest file. 必须的，项目的唯一名称，名称不能是保留至 "west" 或 "manifest" 之一，该名称在 YAML 文件中必须是唯一的。 |
| remote, url | Mandatory (one of the two, but not both). 必须有其中一个，不需要两个都写。If the project has a remote, that remote’s url-base will be combined with the project’s name (or repo-path, if it has one) to form the fetch URL instead. 如果 `project` 有 `remote` 字段，那么 `remote's` `url-base` 字段将与 `project` 的 `name` （或者 `repo-path`， 如果有的话） 字段组合形成一个 URL |
| repo-path | Optional. If given, this is concatenated on to the remote’s url-base instead of the project’s name to form its fetch URL. Projects may not have both url and repo-path attributes. 可选，如果值不为空，那么将会跟 `remote` `url-base` 字段组合成 URL，而不是跟 `project` 中 `name`，`project` 不能同时存在 `url` 和 `repo-path` 字段 |
| revision | Optional. The Git revision that west update should check out. This will be checked out as a detached HEAD by default, to avoid conflicting with local branch names. If not given, the revision value from the defaults subsection will be used if present. 可选，SDK 更新时会从该字段拉取代码更新。默认情况下，这会创建一个新的 HEAD 分支出来以避免与本地分支造成冲突。如果该字段不填，则使用 `defaults` 中 `revision` 字段(如果存在的话)。A project revision can be a branch, tag, or SHA. `project` `revision` 可以是分支(branch)，标签(tag) 或者 SHA。The default revision is master if not otherwise specified. 如果未指定其他的值，则默认 `revision` 为 master |
| path | Optional. Relative path specifying where to clone the repository locally, relative to the top directory in the west workspace. If missing, the project’s name is used as a directory name. 可选，克隆仓库到本地 SDK 的顶层目录的相对路径。如果缺少 `project` 的 `name` 字段，则将其用作目录名称 |
| clone-path | Optional. If given, a positive integer which creates a shallow history in the cloned repository limited to the given number of commits. This can only be used if the revision is a branch or tag. 可选，如果给定，一个正整数，它在克隆的仓库中创建一个浅历史，限制为给定的提交数量。这只能在如果 `revision` 字段的值是一个分支(branch)或者标签(tag) |
| west-commands | Optional. If given, a relative path to a YAML file within the project which describes additional west commands provided by that project. This file is named west-commands.yml by convention. See Extensions for details. 如果给定，项目中 YAML 文件的相对路径，该文件描述了该项目提供的其他 west 命令。这个文件按照惯例命名为 west-commands.yml。 |
| import | Optional. If true, imports projects from manifest files in the given repository into the current manifest. See Manifest Imports for details.可选，如果为 `true` 则将项目从给定仓库中的 YAML 文件导入到当前 YAML 文件中。 |
| groups | Optional, a list of groups the project belongs to. See Project Groups and Active Projects for details. 可选，项目所属的组(group)列表 |
| submodules | Optional. You can use this to make west update also update Git submodules defined by the project. See Git Submodules in Projects for details. 可选，你可以使用 `lisa zep update` 更新代码同时更新 Git 子模块的代码 |
| userdata | Optional. The value is an arbitrary YAML value. See Repository user data. 可选，该值是任意的 YAML 值。 |

## Defaults 

The defaults subsection can provide default values for project attributes. In particular, the default remote name and revision can be specified here. Another way to write the same manifest we have been describing so far using defaults is:

`defaults` 字段可以为项目提供默认值，可以指定 `remote` 中 `name` 和 `revision`。另一种使用默认值编写清单的方法是:

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

The available defaults keys and their usage are in the following table.

下表列出可用的字段和说明：

| 字段 | 说明 |
| ---- | ---- |
| remote | Optional. This will be used for a project’s remote if it does not have a url or remote key set. 可选，如果 `project` 中没有 `url` 和 `remote` 字段，那么这个字段将会默认为 `project's` 中 `remote` 字段的值 |
| revision | Optional. This will be used for a project’s revision if it does not have one set. If not given, the default is master. 可选，如果 `project` 中没有 `revision` 字段，那么这个字段会默认为 `project's` 中 `revision` 字段的值 |

## Self

The self subsection can be used to control the manifest repository itself.

`self` 字段用于控制 `manifest` 仓库本身。

As an example, let’s consider this snippet from the zephyr repository’s west.yml:

作为一个例子，让我们看一下 zephyr 仓库的 West.yml 的这个片段:

```YAML
manifest:
  # ...
  self:
    path: zephyr
    west-commands: scripts/west-commands.yml
```

This ensures that the zephyr repository is cloned into path zephyr, though as explained above that would have happened anyway if cloning from the default manifest URL, https://github.com/zephyrproject-rtos/zephyr. Since the zephyr repository does contain extension commands, its self entry declares the location of the corresponding west-commands.yml relative to the repository root.

这确保了 zephyr 仓库被克隆到路径 `zephyr` 中，self 字段声明了相应的 west-commands.yml 相对于仓库根目录的位置。

The available self keys and their usage are in the following table.

下表列出可用的字段和说明：

| 字段 | 说明 |
| ---- | ---- |
| path | Optional. The path west init should clone the manifest repository into, relative to the west workspace topdir. 可选，克隆项目到相对于 SDK 顶层目录的相对路径 If not given, the basename of the path component in the manifest repository URL will be used by default. For example, if the URL is https://git.example.com/project-repo, the manifest repository would be cloned to the directory project-repo. 如果未指定值，则默认情况下将使用 `manifest` 仓库 URL 中的路径组件的基名。例如，如果 URL 是 https://git.example.com/project-repo，则仓库将被克隆到目录 project-repo |
| west-commands | Optional. This is analogous to the same key in a project sequence element. 可选，跟 `project` 中 `west-commands` 字段意思一样 |
| import | Optional. This is also analogous to the projects key, but allows importing projects from other files in the manifest repository. See Manifest Imports. 可选，跟 `project` 中 `west-commands` 字段意思一样，但是允许从 manifest 仓库中其他文件导入项目 |

## Version

The version subsection can be used to mark the lowest version of the manifest file schema that can parse this file’s data:

`version` 可用于标记 `manifest` 的最低版本。

```YAML
manifest:
  version: "0.10"
  # 标记此文件使用 0.10 版的 west manifest 文件格式
```


