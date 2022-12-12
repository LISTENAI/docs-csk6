# 版本历史


## v1.2.1

头肩识别算法引擎更新，新增特征识别功能，通过人物 id 注册即可实现人物特征识别跟踪，大幅降低人物跟丢问题。

:::info 从 1.1.1 更新到 1.2.1
1. `west.yml` 需更新，将其中的 

  ```yaml {3}
    - name: licak
      remote: listenai
      revision: v1.1.1
      path: modules/lib/licak
  ```

  修改为 

  ```yaml {3}
    - name: licak
      remote: listenai
      revision: v1.2.1
      path: modules/lib/licak
  ```

  而后在 sample 目录下执行 `lisa zep update` 更新对应 SDK 源码。

2. `boards/csk6011a_nano.overlay` 更新，搜索 `&psram0` ，更新节点内容为

  ```c
  &psram0 {
      psram_cp: psram_cp@30000000 {
          compatible = "listenai,csk6-psram-partition";
          reg = <0x30000000 0x4e0000>;
          status = "okay";
      };
      psram_ap: psram_ap@304e0000 {
          compatible = "zephyr,memory-region","listenai,csk6-psram-partition";
          reg = <0x304e0000 0x300000>;
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
3. `prj.conf` 中，配置修改，将以下配置

  ```conf
  CONFIG_LICAK_MODULES_ALG_HSD_DISABLE_MULTI_HEAP_INIT=y
  ```

  修改为

  ```conf
  CONFIG_LICAK_DISABLE_MULTI_HEAP_INIT=y
  ```

4. 算法资源有更新，需要重新烧录 cp.bin 和 res.bin 。
:::

## v1.1.1

头肩&手势识别更新算法引擎，识别更快更准确：
1. 识别效果提升：3.5 米头肩识别率 95%，3 米手势识别率 90%；
2. 帧率提升：单人识别帧率由原来 10 帧提升至 15 帧；

:::info 从 1.0 更新到 1.1.1
在本次更新中，增加了一部分内存用于存放图像格式相关的数据，因此对 PSRAM 内存分配做了部分修改，这些修改均已更新到 sample 中的最新代码。

具体如下：

1. `west.yml` 需更新，将其中的 

  ```yaml {3}
    - name: licak
      remote: listenai
      revision: v1.0.1-alpha.2
      path: modules/lib/licak
  ```

  修改为 

  ```yaml {3}
    - name: licak
      remote: listenai
      revision: v1.1.1
      path: modules/lib/licak
  ```

  而后在 sample 目录下执行 `lisa zep update` 更新对应 SDK 源码。

2. `boards/csk6011a_nano.overlay` 更新，搜索 `&psram0` ，更新节点内容为

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

3. `prj.conf` 中，修改以下配置

  ```conf
  CONFIG_VIDEO_BUFFER_POOL_SZ_MAX=921800
  ```

  增加以下配置

  ```conf
  CONFIG_LICAK_MODULES_ALG_HSD_DISABLE_MULTI_HEAP_INIT=y
  ```

4. 算法资源有更新，需要重新烧录 cp.bin 和 res.bin 。
:::

## v1.0.0

首版发布。提供 头肩识别 + 手势识别 的能力。
