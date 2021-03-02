<template>
  Rutas
  <h1>Hola {{ usuario.nombre }}</h1>
</template>

<script>
export default {
    data () {
    return {
        usuario: ''
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
    }
}
</script>

<style>

</style>