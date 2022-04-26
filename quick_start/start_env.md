# 安装开发工具

## 获取 Lisa 并安装 Zephyr 开发环境

**WARNING**: 获取前，请现确保本机已经安装了 `git` 工具。

Windows


1. 下载 [Lisa & Zephyr Installer](https://castor.iflyos.cn/castor/v3/lisaPluginZephyr/download?platform=windows) 并运行；


2. 根据安装引导进行安装。

安装完成后，打开终端，尝试登录Lisa账号并检查当前开发环境吧~

> ```bash
> lisa info zephyr
> ```

> **NOTE**: **Lisa & Zephyr Installer** 是面向Windows操作系统的开发的CSK6开发环境一体化安装包，支持SDK一键拉取与配置，方便开发者快速构建开发环境。

macOS、Ubuntu


1. 安装lisa & lisa plugin zephyr

在 **用户权限** 下执行：

使用 curl

```bash
curl -o- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```

或使用 wget

```bash
wget -qO- https://cdn.iflyos.cn/public/cskTools/lisa-zephyr-install.sh | bash
```

2. 安装 zephyr 对应环境

```bash
lisa zep install
```

来查看下当前的zephyr环境吧~

```bash
lisa info zephyr
```

**NOTE**: macOS、Linux也即将支持一体化安装包，敬请期待，这段时间辛苦你手指多运动啦~

`lisa info zephyr` 指令用于查看当前Zephyr的环境。在后续的开发上，该命令也可作为环境自检的一个方式。若在环境检测过中存在工具缺失的情况，请参照FAQ章节进行解决或联系我们。

新搭建的环境，如下图：



![image](./images/start_1.png)

除 `env` 和 `ZEPHYR_BASE` 外，其余环境项均安装成功，若存在未安装的，自行执行 `lisa zep install` 重新安装。

## 拉取 CSK6 SDK

```bash
lisa zep use-sdk ./my-zephyr-sdk --from-git https://cloud.listenai.com/zephyr/manifest.git
```

或者使用gitlab内部仓：

```bash
lisa zep use-sdk ./my-csk-sdk --from-git git@git.iflyos.cn:venus/zephyr/zephyr.git --manifest listenai/manifest.yml
```

## 配置 CSK6 编译环境

```bash
lisa zep use-env csk6
```



![image](./images/start_2.png)
