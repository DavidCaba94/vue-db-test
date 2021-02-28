<template>
  <div class="contenedor-registro">
    <div class="box-form">
      <router-link to="/"><img class="logo-form" src="../assets/img/menu-icon-2.png"></router-link>
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Nombre" name="nombre" id='nombre' required />
        <label for="nombre" class="form__label">Nombre</label>
      </div>
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Apellidos" name="apellidos" id='apellidos' required />
        <label for="apellidos" class="form__label">Apellidos</label>
      </div>
      <div class="form__group field">
        <input type="email" class="form__field" placeholder="Email" name="email" id='email' required />
        <label for="email" class="form__label">Email</label>
      </div>
      <div class="form__group field">
        <input type="password" class="form__field" placeholder="Contraseña" name="password" id='password' required />
        <label for="password" class="form__label">Contraseña</label>
      </div>
      <div class="form__group field">
        <input type="password" class="form__field" placeholder="Confirmar contraseña" name="password-confirm" id='password-confirm' required />
        <label for="password-confirm" class="form__label">Confirmar contraseña</label>
      </div>
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Provincia" name="provincia" id='provincia' required />
        <label for="provincia" class="form__label">Provincia</label>
      </div>
      <p class="mensaje-error"></p>
      <div class="btn-registrar" @click="comprobarRegistro()">Registrar</div>
      <div id="loading-reg" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
  <router-view/>
</template>

<script>

import axios from "axios";

var url = "http://alcortewear.es/post/rest/grupetapp/usuario.php";

export default {
      data () {
        return {            
                    
        }
      }, 
      methods:{
          comprobarRegistro:function(){
            this.desmarcarErrores();
            var todoRelleno = true;

            window.$(".btn-registrar").css("display", "none");
            window.$("#loading-reg").css("display", "block");
            window.$(".mensaje-error").css("display", "none");

            var nombre = window.$("#nombre").val();
            var apellidos = window.$("#apellidos").val();
            var email = window.$("#email").val();
            var password = window.$("#password").val();
            var passwordConfirm = window.$("#password-confirm").val();
            var provincia = window.$("#provincia").val();

            if(nombre == ""){
              todoRelleno = false;
              this.marcarVacio(window.$("#nombre"));
            }

            if(apellidos == ""){
              todoRelleno = false;
              this.marcarVacio(window.$("#apellidos"));
            }

            if(email == ""){
              todoRelleno = false;
              this.marcarVacio(window.$("#email"));
            }

            if(password == ""){
              todoRelleno = false;
              this.marcarVacio(window.$("#password"));
            }

            if(passwordConfirm == ""){
              todoRelleno = false;
              this.marcarVacio(window.$("#password-confirm"));
            }

            if(provincia == ""){
              todoRelleno = false;
              this.marcarVacio(window.$("#provincia"));
            }

            if(todoRelleno){
              this.comprobarPassword(nombre, apellidos, email, password, passwordConfirm, provincia);
            } else {
              window.$(".btn-registrar").css("display", "block");
              window.$("#loading-reg").css("display", "none");
              window.$(".mensaje-error").text("Todos los campos son obligatorios");
              window.$(".mensaje-error").css("display", "block");
            }
          },
          comprobarPassword:function(nombre, apellidos, email, password, passwordConfirm, provincia){
            if(password == passwordConfirm){
              this.registrar(nombre, apellidos, email, password, provincia);
            } else {
              this.marcarVacio(window.$("#password"));
              this.marcarVacio(window.$("#password-confirm"));
              window.$(".btn-registrar").css("display", "block");
              window.$("#loading-reg").css("display", "none");
              window.$(".mensaje-error").text("Ambas contraseñas deben ser iguales");
              window.$(".mensaje-error").css("display", "block");
            }
          },
          marcarVacio:function(elemento){
            elemento.css("background-color", "#ff000026");
          },
          desmarcarErrores:function(){
            window.$("#nombre").css("background-color", "#ffffff");
            window.$("#apellidos").css("background-color", "#ffffff");
            window.$("#email").css("background-color", "#ffffff");
            window.$("#password").css("background-color", "#ffffff");
            window.$("#password-confirm").css("background-color", "#ffffff");
            window.$("#provincia").css("background-color", "#ffffff");
          },
          registrar:function(nombre, apellidos, email, password, provincia){
              axios.post(url, {
                opcion:2, 
                nombre: nombre, 
                apellidos: apellidos, 
                email: email, 
                password: password,
                fecha_registro: new Date().toJSON().slice(0, 10),
                provincia: provincia
              }).then(response =>{
                if(response.statusText == "OK"){
                  this.$router.replace('bienvenido');
                } else {
                  this.$router.replace('error');
                }
              });
          }
      }
}

</script>

<style>
@import '../assets/css/registro.css';
</style>