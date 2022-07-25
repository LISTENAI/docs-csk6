# 引脚控制

These are used to access pin control properties by name or index.  
他们用于按名称或索引访问引脚控制属性。

Devicetree nodes may have properties which specify pin control (sometimes known as pin mux) settings. These are expressed using `pinctrl-<index>` properties within the node, where the `<index>` values are contiguous integers starting from 0. These may also be named using the `pinctrl-names` property.  
设备树节点可具有指定引脚控制（有时称引脚复用器）设置的属性。它们在节点中用`pinctrl-<index>`属性表示，其中`<index>`值是从0开始的连续整数。这些也可以使用`pinctrl-names`属性命名。

Here is an example:  
这里有一个例子：

```
node {
    ...
    pinctrl-0 = <&foo &bar ...>;
    pinctrl-1 = <&baz ...>;
    pinctrl-names = "default", "sleep";
};
```

Above, `pinctrl-0` has name `"default"`, and `pinctrl-1` has name `"sleep"`. The `pinctrl-<index>` property values contain phandles. The `&foo`,` &bar`, etc. phandles within the properties point to nodes whose contents vary by platform, and which describe a pin configuration for the node.  
上面所示， `pinctrl-0` 的名称为 `"default"`， `pinctrl-1`的名称为`"sleep"` 。`pinctrl-<index>`属性值包含指针句柄。属性中的`&foo`,` &bar`等指针句柄指向内容因平台而异，它们描述了节点的引脚配置。

详情请参考的[引脚控制API](https://docs.zephyrproject.org/2.7.0/reference/devicetree/api.html#pinctrl-pin-control)定义。

