export const state = () => ({
  filteredData: null
})

export const getters = {
  getFilteredData: state => state.filteredData
}

export const mutations = {
  SAVE_FILTERED_DATA (state, filteredData) {
    state.filteredData = filteredData
  }
}
