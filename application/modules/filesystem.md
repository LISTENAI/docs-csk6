# 文件系统的使用

## 概述

Zephyr SDK当前支持两种文件系统，分别是littlefs和fatfs。针对嵌入式RTOS，推荐使用littlefs文件系统。

Zephyr提供的文件系统功能允许应用程序在不同的挂载点（例如/lfs和/fatfs）挂载多个文件系统（littlefs或fatfs），每个挂载点维护文件系统的实例化、挂载和文件操作等必要信息。
本章节通过Zephyr SDK提供的示例`littlefs`展示如何在`lfs`挂载点上挂载一个littlefs文件系统，并实现文件的读写操作。

## 常用API接口

### fs_statvfs

```c
cint fs_statvfs(const char *path, struct fs_statvfs *stat)
```

**接口说明：**

检索文件系统卷的信息。

**参数说明：**

| 字段 | 说明                                            |
| ---- | ----------------------------------------------- |
| path | 挂载点路径                                      |
| stat | 指向接收文件系统信息结构体`zfs_statvfs`的指针。 |

### fs_stat

```c
int fs_stat(const char *path, struct fs_dirent *entry)
```

**接口说明：**

检查指定的文件或目录的状态。

**参数说明：**

| 字段  | 说明                                                       |
| ----- | ---------------------------------------------------------- |
| path  | 文件或目录的路径                                           |
| entry | 如果文件或目录存在，则指向要填充的`zfs_dirent`结构的指针。 |

### fs_open

```c
int fs_open(struct fs_file_t *zfp, const char *file_name, fs_mode_t flags)
```

**接口说明：**

打开或创建文件。

**参数说明：**

| 字段      | 说明               |
| --------- | ------------------ |
| zfp       | 指向文件对象的指针 |
| file_name | 要打开的文件的名称 |
| flags     | 模式标志           |

### fs_read

```c
ssize_t fs_read(struct fs_file_t *zfp, void *ptr, size_t size)
```

**接口说明：**

读文件。

**参数说明：**

| 字段 | 说明                 |
| ---- | -------------------- |
| zfp  | 指向文件对象的指针   |
| ptr  | 指向数据缓冲区的指针 |
| size | 要读取的字节数       |

### fs_write

```c
ssize_t fs_write(struct fs_file_t *zfp, const void *ptr, size_t size)
```

**接口说明：**

写文件。

**参数说明：**

| 字段 | 说明                 |
| ---- | -------------------- |
| zfp  | 指向文件对象的指针   |
| ptr  | 指向数据缓冲区的指针 |
| size | 要写入的字节数       |

### fs_close

```c
int fs_close(struct fs_file_t *zfp)
```

**接口说明：**

关闭文件。

**参数说明：**

| 字段 | 说明               |
| ---- | ------------------ |
| zfp  | 指向文件对象的指针 |

### fs_opendir

```c
int fs_opendir(struct fs_dir_t *zdp, const char *path)
```

**接口说明：**

打开目录。

**参数说明：**

| 字段 | 说明               |
| ---- | ------------------ |
| zfp  | 指向目录对象的指针 |
| path | 要打开的目录的路径 |

### fs_readdir

```c
int fs_readdir(struct fs_dir_t *zdp, struct fs_dirent *entry)
```

**接口说明：**

读目录。

**参数说明：**

| 字段  | 说明                                     |
| ----- | ---------------------------------------- |
| zfp   | 指向目录对象的指针                       |
| entry | 指向`zfs_dirent`结构的指针，用于读取条目 |

### fs_closedir

```c
int fs_closedir(struct fs_dir_t *zdp)
```

**接口说明：**

关闭目录。

**参数说明：**

| 字段 | 说明               |
| ---- | ------------------ |
| zfp  | 指向目录对象的指针 |

### fs_mount

```c
int fs_mount(struct fs_mount_t *mp)
```

**接口说明：**

挂载文件系统。

**参数说明：**

| 字段 | 说明                         |
| ---- | ---------------------------- |
| mp   | 指向`fs_mount_t`结构体的指针 |

### fs_unmount

```c
int fs_unmount(struct fs_mount_t *mp)
```

**接口说明：**

卸载文件系统。

**参数说明：**

| 字段 | 说明                         |
| ---- | ---------------------------- |
| mp   | 指向`fs_mount_t`结构体的指针 |



## 使用示例

### 准备工作
本示例基于CSK6-NanoKit开发板实现，需要做以下准备工作：  
- CSK6-NanoKit开发板；

### 获取sample

csk6 sdk提供了`littlefs`的使用示例，可以通过Lisa命令获取示例项目：

通过Lisa命令创建项目：
```
lisa zep create
```

按以下目录选择完成sample创建：  

> sample → subsys → fs → littlefs

### 组件配置

```shell
CONFIG_MAIN_STACK_SIZE=2048
CONFIG_DEBUG=y
CONFIG_LOG=y
CONFIG_LOG_MODE_MINIMAL=y
# 启用flash
CONFIG_FLASH=y
CONFIG_FLASH_MAP=y
CONFIG_FLASH_PAGE_LAYOUT=y
# 启动文件系统
CONFIG_FILE_SYSTEM=y
CONFIG_FILE_SYSTEM_LITTLEFS=y
```

### 设备树配置

在设备树配置文件`csk6011a_nano.overlay`中配置挂载点并指定文件系统在flash的偏移地址。

```c
/delete-node/ &storage_partition;

/ {
	/* 配置挂载点/lfs1 */
	fstab {
		compatible = "zephyr,fstab";
		lfs1: lfs1 {
			compatible = "zephyr,fstab,littlefs";
			mount-point = "/lfs1";
			
			/* 文件系统对应的flash partition*/
			partition = <&filesystem_part>;
			automount;
			no-format;
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

		/* storage: 1MB for storage */
		storage_partition: partition@700000 {
			label = "storage";
			reg = <0x700000 0x100000>; /* 文件系统在flash的偏移地址0x700000，大小0x100000(1MB) */
		};

	};
};
```

### 应用实现

文件系统需要以bin文件的形式烧录到flash对应的偏移地址上，应用项目运行后挂载文件系统并对文件系统进行读写操作。

#### 步骤一：创建littlefs文件系统bin文件

创建``文件系统bin文件需要用到`mklittlefs`工具，并在Linux环境下完成bin文件的打包。

[mklittlefs工具包 下载路径](https://github.com/earlephilhower/mklittlefs)

`mklittlefs`安装步骤：

- git clone `mklittlefs`工具包
- cd 到`mklittlefs`在Linux环境下运行以下命令：

```c
$ git submodule update --init
$ make dist
```

- 查看安装是否成功

当使用命令可以看到版本后，则表示安装成功。

```c
$ mklittlefs --version
version: 0.2.3-6-g9a0e072
```

- 生成bin文件

```c
./mklittlefs -c littlefs_image/ -d 0 -b 4096 -p 16 -s 2097152 littlefs_image.bin
```

参数说明:

```shell
`littlefs_image/`-待打包到 `littlefs_image.bin` 的文件夹。

-d <0-5>,  --debug <0-5>
debug等级， 0 表示没有debug输出。

-b <number>,  --block <number>
文件系统的块大小，以字节为单位。

-p <number>,  --page <number>
文件系统的页大小，以字节为单位。

-s <number>,  --size <number>
文件系统镜像bin文件的大小，以字节为单位。（注意：不要超过dts给文件系统partition分配的flash空间）     
```

:::note
开发者也可以通过该连接下载已经打包好的空系统文件:[littlefs_image.bin](./images/littlefs_imge.bin)。文件系统bin文件制作完成后，在下文烧录固件时烧录到flash对应的偏移地址上。
:::

#### 步骤二：应用实现

```c
#include <stdio.h>
#include <zephyr/zephyr.h>
#include <zephyr/device.h>
#include <zephyr/fs/fs.h>
#include <zephyr/fs/littlefs.h>
#include <zephyr/logging/log.h>
#include <zephyr/storage/flash_map.h>

LOG_MODULE_REGISTER(main);

/* Matches LFS_NAME_MAX */
#define MAX_PATH_LEN 255
#define TEST_FILE_SIZE 547

static uint8_t file_test_pattern[TEST_FILE_SIZE];

...

void main(void)
{
	char fname1[MAX_PATH_LEN];
	char fname2[MAX_PATH_LEN];
	struct fs_statvfs sbuf;
	int rc;

	LOG_PRINTK("Sample program to r/w files on littlefs\n");

	/* 挂载文件系统 */
	rc = littlefs_mount(mp);
	if (rc < 0) {
		return;
	}
	/* 构建待操作文件的绝对路径（文件名为 lfs1/boot_count 和 lfs1/pattern.bin）*/
	snprintf(fname1, sizeof(fname1), "%s/boot_count", mp->mnt_point); // 
	snprintf(fname2, sizeof(fname2), "%s/pattern.bin", mp->mnt_point); //

	/* 检索文件系统的信息,返回文件系统中的总空间和可用空间。 */
	rc = fs_statvfs(mp->mnt_point, &sbuf);
	if (rc < 0) {
		LOG_PRINTK("FAIL: statvfs: %d\n", rc);
		goto out;
	}

	LOG_PRINTK("%s: bsize = %lu ; frsize = %lu ;"
		   " blocks = %lu ; bfree = %lu\n",
		   mp->mnt_point,
		   sbuf.f_bsize, sbuf.f_frsize,
		   sbuf.f_blocks, sbuf.f_bfree);

	/* 检索文件系统的目录 */
	rc = lsdir(mp->mnt_point);
	if (rc < 0) {
		LOG_PRINTK("FAIL: lsdir %s: %d\n", mp->mnt_point, rc);
		goto out;
	}

	/* 读写 lfs1/boot_count 文件 */
	rc = littlefs_increase_infile_value(fname1);
	if (rc) {
		goto out;
	}
	/* 读写 lfs1/pattern.bin 文件 */
	rc = littlefs_binary_file_adj(fname2);
	if (rc) {
		goto out;
	}

out:
	/* 卸载文件系统 */
	rc = fs_unmount(mp);
	LOG_PRINTK("%s unmount: %d\n", mp->mnt_point, rc);
}

```

### 编译烧录

#### 编译 

在app根目录下通过以下指令完成编译：
```
lisa zep build -b csk6011a_nano
```
#### 烧录  

-  烧录应用项目固件

`csk6011a_nano`开发板通过USB连接PC，通过烧录指令开始烧录：

```
lisa zep flash
```
- 烧录文件系统bin文件

这里提供串口烧录的指令示例，开发可根据实际的硬件环境选择对应的烧录方式，需要注意偏移地址是正确的。
```
lisa zep exec cskburn -s \\.\COMx -C 6 0x700000 xxx\littlefs_imge.bin -b 748800
```
COMx: DAPlink虚拟的串口

文件地址:`xxx`为文件系统文件`littlefs_imge.bin`实际的路径。

偏移地址：0x700000

#### 查看结果 

```shell
*** Booting Zephyr OS build v1.1.1-alpha.1-3-g45e3cda44212  ***
Sample program to r/w files on littlefs
Area 0 at 0x700000 on FLASH_CTRL for 1048576 bytes
/lfs1 automounted
/lfs1: bsize = 16 ; frsize = 4096 ; blocks = 256 ; bfree = 253

Listing dir /lfs1 ...
[FILE] boot_count (size = 1)
[FILE] pattern.bin (size = 547)
/lfs1/boot_count read count:3 (bytes: 1)
/lfs1/boot_count write new boot count 4: [wr:1]
------ FILE: /lfs1/pattern.bin ------
04 55 55 55 55 55 55 55 05 55 55 55 55 55 55 55
06 55 55 55 55 55 55 55 07 55 55 55 55 55 55 55
08 55 55 55 55 55 55 55 09 55 55 55 55 55 55 55
0a 55 55 55 55 55 55 55 0b 55 55 55 55 55 55 55
0c 55 55 55 55 55 55 55 0d 55 55 55 55 55 55 55
0e 55 55 55 55 55 55 55 0f 55 55 55 55 55 55 55
10 55 55 55 55 55 55 55 11 55 55 55 55 55 55 55
12 55 55 55 55 55 55 55 13 55 55 55 55 55 55 55
14 55 55 55 55 55 55 55 15 55 55 55 55 55 55 55
16 55 55 55 55 55 55 55 17 55 55 55 55 55 55 55
18 55 55 55 55 55 55 55 19 55 55 55 55 55 55 55
1a 55 55 55 55 55 55 55 1b 55 55 55 55 55 55 55
1c 55 55 55 55 55 55 55 1d 55 55 55 55 55 55 55
1e 55 55 55 55 55 55 55 1f 55 55 55 55 55 55 55
20 55 55 55 55 55 55 55 21 55 55 55 55 55 55 55
22 55 55 55 55 55 55 55 23 55 55 55 55 55 55 55
24 55 55 55 55 55 55 55 25 55 55 55 55 55 55 55
26 55 55 55 55 55 55 55 27 55 55 55 55 55 55 55
28 55 55 55 55 55 55 55 29 55 55 55 55 55 55 55
2a 55 55 55 55 55 55 55 2b 55 55 55 55 55 55 55
2c 55 55 55 55 55 55 55 2d 55 55 55 55 55 55 55
2e 55 55 55 55 55 55 55 2f 55 55 55 55 55 55 55
30 55 55 55 55 55 55 55 31 55 55 55 55 55 55 55
32 55 55 55 55 55 55 55 33 55 55 55 55 55 55 55
34 55 55 55 55 55 55 55 35 55 55 55 55 55 55 55
36 55 55 55 55 55 55 55 37 55 55 55 55 55 55 55
38 55 55 55 55 55 55 55 39 55 55 55 55 55 55 55
3a 55 55 55 55 55 55 55 3b 55 55 55 55 55 55 55
3c 55 55 55 55 55 55 55 3d 55 55 55 55 55 55 55
3e 55 55 55 55 55 55 55 3f 55 55 55 55 55 55 55
40 55 55 55 55 55 55 55 41 55 55 55 55 55 55 55
42 55 55 55 55 55 55 55 43 55 55 55 55 55 55 55
44 55 55 55 55 55 55 55 45 55 55 55 55 55 55 55
46 55 55 55 55 55 55 55 47 55 55 55 55 55 55 55
48 55 ad 
I: /lfs1 unmounted
/lfs1 unmount: 0

```

