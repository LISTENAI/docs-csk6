# 引导程序 & OTA

## bootloader

bootloader是芯片上电后执行的第一段代码，主要用于引导和升级应用程序。

## mcuboot

[mcuboot](https://www.mcuboot.com/)是开源32bit Mcu
bootloader，直接兼容于zephyr，可以用来加载zephyr代码。

为了在Zephyr上使用mcuboot，需要依赖相关的条件。具体请参考[Mcuboot](https://docs.zephyrproject.org/latest/guides/device_mgmt/dfu.html?highlight=mcuboot#mcuboot)和[Building
and using MCUboot with
Zephyr](https://www.mcuboot.com/documentation/readme-zephyr/)

### flash map

mcuboot通过对flash分区进行操作来加载和升级Zephyr固件。[flash
map](https://docs.zephyrproject.org/2.6.0/reference/storage/flash_map/flash_map.html#flash-map)提供了获取flash分区信息的API。flash分区与zephyr的设备树相关，举例如下：

```default
&flash0 {
        /*
         * For more information, see:
         * http: //docs.zephyrproject.org/latest/guides/dts/index.html#flash-partitions
         */
        partitions {
                compatible = "fixed-partitions";
                #address-cells = <1>;
                #size-cells = <1>;

                /* 256KB for bootloader */
                boot_partition: partition@0 {
                        label = "mcuboot";
                        reg = <0x0 0x40000>;
                        read-only;
                };

                /* application image slot: 512KB */
                slot0_partition: partition@40000 {
                        label = "image-0";
                        reg = <0x40000 0x80000>;
                };

                /* backup slot: 512KB */
                slot1_partition: partition@c0000 {
                        label = "image-1";
                        reg = <0xc0000 0x80000>;
                };

                /* swap slot: 128KB */
                scratch_partition: partition@140000 {
                        label = "image-scratch";
                        reg = <0x140000 0x20000>;
                };

                /* storage: 6.625MB for storage */
                storage_partition: partition@160000 {
                        label = "storage";
                        reg = <0x160000 0x6a0000>;
                };

        };
};
```

其中`boot_partition`、`slot0_partition`、`slot1_partition`和`scratch_partition`是为了mcuboot定义的，`storage_partition`分区可用于存放文件系统等其他非易失存储。

flash分区示例图：

```default
+----------+----------+----------+----------+
|              boot_partition               |                用于烧录bootloader
+----------+----------+----------+----------+
|              slot0_partition              |                主分区APP0
+---------------------+---------------------+
|              slot1_partition              |                次分区APP1
+---------------------+---------------------+
|              scratch_partition            |        用来作为slot0和slot1的交换区
+---------------------+---------------------+
|              storage_partition            |                用来其他存储(如文件系统)
+---------------------+---------------------+
```

mcuboot被烧录到`boot_partition`分区，并且负责管理`slot0_partition`、`slot1_partition`和`scratch_partition`。芯片上电后，首先启动mcuboot，mcuboot校验`slot0_partition`和`slot1_partition`分区，并根选择其中一个启动。`slot0_partition`分区固定用于启动，`slot1_partition`分区固定用于升级。mcuboot支持通过uart、usb
cdc、usb dfu的方式进行升级，升级完成后，就开始启动APP固件。

### 生成mcuboot

#### 编译

```shell
west build -p=auto -b csk6001_pico -d build_mcuboot bootloader\mcuboot\boot\zephyr
```

#### 烧录到boot分区

```shell
# 烧录mcuboot到boot_partition分区(flash偏移位置0x0)
west flash -d build_mcuboot
```

### 生成App固件

#### 编译

这里使用hello_world工程为例来生成App固件。因为App固件由mcuboot启动，需要在编译时需要配置`CONFIG_BOOTLOADER_MCUBOOT=y`。

```shell
# 编译生成App固件
west build -p=auto -b csk6001_pico .\zephyr\samples\hello_world -- -DCONFIG_BOOTLOADER_MCUBOOT=y
```

#### 签名

mcuboot在启动App前会先对App进行校验，因此需要用密钥对App进行签名。注意App签名时用到的密钥要和mcuboot一致，否则mcuboot对App校验失败。mcuboot编译时通过`CONFIG_BOOT_SIGNATURE_KEY_FILE`来选择密钥，App签名也应用同一个密钥。密钥可由用户自定义生成，参考[Building
and using MCUboot with
Zephyr](https://docs.mcuboot.com/readme-zephyr.html)，本例使用mcuboot默认自带的`root-rsa-2048.pem`

```shell
# 使用.\bootloader\mcuboot\script\imgtool.py对.\build目录的App固件进行签名
# 下面的两种方法任选一个

# 简单使用方法
west sign -t imgtool -- --key bootloader\mcuboot\root-rsa-2048.pem

# 展开使用方法
# 注意：--slot-size为APP0所在的slot0_partitoin分区大小，对应上面flash map为0x80000
.\bootloader\mcuboot\script\imgtool.py sign \
        --key .\bootloader\mcuboot\root-rsa-2048.pem \
        --header-size 0x200 \
        --align 8 \
        --version 1.2 \
        --slot-size 0x80000 \
        .\build\zephyr\zephyr.bin \
        .\build\zephyr\zephyr.signed.bin
```

#### 烧录到slot0分区

App固件需要烧录到`slot0_partition`分区，注意烧录时需指定烧录位置为`slot0_partition`分区的起始位置

```shell
# 烧录App到slot0_partition分区（flash偏移位置0x40000）
west flash --bin-file build\zephyr\zephyr.signed.bin
```

#### CSK6001启动日志

csk6001启动日志如下，可以看到mcuboot已经启动了App固件

```default
*** Booting Zephyr OS build 3c2037394676  ***
I: Starting bootloader
I: Primary image: magic=unset, swap_type=0x1, copy_done=0x3, image_ok=0x3
I: Scratch: magic=unset, swap_type=0x1, copy_done=0x3, image_ok=0x3
I: Boot source: primary slot
I: Swap type: none
I: Bootloader chainload address offset: 0x40000
I: Jumping to the first image slot
*** Booting Zephyr OS build 3c2037394676  ***
Hello World! csk6001
```

## DFU(Device Firmware Upgrade)

Zephyr使用[Device Firmware
Upgrade](https://docs.zephyrproject.org/latest/guides/device_mgmt/dfu.html?highlight=mcuboot#device-firmware-upgrade)框架来管理固件，使用[Device
Management](https://docs.zephyrproject.org/latest/guides/device_mgmt/index.html#device-management)来管理升级固件的传输和相关传输协议。即DFU子系统不负责固件的传输，只负责固件的管理。DFU和Device
Management共同配合完成固件的升级和管理。

## Device Management

Device
Management包含[MCUmgr](https://docs.zephyrproject.org/latest/guides/device_mgmt/mcumgr.html#mcumgr)、[usb
dfu](https://docs.zephyrproject.org/latest/samples/subsys/usb/dfu/README.html#usb-dfu-sample-application)、[Hawkbit](https://docs.zephyrproject.org/latest/samples/subsys/mgmt/hawkbit/README.html#hawkbit-direct-device-integration-api-sample)、[Updatehub](https://docs.zephyrproject.org/latest/samples/subsys/mgmt/updatehub/README.html#updatehub-embedded-firmware-over-the-air-fota-sample)、[OSDP](https://docs.zephyrproject.org/latest/samples/subsys/mgmt/osdp/README.html)等升级方式，接口涵盖uart、usb、eth、wifi、ble等。[Management
Samples](https://docs.zephyrproject.org/latest/samples/subsys/mgmt/mgmt.html)给出了上面的示例。

## USB DFU

usb dfu是zephyr Device
Management的一种，此方案可通过usb接口完成对固件升级和备份。[USB DFU
Sample
Application](https://docs.zephyrproject.org/latest/samples/subsys/usb/dfu/README.html#usb-dfu-sample-application)演示了通过APP进行USB
DFU升级的流程。

下面给出一个通过mcuboot进行USB DFU升级固件的例子。

## mcuboot的usb dfu的升级

因为mcuboot具有升级功能，可通过uart、uart cdc、usb
dfu进行升级。这里使用mcuboot的usb dfu功能进行升级。mcuboot的usb
dfu升级可以使用gpio引脚触发；也可以上电等待一段时间，如果上位机没升级操作，就开始引导app。本例使用上电等待的方法来演示。

### 生成mcuboot

#### 添加csk6001_pico.conf

需要在bootloadermcubootbootzephyrboards目录下添加csk6001_pico.conf文件，内容如下

```default
CONFIG_BOOT_USB_DFU_WAIT=y
CONFIG_BOOT_USB_DFU_WAIT_DELAY_MS=10000                      #等待10s
CONFIG_IMG_BLOCK_BUF_SIZE=4096
CONFIG_USB_REQUEST_BUFFER_SIZE=4096                          #usb每次传输4096
CONFIG_SYSTEM_WORKQUEUE_STACK_SIZE=4096
CONFIG_USB_DFU_DEFAULT_POLLTIMEOUT=1

CONFIG_USB_DEVICE_LOG_LEVEL_ERR=y
```

#### 编译和烧录

##### 编译

```shell
west build -p=auto -b csk6001_pico -d build_mcuboot bootloader\mcuboot\boot\zephyr
```

##### 烧录到boot分区

```shell
# 烧录mcuboot到boot_partition分区(flash偏移位置0x0)
west flash -d build_mcuboot
```

### 生成升级固件

升级固件被下载到设备后，也要被mcuboot引导。因此升级固件同样需要配置`CONFIG_BOOTLOADER_MCUBOOT=y`，并需要进行签名。

#### 编译

这里仍旧使用hello_world作为升级固件，注意需要添加配置`CONFIG_BOOTLOADER_MCUBOOT=y`

```shell
# 编译生成升级固件
west build -p=auto -b csk6001_pico .\zephyr\samples\hello-world -- -DCONFIG_BOOTLOADER_MCUBOOT=y
```

#### 签名

```shell
# 对升级固件进行签名
west sign -t imgtool -- --key bootloader\mcuboot\root-rsa-2048.pem
```

生成的.buildzephyrzepyr.signed.bin重命名成signed-hello.bin，用于PC端下载使用

### 测试

PC端使用[dfu-util](http://dfu-util.sourceforge.net/)软件来控制dfu设备进行固件升级和备份。


* linux上一般自带dfu-util，如果没有可通过包管理软件进行安装，如ubuntu、debian可以使用sudo
apt-get install dfu-util安装。


* windows端测试需要先安装驱动，驱动安装见[Windows进行DFU升级步骤](https://lexiangla.com/docs/d9cc0f3c58f411ec9e9bc2d4bb7d7c8f?company_from=246da8589c0811ea9d995254002f1020)


* mac端暂未测试。

下面例子是在linux系统下进行的测试

#### 查看dfu设备

```shell
# 查看当前连接的PC的dfu设备
$> sudo dfu-util --list
dfu-util 0.11

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2021 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/

Found Runtime: [2fe3:0005] ver=0207, devnum=36, cfg=1, intf=0, path="1-3.3.2", alt=0, name="UNKNOWN", serial="0123456789ABCDEF"
```

#### 下载升级固件到slot1分区

```shell
# 下载升级固件signed-hello.bin到slot1_partition分区
$> sudo dfu-util --alt 1 --download signed-hello.bin
dfu-util 0.11

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2021 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/

Warning: Invalid DFU suffix signature
A valid DFU suffix will be required in a future dfu-util release
Opening DFU capable USB device...
Device ID 2fe3:0005
Device DFU version 0110
Claiming USB DFU (Run-Time) Interface...
Setting Alternate Interface zero...
Determining device status...
DFU state(0) = appIDLE, status(0) = No error condition is present
Device really in Run-Time Mode, send DFU detach request...
Resetting USB...
Opening DFU USB Device...
Claiming USB DFU Interface...
Setting Alternate Interface #1 ...
Determining device status...
DFU state(2) = dfuIDLE, status(0) = No error condition is present
DFU mode device DFU version 0110
Device returned transfer size 4096
Copying data from PC to DFU device
Download        [=========================] 100%        51492 bytes
Download done.
DFU state(4) = dfuDNBUSY, status(0) = No error condition is present
Done!
```

usb
dfu仅负责上传flash数据到PC端或者接收PC端数据并烧录到flash，不负责复位芯片。因此这里下载完后用户需要自己复位或重新上电。

下载后第一次启动，mcuboot就会校验`slot0_partition`和`slot1_partition`分区，然后把`slot0_partition`和`slot1_partition`分区进行交换，并启动`slot0_partition`分区，即启动下载的固件。

```default
*** Booting Zephyr OS build 3c2037394676  ***
I: Starting bootloader
I: Primary image: magic=unset, swap_type=0x1, copy_done=0x3, image_ok=0x3
I: Scratch: magic=unset, swap_type=0x1, copy_done=0x3, image_ok=0x3
I: Boot source: primary slot
I: Swap type: test
I: Bootloader chainload address offset: 0x40000
I: Jumping to the first image slot
*** Booting Zephyr OS build 3c2037394676  ***
Hello World! csk6001
```

此升级固件只运行一次，第二次重启时，会继续交换`slot0_partition`和`slot1_partition`分区，并启动原本的`slot0_partition`分区固件。

如果想让升级固件永久被执行，需要在签名的时候增加`--confirm`配置。

```shell
west sign -t imgtool -- --confirm --key bootloader\mcuboot\root-rsa-2048.pem
```
