# 📷 网页截图 | 网页快照 | 长截图

使用 `puppeteer` 无头浏览器获取屏幕截图(长图根据 `document.body.clientHeight` 计算)

使用 `puppeteer` 将下载 Chromium 的 bundle 版本，根据操作系统的不同，该版本大约 180 MB 至 300 MB

较长的页面截图时间大约在 15s 左右，主要消耗在加载页面和截图过程中

产生的图片需要自己清除，可以返回图片后删除或写个定时任务自动删除

> Puppeteer 允许你以编程方式操纵浏览器，就像操纵木偶一样。它通过为开发人员提供高级 API 来默认控制无头版本的 Chrome。

### 🍉 GET /screenshot?:url[&:size]

Koa API 可以部署到服务器上进行调用

- url: `https://xxxx.xxx?xxxx`
- size: 可选 截图尺寸
  - `iPhoneX` `375-812`
  - `iPhone` `414-736` `iPhone 6/7/8 Plus`
  - `iPad` `768-1024`
  - `default` `1366-768` `默认 普通的PC电脑`
  - `maxLarge` `1920-1080` `目前常用设备中最大的尺寸 网页最常用的设计尺寸`
  - `MacBook_15` `1440-900` `15寸MacBook Pro，很多UI设计师首选`
  - `MacBook_13` `1280-800` `13寸MacBook Pro`


### 💥 centos 下装 puppeteer 报错不能运行

缺少依赖库

```shell
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
```

然后启动浏览器代码加上参数：

```js
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
```


### 🎲 截图中文乱码

截图某网址时发现生成的图片，中文字体处都是方框。

原来centos系统默认不支持中文字体的，于是我去学了下Linux的字体安装

点击阅读：[Linux中文字体安装](https://ux34.cn/pages/28f903/)