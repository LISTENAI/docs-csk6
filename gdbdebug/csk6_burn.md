# CSK6 串口烧录协议说明


本文描述了通过CSK6系芯片烧录UART接口对芯片进行固件烧录的方法，可用于上位机对CSK6进行固件升级的应用开发，通过本章节，您将了解到：
- 如何通过串口对CSK6芯片进行固件升级
- 使用串口进行固件升级遵循的通讯协议

## CSK6芯片串口烧录流程概述

通过串口对CSK6系芯片完成固件烧录的流程如下：
- Step1：通过控制芯片引脚时序使芯片在复位后进入UART启动模式
- Step2：通过指定UART接口写入代理程序
- Step3：按照烧录协议向UART传输固件升级内容
- Step4：复位芯片，固件完成烧录，芯片使用新的固件运行

上述步骤的 Step2(写入代理程序) 与 Step3(传输升级固件) 需遵循 **CSK6串口固件传输协议**，接下来将进行说明。


## CSK6串口固件传输协议

传输协议采用SLIP协议格式，上位机向CSK6芯片发送一个命令请求后，CSK6芯片将使用一个响应包对请求进行回应，回应数据包含状态信息与数据。

### SLIP编码规则
- 每个SLIP报文都以 ``0xC0`` 开始和结束
- 在包内，所有 ``0xC0`` 和 ``0xDB`` 需分别替换为 ``0xDB 0xDC`` 和 ``0xDB 0xDD``。

:::info
以上替换是在校验和和长度计算后完成的。
:::

### 协议说明

#### 命令包数据格式

| Byte| Name | Comment |
| ----| ---- | ---- |
| 0| Direction | 命令包中固定为``0x00`` |
| 1| Command | 命令标识符(参照[指令列表](#指令列表)) |
| 2-3| Size | Data字段的长度，单位为字节 |
| 4-7| Checksum | 仅当 Command 为 FLASH_DATA 和 MEM_DATA 时本字段为 Date 字段中``Data To Write``数据的和校验，其余Command 本字段为全0 |
| 8..n| Data | 长度可变的数据字段，不同Command的数据格式不同，详见[指令列表](#指令列表)的 Data 字段格式 |


#### 响应包数据格式

| Byte| Name | Comment |
| ----| ---- | ---- |
| 0| Direction | 响应包中固定为``0x01`` |
| 1| Command | 与触发响应的命令包中的Command字段保持一致 |
| 2-3| Size | Data字段的长度，单位为字节 |
| 4-7| Value | 固定为``0x00`` |
| 8| Error | ``0x00``表示成功，``0x01``表示失败 |
| 9| Status | 响应状态码，参照[响应状态码](#响应状态码)|
| 10-25| MD5 | MD5校验值，本字段仅在 Command 为 SPI_FLASH_MD5 时存在，其他Command无此字段 |


#### 指令列表

| Command| 值 | 功能描述 | Data字段格式|
| ----| ---- | ---- |---- |
| FLASH_BEGIN| 0x02 | 开始FLASH下载 | 参照[ FLASH_BEGIN 包数据格式](#flash_begin-包数据格式) |
| FLASH_DATA| 0x03 | FLASH下载数据 | 参照[ FLASH_DATA 包数据格式](#flash_data-包数据格式) |
| FLASH_END| 0x04 | FLASH下载结束 |参照[ FLASH_END 包数据格式](#flash_end-包数据格式)|
| MEM_BEGIN| 0x05 | 开始Memory下载 |参照[ MEM_BEGIN 包数据格式](#mem_begin-包数据格式) |
| MEM_END| 0x06 | Memory下载结束 |参照[ MEM_END 包数据格式](#mem_end-包数据格式)|
| MEM_DATA| 0x07 | Memory下载数据 |参照[ MEM_DATA 包数据格式](#mem_data-包数据格式) |
| SYNC|0x08 | 同步 | ``0x07 0x07 0x12 0x20`` + 32个 ``0x55`` |
| CHANGE_BAUDRATE| 0x0F | 改变波特率 |参照[ CHANGE_BAUDRATE 包数据格式](#change_baudrate-包数据格式) |
| SPI_FLASH_MD5|0x13 | MD5校验 |参照[ SPI_FLASH_MD5 包数据格式](#spi_flash_md5-包数据格式) |
| ERASE_FLASH| 0xD0 | 擦除整个FLASH | 无 |


#### 响应状态码

| Name| Data | Comment |
| ----| ---- | ---- |
| TRANSMIT_PASS| 0x00 | 传输成功 |
| DATA_STREAM_OVERFLOW| 0x01 | 数据缓冲区溢出错误 |
| TRANSFORM_FORMAT_ERROR| 0x02 | 格式转化错误 |
| ILLEGAL_DATA_PACKET| 0x03 | 非法数据 |
| CHECKSUM_FAILED| 0x04 | 数据校验错误 |
| COMMAND_SEQUENCE_ERROR| 0x05 | 指令顺序错误 |
| DATA_ID_SEQUENCE_ERROR| 0x06 | 数据指令ID顺序错误 |
| FLASH_ERROR| 0x08 | FLASH写入错误 |
| UNSUPPORT_COMMAND| 0x09 | 未支持指令 |


#### MEM_BEGIN 包数据格式

| Byte| Tpye | Name | Value |
| ----| ----| ---- | ---- |
| 0| /|Direction | 0x00 |
| 1| /|Command | 0x05 |
| 2-3| /| Size | 0x10 0x00 (Data段的长度)|
| 4-7| /|Checksum | 全为 0x00 |
| 8-11| Data |Total | 将使用MEM_DATA进行传输的数据总长度 |
| 12-15| Data |Packet Number | 需要传输的Packet数量 |
| 16-19| Data | Packet Size | 每一个Packet的数据长度 |
| 20-23| Data |Address | 全为 0x00 （传输的偏移地址） |

本数据包只需要传输一次

报文示例：
```bash
C0  00  05  10 00  00 00 00 00  CC 3E 00 00  08 00 00 00  00 08 00 00  00 00 00 00  C0
```

#### MEM_DATA 包数据格式

| Byte| Tpye |Name | Value |
| ----| ---- | ---- | ---- |
| 0| /| Direction | 0x00 |
| 1| /|Command | 0x07 |
| 2-3| /| Size | Data段的长度 |
| 4-7| /|Checksum | Data To Write字段的和校验值 |
| 8-11| Data | Data Length | Data To Write 数据段长度，根据需要传输的数据量来定，无对齐要求 |
| 12-15| Data |Number | Packet编号，默认从0开始，每发送一个MEM_DATA则加一，直到发送MEM_END才清空 |
| 16-23| Data |NULL | 全为 0x0 |
| 24..n| Data | Data To Write | 需要发送的数据 |

报文示例：
```bash
C0  00  07  10 08  F2 00 00 00  00 08 00 00  00 00 00 00  00 00 00 00 00 00 00 00 00 00 0A 00 F5 1C 08 …… 23 68 C0
```

#### MEM_END 包数据格式

| Byte| Tpye |Name | Value |
| ----| ---- | ---- | ---- |
| 0| /| Direction | 0x00 |
| 1| /| Command | 0x06 |
| 2-3| /| Size | 0x08 0x00 (Data段的长度) |
| 4-7| /| Checksum | 全为 0x00 |
| 8-15| Data | Flag | 全为 0x00 |

报文示例：
```bash
C0  00  06  08 00  00 00 00 00  00 00 00 00  00 00 00 00  C0
```

#### FLASH_BEGIN 包数据格式

| Byte| Tpye | Name | Value |
| ----| ----| ---- | ---- |
| 0| /|Direction | 0x00 |
| 1| /|Command | 0x02 |
| 2-3| /| Size | 0x10 0x00 (Data段的长度)|
| 4-7| /|Checksum | 全为 0x00 |
| 8-11| Data |Total | 使用FLASH_DATA时单包传输的数据长度，<br/>以单次传输256字节为例：0x00 0x10 0x00 0x00|
| 12-15| Data |Packet Number | 需要传输的Packet数量 |
| 16-19| Data | Packet Size | 每一个Packet的数据长度 |
| 20-23| Data |Address | 全为 0x00 （FLASH下载数据的偏移地址） |

本数据包只需要传输一次，将接下来需要传输的内容通知代理程序。

报文示例：
```bash
C0  00  02  10 00  00 00 00 00  00 10 00 00  01 00 00 00  00 10 00 00  00 00 00 00  C0
```


#### FLASH_DATA 包数据格式

| Byte| Tpye |Name | Value |
| ----| ---- | ---- | ---- |
| 0| /| Direction | 0x00 |
| 1| /|Command | 0x03 |
| 2-3| /| Size | Data段的长度 |
| 4-7| /|Checksum | Data To Write字段的和校验值 |
| 8-11| Data | Data Length | Data To Write 数据段长度，根据需要传输的数据量来定，无对齐要求 |
| 12-15| Data |Number | Packet编号，默认从0开始，每发送一个FLASH_DATA则加一，直到发送FLASH_END才清空 |
| 16-23| Data |NULL | 全为 0x0 |
| 24..n| Data | Data To Write | 需要发送的数据 |

报文示例：
```bash
C0  00  03  10 10  E1 00 00 00  00 10 00 00  00 00 00 00  00 00 00 00 00 00 00 00 00 7B E9 97 11 B5 48 …… 64 D1 A0 C0
```

#### FLASH_END 包数据格式

| Byte| Tpye |Name | Value |
| ----| ---- | ---- | ---- |
| 0| /| Direction | 0x00 |
| 1| /| Command | 0x04 |
| 2-3| /| Size |  0x04 0x00 (Data段的长度) |
| 4-7| /| Checksum | 全为 0x00 |
| 8-11| Data | Flag | 0xFF 0x00 0x00 0x00 (固定) |

报文示例：
```bash
C0  00  04  04 00  00 00 00 00  FF 00 00 00  C0
```


#### CHANGE_BAUDRATE 包数据格式

| Byte| Tpye |Name | Value |
| ----| ---- | ---- | ---- |
| 0| /|Direction | 0x00 |
| 1| /|Command | 0x0F |
| 2-3| /| Size | 0x08 0x00 |
| 4-7| /|Checksum | 全为 0x00 |
| 8-11| Data | New | 需要更改的目标波特率 |
| 12-15| Data | Old | 当前波特率 |

报文示例：
```bash
C0  00  0F  08 00  00 00 00 00  00 6D 0B 00  00 C2 01 00  C0
```
> 示例中，将波特率由115200变更为748800

#### SPI_FLASH_MD5 包数据格式

| Byte| Tpye |Name | Value |
| ----| ---- | ---- | ---- |
| 0| /| Direction | 0x00 |
| 1| /| Command | 0x13 |
| 2-3| /| Size | 0x10 0x00 |
| 4-7| /| Checksum | 全为 0x00 |
| 8-11| Data | Address | 校验起始地址 |
| 12-15| Data |Size | 需要校验的区域大小 |
| 16-23| Data | NULL | 全为 0x00 |

报文示例：
```bash
C0  00  13  10 00  00 00 00 00  00 00 00 00  00 10 00 00  00 00 00 00  00 00 00 00  C0
```

## 固件烧录流程

### 控制芯片进入UART模式

请参照以下步骤令CSK6芯片进入UART启动模式
- 1、上位机芯片对 CSK6芯片“BOOT0”引脚输入高电平，对“BOOT1”引脚输入低电平；
- 2、上位机芯片对 CSK6 芯片“RESTN”引脚的输入低电平，使 CSK6 复位，延时一段时间后恢复为高电平，使CSK6运行，此时 CSK6 进入 UART 启动模式
- 3、CSK6 在UART启动模式下， PA16 引脚会输出 4Hz 方波，可用于确认CSK6是否处于UART启动模式。（需注意连接到此引脚的外设是否会受到影响）
- 4、通过UART向芯片发送``SYNC`` 报文直至有报文响应

:::info
 固件烧录使用的串口引脚为：PA15(UART2_RXD)、PA18 (UART2_TXD)
:::

### 更改波特率

请参照以下步骤修改传输波特率，以提升固件升级的速率
- 向芯片发送 [CHANGE_BAUDRATE](#change_baudrate-包数据格式) 报文，检查响应报文
- 向芯片发送``SYNC`` 报文直至有报文响应

### 传输代理程序

请参照以下步骤将代理程序传输给芯片，用于接收并烧录业务固件
- 下载 [代理程序](./files/burner_6.img) 并解析得到其数据内容
- 依次使用[ MEM_BEGIN ](#mem_begin-包数据格式)、[ MEM_DATA ](#mem_data-包数据格式)(重复至发完)、[ MEM_END ](#mem_end-包数据格式)指令报文向芯片传输代理程序
- 向芯片发送``SYNC`` 报文直至有报文响应

### 向FLASH烧写业务固件
请参照以下步骤烧录业务固件，完成固件更新
- 依次使用[ FLASH_BEGIN ](#flash_begin-包数据格式)、[ FLASH_DATA ](#flash_data-包数据格式)(重复至发完)、[ FLASH_END ](#flash_end-包数据格式)指令报文向芯片传输固件
- 向芯片发送``SYNC`` 报文直至有报文响应
- 通过[ SPI_FLASH_MD5 ](#spi_flash_md5-包数据格式)指令执行校验

:::info
 每烧录完一个分区都要执行一次``FLASH_END``操作，再进行下一个分区的烧录，以确保数据烧写完整。
 
 同理，``SPI_FLASH_MD5``也需要在``FLASH_END``之后执行。
:::


