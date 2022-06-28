# Lisa Plugin Zephyr

**LISA(Listenai Independent Software Architecture)** 是聆思智能提供的软件框架，支持客户通过命令行工具使用并管理聆思提供的软件包。

通过 lisa 作为顶级命令，后面带上对应的子命令启动，比如:

```bash
lisa -v
lisa login
lisa info
```

**Lisa-Plugin-Zephyr** 是基于 Lisa 生态的一个命令行插件。使用它你能很便捷地对CSK6应用程序进行 **构建**、 **烧录**、 **调试** 等功能。

该插件的调用，通过 lisa zep 来作为顶级命令，后面带上对应的子命令、选项和参数：

```bash
lisa zep <command> [opts] <args>
```

以下是 **Lisa Plugin Zephyr** 的v1.3.0版本的章节文档，并提供了有关该工具的更多背景信息。


<!-- * [获取](install) -->


* [版本更新日志](release_note)


    * [v1.4.1 (latest)](release_note#v1-4-1-latest)


    * [v1.3.1](release_note#v1-3-1)


    * [v1.2.2](release_note#v1-2-2)


    * [v1.2.1](release_note#v1-2-1)


    * [v1.1.2](release_note#v1-1-2)


* [疑难解答](trouble_shooting)


    * [lisa zep 命令报错](trouble_shooting#lisa-zep)


* [CSK SDK 操作](sdk_command)


    * [从远端获取CSK SDK到本地](sdk_command#id1)


    * [更新本地的 CSK SDK](sdk_command#id2)


    * [查看当前 SDK 的版本分支列表](sdk_command#sdk)


    * [切换当前 SDK 到其他版本分支](sdk_command#id3)


    * [切换本地别的CSK SDK路径](sdk_command#id4)


    * [清空当前CSK SDK](sdk_command#id5)


    * [重新安装CSK SDK的requirements](sdk_command#csk-sdkrequirements)


* [编译环境](env_command)


    * [设置/替换 编译环境](env_command#id2)


    * [更新/重新安装 已设置的编译环境](env_command#id3)


    * [清空当前编译环境](env_command#id4)


* [创建项目](create_command)


* [编译，烧录](app_build_flash)


    * [编译](app_build_flash#id2)


        * [基础](app_build_flash#id3)


        * [设置工程项目路径](app_build_flash#id4)


        * [设置编译产物输出路径](app_build_flash#id5)


        * [设置默认开发板](app_build_flash#id6)


        * [原始编译](app_build_flash#id7)


        * [详细编译](app_build_flash#id8)


    * [烧录](app_build_flash#id9)


        * [基础](app_build_flash#id10)


        * [指定烧录工具](app_build_flash#id11)


        * [配置默认烧录工具和对应参数](app_build_flash#id12)


* [文件系统相关](filesystem)


    * [快速上手](filesystem#id2)


    * [分区文件夹初始化](filesystem#id3)


    * [打包：默认分区文件夹](filesystem#id4)


    * [打包：自定义分区文件夹](filesystem#id5)


    * [烧录](filesystem#id6)


* [调试](debug_command)


    * [生成 vscode debug runner 配置](debug_command#vscode-debug-runner)
