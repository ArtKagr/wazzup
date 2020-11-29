<template>
  <div class="d-flex flex-column vh-100 vw-100 overflow-hidden">
    <Header class="w-100 align-self-start" />
    <nuxt class="align-self-stretch w-100 h-100 overflow-hidden" />
  </div>
</template>

<style lang="scss">
@import '../assets/scss/app.scss';
</style>
<script>
import Header from '../components/Header'
export default {
  components: { Header },
  created () {
    this.$router.push('/users/manage')
  }
}
</script>
