# 编译，烧录

`Lisa Plugin Zephyr` 提供了 `lisa zep build` 和 `lisa zep flash` 两个命名，用于CSK工程项目的应用固件编译、烧录。

## 编译

对 CSK 应用固件编译 的相关操作，均通过以下命令，带上不同的选项和参数，完成不同的操作：

```bash
lisa zep build [opts] <args>
```

### 基础

在CSK工程项目目录下，执行:

```bash
lisa zep build -b csk6001_pico
```

该命令会对当前CSK工程项目进行编译，基于 `-b` 参数选填的开发板。另外是否支持所填的开发板，需要由 CSK SDK 支持。执行完毕后，编译产物会存放在当前目录下的 `build` 文件夹里。

### 设置工程项目路径

工程项目的路径可作为参数直接带上，支持相对/绝对路径，假设工程项目绝对路径为： `E:\\my-zephyr-project\\blinky`

你可以在 `E:\\my-zephyr-project` 目录下执行：

```bash
lisa zep build ./blinky -b csk6001_pico
```

注意：编译产物会存放在 `E:\\my-zephyr-project\\build`

### 设置编译产物输出路径

在执行编译命令时，可带上 `--build-dir` 参数，带上相对路径。引用上面例子，执行命令：

```bash
lisa zep build ./blinky -b csk6001_pico --build-dir ./blinky/build
```

该命令执行后，编译产物会存放到 `E:\\my-zephyr-project\\blinky\\build`

若不想每次都带上 `--build-dir` ，也支持更改默认编译产物输出路径：

```bash
lisa zep config build.dir-fmt "you_want_build_path"
```

比如无论在哪里执行编译命令，都希望编译产物存放在工程目录下的 `build`，可以执行：

```bash
lisa zep config build.dir-fmt "{source_dir}/build"
```

### 设置默认开发板

执行：

```bash
lisa zep config build.board csk6001_pico
```

设置好后，后续执行 `lisa zep build` 编译时，可以不带 `-b` 参数，默认会基于 `csk6001_pico` 来进行编译。

### 原始编译

抛弃原有编译缓存/产物，重新基于工程项目进行编译。

在执行编译命令时，带上 `--pristine` 或 `-p` 参数，比如：

```bash
lisa zep build -b csk6001_pico -p
```

该参数是一个赋值参数，当不赋值时，默认值为 `always`，可选值和解释如下：

`auto` ：当检测到需要重新编译或编译会失败，则将编译产物文件夹恢复原始状态，进行编译

`always` ：始终将编译产物文件夹恢复原始状态来进行编译

执行例子：

```bash
lisa zep build -b csk6001_pico -p=auto
```

### 详细编译

要在终端打印 `CMake 和编译器` 命令，可以使用 `-v` 参数:

```bash
lisa zep -v build -b csk6001_pico
```

## 烧录

对 CSK 应用固件烧录 的相关操作，均通过以下命令，带上不同的选项和参数，完成不同的操作：

```bash
lisa zep flash [opts] <args>
```

### 基础

在已经存在编译产物 `build` 文件夹的工程项目目录下，执行：

```bash
lisa zep flash
```

如果要指定编译产物的 `build` 文件夹目录，可以带上 `--build-dir` 参数：

```bash
lisa zep flash --build-dir ./blinky/build
```

### 指定烧录工具

若要指定烧录工具，可以带上 `--runner` 的参数，比如：

```bash
lisa zep flash --runner pyocd
```

需要注意的是，需要烧录产物中设置支持，才能选择不同的烧录工具进行烧录。

当前烧录产物支持哪些 `runner`，以及默认设置的是什么，可查看 `bui1ld\\zephyr\\runners.yaml` 文件。

### 配置默认烧录工具和对应参数

**NOTE**: 该功能特性仅在 lisa zephyr 工具的 `1.4.1` 及以上版本支持，执行 `lisa info zephyr` 检查本地的工具版本，并可通过 `lisa update zephyr` 更新到最新工具版本。

```bash
lisa zep config flash.runner pyocd
```

该命令的配置会写入 sdk `.west/config` 中，并在后续执行 `lisa zep flash` 或文件系统烧录等相关烧录命令时，自动带上 `--runner pyocd` 参数。

```bash
lisa zep config flash.pyocd.frequency 200000000
```

该命令，在后续执行烧录 `--runner` 为 `pyocd` 时，自动带上 `--frequency 200000000` 参数。
