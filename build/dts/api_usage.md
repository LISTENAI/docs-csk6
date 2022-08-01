# 在 C/C++ 中访问设备树

本文描述了 Zephyr 的 `<devicetree.h>` API，用于在 C 源码中读取设备树。我们假设你已熟悉 [设备树概述](./intro.md) 和 [设备树绑定](./bindings.md) 中的概念。对具体接口的描述可参阅 [API 引用](./api/index.md) 。

## 给 Linux 开发者的小贴士

对熟悉设备树的 Linux 开发者而言，应该引起注意，此处描述的 API 与在 Linux 上使用设备树的方式有很大不同。

在 Zephyr 中，设备树所有数据包含在一个生成的 C 头文件，并以宏 API 进行抽象。但 Linux 内核中是以二进制形式读取设备树数据结构的。二进制表示在运行时被解析，例如加载和初始化设备驱动程序。

Zephyr 不能以这种方式工作，因为设备树二进制文件和相关处理代码的占用空间太大，并不适用于安装在 Zephyr 支持的、性能相对受限的设备上。

## 节点 id

*节点 id* 用于获取特定设备树节点的相关信息。它只是一个用于引用节点的 C 宏。（下文中有时出现的 `node_id` 也指代节点 id ）

以下是获取节点 id 的主要方法：

<h4 style={{
 "background": "var(--ra-color-important)",
 "color": "var(--ra-color-note)",
  padding: 4 }}>通过路径</h4>

<div style={{ paddingLeft: 16 }}>

调用 [`DT_PATH()`](./api/api.md#dt_path) 所需参数为，设备树中节点的完整路径，它需要从根节点开始。此方式旨在明确节点确切位置时发挥作用。

</div>

<h4 style={{
 "background": "var(--ra-color-important)",
 "color": "var(--ra-color-note)",
  padding: 4 }}>通过节点标签</h4>

<div style={{ paddingLeft: 16 }}>

使用 [节点标签](./intro.md#node-label) 通过 [`DT_NODELABEL()`](./api/api.md#dt_nodelabellabel) 获取节点 id 。节点标签通常在 SoC `.dtsi` 中提供，节点标签通常是与 SoC datasheet 匹配的节点名称，如 `i2c1` 、 `spi2` 等。

</div>

<h4 style={{
 "background": "var(--ra-color-important)",
 "color": "var(--ra-color-note)",
  padding: 4 }}>通过别名</h4>

<div style={{ paddingLeft: 16 }}>

使用 [`DT_ALIAS()`](./api/api.md#dt_aliasalias) 获取由特殊 `/aliases` 节点属性表示的节点 id 。这有时是由应用程序（如在 [GPIO 示例](../../application/peripheral/samples/gpio.md) 中即使用 `led0` 别名）完成的；这些程序中，需要引用特定类型的某些设备，但不关心使用哪个设备（例如，某个应用程序希望运行起来后可亮起某个 LED 用作提示，但用户可自行配置最终指定哪一个 LED 而程序本身不关心）。

</div>

<h4 style={{
 "background": "var(--ra-color-important)",
 "color": "var(--ra-color-note)",
  padding: 4 }}>通过实例编号</h4>

<div style={{ paddingLeft: 16 }}>

这主要由设备驱动程序完成，因为实例编号是一种基于匹配兼容来引用单个节点的方法。这些编号通过 [`DT_INST()`](./api/api.md#dt_instinst-compat) 获取，但这一做法需要小心处理（下文将提到为何需要）。

</div>

<h4 style={{
 "background": "var(--ra-color-important)",
 "color": "var(--ra-color-note)",
  padding: 4 }}>通过选中的节点</h4>

<div style={{ paddingLeft: 16 }}>

使用 [`DT_CHOSEN()`](./api/api.md#dt_chosenprop) 获取 `/chosen` 节点属性所表示的节点 id 。

</div>

<h4 style={{
 "background": "var(--ra-color-important)",
 "color": "var(--ra-color-note)",
  padding: 4 }}>通过父子关系</h4>

<div style={{ paddingLeft: 16 }}>

从已有的节点 id 开始获取父节点或子节点的节点 id ，通过使用 [`DT_PARENT()`](./api/api.md#dt_parentnode_id) 和 [`DT_CHILD()`](./api/api.md#dt_childnode_id-child) 实现。

</div>

引用同一节点的两个节点 id 是等价的，可以互换使用。

<a id="dts-example"/>

这是一个假想硬件的 DTS 片段，我们将在全文始末都以此作为示例：

```c
/dts-v1/;

/ {

	aliases {
		sensor-controller = &i2c1;
	};

	soc {
		i2c1: i2c@40002000 {
			compatible = "vnd,soc-i2c";
			label = "I2C_1";
			reg = <0x40002000 0x1000>;
			status = "okay";
			clock-frequency = < 100000 >;
		};
	};
};
```

以下是获取 `i2c@40002000` 节点的 id 的几种方法：

- `DT_PATH(soc, i2c_40002000)`
- `DT_NODELABEL(i2c1)`
- `DT_ALIAS(sensor_controller)`
- `DT_INST(x, vnd_soc_i2c)` 用于某个未知数 `x` 。请参阅 [`DT_INST()`](./api/api.md#dt_instinst-compat) 文档了解相关详细信息。

:::tip 重要
设备树名称中，非字母数字字符（例如破折号 ( `-` ) 和 at 符号 ( `@` ) 等）将转换为下划线 ( `_` )。 DTS 中的名称也会转换为小写。
:::

## 节点 id 并不是值

一个节点 id 无法存储在变量中。这种写法是不可行的：

```c
/* 这样写会引发编译器报错: */

void *i2c_0 = DT_INST(0, vnd_soc_i2c);
unsigned int i2c_1 = DT_INST(1, vnd_soc_i2c);
long my_i2c = DT_NODELABEL(i2c1);
```

如果你想要一些简短的封装来节省代码量，请使用 C 宏：

```c
/* 类似下列用法: */

#define MY_I2C DT_NODELABEL(i2c1)

#define INST(i) DT_INST(i, vnd_soc_i2c)
#define I2C_0 INST(0)
#define I2C_1 INST(1)
```

## 访问属性

读取属性值的正确 API ，属性值取决于节点和属性。

- [检查属性与对应值](#检查属性与对应值)
- [简单属性](#简单属性)
- [reg 属性](#reg-属性)
- [interrupts 属性](#interrupts-属性)
- [phandle 属性](#phandle-属性)

### 检查属性与对应值

你可以使用 [`DT_NODE_HAS_PROP()`](./api/api.md#dt_node_has_propnode_id-prop) 来检查节点是否具有某属性。对于上文提及的 [示例设备树](#dts-example) ：

```c
DT_NODE_HAS_PROP(DT_NODELABEL(i2c1), clock_frequency)  /* expands to 1 */
DT_NODE_HAS_PROP(DT_NODELABEL(i2c1), not_a_property)   /* expands to 0 */
```

### 简单属性

使用 `DT_PROP(node_id, property)` 读取基本类型属性，如整型（ integer ）、布尔型（ boolean ）、字符串（ string ）、数值数组和字符串数组。

例如，对 [上例](#dts-example) 的设备树读取 `clock-frequency` 属性值：

```c
DT_PROP(DT_PATH(soc, i2c_40002000), clock_frequency)  /* This is 100000, */
DT_PROP(DT_NODELABEL(i2c1), clock_frequency)          /* and so is this, */
DT_PROP(DT_ALIAS(sensor_controller), clock_frequency) /* and this. */
```

:::tip 重要
DTS 属性 `clock-frequency` 在 C 中转换为 `clock_frequency` 。这是因为，属性名也将特殊字符转换为下划线，并强制转换为小写。
:::

`string` 和 `boolean` 的属性的处理方式完全相同。在属性为字符串的情况下， `DT_PROP()` 宏扩展为字符串文字；在布尔值的情况下，扩展为数字 0 或 1。例如：

```c
#define I2C1 DT_NODELABEL(i2c1)

DT_PROP(I2C1, status)  /* expands to the string literal "okay" */
```

:::info 注意
 `DT_NODE_HAS_PROP()` 不应用在 `boolean` 属性上，而应像上例一样使用 `DT_PROP()` 。 `DT_PROP()` 会根据属性是否存在，它将展开为 0 或 1。
:::

`array` 、 `uint8-array` 和 `string-array` 的属性的处理方式类似 —— 对于数组属性， `DT_PROP()` 将其展开为一个数组初始值。例如在此设备树片段中：

```c
foo: foo@1234 {
        a = <1000 2000 3000>; /* array */
        b = [aa bb cc dd];    /* uint8-array */
        c = "bar", "baz";     /* string-array */
};
```

可以像这样访问它的属性：

```c
#define FOO DT_NODELABEL(foo)

int a[] = DT_PROP(FOO, a);           /* {1000, 2000, 3000} */
unsigned char b[] = DT_PROP(FOO, b); /* {0xaa, 0xbb, 0xcc, 0xdd} */
char* c[] = DT_PROP(FOO, c);         /* {"foo", "bar"} */
```

你可以使用 [`DT_PROP_LEN()`](./api/api.md#dt_prop_lennode_id-prop) 来获取这些数组属性的长度。

```c
size_t a_len = DT_PROP_LEN(FOO, a); /* 3 */
size_t b_len = DT_PROP_LEN(FOO, b); /* 4 */
size_t c_len = DT_PROP_LEN(FOO, c); /* 2 */
```

`DT_PROP_LEN()` 不能用于特殊的 `reg` 或 `interrupts` 属性。对于这些情况有另外的宏作为替代，下文中将对其进行描述。

### reg 属性

在 [重要属性](./intro.md#重要属性) 中已对 `reg` 进行过相关介绍。

给定节点 id `node_id` ，则 `DT_NUM_REGS(node_id)` 表示节点 `reg` 属性中的寄存器块总数。

你 **无法** 通过 `DT_PROP(node, reg)` 读取寄存器块的地址和大小。

- `DT_REG_ADDR(node_id)`: 给定节点的寄存器块的地址
- `DT_REG_SIZE(node_id)`: 给定的寄存器块的大小

如果节点有多个寄存器块，则改用 [`DT_REG_ADDR_BY_IDX()`](./api/api.md#dt_reg_addr_by_idxnode_id-idx) 或 [`DT_REG_SIZE_BY_IDX()`](./api/api.md#dt_reg_size_by_idxnode_id-idx) ：

- `DT_REG_ADDR_BY_IDX(node_id, idx)`: 索引 `idx` 对应寄存器块的地址
- `DT_REG_SIZE_BY_IDX(node_id, idx)`: 索引 `idx` 对应寄存器块的大小

这里的 `idx` 参数必须是整型数字或可扩展为一个无需任何算术的宏。尤其要注意， `idx` 不能是变量。像这样的例子就不起作用：

```c
/* 这样写会导致编译器报错 */

for (size_t i = 0; i < DT_NUM_REGS(node_id); i++) {
        size_t addr = DT_REG_ADDR_BY_IDX(node_id, i);
}
```

### interrupts 属性

在 [重要属性](./intro.md#重要属性) 中已对 `interrupts` 进行过相关介绍。

给定节点 id  `node_id` ， `DT_NUM_IRQS(node_id)` 表示节点 `interrupts` 属性中的中断说明符的总数。

在访问这些变量的场景中，最通用 API 宏是 [`DT_IRQ_BY_IDX()`](./api/api.md#dt_irq_by_idxnode_id-idx-cell) ：

```c
DT_IRQ_BY_IDX(node_id, idx, val)
```

这里的 `idx` 是 `interrupts` 数组的逻辑索引（ index ），它用于指向属性中的单个中断说明符。 `val` 参数是中断说明符中的单元格的名称。要使用此宏，请在绑定文件中查找对应节点的 `val` 名称。

大多数 Zephyr 设备树绑定都有一个名为 `irq` 的单元，即中断编号。若你要获取此值的处理完成的概览，使用 [`DT_IRQN()`](./api/api.md#dt_irqnnode_id) 是一种便捷的方式。

:::caution 警告
这里提到的“处理完成”指的是， Zephyr 的设备树 [脚本和工具](./intro.md#脚本与工具) 会更改 [zephyr.dts](./intro.md#输入与输出文件) 中的 `irq` 编号以处理某些 SoC 上的硬件约束，并使其符合 Zephyr 的多级中断编号。

由于这块内容目前没有很好的文档记录，如果你正在编写设备驱动程序，可能需要阅读脚本的源代码和现有驱动程序来了解更多详细信息。
:::

### phandle 属性

在 [设置属性值](./intro.md#设置属性值) 中介绍过，phandle 语法支持使用 `&another-node` 在属性值中引用其他节点。在绑定中， phandle 属性包含在 `phandle` 、 `phandles` 或 `phandle-array` 中。我们将这些统称为为“phandle 属性”。

当你要将 phandle 转换为节点 id 时，可以使用 [`DT_PHANDLE()`](./api/api.md#dt_phandlenode_id-prop) 、 [`DT_PHANDLE_BY_IDX()`](./api/api.md#dt_phandle_by_idxnode_id-prop-idx) 或 [`DT_PHANDLE_BY_NAME()`](./api/api.md#dt_phandle_by_namenode_id-pha-name) ，具体取决于你使用的属性类型。

phandle 属性的一个常见用例是，引用其他在设备树中的硬件。在这一场景中，你通常希望将设备树级别的 phandle 转换为 Zephyr 驱动程序级别的设备结构体 [struct device](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#device-model-api) 。可参阅 [从设备树中获取设备结构体](./howtos.md#从设备树中获取设备结构体) 了解怎么做。

另一个常见用例是访问 phandle 数组中的标识符值。实现这一用法的通用 API 是 [`DT_PHA_BY_IDX()`](./api/api.md#dt_pha_by_idxnode_id-pha-idx-cell) 和 [`DT_PHA()`](./api/api.md#dt_phanode_id-pha-cell) 。也有特定于硬件的一些用法：[`DT_GPIO_CTLR_BY_IDX()`](./api/api.md#dt_gpio_ctlr_by_idxnode_id-gpio_pha-idx) 、 [`DT_GPIO_CTLR()`](./api/api.md#dt_gpio_ctlrnode_id-gpio_pha) 、 [`DT_GPIO_LABEL_BY_IDX()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_GPIO_LABEL_BY_IDX) 、 [`DT_GPIO_LABEL()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_GPIO_LABEL) 、 [`DT_GPIO_PIN_BY_IDX()`](./api/api.md#dt_gpio_pin_by_idxnode_id-gpio_pha-idx) 、 [`DT_GPIO_PIN()`](./api/api.md#dt_gpio_pinnode_id-gpio_pha) 、 [`DT_GPIO_FLAGS_BY_IDX()`](./api/api.md#dt_gpio_flags_by_idxnode_id-gpio_pha-idx) 或 [`DT_GPIO_FLAGS()`](./api/api.md#dt_gpio_flagsnode_id-gpio_pha)

要检查标识符值是否存在于 phandle 属性中，请参阅 [`DT_PHA_HAS_CELL_AT_IDX()`](./api/api.md#dt_pha_has_cell_at_idxnode_id-pha-idx-cell) 和 [`DT_PROP_HAS_IDX()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_PROP_HAS_IDX) 。

## 其他 API

以下是其他一些可用 API 。

- [`DT_CHOSEN()`](./api/api.md#dt_chosenprop), [`DT_HAS_CHOSEN()`](./api/api.md#dt_has_chosenprop): 用于特殊 /chosen 节点的属性
- [`DT_HAS_COMPAT_STATUS_OKAY()`](./api/api.md#dt_has_compat_status_okaycompat), [`DT_NODE_HAS_COMPAT()`](./api/api.md#dt_node_has_compatnode_id-compat): 与 `compatible` 属性相关的全局的或节点特定的测试
- [`DT_BUS()`](./api/api.md#dt_busnode_id): 获取一个节点的总线控制器（如果有）
- [`DT_ENUM_IDX()`](./api/api.md#dt_enum_idxnode_id-prop): 用于取值声明为 enum 的属性，用于查找属性值在其固定选项列表中的索引
- [固定的 flash 分区](./api/api.md#devicetree-flash-api): 用于管理固定的 flash 分区。也可参考 [Flash map](../../service/storage/flash_map.md) 查阅如何使用更友好的 API 达成目的。

## 设备驱动便捷性

在编写一些设备驱动程序时特殊的宏很有用，这类驱动通常依赖于 [实例的节点 id](#节点-id) 。

要使用这些宏，你必须定义 `DT_DRV_COMPAT` 为驱动程序实现支持的 `compat` 值。该 `compat` 值最终将传给 [`DT_INST()`](./api/api.md#dt_instinst-compat) 。

```c
#include <zephyr/devicetree.h>

#define DT_DRV_COMPAT my_driver_compat

/* 等价于 DT_INST(0, my_driver_compat): */
DT_DRV_INST(0)

/*
 * 等价于 DT_PROP(DT_INST(0, my_driver_compat), clock_frequency)
 */
DT_INST_PROP(0, clock_frequency)
```

请在 [基于实例的 API](./api/api.md#devicetree-inst-apis) 中参考相关通用 API 引用。

## 特定于硬件的 API

这些 API 是基于上述 API 之上构建的，它们提供了更便利的方式访问硬件，也提升了硬件特定代码的可读性。请参阅 [特定于硬件的 API](./api/api.md#devicetree-hw-api) 了解相关详细信息。

## 生成的宏

在 `devicetree.h` API 还未生成之前，本小节所阐述的生成的宏依赖 [devicetree_unfixed.h](./intro.md#输出文件)。这一 C 头文件在每个应用程序构建目录中都将生成，其中包含的宏用于描述设备树数据。

这些宏具有棘手的命名约定， [设备树 API](./api/api.md) 将其抽象出来。实际上可视这些宏为设备树 API 的实现细节，但因为它们经常出现在编译器错误消息中，所以理解它们也是很有用的。

本节包含这些宏所使用语法基于扩充巴科斯-瑙尔范式（ABNF），并在注释中提供示例和更多详细信息。请参阅 [RFC 7405](https://tools.ietf.org/html/rfc7405)（本质上是 [RFC 5234](https://tools.ietf.org/html/rfc5234) 的扩展）了解其语法规范。

:::tip 提示
要阅读以下示例，需要对 ABNF 和 BNF 都具备一定的了解。这里更重要的点是，理解宏的生成过程基于 ABNF 来完成，而不是完全读懂下例的完整代码。
:::

```c
; An RFC 7405 ABNF grammar for devicetree macros.
; 
;
; This does *not* cover macros pulled out of DT via Kconfig,
; like CONFIG_SRAM_BASE_ADDRESS, etc. It only describes the
; ones that start with DT_ and are directly generated, not
; defined in a dts_fixup.h file.

; --------------------------------------------------------------------
; dt-macro: the top level nonterminal for a devicetree macro
;
; A dt-macro starts with uppercase "DT_", and is one of:
;
; - a <node-macro>, generated for a particular node
; - some <other-macro>, a catch-all for other types of macros
dt-macro = node-macro / other-macro

; --------------------------------------------------------------------
; node-macro: a macro related to a node

; A macro about a property value
node-macro =  property-macro
; A macro about the pinctrl properties in a node.
node-macro =/ pinctrl-macro
; EXISTS macro: node exists in the devicetree
node-macro =/ %s"DT_N" path-id %s"_EXISTS"
; Bus macros: the plain BUS is a way to access a node's bus controller.
; The additional dt-name suffix is added to match that node's bus type;
; the dt-name in this case is something like "spi" or "i2c".
node-macro =/ %s"DT_N" path-id %s"_BUS" ["_" dt-name]
; The reg property is special and has its own macros.
node-macro =/ %s"DT_N" path-id %s"_REG_NUM"
node-macro =/ %s"DT_N" path-id %s"_REG_IDX_" DIGIT "_EXISTS"
node-macro =/ %s"DT_N" path-id %s"_REG_IDX_" DIGIT
              %s"_VAL_" ( %s"ADDRESS" / %s"SIZE")
node-macro =/ %s"DT_N" path-id %s"_REG_NAME_" dt-name
              %s"_VAL_" ( %s"ADDRESS" / %s"SIZE")
; The interrupts property is also special.
node-macro =/ %s"DT_N" path-id %s"_IRQ_NUM"
node-macro =/ %s"DT_N" path-id %s"_IRQ_IDX_" DIGIT "_EXISTS"
node-macro =/ %s"DT_N" path-id %s"_IRQ_IDX_" DIGIT
              %s"_VAL_" dt-name [ %s"_EXISTS" ]
node-macro =/ %s"DT_N" path-id %s"_IRQ_NAME_" dt-name
              %s"_VAL_" dt-name [ %s"_EXISTS" ]
; The ranges property is also special.
node-macro =/ %s"DT_N" path-id %s"_RANGES_NUM"
node-macro =/ %s"DT_N" path-id %s"_RANGES_IDX_" DIGIT "_EXISTS"
node-macro =/ %s"DT_N" path-id %s"_RANGES_IDX_" DIGIT
              %s"_VAL_" ( %s"CHILD_BUS_FLAGS" / %s"CHILD_BUS_ADDRESS" /
                          %s"PARENT_BUS_ADDRESS" / %s"LENGTH")
node-macro =/ %s"DT_N" path-id %s"_RANGES_IDX_" DIGIT
              %s"_VAL_CHILD_BUS_FLAGS_EXISTS"
node-macro =/ %s"DT_N" path-id %s"_FOREACH_RANGE"
; Subnodes of the fixed-partitions compatible get macros which contain
; a unique ordinal value for each partition
node-macro =/ %s"DT_N" path-id %s"_PARTITION_ID" DIGIT
; Macros are generated for each of a node's compatibles;
; dt-name in this case is something like "vnd_device".
node-macro =/ %s"DT_N" path-id %s"_COMPAT_MATCHES_" dt-name
; Every non-root node gets one of these macros, which expands to the node
; identifier for that node's parent in the devicetree.
node-macro =/ %s"DT_N" path-id %s"_PARENT"
; These are used internally by DT_FOREACH_CHILD, which iterates over
; each child node.
node-macro =/ %s"DT_N" path-id %s"_FOREACH_CHILD"
node-macro =/ %s"DT_N" path-id %s"_FOREACH_CHILD_VARGS"
; These are used internally by DT_FOREACH_CHILD_STATUS_OKAY, which iterates
; over each child node with status "okay".
node-macro =/ %s"DT_N" path-id %s"_FOREACH_CHILD_STATUS_OKAY"
node-macro =/ %s"DT_N" path-id %s"_FOREACH_CHILD_STATUS_OKAY_VARGS"
; The node's zero-based index in the list of it's parent's child nodes.
node-macro =/ %s"DT_N" path-id %s"_CHILD_IDX"
; The node's status macro; dt-name in this case is something like "okay"
; or "disabled".
node-macro =/ %s"DT_N" path-id %s"_STATUS_" dt-name
; The node's dependency ordinal. This is a non-negative integer
; value that is used to represent dependency information.
node-macro =/ %s"DT_N" path-id %s"_ORD"
; The node's path, as a string literal
node-macro =/ %s"DT_N" path-id %s"_PATH"
; The node's name@unit-addr, as a string literal
node-macro =/ %s"DT_N" path-id %s"_FULL_NAME"
; The dependency ordinals of a node's requirements (direct dependencies).
node-macro =/ %s"DT_N" path-id %s"_REQUIRES_ORDS"
; The dependency ordinals of a node supports (reverse direct dependencies).
node-macro =/ %s"DT_N" path-id %s"_SUPPORTS_ORDS"

; --------------------------------------------------------------------
; pinctrl-macro: a macro related to the pinctrl properties in a node
;
; These are a bit of a special case because they kind of form an array,
; but the array indexes correspond to pinctrl-DIGIT properties in a node.
;
; So they're related to a node, but not just one property within the node.
;
; The following examples assume something like this:
;
;      foo {
;              pinctrl-0 = <&bar>;
;              pinctrl-1 = <&baz>;
;              pinctrl-names = "default", "sleep";
;      };

; Total number of pinctrl-DIGIT properties in the node. May be zero.
;
;   #define DT_N_<node path>_PINCTRL_NUM 2
pinctrl-macro = %s"DT_N" path-id %s"_PINCTRL_NUM"
; A given pinctrl-DIGIT property exists.
;
;     #define DT_N_<node path>_PINCTRL_IDX_0_EXISTS 1
;     #define DT_N_<node path>_PINCTRL_IDX_1_EXISTS 1
pinctrl-macro =/ %s"DT_N" path-id %s"_PINCTRL_IDX_" DIGIT %s"_EXISTS"
; A given pinctrl property name exists.
;
;     #define DT_N_<node path>_PINCTRL_NAME_default_EXISTS 1
;     #define DT_N_<node path>_PINCTRL_NAME_sleep_EXISTS 1
pinctrl-macro =/ %s"DT_N" path-id %s"_PINCTRL_NAME_" dt-name %s"_EXISTS"
; The corresponding index number of a named pinctrl property.
;
;     #define DT_N_<node path>_PINCTRL_NAME_default_IDX 0
;     #define DT_N_<node path>_PINCTRL_NAME_sleep_IDX 1
pinctrl-macro =/ %s"DT_N" path-id %s"_PINCTRL_NAME_" dt-name %s"_IDX"
; The node identifier for the phandle in a named pinctrl property.
;
;    #define DT_N_<node path>_PINCTRL_NAME_default_IDX_0_PH <node id for 'bar'>
;
; There's no need for a separate macro for access by index: that's
; covered by property-macro. We only need this because the map from
; names to properties is implicit in the structure of the DT.
pinctrl-macro =/ %s"DT_N" path-id %s"_PINCTRL_NAME_" dt-name %s"_IDX_" DIGIT %s"_PH"

; --------------------------------------------------------------------
; property-macro: a macro related to a node property
;
; These combine a node identifier with a "lowercase-and-underscores form"
; property name. The value expands to something related to the property's
; value.
;
; The optional prop-suf suffix is when there's some specialized
; subvalue that deserves its own macro, like the macros for an array
; property's individual elements
;
; The "plain vanilla" macro for a property's value, with no prop-suf,
; looks like this:
;
;   DT_N_<node path>_P_<property name>
;
; Components:
;
; - path-id: node's devicetree path converted to a C token
; - prop-id: node's property name converted to a C token
; - prop-suf: an optional property-specific suffix
property-macro =  %s"DT_N" path-id %s"_P_" prop-id [prop-suf]

; --------------------------------------------------------------------
; path-id: a node's path-based macro identifier
;
; This in "lowercase-and-underscores" form. I.e. it is
; the node's devicetree path converted to a C token by changing:
;
; - each slash (/) to _S_
; - all letters to lowercase
; - non-alphanumerics characters to underscores
;
; For example, the leaf node "bar-BAZ" in this devicetree:
;
;   / {
;           foo@123 {
;                   bar-BAZ {};
;           };
;   };
;
; has path-id "_S_foo_123_S_bar_baz".
path-id = 1*( %s"_S_" dt-name )

; ----------------------------------------------------------------------
; prop-id: a property identifier
;
; A property name converted to a C token by changing:
;
; - all letters to lowercase
; - non-alphanumeric characters to underscores
;
; Example node:
;
;   chosen {
;       zephyr,console = &uart1;
;       WHY,AM_I_SHOUTING = "unclear";
;   };
;
; The 'zephyr,console' property has prop-id 'zephyr_console'.
; 'WHY,AM_I_SHOUTING' has prop-id 'why_am_i_shouting'.
prop-id = dt-name

; ----------------------------------------------------------------------
; prop-suf: a property-specific macro suffix
;
; Extra macros are generated for properties:
;
; - that are special to the specification ("reg", "interrupts", etc.)
; - with array types (uint8-array, phandle-array, etc.)
; - with "enum:" in their bindings
; - that have zephyr device API specific macros for phandle-arrays
; - related to phandle specifier names ("foo-names")
;
; Here are some examples:
;
; - _EXISTS: property, index or name existence flag
; - _SIZE: logical property length
; - _IDX_<i>: values of individual array elements
; - _IDX_<DIGIT>_VAL_<dt-name>: values of individual specifier
;   cells within a phandle array
; - _ADDR_<i>: for reg properties, the i-th register block address
; - _LEN_<i>: for reg properties, the i-th register block length
;
; The different cases are not exhaustively documented here to avoid
; this file going stale. Please see devicetree.h if you need to know
; the details.
prop-suf = 1*( "_" gen-name ["_" dt-name] )

; --------------------------------------------------------------------
; other-macro: grab bag for everything that isn't a node-macro.

; See examples below.
other-macro =  %s"DT_N_" alternate-id
; Total count of enabled instances of a compatible.
other-macro =/ %s"DT_N_INST_" dt-name %s"_NUM_OKAY"
; These are used internally by DT_FOREACH_STATUS_OKAY,
; which iterates over each enabled node of a compatible.
other-macro =/ %s"DT_FOREACH_OKAY_" dt-name
other-macro =/ %s"DT_FOREACH_OKAY_VARGS_" dt-name
; These are used internally by DT_INST_FOREACH_STATUS_OKAY,
; which iterates over each enabled instance of a compatible.
other-macro =/ %s"DT_FOREACH_OKAY_INST_" dt-name
other-macro =/ %s"DT_FOREACH_OKAY_INST_VARGS_" dt-name
; E.g.: #define DT_CHOSEN_zephyr_flash
other-macro =/ %s"DT_CHOSEN_" dt-name
; Declares that a compatible has at least one node on a bus.
; Example:
;
;   #define DT_COMPAT_vnd_dev_BUS_spi 1
other-macro =/ %s"DT_COMPAT_" dt-name %s"_BUS_" dt-name
; Declares that a compatible has at least one status "okay" node.
; Example:
;
;   #define DT_COMPAT_HAS_OKAY_vnd_dev 1
other-macro =/ %s"DT_COMPAT_HAS_OKAY_" dt-name
; Currently used to allow mapping a lowercase-and-underscores "label"
; property to a fixed-partitions node. See the flash map API docs
; for an example.
other-macro =/ %s"DT_COMPAT_" dt-name %s"_LABEL_" dt-name

; --------------------------------------------------------------------
; alternate-id: another way to specify a node besides a path-id
;
; Example devicetree:
;
;   / {
;           aliases {
;                   dev = &dev_1;
;           };
;
;           soc {
;               dev_1: device@123 {
;                   compatible = "vnd,device";
;               };
;           };
;   };
;
; Node device@123 has these alternate-id values:
;
; - ALIAS_dev
; - NODELABEL_dev_1
; - INST_0_vnd_device
;
; The full alternate-id macros are:
;
;   #define DT_N_INST_0_vnd_device     DT_N_S_soc_S_device_123
;   #define DT_N_ALIAS_dev             DT_N_S_soc_S_device_123
;   #define DT_N_NODELABEL_dev_1       DT_N_S_soc_S_device_123
;
; These mainly exist to allow pasting an alternate-id macro onto a
; "_P_<prop-id>" to access node properties given a node's alias, etc.
;
; Notice that "inst"-type IDs have a leading instance identifier,
; which is generated by the devicetree scripts. The other types of
; alternate-id begin immediately with names taken from the devicetree.
alternate-id =  ( %s"ALIAS" / %s"NODELABEL" ) dt-name
alternate-id =/ %s"INST_" 1*DIGIT "_" dt-name

; --------------------------------------------------------------------
; miscellaneous helper definitions

; A dt-name is one or more:
; - lowercase ASCII letters (a-z)
; - numbers (0-9)
; - underscores ("_")
;
; They are the result of converting names or combinations of names
; from devicetree to a valid component of a C identifier by
; lowercasing letters (in practice, this is a no-op) and converting
; non-alphanumeric characters to underscores.
;
; You'll see these referred to as "lowercase-and-underscores" forms of
; various devicetree identifiers throughout the documentation.
dt-name = 1*( lower / DIGIT / "_" )

; gen-name is used as a stand-in for a component of a generated macro
; name which does not come from devicetree (dt-name covers that case).
;
; - uppercase ASCII letters (a-z)
; - numbers (0-9)
; - underscores ("_")
gen-name = upper 1*( upper / DIGIT / "_" )

; "lowercase ASCII letter" turns out to be pretty annoying to specify
; in RFC-7405 syntax.
;
; This is just ASCII letters a (0x61) through z (0x7a).
lower = %x61-7A

; "uppercase ASCII letter" in RFC-7405 syntax
upper = %x41-5A
```
