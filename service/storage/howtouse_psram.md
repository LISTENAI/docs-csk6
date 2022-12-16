# CSK6 PSRAM 内存空间使用方法

## 概述

CSK6内置1MB SRAM，8MB PSRAM和 8MB Flash，其中部分 CSK6 型号 支持外置Flash ，CSK6 的系统默认运行在 SRAM 上。

由于 CSK6 是采用多核异构的架构，DSP 和 MCU都需要使用到 SRAM 的内存资源，那么就需要对内存空间进行合理分配，因此在CSK6系统中，我们给 DSP 预分配了 680K 的内存空间，给 MCU 预分配了 320K 的内存空间。在实际项目开发中，往往会遇到 SRAM 内存紧张的情况，此时就需要将一部分程序或者是内存的申请放到 PSRAM 上，以解决内存不足的问题。

本章节通过示例讲解 PSRAM 内存空间的使用方法，包括 PSRAM 静态内存申请、PSRAM 动态内存申请、PSRAM 内存使用情况等内容。

## CSK6 PSRAM 内存分配

<img
  width="80%"
  src={require('./files/clipboard.png').default}
  /> 

从CSK6 的存储器分布图可以看到，PSRAM 的起始地址是 30000000~307f0000，总共8M 的空间，由于DSP 和 MCU都可能会使用到 PSRAM 的内存资源，所以 PSRAM 内存空间需要约定并通过起始地址来划分区域，下面我们来看CSK6 SDK 设备树 dts 文件中 PSRAM 内存空间的分配，以`csk6011a_nano` 板型为例：

```shell
&psram0 {
        reg = <0x30000000 DT_SIZE_M(8)>;
        #address-cells = <1>;
        #size-cells = <1>;

        /*psram for cp core slot: 6MB */
        psram_cp: psram_cp@30000000 {
                compatible = "listenai,csk6-psram-partition";
                reg = <0x30000000 0x600000>;
                status = "okay";
        };

        /*psram for ap core slot: 1MB */
        psram_ap: psram_ap@30600000 {
                compatible = "zephyr,memory-region",
                             "listenai,csk6-psram-partition";
                reg = <0x30600000 0x100000>;
                status = "okay";
                zephyr,memory-region = "PSRAMAP";
        };

        /*psram for ap share with cp slot: 512KB */
        psram_share: psram_share@30700000 {
                compatible = "listenai,csk6-psram-partition";
                reg = <0x30700000 0x80000>;
                status = "okay";
        };
};
```

### PSRAM 配置说明：

| 配置项      | 说明                      | 偏移地址   | 大小长度 | 转换大小 |
| ----------- | ------------------------- | ---------- | -------- | -------- |
| psram_cp    | DSP 预分配内存            | 0x30000000 | 0x600000 | 6MB      |
| psram_ap    | MCU 预分配内存            | 0x30600000 | 0x100000 | 1M       |
| psram_share | DSP 和 MCU 通讯的共享内存 | 0x30700000 | 0x80000  | 0.5M     |

从配置中可以看到，系统给 DSP 分配了6M 的内存空间，给 MCU 预分配了1M的内存空间，给DSP 和 MCU 通讯的共享内存预分配了512K 内存空间，该配置是根据系统 DSP 核和 MCU 核实际使用需求来分配，在实际项目中往往需要调整，假设实际项目中 DSP 和MCU 实际的使用需求为 DSP 4M，MCU 3M，那么我们可以在应用项目的`boards/csk6011a_nano.overlay` 中将 PSRAM 的内存配置做如下调整：

```shell
/* 删除掉系统dts默认配置的参数 */
/delete-node/ &psram_ap;
/delete-node/ &psram_cp;
/delete-node/ &psram_share;

/* 重新配置psram的内存分配 */
&psram0 {
        reg = <0x30000000 DT_SIZE_M(8)>;
        #address-cells = <1>;
        #size-cells = <1>;

        /*psram for cp core slot: 6MB */
        psram_cp: psram_cp@30000000 {
                compatible = "listenai,csk6-psram-partition";
                reg = <0x30000000 0x400000>;
                status = "okay";
        };

        /*psram for ap core slot: 3MB */
        psram_ap: psram_ap@30600000 {
                compatible = "zephyr,memory-region",
                             "listenai,csk6-psram-partition";
                reg = <0x30400000 0x700000>;
                status = "okay";
                zephyr,memory-region = "PSRAMAP";
        };

        /*psram for ap share with cp slot: 512KB */
        psram_share: psram_share@30700000 {
                compatible = "listenai,csk6-psram-partition";
                reg = <0x30700000 0x80000>;
                status = "okay";
        };
};
```

此外，实际项目中需要再从 psram 中分配一些内存空间，给某个模块使用，可参考上述的配置项进行添加，注意地址不要有重叠。

## PSRAM 内存申请

### PSRAM 动态内存申请

CSK6 基础 SDK 封装了 psram 的使用接口，应用项目中需要使用 PSRAM 内存时，首先需要在应用项目的 `prj.conf` 文件中打开 psram 内存配置，并预分配一定大小内存池，用于动态内存和静态内存的申请，具体配置如下：

```
# psram 内存配置
CONFIG_CSK_HEAP=y
# 应用项目在 psram 上预申请的内存池
CONFIG_CSK_HEAP_MEM_POOL_SIZE=4096
```

#### 动态内存申请：

```c
char* ptr = NULL;
ptr = csk_malloc(MALLOC_SIZE);
```

#### 动态内存重分配：

```c
char* ptr_calloc = NULL; 
ptr = csk_realloc(ptr,REALLOC_SIZE);
```

#### 动态分配内存块，并配置为零：

```c
char* ptr_calloc = NULL;
ptr_calloc = csk_calloc(CALLOC_NUM,CALLOC_NUM_SIZE);
```

#### 内存释放:

```c
csk_free(ptr);
```

#### 动态内存查询接口：

```c
csk_heap_info();
```

#### 动态内存申请和查询示例：

```c
#include <zephyr.h>
#include <csk_malloc.h>
#define MALLOC_SIZE  (1000)

void main(void)
{
	/* 动态内存申请 */
	char* ptr = NULL;
	char* ptr_calloc = NULL;
    /* 动态内存申请 */
    ptr = csk_malloc(MALLOC_SIZE);
    printk("After malloc %d bytes ,heap info:\n",MALLOC_SIZE);
    /* 动态内存使用情况查询 */
    csk_heap_info();
    
    /* 释放内存 */
    csk_free(ptr);
	printk("After free all ,heap info:\n");
	csk_heap_info();
}
```

申请动态内存后的日志输出结果：

```shell
After malloc 1000 bytes ,heap info:
Heap at 0x30600000 contains 511 units in 9 buckets

bucket# min units total largest largest
threshold chunks (units) (bytes)
-----------------------------------------------------------
8 256 1 378 3020

3020 free bytes, 1004 allocated bytes, overhead = 68 bytes (1.7%)
```

在系统输出日志中仅需要关注关键信息即可：`3020 free bytes, 1004 allocated bytes，overhead = 68 bytes (1.7%)`。

释放内存后的日志输出结果：

```shell
After free all ,heap info:
Heap at 0x30600000 contains 511 units in 9 buckets

bucket# min units total largest largest
threshold chunks (units) (bytes)
-----------------------------------------------------------
8 256 1 504 4028

4028 free bytes, 0 allocated bytes, overhead = 64 bytes (1.6%)
CSK Heap test complete!
```

:::note
提示：

更多关于csk_realloc()、csk_calloc(）等接口的使用请运行malloc sample查看结果。
:::


### PSRAM 静态内存申请

#### 静态内存申请方法：

```c
/* 静态内存申请 */
__attribute__((section(".psram_section"))) static const char venus_system_tag[] = { ... };

```

#### 静态内存申请示例：

在 `psram` 中定义一个数组：

```c
__attribute__((section(".psram_section"))) static const char venus_system_tag[] = {
    0x48, 0x72, 0x01, 0x00, 0xA4, 0x52, 0x08, 0x00, 0x00, 0x00, 0x00, 0x18, 0x01,
    0x00, 0x00, 0x00, 0x56, 0x45, 0x4E, 0x55, 0x53, 0x5F, 0x52, 0x54, 0x4F, 0x53,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x05, 0xD7, 0x2C};
```

通过使用`__attribute__((section(".psram_section")))`标注来实现在数组、变量等在 `psram` 上的静态内存申请。


## 应用项目内存使用情况查询

#### 通过编译结果查看：

基于上文 psram 分配方式，假设在一个应用项目在`csk6011a_nano.overlay`文件中给 DSP 预分配 4M psram 内存空间，给 MCU 预分配 3M psram 内存空间，在`prj.conf文件中`打开psram的动态内存申请配置，并预分配 4096B 的动态内存池。
通过编译可获取应用项目整体内存使用情况，在项目编译后输出如下信息：

```shell
Memory region         Used Size  Region Size  %age Used   
           FLASH:       43668 B        16 MB      0.26%   
            SRAM:        8600 B       320 KB      2.62%   
            ITCM:        4612 B        16 KB     28.15%   
            DTCM:          0 GB        16 KB      0.00%   
         PSRAMAP:       83010 B         3 MB      2.64%   
        IDT_LIST:          0 GB         2 KB      0.00%   

✔ 构建成功            
```

参数说明：

| 参数          | 说明         |
| ------------- | ------------ |
| Memory region | 内存域       |
| Used Size     | 已使用的内存 |
| Region Size   | 预分配的内存 |
| age Used      | 使用百分比   |

编译后可看到应用项目中图片资源在 psram 中占用了 88196B 内存空间，88196B 包含了为图片资源（静态内存资源）和 4096 B (CONFIG_CSK_HEAP_MEM_POOL_SIZE=4096)的动态内存池，整个应用项目对 psram 内存资源（3M）的使用率为 2.64%。

此外，在编译结果信息中还包含了应用项目对FLASH、SRAM、ITCM、DTCM等存储资源的使用情况，其中 SRAM 的内存使用同样包含了应用项目中在 SRAM 上申请的静态变量和应用项目在 SRAM 上预申请的动态内存池。更多关于 SRAM 的使用介绍将会在 [CSK6 SRAM 使用介绍]中详细描述。

#### 通过SHELL 命令查看系统线程的内存使用情况

CSK6 支持通过 SHELL 命令行通过串口输入命令进行交互，在使用 SHELL 命令行调试之前需要在应用项目的`prj.conf`文件中打开 SHELL 的组件配置，具体如下：

```shell
# Shell 组件配置
CONFIG_SHELL=y
```

:::note

更多关于shell的使用请查阅<a href="../../application/shell_sample.md" target="_blank">shell 的使用</a>章节。

:::

应用项目运行后即可在命令行窗口输入以下指令：

```c
kernel threads
```

CSK6 日志输出结果：

```shell
kernel threads
Scheduler: 321 since last call
Threads:
 0x80610 sysworkq  
	options: 0x0, priority: -1 timeout: 0
	state: pending, entry: 0x18001a09
	stack size 1024, unused 832, usage 192 / 1024 (18 %)

*0x80320 shell_uart
	options: 0x0, priority: 14 timeout: 0
	state: queued, entry: 0x1800327d
	stack size 2048, unused 1048, usage 1000 / 2048 (48 %)

 0x80418 idle      
	options: 0x1, priority: 15 timeout: 0
	state: , entry: 0x1800cbe1
	stack size 320, unused 272, usage 48 / 320 (15 %)

 0x80510 main      
	options: 0x1, priority: 0 timeout: 66520
	state: suspended, entry: 0x18006f31
	stack size 4096, unused 3656, usage 440 / 4096 (10 %)
```

从日志输出结果可以看到csk6运行后内核线程的内存使用情况，以上日志中包含以下线程的内存信息：

- sysworkq 系统工作队列
- shell_uart shell的调试线程
- idle 线程
- main 主线程

在 main 主线程的信息中，我们可以得到以下信息：

- 预分配的动态内存池的总大小为：stack size 4096；主线程动态内存池的大小在哪里设置呢？它是由`proj.conf`文件中的`CONFIG_MAIN_STACK_SIZE=4096` 配置决定的，如果不配置，那么默认是`2048`（单位是B）。
- 未使用的内存大小：unused 3656；
- 已使用的内存大小和占比：usage 440 / 4096 (10 %)。



:::note

该章节中提到的csk_malloc sample的获取方式：

通过`lisa zep create`指令按以下目录选择完成sample获取：  

\> sample → csk6→ subsys→ csk_malloc

:::
