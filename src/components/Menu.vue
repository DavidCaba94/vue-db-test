<template>
    <div class="contenedor-menu menu-desktop" v-if="mostrar">
        <div>
            <router-link to="/rutas"><img class="icono" src="../assets/img/menu-icon-2.png" /></router-link>
        </div>
        <div id="nav" class="box-items-menu">
            <router-link to="/rutas">{{item3}}</router-link>
            <router-link to="/social">{{item4}}</router-link>
            <router-link to="/mis-rutas">{{item5}}</router-link>
            <router-link to="/estadisticas">{{item6}}</router-link>
            <router-link to="/global">{{item7}}</router-link>
            <router-link to="/sorteos">{{item8}}</router-link>
        </div>
        <div class="box-login-reg">
            <router-link to="/perfil">
                <div id="img-user" class="img-fake"></div>
                <div class="nombre-usuario" v-if="this.usuario">{{this.usuario.nombre}} {{this.usuario.apellidos}}</div>
            </router-link>
            <div @click='logout()'>
                <img class="img-logout" src="../assets/img/logout.png" alt="Logout">
            </div>
        </div>
    </div>
    <div class="contenedor-menu menu-movil" v-if="mostrar">
        <div>
            <div id="nav-icon3" @click='toggleBurger()'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div>
            <router-link to="/rutas"><img class="icono" src="../assets/img/menu-icon-2.png" /></router-link>
        </div>
        <div class="box-login-reg">
            <router-link to="/perfil">
                <div id="img-user-movil" class="img-fake"></div>
            </router-link>
        </div>
    </div>
    <div id="nav" class="box-items-menu-movil">
        <div><router-link to="/rutas">{{item3}}</router-link></div>
        <div><router-link to="/social">{{item4}}</router-link></div>
        <div><router-link to="/mis-rutas">{{item5}}</router-link></div>
        <div><router-link to="/estadisticas">{{item6}}</router-link></div>
        <div><router-link to="/global">{{item7}}</router-link></div>
        <div><router-link to="/sorteos">{{item8}}</router-link></div>
        <div class="logout-movil" @click='logout()'>Cerrar sesión</div>
    </div>
    <div class="bubble-notificaciones" @click='abrirNotificaciones()' v-if="mostrar">
        <div class="numero-notificaciones">{{ this.notificaciones.length }}</div>
    </div>
    <div id="box-notificaciones" class="box-notificaciones">
        <div class="cerrar-notificaciones" @click='cerrarNotificaciones()'>×</div>
        <div class="sin-notificaciones" v-if="this.notificaciones.length == 0">No tienes ninguna notificación</div>
        <div v-for="(notificacion) in this.notificaciones" :key="notificacion.id">
            <div class="item-notificacion">
                <p class="texto-notificacion"># <span v-html="notificacion.texto_notificacion"></span></p>
                <div class="borrar-notificacion" @click='borrarNotificacion(notificacion.id)'>×</div>
            </div>
        </div>
    </div>
    <router-view/>
</template>

<script>
import axios from "axios";

var url = "https://crousser.com/app/rest/grupetapp/notificaciones.php";

export default {
    name: "Menu",
    data() {
        return {
            item3: "Rutas",
            item4: "Social",
            item5: "Mis Rutas",
            item6: "Estadísticas",
            item7: "Global",
            item8: "Sorteos",
            item9: "Productos",
            item10: "Mi perfil",
            usuario: '',
            menuToggled: false,
            notificaciones: []
        }
    },
    computed:{
        mostrar(){
            var mostrarMenu = true;

            if(this.$route.path === '/registro' || this.$route.path === '/login' || this.$route.path === '/bienvenido' || this.$route.path === '/error' 
            || this.$route.path === '/home' || this.$route.path === '/' || this.$route.path === '/aviso-legal' || this.$route.path === '/politica-privacidad' 
            || this.$route.path === '/cookies' || this.$route.path === '/condiciones-generales'){
                mostrarMenu = false;
            }

            return mostrarMenu;
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        if(this.usuario != null){
            this.comprobarUsuarioLogado(this.usuario);
            this.setImagen();
        }
    },
    updated() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.setImagen();
        if(this.usuario != null) {
            this.actualizarNotificaciones();
        }
        if(window.$(window).width() < 992 && this.menuToggled == true){
            this.toggleBurger();
        }
    },
    methods: {
        comprobarUsuarioLogado:function(usuario){
            if(usuario == null){
                this.$router.replace('/');
            }
        },
        logout:function(){
            if(window.$(window).width() < 992 && this.menuToggled == true){
                this.toggleBurger();
            }
            localStorage.setItem("usuario", null);
            this.usuario = null;
            this.$router.replace('/');
        },
        setImagen:function(){
            if(this.usuario != null && this.usuario.foto != null){
                window.$("#img-user").css("background-image", "url("+ this.usuario.foto +")");
                window.$("#img-user-movil").css("background-image", "url("+ this.usuario.foto +")");
            }
        },
        toggleBurger:function() {
            window.$("#nav-icon3").toggleClass('open');
            window.$(".box-items-menu-movil").slideToggle();
            this.menuToggled = !this.menuToggled;
        },
        abrirNotificaciones:function() {
            window.$("#box-notificaciones").css("display", "block");
        },
        cerrarNotificaciones:function() {
            window.$("#box-notificaciones").css("display", "none");
        },
        actualizarNotificaciones:function() {
            axios.post(url, {
                opcion:1,
                id_usuario: this.usuario.id
            }).then(response =>{
                if(response.data.length != 0 && response.data.length != this.notificaciones.length){
                    this.notificaciones = [];
                    for(var i = 0; i < response.data.length; i++){
                        this.notificaciones[i] = response.data[i];
                    }
                }
            });
        },
        borrarNotificacion:function(id_notificacion) {
            axios.post(url, {
                opcion:3, 
                id: id_notificacion
            }).then(response =>{
                if(response.statusText == "OK"){
                    if(this.notificaciones.length == 1){
                        this.notificaciones = [];
                    } else {
                        this.actualizarNotificaciones();
                    }
                } else {
                    this.$router.replace('error');
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/menu.css';
</style>