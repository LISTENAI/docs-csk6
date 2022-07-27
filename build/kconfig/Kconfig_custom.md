# 自定义 Kconfig 预处理函数

Kconfiglib supports custom Kconfig preprocessor functions written in Python. These functions are defined in scripts/kconfig/kconfigfunctions.py.  
Kconfiglib支持用Python编写的自定义Kconfig预处理器函数。这些函数在[scripts/kconfig/kconfigfunctions.py](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/scripts/kconfig/kconfigfunctions.py.)中定义。

:::info 
The official Kconfig preprocessor documentation can be found here.  
官方的Kconfig预处理器文档可以在[这里](https://www.kernel.org/doc/html/latest/kbuild/kconfig-macro-language.html)找到。
:::

Most of the custom preprocessor functions are used to get devicetree information into Kconfig. For example, the default value of a Kconfig symbol can be fetched from a devicetree reg property.  
大多数自定义预处理器函数用于将设备树信息导入Kconfig。例如，可以从设备树`reg`属性中获取Kconfig符号的默认值。

## 与设备树相关函数

The functions listed below are used to get devicetree information into Kconfig. See the Python docstrings in scripts/kconfig/kconfigfunctions.py for detailed documentation.  
下面列出的函数用于将设备树信息获取到Kconfig中。有关详细文档，请参考[scripts/kconfig/kconfigfunctions.py](https://cloud.listenai.com/zephyr/zephyr/-/tree/master/scripts/kconfig/kconfigfunctions.py.)

The *_int version of each function returns the value as a decimal integer, while the *_hex version returns a hexadecimal value starting with 0x.  
`*_int` 类型的函数都是返回十进制整数值，而`*_hex`类型则返回以`0x`开头的十六进制值。

```
$(dt_chosen_reg_addr_int,<property in /chosen>[,<index>,<unit>])
$(dt_chosen_reg_addr_hex,<property in /chosen>[,<index>,<unit>])
$(dt_chosen_reg_size_int,<property in /chosen>[,<index>,<unit>])
$(dt_chosen_reg_size_hex,<property in /chosen>[,<index>,<unit>])
$(dt_node_reg_addr_int,<node path>[,<index>,<unit>])
$(dt_node_reg_addr_hex,<node path>[,<index>,<unit>])
$(dt_node_reg_size_int,<node path>[,<index>,<unit>])
$(dt_node_reg_size_hex,<node path>[,<index>,<unit>])
$(dt_compat_enabled,<compatible string>)
$(dt_chosen_enabled,<property in /chosen>)
$(dt_node_has_bool_prop,<node path>,<prop>)
$(dt_node_has_prop,<node path>,<prop>)
```
### 使用示例

Assume that the devicetree for some board looks like this:  
假设某些板的设备树如下所示：

```
{
     soc {
             #address-cells = <1>;
             #size-cells = <1>;

             spi0: spi@10014000 {
                     compatible = "sifive,spi0";
                     reg = <0x10014000 0x1000 0x20010000 0x3c0900>;
                     reg-names = "control", "mem";
                     ...
             };
};
```

The second entry in reg in spi@1001400 (<0x20010000 0x3c0900>) corresponds to mem, and has the address 0x20010000. This address can be inserted into Kconfig as follows:  
`reg` 中的第二个条目`spi@1001400（<0x20010000 0x3c0900>）`对应于`mem`地址为`0x20010000`。该地址可以插入到Kconfig中，如下所示：

```
config FLASH_BASE_ADDRESS
     default $(dt_node_reg_addr_hex,/soc/spi@1001400,1)
```

After preprocessor expansion, this turns into the definition below: 
在预处理器扩展后，就变成下面的定义: 
```
config FLASH_BASE_ADDRESS
     default 0x20010000
```