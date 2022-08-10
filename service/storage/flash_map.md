# Flash map

The `<storage/flash_map.h>` API allows accessing information about device flash partitions via [flash_area](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area) structures.

`<storage/flash_map.h>` API 允许通过 [flash_area](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area) 结构访问设备 flash 分区信息。

Each `struct flash_area` describes a flash partition. The API provides access to a “flash map”, which contains predefined flash areas accessible via globally unique ID numbers. You can also create `flash_area` structures at runtime for application-specific purposes.

每个 `struct flash_area` 代表一个 flash 分区。该API提供对 “flash map” 的访问，其中包含预定义的 flash 区域，可通过全局唯一的 ID 号访问。你也可以在运行时为特定的应用程序创建 `flash_area` 结构。

The `flash_area` structure contains the name of the flash device the partition is part of; this name can be passed to [device_get_binding()](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.device_get_binding) to get the corresponding [device](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.device) structure which can be read and written to using the [flash API](https://docs.zephyrproject.org/latest/hardware/peripherals/flash.html#flash-api). The `flash_area` also contains the start offset and size of the partition within the flash memory the device represents.

`flash_area` 结构包含分区所属的 flash 设备的名称；此名称可以传递给 [device_get_binding()](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.device_get_binding) 以获取可以使用 flash API 读取和写入的相应 [device](https://docs.zephyrproject.org/latest/kernel/drivers/index.html#c.device) 结构。`flash_area` 还包含设备所代表的 flash 内存中分区的起始偏移量和大小。

The flash_map.h API provides functions for operating on a `flash_area`. The main examples are [flash_area_read()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_read) and [flash_area_write()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_write). These functions are basically wrappers around the flash API with input parameter range checks. Not all flash APIs have flash_map.h wrappers, but [flash_area_get_device()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_get_device) allows easily retrieving the `struct device` from a `struct flash_area`.

flash_map.h API 提供了对 `flash_area` 进行操作的函数。主要的示例是 [flash_area_read()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_read) 和 [flash_area_write()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_write)。这些函数基本是 flash API 的封装，并带有输入参数范围检查。不是所有 flash APIs 都有 flash_map.h 封装，但 [flash_area_get_device()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_get_device) 允许从 `struct flash_area` 中轻松获取 `struct device`。

Use [flash_area_open()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_open) to access a `struct flash_area`. This function takes a flash area ID number and returns a pointer to the flash area structure. The ID number for a flash area can be obtained from a human-readable “label” using [FLASH_AREA_ID](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.FLASH_AREA_ID); these labels are obtained from the devicetree as described below.

使用 [flash_area_open()](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.flash_area_open) 获取 `struct flash_area`。这个函数接受一个 flash 区域 ID 号，并返回一个指向 flash 区域结构的指针。flash 区域的 ID 号可以使用 FLASH_AREA_ID 从可读的 "label" 中获取。这些描述可以从设备树中获取，如下所述。

## 与设备树的关系

The flash_map.h API uses data generated from the [Devicetree API](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-api), in particular its [Fixed flash partitions](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-flash-api). Zephyr additionally has some partitioning conventions used for [Device Firmware Upgrade](https://docs.zephyrproject.org/latest/services/device_mgmt/dfu.html#dfu) via the MCUboot bootloader, as well as defining partitions usable by [file systems](https://docs.zephyrproject.org/latest/services/file_system/index.html#file-system-api) or other nonvolatile [storage](https://docs.zephyrproject.org/latest/services/storage/index.html#storage-reference).

flash_map.h API 使用 [设备树 API](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-api) 生成的数据，特别是 [固定 flash 分区](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-flash-api)。Zephyr 还具有一些用于通过 MCUboot bootloader [升级设备固件](https://docs.zephyrproject.org/latest/services/device_mgmt/dfu.html#dfu) 的分区约定，以及定义 [文件系统](https://docs.zephyrproject.org/latest/services/file_system/index.html#file-system-api) 或其他非易失性 [存储](https://docs.zephyrproject.org/latest/services/storage/index.html#storage-reference) 可用的分区。

Here is an example devicetree fragment which uses fixed flash partitions for both MCUboot and a storage partition. Some details were left out for clarity.

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

Rule for offsets is that each partition offset shall be expressed in relation to the flash memory beginning address to which the partition belong.

偏移量的规则是，每个分区偏移量都应相对于该分区所属的 flash 内存的起始地址来表示。

The `boot_partition`, `slot0_partition`, `slot1_partition`, and `scratch_partition` nodes are defined for MCUboot, though not all MCUboot configurations require all of them to be defined. See the [MCUboot documentation](https://mcuboot.com/) for more details.

`boot_partition` `slot0_partition`, `slot1_partition`, 和 `scratch_partition` 节点是为 MCUboot 定义的，但不是所有 MCUboot 配置都需要定义它们。参见 [MCUboot 文档](https://mcuboot.com/) 以获取更多详情。

The `storage_partition` node is defined for use by a file system or other nonvolatile storage API.

`storage_partition` 节点被定义为供文件系统或其他非易失性存储 API 使用。

To get a numeric flash area ID from one of the child nodes of the `partitions` node:

从 `partitions` 节点的其中一个子节点中获取数字 flash 区域 ID：

1. take the node’s `label` property value

2. lowercase it

3. convert all special characters to underscores (_)

4. pass the result without quotes to `FLASH_AREA_ID()`

1. 获取节点的 `label` 属性值

2. 将其转换为小写

3. 将所有特殊字符转换为下划线 (_)

4. 将不带引号的结果传递给 `FLASH_AREA_ID()`
  
For example, the `flash_area` ID number for `slot0_partition` is `FLASH_AREA_ID(image_0)`.

例如，`slot0_partition` 的 `flash_area` ID 号码是 `FLASH_AREA_ID(image_0)`。

The same rules apply for other macros which take a “label”, such as [FLASH_AREA_OFFSET](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.FLASH_AREA_OFFSET) and [FLASH_AREA_SIZE](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.FLASH_AREA_SIZE). For example, `FLASH_AREA_OFFSET(image_0)` would return the start offset for `slot0_partition` within its flash device. This is determined by the node’s [reg property](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-reg-property), and in this case is 0x20000.

相同的规则适用于其他带有 "label" 的宏，例如 [FLASH_AREA_OFFSET](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.FLASH_AREA_OFFSET) 和 [FLASH_AREA_SIZE](https://docs.zephyrproject.org/latest/services/storage/flash_map/flash_map.html#c.FLASH_AREA_SIZE)。例如，`FLASH_AREA_OFFSET(image_0)` 将返回其闪存设备中 `slot0_partition` 的起始偏移量。这是由节点的 [reg 属性](https://docs.zephyrproject.org/latest/build/dts/api/api.html#devicetree-reg-property) 决定，在本例中是 0x20000。

To get a pointer to the flash area structure and do something with it starting with a devicetree label like `"image-0"`, use something like this:

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