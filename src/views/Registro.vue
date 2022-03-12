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
      <div class="form__group field select">
        <select id="provincia" class="select-text" required>
          <option value="" disabled selected></option>
          <option value="Álava">Álava</option>
          <option value="Albacete">Albacete</option>
          <option value="Alicante">Alicante</option>
          <option value="Almería">Almería</option>
          <option value="Asturias">Asturias</option>
          <option value="Ávila">Ávila</option>
          <option value="Badajoz">Badajoz</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Burgos">Burgos</option>
          <option value="Cáceres">Cáceres</option>
          <option value="Cádiz">Cádiz</option>
          <option value="Cantabria">Cantabria</option>
          <option value="Castellón">Castellón</option>
          <option value="Ciudad Real">Ciudad Real</option>
          <option value="Córdoba">Córdoba</option>
          <option value="La Coruña">La Coruña</option>
          <option value="Cuenca">Cuenca</option>
          <option value="Gerona">Gerona</option>
          <option value="Granada">Granada</option>
          <option value="Guadalajara">Guadalajara</option>
          <option value="Guipúzcoa">Guipúzcoa</option>
          <option value="Huelva">Huelva</option>
          <option value="Huesca">Huesca</option>
          <option value="Islas Baleares">Islas Baleares</option>
          <option value="Jaén">Jaén</option>
          <option value="León">León</option>
          <option value="Lérida">Lérida</option>
          <option value="Lugo">Lugo</option>
          <option value="Madrid">Madrid</option>
          <option value="Málaga">Málaga</option>
          <option value="Murcia">Murcia</option>
          <option value="Navarra">Navarra</option>
          <option value="Orense">Orense</option>
          <option value="Palencia">Palencia</option>
          <option value="Las Palmas">Las Palmas</option>
          <option value="Pontevedra">Pontevedra</option>
          <option value="La Rioja">La Rioja</option>
          <option value="Salamanca">Salamanca</option>
          <option value="Segovia">Segovia</option>
          <option value="Sevilla">Sevilla</option>
          <option value="Soria">Soria</option>
          <option value="Tarragona">Tarragona</option>
          <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
          <option value="Teruel">Teruel</option>
          <option value="Toledo">Toledo</option>
          <option value="Valencia">Valencia</option>
          <option value="Valladolid">Valladolid</option>
          <option value="Vizcaya">Vizcaya</option>
          <option value="Zamora">Zamora</option>
          <option value="Zaragoza">Zaragoza</option>
          <option value="Ceuta">Ceuta</option>
          <option value="Melilla">Melilla</option>
        </select>
        <span class="select-highlight"></span>
        <span class="select-bar"></span>
        <label class="select-label">Provincia</label>
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

var url = "https://tarotgratisonline.com/rest/grupetapp/usuario.php";

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
              this.comprobarEmailExistente(nombre, apellidos, email, password, provincia);
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
                if(response.status == 200){
                  this.$router.replace('bienvenido');
                } else {
                  this.$router.replace('error');
                }
              });
          },
          comprobarEmailExistente:function(nombre, apellidos, email, password, provincia){
            axios.post(url, {
                opcion:6,
                email: email
            }).then(response =>{
              if(response.data.length == 0){
                if(this.comprobarRegexEmail(email)){
                  this.registrar(nombre, apellidos, email, password, provincia);
                } else {
                  this.marcarVacio(window.$("#email"));
                  window.$(".btn-registrar").css("display", "block");
                  window.$("#loading-reg").css("display", "none");
                  window.$(".mensaje-error").text("El email no tiene un formato válido (ejemplo@ejemplo.com)");
                  window.$(".mensaje-error").css("display", "block");
                }
              } else {
                this.marcarVacio(window.$("#email"));
                window.$(".btn-registrar").css("display", "block");
                window.$("#loading-reg").css("display", "none");
                window.$(".mensaje-error").text("Ese email ya está registrado");
                window.$(".mensaje-error").css("display", "block");
              }
            });
          },
          comprobarRegexEmail:function(email) {
            var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var valido = false;
            if(emailRegex.test(email)){
              valido = true;
            }
            return valido;
          }
      }
}

</script>

<style>
@import '../assets/css/registro.css';
</style>