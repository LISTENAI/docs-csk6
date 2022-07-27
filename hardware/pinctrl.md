# 引脚控制
 
他们用于按名称或索引访问引脚控制属性。

设备树节点可具有指定引脚控制（有时称引脚复用器）设置的属性。它们在节点中用`pinctrl-<index>`属性表示，其中`<index>`值是从0开始的连续整数。这些也可以使用`pinctrl-names`属性命名。
 
这里有一个例子：

```
node {
    ...
    pinctrl-0 = <&foo &bar ...>;
    pinctrl-1 = <&baz ...>;
    pinctrl-names = "default", "sleep";
};
```

上面所示， `pinctrl-0` 的名称为 `"default"`， `pinctrl-1`的名称为`"sleep"` 。`pinctrl-<index>`属性值包含指针句柄。属性中的`&foo`,` &bar`等指针句柄指向内容因平台而异，它们描述了节点的引脚配置。

详情请参考的[引脚控制API](https://docs.zephyrproject.org/2.7.0/reference/devicetree/api.html#pinctrl-pin-control)定义。

