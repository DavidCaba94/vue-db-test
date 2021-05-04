<template>
  <Menu></Menu>
</template>

<script>

import Menu from './components/Menu.vue'

export default {
  components: {
    Menu
  },
  data () {
    return {
      usuario: ''
    }
  },
  mounted() {
      if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
      if(this.usuario == '' || this.usuario == null){
        this.$router.replace('');
      }
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
  max-width: 1920px;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: #272727 !important;
}

#nav a {
  font-weight: bold;
  color: #525252;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #CC5454 !important;
  text-decoration: none;
}
</style>
