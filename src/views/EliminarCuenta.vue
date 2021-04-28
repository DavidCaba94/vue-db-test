<template>
  <p class="normal-text">Sentimos que nos abandones...</p>
  <p class="normal-text">Si podemos hacer algo por ti, puedes escribirnos a <a href="mailto:soporte@grupetapp.com">soporte@grupetapp.com</a></p>
  <p class="normal-text">¿Estás seguro de que deseas eliminar tu cuenta de Grupetapp?</p>
  <div class="box-botones">
    <div class="btn-si" @click="eliminarCuenta()">SI</div>
    <router-link to="/perfil"><div class="btn-no">NO</div></router-link>
  </div>
</template>

<script>

import axios from "axios";

var url = "https://crousser.com/app/rest/grupetapp/usuario.php";
var urlSeguidos = "https://crousser.com/app/rest/grupetapp/seguidos.php";

export default {
    data() {
        return {
            usuario: ''
        }
    },
    methods: {
      eliminarCuenta:function() {
          if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
          axios.post(url, {
            opcion:4, 
            id: this.usuario.id
          }).then(response =>{
            if(response.statusText == "OK"){
              this.eliminarFollows();
              this.eliminarFollowers();
              this.usuario = null;
              localStorage.setItem("usuario", JSON.stringify(this.usuario));
              this.$router.replace('/');
            } else {
              this.$router.replace('error');
            }
          });
      },
      eliminarFollows:function() {
        axios.post(urlSeguidos, {
            opcion:7, 
            id: this.usuario.id
        }).then(response =>{
            if(response.statusText == "OK"){
                console.log("Seguidos eliminados");
            } else {
                this.$router.replace('error');
            }
        });
      },
      eliminarFollowers:function() {
        axios.post(urlSeguidos, {
            opcion:8, 
            id: this.usuario.id
        }).then(response =>{
            if(response.statusText == "OK"){
                console.log("Seguidres eliminados");
            } else {
                this.$router.replace('error');
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

</style>