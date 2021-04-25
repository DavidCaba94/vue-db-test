<template>
    <div class="contenedor-home">
        <div class="cabecera-home">
            <div>
                <img class="icono-cabecera" src="../assets/img/menu-icon-2.png">
            </div>
            <div>
                <router-link to="/login">
                    <div class="login-btn">Entrar</div>
                </router-link>
                <router-link to="/registro">
                    <div class="login-btn">Registro</div>
                </router-link>
            </div>
        </div>
        <div class="fondo-banner-home">
            <div class="banner-home">
                <div>
                    <p class="titulo-banner">Bienvenido a Grupetapp</p>
                    <p class="subtitulo-banner">La red social creada por y para ciclistas</p>
                </div>
            </div>
        </div>
        <p class="titulo-tarjetas">Con Grupetapp puedes</p>
        <div class="tarjetas-descriptivas">
            <div class="tarjeta">
                <div class="img-tarjeta img-1"></div>
                <div class="texto-tarjeta">Apuntarte y asistir a rutas creadas por otros ciclistas o crear las tuyas propias</div>
            </div>
            <div class="tarjeta">
                <div class="img-tarjeta img-2"></div>
                <div class="texto-tarjeta">Conocer gente con tu misma pasión y rodar juntos</div>
            </div>
            <div class="tarjeta">
                <div class="img-tarjeta img-3"></div>
                <div class="texto-tarjeta">Crear tus propias publicaciones y compartir tus experiencias con otros ciclistas</div>
            </div>
            <div class="tarjeta">
                <div class="img-tarjeta img-4"></div>
                <div class="texto-tarjeta">Descubrir nuevas rutas en cada quedada o evento</div>
            </div>
        </div>
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
@import '../assets/css/home.css';
</style>