const screenSize = {
  // 移动端 尺寸
  iPhoneX: {
    width: 375,
    height: 812
  },
  iPhone: { // iPhone 6/7/8 Plus
    width: 414,
    height: 736
  },
  iPad: {
    width: 768,
    height: 1024
  },

  // PC端 尺寸
  default: { // 普通的PC电脑
    width: 1366,
    height: 768
  },
  maxLarge: {  // 目前常用设备中最大的尺寸 网页最常用的设计尺寸
    width: 1920,
    height: 1080
  },
  MacBook_15: { // 15寸MacBook Pro，很多UI设计师首选
    width: 1440,
    height: 900
  },
  MacBook_13: { // 13寸MacBook Pro
    width: 1280,
    height: 800
  }

}

module.exports = screenSize