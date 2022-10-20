# 环境搭建常见问题

---

### 安装 CSK6一键安装包 时提示 “已保护你的电脑”

**现象描述**

在Windows系统上运行 CSK6一键安装包 时，提示 “Windows已保护你的电脑”，如图：
<div  align="left"><img
  src={require('./images/env_smartscreen.jpg').default}
  width="70%"
  alt="Example banner"
/></div>

**可能原因**

系统开启了SmartScreen，对部分安装程序产生告警。

**解决方法**

点击 “更多信息”，选择**仍要运行**。

---

### 安装 CSK6一键安装包 后执行 lisa 相关命令无内容输出

**可能原因**

安装完成后，环境变量对已打开的应用不会生效。

**解决方法**

重新启动你正在使用的终端程序（例如 powershell, cmd 等等）。

---

### lisa zep 命令报错

**现象描述**

* windows平台下出现 `Unable to create process using xxx`

**解决方法**

执行以下命令进行修复
```bash
lisa zep doctor
```

若问题依旧无法解决，请执行以下命令检查环境是否缺失
```bash
lisa info zep
```