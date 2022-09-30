# 开发板使用常见问题

---

### 使用 Type-C 线连接启用 DFU 功能的开发板后，无法识别为有效设备

**可能原因**

部分 Type-C 线仅支持供电，而不支持数据传输。

**解决方法**

更换为确保具备数据传输功能的 TypeC 线。

---

### 在NanoKit开发板上将Flash更换为32M Flash后烧录程序无法自动运行，需手动断电重启

**原因**

32M Flash需要在Reset电路硬件设计上增加支持，NanoKit开发板未存在此设计，烧录完成后烧录器发出的硬件 Reset 指令无效。

**解决方法**

在NanoKit上验证32M Flash时需断电复位，进行产品硬件设计时，请咨询FAQ了解此部分硬件设计注意事项。

---

### 使用Jlink烧录固件后，固件无法正常运行，后续固件烧录概率性失败

**可能原因**

使用在线模组WIFI功能情况下，外部供电电流不足可能导致模组运转和Jlink运行异常。

**解决方法**

- 检查是否使用了Jlink的VCC输出对板子供电，若是，请使用USB供电；
- 若使用USB供电问题未解决，请使用非扩展坞的USB接口进行供电。