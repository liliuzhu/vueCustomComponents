export default {
  state: {
    // 侧边栏收缩
    isMenuAsideCollapse: false
  },
  mutations: {
    /**
     *
     * 切换侧边栏展开和收缩
     * @param {*} state
     */
    rcMaterialsMenuAsideCollapse (state) {
      state.isMenuAsideCollapse = !state.isMenuAsideCollapse
    }
  }
}
