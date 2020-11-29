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
    <div class="d-flex align-items-center h-100">
      <b-dd id="dropdown-status" toggle-class="py-0 text-center custom_button" variant="link" boundary="window">
        <template v-slot:button-content>
          {{ getPagination && getPagination.per_page ? getPagination.per_page : '' }}
        </template>
        <template v-for="(item, key) in limits">
          <b-dd-item-btn
            v-if="!(item.id === 0 && filter.limit === 0)"
            :key="key"
            button-class="d-flex flex-row custom_dropdown_item"
            :active="item.id === filter.limit"
            @click="filter.limit = item.id"
          >
            {{ item && item.text ? item.text : '' }}
          </b-dd-item-btn>
        </template>
      </b-dd>
    </div>
    <div class="d-flex align-items-center h-100">
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
    model: {
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
        { id: 5, text: '5' },
        { id: 10, text: '10' },
        { id: 20, text: '20' },
        { id: 50, text: '50' },
        { id: 100, text: '100' }
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
      switch (this.model) {
        case 'purchases':
          pagination = this.$store.state.purchase.pagination.purchases
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
      switch (this.model) {
        case 'purchases':
          this.$store.commit('purchase/SET_CURRENT_PAGE_PURCHASES', currentPage)
          break
      }
      this.filter.current_page = currentPage
    },
    'filter.limit' (limit) {
      switch (this.model) {
        case 'purchases':
          this.$store.commit('purchase/SET_LIMIT_PURCHASES', limit)
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
      switch (this.model) {
        case 'purchases':
          limit = this.$store.state.purchase.purchasePaginationFilter.limit
          break
      }
      return limit
    }
  }
}
</script>
