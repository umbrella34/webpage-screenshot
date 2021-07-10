const puppeteer  = require('puppeteer')
const { nanoid } = require('nanoid')
const screenSize = require('./config/screenSize') // 常用屏幕尺寸

// function screenshot(url: string, sizeType: string): Promise<string | false>
async function screenshot(url, sizeType){
  try {
    viewport = screenSize[sizeType] || screenSize.default // 获取截图的屏幕尺寸
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()
    await page.goto(url)
    await page.setViewport(viewport) // { width: 1366, height: 768 }
    const documentSize = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.body.clientHeight
      }
    })
    const fileName = `${nanoid()}.png`
    await page.screenshot({path: fileName, clip : {x:0, y:0, width:viewport.width, height:documentSize.height}})
    await browser.close()
    return fileName
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = screenshot