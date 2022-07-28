# 设备树操作指引

阅读完本文，你将学会按步骤使用设备树完成任务。

:::tip 提示
参考 [设备树问题排查](./troubleshooting.md) 了解一些解决问题的思路。
:::

## 获取你的设备树与生成的头文件

一个板型的设备树 ( [BOARD.dts](https://docs.zephyrproject.org/latest/build/dts/intro.html#devicetree-in-out-files) ) 是通过 `#include` 预处理器指令来引入公共节点定义的。这一操作至少会 include  SoC 的 `.dtsi` 。查看这些文件是理解设备树内容的方法之一，例如查看 `dts/<ARCH>/<vendor>/<soc>.dtsi` ，但这可能耗费大量时间。

如果你只想查看你的板型的“最终”设备树，只需成功构建一个应用程序，并打开构建目录中的 `zephyr.dts` 文件（路径一般为 `build/zephyr/zephyr.dts` ）。

:::tip 提示
你可以通过为你的板型构建 [Hello World](https://docs.zephyrproject.org/latest/samples/hello_world/README.html#hello-world) 查看“基础”设备树，因为这一结果没有受任何 [overlay 文件](./intro.md#输入文件) 影响。
:::

例如，使用 `csk6002_9s_nano` 构建 [Hello World](https://docs.zephyrproject.org/latest/samples/hello_world/README.html#hello-world) ：

```
# 此处的 --cmake-only 目的是为了节省时间，
# 它会强制让 CMake 运行，并跳过构建过程。
lisa zep build -b csk6002_9s_nano samples/hello_world --cmake-only
```

你也可以将 `csk6002_9s_nano` 替换成你的板型。

CMake 将打印输入和输出文件的位置，如下所示：

```
-- Found BOARD.dts: .../zephyr/boards/arm/csk6002_9s_nano/csk6002_9s_nano.dts
-- Generated zephyr.dts: .../build/zephyr/zephyr.dts
-- Generated devicetree_unfixed.h: .../build/zephyr/include/generated/devicetree_unfixed.h
```

DTS 格式文件 `zephyr.dts` 即为最终设备树。

`devicetree_unfixed.h` 文件则是与其对应的生成头文件。

请参阅 [输入和输出文件](./intro.md#输入与输出文件) 了解这么文件的详细信息。

## 从设备树节点获取设备结构体（`struct device`）

在编写 Zephyr 应用程序时，你通常希望获得与设备树节点对应的驱动程序级 [struct device](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#device-model-api) 变量。

假设你要从这个设备树片段中获取 `serial@40002000` 的 `struct device` ：

```c
/ {
        soc {
                serial0: serial@40002000 {
                        status = "okay";
                        current-speed = <115200>;
                        /* ... */
                };
        };

        aliases {
                my-serial = &serial0;
        };

        chosen {
                zephyr,console = &serial0;
        };
};
```

首先为你感兴趣的设备节点定义一个 [节点 id](./api_usage.md#节点-id) 。下面的例子展示了可达成目的的不同方法，你可以从中选择最满足你需求的方式：

```c
/* 方法 1: 通过节点标签 */
#define MY_SERIAL DT_NODELABEL(serial0)

/* 方法 1: 通过节点别名 */
#define MY_SERIAL DT_ALIAS(my_serial)

/* 方法 1: 通过 chosen 节点 */
#define MY_SERIAL DT_CHOSEN(zephyr_console)

/* 方法 1: 通过路径 */
#define MY_SERIAL DT_PATH(soc, serial_40002000)
```

获得节点 id 后，有两种方法可以获取设备。一种方法是使用 [`DEVICE_DT_GET()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.DEVICE_DT_GET) ：

```c
const struct device *uart_dev = DEVICE_DT_GET(MY_SERIAL);

if (!device_is_ready(uart_dev)) {
        /* Not ready, do not use */
        return -ENODEV;
}
```

[`DEVICE_DT_GET()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.DEVICE_DT_GET) 有多种变体，例如 [`DEVICE_DT_GET_OR_NULL()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.DEVICE_DT_GET_OR_NULL) 、 [`DEVICE_DT_GET_ONE()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.DEVICE_DT_GET_ONE) 或 [`DEVICE_DT_GET_ANY()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.DEVICE_DT_GET_ANY) 。这个惯用方式在构建时获取设备指针，这意味着没有运行时的性能损失。如果要将设备指针存储为配置数据，此方法很有用。但由于设备可能未初始化或初始化失败，因此在将设备指针传递给任何 API 函数之前，你必须验证设备是否已准备好被使用。 （此检查由 [`device_get_binding()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.device_get_binding) 为你完成。）

在某些情况下，设备在构建时是未知的，例如，有时设备需要通过用户输入（比如 shell ）来确认。这种情况下，你可以通过将 [`DT_LABEL()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_LABEL) 与 [`device_get_binding()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.device_get_binding) 组合来获取 `struct device` ：

```c
const struct device *uart_dev = device_get_binding(DT_LABEL(MY_SERIAL));
```

然后，你可以将 `uart_dev` 用于 [UART](https://docs.zephyrproject.org/latest/hardware/peripherals/uart.html#uart-api) API 函数（如 [`uart_configure()`](https://docs.zephyrproject.org/latest/hardware/peripherals/uart.html#c.uart_configure) ）。其他设备类型所使用的代码也与此类似；只需确保为设备使用正确的 API。

无需将 `label` 属性覆盖为其他内容：只需创建一个节点标识符并将其传递给 `DT_LABEL` 以获取正确的字符串以传递给 `device_get_binding()` 。

如果你遇到问题，请参阅 [设备树问题排查](./troubleshooting.md) 。首先要检查的是节点的 `status = "okay"` ，像这样：

```c
#define MY_SERIAL DT_NODELABEL(my_serial)

#if DT_NODE_HAS_STATUS(MY_SERIAL, okay)
const struct device *uart_dev = DEVICE_DT_GET(MY_SERIAL);
#else
#error "Node is disabled"
#endif
```

如果你看到此 `#error` 输出，请确保你已经启用了该设备树节点。在某些情况下，你的代码虽然会编译，但无法链接到类似于以下内容的消息：

```
...undefined reference to `__device_dts_ord_N'
collect2: error: ld returned 1 exit status
```

这可能意味着，存在某个 Kconfig 问题，阻止了设备驱动程序的构建，导致引用不生效。如果你的代码可以编译成功，最后要做的是，通过以下方式检查设备是否准备就绪：

```c
if (!device_is_ready(uart_dev)) {
     printk("Device not ready\n");
}
```

如果你发现设备没有准备就绪，很可能是设备的初始化功能失败了。在这种情况下，启用日志记录或对驱动程序代码进行调试，可能会有所帮助。请注意，你还可以使用 [`device_get_binding()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.device_get_binding) 在运行时获取对设备引用。如果它返回 `NULL` ，则可能意味着设备的驱动程序无法初始化或根本不存在。

## 找到设备树绑定

[设备树绑定](./bindings.md) 是 YAML 文件，它声明了你可以对其描述的节点执行什么操作，因此能够为你正在使用的节点找到绑定至关重要。

首先，先参考 [获取你的设备树与生成的头文件](#获取你的设备树与生成的头文件) ，确保所需的设备树头文件已经生成。然后，打开生成的头文件，在以下述注释开头的块注释中，可以看到一个节点列表：

```c
/*
 * [...]
 * Nodes in dependency order (ordinal and path):
 *   0   /
 *   1   /aliases
 *   2   /chosen
 *   3   /flash@0
 *   4   /memory@20000000
 *          (etc.)
 * [...]
 */
```

先记下要查找的节点的路径，例如 `/flash@0` 。在文件中搜索这一节点的内容，如果节点具有匹配的绑定，那它应该以类似下面的内容开头：

```c
/*
 * Devicetree node:
 *   /flash@0
 *
 * Binding (compatible = soc-nv-flash):
 *   $ZEPHYR_BASE/dts/bindings/mtd/soc-nv-flash.yaml
 * [...]
 */
```

如果这一过程遇到问题，可参阅 [问题排查中的检查缺失的绑定](./troubleshooting.md#检查缺失的绑定) 。

## 设置设备树 overlay

设备树 overlay 在 [设备树概述](./intro.md) 中进行了介绍。 CMake 变量 **DTC_OVERLAY_FILE** 包含要使用的 overlay 文件的列表，每个文件用 *空格* 或 *分号* 分隔。如果 **DTC_OVERLAY_FILE** 指定了多个文件，它们将由 C 预处理器按指定的顺序包含。

你可以设置 **DTC_OVERLAY_FILE** 用于包含你要使用的文件。这里提供一个使用 `lisa zep build` 的 [示例](../../tool/lisa_plugin_zephyr/build_flash_debug.md) 。

如果你没有设置 **DTC_OVERLAY_FILE** ，构建系统将按照以下步骤，在你的应用程序源目录中查找文件以用作设备树 overlay ：

1. 如果存在 `boards/<BOARD>.overlay` 文件，则直接使用。
2. 如果当前板型存在 [多个修订版](https://docs.zephyrproject.org/latest/hardware/porting/board_porting.html#porting-board-revisions) ，并且存在 `boards/<BOARD>_<revision>.overlay` 文件，那么该 overlay 文件将被使用。如果 `boards/<BOARD>.overlay` 存在，那么会两者将组合在一起在构建系统中使用。
3. 如果上一步中已经找到了一个或多个文件，构建系统就停止继续查找。
4. 否则，如果 `<BOARD>.overlay` 文件存在，那么它将被使用，并且构建系统将停止查找过程。
5. 再不然，如果 `app.overlay` 存在就会被使用。

使用 [Shields](https://docs.zephyrproject.org/latest/hardware/porting/shields.html#shields) 也可以添加设备树 overlay 文件。

**DTC_OVERLAY_FILE** 的值存储在 CMake 缓存中并在后续构建中使用。

[构建系统](../cmake/index.md) 会在配置阶段打印找到的所有设备树 overlay ，如下所示：

```
-- Found devicetree overlay: .../some/file.overlay
```

## 使用设备树 overlay

先根据 [设置设备树 overlay](#设置设备树-overlay) 的描述为你的构建添加一个 overlay 。

overlay 可以使用多种方式覆盖节点属性值。例如，假设你的 `BOARD.dts` 中包含以下节点：

```c
/ {
        soc {
                serial0: serial@40002000 {
                        status = "okay";
                        current-speed = <115200>;
                        /* ... */
                };
        };
};
```

在 overlay 中覆盖 `current-speed` 属性值的等价方式是：

```c
/* Option 1 */
&serial0 {
     current-speed = <9600>;
};

/* Option 2 */
&{/soc/serial@40002000} {
     current-speed = <9600>;
};
```

在下面的例子我们将使用 `&serial0` 的形式来引用这一节点。

你可以使用 overlay 在你的设备树中别名添加到：别名作为 `/aliases` 节点的一个属性。例如：

```c
/ {
     aliases {
             my-serial = &serial0;
     };
};
```

选择的节点也以相同的方式工作。例如：

```c
/ {
     chosen {
             zephyr,console = &serial0;
     };
};
```

删除一个属性（除了一般情况之外，如果 boolean 属性在 `BOARD.dts` 中，则代表它为 true ，以下是如何将 boolean 属性设置为 false ，具体描述可参考 [设置属性值](./intro.md#设置属性值) ）：

```
&serial0 {
     /delete-property/ some-unwanted-property;
};
```

你可以使用 overlay 添加子节点。例如，要在现有总线节点上配置 SPI 或 I2C 子设备，可执行以下操作：

```c
/* SPI device example */
&spi1 {
     my_spi_device: temp-sensor@0 {
             compatible = "...";
             label = "TEMP_SENSOR_0";
             /* 如有必要， reg 可作为片选数字;
              * 如果存在，它必须匹配到节点的单元地址。 */
             reg = <0>;

            /* 根据需要配置 SPI 设备的其他属性
             * 找到你的设备的设备树绑定了解详细信息。 */
             spi-max-frequency = <4000000>;
     };
};

/* I2C device example */
&i2c2 {
     my_i2c_device: touchscreen@76 {
             compatible = "...";
             label = "TOUCHSCREEN";
             /* reg 是 I2C 设备的地址。
              * 如果存在，它必须匹配到节点的单元地址。 */
             reg = <76>;

            /* 根据需要配置 I2C 设备的其他属性
             * 找到你的设备的设备树绑定了解详细信息。 */
     };
};
```

其他总线设备也可以类似配置：

- 将设备创建为父总线的子节点
- 根据其绑定设置其属性

假设你有一个合适设备驱动程序，与 `my_spi_device` 和 `my_i2c_device` 的 compatible 相关联，那么你可通过 Kconfig 启用驱动程序，并根据你新添加的总线节点 [获取设备结构体](#从设备树节点获取设备结构体struct-device) ，然后将其与该驱动程序 API 一起使用。

## 使用设备树 API 编写设备驱动

“设备树感知”[设备驱动程序](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#device-model-api) （即驱动程序可通过设备树来确认需驱动哪些设备）应该为每个配置 `status = "okay"` 的设备树节点创建一个 `struct device` ，该节点具有驱动程序支持的特定 [compatible](./intro.md#重要属性) （或相关的 compatible 集合）。

编写“设备树感知”驱动程序，首先要为驱动程序支持的设备定义一个 [设备树绑定](./bindings.md) 。使用来自驱动程序中的现有绑定作为起点。开始的绑定脚手架只需要这样：

```yaml
description: <Human-readable description of your binding>
compatible: "foo-company,bar-device"
include: base.yaml
```

有关查找现有绑定的更多建议，请参阅 [查找设备树绑定](#找到设备树绑定) 。

编写绑定后，你的驱动程序 C 文件可以使用设备树 API 查找满足 compatible 描述的 `status = "okay"` 节点，并为每个节点实例化一个 `struct device` 。实例化每个 `struct device` 有两种选择：使用实例编号和使用节点标签。

对应每一种情况：

- 每个 `struct device` 的名称都应设置为其设备树节点的标签 `label` 属性。这允许驱动程序的使用者以通常的方式 [从设备树节点获取设备结构体](#从设备树节点获取设备结构体struct-device) 。
- 每个设备的初始配置应尽可能使用来自设备树属性的值。这允许使用者使用 [设备树 overlay](#使用设备树-overlay) 来配置驱动程序。

以下是如何执行此操作的示例。这些示例均假设你已经实现了特定于设备的配置和数据结构以及 API 函数，如下所示：

```c
/* my_driver.c */
#include <zephyr/drivers/some_api.h>

/* 定义数据 (RAM) 和配置 (ROM) 结构: */
struct my_dev_data {
     /* 存储在 RAM 中的每个设备的值*/
};
struct my_dev_cfg {
     uint32_t freq; /* Just an example: initial clock frequency in Hz */
     /* 存储在 ROM 中的配置 */
};

/* 实现驱动的 API 函数 (drivers/some_api.h 回调): */
static int my_driver_api_func1(const struct device *dev, uint32_t *foo) { /* ... */ }
static int my_driver_api_func2(const struct device *dev, uint64_t bar) { /* ... */ }
static struct some_api my_api_funcs = {
     .func1 = my_driver_api_func1,
     .func2 = my_driver_api_func2,
};
```

### 方式 1：通过实例编号创建设备

请尽可能使用此方式，本方式使用 [基于实例的 API](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-inst-apis) 。但是，它们仅当设备树节点与驱动程序的 `compatible` 是等效时才起作用，并且你不需要能够区分它们。

为了使用基于实例的 API，首先需要将 `DT_DRV_COMPAT` 定义为设备驱动程序支持的 compatible （小写和下划线版本）。例如，如果你的驱动程序的 compatible 对应设备树中的 `vnd_my_device` ，你需要在驱动程序 C 文件中将 `DT_DRV_COMPAT` 定义为 `vnd_my_device` ：

```c
 /*
 * 将此行定义置于源码文件的顶部。位于 include 区域之后就挺好。
 * (你可以在 Zephry git 仓库运行 "git grep DT_DRV_COMPAT drivers" 查看
 * 那些使用此样式声明的示例驱动程序)。
 */
#define DT_DRV_COMPAT vnd_my_device
```

:::tip 重要
正如示例中的形式， `DT_DRV_COMPAT` 宏不应包含引号或特殊字符。从 compatible 属性创建 `DT_DRV_COMPAT` 时，应当删除引号并将特殊字符转换为下划线。
:::

最后，定义一个实例化宏，它使用实例编号创建每个设备结构体 `struct device` 。在定义 `my_api_funcs` 之后执行此操作。

```c
/*
 * 这一实例化宏命名为 "CREATE_MY_DEVICE" 。
 * 其 "inst" 参数表示任一实例编号。
 *
 * 将此代码段放着文件末尾，例如在定义 "my_api_funcs" 之后。
 */
#define CREATE_MY_DEVICE(inst)                                       \
     static struct my_dev_data my_data_##inst = {                    \
             /* initialize RAM values as needed, e.g.: */            \
             .freq = DT_INST_PROP(inst, clock_frequency),            \
     };                                                              \
     static const struct my_dev_cfg my_cfg_##inst = {                \
             /* initialize ROM values as needed. */                  \
     };                                                              \
     DEVICE_DT_INST_DEFINE(inst,                                     \
                           my_dev_init_function,                     \
                           NULL,                                     \
                           &my_data_##inst,                          \
                           &my_cfg_##inst,                           \
                           MY_DEV_INIT_LEVEL, MY_DEV_INIT_PRIORITY,  \
                           &my_api_funcs);
```

注意使用 [`DT_INST_PROP()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_INST_PROP) 和 [`DEVICE_DT_INST_DEFINE()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.DEVICE_DT_INST_DEFINE) 等 API 来访问设备树节点数据。这些 API 从设备树中检索实例编号为 `inst` 的节点数据——其中判断节点满足条件的依据是，检查 compatible 是否与 `DT_DRV_COMPAT` 对应。

最后，将实例化的宏传给 [`DT_INST_FOREACH_STATUS_OKAY()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_INST_FOREACH_STATUS_OKAY) ：

```c
/* 对每一个实例，调用创建设备的宏: */
DT_INST_FOREACH_STATUS_OKAY(CREATE_MY_DEVICE)
```

`DT_INST_FOREACH_STATUS_OKAY` 将展开为代码段，该代码为每个启用的节点（其 compatible 与 `DT_DRV_COMPAT` 对应）调用一次 `CREATE_MY_DEVICE` 。它不会在 `CREATE_MY_DEVICE` 扩展的末尾附加分号，因此 `CREATE_MY_DEVICE` 的扩展必须以分号或代表函数的宏（此宏的定义中也需要以分号结尾）结尾以支持多个设备。

### 方式 2：通过节点标签创建设备

某些设备驱动程序不能使用实例编号。例如，一个 SoC 外设驱动程序，它依赖于专门针对各个 IP 块的供应商 HAL API 来实现 Zephyr 驱动程序回调。此类情况应使用 [`DT_NODELABEL()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_NODELABEL) 来引用设备树中代表 SoC 上支持的外设的各个节点。然后可以使用 devicetree.h [通用 API](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-generic-apis) 访问节点数据。

为此，必须在你的 [SoC 的 dtsi 文件](./intro.md#输入文件) 中，为你的驱动程序支持的 IP 块定义适合的节点标签，如 `mydevice0` 、 `mydevice1` 等。生成的设备树通常看起来像这样：

```c
/ {
        soc {
                mydevice0: dev@0 {
                        compatible = "vnd,my-device";
                };
                mydevice1: dev@1 {
                        compatible = "vnd,my-device";
                };
        };
};
```

驱动程序可以使用设备树中的节点标签 `mydevice0` 和 `mydevice1` 对特定设备节点进行操作：

```c
/*
 * 创建此宏可便于为对应设备创建节点 id 。
 * 例如使用 MYDEV(0) 来引用标签为 "mydevice0" 的节点。
 */
#define MYDEV(idx) DT_NODELABEL(mydevice ## idx)

/*
 * 定义你的实例化宏； "idx" 是索引，表示与设备有对应关系的数字，
 * 例如 mydevice0 对应 0 ，mydevice1 对应 1 。
 * 其中将使用 MYDEV() 创建由索引得出的节点标签。
 */
#define CREATE_MY_DEVICE(idx)                                        \
     static struct my_dev_data my_data_##idx = {                     \
             /* initialize RAM values as needed, e.g.: */            \
             .freq = DT_PROP(MYDEV(idx), clock_frequency),           \
     };                                                              \
     static const struct my_dev_cfg my_cfg_##idx = { /* ... */ };    \
     DEVICE_DT_DEFINE(MYDEV(idx),                                    \
                     my_dev_init_function,                           \
                     NULL,                                           \
                     &my_data_##idx,                                 \
                     &my_cfg_##idx,                                  \
                     MY_DEV_INIT_LEVEL, MY_DEV_INIT_PRIORITY,        \
                     &my_api_funcs)
```

要访问设备树节点数据时，请注意 [`DT_PROP()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_PROP) 和 [`DEVICE_DT_DEFINE()`](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.DEVICE_DT_DEFINE) 等 API 的用法。

最后，通过定义宏手动检测每个设备树节点是否启用，并使用 `CREATE_MY_DEVICE` 实例化每个 `struct device` ：

```c
#if DT_NODE_HAS_STATUS(DT_NODELABEL(mydevice0), okay)
CREATE_MY_DEVICE(0)
#endif

#if DT_NODE_HAS_STATUS(DT_NODELABEL(mydevice1), okay)
CREATE_MY_DEVICE(1)
#endif
```

这种调用形式不使用 `DT_INST_FOREACH_STATUS_OKAY()` ，因此驱动程序作者需要负责为每个可能满足条件的节点调用 `CREATE_MY_DEVICE()` ，例如根据受 SoC 上可支持外设的有关信息，来判断是否可满足条件。

## 依赖其他设备的设备驱动

有时，一个`struct device` 依赖于另一个 `struct device` 并需要一个可指向它的指针。例如，传感器设备可能需要指向其 SPI 总线控制器设备的指针。对此有一些建议：

- 在编写你的设备树绑定时，尽可能以使用由 devicetree.h 的 [硬件特定 API](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-hw-api) 批准的方式。

- 特别是，对于总线设备，你的驱动程序绑定应该 include 例如 [dts/bindings/spi/spi-device.yaml](https://cloud.listenai.com/zephyr/zephyr/-/blob/master/dts/bindings/spi/spi-device.yaml) 的文件，它为设备提供一些通用定义，用于特定总线寻址。这允许使用 [`DT_BUS()`](https://docs.zephyrproject.org/latest/build/dts/api/api.html#c.DT_BUS) 之类的 API 来获取总线节点的节点 id 。然后，你可以对总线使用 [从设备树节点获取设备结构体](#从设备树节点获取设备结构体struct-device) 的一般方式。

可搜索现有绑定和设备驱动程序以获取示例。

## 依赖开发板特定设备的应用

如果想要应用程序代码未经修改即可在多个板上运行，你可以通过设备树别名来指定硬件特定部分，就像在 [GPIO 示例](../../application/peripheral/samples/gpio.md) 中所做的那样。然后可以在 [BOARD.dts](./intro.md#输入与输出文件) 文件中或通过 [设备树 overlay](#使用设备树-overlay) 配置应用程序。