import Http from '@rrc-materials/http'
import HttpConfig from '@/config/http.config'

Http.use(HttpConfig)

const http = new Http({
  baseURL: '/proxyApi'
})

export default http
