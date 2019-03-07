import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import createLogger from 'vuex/dist/logger'
import { slidebar, tabs } from '@rrc-materials/layout/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const plugins = debug ? [createLogger()] : []

export default new Vuex.Store({
  modules: {
    slidebar,
    tabs
  },
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: plugins
})
