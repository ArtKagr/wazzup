<template>
  <b-modal
    :id="modalType"
    size="full"
    hide-header
    hide-footer
    body-class="p-0 h-100 overflow-hidden"
    content-class="h-100"
    footer-bg-variant="info"
  >
    <template v-slot:default>
      <div class="d-flex flex-column h-100 w-100">
        <div class="d-flex justify-content-between bg-gray-200 align-items-center px-3" :style="'height: 5vh;'">
          <div class="d-flex w-100 justify-content-end">
            <b-icon-x class="text-align-center h4 mb-0 pointer" @click="hideModal" />
          </div>
        </div>
        <b-table
          :fields="tableFields"
          :items="tebleItems"
          striped
          stacked
          sticky-header="100%"
          class="w-100 m-0"
        />
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    source: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      fields: {
        users: [
          {
            key: 'name',
            label: 'Name',
            class: 'align-middle'
          },
          {
            key: 'address',
            label: 'Address',
            class: 'align-middle'
          }
        ]
      }
    }
  },
  computed: {
    modalType () {
      let type = ''
      switch (this.source) {
        case 'users':
          type = 'usersModal'
          break
      }
      return type
    },
    tebleItems () {
      const items = []
      switch (this.source) {
        case 'users':
          items.push(this.$store.getters['users/getCurrentUser'])
          break
      }
      return items
    },
    tableFields () {
      return this.fields[this.source]
    }
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('usersModal')
    }
  }
}
</script>
