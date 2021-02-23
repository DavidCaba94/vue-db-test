<template>
    <div class="contenedor-menu">
        <div>
            <router-link to="/"><img class="icono" src="../assets/img/menu-icon-2.png" /></router-link>
        </div>
        <div id="nav" class="box-items-menu">
            <router-link to="/rutas">{{item3}}</router-link>
            <router-link to="/social">{{item4}}</router-link>
            <router-link to="/mis-rutas">{{item5}}</router-link>
            <router-link to="/estadisticas">{{item6}}</router-link>
            <router-link to="/clasificaciones">{{item7}}</router-link>
            <router-link to="/sorteos">{{item8}}</router-link>
            <router-link to="/productos">{{item9}}</router-link>
            <router-link to="/perfil">{{item10}}</router-link>
        </div>
        <div class="box-login-reg">
            <router-link to="/login">
                <div class="login-btn">{{item1}}</div>
            </router-link>
            <router-link to="/registro">
                <div class="login-btn">{{item2}}</div>
            </router-link>
        </div>
    </div>
    <router-view/>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            item1: "Login",
            item2: "Registro",
            item3: "Rutas",
            item4: "Social",
            item5: "Mis Rutas",
            item6: "Estadísticas",
            item7: "Clasificaciones",
            item8: "Sorteos",
            item9: "Productos",
            item10: "Mi perfil"
        }
    }
}
</script>

<style>
@import '../assets/css/menu.css';
</style>