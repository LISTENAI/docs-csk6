# 常见问题

这一章节介绍了一些可能遇到的问题，但可能并不能完全解决你的问题。当你遇到一些无法解决的问题时，请在 [此处](https://github.com/LISTENAI/lisa-plguin-micropython/issues) 新增一个议题提问。

## 直接执行 `lisa mpy` 进入了一个无法操作的终端

请注意，当不附带任何参数时， `lisa mpy` 相当于执行了 `lisa mpy connect` ，此时将默认去连接 `lisa mpy connect list` 结果中的第一个设备。在有些情况下，第一个设备并不会是目标的 MicroPython 设备。

当你发生了这个情况时，请在 `lisa mpy connect list` 列出来的设备中选择指定的设备进行连接。

## 执行 `lisa mpy connect` 提示设备忙

`lisa mpy connect` 的本质是 MicroPython 中的 `mpremote` 的工具，这一工具使用串口进行通讯，而串口通讯是单例的，这意味着，如果有其他程序占用了本串口的访问，那么将无法重新打开一个交互终端。

同理，当你已经打开了一个交互终端的时候，你也无法在其他终端中对该设备执行其他的 `lisa mpy` 命令（文件操作等）。

## 在交互式终端中无法输入中文

为了避免一些不必要的编码错误， MicroPython 在交互式终端中只支持了部分编码的展示，但是中文字符的使用在 .py 文件中是毫无问题的。如果你非要在交互式终端中使用中文字符，你可以尝试先转换为 HEX 编码，这里有一个 [在线转换 Hex 的网站](https://stool.chinaz.com/hex) ，例如将【聆思】转换为 Hex 编码为 `%e8%81%86%e6%80%9d` ，将 `%` 换成 `\\x` ，即

```python
"\xe8\x81\x86\xe6\x80\x9d"
```
