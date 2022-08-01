# 设备树 API

这是 `<devicetree.h>` API 的参考页面。此 API 是基于宏的。使用这些宏对调度没有性能影响。它们可以在任何调用上下文或文件范围内使用。

其中一些 API 需要在使用之前定义一个名为 `DT_DRV_COMPAT` 的特殊宏；下文将单独讨论此情况。这些宏通常是在设备驱动程序中使用的，尽管它们可以在驱动程序之外使用，但当你这么做时需要小心谨慎（例如，使用 `DT_DRV_INST` 宏要求你先声明 `DT_DRV_COMPAT` ，你可以在你的应用程序声明一个应用级别的 `DT_DRV_COMPAT` ，这样子 `DT_DRV_INST` 就可以获取指定 compatible 的设备实例，但这样的行为通常会让使得你的应用与某个设备强耦合，我们并不推荐这样的做法）。

:::info 注意 
本文档旨在解释各个 API 分类的概念性介绍以及主要作用，对于具体的单个 API 的定义和用法，则引用到 [Zephyr 官方文档](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree.html) 。
:::

通用 APIs {#devicetree-generic-apis}
------------

本节中的 API 可以在任何地方使用，不需要定义 `DT_DRV_COMPAT` 。

### 节点 id 与帮助类

[*节点 id（ node id ）*](../api_usage.md#节点-id) 是引用设备树节点的一种方式，它在 C 预处理器阶段生效。虽然节点 id 不是 C 值（参考 [节点 id 不是 C 值](../api_usage.md#节点-id-并不是值) ），但你可以使用它们来访问 C 右值（ rvalue ）形式的设备树数据，例如使用 [访问属性 API](#devicetree-property-access) 。

节点 id `DT_ROOT` 指向根节点 `/` 。你可以使用 [`DT_PATH()`](#dt_path) 、 [`DT_NODELABEL()`](#dt_nodelabellabel) 、 [`DT_ALIAS()`](#dt_aliasalias) 和 [`DT_INST()`](#dt_instinst-compat) 为其他设备树节点创建节点 id 。

若要为给定节点的父节点或特定子节点创建节点 id ，可使用 [`DT_PARENT()`](#dt_parentnode_id) 和 [`DT_CHILD()`](#dt_childnode_id-child) 宏。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_INVALID_NODE </code>

<div style={{ paddingLeft: 16 }}>

无效节点 id 的名称。

这支持可以从设备树数据可能或可能不可用的路径调用分解宏的情况。它是一个与任何有效的设备树节点 id 都不匹配的预处理器标识符。

</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_ROOT </code>

<div style={{ paddingLeft: 16 }}>
设备树中根节点 id 。
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PATH(...) </code>

<div style={{ paddingLeft: 16 }}>

根据设备树路径获取对应的节点 id 。

（此宏用于从路径组件返回节点 id 。要从节点 id 获取路径字符串，请改用 [`DT_NODE_PATH()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_NODE_PATH) 。）

此宏的参数是由一组名称组成的——从根节点（不包括）开始，到达所需节点，所需的所有非根节点的名称。每个名称中的非字母数字字符必须转换为下划线以形成有效的 C 标记，并且字母必须小写。

示例设备树片段：

```c
/ {
        soc {
                serial1: serial@40001000 {
                        status = "okay";
                        current-speed = <115200>;
                        ...
                };
        };
};
```

你可以使用 `DT_PATH(soc, serial_40001000)` 获取 serial@40001000 的节点 id 。节点标签（如 "serial1" ）不能用作 [`DT_PATH()`](#dt_path) 参数；作为代替，你应该使用 [`DT_NODELABEL()`](#dt_nodelabel) 。

使用 [`DT_PROP()`](#dt_prop) 获取 `current-speed` 属性的示例用法：

```c
DT_PROP(DT_PATH(soc, serial_40001000), current_speed) // 115200
```

（使用此 API 时，`current-speed` 属性也应是“小写和下划线”形式。）

在确定 [`DT_PATH()`](#dt_path) 的参数时：

- 第一个参数对应于根的一个子节点（在上例中则是 "soc" ）
- 第二个参数对应于第一个参数的子节点（在上例中则是 "`serial_40001000`" ，它是从节点名称 "`serial@40001000`" 转成小写并将特殊字符 "`@`" 更改为 "`_`" 得出的）
- 依此类推，以获取所需节点路径中的更深节点

<table>
<tr><th width="12%">参数</th>
<td>

- ... - 沿节点路径的小写和下划线节点名称，每个名称作为单独的参数给出

</td></tr>
<tr><th>返回值</th>
<td>
具有该路径的的节点 id  
</td></tr>
</table>

</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_NODELABEL(label) </code>

<div style={{ paddingLeft: 16 }}>

根据节点标签获取节点 id 。

将节点标签中的非字母数字的字符转换为下划线，并将所有字母小写，以形成有效的 C 标记。请注意，节点标签与 `label` 属性并不相关。

示例设备树片段：

```c
serial1: serial@40001000 {
        label = "UART_0";
        status = "okay";
        current-speed = <115200>;
        ...
};
```

此示例中只有一个节点标签 "serial1" 。

字符串 "UART_0" *不是* 节点标签；它是一个名为 label 的属性值。

你可以使用 [`DT_NODELABEL(serial1)`](#dt_nodelabellabel) 获取 `serial@40001000` 的节点 id 。使用 [`DT_PROP()`](#dt_propnode_id-prop) 获取 `current-speed` 属性的示例用法：

```c
DT_PROP(DT_NODELABEL(serial1), current_speed) // 115200
```

另一个设备树示例：

```c
cpu@0 {
       L2_0: l2-cache {
               cache-level = <2>;
               ...
       };
};
```

获取 `cache-level` 属性的示例用法：

```c
DT_PROP(DT_NODELABEL(l2_0), cache_level) // 2
```

请注意 [DT_NODELABEL()](#dt_nodelabellabel) 参数中的 "l2_0" ，是从设备树中的 "L2_0" 转为小写得出的。

<table>
<tr><th width="12%">参数</th>
<td>

- **label** – 节点标签名称，表示为小写与下划线形式

</td></tr>
<tr><th>返回值</th>
<td>

具有该标签的的节点 id  

</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_ALIAS(alias) </code>

<div style={{ paddingLeft: 16 }}>

从 `/aliases` 的别名获取节点 id 。

这个宏的参数是 `/aliases` 节点的一个属性。它返回别名的节点 id 。将 `alias` 属性中的非字母数字字符转换为下划线，并将所有字母小写，以形成有效的 C 标记，。

示例设备树片段：

```c
/ {
        aliases {
                my-serial = &serial1;
        };

        soc {
                serial1: serial@40001000 {
                        status = "okay";
                        current-speed = <115200>;
                        ...
                };
        };
};
```

你可以使用 [`DT_ALIAS(my_serial)`](#dt_aliasalias) 获取 serial@40001000 的节点 id 。请注意设备树中的 `my-serial` 在 [`DT_ALIAS()`](#dt_aliasalias) 参数中如何转成 `my_serial` 。使用 [`DT_PROP()`](#dt_propnode_id-prop) 获取 `current-speed` 属性的示例用法：

```c
DT_PROP(DT_ALIAS(my_serial), current_speed) // 115200
```

<table>
<tr><th width="12%">参数</th>
<td>

- **alias** - 别名，表示为小写与下划线形式

</td></tr>
<tr><th>返回值</th>
<td>
具有该别名的节点 id  
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_INST(inst, compat) </code>

<div style={{ paddingLeft: 16 }}>

获取 compatible 对应实例的节点 id 。

具有特定 compatible 属性值的所有节点都分配有实例编号，这些实例编号是特定于该 compatible 的从零开始的索引。你可以通过向 [`DT_INST()`](#dt_instinst-compat) 传递实例编号 "inst" 以及 compatible 的小写和下划线版本 "compat" 来获取这些节点的 id 。

实例编号具有以下属性：

- 对于每个 compatible ，实例编号从 0 开始并且是连续的
- 每个具有 compatible 的节点都会被分配一个实例编号，**包括未启用（ disabled ）的节点**
- 启用（ enabled ）的节点（ status 属性为 "okay" 或未声明 status ）分配的实例编号从 0 开始，未启用节点的实例编号大于任何启用节点的实例编号

不作任何其他保证。尤其是：

- 对于节点中已存在的数字表示，例如在 SoC 文档中提到的、节点标签、单元地址或 `/aliases` 节点属性中的任何数字，实例编号与他们 **没有对应关系**（这些场景中应使用 [`DT_NODELABEL()`](#dt_nodelabellabel) 或 [`DT_ALIAS()`](#dt_aliasalias) ）
- **无法保证** 同一节点在构建之间具有相同的实例编号，即使你在同一 build 目录中再次构建相同的应用程序也一样

示例设备树片段：

```c
serial1: serial@40001000 {
        compatible = "vnd,soc-serial";
        status = "disabled";
        current-speed = <9600>;
        ...
};

serial2: serial@40002000 {
        compatible = "vnd,soc-serial";
        status = "okay";
        current-speed = <57600>;
        ...
};

serial3: serial@40003000 {
        compatible = "vnd,soc-serial";
        current-speed = <115200>;
        ...
};
```

假设设备树中没有其他节点的 compatible 为 "vnd,soc-serial" ，则该 compatible 具有实例编号为 0、1 和 2 的节点。

节点 `serial@40002000` 和 `serial@40003000` 都是启用节点，所以先把实例号 0 和 1 分配给它们，但是不保证哪个节点有哪个实例号。

由于 `serial@40001000` 是唯一未启用的节点，它的实例编号为 2，因为未启用的节点被将从最大的实例编号开始分配。所以：

```c
// 可能是 57600 或 115200 。并没有方法确认：
// 不论 serial@40002000 或 serial@40003000 都可能编号为 0 ，
// 所以这里的属性可能是他们任一个的 current-speed 属性。
DT_PROP(DT_INST(0, vnd_soc_serial), current_speed)

// 与上述原因相同，这里也可能是 57600 或 115200 。
DT_PROP(DT_INST(1, vnd_soc_serial), current_speed)

// 9600 ，因为只有一个未启用节点，
// 未启用节点位于实例数字列表的末尾。
DT_PROP(DT_INST(2, vnd_soc_serial), current_speed)
```

请注意设备树中的 `vnd,soc-serial` 在 [`DT_INST()`](#dt_instinst-compat) 参数中如何转成 `vnd_soc_serial` （不带引号）。 （像往常一样，设备树中的 `current-speed` 也转成 `current_speed` 。）

如果节点 "compatible" 属性具有多个值，每个 compatible 值都将分配实例编号，互不影响。

<table>
<tr><th width="12%">参数</th>
<td>

- **inst** – 实例编号，其中实例的 compatible 为 "compat" 参数
- **compat** – compatible，表示为小写与下划线形式，不带引号

</td></tr>
<tr><th>返回值</th>
<td>
node identifier for the node with that instance number and compatible

具有该别名的节点 id  

</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PARENT(node_id) </code>

<div style={{ paddingLeft: 16 }}>

获取父节点的 id 。

示例设备树片段：

```c
parent: parent-node {
        child: child-node {
                ...
        };
};
```

以下是获取相同节点 id 的等效方法：

```c
DT_NODELABEL(parent)
DT_PARENT(DT_NODELABEL(child))
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
节点父节点的节点 id 
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_CHILD(node_id, child) </code>

<div style={{ paddingLeft: 16 }}>

获取子节点的 id 。

示例设备树片段：

```c
/ {
        soc-label: soc {
                serial1: serial@40001000 {
                        status = "okay";
                        current-speed = <115200>;
                        ...
                };
        };
};
```

使用 [`DT_PROP()`](#dt_propnode_id-prop) 获取 serial@40001000 节点 `status` 属性的示例用法：

```c
#define SOC_NODE DT_NODELABEL(soc_label)
DT_PROP(DT_CHILD(SOC_NODE, serial_40001000), status) // "okay"
```

节点标签（例如 "serial1" ）不能用作这个宏的 "child" 参数。应使用 [`DT_NODELABEL()`](#dt_nodelabellabel) 先获取节点 id 。

你还可以使用 [`DT_FOREACH_CHILD()`](#dt_foreach_childnode_id-fn) 来遍历节点所有子节点的节点 id 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id  
- **child** – 子节点名，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
名称由 "child" 参数引用的节点 id 
</td></tr>
</table>
</div>

:::info 引用
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [Node identifiers and helpers](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-generic-id.html) 。
:::

### 访问属性 {#devicetree-property-access}

以下通用宏可用于访问节点属性。有用于访问 [ranges 属性](#devicetree-ranges-property)、 [reg 属性](#devicetree-reg-property) 和 [interrupts 属性](#devicetree-interrupts-property) 的专用 API 。

即使节点被禁用，只要它具有匹配的绑定，也可以使用这些宏读取属性值。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PROP(node_id, prop) </code>

<div style={{ paddingLeft: 16 }}>

获取一个设备树属性值。

对于绑定具有以下类型的属性，此宏展开为：

- string: 字符串文字
- boolean: `false` 对应 0， `true` 对应 1
- int: 属性值作为整型数值
- array, uint8-array, string-array: 展开为一个初始数组表示，其中元素为整型或字符串（例如 `{0, 1, 2}` 、 `{"hello", "world"}` 等等）
- phandle: 具有该 phandle 的节点 id

属性的类型通常由其绑定定义。在某些特殊情况下，即使没有可用的绑定，它也具有由设备树规范定义的假定类型： "compatible" 为字符串数组类型， "status" 和 "label" 为字符串类型， "interrupt-controller" 为布尔值类型。

对于不在上述属性的其他属性或具有未知类型的属性（由于找不到绑定），此宏的返回行为是未定义的。

使用示例可参考上文中的 [`DT_PATH()`](#dt_path) 、 [`DT_ALIAS`](#dt_aliasalias) 、 [`DT_NODELABEL()`](#dt_nodelabellabel) 和 [`DT_INST()`](#dt_instinst-compat) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** - 节点 id
- **prop** - 属性名，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
属性值
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PROP_LEN(node_id, prop) </code>

<div style={{ paddingLeft: 16 }}>

获取属性的逻辑长度。

这里的“长度”指的是元素的数量，可能与属性用字节表示的大小不同。

返回值取决于属性的类型：

- 对于 array 、 string-array 和 uint8-array 类型，将展开为数组中的元素数量
- 对于 phandles 类型，将展开为 phandles 的数量
- 对于 phandle-array 类型，将展开为属性中元素（由 phandle 和标识符块组成）的数量

但这些属性作为特殊情况处理：

- reg 属性: 应使用 [`DT_NUM_REGS(node_id)`](#dt_num_regsnode_id)
- interrupts 属性: 应使用 [`DT_NUM_IRQS(node_id)`](#dt_num_irqsnode_id)

不应该将此宏与 `range` 、 `dma-ranges` 、 `reg` 或 `interrupts` 属性一起使用。

对于上述未提及的其他属性，行为未定义。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** - 节点 id
- **prop** - 属性名，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
属性的长度
</td></tr>
</table>
</div>


##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_LABEL(node_id) </code>

<div style={{ paddingLeft: 16 }}>

等价于 [`DT_PROP(node_id, label)`](#dt_propnode_id-prop) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** - 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
属性值
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_ENUM_IDX(node_id, prop) </code>

<div style={{ paddingLeft: 16 }}>

在属性值中，获取枚举值中的索引。

返回值从零开始。

示例设备树片段：

```c
usb1: usb@12340000 {
        maximum-speed = "full-speed";
};
usb2: usb@12341000 {
        maximum-speed = "super-speed";
};
```

示例绑定片段：

```yaml
properties:
  maximum-speed:
    type: string
    enum:
       - "low-speed"
       - "full-speed"
       - "high-speed"
       - "super-speed"
```

用法示例：

```c
DT_ENUM_IDX(DT_NODELABEL(usb1), maximum_speed) // 1
DT_ENUM_IDX(DT_NODELABEL(usb2), maximum_speed) // 3
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** - 节点 id

- **prop** - 属性名，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
在属性值 enum: list 中的索引，从零开始
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PHA_BY_IDX(node_id, pha, idx, cell) </code>

<div style={{ paddingLeft: 16 }}>

获取 phandle-array 中，对应索引的说明符单元格值。

你可以将参数顺序理解为“node->phandle_array[index].cell”。也就是说，此宏返回的单元格值，指的是在“node_id”的“pha”属性中，索引为“idx”处的说明符内的单元格值。

示例设备树片段：

```c
gpio0: gpio@... {
        #gpio-cells = <2>;
};

gpio1: gpio@... {
        #gpio-cells = <2>;
};

led: led_0 {
        gpios = <&gpio0 17 0x1>, <&gpio1 5 0x3>;
};
```

示例绑定片段：

```c
gpio-cells:
  - pin
  - flags
```

在上例中，“gpios”有两个元素：

- 索引 0 有说明符 <17 0x1>，所以它的“pin”单元格是 17，它的“flags”单元格是 0x1
- 索引 1 具有说明符 <5 0x3>，因此“pin”为 5，“flags”为 0x3  

用法示例:

```c
#define LED DT_NODELABEL(led)

DT_PHA_BY_IDX(LED, gpios, 0, pin)   // 17
DT_PHA_BY_IDX(LED, gpios, 1, flags) // 0x3
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **pha** – "phandle-array" 属性，以小写与下划线形式表示
- **idx** – "pha" 参数中的逻辑索引
- **cell** – "pha" 中索引为 "idx" 为单元格名称，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
单元格的值
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PHA(node_id, pha, cell) </code>

<div style={{ paddingLeft: 16 }}>

等价于 [`DT_PHA_BY_IDX(node_id, pha, 0, cell)`](#dt_pha_by_idxnode_id-pha-idx-cell) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **pha** – "phandle-array" 属性，以小写与下划线形式表示
- **cell** – "pha" 中索引为 "idx" 为单元格名称，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
单元格的值
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PHANDLE_BY_NAME(node_id, pha, name) </code>

<div style={{ paddingLeft: 16 }}>

从 phandle 数组中，根据名称获取 phandle 的节点 id 。

你可以将参数顺序理解为“node->phandle_struct.name.phandle”。也就是说，phandle 数组被视为具有命名元素的结构。返回值是此结构内 phandle 的节点 id 。

示例设备树片段：

```c
adc1: adc@... {
        label = "ADC_1";
};

adc2: adc@... {
        label = "ADC_2";
};

n: node {
        io-channels = <&adc1 10>, <&adc2 20>;
        io-channel-names = "SENSOR", "BANDGAP";
};
```

上面，“io-channels”有两个元素：

- 名为“SENSOR”的元素对应 phandle `&adc1`
- 名为“BANDGAP”的元素对应 phandle `&adc2`

示例用法：

```c
#define NODE DT_NODELABEL(n)

DT_LABEL(DT_PHANDLE_BY_NAME(NODE, io_channels, sensor))  // "ADC_1"
DT_LABEL(DT_PHANDLE_BY_NAME(NODE, io_channels, bandgap)) // "ADC_2"
```

请注意在上例中，设备树属性和名称是如何转为小写与下划线表示的。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **pha** – "phandle-array" 属性，以小写与下划线形式表示
- **name** – "pha" 中的元素名称，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
节点的 phandle 中对应名称的节点 id
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PHANDLE_BY_IDX(node_id, prop, idx) </code>

<div style={{ paddingLeft: 16 }}>

从 phandle 数组中，根据索引获取 phandle 的节点 id 。

当对应逻辑索引的节点值包含 phandle 时，此宏返回具有该 phandle 的节点 id。

因此，如果“prop”的类型为“phandle”，则“idx”必须为零。 （“phandle”类型被视为固定长度为 1 的“phandles”）。

示例设备树片段：

```c
n1: node-1 {
        foo = <&n2 &n3>;
};

n2: node-2 { ... };
n3: node-3 { ... };
```

上面，“foo”有 phandles 类型并且有两个元素：

- 索引 0 有 phandle `&n2` ，这是 node-2 的 phandle
- 索引 1 有 phandle `&n3` ，这是 node-3 的 phandle

示例用法：

```c
#define N1 DT_NODELABEL(n1)

DT_PHANDLE_BY_IDX(N1, foo, 0) // node id for node-2
DT_PHANDLE_BY_IDX(N1, foo, 1) // node id for node-3
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **prop** – 在 "node_id" 中的 "phandle" 、 "phandles" 、 "phandle-array" 类型的属性名，以小写与下划线形式表示
- **idx** –  "prop" 参数中的索引

</td></tr>
<tr><th>返回值</th>
<td>
节点的 phandle 中对应索引的节点 id
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PHANDLE(node_id, prop) </code>

<div style={{ paddingLeft: 16 }}>

获取 phandle 属性值的节点 id 。

等价于调用 [`DT_PHANDLE_BY_IDX(node_id, prop, 0)`](#dt_phandle_by_idxnode_id-prop-idx) 。它的主要好处是，当“prop”具有“phandle”类型时，使用 `DT_PHANDLE` 可读性更佳。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **prop** – 在 "node_id" 中的 "phandle" 类型的属性名

</td></tr>
<tr><th>返回值</th>
<td>
节点 phandle 中对应的节点 id
</td></tr>
</table>
</div>

:::info 
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [Property access](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-generic-prop.html) 。
:::

### `ranges` 属性 {#devicetree-ranges-property}

要访问 `ranges` 属性，请使用此处的 API ，而不是上文的 [访问属性](#devicetree-property-access) 。因为这个属性的语义是由设备树规范定义的，所以这些宏也可以用于没有匹配绑定的节点。但是，当节点的绑定表明它是 PCIe 总线节点时，它们将采用特殊语义来访问，这些特殊语义在 [PCI Bus Binding to: IEEE Std 1275-1994 Standard for Boot (Initialization Configuration) Firmware](https://www.openfirmware.info/data/docs/bus.pci.pdf) 中定义。

:::info 
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [`ranges` property](https://docs.zephyrproject.org/latest/build/dts/api/api.html#ranges-property) 。
:::

### `reg` 属性 {#devicetree-reg-property}

要访问 `reg` 属性，请使用此处的 API ，而不是上文的 [访问属性](#devicetree-property-access) 。因为这个属性的语义是由设备树规范定义的，所以这些宏也可以用于没有匹配绑定的节点。但是，当节点的绑定表明它是 PCIe 总线节点时，它们将采用特殊语义来访问，这些特殊语义在 [PCI Bus Binding to: IEEE Std 1275-1994 Standard for Boot (Initialization Configuration) Firmware](https://www.openfirmware.info/data/docs/bus.pci.pdf) 中定义。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_NUM_REGS(node_id) </code>

<div style={{ paddingLeft: 16 }}>

在 reg 属性中获取寄存器块的数量。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
节点的“reg”属性中的寄存器块数。
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_REG_ADDR_BY_IDX(node_id, idx) </code>

<div style={{ paddingLeft: 16 }}>

获取索引“idx”处的寄存器块的起始地址。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **idx** - 要返回其地址的寄存器的索引

</td></tr>
<tr><th>返回值</th>
<td>
第 idx 个寄存器块的地址
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_REG_SIZE_BY_IDX(node_id, idx) </code>

<div style={{ paddingLeft: 16 }}>

获取索引“idx”处的寄存器块的大小。

此宏用于获取单个寄存器块的大小，而不是属性中寄存器块的总数；要获取总数的话应使用 [`DT_NUM_REGS()`](#dt_num_regsnode_id) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **idx** - 要返回其大小的寄存器的索引

</td></tr>
<tr><th>返回值</th>
<td>
第 idx 个寄存器块的大小
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_REG_ADDR(node_id) </code>

<div style={{ paddingLeft: 16 }}>

获取节点的（唯一的）寄存器块地址。

等效于 [`DT_REG_ADDR_BY_IDX(node_id, 0)`](#dt_reg_size_by_idxnode_id-idx) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
节点的寄存器块地址
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_REG_SIZE(node_id) </code>

<div style={{ paddingLeft: 16 }}>

获取节点的（唯一的）寄存器块大小。

等效于 [`DT_REG_SIZE_BY_IDX(node_id, 0)`](#dt_reg_size_by_idxnode_id-idx) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
节点唯一的寄存器块大小
</td></tr>
</table>
</div>

:::info 
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [`reg` property](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-reg-prop.html) 。
:::

### `interrupts` 属性 {#devicetree-interrupts-property}

要访问 `interrupts` 属性，请使用此处的 API ，而不是上文的 [访问属性](#devicetree-property-access) 。

因为这个属性的语义是由设备树规范定义的，所以这些宏也可以用于没有匹配绑定的节点。但这不适用于将单元名称作为参数的宏。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_NUM_IRQS(node_id) </code>

<div style={{ paddingLeft: 16 }}>

获取节点的中断源数量。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
节点的“interrupts”属性中的中断说明符的数量。
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_IRQ_BY_IDX(node_id, idx, cell) </code>

<div style={{ paddingLeft: 16 }}>

在索引处获取中断说明符内的值。

你可以将参数顺序理解为“node->interrupts[index].cell”。

当设备生成多个中断时，这可用于获取有关其中单个中断的信息。

示例设备树片段：

```c
my-serial: serial@... {
        interrupts = < 33 0 >, < 34 1 >;
};
```

假设节点的中断域以 `#interrupt-cells = <2>;` 声明单元格数量为 2，并且每个中断说明符中的各个单元命名为 `irq` 和 `priority` ，例如：

```c
#define SERIAL DT_NODELABEL(my_serial)

Example usage                       Value
-------------                       -----
DT_IRQ_BY_IDX(SERIAL, 0, irq)          33
DT_IRQ_BY_IDX(SERIAL, 0, priority)      0
DT_IRQ_BY_IDX(SERIAL, 1, irq,          34
DT_IRQ_BY_IDX(SERIAL, 1, priority)      1
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **idx** – 中断说明符数组的逻辑索引
- **cell** - 单元格名称说明符

</td></tr>
<tr><th>返回值</th>
<td>
给定索引的说明符的命名值
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_IRQ(node_id, cell) </code>

<div style={{ paddingLeft: 16 }}>

等价于 [`DT_IRQ_BY_IDX(node_id, 0, cell)`](#dt_irq_by_idxnode_id-idx-cell) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **cell** - 单元格名称说明符

</td></tr>
<tr><th>返回值</th>
<td>
给定索引的命名值
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_IRQN(node_id) </code>

<div style={{ paddingLeft: 16 }}>

获取节点（唯一）的 irq 编号。

等效于 [`DT_IRQ(node_id, irq)`](#dt_irqnode_id-cell) 。常见情况下，节点仅生成一个中断，并且 IRQ 编号位于名为“irq”的单元格中，此时使用 `DT_IRQN` 就很方便。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
节点唯一中断的中断号
</td></tr>
</table>
</div>

:::info 
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [`interrupts` property](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-interrupts-prop.html) 。
:::

### For-each 宏

当前只有一个“通用”的 for-each 宏，即 [`DT_FOREACH_CHILD`]#dt_foreach_childnode_id-fn) 。它用于遍历一个设备树节点的所有子节点。

for-each 宏有一些专用的宏，例如 [`DT_INST_FOREACH_STATUS_OKAY()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_INST_FOREACH_STATUS_OKAY) ，但使用这些宏之前要求先定义 `DT_DRV_COMPAT` 。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_FOREACH_CHILD(node_id, fn) </code>

<div style={{ paddingLeft: 16 }}>

为“node_id”的每个子节点调用“fn”。

宏“fn”声明必须带一个参数，即“node_id”子节点的节点 id 。

子节点将按照它们在最终设备树中出现的顺序进行遍历。

示例设备树片段：

```c
n: node {
        child-1 {
                label = "foo";
        };
        child-2 {
                label = "bar";
        };
};
```

示例用法：

```c
#define LABEL_AND_COMMA(node_id) DT_LABEL(node_id),

const char *child_labels[] = {
    DT_FOREACH_CHILD(DT_NODELABEL(n), LABEL_AND_COMMA)
};
```

这将展开为：

```c
const char *child_labels[] = {
    "foo", "bar",
};
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **fn** - 将遍历调用的函数宏

</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_FOREACH_CHILD_VARGS(node_id, fn, ...) </code>

<div style={{ paddingLeft: 16 }}>

为“node_id”的每个孩子调用“fn”，并使用多个参数。

宏“fn”接受多个参数。但第一个应该是子节点的 id 。其余的由调用者传入。

子节点将按照它们在最终设备树中出现的顺序进行遍历。

:::info 参见
[`DT_FOREACH_CHILD`](#dt_foreach_childnode_id-fn)
:::

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **fn** - 将遍历调用的函数宏
- **...** - 传递给 fn 的可变数量的参数

</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_FOREACH_CHILD_STATUS_OKAY(node_id, fn) </code>

<div style={{ paddingLeft: 16 }}>

对 status 为 "okay" 的每个子节点上调用 "fn" 。

宏 "fn" 应该有一个参数，即子节点的节点 id 。

像往常一样，未声明 status 和 status 为 "ok" 状态都被视为 "okay"。

子节点将按照它们在最终设备树中出现的顺序进行遍历。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **fn** - 将遍历调用的函数宏

</td></tr>
</table>
</div>

:::info 
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [for-each macros](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-generic-foreach.html) 。
:::

### 检查是否存在

本节所记录的宏，主要用于检测节点是否存在、某种类型的节点存在多少、节点是否具有某些属性等等。一些用于特殊目的的宏（例如 [`DT_IRQ_HAS_IDX()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_IRQ_HAS_IDX) 和所有需要 `DT_DRV_COMPAT` 的宏）在此文档的其他地方记录。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_NODE_EXISTS(node_id) </code>

<div style={{ paddingLeft: 16 }}>

测试节点 id 是否引用存在的节点，即在设备树中定义的节点。

这一宏并不关心，节点是否具有匹配的绑定，或者节点的 status 值是什么。它纯粹检查节点是否存在。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
如果节点 id 的确引用节点，则为 1，否则为 0。
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_HAS_COMPAT_STATUS_OKAY(compat) </code>

<div style={{ paddingLeft: 16 }}>

测试设备树是否有任何状态为 "okay" 并且满足给定 compatible 的节点。也就是说，当且仅当至少有一个 "node_id" 对于这两个判断都返回 1 时，才会返回 1：

```c
DT_NODE_HAS_STATUS(node_id, okay)
DT_NODE_HAS_COMPAT(node_id, compat)
```

<table>
<tr><th width="12%">参数</th>
<td>

- **compat** – compatible 值，以小写和下划线表示，不带引号

</td></tr>
<tr><th>返回值</th>
<td>
满足以上两个条件为1，否则为0
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_NODE_HAS_COMPAT(node_id, compat) </code>

<div style={{ paddingLeft: 16 }}>

设备树节点是否匹配 compatible ？

示例设备树片段：

```c
n: node {
        compatible = "vnd,specific-device", "generic-device";
}
```

结果为 1 的示例用法：

```c
DT_NODE_HAS_COMPAT(DT_NODELABEL(n), vnd_specific_device)
DT_NODE_HAS_COMPAT(DT_NODELABEL(n), generic_device)
```

此宏仅使用 compatible 属性的值。宏不关心这个 compatible 是否具有匹配绑定，也不关心节点的 status 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **compat** – compatible 值，以小写和下划线表示，不带引号

</td></tr>
<tr><th>返回值</th>
<td>
如果节点的 compatible 属性包含 compat，则为 1，否则为 0。
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_NODE_HAS_PROP(node_id, prop) </code>

<div style={{ paddingLeft: 16 }}>

测试 node_id 对应的设备树节点是否定义了 prop 属性。

这只用于测试属性是否已定义，而不能用于验证 boolean 属性是 true 还是 false 。要获取 boolean 属性的值，请改用 [`DT_PROP(node_id, prop)`](#dt_propnode_id-prop) 。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **prop** - 属性名，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
如果节点具有属性，则为 1，否则为 0。
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_PHA_HAS_CELL_AT_IDX(node_id, pha, idx, cell) </code>

<div style={{ paddingLeft: 16 }}>

是否 phandle 数组在索引处有一个命名的单元格说明符？

如果返回 1，则代表 phandle-array 属性 "pha" 在索引 "idx" 处有一个名为 "cell" 的单元格，因此于 [`DT_PHA_BY_IDX(node_id, pha, idx, cell)`](#dt_pha_by_idxnode_id-pha-idx-cell) 是等效的。如果它返回 0，则使用相同的参数调用 [`DT_PHA_BY_IDX()`](#dt_pha_by_idxnode_id-pha-idx-cell) 也会报错的。

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **pha** – "phandle-array" 类型的属性，以小写与下划线形式表示
- **idx** – "pha" 中要检查的索引值
- **cell** – 要在索引 "idx" 处检查其是否存在的单元名称，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
如果命名单元格存在于索引 idx 处的说明符中，则为 1，否则为 0。
</td></tr>
</table>
</div>

:::info 
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [Existence checks](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-generic-exist.html) 。
:::

### 节点间依赖 {#devicetree-dep-ord}

`devicetree.h` API 支持跟踪节点之间的依赖关系。要完成跟踪依赖，需要基于设备树节点之间的二元“依赖”关系，我们将这层依赖关系定义为 [传递闭包](https://baike.baidu.com/item/%E4%BC%A0%E9%80%92%E9%97%AD%E5%8C%85) ，它基于以下“直接依赖”关系：

- 每个非根节点都直接依赖于它的父节点
- 如果一个节点存在 phandle 引用任何其他节点，那么它将直接依赖于这些引用的节点
- 如果节点有 `interrupts` 属性，那么它直接依赖于它的 `interrupt-parent` 

设备树的 ***依赖顺序*** 是一个由其节点组成的列表，其中每个节点 `n` 在列表中出现的时间，比任何依赖 `n` 的节点都早。一个节点的 ***依赖序号*** 就是它在该列表中的索引（从零开始）。因此，对于两个不同的设备树节点 `n1` 和 `n2` ，假设他们的序号分别为 `d1` 和 `d2` ，我们有：

- `d1 != d2`
- 若 `n1` 依赖 `n2` ，那么 `d1 > d2` 
- `d1 > d2` 并 **不** 意味着 `n1` 依赖于 `n2`

Zephyr 构建系统选择最终设备树的依赖顺序，并为每个节点分配依赖序号。可以使用以下宏访问依赖关系相关信息。依赖顺序的确切选择过程属于实现细节，此处不会展开介绍；但值得一提的是，如果检测到循环依赖（即 `a` 依赖 `b` ，而 `b` 也依赖 `a` ），会在构建时报错，因此可以安全地假设在使用这些宏时不存在循环依赖。

还有基于实例编号的便捷用法；请参阅 [`DT_INST_DEP_ORD()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_INST_DEP_ORD) 和后续文档。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [Inter-node dependencies](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-dep-ord.html) 。
:::

### 总线帮助类

Zephyr 的设备树绑定语法支持配置 `bus:` 字段，符合给定 compatible 的节点使用此字段描述系统总线。在这种情况下，子节点被认为在给定类型的总线上，并且可以使用以下 API。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_BUS(node_id) </code>

<div style={{ paddingLeft: 16 }}>

节点的总线控制器。

获取节点的总线控制器的节点 id 。可用于与 [`DT_PROP()`](#dt_propnode_id-prop) 一起使用来获取总线控制器的属性。

当它用于没有总线控制器的节点时，会引发报错。

示例设备树片段：

```c
i2c@deadbeef {
        label = "I2C_CTLR";
        status = "okay";
        clock-frequency = < 100000 >;

        i2c_device: accelerometer@12 {
                ...
        };
};
```

示例用法：

```c
DT_PROP(DT_BUS(DT_NODELABEL(i2c_device)), clock_frequency) // 100000
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id

</td></tr>
<tr><th>返回值</th>
<td>
节点总线控制器的节点 id
</td></tr>
</table>
</div>

:::info
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [Bus helpers](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-generic-bus.html) 。
:::

基于实例的 API {#devicetree-inst-apis}
-------------------

建议在编写设备驱动程序时使用这些 API 。要使用它们，需要将 `DT_DRV_COMPAT` 定义为设备驱动程序所要实现支持的 compatible（注意，要求是小写和下划线）。假设这样一个设备树片段：

```c
serial@40001000 {
        compatible = "vnd,serial";
        status = "okay";
        current-speed = <115200>;
};
```

假设 `<serial@40001000>` 是唯一启用 compatible 为 \"vnd,serial\" 的节点，可以这样使用：

```c
#define DT_DRV_COMPAT vnd_serial
DT_DRV_INST(0)                  // node identifier for serial@40001000
DT_INST_PROP(0, current_speed)  // 115200
```

:::caution 警告
在对实例编号做出假设需要小心。请参阅 [`DT_INST()`](#dt_instinst-compat) 了解 API 只保证哪些假设是可行的。
:::

如上所示，`DT_INST_*` API 便于按实例编号对节点寻址。它们几乎都是基于 [通用 API](#devicetree-generic-apis) 定义的。如果想找到等效的通用 API ，可以通过对这些宏名称删除 `INST_` 来查找。例如， `DT_INST_PROP(inst, prop)` 等价于 `DT_PROP(DT_DRV_INST(inst), prop)` 。同样，`DT_INST_REG_ADDR(inst)` 等价于 `DT_REG_ADDR(DT_DRV_INST(inst))` ，依此类推。有一些例外：[`DT_ANY_INST_ON_BUS_STATUS_OKAY()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_ANY_INST_ON_BUS_STATUS_OKAY) 和 [`DT_INST_FOREACH_STATUS_OKAY()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_INST_FOREACH_STATUS_OKAY) 是特殊用途的帮助类宏，不存在与他们直接等价的通用 API 。

由于 `DT_DRV_INST()` 需要定义 `DT_DRV_COMPAT` ，因此在未定义宏的情况下使用其中任何一个 API 都将导致报错。

请注意，也有可用于特定硬件的帮助类；这些都记录在 [特定于硬件特定的 API](#devicetree-hw-api) 中。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_DRV_INST(inst) </code>

<div style={{ paddingLeft: 16 }}>

compatible 为 DT_DRV_COMPAT 的实例的节点 id。

<table>
<tr><th width="12%">参数</th>
<td>

- **inst** – 实例编号

</td></tr>
<tr><th>返回值</th>
<td>
compatible 为 DT_DRV_COMPAT 且实例编号为 "inst" 的节点的节点 id
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_INST_PROP(inst, prop) </code>

<div style={{ paddingLeft: 16 }}>

获取 DT_DRV_COMPAT 实例的属性。

<table>
<tr><th width="12%">参数</th>
<td>

- **inst** – 实例编号
- **prop** - 属性名，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
对应的属性值

</td></tr>
</table>
</div>

:::info
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [Instance-based APIs](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-inst.html) 。
:::

特定于硬件的 API {#devicetree-hw-api}
----------------------

只需 include `<devicetree.h>` 即可使用以下 API 。

### CAN {#devicetree-can-api}

这些便捷 API 可用于描述 CAN 控制器/收发器以及与它们相关的属性的节点。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [CAN](https://docs.zephyrproject.org/latest/build/dts/api/api.html#can) 。
:::

### Clocks

这些便捷 API 可用于描述时钟源以及与其相关的属性的节点。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [Clocks](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-clocks.html) 。
:::

### DMA

这些便捷 API 用于这样的节点 —— 描述 *直接内存访问 (direct memory
access)* 控制器或通道，与它们的相关属性。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [DMA](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-dmas.html) 。
:::

### 固定 flash 分区 {#devicetree-flash-api}

这些便捷 API 用于专用 `fixed-partitions` 兼容，用于对有关设备树中 flash 分区的信息进行编码。更详细的信息请参阅 [`fixed-partitions`](https://zephyr-docs.listenai.com/reference/devicetree/bindings/mtd/partition.html#fixed-partitions)。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [Fixed flash partitions](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-fixed-partition.html) 。
:::

### GPIO {#devicetree-gpio-api}

这些便捷 API 用于描述 GPIO 控制器/引脚以及与它们相关的属性的节点。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_GPIO_CTLR_BY_IDX(node_id, gpio_pha, idx) </code>

<div style={{ paddingLeft: 16 }}>

从 gpio 的 phandle-array 属性的索引处获取控制器 phandle 对应的节点 id 。

示例设备树片段：

```c
gpio1: gpio@... { };

gpio2: gpio@... { };

n: node {
        gpios = <&gpio1 10 GPIO_ACTIVE_LOW>,
                <&gpio2 30 GPIO_ACTIVE_HIGH>;
};
```

示例用法：

```c
DT_GPIO_CTLR_BY_IDX(DT_NODELABEL(n), gpios, 1) // DT_NODELABEL(gpio2)
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **gpio_pha** – "phandle-array" 类型的属性，以小写与下划线形式表示
- **idx** – "gpio_pha" 中的逻辑索引

</td></tr>
<tr><th>返回值</th>
<td>
gpio 控制器中，索引为 "idx" 的节点标识符
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_GPIO_CTLR(node_id, gpio_pha) </code>

<div style={{ paddingLeft: 16 }}>

等价于 [`DT_GPIO_CTLR_BY_IDX(node_id, gpio_pha, 0)`](#dt_gpio_ctlr_by_idxnode_id-gpio_pha-idx)

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **gpio_pha** – "phandle-array" 类型的属性，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
gpio 控制器中，索引为 0 的节点标识符
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_GPIO_FLAGS_BY_IDX(node_id, gpio_pha, idx) </code>

<div style={{ paddingLeft: 16 }}>

获取在索引处的 GPIO 说明符的 flag 单元。

该宏需要带有名为“flags”的单元格的 GPIO 说明符。如果 GPIO 说明符中没有“flags”单元，则返回零。如有必要，请参阅节点的绑定以检查说明符单元名称。

示例设备树片段：

```c
gpio1: gpio@... {
        compatible = "vnd,gpio";
        #gpio-cells = <2>;
};

gpio2: gpio@... {
        compatible = "vnd,gpio";
        #gpio-cells = <2>;
};

n: node {
        gpios = <&gpio1 10 GPIO_ACTIVE_LOW>,
                <&gpio2 30 GPIO_ACTIVE_HIGH>;
};
```

在 compatible 为 vnd,gpio 的绑定中：

```yaml
gpio-cells:
  - pin
  - flags
```

示例用法：

```c
DT_GPIO_FLAGS_BY_IDX(DT_NODELABEL(n), gpios, 0) // GPIO_ACTIVE_LOW
DT_GPIO_FLAGS_BY_IDX(DT_NODELABEL(n), gpios, 1) // GPIO_ACTIVE_HIGH
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **gpio_pha** – "phandle-array" 类型的属性，以小写与下划线形式表示
- **idx** – "gpio_pha" 中的逻辑索引

</td></tr>
<tr><th>返回值</th>
<td>
索引 "idx" 处的标志单元格值，如果没有则为 0
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_GPIO_FLAGS(node_id, gpio_pha) </code>

<div style={{ paddingLeft: 16 }}>

等价于 [`DT_GPIO_FLAGS_BY_IDX(node_id, gpio_pha, 0)`](#dt_gpio_flags_by_idxnode_id-gpio_pha-idx)

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **gpio_pha** – "phandle-array" 类型的属性，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
索引 0 处的标志单元格值，如果没有则为 0
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_GPIO_PIN_BY_IDX(node_id, gpio_pha, idx) </code>

<div style={{ paddingLeft: 16 }}>

获取在索引处 GPIO 说明符的 pin 单元。

此宏仅适用于 GPIO 说明符具有名为 "pin" 的单元格的情况。如有必要，请参阅节点的绑定检查命名是否正确。

示例设备树片段：

```c
gpio1: gpio@... {
        compatible = "vnd,gpio";
        #gpio-cells = <2>;
};

gpio2: gpio@... {
        compatible = "vnd,gpio";
        #gpio-cells = <2>;
};

n: node {
        gpios = <&gpio1 10 GPIO_ACTIVE_LOW>,
                <&gpio2 30 GPIO_ACTIVE_HIGH>;
};
```

在 compatible 为 vnd,gpio 的绑定中：

```yaml
gpio-cells:
  - pin
  - flags
```

示例用法：

```c
DT_GPIO_PIN_BY_IDX(DT_NODELABEL(n), gpios, 0) // 10
DT_GPIO_PIN_BY_IDX(DT_NODELABEL(n), gpios, 1) // 30
```

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **gpio_pha** – "phandle-array" 类型的属性，以小写与下划线形式表示
- **idx** – "gpio_pha" 中的逻辑索引

</td></tr>
<tr><th>返回值</th>
<td>
索引 "idx" 处的 pin 单元格值
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_GPIO_PIN(node_id, gpio_pha) </code>

<div style={{ paddingLeft: 16 }}>

等价于 [`DT_GPIO_PIN_BY_IDX(node_id, gpio_pha, 0)`](#dt_gpio_pin_by_idxnode_id-gpio_pha-idx)

<table>
<tr><th width="12%">参数</th>
<td>

- **node_id** – 节点 id
- **gpio_pha** – "phandle-array" 类型的属性，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
索引 0 处的 pin 单元格值
</td></tr>
</table>
</div>

:::info
这里只列举了部分常用 API ，对于完整 API 的解释，请参考 Zephyr 官方文档中的 [GPIO](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-gpio.html) 。
:::

### IO 通道

这些 API 通常由需要使用 IO 通道（例如 ADC 或 DAC 通道）进行转换的设备驱动程序使用。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [IO channels](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-io-channels.html) 。
:::


### MBOX {#devicetree-mbox-api}

这些便捷 API 可用于描述 MBOX 控制器/用户的节点，以及与它们相关的属性。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [MBOX](https://docs.zephyrproject.org/latest/build/dts/api/api.html#mbox) 。
:::

### Pinctrl (引脚控制) {#devicetree-pinctrl-api}

这些 API 用于按名称或索引访问引脚控制属性。

设备树节点可能具有指定引脚控制（有时称为 pin mux 引脚复用）设置的属性。这些使用节点内的 `pinctrl-<index>` 属性表示，其中 `<index>` 值是从 0 开始的连续整数。这些也可以使用 `pinctrl-names` 属性命名。

例如：

``` {.DTS}
node {
    ...
    pinctrl-0 = <&foo &bar ...>;
    pinctrl-1 = <&baz ...>;
    pinctrl-names = "default", "sleep";
};
```

上面，`pinctrl-0` 的名称为 `"default"` ，而 `pinctrl-1` 的名称为 `"sleep"` 。 `pinctrl-<index>` 属性值包含 phandles 。其中的 `&foo` 、`&bar` 等 phandles 属性指向内容因平台而异的节点，`node` 节点通过这些声明描述了引脚配置。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [Pinctrl (pin control)](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-pinctrl.html) 。
:::

### PWM

这些便捷 API 可用于描述 PWM 控制器及其相关属性的节点。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [PWM](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-pwms.html) 。
:::

### 复位控制器

这些便捷 API 可用于描述复位控制器和与其相关的属性的节点。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [Reset Controller](https://docs.zephyrproject.org/latest/build/dts/api/api.html#reset-controller) 。
:::

### SPI

这些便捷 API 可用于描述 SPI 控制器或设备（根据具体情况）的节点。

:::info
具体到每个 API 的解释，请参考 Zephyr 官方文档中的 [SPI](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-spi.html) 。
:::

选定节点 {#devicetree-chosen-nodes}
------------

选定节点，即 `/chosen` 节点，它包含的属性值用于描述系统范围的设置。 [`DT_CHOSEN()`](#dt_chosenprop) 宏可用于获取所选节点 id 。

<b style={{ color: 'var(--ifm-link-color)' }}>Defines</b>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_CHOSEN(prop) </code>

<div style={{ paddingLeft: 16 }}>

获取 /chosen 节点属性的节点 id 。

调用这个宏仅在 [`DT_HAS_CHOSEN(prop)`](#dt_has_chosenprop) 为 1 时有效。

<table>
<tr><th width="12%">参数</th>
<td>

- **prop** - /chosen 节点的属性名称，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
所选节点属性的节点 id
</td></tr>
</table>
</div>

##### <code style={{ background: 'var(--ifm-color-info-lightest)', color: 'var(--ifm-link-color)', fontFamily: 'var(--ifm-font-family-monospace)', padding: 8 }}> DT_HAS_CHOSEN(prop) </code>

<div style={{ paddingLeft: 16 }}>

测试设备树是否有 /chosen 节点。
<table>
<tr><th width="12%">参数</th>
<td>

- **prop** - 设备树属性名称，以小写与下划线形式表示

</td></tr>
<tr><th>返回值</th>
<td>
如果所选属性存在并引用一个节点，则为 1，否则为 0
</td></tr>
</table>
</div>

也有一些便捷 API 用于访问 `/chosen` 节点的常用 zephyr 特定属性。

:::info
请参考 Zephyr 官方文档中的 [Chosen nodes](https://zephyr-docs.listenai.com/doxygen/html/group__devicetree-generic-chosen.html)  的 `group devicetree-zephyr` 。
:::

Zephyr 特定的选定节点
----------------------------

下表记录了一些常用的 Zephyr 特定的选定节点。

有时，一个选定节点的标签 (label) 属性将设为某个 Kconfig 选项的默认值，该选项反过来配置特定于硬件的设备。这通常是为了向后兼容，因为 Kconfig 选项的支持可能早于 Zephyr 中的设备树。在其他情况下，对于没有 Kconfig 选项的场景，源码中直接使用设备树节点来选择设备。

| Property 属性 | Purpose 目的 |
| --- | --- |
| zephyr,bt-c2h-uart | 选择用于 [蓝牙: HCI UART](https://docs.zephyrproject.org/latest/samples/bluetooth/hci_uart/README.html#bluetooth-hci-uart-sample) 中的主机通信的 UART |
| zephyr,bt-mon-uart | 设置用于蓝牙监视器日志记录 (Bluetooth monitor logging) 的 UART 设备 |
| zephyr,bt-uart | 设置蓝牙使用的 UART 设备 |
| zephyr,canbus | 设置默认 CAN 控制器 |
| zephyr,ccm | 内核耦合内存 (Core-Coupled Memory) 节点，通常在某些 STM32 SoC 上 |
| zephyr,code-partition | Zephyr 镜像中的文本区域应链接到的 Flash 分区 |
| zephyr,console | 设置 console 驱动程序使用的 UART 设备 |
| zephyr,display | 设置默认的显示控制器 |
| zephyr,dtcm | 数据紧密耦合内存 (Data Tightly Coupled Memory) 节点，通常在某些 Arm SoC 上 |
| zephyr,entropy | 可用作系统范围 *熵* 源的设备 |
| zephyr,flash | 一个节点，其 `reg` 有时用于设置 [`CONFIG_FLASH_BASE_ADDRESS`](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_FLASH_BASE_ADDRESS) 和 [`CONFIG_FLASH_SIZE`](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_FLASH_SIZE) 的默认值 |
| zephyr,flash-controller | `zephyr,flash` 节点的 flash 控制器设备对应的节点 |
| zephyr,ipc | 由 OpenAMP 子系统用于指定进程间通信 (IPC) 设备 |
| zephyr,ipc\_shm | 一个由 OpenAMP 子系统使用的节点，其 `reg` 用于确定可用于进程间通信 (IPC) 的共享内存 (SHM) 的起始地址和大小 |
| zephyr,itcm | 指令紧耦合内存 (Instruction Tightly Coupled Memory) 节点，通常在某些 Arm SoC 上 |
| zephyr,ocm | Xilinx Zynq-7000 和 ZynqMP SoC 上的板载内存节点 |
| zephyr,osdp-uart | 设置 OSDP 子系统使用的 UART 设备 |
| zephyr,ot-uart | 由 OpenThread 用于为 Spinel 协议指定 UART 设备 |
| zephyr,pcie-controller | PCIe 控制器对应的节点 |
| zephyr,ppp-uart | 设置 PPP 使用的 UART 设备 |
| zephyr,settings-partition | 固定分区节点。如果已定义，则此分区将提供 NVS 和 FCB 设置后端使用。 |
| zephyr,shell-uart | 设置串行 shell 后端使用的 UART 设备 |
| zephyr,sram | 一个节点，其 `reg` 设置 Zephyr 镜像可用的 SRAM 内存的起始地址和大小，在链接期间生效 |
| zephyr,tracing-uart | 设置跟踪 (tracing) 子系统使用的 UART 设备 |
| zephyr,uart-mcumgr | [设备管理](https://docs.zephyrproject.org/latest/services/device_mgmt/index.html#device-mgmt) 所用的 UART |
| zephyr,uart-pipe | 设置串行管道驱动程序使用的 UART 设备 |
| zephyr,usb-device | USB 设备节点。如果已定义且具有 `vbus-gpios` 属性，USB 子系统将使用它们来启用/禁用 VBUS |
