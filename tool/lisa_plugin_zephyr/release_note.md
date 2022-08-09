# lisa zep 更新日志

## v1.6.2 (beta)

#### New features:

* `lisa zep sdk` : 新增 sdk 管理命令，交互式对 sdk 进行操作指引。详情查看 [对应章节](../lisa_plugin_zephyr/basic#csk-sdk-操作) 。
* `lisa zep ide` : 新增 ide 操作指引命令，针对 ide 对应插件的插件配置自动生成。详情查看 [对应章节](../lisa_plugin_zephyr/build_flash_debug#csk6) 。
* `lisa zep fs` : 新增文件系统操作指引命令。

## v1.6.1 (latest)

#### New features:

* 应用级工程项目：lisa zep init-app 命令支持命令失败后，能继续init，并执行后 install 底层sdk的requirement。
* lisa zep use-sdk 拉取sdk支持失败后，命令执行能从失败处续上。
* lisa zep lpk：新增支持 lpk 包打包输出。
* lisa zep create：修改创建过程的交互。

## v1.6.0

#### New features:

* `lisa zep create` 重构 项目sample 创建的交互。
* `lisa zep lpk` 新增支持打包lpk的命令，用于量产烧录。

## v1.5.2

#### New features:

* `fs:flash` 支持 `--runner` 为 `csk`，实现文件系统的串口烧录。

#### Bug fixes:

* 应用级提货单：修复 `init-app` 时，`.west/config` 缺少 `zephyr base` 的问题。

## v1.5.0

#### New features:

* `use-sdk` 新增 `--default` 参数，默认拉取csk官方sdk。

* 支持应用级提货单，并根据 topdir 来处理 ZEPHYR_BASE。

#### Bug fixes:

* `use-sdk` 命令修复已存在folder导致的问题，命令执行后报错问题。

#### Improvement:

* `lisa info zephyr` 显示 ZEPHYR_BASE 时，版本分支的修改优化。

## v1.4.1

#### New features:


* 文件系统相关命令改造优化。


* `use-sdk` 命令新增 `--update` 参数：支持更新当前sdk代码和modules。


* `use-sdk` 命令新增 `--list` 参数：展示当前sdk的tags列表。


* `use-sdk` 命令新增 `--mr` 参数：支持sdk切换tag。


* 新增 `init-vs` 命令：根据当前env编译环境，在当前工程目录下创建vscode debug的runner配置。


* `config` 命令新增 flash 相关的配置，如：flash.runner 等等。

#### Bug fixes:


* 修复windows下openocd的问题导致flash失败。

## v1.3.1

#### New features:


* 基于west作为底层，进行build和flash。

#### Improvement:


* 优化了use-sdk、install等命令的异常。

## v1.2.2

#### Bug fixes:


* 修复导致use-sdk失败问题：use-sdk时，存在zephyr、zephyr.git命名的ZephyrBase文件夹。

## v1.2.1

#### New features:


* use-sdk时支持参数设置manifest文件。

Bug fixes:


* 修复lisa zep install时，west调用失败问题。

## v1.1.2

#### Bug fixes:


* 修复了文件系统打包时遇到not JSON serializable 异常缺陷。
