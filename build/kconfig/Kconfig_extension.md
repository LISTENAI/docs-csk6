# Kconfig 拓展

Zephyr使用[Kconfig](https://www.kernel.org/doc/Documentation/kbuild/kconfig-language.txt)的[Kconfiglib](https://github.com/ulfalizer/Kconfiglib)实现，其中包括一些Kconfig扩展：

* 环境变量中的`source`语句直接展开，这意味着不需要定义选项 `option env="ENV_VAR"` 的 "bounce"符号。

  :::info  
  从linux4.18开始，C 工具中删除了`option env`。
  :::
   
  引用环境变量的推荐语法是 `$(FOO)` 而不是 `$FOO` 。 这将使用新的Kconfig预处理器。扩展环境变量的 `$FOO` 语法只支持向后兼容。

* `source` 语句支持 glob 模式，并包含每个匹配的文件。至少需要一个样式来匹配一个文件。

  端详以下示例：
  ```
  source "foo/bar/*/Kconfig"
  ```
  如果样式 `foo/bar/*/Kconfig` 匹配 `foo/bar/baz/Kconfig` 和 `foo/bar/qaz/Kconfig` 文件，则上面的语句等价于以下两个`source`语句：

  ```
    source "foo/bar/baz/Kconfig"
    source "foo/bar/qaz/Kconfig"
  ```
  如果没有文件与样式匹配，则生成错误。

  接受通配符样式与python glob模块相同。

  对于样式不匹配任何文件(或文件名不存在)的情况，可以使用单独的 `osource` (可选源)语句。如果没有匹配的文件，则`osource`为 no-op。

  :::info 
  `source` 和 `osource` 类似于 Make 中的 `include` 和`-include`。
  :::

* 可以使用 `rsource` 语句来包含用相对路径指定的文件。该路径相对于包含 `rsource` 语句的 `Kconfig` 文件的目录。

例如，假设 `foo/Kconfig` 是`Kconfig`顶部文件，并且`foo/bar/Kconfig`有以下语句。
```
source "qaz/Kconfig1"
rsource "qaz/Kconfig2"
```

这将包含`foo/qaz/Kconfig1`和`foo/qaz/Kconfig2`两个文件。

可以使用 `rsource` 来创建任意移动的 `Kconfig` 子树

`rsource` 还支持glob样式。

`rsource`的一个缺点是它可能很难找到文件包含在哪里，所以只有在需要的时候才使用它。

* 可以结合使用`osource`和`rsource`的`osource`语句。
  
  例如，下面的语句将包括来自工作目录的 `kconfig1`和 `Kconfig2`(如果它们存在的话) :
  ```
  orsource "Kconfig[12]"
  ```
* `def_int`, `def_hex` 和 `def_string`这些关键字是可用的，类似`def_bool`。它们可以同时设置类型和添加默认值。
