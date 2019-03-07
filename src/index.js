import Vue from 'vue'
import router from '@rrc-materials/core/src/router/index'
import store from './store'
import component from './components'
import '../scss/index.scss'

Vue.use(component, {
  store,
  router
})

Vue.config.productionTip = Object.is(process.env.NODE_ENV, 'development')

const app = new Vue({
  router,
  store
}).$mount('#app')

export default app
