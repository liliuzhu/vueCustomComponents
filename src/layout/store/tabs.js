export default {
  state: {
    tabs: [],
    currentTab: 'home'
  },
  getters: {
    getTabs (state) {
      return state.tabs
    },
    getTabKeepAliveInclude (state) {
      return state.tabs.filter(tab => {
        if (tab.meta) {
          if (tab.meta.keepAlive) {
            return true
          }
        }
        return false
      }).map(tab => tab.name)
    }
  },
  mutations: {
    rcMaterialsTabsAddTab (state, value) {
      const name = value.name
      // 首页已经默认加载了路由 所以不加载 路由进tabs
      if (state.tabs.findIndex(item => item.name === name) === -1 && name !== 'home') {
        state.tabs.push(value)
      }
      // 处理选中逻辑
      state.currentTab = name
    },
    rcMaterialsTabsCurrentTab (state, value) {
      state.currentTab = value
    },
    rcMaterialsTabsDeleteTab (state, {value, vm}) {
      const tabs = state.tabs
      const index = tabs.findIndex(item => item.name === value)
      if (index !== -1) {
        tabs.splice(index, 1)
        // 处理选中到最后一位的操作 如果值是 0 则选中首页
        const lastIndex = Math.max(tabs.length - 1, -1)
        if (lastIndex === -1) {
          state.currentTab = 'home'
          vm.$router.push('/')
          return
        }
        const lastTab = tabs[lastIndex]
        state.currentTab = lastTab.name
        vm.$router.push(lastTab.fullPath)
      }
    },
    rcMaterialsTabsToolCommand (state, {value, vm}) {
      switch (true) {
        case value === 'closeAll':
          // 如果当前选中的是首页直接清空当前tabs 中所有数据
        case value === 'closeOther' && state.currentTab === 'home': // eslint-disable-line
          state.tabs = []
          state.currentTab = 'home'
          vm.$router.push('/')
          break
        case value === 'closeOther':
          const currentTab = state.tabs.filter(item => item.name === state.currentTab)[0]
          state.tabs = [currentTab]
          break
      }
    }
  }
}
