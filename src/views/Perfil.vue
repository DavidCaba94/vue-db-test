<template>
  <div class="contenedor-perfil">
    <router-link :to="'/usuario/'+this.usuario.id" v-if="this.usuario">
      <div class="btn-vista-usuario">Cambiar a vista de usuario</div>
    </router-link>
    <!-- Cambio de imagen -->
    <div class="box-form">
        <div class="img-perfil"></div>
        <div class="form__group field">
            <input type="file" class="form__field" placeholder="Foto" name="foto" id='foto' accept=".png,.jpg,.jpeg,.gif" required />
            <label for="foto" class="form__label">Foto (5MB máx.)</label>
        </div>
        <p class="mensaje-error msg-error-foto"></p>
        <div id="btn-guardar-foto" class="btn-guardar" @click="comprobarTamanoFoto()">Guardar</div>
        <div id="loading-foto" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- Datos principales -->
    <p class="indicador-form">Datos principales</p>
    <div class="box-form">
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Nombre" name="nombre" id='nombre' v-model="usuario.nombre" required />
        <label for="nombre" class="form__label">Nombre</label>
      </div>
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="Apellidos" name="apellidos" id='apellidos' v-model="usuario.apellidos" required />
        <label for="apellidos" class="form__label">Apellidos</label>
      </div>
      <div class="form__group field">
        <input type="email" class="form__field" placeholder="Email" name="email" id='email' v-model="usuario.email" required />
        <label for="email" class="form__label">Email</label>
      </div>
      <div class="form__group field select">
        <select id="provincia" class="select-text" v-model="usuario.provincia" required>
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
      <p class="mensaje-error msg-error-datos"></p>
      <div id="btn-guardar-datos" class="btn-guardar" @click="actualizarPerfil()">Guardar</div>
      <div id="loading-datos-principales" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- Cambio de contraseña -->
    <p class="indicador-form">Cambiar contraseña</p>
    <div class="box-form">
        <div class="form__group field">
            <input type="password" class="form__field" placeholder="Contraseña actual" name="old-password" id='old-password' required />
            <label for="old-password" class="form__label">Contraseña actual</label>
        </div>
        <div class="form__group field">
            <input type="password" class="form__field" placeholder="Nueva contraseña" name="password" id='password' required />
            <label for="password" class="form__label">Nueva contraseña</label>
        </div>
        <div class="form__group field">
            <input type="password" class="form__field" placeholder="Confirmar nueva contraseña" name="password-confirm" id='password-confirm' required />
            <label for="password-confirm" class="form__label">Confirmar nueva contraseña</label>
        </div>
        <p class="mensaje-error msg-error-password"></p>
        <div id="btn-guardar-password" class="btn-guardar" @click="actualizarPassword()">Guardar</div>
        <div id="loading-password" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- Eliminar cuenta -->
    <router-link to="/eliminar-cuenta"><div class="btn-eliminar-cuenta"><img class="delete-img" src="../assets/img/delete.png">Eliminar cuenta</div></router-link>
  </div>
</template>

<script>

import axios from "axios";

var url = "https://crousser.com/app/rest/grupetapp/usuario.php";
var urlServerImg = "https://davidcaballerocalvo.es/grupetapp/rest/upload_image.php";

export default {
    data () {
        return {
            usuario: ''
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        if(this.usuario.foto != null){
          window.$(".img-perfil").css("background-image", "url("+ this.usuario.foto +")");
        }
    },
    methods: {
      comprobarTamanoFoto:function() {
        if(document.querySelector('#foto').files[0].size > 5024000){
          window.$(".msg-error-foto").text("La foto no puede pesar más de 5MB");
          window.$(".msg-error-foto").css("display", "block");
        } else {
          this.guardarImagenServidor();
        }
      },
      async guardarImagenServidor() {
        window.$("#btn-guardar-foto").css("display", "none");
        window.$("#loading-foto").css("display", "block");
        var formData = new FormData();
        var files = window.$('#foto')[0].files[0];
        formData.append('file',files);
        if(files != null) {
          axios.post(urlServerImg, formData).then(response =>{
            if(response.data != 0 && response.data != 1){
              this.actualizarFoto(response.data);
            } else {
              window.$(".msg-error-foto").text("Error al subir la foto");
              window.$(".msg-error-foto").css("display", "block");
              window.$("#btn-guardar-foto").css("display", "block");
              window.$("#loading-foto").css("display", "none");
            }
          });
        } else {
          window.$(".msg-error-foto").text("No has seleccionado ningún archivo");
          window.$(".msg-error-foto").css("display", "block");
          window.$("#btn-guardar-foto").css("display", "block");
          window.$("#loading-foto").css("display", "none");
        }
      },
      actualizarFoto: function(urlFoto){
        axios.post(url, {
          opcion:8, 
          id: this.usuario.id,
          foto: urlFoto
        }).then(response =>{
          if(response.status == 200){
            this.usuario.foto = urlFoto;
            window.$(".msg-error-foto").css("display", "none");
            window.$(".img-perfil").css("background-image", "url("+ this.usuario.foto +")");
            window.$("#img-user").css("background-image", "url("+ this.usuario.foto +")");
            this.actualizarStorage();
            window.$("#btn-guardar-foto").css("display", "block");
            window.$("#loading-foto").css("display", "none");
          } else {
            window.$(".msg-error-foto").text("Error al subir la foto");
            window.$(".msg-error-foto").css("display", "block");
            window.$("#btn-guardar-foto").css("display", "block");
            window.$("#loading-foto").css("display", "none");
          }
        });
      },
      actualizarPerfil: function() {

        window.$("#btn-guardar-datos").css("display", "none");
        window.$("#loading-datos-principales").css("display", "block");

        if(this.usuario.id != "" && this.usuario.nombre != "" && this.usuario.apellidos != "" && this.usuario.email != ""){
          axios.post(url, {
            opcion:3, 
            id: this.usuario.id,
            nombre: this.usuario.nombre,
            apellidos: this.usuario.apellidos,
            email: this.usuario.email,
            provincia: this.usuario.provincia
          }).then(response =>{
            if(response.status == 200){
              window.$(".msg-error-datos").css("display", "none");
              this.actualizarStorage();
              window.$("#btn-guardar-datos").css("display", "block");
              window.$("#loading-datos-principales").css("display", "none");
            } else {
              window.$(".msg-error-datos").text("Algo ha salido mal");
              window.$(".msg-error-datos").css("display", "block");
              window.$("#btn-guardar-datos").css("display", "block");
              window.$("#loading-datos-principales").css("display", "none");
            }
          });
        } else {
          window.$(".msg-error-datos").text("Todos los campos son obligatorios");
          window.$(".msg-error-datos").css("display", "block");
          window.$("#btn-guardar-datos").css("display", "block");
          window.$("#loading-datos-principales").css("display", "none");
        }
      },
      actualizarPassword: function() {

        window.$("#btn-guardar-password").css("display", "none");
        window.$("#loading-password").css("display", "block");

        if(window.$("#password").val() == window.$("#password-confirm").val()){
          window.$(".msg-error-password").css("display", "none");
          axios.post(url, {
            opcion:5, 
            email: this.usuario.email, 
            password: window.$("#old-password").val(),
          }).then(response =>{
            if(response.status == 200 && response.data.length === 1){
              this.updateFinalPassword(window.$("#password-confirm").val());
            } else {
              window.$(".msg-error-password").text("La contraseña actual no coincide");
              window.$(".msg-error-password").css("display", "block");
              window.$("#btn-guardar-password").css("display", "block");
              window.$("#loading-password").css("display", "none");
            }
          });
        } else {
          window.$(".msg-error-password").text("La nueva contraseña y la de confirmación deben ser iguales");
          window.$(".msg-error-password").css("display", "block");
          window.$("#btn-guardar-password").css("display", "block");
          window.$("#loading-password").css("display", "none");
        }

      },
      updateFinalPassword: function(passFinal) {
        axios.post(url, {
          opcion:9, 
          id: this.usuario.id,
          password: passFinal
        }).then(response =>{
          if(response.status == 200){
            window.$(".msg-error-password").css("display", "none");
            window.$("#btn-guardar-password").css("display", "block");
            window.$("#loading-password").css("display", "none");
            this.actualizarStorage();
            window.$("#old-password").val("");
            window.$("#password").val("");
            window.$("#password-confirm").val("");
          } else {
            window.$(".msg-error-password").text("Algo ha salido mal");
            window.$(".msg-error-password").css("display", "block");
            window.$("#btn-guardar-password").css("display", "block");
            window.$("#loading-password").css("display", "none");
          }
        });
      },
      actualizarStorage: function() {
        localStorage.setItem("usuario", JSON.stringify(this.usuario));
      }
    }
}
</script>

<style>
@import '../assets/css/perfil.css';
</style>