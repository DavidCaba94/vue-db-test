<template>
  <div class="contenedor-sorteos">
      <p class="info-sorteo">¡Primer sorteo al llegar a 100 usuarios!</p>
      <p class="info-sorteo">Ya somos <strong>{{this.numUsuarios}}</strong>/100</p>
  </div>
</template>

<script>

import axios from "axios";

var urlUsuarios = "https://crousser.com/app/rest/grupetapp/usuario.php";

export default {
    data () {
    return {
            usuario: '',
            numUsuarios: 0
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.obtenerNumUsuarios();
    },
    methods: {
        obtenerNumUsuarios:function() {
            axios.post(urlUsuarios, {
                opcion:11
            }).then(response =>{
                this.numUsuarios = response.data[0].numUsers;
            });
        }
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