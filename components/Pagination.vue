<template>
  <div class="d-flex w-100 bg-gray-200 px-3">
    <div class="d-flex flex-grow-1 align-items-center justify-content-center">
      <b-pagination
        v-model="filter.current_page"
        :total-rows="getPagination && getPagination.total ? getPagination.total : 0"
        :per-page="getPagination && getPagination.per_page ? getPagination.per_page : 0"
        class="m-0 my-1 custom_pagination"
        align="center"
        first-number
        last-number
        limit="15"
      />
    </div>
    <div class="d-flex align-items-center h-100 mr-4">
      <span class="mr-2">Current page:</span>
      <span class="btn badge-light text-truncate bg-gray-200">
        {{ getPagination && getPagination.current_page ? getPagination.current_page : '1' }}
      </span>
    </div>
    <div class="d-flex align-items-center h-100 mr-4">
      <span class="mr-2">Per page:</span>
      <b-dd id="dropdown-status" toggle-class="py-0 text-center custom_button" variant="link" boundary="window">
        <template v-slot:button-content>
          {{ getPagination && getPagination.per_page ? getPagination.per_page : 20 }}
        </template>
        <template v-for="(item, key) in limits">
          <b-dd-item-btn
            :key="key"
            button-class="d-flex flex-row custom_dropdown_item"
            :active="item.limit === filter.limit"
            @click="setPerPage(item.limit)"
          >
            {{ item && item.text ? item.text : '' }}
          </b-dd-item-btn>
        </template>
      </b-dd>
    </div>
    <div class="d-flex align-items-center h-100">
      <span class="mr-2">Total:</span>
      <span class="btn badge-light text-truncate bg-gray-200">
        {{ getPagination && getPagination.total ? getPagination.total : '0' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    source: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      filter: {
        limit: null,
        current_page: null
      },

      limits: [
        { limit: null, text: 'All' },
        { limit: 5, text: '5' },
        { limit: 10, text: '10' },
        { limit: 20, text: '20' },
        { limit: 50, text: '50' },
        { limit: 100, text: '100' }
      ],

      pagination: {
        current_page: 1,
        from: null,
        last_page: null,
        path: null,
        per_page: null,
        to: null,
        total: null
      }
    }
  },
  computed: {
    getPagination () {
      let pagination
      switch (this.source) {
        case 'users':
          pagination = this.$store.getters['users/getPagination']
          break
      }
      return pagination
    }
  },
  watch: {
    getPagination (pagination) {
      this.filter.current_page = pagination.current_page
    },
    'filter.current_page' (currentPage) {
      switch (this.source) {
        case 'users':
          this.$store.commit('users/SET_CURRENT_PAGE', currentPage)
          break
      }
      this.filter.current_page = currentPage
    },
    'filter.limit' (limit) {
      switch (this.source) {
        case 'users':
          this.$store.commit('users/SET_LIMIT', limit)
          break
      }
    }
  },
  created () {
    this.filter.limit = this.limit()
  },
  methods: {
    limit () {
      let limit
      switch (this.users) {
        case 'users':
          limit = this.$store.state.users.pagination.limit
          break
      }
      return limit
    },
    setPerPage (perPage) {
      let perPageCopy = perPage
      if (!perPageCopy) {
        perPageCopy = this.getPagination.total
      }
      this.$store.commit('users/SET_PER_PAGE', perPageCopy)
    }
  }
}
</script>
