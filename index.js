const path       = require('path')
const fs         = require('fs')
const screenshot = require('./screenshot')
const koa        = require('koa')
const Router     = require('koa-router')
const app        = new koa()
const router     = new Router()

// get /screenshot?:url[&:size]
router.get('/screenshot', async (ctx) => {
  console.time('总时长')
  let { url, size } = ctx.query
  if(!url) { return ctx.throw(400, 'query url 不能为空') }
  if(!/^http/.test(url)) { url = 'http://' + url } // 加协议
  console.time('截图时间')
  const fileName = await screenshot(url, size) // 使用 puppeteer 截图，时间有点久
  console.timeEnd('截图时间')
  if(!fileName) { return ctx.throw(404, '服务器未能成功截图') }
  try {
    const filePath = path.join(__dirname, fileName)
    const file = fs.readFileSync(filePath)
    ctx.status = 200
    ctx.type = 'png'
    ctx.body = file
  } catch (error) {
    return ctx.throw(500, '读取文件失败')
  }
  console.timeEnd('总时长')
})

app.use(router.routes())

app.listen(3344, ()=> {
  console.log('This server is running at http://localhost:' + 3344)
})