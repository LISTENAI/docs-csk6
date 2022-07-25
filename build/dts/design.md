# 设计目标

Zephyr’s use of devicetree has evolved significantly over time, and further changes are expected. The following are the general design goals, along with specific examples about how they impact Zephyr’s source code, and areas where more work remains to be done.

随着时间的推移，Zephyr 对设备树的使用发生了显着变化，预计还会有进一步的变化。以下是基础设计目标，以及有关它们如何影响 Zephyr 源代码的具体示例，以及仍有更多工作要做的方面。

## Single source for all hardware information 所有硬件信息的单一来源

Zephyr shall obtain its hardware descriptions exclusively from devicetree.

Zephyr 应仅从设备树获取其硬件描述。

### Examples 例如

- New device drivers shall use devicetree APIs to determine which [devices to create](https://docs.zephyrproject.org/latest/build/dts/howtos.html#dt-create-devices) if possible.

  如果可能，新设备驱动程序应使用设备树 API 来确定要[创建的设备](./howtos.md#使用设备树-api-编写设备驱动)。

- In-tree sample applications shall use [aliases](https://docs.zephyrproject.org/latest/build/dts/intro.html#dt-alias-chosen) to determine which of multiple possible generic devices of a given type will be used in the current build. For example, the [Blinky](https://docs.zephyrproject.org/latest/samples/basic/blinky/README.html#blinky-sample) uses this to determine the LED to blink.

  树内示例应用程序应使用 [别名](./intro.md#别名-alias-与被选中的节点-chosen-nodes-) 来确定，从给定类型的多个可能的通用设备中，选择哪一个将在当前构建中使用。例如， [GPIO 示例](../../application/peripheral/samples/gpio.md) 使用这一方式来确定要闪烁的 LED 。

- Boot-time pin muxing and pin control can be accomplished via devicetree.

  引导时生效的引脚复用和引脚控制可以通过设备树完成。

### Example remaining work 仍需改进的工作

- Zephyr’s [Test Runner (Twister)](https://docs.zephyrproject.org/latest/develop/test/twister.html#twister-script) currently use `board.yaml` files to determine the hardware supported by a board. This should be obtained from devicetree instead.

  Zephyr 的 [测试运行器 (Twister)](https://docs.zephyrproject.org/latest/develop/test/twister.html#twister-script) 目前使用 `board.yaml` 文件来确定板型支持的硬件。应当从设备树获得这些内容。

- Various device drivers currently use Kconfig to determine which instances of a particular compatible are enabled. This can and should be done with devicetree overlays instead.

  当前，多个设备驱动程序使用 Kconfig 来确定启用了特定兼容的哪些实例。这可以且应当使用设备树覆盖来完成。

- Board-level documentation still contains tables of hardware support which are generated and maintained by hand. This can and should be obtained from the board level devicetree instead.

  板型级别的文档仍然包含手动生成和维护的硬件支持表。这可以且应当替换为从板型级别的设备树中生成。

- Runtime determination of `struct device` relationships should be done using information obtained from devicetree, e.g. for device power management.

  运行时确定 `struct device` 设备结构体关系的操作，应该使用从设备树获得的信息来完成，例如用于设备电源管理 device power management 。

## Source compatibility with other operating systems 与其他操作系统的源代码兼容性

Zephyr’s devicetree tooling is based on a generic layer which is interoperable with other devicetree users, such as the Linux kernel.

Zephyr 的设备树工具基于通用层，可与其他设备树用户（例如 Linux 内核）之间是操作兼容的。

Zephyr’s binding language *semantics* can support Zephyr-specific attributes, but shall not express Zephyr-specific relationships.

Zephyr 的绑定语言 *语义* 可以支持 Zephyr 特定的属性，但不应只为表达 Zephyr 特定的关系。

### Examples 例如

- Zephyr’s devicetree source parser, [dtlib.py](https://docs.zephyrproject.org/latest/build/dts/intro.html#dt-scripts), is source-compatible with other tools like [dtc](https://git.kernel.org/pub/scm/utils/dtc/dtc.git/about/) in both directions: `dtlib.py` can parse `dtc` output, and `dtc` can parse `dtlib.py` output.

  Zephyr 的设备树源码解析器 [dtlib.py](./intro.md#脚本与工具) 在两个方向上都与 [dtc](https://git.kernel.org/pub/scm/utils/dtc/dtc.git/about/) 等其他工具从源码上兼容： `dtlib.py` 可以解析 `dtc` 输出， `dtc` 可以解析 `dtlib.py` 输出。

- Zephyr’s “extended dtlib” library, `edtlib.py`, shall not include Zephyr-specific features. Its purpose is to provide a higher-level view of the devicetree for common elements like interrupts and buses.

  `edtlib.py` 作为 Zephyr 的“扩展 dtlib”库，不应包含 Zephyr 特定的功能。其目的是为中断和总线等常见元素提供设备树的更高级别视图。

- Only the high-level `gen_defines.py` script, which is built on top of `edtlib.py`, contains Zephyr-specific knowledge and features.

  只有高级 `gen_defines.py` （构建在 `edtlib.py` 之上）脚本包含 Zephyr 特定的知识和特性。

### Example remaining work 仍需改进的工作

- Zephyr has a custom [Devicetree bindings](https://docs.zephyrproject.org/latest/build/dts/bindings.html#dt-bindings) language *syntax*. While Linux’s dtschema does not yet meet Zephyr’s needs, we should try to follow what it is capable of representing in Zephyr’s own bindings.

  Zephyr 使用一种自定义的设备树绑定 *语法* 。虽然 Linux 的 dtschema 语法尚不能满足 Zephyr 的需求，但我们应该尝试遵循 dtschema 语法在 Zephyr 自己的绑定中能够表示的内容。

- Due to inflexibility in the bindings language, Zephyr cannot support the full set of bindings supported by Linux.

  由于绑定语言的不灵活性，Zephyr 无法支持 Linux 支持的全套绑定。

- Devicetree source sharing between Zephyr and Linux is not done.

  Zephyr 和 Linux 之间的设备树源代码共享尚未完成。