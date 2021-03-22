<template>
  Usuario {{ this.idUsuario }}
</template>

<script>

export default {
    name: "Usuario",
    data () {
        return {            
            idUsuario: ''
        }
    },
    mounted() {
        this.idUsuario = this.$route.params.id;
    }
}
</script>

<style>

</style>