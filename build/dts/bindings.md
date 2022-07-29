# 设备树绑定

在描述硬件这件事上，设备树本身只是完成了一半工作，因为它是一种相对非结构化的格式。 *设备树绑定* 则完成了剩余的另一半工作。

设备树绑定用于声明对节点内容的要求，并提供有关有效节点内容的语义信息。 Zephyr 设备树绑定是自定义格式的 YAML 文件（ Zephyr 不使用 Linux 内核使用的 dt-schema 工具）。

本页提供了设备树绑定的介绍，并描述它们的作用、说明它们的位置，以及解释它们的数据格式。

:::info 注意
可从 [绑定索引](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html#devicetree-binding-index) 查看更多 Zephyr 内建的绑定引用信息。
:::

## 介绍

设备树节点使用它们的 [compatible 属性](./intro.md#重要属性) 与绑定匹配。

在 [配置阶段](../cmake/index.md#配置阶段) ，构建系统尝试匹配设备树中的每个节点到绑定关系中。当这一步成功后，构建系统在验证节点的内容和为节点生成宏时都使用绑定关系中的信息。

### 一个简单示例

这里是一个简单的设备树节点：

```c
/* 一个 DTS 文件中的节点 */
bar-device {
     compatible = "foo-company,bar-device";
     num-foos = <3>;
};
```

这是一个与节点匹配的最小绑定文件：

```yaml
# 用于匹配节点的 YAML 绑定文件

compatible: "foo-company,bar-device"

properties:
  num-foos:
    type: int
    required: true
```

因为该节点的 `compatible` 属性与该 YAML 绑定文件中的 `compatible:` 行相匹配，所以构建系统能将 `bar-device` 节点与此绑定相匹配。

### 构建系统使用绑定做了什么

构建系统使用绑定来验证设备树节点，并转换设备树的内容到生成的 [devicetree_unfixed.h](./intro.md) 头文件中。

例如，构建系统将使用上述绑定来检查必需的 `num-foos` 属性（在绑定中声明 `required: true` ）是否存在于 `bar-device` 节点中，并且其值 `<3>` 具有正确的类型。

然后，构建系统将为 `bar-device` 节点的 `num-foos` 属性生成一个宏，该宏将扩展为整数文字 `3` 。此宏允许你在 C 代码中使用 API 获取属性值，该 API 将在后面 [从 C/C++ 访问设备树](./api_usage) 的章节中讨论。

再举一个例子，以下节点会导致构建错误，因为它没有 `num-foos` 属性，并且该属性在绑定中被标记为必需 `required` ：

```c
bad-node {
     compatible = "foo-company,bar-device";
};
```

### 节点与绑定匹配的其他方式

如果节点的 `compatible` 属性设为包含多个字符串的值，则构建系统会按设置的顺序查找兼容的绑定并使用第一个匹配项。

以这个节点为例：

```c
baz-device {
     compatible = "foo-company,baz-device", "generic-baz-device";
};
```

如果构建系统找不到具有 `compatible: "foo-company,baz-device"` 行的绑定，`baz-device` 节点将匹配到具有 `compatible: "generic-baz-device"` 行的绑定。

没有兼容属性的节点可以匹配到与其父节点关联的绑定。这些绑定被称为“子绑定”。如果节点描述总线上的硬件，如 I2C 或 SPI ，则在将节点与绑定匹配时也会检查总线类型。 （下面的 [绑定文件语法](#绑定文件语法) 部分描述了如何编写子绑定和特定于总线的绑定。）

一些特殊节点没有 `compatible` 属性，但能匹配到 [推断绑定](#推断绑定) 中。对于这些节点，构建系统会根据最终设备树中的属性生成宏。

### 绑定在何处定位

绑定文件名通常与它们的 `compatible:` 行匹配。例如，按照约定，上​​面的示例绑定将命名为 `foo-company,bar-device.yaml` 。

构建系统在以下位置的 `dts/bindings` 子目录中查找绑定：

- zephyr 主仓库

- 你的 [应用程序源码目录](../../application/application_development.md)
- 你的 [板型目录](https://docs.zephyrproject.org/latest/hardware/porting/board_porting.html#board-porting-guide)
- 任何用 [DTS_ROOT](../../application/application_development.md#设备树定义) CMake 变量声明的目录
- 任何在其[构建设置](../../application/modules.md#) 中定义了 `dts_root` 的 [模块](../../application/modules.md) 

在将节点与绑定匹配时，构建系统将检查其中上述任一目录中的任何 YAML 文件，包括任何子目录中的任何 YAML 文件。如果文件的名称以 `.yaml` 或 `.yml` 结尾，则该文件都将被视为 YAML 。

:::caution 警告

绑定文件必须位于上述位置的 `dts/bindings` 子目录中的某个位置。

例如，如果 `my-app` 是你的应用程序目录，那么你必须将特定于应用程序的绑定放在 `my-app/dts/bindings` 中。因此 `my-app/dts/bindings/serial/my-company,my-serial-port.yaml` 是有效的，但 `my-app/my-company,my-serial-port.yaml` 则不行。
:::

## 绑定文件语法

Zephyr 绑定文件是 YAML 文件。文件中的顶级值是一个映射（ mapping ）。上文已给出了[一个简单的例子](#一个简单示例)。

映射中的最外层字段如下所示：

```yaml
# 对绑定适用的设备的最顶层描述：
description: |
   This is the Vendomatic company's foo-device.

   Descriptions which span multiple lines (like this) are OK,
   and are encouraged for complex bindings.

   See https://yaml-multiline.info/ for formatting help.

# 你可用此字段从其他绑定文件引入定义
include: other.yaml

# 用于上文提及的方式为此绑定匹配节点
compatible: "manufacturer,foo-device"

properties:
  # 对本绑定匹配的节点需要满足的属性的描述和要求

child-binding:
  # 你可以通过此字段关联匹配这个绑定的节点的子节点

# 如果节点描述总线硬件，例如 SoC 上的 SPI 总线控制器，
# 请使用 'bus:' 来说明是哪一个，像这样：
bus: spi

# 如果节点表现为总线上的设备，例如外部 SPI 存储芯片，
# 请使用 'on-bus:' 来说明总线的类型，例如这样。
# 与 'compatible' 类似，此字段也影响节点匹配绑定的方式。
on-bus: spi

foo-cells:
  # 在这里写作用域在 'foo' 之内的 "标识符" 单元格名称；
  # 以 'foo' 为例，这里的值可以为 'gpio' 、 'pwm' 或 'dma' 。
  # 在下文中将更详细描述这一字段。
```

以下部分更详细地描述了这些字段：

- [description](#description)
- [compatible](#compatible)
- [properties](#properties)
- [child-binding](#child-binding)
- [bus](#bus)
- [on-bus](#on-bus)
- [标识符单元格名称 (*-cells)](#标识符单元格名称--cells)
- [Include](#include)

虽然 `include:` 该字段通常出现在绑定文件的开始处，但这里将它放在最后来讲。这是因为在理解 `include:` 之前，你首先需要知道其他字段是如何工作的。 

### description

description 字段用于描述节点代表的硬件，值类型为字符串，支持以自由的形式进行描述。你也可以在这里放置一些链接用于指向数据表、示例节点或属性。

### compatible

正如上文提及过的，此字段用于将节点匹配到此绑定。它在绑定文件中应该如下所示：

```yaml
# 注意用逗号隔开设备供应商前缀和设备名称
compatible: "manufacturer,device"
```

此设备节点可匹配上述绑定：

```c
device {
     compatible = "manufacturer,device";
};
```

若没有任何声明 `compatible: "manufacturer,device-v2"` 的绑定，下例中的节点也会匹配上述的绑定：

```c
device-2 {
    compatible = "manufacturer,device-v2", "manufacturer,device";
};
```

每个节点的 `compatible` 属性在进行匹配时都是依次尝试的。第一个匹配的绑定将被使用。 [on-bus:](#on-bus) 字段可用于细化搜索。

如果找到多个兼容的绑定，则会引发错误。

`manufacturer` 前缀表示设备供应商（ vendor ）。可参阅 [dts/bindings/vendor-prefixes.txt](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/dts/bindings/vendor-prefixes.txt) 查找可用的供应商前缀列表。 `device` 部分通常来自 datasheet 。

一些绑定适用于没有特定供应商的通用设备类别。在这些情况下，本字段将没有供应商前缀。例如在 [`gpio-leds`](https://docs.zephyrproject.org/latest/build/dts/api/bindings/gpio/gpio-leds.html#std-dtcompatible-gpio-leds) 中的 compatible 字段值，它通常用于描述开发板上连接到 GPIO 的 LED。

### properties

`properties:` 字段描述了与该绑定匹配的节点可以包含的属性。

例如，UART 外围设备的绑定可能如下所示：

```yaml
compatible: "manufacturer,serial"

properties:
  reg:
    type: array
    description: UART peripheral MMIO register space
    required: true
  current-speed:
    type: int
    description: current baud rate
    required: true
  label:
    type: string
    description: human-readable name
    required: false
```

以下节点中的属性可以通过上述绑定的验证：

```c
my-serial@deadbeef {
     compatible = "manufacturer,serial";
     reg = <0xdeadbeef 0x1000>;
     current-speed = <115200>;
     label = "UART_0";
};
```

这一过程中将对每个属性检查在 properties 字段中的对应声明是否具有 required 字段，并控制它们生成输出的格式。

但有一些特殊属性（如 `reg` ）是例外的，他们的含义是在设备树规范中定义的，只有 `properties:` 字段中列出的属性才会有生成的宏。

#### 属性定义示例

下面再多一点例子。

```yaml
properties:
    # 描述一个设置形式如 'current-speed = <115200>;' 的属性；
    # 我们假设在节点示例中的必须的，设置为 'required: true' 。
    current-speed:
        type: int
        required: true
        description: Initial baud rate for bar-device

    # 描述一个设置形式如 'keys = "foo", "bar";' 的属性
    keys:
        type: string-array
        required: false
        description: Keys for bar-device

    # 描述一个设置形式如 'maximum-speed = "full-speed";' 的属性；
    # 这里的 enum 字段声明了该字符串属性的若干可用的取值
    maximum-speed:
        type: string
        required: false
        description: Configures USB controllers to work up to a specific speed.
        enum:
           - "low-speed"
           - "full-speed"
           - "high-speed"
           - "super-speed"

    # 描述一个设置形式如 'resolution = <16>;' 的属性；
    # 这里的 enum 字段声明了该整型属性的若干可用的取值
    resolution:
      type: int
      required: false
      enum:
       - 8
       - 16
       - 24
       - 32

    # 描述一个设置形式如 '#address-cells = <1>' 的属性；
    # 并且指定了该属性值期望为数值 1 
    "#address-cells":
        type: int
        required: true
        const: 1

    int-with-default:
        type: int
        required: false
        default: 123
        description: Value for int register, default is power-up configuration.

    array-with-default:
        type: array
        required: false
        default: [1, 2, 3] # 等同于 'array-with-default = <1 2 3>'

    string-with-default:
        type: string
        required: false
        default: "foo"

    string-array-with-default:
        type: string-array
        required: false
        default: ["foo", "bar"] # 等同于 'string-array-with-default = "foo", "bar"'

    uint8-array-with-default:
        type: uint8-array
        required: false
        default: [0x12, 0x34] # 等同于 'uint8-array-with-default = [12 34]'
```

#### 属性项语法

如上面的示例所示，绑定中的每个属性项如下所示：

```yaml
<property name>:
  required: <true | false>
  type: <string | int | boolean | array | uint8-array | string-array |
         phandle | phandles | phandle-array | path | compound>
  deprecated: <true | false>
  default: <default>
  description: <description of the property>
  enum:
    - <item1>
    - <item2>
    ...
    - <itemN>
  const: <string | int>
```

#### required 属性

如果节点与绑定匹配，但缺失绑定定义的任何声明为 `required: true` 的属性，则构建会失败。

#### 属性类型

| 类型 | 描述 | 在 DTS 中的用法示例 |
| --- | --- | --- |
| `string` | 字符串 | `label = "UART_0";` |
| `int` | 32 位整型 (单元格形式) | `current-speed = <115200>;` |
| `boolean` | 一个标志，声明且不取值表示为 true ，不存在时表示 false  | `hw-flow-control;` |
| `array` | 零或若干个 32 位整型 (单元格内，以空格隔开) | `offsets = <0x100 0x200 0x300>;` |
| `uint8-array` | 零或若干个字节, 以 16 进制表示 (等价设备树规范中的‘bytestring’类型) | `local-mac-address = [de ad be ef 12 34];` |
| `string-array` | 零或若干个字符串 | `dma-names = "tx", "rx";` |
| `phandle` | 指针 | `interrupt-parent = <&gic>;` |
| `phandles` | 零或若干个指针 | `pinctrl-0 = <&usart2_tx_pd5 &usart2_rx_pd6>;` |
| `phandle-array` | 一个列表，每个元素都是一个单元格，其中包含指针与 32 位数值 | `dmas = <&dma0 2>, <&dma0 3>;` |
| `path` | 指向节点的路径，可以是指向路径的指针或路径字符串 | `zephyr,bt-c2h-uart = &uart0;` 或 `foo = "/path/to/some/node";` |
| `compound` | 混合诸多类型的复杂表示（此字段不会生成宏） | `foo = <&label>, [01 02];` |

#### deprecated 属性

带有 `deprecated: true` 的属性代表已弃用，用于向用户和工具表明该属性将被逐步淘汰。

如果设备树声明了标记为已弃用的属性，构建过程中工具将报告警告。

#### default 属性 —— 为属性设置默认值

`default:` 属性是可选的，它用于为设备树节点的属性提供一个默认值。

例如，在此绑定片段中：

```yaml
properties:
  foo:
    type: int
    default: 3
```

如果属性 `foo` 并没有声明在匹配节点中，则在最终输出中，和已经在 DTS 中声明 `foo = <3>;` 没有差别（这里的没有差别主要指取值，而不是说形式上会直接把 `default` 值替换到此处）。

请注意，只有将 `default:` 与 `required: false` 结合使用才能发挥作用。将它与 `required: true` 结合使用会引发错误。

有关上游 Zephyr 绑定中与默认值相关的规则，请参阅 [默认值规则](#默认值规则)。

可参阅 [属性定义示例](#属性定义示例) 查看相关示例。若在示例中使用的属性类型之外的类型设置 `default:` 字段，都会引发错误。

#### enum 枚举值

属性的 `enum:` 行后是一个列表，包含该属性可设置的值。如果 DTS 中为属性设置的值不在 `enum:` 绑定中的列表中，则会引发错误。可参阅 [属性定义示例](#属性定义示例) 查看相关示例。

#### const 常量

用于指定了属性必须采用的常量值。 const 常量主要在需要约束特定硬件的通用属性值时发挥作用。

### child-binding

`child-binding` 子绑定。当一个节点具有共享相同属性的子节点时，即可使用子绑定。每个子节点都将 `child-binding` 的内容作为其绑定，但如果子节点上显式声明 `compatible = ...` ，并且可以为此属性找到绑定，则以匹配到的绑定优先。


假设一个 PWM LED 节点的绑定，其中子节点需要具有 `pwms` 属性：

```c
pwmleds {
        compatible = "pwm-leds";

        red_pwm_led {
                pwms = <&pwm3 4 15625000>;
        };
        green_pwm_led {
                pwms = <&pwm3 0 15625000>;
        };
        /* ... */
};
```

其绑定看起来像这样：

```yaml
compatible: "pwm-leds"

child-binding:
  description: LED that uses PWM

  properties:
    pwms:
      type: phandle-array
      required: true
```

嵌套 `child-binding` 也是有用的。例如此绑定中：

```yaml
compatible: foo

child-binding:
  child-binding:
    properties:
      my-property:
        type: int
        required: true
```

下例 DTS 中的 `grandchild` 节点将应用此绑定规则：

```c
parent {
        compatible = "foo";
        child {
                grandchild {
                        my-property = <123>;
                };
        };
};
```

### bus

如果节点是总线控制器，在绑定中使用 `bus:` 来描述是总线的类型。例如，SoC 上 SPI 外设的绑定如下所示：

```yaml
compatible: "manufacturer,spi-peripheral"
bus: spi
# ...
```

绑定中此字段用于告诉构建系统，此类型的总线上的子节点，都可与此绑定匹配。

这一字段反过来会影响 `on-bus:` 用于匹配子节点绑定的方式。

### on-bus

如果节点表示存在总线上的设备，使用 `on-bus:` 在绑定中说明总线的类型。

例如，外部 SPI 存储芯片的绑定应包含下行声明：

```yaml
on-bus: spi
```

基于 I2C 的温度传感器的绑定应包含下行声明：

```yaml
on-bus: i2c
```

在查找节点的绑定时，构建系统会检查其父节点的绑定是否包含 `bus: <bus type>` 。若包含，则限制绑定的考虑范围，只考虑具有匹配 `on-bus: <bus type>` 的绑定和没有显式声明 `on-bus` 的绑定。显式声明 `on-bus: <bus type>` 的绑定首先被搜索，其次是没有显式 `on-bus` 的绑定。此过程将根据节点的 `compatible` 属性，按顺序对每个项都进行搜索。

此特性允许同一设备根据其所在总线，匹配到不同的绑定。

例如，假设声明 compatible 为 `manufacturer,sensor`  的传感器设备，它可通过 I2C 或 SPI 使用。

因此，传感器节点可作为 SPI 或 I2C 控制器的子节点出现在设备树中，如下所示：

```c
spi-bus@0 {
   /* ... some compatible with 'bus: spi', etc. ... */

   sensor@0 {
       compatible = "manufacturer,sensor";
       reg = <0>;
       /* ... */
   };
};

i2c-bus@0 {
   /* ... some compatible with 'bus: i2c', etc. ... */

   sensor@79 {
       compatible = "manufacturer,sensor";
       reg = <79>;
       /* ... */
   };
};
```

为了单独匹配这些的传感器节点，你可以编写两个单独的绑定文件，即使它们具有相同的 compatible 属性：

```yaml
# manufacturer,sensor-spi.yaml, which matches sensor@0 on the SPI bus:
# manufacturer,sensor-spi.yaml 文件, 将匹配 SPI 总线中的 sensor@0:
compatible: "manufacturer,sensor"
on-bus: spi

# manufacturer,sensor-i2c.yaml, which matches sensor@79 on the I2C bus:
# manufacturer,sensor-i2c.yaml 文件, 将匹配 I2C 总线中的 sensor@79:
compatible: "manufacturer,sensor"
properties:
  uses-clock-stretching:
    type: boolean
    required: false
on-bus: i2c
```

只有 `sensor@79` 可以具有 `use-clock-stretching` 属性。在搜索 `sensor@0` 的绑定时，总线感知逻辑会忽略 `manufacturer,sensor-i2c.yaml` 。

### 标识符单元格名称 (\*-cells)

标识符单元格通常与上问简介过的 `phandle-array` 类型属性一起使用。

我们来通过假设示例来了解 `*-cells` 的用途。假设某个节点具有以下 `pwms` 属性，类型为 `phandle-array` ：

```c
my-device {
     pwms = <&pwm0 1 2>, <&pwm3 4>;
};
```

构建工具会从此类属性的属性名称中去除最后的 `s` 生成 `pwm` 。然后在 PWM 控制器节点 `pwm0` 和 `pwm3` 中查找 `#pwm-cells` 属性的值，如下所示：

```c
pwm0: pwm@0 {
     compatible = "foo,pwm";
     #pwm-cells = <2>;
};

pwm3: pwm@3 {
     compatible = "bar,pwm";
     #pwm-cells = <1>;
};
```

属性值的 `&pwm0 1 2` 部分有 **2 个单元格**（ `1` 和 `2` ），这一数量与 `#pwm-cells = <2>;` 的声明匹配，因此这些单元格被认为是 phandle 数组中与 `pwm0` 关联的 *标识符* 。

类似地，与 `pwm3` 关联的标识符是单元格 `4` 。

位于 `pwms` 中的标识符，其 PWM 单元格数必须与 `#pwm-cells` 值匹配，如上所示。如果不匹配，则会引发错误。例如，此节点将导致错误：

```c
my-bad-device {
     /* 错误: 此标识符声明了 2 个单元格, 但 pwm3 中声明 #pwm-cells 为 1 . */
     pwms = <&pwm3 5 6>;
};
```

每个 PWM 控制器的绑定还必须有一个 `*-cells` 字段，在本例中为 `pwm-cells` 。对于每个标识符，在绑定中需要为其包含的单元格命名：

```yaml
# foo,pwm.yaml
compatible: "foo,pwm"
...
pwm-cells:
  - channel
  - period

# bar,pwm.yaml
compatible: "bar,pwm"
...
pwm-cells:
  - period
```

一个 `*-names`（例如 `pwm-names` ）属性也可存在于节点中，用于为每个条目提供名称。

为标识符中的单元格提供名称，有助于例如使用 [DT_PWMS_CHANNEL_BY_NAME](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_PWMS_CHANNEL_BY_NAME) 之类的 API 访问这些单元格数据。

在生成过程中，会把属性名中最后的 `s` 去掉，从而派生出其他属性名，因此属性名必须以 `s` 结尾，否则会引发错误。

还有另一种提供名称的方式，是使用 `specifier-space` 属性来表明 `*-names` 和 `*-cells` 的基本属性名称。例如下例中，`pll-clocks` 通过 `specifier-space` 属性表明其单元格名称将为 `pll-clock`

```yaml  
pll-clocks:
  type: phandle-array
  required: false
  description: pll settings
  specifier-space: pll-clock
```

`*-gpios` 属性是特殊情况，例如 `foo-gpios` 解析为 `#gpio-cells` 而不是 `#foo-gpio-cells` 。

如果标识符单元格为空（例如 `#clock-cells = <0>` ），则 `*-cells` 可以省略（推荐）或设置为空数组。请注意，在 YAML 中空数组的指定方式形如 `clock-cells: []` 。

所有 `phandle-array` 类型属性都支持映射（通过形如 `*-map` 的属性，例如设备树规范定义中的 `gpio-map` ）。

### include

绑定可以包含其他文件，这些包含文件用于跨绑定共享公用属性定义。 `include:` 字段正是发挥此作用。它的值是字符串或列表。

最简单的用法，当你要包含一个文件时，直接将其名称作为字符串使用，例如：

```yaml
include: foo.yaml
```

如果找到任何名为 `foo.yaml` 的文件（请参阅 [绑定在何处定位](#绑定在何处定位) 了解搜索过程），将包含在此绑定中。

接下来，通过简单的递归字典合并操作，将包含的文件合并到绑定中。至于生成的合并绑定是否格式正确，将由构建系统进行检查。

如果在绑定和它包含的文件中，存在某个字段以不同的值出现，这将抛出一个错误；但存在一种例外：
绑定中可能包含某个文件，其中为一个 [属性定义](#properties) 声明了 `required: false` ，但同时该绑定本身为此属性设置了 `required: true` 。此时 `required: true` 将优先，绑定允许强化其包含文件中的依赖关系。

在 [base.yaml](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/dts/bindings/base/base.yaml) 文件中包含许多常见属性的定义。编写新绑定时，最好检查 `base.yaml` 是否已经定义了一些可复用的属性，如果有，则使用 `include` 包含它。

你可以像这样强制覆盖 base.yaml 中的属性，以 [reg](./intro.md#重要属性) 为例：

```yaml
reg:
  required: true
```

这里不需要补充完整的所有属性，是因为会通过字典合并来填充 `reg` 的其他字段，例如 `type` 。

要包含多个文件，你可以使用字符串列表：

```yaml
include:
  - foo.yaml
  - bar.yaml
```

这一描述表示将包含文件 `foo.yaml` 和 `bar.yaml` 。（你也可以在 YAML 中一行声明完这个列表，形如 `include: [foo.yaml, bar.yaml]` 。）

包含多个文件时，这些文件中同一属性的任何重复的 `required` 字段都将 **或** 在一起。这确保了只要有一处声明 `required: true` 属性，最终都将发挥作用。

在某些情况下，你可能希望只包含文件中的部分属性定义，而不是全部。在这种情况下， `include:` 应声明为一个列表，然后你可以通过在列表中放置一个 map 来过滤掉你想要的定义，如下所示：

```yaml
include:
  - name: foo.yaml
    property-allowlist:
      - i-want-this-one
      - and-this-one
  - name: bar.yaml
    property-blocklist:
      - do-not-include-this-one
      - or-this-one
```

每个 map 元素必须包含 `name` 字段，用于声明包含的文件名，并且可选 `property-allowlist` （白名单）或 `property-blocklist` （黑名单）字段来声明哪些属性要过滤。

在 `include:` 内支持自由混合 字符串 和 map ：

```yaml
include:
  - foo.yaml
  - name: bar.yaml
    property-blocklist:
      - do-not-include-this-one
      - or-this-one
```

最后一种用法，从子绑定中过滤：

```yaml
include:
  - name: bar.yaml
    child-binding:
      property-allowlist:
        - child-prop-to-allow
```

## 主线绑定规则

本节包括编写要提交到 Zephyr 项目主线（或 CSK6 SDK 项目主线）的绑定的一般规则。（如果你不打算为 Zephyr 项目做出贡献，你无需遵循这些绑定的规则，但我们仍建议你在开发过程中遵循这些规则以设计出更完美的代码。）

有时 Zephyr 设备树维护者做出的决定会重写本节的内容（不论部分还是全部），但这并不是正确的行为。如果发生这种情况，请让他们知道，以便他们更新此页面，或者你可以自己发送一个 patch 用以修复该情况。

### 总是先检查是否已存在绑定

在设备树的实现上，保持与其他操作系统的 [设备树源码兼容性](./design.md) 是 Zephyr 的宗旨。因此，如果你的设备在某些权威的地方存在已有绑定，则在编写 Zephyr 绑定时应尝试复制其属性，否则必须证明任何 Zephyr 特定的分歧是合理的。

特别是，该规则适用于，当你要设计一个绑定时：

- 发现主线 Linux 内核中已存在绑定。有关现有绑定的信息，请参阅 [Linux 源码树](https://github.com/torvalds/linux/) 中的 `Documentation/devicetree/bindings` 或 [Linux 设备树文档](https://www.kernel.org/doc/html/latest/devicetree/index.html) 了解相关的更多信息。
- 发现你的硬件供应商已经提供了官方绑定，但不在 Linux 内核中。

### 一般规则

- 要匹配到 compatible 的绑定，其命名必须基于 compatible 。
  - 例如， compatible 取值为 `vnd,foo` 的绑定必须命名为 `vnd,foo.yaml` 。
  - 如果绑定是特定于总线的，你可以将其对应总线附加到文件名；例如，如果绑定 YAML 中声明 `on-bus: bar` ，你可以将文件命名为 `vnd,foo-bar.yaml` 。
- 提交绑定时，要求完成所有在 [属性默认值](#default-属性--为属性设置默认值) 中提及的推荐项。

  特别是，如果你使用 `default:` 特性，则必须证明属性描述中的值是正确的。

- 写 `description:` 属性的描述字符串时，以下两种写法是可行的。

  如果你的描述很短，单行完成描述即可：

  ```yaml
  description: my short string
  ```

  如果你的描述很长或需要跨越多行，则必须使用以下样式：

  ```yaml
  description: |
    My very long string
    goes here.
    Look at all these lines!
  ```

  `|` 样式防止 YAML 解析器删除多行描述中的换行符。并且，这一样式使这些长字符串在 [绑定索引](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html#devicetree-binding-index) 中可以正确显示。

  不要对长字符串或多行字符串使用任何其他样式。

- 不要在属性名称中使用大写字母（ `A` 到 `Z` ）或下划线 ( `_` )。大写字母都应替换为小写（ `a` 到 `z` ），下划线都应替换为破折号 ( `-` ) 。（此规则的一个例外是，如果你要从 Linux 之类的某个地方复制完善的绑定，但此绑定本身命名未遵循此规则时可以忽略。）

### vendor 前缀规则

vendor 前缀指 [compatible](./intro.md#重要属性) 属性中的供应商前缀。 vendor 适用于以下一般规则。

- 如果你的设备是由特定供应商制造的，则其 compatible 属性应包含 vendor 前缀。

  如果你的绑定所描述的硬件，来自 [dts/bindings/vendor-prefixes.txt](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/dts/bindings/vendor-prefixes.txt) 中列出的知名供应商，则必须使用此文件中描述的该供应商前缀。

- 如果你的设备不是由特定硬件供应商制造的，请 **不要** 发明供应商前缀。对 compatible 属性而言，供应商前缀不是强制性的，除非它们指的是实际的供应商否则 compatible 不应包含它们。这条规则有一些例外，但强烈反对这种做法。

- 不要向 Zephyr 的 `dts/bindings/vendor-prefixes.txt` 文件提交新增内容，除非你还包括新前缀的使用者。这意味着在对此文件提交内容的同时，至少还需包含一个绑定和一个使用此供应商前缀的设备树，并且理想情况下应该包括一个处理其 compatible 的设备驱动程序。

  对于自定义绑定，你可以任何在 [DTS_ROOT](../../application/application_development.md#设备树定义) 中的目录中，添加自定义的 `dts/bindings/vendor-prefixes.txt` 文件。因为设备树工具将优先采用这些前缀，所以你可以在自己的绑定或设备树中使用它们，且不会生成警告或错误。

- 我们有时会更新 Zephyr 的 vendor-prefixes.txt 文件 —— 同步存在于 Linux 内核的等效文件；此过程不受先前规则的约束。

- 如果你的绑定描述了一个抽象类型的硬件，并且由特定于 Zephyr 的驱动程序处理节点，通常最好使用 `zephyr` 作为供应商前缀。请参见 [特定于 Zephyr 的绑定 (zephyr)](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html#dt-vendor-zephyr) 查看相关示例。

### 默认值规则

在任何情况下，在设备树绑定中使用 `default:` 时，在该属性的 `description:` 中必须解释，为什么选择该值，以及什么情况下需要提供不同值。此外，如果对一个属性的更改，需要关联修改另一个属性，以创建一致的配置，那么这些属性应当声明为 required 。

对于具体的默认值是不需要文档的；因为在 [绑定索引](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html#devicetree-binding-index) 的输出内容中已经包含了。

使用  `default:` 是存在风险的，因为绑定中的值对于特定板或硬件配置可能并不正确。例如，在充电 IC 绑定中，为连接的电池容量设置默认值可能是不正确的。对于此类属性，最好将属性设置为 `required: true` ，强制用户做出明确的选择。

驱动程序开发人员在确认 default 的取值之前，应该通过他们最科学的判断，来确认某个默认值是否安全。可设默认值的选项包括：

- 延迟值，这类延迟只有在不寻常的条件（例如在开发板上存在其他硬件可以让此延迟变长或变短）下才会导致出现不同结果
- 特定设备的配置，这些设备（例如 USB 音频耳机）具有标准初始配置
- 上电即重置的默认值，通常由与供应商指定的（只要它们与其他属性互不影响）

以下示例，描述了如何根据这些规则编写描述：

```yaml
properties:
  cs-interval:
    type: int
    default: 0
    description: |
      Minimum interval between chip select deassertion and assertion.
      The default corresponds to the reset value of the register field.
  hold-time-ms:
    type: int
    default: 20
    description: |
      Amount of time to hold the power enable GPIO asserted before
      initiating communication. The default was recommended in the
      manufacturer datasheet, and would only change under very
      cold temperatures.
```

再举一些 **错误** 的例子，并解释为什么不该这么做：

```yaml
properties:
  # 描述中未提及任何关于默认值的信息
  foo:
    type: int
    default: 1
    description: number of foos

  # 描述中未提及为何默认值选择此值
  bar:
    type: int
    default: 2
    description: bar size; default is 2

  # 通过在注释中解释默认值。这种做法会导致绑定索引中看不到这一描述。
  baz:
    type: int
    # 厂商推荐使用此值作为默认值.
    default: 2
    description: baz time in milliseconds
```

## 推断绑定

通过观察在节点属性中的值， Zephyr 的设备树脚本可以“推断”出特殊 `/zephyr,user` 节点所匹配的绑定。

该节点所匹配的绑定，由构建系统根据最终设备树中的属性值动态创建。它没有 `compatible` 属性。

这样的节点可用于示例代码和应用程​​序。当只需要一些简单的属性（例如存储硬件相关的值、指针或 GPIO 引脚）时，设备树 API 只充当一个便于使用的容器角色。

以下方 DTS 片段为例：

```c
#include <zephyr/dt-bindings/gpio/gpio.h>

/ {
     zephyr,user {
             boolean;
             bytes = [81 82 83];
             number = <23>;
             numbers = <1>, <2>, <3>;
             string = "text";
             strings = "a", "b", "c";

             handle = <&gpio0>;
             handles = <&gpio0>, <&gpio1>;
             signal-gpios = <&gpio0 1 GPIO_ACTIVE_HIGH>;
     };
};
```

你可以像这样获取一些简单值：

```c
#define ZEPHYR_USER_NODE DT_PATH(zephyr_user)

DT_PROP(ZEPHYR_USER_NODE, boolean) // 1
DT_PROP(ZEPHYR_USER_NODE, bytes)   // {0x81, 0x82, 0x83}
DT_PROP(ZEPHYR_USER_NODE, number)  // 23
DT_PROP(ZEPHYR_USER_NODE, numbers) // {1, 2, 3}
DT_PROP(ZEPHYR_USER_NODE, string)  // "text"
DT_PROP(ZEPHYR_USER_NODE, strings) // {"a", "b", "c"}
```

对于 `handle` and `handles` 属性中的 phandle ，你可以通过以下方式将其转换为设备指针：

```c
/*
 * 等同于
 *
 * ... my_dev = DEVICE_DT_GET(DT_NODELABEL(gpio0));
 */
const struct device *my_device =
     DEVICE_DT_GET(DT_PROP(ZEPHYR_USER_NODE, handle));

#define PHANDLE_TO_DEVICE(node_id, prop, idx) \
     DEVICE_DT_GET(DT_PHANDLE_BY_IDX(node_id, prop, idx)),

/*
 * 等同于
 *
 * ... *my_devices[] = {
 *         DEVICE_DT_GET(DT_NODELABEL(gpio0)),
 *         DEVICE_DT_GET(DT_NODELABEL(gpio1)),
 * };
 */
const struct device *my_devices[] = {
     DT_FOREACH_PROP_ELEM(ZEPHYR_USER_NODE, handles, PHANDLE_TO_DEVICE)
};
```

以及，你可以将 `signal-gpios` 中定义的引脚转换为 `struct gpio_dt_spec` ，然后像这样使用它：

```c
#include <zephyr/drivers/gpio.h>

#define ZEPHYR_USER_NODE DT_PATH(zephyr_user)

const struct gpio_dt_spec signal =
        GPIO_DT_SPEC_GET(ZEPHYR_USER_NODE, signal_gpios);

/* Configure the pin */
/* 配置 */
gpio_pin_configure_dt(&signal, GPIO_OUTPUT_INACTIVE);

/* Set the pin to its active level */
/* 设置引脚到高位 */
gpio_pin_set_dt(&signal, 1);
```

（对于 [`gpio_dt_spec`](https://docs.zephyrproject.org/latest/hardware/peripherals/gpio.html#c.gpio_dt_spec) 、 [`GPIO_DT_SPEC_GET`](https://docs.zephyrproject.org/latest/hardware/peripherals/gpio.html#c.GPIO_DT_SPEC_GET) 和 [`gpio_pin_configure_dt()`](https://docs.zephyrproject.org/latest/hardware/peripherals/gpio.html#c.gpio_pin_configure_dt) 的用法请参考这些 API 文档中的描述。）
