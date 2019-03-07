module.exports = {
  // urlPath: '项目名称/dist/',
  assetsDir: 'static',
  // publicPath: '//busi.rrcimg.com/{{urlPath}}',
  productionSourceMap: false,
  outputDir: './dist',
  // qiniu: {
  //   enable: true,
  //   accessKey: '7XpXEW2l-DUawPpfykszsTFNOr6rwW7peloKUDnT',
  //   secretKey: '1sMLgliCmIakJUoCVZc1gL6MNyK7w6r9IhBW1XwG',
  //   exclude: /index\.html$|runtime\.[0-9a-zA-Z]+\.js$/,
  //   bucket: 'busi-rrccdn',
  //   path: '{{urlPath}}'
  // },
  client: {
    loginUrl: 'https://login.shanyishanmei.com/cas/login',
    logoutUrl: 'https://excess-reserves.shanyishanmei.com/logout'
  }
}
