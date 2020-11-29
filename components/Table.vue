<template>
  <b-table
    :fields="tableFields"
    :items="filteredTableItems && filteredTableItems.length ? filteredTableItems : tableItems"
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
            label: '№ п/п',
            class: 'align-middle'
          },
          {
            key: 'name',
            label: 'Имя',
            class: 'align-middle',
            sortable: true
          },
          {
            key: 'phone',
            label: 'Телефон',
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
            key: 'company',
            label: 'Компания',
            class: 'align-middle',
            sortable: true
          },
          {
            key: 'address',
            label: 'Адрес',
            class: 'align-middle',
            sortable: true
          }
        ]
      }
    }
  },
  computed: {
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
    }
  },
  watch: {
    filteredData (newValue) {
      this.filteredTableItems = this.tableItems.filter(function (tableItem) {
        const tableItemKeys = Object.keys(tableItem)
        if (tableItemKeys.some(function (key) {
          if (key === 'id' || typeof tableItem[key] === 'object') {
            return false
          } else {
            return tableItem[key].match(newValue)
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
