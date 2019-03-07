const proConfig = require('./pro')
module.exports = {
  urlPath: 'vueCustomComponents/dist/',
  publicPath: '//busi.rrcimg.com/{{urlPath}}',
  qiniu: {
    enable: true,
    accessKey: '',
    secretKey: '',
    exclude: /index\.html$|runtime\.[0-9a-zA-Z]+\.js$/,
    bucket: 'busi-rrccdn',
    path: '{{urlPath}}'
  },
  ...proConfig
}
