import Core from '@rrc-materials/core'
// import Panel from '@rrc-materials/panel'
import menu from '@/config/menu.config'

const packages = [
  // Panel
]

const install = (Vue, { router, store } = {}) => {
  if (install.installed) {
    return
  }

  install.installed = true
  router.beforeEach(async (to, from, next) => {
    let rule = to.meta.rule
    let permissions = store.getters.permissions
    let hasPermission = !rule || permissions.indexOf(rule) !== -1 // 进入路由之前检查是否有路由操作权限
    if (!hasPermission) {
      Vue.prototype.$notify.warning({title: '提示', message: '您没有该操作权限'})
      let {path, name} = from
      name ? next(false) : next({path})
    } else {
      next()
    }
  })
  Vue.use(Core, {
    router,
    store
  })

  packages.forEach((lib) => {
    Vue.use(lib)
  })

  Vue.prototype.$$rcMenus = menu
}

export default {
  install
}
