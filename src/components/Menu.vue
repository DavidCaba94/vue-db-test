<template>
    <div class="contenedor-menu" v-if="mostrar">
        <div>
            <router-link to="/rutas"><img class="icono" src="../assets/img/menu-icon-2.png" /></router-link>
        </div>
        <div id="nav" class="box-items-menu">
            <router-link to="/rutas">{{item3}}</router-link>
            <router-link to="/social">{{item4}}</router-link>
            <router-link to="/mis-rutas">{{item5}}</router-link>
            <router-link to="/estadisticas">{{item6}}</router-link>
            <router-link to="/clasificaciones">{{item7}}</router-link>
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
    <router-view/>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            item3: "Rutas",
            item4: "Social",
            item5: "Mis Rutas",
            item6: "Estadísticas",
            item7: "Clasificaciones",
            item8: "Sorteos",
            item9: "Productos",
            item10: "Mi perfil",
            usuario: ''
        }
    },
    computed:{
        mostrar(){
            var mostrarMenu = true;

            if(this.$route.path === '/registro' || this.$route.path === '/login' || this.$route.path === '/bienvenido' || this.$route.path === '/error' || this.$route.path === '/home' || this.$route.path === '/'){
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
      this.setImagen();
    },
    methods: {
        comprobarUsuarioLogado:function(usuario){
            if(usuario == null){
                this.$router.replace('/');
            }
        },
        logout:function(){
            localStorage.setItem("usuario", null);
            this.usuario = null;
            this.$router.replace('/');
        },
        setImagen:function(){
            if(this.usuario.foto != null){
                window.$("#img-user").css("background-image", "url("+ this.usuario.foto +")");
            }
        }
    }
}
</script>

<style>
@import '../assets/css/menu.css';
</style>