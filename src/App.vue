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
body {
  background-color: #f9f9f9;
}

#app {
  font-family: 'Oxygen', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #272727;
  background-color: #f9f9f9;
}

a {
  text-decoration: none;
}

#nav a {
  font-weight: bold;
  color: #525252;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #CC5454;
  text-decoration: none;
}
</style>
