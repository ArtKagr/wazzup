<template>
  <div class="d-flex flex-column h-100">
    <FilterComponent source="users" />
    <b-overlay :show="status === 'users-fetching'" opacity="0.5" class="flex-fill align-self-stretch overflow-hidden">
      <div class="overflow-auto h-100">
        <Table source="users" />
      </div>
    </b-overlay>
    <Pagination source="users" />
    <Modal source="users" />
  </div>
</template>

<script>
import FilterComponent from '../../components/Filter'
import Table from '../../components/Table'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
export default {
  name: 'Manage',
  components: { Modal, Pagination, Table, FilterComponent },
  computed: {
    status () {
      return JSON.parse(JSON.stringify(this.$store.getters['users/getUsers']))
    }
  },
  watch: {
    status (newValue) {
      if (newValue === 'users-fetching-error') {
        this.showNotification('Ошибка загрузки данных', 'Список пользователей не загружен', 'danger')
      }
    }
  },
  methods: {
    showNotification (title, message, variant) {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-right',
        variant,
        appendToast: false
      })
    }
  }
}
</script>
