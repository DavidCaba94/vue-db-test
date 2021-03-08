<template>
    <div class="contenedor-home">
        <router-link to="/login">
            <div class="login-btn">Login</div>
        </router-link>
        <router-link to="/registro">
            <div class="login-btn">Registro</div>
        </router-link>
    </div>
</template>

<script>
export default {
    data () {
        return {
        
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