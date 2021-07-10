## 前言

学习使用 `puppeteer` 工具时，做了一个网页截图工具，部署到阿里云的服务器上。截图某网址时发现生成的图片，中文字体处都是方框。

![网页截图](https://gitee.com/umbrella34/blogImage/raw/master/img/image-20210710160022012.png)



原来centos系统默认不支持中文字体的，网上的解决方案基本是手动安装windows系统中的中文字体库到centos中。

## 1、拷贝Window字体

首先，将windows系统中的字体拷贝出来：

windows：打开 `C:\Windows\Fonts`

![windows-Fonts](https://gitee.com/umbrella34/blogImage/raw/master/img/image-20210710160426214.png)

复制你需要的字体到单独的文件夹，后面需要上传到服务器。

![复制字体](https://gitee.com/umbrella34/blogImage/raw/master/img/image-20210710160906787.png)



## centos 安装字体

#### 1、首先安装字体配置工具( fontconfig )

```shell
yum -y install fontconfig

# 查看目前已安装的中文字体，不出意外一个也没有
fc-list :lang=zh
```

#### 2、复制字体

```shell
cd /usr/share/fonts

mkdir chinese

cd chinese
# 上传复制好的 windows 字体到目录下
# 使用你会的方式上传 比如 ftp、宝塔面板等方式
# 这边就不演示了，我使用的是Xftp

# 给文件权限
chmod -R 755 /usr/share/fonts/chinese
```

![新建目录](https://gitee.com/umbrella34/blogImage/raw/master/img/image-20210710162623682.png)

![上传字体到服务器](https://gitee.com/umbrella34/blogImage/raw/master/img/image-20210710162433944.png)



#### 3、安装 ttmkfdir 工具

```shell
yum -y install ttmkfdir

ttmkfdir -e /usr/share/X11/fonts/encodings/encodings.dir
```

#### 4，修改字体配置文件

把我们保存字体的文件夹 `/usr/share/fonts/chinese` 添加到 `/etc/fonts/fonts.conf` 中。

```shell
vim /etc/fonts/fonts.conf

# 或直接使用其他工具打开这个文件编辑
```

![编辑配置文件](https://gitee.com/umbrella34/blogImage/raw/master/img/image-20210710163819642.png)

保存退出

#### 5、字体生效

一般来说到了上一步，字体就已经安装成功了。

如果没生效的话就重启 `reboot` 吧

如果无法reboot，可以执行

**查看是否安装成功**

```
fc-list :lang=zh
```

到此我的网页截图工具又可以正常使用了。

![网页截图](https://gitee.com/umbrella34/blogImage/raw/master/img/image-20210710165050430.png)