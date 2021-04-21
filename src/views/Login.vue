<template> 
  <div class="contenedor-registro">
    <div class="box-form">
      <router-link to="/"><img class="logo-form" src="../assets/img/menu-icon-2.png"></router-link>
      <form id="login">
        <div class="form__group field">
          <input type="email" class="form__field" placeholder="email" v-model="email" name="email" id='email' required />
          <label for="email" class="form__label">Email</label>
        </div>
        <div class="form__group field" >
          <input type="password" class="form__field" placeholder="password" v-model="password" name="password" id='password' required />
          <label for="password" class="form__label">Contraseña</label>
        </div>
        <label class="pure-material-checkbox">
          <input type="checkbox" v-model="recordar" >
          <span>Mantener sesión activa</span>
        </label>
        <p class="mensaje-error"></p>
        <div class="btn-registrar" @click="comprobarLogin()">Iniciar Sesión</div>
        <div id="loading-reg" class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </form>
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
          email: '',
          password: '',
          recordar: false
        }
       },
       mounted(){
          if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
          if(this.usuario != '' && this.usuario != null){
            this.$router.replace('/rutas');
          } 
       },  
       methods:{
         comprobarLogin:function(){
           if(this.email && this.password){
             this.desmarcarErrores();
             this.login(this.email,this.password);
           }else{
            if( !this.email || !this.email){
                this.marcarVacio(window.$("#email"));
                this.marcarVacio(window.$("#password"));
                window.$(".mensaje-error").text("Email y contraseña son campos obligatorios");
            } else if(!this.email){
                this.marcarVacio(window.$("#email"));
                window.$(".mensaje-error").text("Email campo obligatorio");
            }else if(!this.password){
              this.marcarVacio(window.$("#password"));
              window.$(".mensaje-error").text("Password campo obligatorio");
            }
            window.$(".mensaje-error").css("display", "block");
           }
         },
         marcarVacio:function(elemento){
            elemento.css("background-color", "#ff000026");
          },
        desmarcarErrores:function(){
            window.$(".form__field").css("background-color", "#ffffff");
            window.$(".mensaje-error").css("display", "none");
        },
        login:function(email, password){
            axios.post(url, {
              opcion:5, 
              email: email, 
              password: password,
            }).then(response =>{
              if(response.statusText == "OK" && response.data.length === 1){
                response.data[0].recordar = this.recordar;
                localStorage.setItem("usuario", JSON.stringify(response.data[0]));
                this.$router.replace('/rutas');
              } else {
                this.marcarVacio(window.$("#email"));
                this.marcarVacio(window.$("#password"));
                window.$(".mensaje-error").text("Email o contraseña incorrecta");
                window.$(".mensaje-error").css("display", "block");
              }
            });
        }
       }
}
</script>

<style>
@import '../assets/css/registro.css';
</style>