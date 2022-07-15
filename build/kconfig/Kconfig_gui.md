# Kconfig交互界面

## menuconfig
menuconfig是在终端中运行的基于curses的界面，对项目构建时Kconfig进行临时配置，构建配置只在  **zephyr/build/zephyr/.config**  下有效。

> 可以通过zephyr/.config在应用程序构建目录中手动编辑来更改配置，使用配置界面进行配置更方便，它们能正确处理配置中的依赖关系。

在项目中，要使设置永久生效，您应该设置*.conf文件，如[设置Kconfig配置](/build/kconfig/Kconfig_custom.md)中描述的

运行配置界面，请执行以下命令：

1. 使用 lisa zep 像往常一样构建您的应用cmake
```
lisa zep build -b <board>
```

2. 使用 lisa zep 基于终端的menuconfig界面
```
lisa zep build -t menuconfig -b <board>
```
界面所示如下：
![menuconfig](images/menuconfig.png)

3. 更改menuconfig界面配置值如下

* 使用箭头键导航菜单，支持常见的vim键绑定。
  
* 使用 space 和 enter 进入菜单和切换值，菜单出现--->在它们旁边。按下ESC以返回父菜单。
布尔值配置选项用 **[ ]** 括号显示,数字和字符串值用 **( )** 现实，无法更改的值用 **--** 或 **-*-** 

> 您也可以用Y或N对布尔值进行设置

* 按 **?** 显示有关当前选项的信息，包括帮助文本。按  **ESC**  或  **Q**  从信息显示返回到菜单
  
4. 按下 **Q**  在menuconfig会弹出保存和推出对话框。

![menuconfig-quit](images/menuconfig-quit.png)

按Y将内核配置选项保存为默认文件名  **/build/zephyr/.config**  

>构建期间使用的文件始终为 **/build/zephyr/.config** . 如果您有另外一个要构建的已保存配置想构建，可将其复制到 **/build/zephyr/.config**. 复制前确保您的原始配置文件已备份  
另外注意的是，在Linux和macOS上默认情况下 **.** 开头的文件不会显示，可用 **ls -a**  来查看

在菜单树中找到和导航到指定选项非常麻烦，要跳转到指定选项，请按 **/** 键来进行搜索并跳转。
![menuconfig-jump-to](images/menuconfig-jump-to.png)

如果您跳转到当前不可见的选项（例如：不满足的依赖关系），则启用全部显示模式。在该模式下，所有选项都会被显示，包括当前不可见的选项，要关闭按 **A** 即可。

> 如果当前菜单没有可见项目，则无法关闭全部显示模式。

要找出您跳转到的符号不可见原因，请检查依赖关系，方法是按下 **?** 键。如果您发现该选项依赖另外一个未启用的选项，您可以跳转到该选项查看它是否启用。

>在menuconfig，您可以在不离开对话框的请夸下，按 **Ctrl-F** 查看当前选项的帮助。

```
* 上下方向键：移动选项光标；

* 右方向键|空格|回车：选择选项 or 进入选项；

* 左方向键|ESC：返回 or 退出；

* /：进入选项搜索（按 *esc* 返回）；

* shift + ? ：显示选项信息；

* shift + s： 保存配置；

* shift + q： 保存配置；

```
