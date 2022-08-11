# Flash map

`<storage/flash_map.h>` API 允许通过 [flash_area](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.flash_area) 结构访问设备 flash 分区信息。

每个 `struct flash_area` 代表一个 flash 分区。该API提供对 “flash map” 的访问，其中包含预定义的 flash 区域，可通过全局唯一的 ID 号访问。你也可以在运行时为特定的应用程序创建 `flash_area` 结构。

`flash_area` 结构包含分区所属的 flash 设备的名称；此名称可以传递给 [device_get_binding()](https://zephyr-docs.listenai.com/reference/drivers/index.html#c.device_get_binding) 以获取可以使用 [flash API](https://zephyr-docs.listenai.com/reference/peripherals/flash.html#flash-api) 读取和写入的相应 [device](https://zephyr-docs.listenai.com/reference/drivers/index.html#c.device) 结构。`flash_area` 还包含设备所代表的 flash 内存中分区的起始偏移量和大小。

flash_map.h API 提供了对 `flash_area` 进行操作的函数。主要的示例是 [flash_area_read()](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.flash_area_read) 和 [flash_area_write()](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.flash_area_write)。这些函数基本是 flash API 的封装，并带有输入参数范围检查。不是所有 flash APIs 都有 flash_map.h 封装，但 [flash_area_get_device()](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.flash_area_get_device) 允许从 `struct flash_area` 中轻松获取 `struct device`。

使用 [flash_area_open()](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.flash_area_open) 获取 `struct flash_area`。这个函数接受一个 flash 区域 ID 号，并返回一个指向 flash 区域结构的指针。flash 区域的 ID 号可以使用 [FLASH_AREA_ID](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.FLASH_AREA_ID) 从可读的 "label" 中获取。这些描述可以从设备树中获取，如下所述。

## 与设备树的关系

flash_map.h API 使用 [设备树 API](https://zephyr-docs.listenai.com/reference/devicetree/api.html#devicetree-api) 生成的数据，特别是 [固定 flash 分区](https://zephyr-docs.listenai.com/reference/devicetree/api.html#devicetree-flash-api)。Zephyr 还具有一些用于通过 MCUboot bootloader [升级设备固件](https://zephyr-docs.listenai.com/guides/device_mgmt/dfu.html#dfu) 的分区约定，以及定义 [文件系统](https://zephyr-docs.listenai.com/reference/file_system/index.html#file-system-api) 或其他非易失性 [存储](../../service/storage/nvs.md) 可用的分区。

这是一个设备树的示例片段，它为 MCUboot 和存储分区使用固定 flash 分区。为了清楚起见，省略了一些细节。

```dts
/ {
	soc {
		flashctrl: flash-controller@deadbeef {
			flash0: flash@0 {
				compatible = "soc-nv-flash";
				reg = <0x0 0x100000>;

				partitions {
					compatible = "fixed-partitions";
					#address-cells = <0x1>;
					#size-cells = <0x1>;

					boot_partition: partition@0 {
						label = "mcuboot";
						reg = <0x0 0x10000>;
						read-only;
					};
					storage_partition: partition@1e000 {
						label = "storage";
						reg = <0x1e000 0x2000>;
					};
					slot0_partition: partition@20000 {
						label = "image-0";
						reg = <0x20000 0x60000>;
					};
					slot1_partition: partition@80000 {
						label = "image-1";
						reg = <0x80000 0x60000>;
					};
					scratch_partition: partition@e0000 {
						label = "image-scratch";
						reg = <0xe0000 0x20000>;
					};
				};
			};
		};
	};
};
```

偏移量的规则是，每个分区偏移量都应相对于该分区所属的 flash 内存的起始地址来表示。

`boot_partition` `slot0_partition`, `slot1_partition`, 和 `scratch_partition` 节点是为 MCUboot 定义的，但不是所有 MCUboot 配置都需要定义它们。参见 [MCUboot 文档](https://mcuboot.com/) 以获取更多详情。

`storage_partition` 节点被定义为供文件系统或其他非易失性存储 API 使用。

从 `partitions` 节点的其中一个子节点中获取数字 flash 区域 ID：

1. 获取节点的 `label` 属性值

2. 将其转换为小写

3. 将所有特殊字符转换为下划线 (_)

4. 将不带引号的结果传递给 `FLASH_AREA_ID()`

例如，`slot0_partition` 的 `flash_area` ID 号码是 `FLASH_AREA_ID(image_0)`。

相同的规则适用于其他带有 "label" 的宏，例如 [FLASH_AREA_OFFSET](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.FLASH_AREA_OFFSET) 和 [FLASH_AREA_SIZE](https://zephyr-docs.listenai.com/reference/storage/flash_map/flash_map.html#c.FLASH_AREA_SIZE)。例如，`FLASH_AREA_OFFSET(image_0)` 将返回其闪存设备中 `slot0_partition` 的起始偏移量。这是由节点的 [reg 属性](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-reg-property) 决定，在本例中是 0x20000。

要获取指向 flash 区域结构的指针，并从 `"image-0"` 的设备树标签开始使用它，请使用以下内容：

```c
struct flash_area *my_area;
int err = flash_area_open(FLASH_AREA_ID(image_0), &my_area);

if (err != 0) {
    handle_the_error(err);
} else {
    flash_area_read(my_area, ...);
}
```