# NVS 的使用

在NVS(Non-Volatile Storage)存储中，元素是通过循环缓冲区存储到 flash 中，这些元素以 id-data 对的形式表示。 flash 区域会被划分为若干个扇区。当flash中的一个扇区的存储空间用完时，会在 flash 区域中创建一个新扇区，并将该扇区中存储的 id-data 值拷贝到新的扇区。

本示例通过 NVS API 的调用演示了NVS用于存储不同类型的数据(strings, binary blobs, unsigned 32 bit integer)，以及如何从flash中读取和删除数据。

:::tip
更多关于NVS的内容可以学习[系统服务-NVS](../../service/storage/nvs.md)章节。
:::

## NVS 常用接口
### 在flash中初始化NVS文件系统

```c
int nvs_init(struct nvs_fs *fs, const char *dev_name);
```

**参数说明**

| 字段     | 说明                    |
| -------- | ----------------------- |
| fs       | 指向文件系统的指针      |
| dev_name | 指向flash设备名称的指针 |



### NVS 写入条目

```c
ssize_t nvs_write(struct nvs_fs *fs, uint16_t id, const void *data, size_t len)
```
**参数说明**

| 字段 | 说明                   |
| ---- | ---------------------- |
| fs   | 指向文件系统的指针     |
| id   | 要写入的条目的id       |
| data | 指向要写入的数据的指针 |
| len  | 要写入的字节长度       |



### NVS 读取条目

```c
ssize_t nvs_read(struct nvs_fs *fs, uint16_t id, void *data, size_t len)
```

**参数说明**

| 字段 | 说明                 |
| ---- | -------------------- |
| fs   | 指向文件系统的指针   |
| id   | 要写入的条目的id     |
| data | 指向数据缓冲区的指针 |
| len  | 要读取的字节长度     |



### NVS 删除条目

```c
int nvs_delete(struct nvs_fs *fs, uint16_t id);
```

**参数说明**

| 字段 | 说明               |
| ---- | ------------------ |
| fs   | 指向文件系统的指针 |
| id   | 要写入的条目的id   |



### NVS 读取历史记录条目

```c
ssize_t nvs_read_hist(struct nvs_fs *fs, uint16_t id, void *data, size_t len, uint16_t cnt);
```

**参数说明**

| 字段 | 说明                                        |
| ---- | ------------------------------------------- |
| fs   | 指向文件系统的指针                          |
| id   | 要写入的条目的id                            |
| data | 指向数据缓冲区的指针                        |
| len  | 要读取的字节长度                            |
| cnt  | 历史计数器：0:最新条目，1:最新项之前的一个… |

### NVS 清除文件系统

```c
int nvs_delete(struct nvs_fs *fs, uint16_t id);
```

**参数说明**

| 字段 | 说明               |
| ---- | ------------------ |
| fs   | 指向文件系统的指针 |



### NVS 计算文件系统可用空间

```c
ssize_t nvs_calc_free_space(struct nvs_fs *fs);
```

**参数说明**

| 字段 | 说明               |
| ---- | ------------------ |
| fs   | 指向文件系统的指针 |



## 使用示例

### 准备工作
本示例基于CSK6-NanoKit开发板实现NVS功能的使用，需要做以下准备工作：  
- CSK6-NanoKit开发板；

### 获取sample

csk6 sdk提供了NVS的使用示例，可以通过Lisa命令获取示例项目：

通过Lisa命令创建项目：
```
lisa zep create
```

按以下目录选择完成sample创建：  

> sample → subsys → nvs



### 示例项目组件配置

```shell
# 启用flash配置
CONFIG_FLASH=y
CONFIG_FLASH_PAGE_LAYOUT=y
# 启用NVS配置
CONFIG_NVS=y
CONFIG_LOG=y
CONFIG_NVS_LOG_LEVEL_DBG=y
# 启用重启配置
CONFIG_REBOOT=y
CONFIG_MPU_ALLOW_FLASH_WRITE=y
```

### 示例实现逻辑

此示例存储以下条目：

**1.存储一个IP地址(字符串)，存储id=1，data=“192.168.1.1”；**

**2.存储一个密钥(二进制blob)，存储id=2、data=FF FE FD FC FB F9 F8；**

**3.存储一个重启计数器（32位），存储id=3，data=reboot_counter；**

每次重新启动都会增加`reboot_ counter`的值，并在 flash中 进行更新。并通过`nvs_read_hist（）`接口获取reboot_ counter的历史记录。

**4.存储一个字符串，存储id=4，data=“data”，并展示如何删除该条目。**

在第10次重新启动时，删除id=4的字符串条目，在第11次重新启动时，无法获取该条目数据。

### 示例的实现

```c
#include <zephyr.h>
#include <sys/reboot.h>
#include <device.h>
#include <string.h>
#include <drivers/flash.h>
#include <storage/flash_map.h>
#include <fs/nvs.h>

static struct nvs_fs fs;

#define STORAGE_NODE DT_NODE_BY_FIXED_PARTITION_LABEL(storage)
#define FLASH_NODE DT_MTD_FROM_FIXED_PARTITION(STORAGE_NODE)

/* 1000 msec = 1 sec */
#define SLEEP_TIME      100
/* maximum reboot counts, make high enough to trigger sector change (buffer */
/* rotation). */
#define MAX_REBOOT 800

#define ADDRESS_ID 1
#define KEY_ID 2
#define RBT_CNT_ID 3
#define STRING_ID 4
#define LONG_ID 5


void main(void)
{
	int rc = 0, cnt = 0, cnt_his = 0;
	char buf[16];
	uint8_t key[8], longarray[128];
	uint32_t reboot_counter = 0U, reboot_counter_his;
	struct flash_pages_info info;
	const struct device *flash_dev;

    /* 定义NVS文件系统并设置以下参数：
     * sector_size：扇区数量等于flash page页的大小
     * sector_count：扇区数量 3
     * offset：偏移地址 FLASH_AREA_OFFSET(storage)
     */
	flash_dev = DEVICE_DT_GET(FLASH_NODE);
	if (!device_is_ready(flash_dev)) {
		printk("Flash device %s is not ready\n", flash_dev->name);
		return;
	}
	printk("Flash device %s \n", flash_dev->name);
    
	fs.offset = FLASH_AREA_OFFSET(storage);
	rc = flash_get_page_info_by_offs(flash_dev, fs.offset, &info);
	if (rc) {
		printk("Unable to get page info\n");
		return;
	}
	fs.sector_size = info.size;
	fs.sector_count = 3U;

	printk("Flash device %d \n", fs.sector_size);

	rc = nvs_init(&fs, flash_dev->name);
	if (rc) {
		printk("Flash Init failed\n");
		return;
	}

	/* ADDRESS_ID用于存储IP地址，并尝试flash读取 */
	rc = nvs_read(&fs, ADDRESS_ID, &buf, sizeof(buf));
	if (rc > 0) { /* 读取到数据并展示 */
		printk("Id: %d, Address: %s\n", ADDRESS_ID, buf);
	} else   {/* 读取不到数据，则写入数据 */
		strcpy(buf, "192.168.1.1");
		printk("No address found, adding %s at id %d\n", buf,
		       ADDRESS_ID);
		(void)nvs_write(&fs, ADDRESS_ID, &buf, strlen(buf)+1);
	}
	/* KEY_ID 用于存储key数组数据，并尝试flash读取*/
	rc = nvs_read(&fs, KEY_ID, &key, sizeof(key));
	if (rc > 0) { /* 读到条数数据并展示 */
		printk("Id: %d, Key: ", KEY_ID);
		for (int n = 0; n < 8; n++) {
			printk("%x ", key[n]);
		}
		printk("\n");
	} else   {/* 读取条目为空，并写入数据 */
		printk("No key found, adding it at id %d\n", KEY_ID);
		key[0] = 0xFF;
		key[1] = 0xFE;
		key[2] = 0xFD;
		key[3] = 0xFC;
		key[4] = 0xFB;
		key[5] = 0xFA;
		key[6] = 0xF9;
		key[7] = 0xF8;
		(void)nvs_write(&fs, KEY_ID, &key, sizeof(key));
	}
	/* RBT_CNT_ID  用于存储重启计数数据，并尝试从flash读取 */
	rc = nvs_read(&fs, RBT_CNT_ID, &reboot_counter, sizeof(reboot_counter));
	if (rc > 0) { /* 读到条数数据并展示 */
		printk("Id: %d, Reboot_counter: %d\n",
			RBT_CNT_ID, reboot_counter);
	} else   {/* 读取条目为空，并写入数据 */
		printk("No Reboot counter found, adding it at id %d\n",
		       RBT_CNT_ID);
		(void)nvs_write(&fs, RBT_CNT_ID, &reboot_counter,
			  sizeof(reboot_counter));
	}
	/* STRING_ID 用于存储字符串数据，并展示如何删除该条目数据*/
	rc = nvs_read(&fs, STRING_ID, &buf, sizeof(buf));
	if (rc > 0) {
		/* 读到条数数据并展示 */
		printk("Id: %d, Data: %s\n",
			STRING_ID, buf);
        /* 在第10次重新启动时，删除id=4的字符串条目 */
		if (reboot_counter == 10U) {
			(void)nvs_delete(&fs, STRING_ID);
		}
	} else   {
		/* 读取不到条目信息，当reboot_counter = 0时写入数据 */
		if (reboot_counter == 0U) {
			printk("Id: %d not found, adding it\n",
			STRING_ID);
			strcpy(buf, "DATA");
			(void)nvs_write(&fs, STRING_ID, &buf, strlen(buf) + 1);
		}
	}

	/* LONG_ID  用于存储字比较大的数据,并尝试从flash读取 */
	rc = nvs_read(&fs, LONG_ID, &longarray, sizeof(longarray));
	if (rc > 0) {
		/* 读到条数数据并展示 */
		printk("Id: %d, Longarray: ", LONG_ID);
		for (int n = 0; n < sizeof(longarray); n++) {
			printk("%x ", longarray[n]);
		}
		printk("\n");
	} else   {
		/* 读取不到条目信息，当reboot_counter = 0时写入数据 */
		if (reboot_counter == 0U) {
			printk("Longarray not found, adding it as id %d\n",
			       LONG_ID);
			for (int n = 0; n < sizeof(longarray); n++) {
				longarray[n] = n;
			}
			(void)nvs_write(
				&fs, LONG_ID, &longarray, sizeof(longarray));
		}
	}

	cnt = 5;
	while (1) {
		k_msleep(SLEEP_TIME);
		if (reboot_counter < MAX_REBOOT) {
			if (cnt == 5) {
                /* 打印重新启动计数器历史数据
                 * 以确认计数器历史记录存在于flash中
                 */
				printk("Reboot counter history: \n");
				while (1) {
                    /* 获取重启计数器的历史数据 */
					rc = nvs_read_hist(
						&fs, RBT_CNT_ID,
						&reboot_counter_his,
						sizeof(reboot_counter_his),
						cnt_his);
					if (rc < 0) {
						break;
					}
					printk("...%d", reboot_counter_his);
					cnt_his++;
				}
				if (cnt_his == 0) {
					printk("\nError, no Reboot counter \n");
				} else {
					printk("\nOldest reboot counter: %d \n",
					       reboot_counter_his);
				}
			}
			printk("waiting for reboot ...%d \n", cnt);
			cnt--;
			if (cnt == 0) {
				reboot_counter++;
                /* nvs 写入reboot_counter */
				(void)nvs_write(
					&fs, RBT_CNT_ID, &reboot_counter,
					sizeof(reboot_counter));
				if (reboot_counter == MAX_REBOOT) {
					printk("Doing last reboot...\n");
				}
                /* 重启系统 */
				sys_reboot(0);
			}
		} else {
			printk("Reboot counter reached max value.\n");
			printk("Reset to 0 and exit test.\n");
			reboot_counter = 0U;
			(void)nvs_write(&fs, RBT_CNT_ID, &reboot_counter,
			  sizeof(reboot_counter));
			break;
		}
	}
}
```



## 编译和烧录

### 编译

在app根目录下通过以下指令完成编译：
```shell
lisa zep build -b csk6011a_nano
```
### 烧录

CSK6-NanoKit通过USB连接PC，通过烧录指令开始烧录：
```shell
lisa zep flash 
```

### 查看结果

```
*** Booting Zephyr OS build v1.0.4-alpha.1  ***
Flash device FLASH_CTRL 
Flash device 4096 
Id: 1, Address: 192.168.1.1
Id: 2, Key: ff fe fd fc fb fa f9 f8 
Id: 3, Reboot_counter: 799
Id: 5, Longarray: 0 1 2 3 4 5 6 7 8 9 a b c d e f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20 21 22 23 24 25 26 27 28 29 2a 2b 2c 2d 2e 2f 30 31 32 33 34 35 36 37 38 39 3a 3b 3c 3d 3e 3f 40 41 42 43 44 45 46 47 48 49 4a 4b 4c 4d 4e 4f 50 51 52 53 54 55 56 57 58 59 5a 5b 5c 5d 5e 5f 60 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76 77 78 79 7a 7b 7c 7d 7e 7f 
[00:00:00.008,000] [0m<dbg> fs_nvs.nvs_recover_last_ate: Recovering last ate from sector 2[0m
[00:00:00.010,000] [0m<inf> fs_nvs: 3 Sectors of 4096 bytes[0m
[00:00:00.010,000] [0m<inf> fs_nvs: alloc wra: 2, b80[0m
[00:00:00.010,000] [0m<inf> fs_nvs: data wra: 2, 2bc[0m
Reboot counter history: 
...799...798...797...796...795...794...793...792...791...790...789...788...787...786...785...784...783...782...781...780...779...778...777...776...775...774...773...772...771...770...769...768...767...766...765...764...763...762...761...760...759...758...757...756...755...754...753...752...751...750...749...748...747...746...745...744...743...742...741...740...739...738...737...736...735...734...733...732...731...730...729...728...727...726...725...724...723...722...721...720...719...718...717...716...715...714...713...712...711...710...709...708...707...706...705...704...703...702...701...700...699...698...697...696...695...694...693...692...691...690...689...688...687...686...685...684...683...682...681...680...679...678...677...676...675...674...673...672...671...670...669...668...667...666...665...664...663...662...661...660...659...658...657...656...655...654...653...652...651...650...649...648...647...646...645...644...643...642...641...640...639...638...637...636...635...634...633...632...631...630...629...628...627...626...625...624...623...622...621...620...619...618...617...616...615...614...613...612...611...610...609...608...607...606...605...604...603...602...601...600...599...598...597...596...595...594...593...592...591...590...589...588...587...586...585...584...583...582...581...580...579...578...577...576...575...574...573...572...571...570...569...568...567...566...565...564...563...562...561...560...559...558...557...556...555...554...553...552...551...550...549...548...547...546...545...544...543...542...541...540...539...538...537...536...535...534...533...532...531...530...529...528...527...526...525...524...523...522...521...520...519...518...517...516...515...514...513...512...511...510...509...508...507...506...505...504...503...502...501...500...499...498...497...496...495...494...493...492...491...490...489...488...487...486...485...484...483...482...481...480...479...478...477...476...475...474...473...472...471...470...469...468...467...466...465...464...463...462...461...460...459...458...457...456...455...454...453...452...451...450...449...448...447...446...445...444...443...442...441...440...439...438...437...436...435...434...433...432...431...430...429...428...427...426...425...424...423...422...421...420...419...418...417...416...415...414...413...412...411...410...409...408...407...406...405...404...403...402...401...400...399...398...397...396...395...394...393...392...391...390...389...388...387...386...385...384...383...382...381...380...379...378...377...376...375...374...373...372...371...370...369...368...367...366...365...364...363...362...361...360...359...358...357...356...355...354...353...352...351...350...349...348...347...346...345...344...343...342...341...340...339...338...337...336...335...334...333...332...331...330...329...328...327...326...325...324...323
Oldest reboot counter: 323 
waiting for reboot ...5 
waiting for reboot ...4 
waiting for reboot ...3 
waiting for reboot ...2 
waiting for reboot ...1 
Doing last reboot...
*** Booting Zephyr OS build v1.0.4-alpha.1  ***
Flash device FLASH_CTRL 
Flash device 4096 
Id: 1, Address: 192.168.1.1
Id: 2, Key: ff fe fd fc fb fa f9 f8 
Id: 3, Reboot_counter: 800
Id: 5, Longarray: 0 1 2 3 4 5 6 7 8 9 a b c d e f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20 21 22 23 24 25 26 27 28 29 2a 2b 2c 2d 2e 2f 30 31 32 33 34 35 36 37 38 39 3a 3b 3c 3d 3e 3f 40 41 42 43 44 45 46 47 48 49 4a 4b 4c 4d 4e 4f 50 51 52 53 54 55 56 57 58 59 5a 5b 5c 5d 5e 5f 60 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76 77 78 79 7a 7b 7c 7d 7e 7f 
[00:00:00.008,000] [0m<dbg> fs_nvs.nvs_recover_last_ate: Recovering last ate from sector 2[0m
[00:00:00.010,000] [0m<inf> fs_nvs: 3 Sectors of 4096 bytes[0m
[00:00:00.010,000] [0m<inf> fs_nvs: alloc wra: 2, b78[0m
[00:00:00.010,000] [0m<inf> fs_nvs: data wra: 2, 2c0[0m
Reboot counter reached max value.
Reset to 0 and exit test.
```