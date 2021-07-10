const puppeteer = require('puppeteer')

;(async () => {
  const viewport = { width: 1366, height: 768 }

  console.time('浏览器启动时间')
  const browser = await puppeteer.launch({headless:true})
  console.timeEnd('浏览器启动时间')

  console.time('浏览器新建页面时间')
  const page = await browser.newPage()
  console.timeEnd('浏览器新建页面时间')

  console.time('打开页面时间')
  await page.goto('https://aiuu.top/')
  console.timeEnd('打开页面时间')

  console.time('设置视口时间')
  await page.setViewport(viewport)
  console.timeEnd('设置视口时间')

  console.time('获取页面宽高时间')
  const documentSize = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.body.clientHeight
    }
  })
  console.timeEnd('获取页面宽高时间')

  console.time('截图时间')
  await page.screenshot({path: 'temp.png', clip : {x:0, y:0, width:viewport.width, height:documentSize.height}})
  console.timeEnd('截图时间')

  console.time('关闭浏览器时间')
  await browser.close()
  console.timeEnd('关闭浏览器时间')

})()


/* 

# 经过测试 时间主要消耗在打开页面（加载页面的时间）和截图（页面越长越久）过程中，提前打开浏览器并没有太多提升

浏览器启动时间: 536.181ms
浏览器新建页面时间: 509.989ms
打开页面时间: 3.248s
设置视口时间: 96.279ms
获取页面宽高时间: 119.16ms
截图时间: 7.621s
关闭浏览器时间: 404.314ms


浏览器启动时间: 746.165ms
浏览器新建页面时间: 1.050s
打开页面时间: 3.255s
设置视口时间: 386.123ms
获取页面宽高时间: 190.949ms
截图时间: 7.542s
关闭浏览器时间: 435.762ms


浏览器启动时间: 740.658ms
浏览器新建页面时间: 403.521ms
打开页面时间: 472.205ms
设置视口时间: 5.495ms
获取页面宽高时间: 12.266ms
截图时间: 206.304ms
关闭浏览器时间: 199.076ms
*/