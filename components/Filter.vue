<template>
  <div class="w-100 d-flex align-items-center py-2 px-3 bg-gray-200 justify-content-between">
    <div class="d-flex justify-content-between w-100">
      <div class="d-flex align-items-center">
        <span
          v-if="!tableItems.length"
          class="text-align-center mb-0 pointer"
          @click="updateData"
        >
          {{ fetchButton }}
        </span>
        <b-icon-arrow-clockwise
          v-else
          class="text-align-center h4 mb-0 pointer"
          :class="status === 'data-fetching' ? '-loader' : ''"
          @click="updateData"
        />
      </div>
      <div class="d-flex align-items-center w-30">
        <b-input-group class="filter">
          <b-form-input
            v-model="filterData"
            placeholder="Фильтр"
            class="bg-disabled-white mr-2"
            :disabled="!tableItems.length"
          />
        </b-input-group>
        <b-icon-zoom-in
          v-if="filterData"
          :disabled="!tableItems.length"
          variant="info"
          class="m-0 h5 mr-2 pointer"
          @click="tableItemsFiltration"
        />
        <b-icon-zoom-in
          v-else
          :disabled="!tableItems.length"
          variant="secondary"
          class="m-0 h5 mr-2"
        />
        <b-icon-x
          v-if="filterData"
          :disabled="!tableItems.length"
          variant="info"
          class="m-0 h3 pointer"
          @click="clearData"
        />
        <b-icon-x
          v-else
          class="m-0 h3"
          :disabled="!tableItems.length"
          variant="secondary"
        />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',
  props: {
    source: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      filterData: null
    }
  },
  computed: {
    status () {
      let status = ''
      switch (this.source) {
        case 'users':
          status = this.$store.getters['users/getStatus']
      }
      return status
    },
    fetchButton () {
      let title = ''
      switch (this.source) {
        case 'users':
          title = 'Показать пользователей'
      }
      return title
    },
    tableItems () {
      let items = []
      switch (this.source) {
        case 'users':
          items = JSON.parse(JSON.stringify(this.$store.getters['users/getUsers']))
          break
      }
      return items
    }
  },
  watch: {
    filterData (newValue) {
      if (newValue === '') {
        this.filterData = null
        this.$store.commit('dictionaries/SAVE_FILTERED_DATA', null)
      }
    }
  },
  methods: {
    updateData () {
      switch (this.source) {
        case 'users':
          return this.$store.dispatch('users/fetchUsers')
      }
    },
    tableItemsFiltration () {
      this.$store.commit('dictionaries/SAVE_FILTERED_DATA', this.filterData)
    },
    clearData () {
      this.filterData = null
      this.$store.commit('dictionaries/SAVE_FILTERED_DATA', null)
    }
  }
}
</script>
