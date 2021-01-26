<template>
  <Menu></Menu>
</template>

<script>

import Menu from './components/Menu.vue'

export default {
  components: {
    Menu
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #525252;
}

#nav a.router-link-exact-active {
  color: #4f46e5;
}
</style>
