export const state = () => ({
  status: '',
  users: [],
  currentUser: {}
})

export const getters = {
  getStatus: state => state.status,
  getUsers: state => state.users,
  getCurrentUser: state => state.currentUser
}

export const mutations = {
  SET_STATUS (state, status) {
    state.status = status
  },
  SAVE_USERS (state, users) {
    state.users = users
  },
  SAVE_CURRENT_USER (state, currentUser) {
    state.currentUser = currentUser
  }
}

export const actions = {
  async fetchUsers ({ commit }) {
    commit('SET_STATUS', 'data-fetching')
    try {
      const users = await this.$axios.$get('/api/v1/wazzup_test/')
      commit('SET_STATUS', 'users-fetched')
      commit('SAVE_USERS', users)
    } catch {
      commit('SET_STATUS', 'error')
    }
  }
}
