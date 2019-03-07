const proConfig = require('./pro')
module.exports = {
  assetsDir: 'static',
  publicPath: '/',
  productionSourceMap: true,
  client: {
    loginUrl: 'http://123.56.250.28:6080/cas/login',
    logoutUrl: 'http://excess-reserves-test.shanyishanmei.com:8005/logout'
  }
}
