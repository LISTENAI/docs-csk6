# 文件系统相关

当你阅读过 [运行代码](../run#mpy-run-code) 和 [打包程序到固件](../bundle_program) 的介绍后，想必你已经对文件系统对运行代码的支持有了足够的了解。那么很可能产生下述一些问题。

## 文件系统需要配置多大

目前，我们支持的文件系统格式为 [LittleFS](https://github.com/littlefs-project/littlefs) ，实际过程中你在 `py` 目录中使用的空间大小并不完全等价于最终打包出来的镜像的大小。

参考 `lisa mpy` 命令使用中的 [文件系统大小](../../工具/Lisa Plugin MicroPython/commands#lisa-mpy-fs-calc) 章节，你可以通过在你的项目目录下执行以下命令，来获得一个推荐的大小：

```bash
lisa mpy fs:calc
```
