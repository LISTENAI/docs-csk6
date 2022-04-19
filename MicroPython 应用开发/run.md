# 运行代码

通过 [开始项目](start#mpy-start) 章节，你已经将可打印 `hello world` 的 Python 代码运行到设备上了，接下我们介绍有多少种方式来运行代码。

## 连接设备

执行以下命令在 PC 上列出可用的 MicroPython 串口设备：

```bash
lisa mpy connect list
```

选择对应的设备进行连接，下面是该命令的输出可能的结果

Windows

```bash
> lisa mpy connect list
COM3 AQ00RHXYA 0403:6001 FTDI None
COM4 0700000000140022470000144E503054A5A5A5A597969908 0d28:0204 Microsoft None
```

Unix

```bash
> lisa mpy connect list
/dev/cu.BLTH None 0000:0000 None None
/dev/cu.Bluetooth-Incoming-Port None 0000:0000 None None
/dev/cu.usbmodem14331302 0700000000140022470000144e503054a5a5a5a597969908 0d28:0204 ARM DAPLink CMSIS-DAP
```

复制对应的串口地址，执行连接命令即可进入交互式终端，以 `COM3` 为例，则执行

```bash
lisa mpy connect COM3
```

运行后终端中将出现

```bash
Connected to MicroPython at COM3
Use Ctrl-] to exit this shell

>>>
```

在此处可用的操作基本与在 PC 机上直接运行 `python` 命令时一致。

## 单行命令运行代码

```bash
lisa mpy exec "print('hello world')"
```

## 进入终端运行代码

以连接到 `COM3` 为例

```bash
lisa mpy connect COM3
```

运行后终端中将出现

```bash
Connected to MicroPython at COM3
Use Ctrl-] to exit this shell

>>>
```

在此处可用的操作基本与在 PC 机子上直接运行 `python` 命令时一致。

**WARNING**: 需要注意的是，每次通过此命令连接到设备时，都相当于 **软重启** 了设备；同理，当通过 `Ctrl-]` 退出终端时，也会对设备执行 **软重启** 。

## 运行 PC 上的脚本文件

同样以 `COM3` 为例，执行

```bash
lisa mpy run ./py/main.py
```

终端中则会打印运行 `./py/main.py` 的运行结果。

## 在文件系统中执行

*当设备重启时，首先会检查文件系统下是否有名为* `main.py` *的代码文件，有则开始执行。*

### 复制脚本文件到文件系统

复制文件可通过在 `py` 目录中执行

```bash
lisa mpy cp main.py :
```

若要复制整个目录，则可执行

```bash
lisa mpy cp -r . :
```

但有时候更可能你不只是需要新建或修改代码文件，还需要删除设备中一些不需要的文件，更多关于对文件系统的操作可参阅 [命令使用](../工具/Lisa Plugin MicroPython/commands#mpy-lisa-commands) 的文件系统操作章节。

### 烧录脚本文件到文件系统

执行以下命令

```bash
lisa mpy flash --fs
```

此操作仅将文件系统烧录到设备中，烧录完成后需要 **软重启** 触发一次文件系统的重新挂载。

## 从 C 执行 Python 语句

创建以下函数

```C
#include "py/compile.h"
#include "py/runtime.h"

static void do_str(const char *src, mp_parse_input_kind_t input_kind) {
    nlr_buf_t nlr;
    if (nlr_push(&nlr) == 0) {
        // Compile, parse and execute the given string.
        mp_lexer_t *lex = mp_lexer_new_from_str_len(MP_QSTR__lt_stdin_gt_, src, strlen(src), 0);
        qstr source_name = lex->source_name;
        mp_parse_tree_t parse_tree = mp_parse(lex, input_kind);
        mp_obj_t module_fun = mp_compile(&parse_tree, source_name, true);
        mp_call_function_0(module_fun);
        nlr_pop();
    } else {
        // Uncaught exception: print it out.
        mp_obj_print_exception(&mp_plat_print, (mp_obj_t)nlr.ret_val);
    }
}
```

调用时，有两种方式

### 1. 单行语句

```C
// 单行语句执行
do_str("print('hello world')", MP_PARSE_SINGLE_INPUT);
```

当你在使用此方式时，本质上和 `lisa mpy exec "print('hello world')"` 相同，也基本等同于 CPython 的 `python -c "print('hello world')"` 。

### 2. 多行语句

```C
// 多行执行
do_str("import micropython\n"
"\n"
"print(dir(micropython))\n"
"\n"
"for i in range(10):\n"
"    print('iter {:08}'.format(i))", MP_PARSE_FILE_INPUT);
```

当使用此方式时，本质和执行一个带有以上 Python 代码的文件相同。

## 从 C 调用 Python 函数

```python
from os import listdir
result = listdir()
```

下面的调用实现了对上述 Python 语句的翻译

```c
mp_obj_t function = mp_import_from(mp_obj_new_module(MP_QSTR_os), MP_QSTR_listdir);
mp_obj_t result = mp_call_function_0(function);
mp_obj_t mp_print = mp_load_name(MP_QSTR_print);
mp_call_function_1(mp_print, result);
```


* 几乎所有的调用函数都来自于 `${MICROPY_SDK}/py/obj.h` 和  `${MICROPY_SDK}/py/runtime.h` 中的声明。


* `MP_QSTR_` 代表字符串常量，如 `MP_QSTR_os` 代表 `os` 字符串常量。详见 [MicroPython 字符串](https://listenai.github.io/MicroPythonDocCN/develop/qstr.html) 。


* `mp_call_function_1` 代表调用参数数量为 1 的函数。
