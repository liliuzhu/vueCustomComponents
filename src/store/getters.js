/* eslint-disable max-len */

export default {
  userInfo: state => state.userInfo,
  permissions: (state) => (state.userInfo && state.userInfo.permissions) || [],
  cityList: (state) => (state.userInfo && state.userInfo.cities) || [],
  privilege: (state) => (state.userInfo && state.userInfo.privilege) || {},
  userName: (state) => (state.userInfo && state.userInfo.userName) || ''
}
