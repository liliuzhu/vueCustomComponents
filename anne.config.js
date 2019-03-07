// import path from 'path'
module.exports = {
  preload: true,
  css: {
    theme: '@import \'~@rrc-materials/theme\';'
  },
  transpileDependencies: [
    '@rrc-materials'
  ],
  alias: {
    // '@rrc-materials/layout': path.join(__dirname, './@packages/layout')
  },
  proxyTable: {
    // '^/api': {
    //   target: 'http://172.20.32.52:8080/mock/5b73d2294514c40f7620b504/rrc/materials/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': '/'
    //   }
    // }
  }
}
