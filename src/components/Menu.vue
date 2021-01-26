<template>
    <div id="nav" class="contenedor-menu">
        <router-link to="/login">{{item1}}</router-link>
        <router-link to="/registro">{{item2}}</router-link>
    </div>
    <router-view/>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            item1: "Login",
            item2: "Registro"
        }
    }
}
</script>

<style>
@import '../assets/css/menu.css';
</style>