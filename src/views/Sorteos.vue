<template>
  <div class="contenedor-sorteos">
      <p class="info-sorteo">No hay ningún sorteo activo por el momento</p>
  </div>
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
.contenedor-sorteos {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
}

.contenedor-sorteos .info-sorteo {
    margin-top: 70px;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}
</style>