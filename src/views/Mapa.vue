<template>
  Mapa
</template>

<script>
export default {
    name: "Mapa",
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