# Heap

Zephyr provides a collection of utilities that allow threads to dynamically allocate memory.

Zephyr允许线程动态分配内存。

## 同步堆分配器 Synchronized Heap Allocator

### 创建堆

The simplest way to define a heap is statically, with the **[K_HEAP_DEFINE](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.K_HEAP_DEFINE)** macro. This creates a static **[k_heap](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap)** variable with a given name that manages a memory region of the specified size.

最简单的方式是使用[K_HEAP_DEFINE](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.K_HEAP_DEFINE) 静态的定义堆。这个宏将传入堆名称和堆大小参数来静态定义一个 [k_heap](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap) 堆对象。通过堆对象来管理该块内存堆。

Heaps can also be created to manage arbitrary regions of application-controlled memory using **[k_heap_init()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_init)**.

也可以使用 [k_heap_init()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_init) 创建堆对象。

### 分配内存

Memory can be allocated from a heap using [k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc), passing it the address of the heap object and the number of bytes desired. This functions similarly to standard C `malloc()`, returning a NULL pointer on an allocation failure.

使用 [k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc) 从堆中分配内存，使用该接口需要传入堆对象(k_heap)和需要分配的内存大小。
这个函数类似标准C里面的 `malloc()` ，返回NULL表示分配失败。

The heap supports blocking operation, allowing threads to go to sleep until memory is available. The final argument is a **[k_timeout_t](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.k_timeout_t)** timeout value indicating how long the thread may sleep before returning, or else one of the constant timeout values **[K_NO_WAIT](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_NO_WAIT)** or **[K_FOREVER](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_FOREVER)**.

`k_heap_alloc()` 支持阻塞操作，允许线程睡眠直到内存可用。**[k_timeout_t](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.k_timeout_t)** 表示阻塞的时间，可选为 **[K_NO_WAIT](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_NO_WAIT)** 或 **[K_FOREVER](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html#c.K_FOREVER)** 之一。

### 释放内存

Memory allocated with **[k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc)**must be released using **[k_heap_free()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_free)**. Similar to standard C `free()`, the pointer provided must be either a `NULL` value or a pointer previously returned by **[k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc)** for the same heap. Freeing a `NULL` value is defined to have no effect.

[k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc) 分配的内存必须要通过 [k_heap_free()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_free) 来释放，与标准C的 `free()` 相似，传入的参数必须是`NULL` 或者 [k_heap_alloc()](https://docs.zephyrproject.org/latest/kernel/memory_management/heap.html#c.k_heap_alloc) 返回的地址。释放 `NULL` 值不会有任何影响。

:::note

`k_heap` 相关的函数是线程安全，如果想使用更底层的堆分配函数，可以参考`sys_heap_aligned_alloc()` 相关接口。

:::