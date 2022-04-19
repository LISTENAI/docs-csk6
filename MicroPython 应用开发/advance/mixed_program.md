# 混合编程 (C + MicroPython)

可能存在一些情况下，你并不能完完全全脱离原有项目的 C 代码的业务逻辑，那么你可以参考本章对编译配置进行一些改动来使用 MicroPython。

## 1. 编译配置

### 项目配置

在你的 `CMakeLists.txt` 中，加入

```cmake
include($ENV{MICROPY_SDK}/ports/zephyr/lib_micropython.cmake)

target_sources(app PRIVATE
    # ... your C files ...
    ${MPY_APP_SRC}
)

target_include_directories(app PRIVATE ${MPY_APP_INCLUDE})

target_link_libraries(app PRIVATE ${MICROPY_TARGET})
```

### 板型配置

在你项目下的 `KConfig` 文件中（如果没有就创建一个），加入

```Kconfig
source "$MICROPY_SDK/ports/zephyr/Kconfig"
```

对你的 `${board}.conf` 或 `prj.conf` 文件按需增加一些配置

```Kconfig
# 必选。文件系统。但 LFS 或 FAT 无限制。
CONFIG_FILE_SYSTEM=y
CONFIG_FILE_SYSTEM_LITTLEFS=y
CONFIG_MICROPY_VFS_FAT=n
CONFIG_MICROPY_VFS_LFS1=y
CONFIG_MICROPY_VFS_LFS2=y
CONFIG_FLASH=y
CONFIG_FLASH_MAP=y
CONFIG_MPU_ALLOW_FLASH_WRITE=y
CONFIG_FLASH_PAGE_LAYOUT=y
CONFIG_DISK_ACCESS=y

# 可选。LVGL GUI 库。要注意，显示和触控需要自己配置对应的项以及设备树。
CONFIG_MPY_LVGL=y
CONFIG_LV_MEM_CUSTOM=y
CONFIG_LV_Z_DISPLAY_DEV_NAME="DISPLAY"
CONFIG_LV_COLOR_DEPTH_16=y
CONFIG_LV_Z_USE_FILESYSTEM=y
CONFIG_LV_Z_POINTER_KSCAN=y
CONFIG_LV_Z_POINTER_KSCAN_DEV_NAME="KSCAN"
CONFIG_LV_Z_HOR_RES_MAX=240
CONFIG_LV_Z_VER_RES_MAX=320
CONFIG_LV_Z_DOUBLE_VDB=y
CONFIG_LV_Z_MEM_POOL_MAX_SIZE=81920
# CONFIG_LV_USE_FREETYPE=y

# 可选。联网能力
# Networking config
CONFIG_NETWORKING=y
CONFIG_NET_IPV4=y
CONFIG_NET_IPV6=y
CONFIG_NET_UDP=y
CONFIG_NET_TCP=y
CONFIG_NET_SOCKETS=y
CONFIG_NET_SOCKETS_POSIX_NAMES=n
CONFIG_TEST_RANDOM_GENERATOR=y
CONFIG_NET_CONFIG_SETTINGS=y
CONFIG_NET_CONFIG_INIT_TIMEOUT=3
CONFIG_NET_CONFIG_NEED_IPV6=y
CONFIG_NET_CONFIG_NEED_IPV4=y
# DNS
CONFIG_DNS_RESOLVER=y
CONFIG_DNS_RESOLVER_ADDITIONAL_QUERIES=2
CONFIG_DNS_SERVER_IP_ADDRESSES=y
# Static IP addresses
CONFIG_NET_CONFIG_MY_IPV6_ADDR="2001:db8::1"
CONFIG_NET_CONFIG_MY_IPV4_ADDR="192.0.2.1"
CONFIG_NET_CONFIG_MY_IPV4_GW="192.0.2.2"
CONFIG_DNS_SERVER1="192.0.2.2"
# DHCP configuration. Until DHCP address is assigned,
# static configuration above is used instead.
CONFIG_NET_DHCPV4=y

# 启用的 MicroPython 配置项，"mpconfigport_full.h" 表示全量开启
CONFIG_MICROPY_CONFIGFILE="mpconfigport_full.h"
```

## 2. 文件系统配置

当你需要将 MicroPython 代码置于文件系统中时，你需要对文件系统相关的配置进行修改。如果你不确定你是否需要此功能，请参考 [如何选择打包方式](../bundle_program#which-bundle-way-is-better) 中的介绍。

MicroPython 在启动后会识别是否设备树中是否存在 label 为 `storage` 的文件系统分区配置（通过 `FLASH_AREA_LABEL_EXISTS(storage)` ），如果存在，则会在 `/flash` 挂载点将其作为文件系统的根目录。

但如果你期望单独划分一个分区作为 MicroPython 代码相关文件存放的区域，你也可以自行在设备树中指定相关配置后，在你的 `main.c` 中调用挂载初始化。

例如若你的设备树中配置为

```dts
/ {
  chosen {
    /*
    * shared memory reserved for the inter-processor communication
    */
    zephyr,flash_sysfs_storage = &filesystem_part;
    zephyr,flash_controller = &flash;
  };

  fstab {
    compatible = "zephyr,fstab";
    lfs1: lfs1 {
      compatible = "zephyr,fstab,littlefs";
      mount-point = "/mpy";
      partition = <&filesystem_part>;
      automount ;
      read-size = <16>;
      prog-size = <16>;
      cache-size = <64>;
      lookahead-size = <32>;
      block-cycles = <512>;
    };
  };
};

&flash0 {
  partitions {
    compatible = "fixed-partitions";
    #address-cells = <1>;
    #size-cells = <1>;
    filesystem_part: partition@160000 {
      label = "mpy"; /* 此处下文提及的 FLASH_AREA_ID */
      reg = <0x160000 0x400000>;
    };
  };
};
```

修改你的 `{board}.conf` 文件中的 `CONFIG_MICROPY_CONFIGFILE` 值

```kconfig
CONFIG_MICROPY_CONFIGFILE = "mpconfigport_custom.h"
```

而后，在你的项目目录下新增 `mpconfigport_custom.h` ，在其中加入如下内容（注意修改 `FLASH_AREA_ID` 附带的参数）

```c
#include "mpconfigport_full.h"

#define CUSTOM_VFS_INIT() mp_obj_t bdev = NULL; \
    mp_obj_t mount_point; \
    const char *mount_point_str = NULL; \
    int ret = 0; \
    \
    mp_obj_t args[] = { MP_OBJ_NEW_SMALL_INT(FLASH_AREA_ID(mpy)), MP_OBJ_NEW_SMALL_INT(4096) }; \
    bdev = zephyr_flash_area_type.make_new(&zephyr_flash_area_type, ARRAY_SIZE(args), 0, args); \
    mount_point_str = "/flash"; \
    \
    if ((bdev != NULL)) { \
        mount_point = mp_obj_new_str(mount_point_str, strlen(mount_point_str)); \
        ret = mp_vfs_mount_and_chdir_protected(bdev, mount_point); \
    }
```

对 MicroPython 来说，当你执行 `import xxx` 的时候，它会先从 `.` 目录中去查找，默认指向第一个挂载到 MicroPython 的挂载点。

而后，在你的项目目录下创建 `py` 目录，执行以下命令将 `py` 目录中的内容烧录到文件系统中。

```bash
lisa mpy flash --fs --flash-area=mpy
```

此处的 `--flash-area=mpy` 传参含义与上文中的提到的、设备树中配置的文件系统的 `label` 是同一个东西。默认情况下， label 认为 `lfs1` 。

## 3. 启动 MicroPython

在你的 `main.c` 中的主函数后，像下述方式加入两个函数的调用，用于初始化 MicroPython 并且使 MicroPython REPL 可用。

```C
#include <console/console.h>

int real_main(void);

void main(void) {
    // Other code ...

    console_init();

    real_main();
}
```

**WARNING**: 注意，经过上述初始化后，将使用串口终端作为 MicroPython 交互式终端，那么 Zephyr 自身的终端将不可用（即 `CONFIG_SHELL` 相关内容）。
