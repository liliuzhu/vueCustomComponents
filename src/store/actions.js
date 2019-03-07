/* global */
export default {
  setUserInfo({commit}, userInfo) { // 设置vuex用户信息
    commit('USER_INFO', userInfo)
  }
}
