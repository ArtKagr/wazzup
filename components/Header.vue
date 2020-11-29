<template>
  <b-navbar toggleable="lg" type="light" class="bg-white">
    <b-navbar-brand href="#">
      WAZZUP
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" class="d-flex align-items-center" is-nav>
      <b-navbar-nav>
        <b-nav-item
          v-for="(link, key) in menuItems"
          :key="key"
          class="header-container-items-item"
          :class="active_item === key ? '-active_item' : ''"
          :to="{ name: `${link.flag}-manage` }"
          @click="setActiveItem(key)"
        >
          {{ link.title }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      menuItems: [
        { flag: 'users', title: 'Users' }
      ],
      active_item: 'users'
    }
  },
  methods: {
    setActiveItem (item) {
      this.active_item = item
    }
  }
}
</script>
