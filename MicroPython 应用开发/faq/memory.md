# 内存使用相关

## 内存使用方式问题

当你启用 LVGL 之后，在默认情况下，LVGL 所使用的内存即为 SRAM 中分配的堆内存，但有些时候你可能需要加载文件系统中的资源文件用作界面展示（例如 gif 图片、ttf 字体等），这时候默认使用的 SRAM 很可能不够使用。你可以通过以下步骤来启用 PSRAM 用做 lvgl 的内存分配。

在你的板型的 `.conf` 文件中，启用以下配置：

```default
CONFIG_LV_Z_MEM_POOL_PSRAM_HEAP=y           # 启用 PSRAM 用作 LVGL 内存分配
CONFIG_LV_Z_MEM_POOL_BASE_ADDRESS=812646400 # PSRAM 起始地址，具体应参考具体设备的对应描述
CONFIG_LV_Z_MEM_POOL_MAX_SIZE=81920         # 要分配的内存大小
```

在项目目录的 `src/main.c` 中，添加以下代码，用于在系统启动时初始化 PSRAM：

```C
static int PSRAM_init(const struct device *unused)
{
  extern void PSRAM_Initialize(void);
  ARG_UNUSED(unused);
  PSRAM_Initialize();
  return 0;
}

SYS_INIT(PSRAM_init, PRE_KERNEL_2, 0);
```

至此，你已启用了 PSRAM 用于 LVGL 内存分配，但由于该特性可能仍有一些不稳定因素，因此默认也是关闭的，待特性完善、稳定后，将列入正文作为功能点介绍使用。

## 垃圾回收问题

MicroPython 维护了一套垃圾回收机制 （参考 [内存管理](https://listenai.github.io/MicroPythonDocCN/develop/memorymgt.html) ），其中对于一些内存的表现来讲可能有时候和你在使用 CPython 的过程中遇到的现象不尽相同，这里用一个简单的实际场景来概要说明一下。

下面是来自 LVGL 源码中 `lvgl/demos/widgets/lv_demo_widgets.py` 的一个代码示例，展示了一个循环动画运动小球的例子：

```python
def anim_x_cb(obj, v):
    obj.set_x(v)

def anim_size_cb(obj, v):
    obj.set_size(v, v)

#
# Create a playback animation
#
obj = lv.obj(lv.scr_act())
obj.set_style_bg_color(lv.palette_main(lv.PALETTE.RED), 0)
obj.set_style_radius(lv.RADIUS.CIRCLE, 0)

obj.align(lv.ALIGN.LEFT_MID, 10, 0)

a1 = lv.anim_t()
a1.init()
a1.set_var(obj)
a1.set_values(10, 50)
a1.set_time(1000)
a1.set_playback_delay(100)
a1.set_playback_time(300)
a1.set_repeat_delay(500)
a1.set_repeat_count(lv.ANIM_REPEAT.INFINITE)
a1.set_path_cb(lv.anim_t.path_ease_in_out)
a1.set_custom_exec_cb(lambda a1,val: anim_size_cb(obj,val))
lv.anim_t.start(a1)

a2 = lv.anim_t()
a2.init()
a2.set_var(obj)
a2.set_values(10, 240)
a2.set_time(1000)
a2.set_playback_delay(100)
a2.set_playback_time(300)
a2.set_repeat_delay(500)
a2.set_repeat_count(lv.ANIM_REPEAT.INFINITE)
a2.set_path_cb(lv.anim_t.path_ease_in_out)
a2.set_custom_exec_cb(lambda a1,val: anim_x_cb(obj,val))
lv.anim_t.start(a2)
```

从封装上来讲，我们很可能将启动动画的代码段封装为一个函数来使用，例如:

```python
def start_anim():
  obj = lv.obj(lv.scr_act())
  # ...
```

然后，使用时只需要调用 `start_anim()` ，即可开始动画。

从逻辑上来讲，这个场景是非常常见、易于理解的，但是在实际的运行过程中，该动画执行时是可以正常开始的，但过了一段时间后可能会报错提示 `obj` 中没有 `set_x` 或 `set_size` 函数。

原因在于，当使用这种封装后，虽然使用 `lambda` 转发了 `obj` 的引用，但实际过程中编译器可能无法正确识别 `obj` 的作用域，导致在一段时间后这一实例可能就会被垃圾回收机制回收了，动画的回调函数中也会无法识别 `obj` 参数导致程序异常。

那么很显然，我们需要至少在动画结束前，都维持这一对象的引用。在上述场景中，一种可能的解决方式是，将函数内的对象返回出来

```python
def start_anim():
  obj = lv.obj(lv.scr_act())
  # ...

  return (obj) # 使用 tuple 便于增加可能要返回的其他引用
```

然后在使用时将其返回值导出

```python
(obj) = start_anim()
```

这样子在运行时 `obj` 的作用域就扩大了，不会导致垃圾回收机制回收这一仍可能要被使用的变量。

在实际应用过程中，常常需要注意类似的场景，在具体的场景中考虑具体的对象引用、作用域问题，避免出现上述的问题。
