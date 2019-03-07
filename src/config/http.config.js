import Vue from 'vue'
function install (Http) {
  Http.mixin({
    // 请求 resolve 钩子
    $requestResolve (config) {
      config.headers.common['X-Requested-With'] = 'XMLHttpResquest'
      return config
    },
    // 响应成功 钩子
    $responseResolve (response) {
      // response.data.hello = 'hello mixins'
      return response
    },
    // 响应失败 或者 400 500 等错误
    $responseReject (error) {
      let {data: {data, errMsg, err_msg, message}, status} = error.response // eslint-disable-line
      if (status === 401) { // 未登陆需重新登录
        const CLIENT = JSON.parse(process.env.CLIENT)
        const urlPrefix = `${CLIENT.loginUrl}?authn_method=captcha&service=`
        let current = `${window.location.protocol}//${window.location.hostname}`
        if (window.location.port) {
          current = `${current}:${window.location.port}`
        }
        current += '/'
        setTimeout(_ => {
          window.location = urlPrefix + encodeURIComponent(current)
        }, 2000)
      }
      let msg = errMsg || err_msg || message // eslint-disable-line
      if (errMsg || err_msg || message) { // eslint-disable-line
        Vue.prototype.$notify.error({
          title: '操作结果',
          message: msg
        })
        return Promise.reject(error)
      }
      return error
    }
  })
}

export default {
  install
}
