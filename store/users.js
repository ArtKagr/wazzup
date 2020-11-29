export const state = () => ({
  status: '',
  users: [],
  currentUser: {},
  pagination: {
    current_page: 1,
    from: null,
    last_page: null,
    per_page: 1,
    total: null
  }
})

export const getters = {
  getStatus: state => state.status,
  getUsers: state => state.users,
  getCurrentUser: state => state.currentUser,
  getPagination: state => state.pagination
}

export const mutations = {
  SET_STATUS (state, status) {
    state.status = status
  },
  SAVE_USERS (state, users) {
    state.users = users
    state.pagination.total = users.length
    state.pagination.per_page = 20
  },
  SAVE_CURRENT_USER (state, currentUser) {
    state.currentUser = currentUser
  },
  SET_CURRENT_PAGE (state, currentPage) {
    if (state.pagination.current_page !== currentPage) {
      state.pagination.current_page = currentPage
    }
  },
  SET_LIMIT (state, limit) {
    if (state.pagination.limit !== limit) {
      state.pagination.limit = limit
    }
    state.pagination.current_page = 1
  },
  SET_PER_PAGE (state, perPage) {
    if (state.pagination.per_page !== perPage) {
      state.pagination.per_page = perPage
    }
  }
}

export const actions = {
  async fetchUsers ({ commit }) {
    commit('SET_STATUS', 'users-fetching')
    try {
      const users = await this.$axios.$get('/api/v1/wazzup_test/')
      commit('SET_STATUS', 'users-fetched')
      commit('SAVE_USERS', users)
    } catch {
      commit('SET_STATUS', 'users-fetching-error')
    }
  }
}
