const path = require('path')// node处理路径模块

module.exports = {
  configureWebpack: {
    resolve: { // 路径别名
      alias: {
        '@': resolve('src'),
      }
    }
  }
}


function resolve(dir) {
  return path.join(__dirname, dir)
}