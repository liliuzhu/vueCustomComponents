import * as types from './mutation-types'

export default {
  [types.USER_INFO] (state, data) {
    state.userInfo = data
  }
}
