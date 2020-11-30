<template>
  <b-table
    :fields="tableFields"
    :items="filteredTableItems && filteredTableItems.length ? filteredTableItems : selectedItems[pagination.current_page - 1]"
    tbody-tr-class="custom_table_row"
    thead-tr-class="custom_table_head"
    striped
    sticky-header="100%"
    class="w-100 m-0"
    @row-clicked="openModal"
  >
    <template v-slot:cell(npp)="row">
      {{ row.index + 1 }}
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    source: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      filteredTableItems: [],
      fields: {
        users: [
          {
            key: 'npp',
            label: '№',
            class: 'align-middle'
          },
          {
            key: 'name',
            label: 'Name',
            class: 'align-middle',
            sortable: true
          },
          {
            key: 'company',
            label: 'Company',
            class: 'align-middle',
            sortable: true
          },
          {
            key: 'address',
            label: 'Address',
            class: 'align-middle',
            sortable: true
          },
          {
            key: 'email',
            label: 'E-mail',
            class: 'align-middle',
            sortable: true
          },
          {
            key: 'add.state',
            label: 'State',
            class: 'align-middle',
            sortable: true
          }
        ]
      }
    }
  },
  computed: {
    entry () {
      return this.$store.getters['users/getEntry']
    },
    pagination () {
      let pagination = {}
      switch (this.source) {
        case 'users':
          pagination = JSON.parse(JSON.stringify(this.$store.getters['users/getPagination']))
          break
      }
      return pagination
    },
    filteredData () {
      return this.$store.getters['dictionaries/getFilteredData']
    },
    tableFields () {
      return this.fields[this.source]
    },
    tableItems () {
      let items = []
      switch (this.source) {
        case 'users':
          items = JSON.parse(JSON.stringify(this.$store.getters['users/getUsers']))
          break
      }
      return items
    },
    selectedItems () {
      const array = this.tableItems
      const size = this.pagination.per_page
      const subarray = []
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice((i * size), (i * size) + size)
      }
      return subarray
    }
  },
  watch: {
    filteredData (newValue) {
      const source = this.source
      const entry = this.entry
      this.filteredTableItems = this.selectedItems[this.pagination.current_page - 1].filter(function (tableItem) {
        const tableItemKeys = Object.keys(tableItem)
        if (tableItemKeys.some(function (key) {
          if (key === 'id') {
            return false
          } else if (typeof tableItem[key] === 'object') {
            if (source === 'users') {
              return tableItem[key].state.match(entry + newValue)
            }
          } else {
            return tableItem[key].match(entry + newValue)
          }
        })) {
          return tableItem
        }
      })
    }
  },
  methods: {
    openModal (row) {
      switch (this.source) {
        case 'users':
          this.$store.commit('users/SAVE_CURRENT_USER', row)
          this.$bvModal.show('usersModal')
      }
    }
  }
}
</script>
