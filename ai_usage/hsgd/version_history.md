# 版本历史

## v1.0.0

首版发布。提供 头肩识别 + 手势识别 的能力。

## v1.1.1

头肩&手势识别更新算法引擎，识别更快更准确：
1. 识别效果提升：3.5 米头肩识别率 95%，3 米手势识别率 90%；
2. 帧率提升：单人识别帧率由原来 10 帧提升至 15 帧；

:::info 更新须知
在本次更新中，增加了一部分内存用于存放图像格式相关的数据，因此对 PSRAM 内存分配做了部分修改，这些修改均已更新到 sample 中的最新代码。

具体如下：

1. `boards/csk6011a_nano.overlay` 更新，搜索 `&psram0` ，更新节点内容为

  ```c
  &psram0 {
      psram_cp: psram_cp@30000000 {
          compatible = "listenai,csk6-psram-partition";
          reg = <0x30000000 0x400000>;
          status = "okay";
      };
      psram_ap: psram_ap@30400000 {
          compatible = "zephyr,memory-region","listenai,csk6-psram-partition";
          reg = <0x30400000 0x3e0000>;
          status = "okay";
          zephyr,memory-region = "PSRAMAP";
      };
      psram_share: psram_share@307e0000 {
          compatible = "listenai,csk6-psram-partition";
          reg = <0x307e0000 0x20000>;
          status = "okay";
      };
  };
  ```

2. `prj.conf` 中，修改以下配置

  ```conf
  CONFIG_VIDEO_BUFFER_POOL_SZ_MAX=921800
  ```

  增加以下配置

  ```conf
  CONFIG_LICAK_MODULES_ALG_HSD_DISABLE_MULTI_HEAP_INIT=y
  ```

3. 算法资源有更新，需要重新烧录 cp.bin 和 res.bin 。
:::