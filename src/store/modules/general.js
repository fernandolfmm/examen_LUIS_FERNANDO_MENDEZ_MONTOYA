const state = {
  user: {
    name: ''
  }
}

const mutations = {
  setUser (state, { name }) {
    state.user.name = name
  },
  unsetData (state) {
    state.user = {
      name: ''
    }
  }
}

const actions = {
  newUser ({ commit }, data) {
    commit('setUser', data)
  },
  clearData ({ commit }) {
    commit('unsetData')
  }
}

const getters = {
  user: (state) => state.user
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
