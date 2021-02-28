<template>
    <div class="contenedor-bienvenida">
        <p class="texto-bienvenida">Bienvenido a</p>
        <router-link to="/"><img class="img-bienvenida" src="../assets/img/menu-icon-2.png"></router-link>
        <p class="texto-bienvenida">Para disfrutar de todo lo que te ofrece Grupetapp</p>
        <p class="texto-bienvenida">Inicia sesión con tu nueva cuenta</p>
        <router-link to="/login"><div class="btn-iniciar-sesion">Iniciar sesión</div></router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
@import '../assets/css/bienvenido.css';
</style>