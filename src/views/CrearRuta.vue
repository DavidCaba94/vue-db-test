<template>
  Crear ruta
</template>

<script>
export default {
    name: "Crear Ruta",
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