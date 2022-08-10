# 非易失性存储 (NVS) {#nvs_api}

在非易失性存储中，元素通过循环缓冲区（以 FIFO 管理）存储在 flash 中，这些元素以 id-data 对表示。
flash 区域被划分为扇区。存储元素时，会将元素添加到扇区中，直到扇区中的存储空间用完。
然后在 flash 区域中创建一个新扇区，并通过擦除的方式使新扇区就绪。
在擦除扇区之前，检查 id-data 对是否存在于正在使用的扇区中，
如果不存在，则复制这个 id-data 对到新扇区中。

id 是一个 16 位无符号数。 NVS 确保对于每个正被使用的 id ，始终至少有一个 id-data 对存储在 flash 中。

NVS 允许存储二进制 blob 、字符串、整型、长整型以及这些类型的任意组合。

每个元素作为元数据（ 8 字节）和数据存储在 flash 中。
元数据从 nvs 扇区的末尾开始写入表中，数据则从扇区的开头按顺序写入。
元数据包括： id 、扇区中的数据偏移量、数据长度、部分（未使用）和一个 crc 校验值。

一次 nvs 写入，总是先写数据，然后再写元数据。
在初始化期间，写入 flash 但没有元数据的数据会被忽略。

在初始化期间， NVS 将验证存储在 flash 中的数据，如果遇到任何元数据丢失/不正确的数据，都将被忽略。

NVS 在将 id-data 对写入 flash 之前，会先进行检查。
如果这个 id-data 对并未更改，则不执行对 flash 的写入。

为了避免 flash 区域被频繁擦除，保持足够的可用空间很重要。
NVS 有一种保护机制，可避免在可用空间有限时，无限循环对 flash 页进行擦除。
当检测到这样的循环时，NVS 返回错误，通知调用者已没有更多可用空间。

对于 NVS 文件系统声明为：

```c
static struct nvs_fs fs = {
.flash_device = NVS_FLASH_DEVICE,
.sector_size = NVS_SECTOR_SIZE,
.sector_count = NVS_SECTOR_COUNT,
.offset = NVS_STORAGE_OFFSET,
};
```

其中

- `NVS_FLASH_DEVICE` 是一个对将使用的 flash 设备的引用。该设备必须是正常运转、可操作的。

- `NVS_SECTOR_SIZE` 是扇区大小，它需要是扇区 flash 擦除页大小的倍数，并且是偶数。

- `NVS_SECTOR_COUNT` 是扇区的数量，需要大于等于 2 ，因为需要保留一个空扇区用于复制已有数据。

- `NVS_STORAGE_OFFSET` 是存储区域在 flash 中的偏移量。

Flash 磨损
----------

将数据写入 flash 时，学习 flash 磨损非常重要。
flash 的寿命是有限的，这取决于 flash 可以擦除的次数。
flash 一次擦除一页，页大小由硬件决定。
例如，nRF51822 的页大小为 1024 字节，每页最多可​​擦除约 20,000 次。

### 估算设备寿命

假设我们使用一个 4 字节的状态变量，每分钟更改一次，需要在重启后恢复。
NVS 定义了一个与页大小（1024 字节）相等的扇区大小，并定义了 2 个扇区。

每次写入状态变量需要 12 个字节的 flash 存储控件：
8 个字节用于元数据，4 个字节用于数据。
存储数据时，第一个扇区将在 1024/12 = 85.33 分钟后被填满。
再经过 85.33 分钟，第二扇区也填满。
发生这种情况时，因为我们只使用两个扇区，
所以从第一个扇区开始存储，并在系统时间 85.33 \* 2 ≈ 171 分钟后，
第二个扇区填满并开始擦除第一个分区。
预期设备寿命为 20,000 次写入，每 171 分钟写入两个扇区，
设备应持续约 171 \* 20,000 分钟，或约 6.5 年。

简而言之

- `NS` 为存储每分钟请求的数字，

- `DS` 为数据大小（字节），

- `SECTOR_SIZE` 为扇区大小（字节），

- `PAGE_ERASES` 为 flash 页可被擦除的最大次数

预期的设备寿命（以分钟为单位）可以表示为：

```c
SECTOR_COUNT * SECTOR_SIZE * PAGE_ERASES / (NS * (DS+8))
```

从这个公式中我们可以发现，如果预期寿命太短，可以适当增加 `SECTOR_COUNT` 或 `SECTOR_SIZE` 。

迁移 flash 写块大小
--------------------------------

在 DFU 过程中，NVS 使用的 flash 驱动程序可能会更改 flash 设备支持的最小写入块大小。
但 NVS 在 flash 中的镜像将保持兼容，除非物理 ATE 大小发生变化。
特别的，**允许** 在 1、2、4、8 字节写入块大小之间进行迁移。

示例
------

NVS 的使用示例可参考使用 SDK 中的 [`samples/subsys/nvs`](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/samples/subsys/nvs) 。

问题排查
---------------

<h4 style={{
 "background": "var(--ifm-color-info-lightest)",
  padding: 4 }}>使用 NVS 时抛出 MPU fault ，或返回 <code>-ETIMEDOUT</code> 错误</h4>

<div style={{paddingLeft: 16}}>

NVS 可使用 SoC 的内部 flash 。但在 MPU 启用时， MPU 需要授予 flash 驱动程序 RWX 权限（使用 [`CONFIG_MPU_ALLOW_FLASH_WRITE`](https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_MPU_ALLOW_FLASH_WRITE) 进行配置），才可以访问 flash 存储。
当此选项禁用时，如果 NVS 应用程序引用了 SoC 内部 flash ，并且该应用是唯一运行的线程，它将触发 MPU fault 。
如果这一情况发生在多线程应用程序中，另一个线程可能会拦截这一 fault ，然后 NVS API 将返回 `-ETIMEDOUT` 错误。

</div>

API 引用
-------------

NVS 子系统 API 通过 `nvs.h` 提供：

:::info
具体的 API 描述请参考对应的 [API 引用](https://zephyr-docs.listenai.com/doxygen/html/nvs_8h.html) 。
:::