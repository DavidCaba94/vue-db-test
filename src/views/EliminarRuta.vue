<template>
  <p class="normal-text">¿Estás seguro de que deseas eliminar tu ruta <span class="nombre-ruta">{{this.ruta.nombre}}</span>?</p>
  <div class="box-botones">
    <div class="btn-si" @click="eliminarRuta()">SI</div>
    <router-link to="/mis-rutas"><div class="btn-no">NO</div></router-link>
  </div>
</template>

<script>

import axios from "axios";

var urlRutas = "https://crousser.com/app/rest/grupetapp/ruta.php";
var urlInscripciones = "https://crousser.com/app/rest/grupetapp/inscripciones.php";

export default {
    data() {
        return {
            usuario: '',
            idRuta: 0,
            ruta: ''
        }
    },
    mounted(){
      this.idRuta = this.$route.params.id;
      if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
      this.comprobarUsuarioRuta();
    },
    methods: {
      comprobarUsuarioRuta:function() {
          axios.post(urlRutas, {
              opcion:10, 
              id: this.idRuta
          }).then(response =>{
              if(response.status == 200){
                  this.ruta = response.data[0];
                  if(this.ruta.id_usuario != this.usuario.id){
                    this.$router.replace('/error');
                  }
              } else {
                  this.$router.replace('/error');
              }
          });
      },
      eliminarRuta:function() {
          axios.post(urlRutas, {
            opcion:4, 
            id: this.idRuta
          }).then(response =>{
            if(response.status == 200){
              this.eliminarInscripciones();
            } else {
              this.$router.replace('/error');
            }
          });
      },
      eliminarInscripciones:function() {
        axios.post(urlInscripciones, {
            opcion:8, 
            id_ruta: this.idRuta
        }).then(response =>{
            if(response.status == 200){
              this.comprobarGPX();
            } else {
              this.$router.replace('/error');
            }
        });
      },
      eliminarGPX:function() {
          axios.post(urlRutas, {
            opcion:18, 
            id: this.idRuta
          }).then(response =>{
            if(response.status == 200){
              this.$router.replace('/mis-rutas');
            } else {
              this.$router.replace('/error');
            }
          });
      },
      comprobarGPX:function() {
          axios.post(urlRutas, {
              opcion:17,
              id: this.idRuta
          }).then(response =>{
              if(response.data.length != 0){
                  this.eliminarGPX();
              } else {
                  this.$router.replace('/mis-rutas');
              }
          });
      }
    }
}
</script>

<style>

a {
  color: #CC5454;
}

.normal-text {
  font-size: 16px;
  font-weight: 700;
  color: #525252;
}

.box-botones {
  width: 250px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.btn-si {
  width: 80px;
  border-radius: 10px;
  background-color: #CC5454;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  cursor: pointer;
}

.btn-si:hover {
  background-color: #a83232;
}

.btn-no {
  width: 80px;
  border-radius: 10px;
  background-color: #ffffff;
  color: #CC5454;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  -webkit-box-shadow: -1px 7px 8px -4px rgb(0 0 0 / 20%);
  -moz-box-shadow: -1px 7px 8px -4px rgba(0,0,0,0.20);
  box-shadow: -1px 7px 8px -4px rgb(0 0 0 / 20%);
}

.nombre-ruta {
  color: #CC5454;
}

</style>