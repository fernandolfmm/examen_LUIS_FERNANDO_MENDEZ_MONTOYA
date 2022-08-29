import Vue from 'vue'
import Vuex from 'vuex'
import general from './modules/general'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    general
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
