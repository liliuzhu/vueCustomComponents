module.exports = {
  autoOpenBrowser: true,
  bundleAnalyzerReport: true,
  port: 7000,
  publicPath: '/',
  client: {
    loginUrl: 'http://123.56.250.28:6080/cas/login',
    logoutUrl: '//mis.shanyishanmei.com/index.php?c=auth&m=logout',
  },
  proxyTable: {
    '^/proxyApi': {
      target: 'http://inspector.shanyishanmei.com',
      changeOrigin: true,
      pathRewrite: {
        '^/proxyApi': '/'
      }
    },
    '^/api': {
      target: 'http://172.20.32.52:8080/mock/5b73d2294514c40f7620b504/rrc/materials/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
