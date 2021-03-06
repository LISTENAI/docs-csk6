# 版本更新日志

## v1.4.1 (latest)

New features:


* 文件系统相关命令改造优化。


* `use-sdk` 命令新增 `--update` 参数：支持更新当前sdk代码和modules。详情查看 [对应章节](sdk_command#id2) 。


* `use-sdk` 命令新增 `--list` 参数：展示当前sdk的tags列表。详情查看 [对应章节](sdk_command#sdk) 。


* `use-sdk` 命令新增 `--mr` 参数：支持sdk切换tag。详情查看 [对应章节](sdk_command#id3) 。


* 新增 `init-vs` 命令：根据当前env编译环境，在当前工程目录下创建vscode debug的runner配置。详情查看 [对应章节](debug_command#vscode-debug-runner) 。


* `config` 命令新增 flash 相关的配置，如：flash.runner 等等。详情查看 [对应章节](app_build_flash#id12) 。

Bug fixes:


* 修复windows下openocd的问题导致flash失败。

## v1.3.1

New features:


* 基于west作为底层，进行build和flash。

Improvement:


* 优化了use-sdk、install等命令的异常。

## v1.2.2

Bug fixes:


* 修复导致use-sdk失败问题：use-sdk时，存在zephyr、zephyr.git命名的ZephyrBase文件夹。

## v1.2.1

New features:


* use-sdk时支持参数设置manifest文件。

Bug fixes:


* 修复lisa zep install时，west调用失败问题。

## v1.1.2

Bug fixes:


* 修复了文件系统打包时遇到not JSON serializable 异常缺陷。
