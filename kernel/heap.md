# 堆管理

Zephyr允许线程动态分配内存。

## 同步堆分配器

### 创建堆

最简单的方式是使用[K_HEAP_DEFINE](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.K_HEAP_DEFINE) 静态的定义堆。这个宏将传入堆名称和堆大小参数来静态定义一个 [k_heap](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap) 堆对象。通过堆对象来管理该块内存堆。

```c
static K_HEAP_DEFINE(test_heap, 1024 * 2);
```

也可以使用 [k_heap_init()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_init) 创建堆对象。

```c
static struct k_heap test_heap; /* define the heap object */
uint8_t test_heap_pool[1024 * 2];  /* define the heap region */
k_heap_init(&test_heap, test_heap_pool, sizeof(test_heap_pool));
```

### 分配内存


使用 [k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc) 从堆中分配内存，使用该接口需要传入堆对象(k_heap)和需要分配的内存大小。
这个函数类似标准C里面的 `malloc()` ，返回NULL表示分配失败。


`k_heap_alloc()` 支持阻塞操作，允许线程睡眠直到内存可用。**[k_timeout_t](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.k_timeout_t)** 表示阻塞的时间，可选为 **[K_NO_WAIT](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_NO_WAIT)** 或 **[K_FOREVER](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_FOREVER)** 之一。

```c
    char *mem_ptr;
    mem_ptr = k_heap_alloc(&test_heap, 200, K_NO_WAIT);
    if (mem_ptr != NULL) {
            printk("Memory allocated successfully\n");
    } else {
            printk("Memory not allocated\n");
    }
```

### 释放内存


[k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc) 分配的内存必须要通过 [k_heap_free()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_free) 来释放，与标准C的 `free()` 相似，传入的参数必须是`NULL` 或者 [k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc) 返回的地址。释放 `NULL` 值不会有任何影响。

```c
k_heap_free(&test_heap ,mem_ptr);
```

:::note

`k_heap` 相关的函数是线程安全，如果想使用更底层的堆分配函数，可以参考`sys_heap_aligned_alloc()` 相关接口。

:::