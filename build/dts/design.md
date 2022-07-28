# 设计目标

随着时间的推移，Zephyr 对设备树的使用发生了显著变化，且预计还会继续演化。以下是一些通用的设计目标以及它们如何影响 Zephyr 源代码的具体示例，并阐述在哪方面仍然需要做更多的工作。

## 作为所有硬件信息的单一来源

Zephyr 应仅从设备树获取其硬件描述。

### 举例

- 新设备驱动程序应尽可能使用设备树 API 来确定要[创建的设备](./howtos.md#使用设备树-api-编写设备驱动)。
- 树内示例应用程序应使用 [别名](./intro.md#别名-alias-与被选中的节点-chosen-nodes-) 来确定，从给定类型的多个可能的通用设备中，选择哪一个将在当前构建中使用。例如， [GPIO 示例](../../application/peripheral/samples/gpio.md) 使用这一方式来确定要闪烁的 LED 。
- 启动时生效的引脚复用和引脚控制可以通过设备树完成。

### 仍需改进的工作

- Zephyr 的 [测试运行器 (Twister)](https://docs.zephyrproject.org/latest/develop/test/twister.html#twister-script) 目前使用 `board.yaml` 文件来确定板型支持的硬件。应当从设备树获得这些内容。
- 当前，多个设备驱动程序使用 Kconfig 来确定启用了特定兼容的哪些实例。这可以且应当使用设备树覆盖来完成。
- 板型级别的文档仍然包含手动生成和维护的硬件支持表。这可以且应当替换为从板型级别的设备树中生成。
- 运行时确定 `struct device` 设备结构体关系的操作，应该使用从设备树获得的信息来完成，例如用于设备电源管理（ device power management ）。

## 保持与其他操作系统的源代码兼容性

Zephyr 的设备树工具是为了通用而设计的，对其他的设备树使用者（例如 Linux 内核）而言可实现操作兼容。

Zephyr 的绑定语言 *语义* 可以支持 Zephyr 特定的属性，但不应只为表达 Zephyr 特定的关系。

### 举例

- Zephyr 的设备树源码解析器 [dtlib.py](./intro.md#脚本与工具) 与 [dtc](https://git.kernel.org/pub/scm/utils/dtc/dtc.git/about/) 等其他工具从源码上双向兼容： `dtlib.py` 可以解析 `dtc` 输出， `dtc` 可以解析 `dtlib.py` 输出。
- `edtlib.py` 作为 Zephyr 的“扩展 dtlib”库，不应包含 Zephyr 特定的功能。其目的是为中断和总线等常见元素提供设备树的更高级别视图。
- 只有高级别的 `gen_defines.py` （构建在 `edtlib.py` 之上）脚本包含 Zephyr 特定的知识和特性。

### 仍需改进的工作

- Zephyr 使用一种自定义的设备树绑定 *语法* 。虽然 Linux 的 dtschema 语法尚不能满足 Zephyr 的需求，但我们应该尝试遵循 dtschema 语法在 Zephyr 自己的绑定中能够表示的内容。
- 由于绑定语言的不灵活性，Zephyr 无法支持 Linux 支持的全套绑定。
- Zephyr 和 Linux 之间的设备树源代码共享尚未完成。
