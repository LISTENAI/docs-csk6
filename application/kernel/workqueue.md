# 工作队列使用示例

## 概述
工作队列(workqueue)是一个使用特定线程来运行工作项(work items)的内核对象，其方式为先进先出，通过调用工作项指定的函数来处理每个工作项。工作队列的典型应用是在中断或者高优先级线程中去分担部分工作到一个低优先级的线程中，其目的是减少中断或高优先级线程的处理时长，所以它不影响时间敏感的处理。

:::tip
在学习本章节前建议开发者先学习[工作队列线程](../../kernel/workqueue.md)章节，并结合本章节示例掌握工作队列的使用。
:::

## 常用API接口

### k_work_init

```c
void k_work_init(struct k_work *work, k_work_handler_t handler)
```

**接口说明：**

初始化（不可延迟的）工作结构。

**参数说明**：

| 字段    | 说明                   |
| ------- | ---------------------- |
| work    | 要初始化的工作结构。   |
| handler | 工作项调用的处理程序。 |

### k_work_queue_init

```c
void k_work_queue_init(struct k_work_q *queue)
```

**接口说明：**

初始化工作队列结构。

**参数说明**：

| 字段  | 说明                 |
| ----- | -------------------- |
| queue | 要初始化的队列结构。 |

### k_work_queue_start

```c
void k_work_queue_start(struct k_work_q *queue, k_thread_stack_t *stack, size_t stack_size, int prio, const struct k_work_queue_config *cfg)
```

**接口说明：**

初始化工作队列。

**参数说明**：

| 字段       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| queue      | 指向队列结构的指针。在使用之前，必须在归零/bss内存中或使用k_work_queue_init对其进行初始化。 |
| stack      | 指向工作线程堆栈区域的指针。                                 |
| stack_size | 工作线程堆栈区域的大小，以字节为单位。                       |
| prio       | 初始线程优先级。                                             |
| cfg        | 可选的附加配置参数。如果不需要，则传递NULL，以使用k_work_queue_config中记录的默认值。 |



### k_work_submit

```c
int k_work_submit(struct k_work *work)
```

**接口说明：**

将工作项提交到系统队列。

**参数说明**：

| 字段 | 说明               |
| ---- | ------------------ |
| work | 指向工作项的指针。 |



更多关于工作队列的API接口描述请学习[Work Queue APIs](https://docs.zephyrproject.org/latest/doxygen/html/group__workqueue__apis.html)章节。



## 使用示例

```c
#include <zephyr/zephyr.h>

#define MY_STACK_SIZE 512
#define MY_PRIORITY 5

K_THREAD_STACK_DEFINE(my_stack_area, MY_STACK_SIZE);

struct k_work_q my_work_q;

struct device_info {
    struct k_work work;
    char name[16]
} my_device;


void print_work_item(struct k_work *item)
{
    /* 通过工作项获取结构体句柄 */
    struct device_info *the_device =
        CONTAINER_OF(item, struct device_info, work);
    printk("execute on device %s\n", the_device->name);
}

void main(void)
{
        printk("work queue sample! %s\n", CONFIG_BOARD);
    	/* 初始化工作队列 */
        k_work_queue_init(&my_work_q);
		/* 启动工作队列 */
        k_work_queue_start(&my_work_q, my_stack_area,
                                        K_THREAD_STACK_SIZEOF(my_stack_area), MY_PRIORITY,
                                        NULL);

        /* 初始化结构体名称 */
        strcpy(my_device.name, "FOO_dev");
    	/* 为工作项绑定处理函数 */
        k_work_init(&my_device.work, print_work_item);        
    
		/* 将工作项添加到指定工作队列中。可用在中断中，减少中断的处理时间 */
        k_work_submit_to_queue(&my_work_q, &my_device.work);
}
```

dsjklasjkljskld

### 运行结果

```shell
*** Booting Zephyr OS build v1.0.4-alpha.1  ***
work queue sample! csk6002_9s_nano
execute on device FOO_dev
```

