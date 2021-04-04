<template>
  Ruta {{ this.idRuta }}
</template>

<script>
export default {
    name: "Ruta",
    data () {
        return {            
            usuario: '',
            idRuta: ''
        }
    },
    mounted() {
        this.idRuta = this.$route.params.id;
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
    }
}
</script>

<style>

</style>