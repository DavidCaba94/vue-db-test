<template>
    <div class="contenedor-home">
        <router-link to="/login">
            <div class="login-btn">Login</div>
        </router-link>
        <router-link to="/registro">
            <div class="login-btn">Registro</div>
        </router-link>
        <h2>Número de usuarios: {{ this.numUsuarios }}</h2>
        <h2>Número de publicaciones: {{ this.numPublicaciones }}</h2>
        <h2>Número de rutas: {{ this.numRutas }}</h2>
    </div>
</template>

<script>

import axios from "axios";

var urlUsuarios = "http://alcortewear.es/post/rest/grupetapp/usuario.php";
var urlPublicaciones = "http://alcortewear.es/post/rest/grupetapp/publicacion.php";
var urlRutas = "http://alcortewear.es/post/rest/grupetapp/ruta.php";

export default {
    data () {
        return {
            numUsuarios: 0,
            numPublicaciones: 0,
            numRutas: 0
        }
    },
    mounted() {
        this.obtenerNumUsuarios();
        this.obtenerNumPublicaciones();
        this.obtenerNumRutas();
    },
    methods: {
        obtenerNumUsuarios:function() {
            axios.post(urlUsuarios, {
                opcion:11
            }).then(response =>{
                this.numUsuarios = response.data[0].numUsers;
            });
        },
        obtenerNumPublicaciones:function() {
            axios.post(urlPublicaciones, {
                opcion:7
            }).then(response =>{
                this.numPublicaciones = response.data[0].numPublicaciones;
            });
        },
        obtenerNumRutas:function() {
            axios.post(urlRutas, {
                opcion:7
            }).then(response =>{
                this.numRutas = response.data[0].numRutas;
            });
        }
    }
}
</script>

<style>
.contenedor-home .login-btn {
    width: 100px;
    background-color: #CC5454;
    color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
}

.contenedor-home .login-btn:hover {
    background-color: #a73e3e;
}
</style>