# 问题排查

以下是一些提示，用于修复与设备树相关的、行为不正确的代码。

[设备树操作指引](./howtos.md) 章节中你可以看到其他“如何做”风格的介绍。

## 恢复原始构建目录后重试

:::tip 重要
在尝试其他解决方式之前，总是 **先试试** 这种方式。
:::

请参阅 [原始构建](../../tool/lisa_plugin_zephyr/build_flash_debug.md#原始编译) 了解相关示例，或者直接完全删除构建目录（通常是 `build/` ）并重试。

这是特别适用于调试设备树问题的通用建议，因为设备树的输出产物是在 CMake 的配置阶段创建的，并且当其中某些输入更改时并不总会重新生成。

## 确保包含 `#include <devicetree.h>`

与 Kconfig 符号不同，必须明确包含 `devicetree.h` 头文件。

许多 Zephyr 头文件都依赖于来自设备树的信息，因此当你包含一些其他 API 时，可能顺带也包含了 `devicetree.h` ，但这并不能得到保证。

## 确保你使用了正确的名称

请记住：

- 在 C/C++ 中引用的设备树名称，必须使用小写字母，特殊字符必须转换为下划线。一个 Zephyr 生成的设备树头文件中的名称，都以这种方式转换 DTS 名称，最终在基于预处理器的 `<devicetree.h>` 中，生成可在 C 中使用的标识。
- 在 overlay 中，使用设备树节点和属性名称的方式，等同于它们在任何 DTS 文件中的显示方式。 Zephyr overlay 应视为 DTS 片段。

例如，如果你尝试在 C/C++ 文件中，使用路径为 `/soc/i2c@12340000` 的节点 **获取** `clock-frequency` 属性：

```c
/*
 * foo.c: 使用小写字母与下划线的名称
 */

/* 不应如此: */
#define MY_CLOCK_FREQ DT_PROP(DT_PATH(soc, i2c@1234000), clock-frequency)
/*                                           ^               ^
 *                                        @ 应替换为 _     - 应替换为 _  */

/* 正确做法: */
#define MY_CLOCK_FREQ DT_PROP(DT_PATH(soc, i2c_1234000), clock_frequency)
/*                                           ^               ^           */
```

如果你尝试在设备树 overlay 中 **设置** 该属性：

```c
/*
 * foo.overlay: 包含特殊字符等内容的 DTS 名称。
 */

/* 禁止；你将收到设备树错误。 */
&{/soc/i2c_12340000/} {
     clock_frequency = <115200>;
};

/* 正确做法。 Overlay 应视为 DTS 片段。 */
&{/soc/i2c@12340000/} {
     clock-frequency = <115200>;
};
```

## 检查预处理器的输出

因为我们使用基于 GCC 的工具链，因此将 `-save-temps=obj` 添加到 CMake 变量 `EXTRA_CFLAGS` 中，即可在构建时保存预处理器输出。例如，要使用此选项使用 `lisa zep` 构建 Hello World，请使用：

```bash
lisa zep build -b BOARD samples/hello_world -- -DEXTRA_CFLAGS=-save-temps=obj
```

这将在构建目录中，为每个源码文件 `foo.c` 创建一个名为 `foo.c.i` 的预处理器输出文件。

然后，你可以在构建目录中搜索该文件，以查看你的设备树宏扩展成什么。在 macOS 和 Linux 上，可用 `find` 命令查找 `main.c.i` ：

```bash
$ find build -name main.c.i
build/CMakeFiles/app.dir/src/main.c.i
```

在打开这些文件之前，对文件运行样式格式化，通常对查看它们更有帮助。例如，如果安装了 `clang-format` ，可以这样重新格式化文件：

```bash
clang-format -i build/CMakeFiles/app.dir/src/main.c.i
```

然后，你可以在你喜欢的编辑器中打开该文件，以查看预处理后的最终 C 结果。

## 验证属性

如果你在读取节点属性时遇到编译错误，请检查你所使用的的节点 id 和属性。例如，如果你的构建出现错误，并指向如下所示的源码行：

```c
int baud_rate = DT_PROP(DT_NODELABEL(my_serial), current_speed);
```

可尝试将以下内容添加到源码文件，并重新编译来检查节点：

```c
#if !DT_NODE_EXISTS(DT_NODELABEL(my_serial))
#error "whoops"
#endif
```

如果你在重新构建时看到“whoops”错误消息，则表示这一节点 id 不能指向有效节点。[获取设备树与生成的 header](./howtos.md#获取设备树与生成的-header) 并从此处入手进行调试。

如果你没有看到“whoops”错误消息，应接着检查：

- 你是否 [确保使用了正确的名称](#确保你使用了正确的名称) ？
- [属性是否存在](./api_usage.md#检查属性与对应值) ？
- 该节点是否有 [匹配的绑定](./bindings.md) ？
- 上一步的绑定是否定义了该属性？

## 检查缺失的绑定

请参阅 [设备树绑定](./bindings.md) 查看绑定的相关信息，请参阅 [绑定索引](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html#devicetree-binding-index) 查看 Zephyr 中内置绑定的相关信息。

如果在构建时未能 [找到节点的设备树绑定](./howtos.md#查找设备树绑定) ，那么若非节点的 `compatible` 属性未定义，就是其值没有匹配的绑定。如果设置了属性，请检查其名称中的拼写错误。在设备树源码文件中， `compatible` 应该看起来像 `"vnd,some-device"` —— [确保你使用了正确的名称](#确保你使用了正确的名称) 。

如果你所使用的的绑定文件不在 `zephyr/dts` 中，那么需要设置 [DTS_ROOT](../../application/application_development.md#设备树定义) 指定绑定文件所在位置；请参阅 [绑定在何处定位](./bindings.md#绑定在何处定位) 。

## `DT_INST_()` API 引发的错误

如果你使用形如 `DT_INST_()` 的 API （例如 [`DT_INST_PROP()`](./api/api.md#dt_inst_propinst-prop) ），则必须将 `DT_DRV_COMPAT` 对应到你期望的 compatible （注意应是小写字母和下划线版本）。请参阅 [方式 1：通过实例编号创建设备](./howtos.md#方式-1：通过实例编号创建设备) 。
