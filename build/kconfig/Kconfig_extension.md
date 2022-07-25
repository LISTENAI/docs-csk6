# Kconfig 拓展

Zephyr uses the Kconfiglib implementation of Kconfig, which includes some Kconfig extensions:  
Zephyr使用[Kconfig](https://www.kernel.org/doc/Documentation/kbuild/kconfig-language.txt)的[Kconfiglib](https://github.com/ulfalizer/Kconfiglib)实现，其中包括一些Kconfig扩展：

* Environment variables in source statements are expanded directly, meaning no “bounce” symbols with option env="ENV_VAR" need to be defined.
  环境变量中的`source`语句直接展开，这意味着不需要定义选项 `option env="ENV_VAR"` 的 "bounce"符号。

  :::info
  option env has been removed from the C tools as of Linux 4.18 as well.    
  从linux4.18开始，C 工具中删除了`option env`。
  :::
  
  The recommended syntax for referencing environment variables is $(FOO) rather than $FOO. This uses the new Kconfig preprocessor. The $FOO syntax for expanding environment variables is only supported for backwards compatibility.  
  引用环境变量的推荐语法是 `$(FOO)` 而不是 `$FOO` 。 这将使用新的Kconfig预处理器。扩展环境变量的 `$FOO` 语法只支持向后兼容。

* The source statement supports glob patterns and includes each matching file. A pattern is required to match at least one file.  
  `source` 语句支持 glob 模式，并包含每个匹配的文件。至少需要一个样式来匹配一个文件。

  Consider the following example:  
  端详以下示例：
  ```
  source "foo/bar/*/Kconfig"
  ```

  If the pattern foo/bar/*/Kconfig matches the files foo/bar/baz/Kconfig and foo/bar/qaz/Kconfig, the statement above is equivalent to the following two source statements:   
  
  如果样式 `foo/bar/*/Kconfig` 匹配 `foo/bar/baz/Kconfig` 和 `foo/bar/qaz/Kconfig` 文件，则上面的语句等价于以下两个`source`语句：

  ```
    source "foo/bar/baz/Kconfig"
    source "foo/bar/qaz/Kconfig"
  ```
  If no files match the pattern, an error is generated.  
  如果没有文件与样式匹配，则生成错误。

  The wildcard patterns accepted are the same as for the Python glob module.  
  接受通配符样式与python glob模块相同。

  For cases where it’s okay for a pattern to match no files (or for a plain filename to not exist), a separate osource (optional source) statement is available. osource is a no-op if no file matches.  
  对于样式不匹配任何文件(或文件名不存在)的情况，可以使用单独的 `osource` (可选源)语句。如果没有匹配的文件，则`osource`为 no-op。

  :::info
  source and osource are analogous to include and -include in Make.  
  `source` 和 `osource` 类似于 Make 中的 `include` 和`-include`。
  :::

* An rsource statement is available for including files specified with a relative path. The path is relative to the directory of the Kconfig file that contains the rsource statement.  
可以使用 `rsource` 语句来包含用相对路径指定的文件。该路径相对于包含 `rsource` 语句的 `Kconfig` 文件的目录。

As an example, assume that foo/Kconfig is the top-level Kconfig file, and that foo/bar/Kconfig has the following statements:  
例如，假设 `foo/Kconfig` 是`Kconfig`顶部文件，并且`foo/bar/Kconfig`有以下语句。
```
source "qaz/Kconfig1"
rsource "qaz/Kconfig2"
```

This will include the two files foo/qaz/Kconfig1 and foo/bar/qaz/Kconfig2.  
这将包含`foo/qaz/Kconfig1`和`foo/qaz/Kconfig2`两个文件。

rsource can be used to create Kconfig “subtrees” that can be moved around freely.  
可以使用 `rsource` 来创建任意移动的 `Kconfig` 子树

rsource also supports glob patterns.  
`rsource` 还支持glob样式。

A drawback of rsource is that it can make it harder to figure out where a file gets included, so only use it if you need it.  
`rsource`的一个缺点是它可能让找出文件包含在哪里变得困难，所以只有在需要的时候才使用它。

* An orsource statement is available that combines osource and rsource.  
  可以结合使用`osource`和`rsource`的`osource`语句。
  
  For example, the following statement will include Kconfig1 and Kconfig2 from the current directory (if they exist):  
  例如，下面的语句将包括来自工作目录的 `kconfig1`和 `Kconfig2`(如果它们存在的话) :
  ```
  orsource "Kconfig[12]"
  ```
* def_int, def_hex, and def_string keywords are available, analogous to def_bool. These set the type and add a default at the same time.  
  `def_int`, `def_hex` 和 `def_string`这些关键字是可用的，类似`def_bool`。它们可以同时设置类型和添加默认值。
