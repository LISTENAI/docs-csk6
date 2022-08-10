# 文件系统的使用

## 概述

Zephyr 提供的文件系统功能允许应用程序在不同的挂载点（例如/fatfs和/lfs）挂载多个文件系统，每个挂载点维护文件系统的实例化，挂载和文件操作等必要信息。

本章节通过Zephyr SDK提供的示例`littlefs`展示如何在`lfs`挂载点上挂载一个文件系统，并实现文件的读写操作。

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

> sample → boards → csk6 → subsys → fs → littlefs

### 组件配置

```shell
CONFIG_MAIN_STACK_SIZE=8192
CONFIG_DEBUG=y
CONFIG_LOG=y
# 启用flash
CONFIG_FLASH=y
CONFIG_FLASH_MAP=y
CONFIG_FLASH_PAGE_LAYOUT=y
# 启动文件系统
CONFIG_FILE_SYSTEM=y
CONFIG_FILE_SYSTEM_LITTLEFS=y
```

### 设备树配置

在设备树配置文件`csk6002_9s_nano.overlay`中配置挂载点并指定文件系统在flash的便宜地址。

```c
/delete-node/ &storage_partition;

/ {
	chosen {
		/*
		 * shared memory reserved for the inter-processor communication
		 */
		zephyr,flash_sysfs_storage = &filesystem_part;
		zephyr,flash_controller = &flash;
	};
	
	/* 配置挂载点/lfs1 */
	fstab {
		compatible = "zephyr,fstab";
		lfs1: lfs1 {
			compatible = "zephyr,fstab,littlefs";
			mount-point = "/lfs1";
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

/* /lfs1在 flash 的偏移地址0x160000 */
&flash0 {
	partitions {
		compatible = "fixed-partitions";
		#address-cells = <1>;
		#size-cells = <1>;
		filesystem_part: partition@160000 {
			label = "filesystem";
			reg = <0x160000 0x00300000>;
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
文件系统镜像bin文件的大小，以字节为单位。     
```

#### 步骤二：应用实现

```c
#include <stdio.h>

#include <zephyr.h>
#include <device.h>
#include <fs/fs.h>
#include <fs/littlefs.h>
#include <storage/flash_map.h>

/* 对于 LFS_NAME_MAX 值 */
#define MAX_PATH_LEN 255

#define PARTITION_NODE DT_NODELABEL(lfs1)

#if DT_NODE_EXISTS(PARTITION_NODE)
FS_FSTAB_DECLARE_ENTRY(PARTITION_NODE);
#else /* 分区节点 PARTITION_NODE */
FS_LITTLEFS_DECLARE_DEFAULT_CONFIG(storage);
static struct fs_mount_t lfs_storage_mnt = {
	.type = FS_LITTLEFS,
	.fs_data = &storage,
	.storage_dev = (void *)FLASH_AREA_ID(storage),
	.mnt_point = "/lfs",
};
#endif /* 分区节点 PARTITION_NODE */

void main(void)
{
	struct fs_mount_t *mp =
#if DT_NODE_EXISTS(PARTITION_NODE)
		&FS_FSTAB_ENTRY(PARTITION_NODE)
#else
		&lfs_storage_mnt
#endif
		;
	unsigned int id = (uintptr_t)mp->storage_dev;
	char fname[MAX_PATH_LEN];
	struct fs_statvfs sbuf;
	const struct flash_area *pfa;
	int rc;
	
    
	snprintf(fname, sizeof(fname), "%s/boot_count", mp->mnt_point);
	
    /* 从flash_ map中检索flash分区。 */
	rc = flash_area_open(id, &pfa);
	if (rc < 0) {
		printk("FAIL: unable to find flash area %u: %d\n",
		       id, rc);
		return;
	}

	printk("Area %u at 0x%x on %s for %u bytes\n",
	       id, (unsigned int)pfa->fa_off, pfa->fa_dev_name,
	       (unsigned int)pfa->fa_size);

	/* 可选擦除flash内容 */
	if (IS_ENABLED(CONFIG_APP_WIPE_STORAGE)) {
		printk("Erasing flash area ... ");
		rc = flash_area_erase(pfa, 0, pfa->fa_size);
		printk("%d\n", rc);
	}

	flash_area_close(pfa);

	/* 如果已启用自动挂载，则不要手动挂载 */
#if !DT_NODE_EXISTS(PARTITION_NODE) ||						\
	!(FSTAB_ENTRY_DT_MOUNT_FLAGS(PARTITION_NODE) & FS_MOUNT_FLAG_AUTOMOUNT)
	rc = fs_mount(mp);
	if (rc < 0) {
		printk("FAIL: mount id %" PRIuPTR " at %s: %d\n",
		       (uintptr_t)mp->storage_dev, mp->mnt_point, rc);
		return;
	}
	printk("%s mount: %d\n", mp->mnt_point, rc);
#else
	printk("%s automounted\n", mp->mnt_point);
#endif
	
    /* 检索文件系统信息 */
	rc = fs_statvfs(mp->mnt_point, &sbuf);
	if (rc < 0) {
		printk("FAIL: statvfs: %d\n", rc);
		goto out;
	}

	printk("%s: bsize = %lu ; frsize = %lu ;"
	       " blocks = %lu ; bfree = %lu\n",
	       mp->mnt_point,
	       sbuf.f_bsize, sbuf.f_frsize,
	       sbuf.f_blocks, sbuf.f_bfree);

	struct fs_dirent dirent;
	
    /* 获取boot_count文件状态 */
	rc = fs_stat(fname, &dirent);
	printk("%s stat: %d\n", fname, rc);
	if (rc >= 0) {
		printk("\tfn '%s' size %zu\n", dirent.name, dirent.size);
	}

	struct fs_file_t file;

	fs_file_t_init(&file);
	
    /* 打开boot_count文件 */
	rc = fs_open(&file, fname, FS_O_CREATE | FS_O_RDWR);
	if (rc < 0) {
		printk("FAIL: open %s: %d\n", fname, rc);
		goto out;
	}

	uint32_t boot_count = 0;

	if (rc >= 0) {
        /* 读boot_count文件内容 */
		rc = fs_read(&file, &boot_count, sizeof(boot_count));
		printk("%s read count %u: %d\n", fname, boot_count, rc);
		rc = fs_seek(&file, 0, FS_SEEK_SET);
		printk("%s seek start: %d\n", fname, rc);

	}

	boot_count += 1;
    /* 写boot_count文件，内容为读取boot_count内容的递增 */
	rc = fs_write(&file, &boot_count, sizeof(boot_count));
	printk("%s write new boot count %u: %d\n", fname,
	       boot_count, rc);
	/* 关闭boot_count文件*/
	rc = fs_close(&file);
	printk("%s close: %d\n", fname, rc);

	struct fs_dir_t dir;

	fs_dir_t_init(&dir);

	rc = fs_opendir(&dir, mp->mnt_point);
	printk("%s opendir: %d\n", mp->mnt_point, rc);

	while (rc >= 0) {
		struct fs_dirent ent = { 0 };

		rc = fs_readdir(&dir, &ent);
		if (rc < 0) {
			break;
		}
		if (ent.name[0] == 0) {
			printk("End of files\n");
			break;
		}
		printk("  %c %zu %s\n",
		       (ent.type == FS_DIR_ENTRY_FILE) ? 'F' : 'D',
		       ent.size,
		       ent.name);
	}

	(void)fs_closedir(&dir);

out:
    /* 卸载文件系统 */
	rc = fs_unmount(mp);
	printk("%s unmount: %d\n", mp->mnt_point, rc);
}

```

### 编译烧录

#### **编译** 

在app根目录下通过以下指令完成编译：
```
lisa zep build -b csk6002_9s_nano
```
#### **烧录**  

-  烧录应用项目固件

`csk6002_9s_nano`开发板通过USB连接PC，通过烧录指令开始烧录：

```
lisa zep flash --runner pyocd
```
- 烧录`littlefs_image.bin`文件

```
lisa zep flash --runner pyocd --flash-opt="--base-address=0x18160000" --bin-file C:\Users\xiaoqingqin\Desktop\littlefs_image.bin -d E:\csk6\littlefs\build
```

偏移地址：0x18160000

littlefs应用项目build路径：E:\csk6\littlefs\build(开发者需要修改为实际的路径)

#### **查看结果**  

```shell
*** Booting Zephyr OS build v1.0.4-alpha.1  ***
Area 0 at 0x160000 on FLASH_CTRL for 3145728 bytes
/lfs1 automounted
/lfs1: bsize = 16 ; frsize = 4096 ; blocks = 768 ; bfree = 766
/lfs1/boot_count stat: 0
	fn 'boot_count' size 4
/lfs1/boot_count read count 2: 4
/lfs1/boot_count seek start: 0
/lfs1/boot_count write new boot count 3: 4
/lfs1/boot_count close: 0
/lfs1 opendir: 0
  F 4 boot_count
End of files
/lfs1 unmount: 0
[00:00:00.000,000] [0m<inf> littlefs: littlefs partition at /lfs1[0m
[00:00:00.000,000] [0m<inf> littlefs: LittleFS version 2.2, disk version 2.0[0m
[00:00:00.000,000] [0m<inf> littlefs: FS at FLASH_CTRL:0x160000 is 768 0x1000-byte blocks with 512 cycle[0m
[00:00:00.000,000] [0m<inf> littlefs: sizes: rd 16 ; pr 16 ; ca 64 ; la 32[0m
[00:00:00.001,000] [0m<inf> littlefs: /lfs1 mounted[0m
[00:00:00.001,000] [0m<inf> littlefs: Automount /lfs1 succeeded[0m
[00:00:00.039,000] [0m<inf> littlefs: /lfs1 unmounted[0m
*** Booting Zephyr OS build v1.0.4-alpha.1  ***
Area 0 at 0x160000 on FLASH_CTRL for 3145728 bytes
/lfs1 automounted
/lfs1: bsize = 16 ; frsize = 4096 ; blocks = 768 ; bfree = 766
/lfs1/boot_count stat: 0
	fn 'boot_count' size 4
/lfs1/boot_count read count 3: 4
/lfs1/boot_count seek start: 0
/lfs1/boot_count write new boot count 4: 4
/lfs1/boot_count close: 0
/lfs1 opendir: 0
  F 4 boot_count
End of files
/lfs1 unmount: 0
[00:00:00.000,000] [0m<inf> littlefs: littlefs partition at /lfs1[0m
[00:00:00.000,000] [0m<inf> littlefs: LittleFS version 2.2, disk version 2.0[0m
[00:00:00.000,000] [0m<inf> littlefs: FS at FLASH_CTRL:0x160000 is 768 0x1000-byte blocks with 512 cycle[0m
[00:00:00.000,000] [0m<inf> littlefs: sizes: rd 16 ; pr 16 ; ca 64 ; la 32[0m
[00:00:00.001,000] [0m<inf> littlefs: /lfs1 mounted[0m
[00:00:00.001,000] [0m<inf> littlefs: Automount /lfs1 succeeded[0m
[00:00:00.039,000] [0m<inf> littlefs: /lfs1 unmounted[0m
```

