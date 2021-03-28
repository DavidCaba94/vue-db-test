<template>
  <div class="contenedor-user">
      <div class="card-user" v-if="this.renderUser">
          <div class="num-user">#{{ this.renderUser.id }}</div>
          <div class="box-data">
              <div id="img-user-render" class="img-user-render"></div>
              <div class="datos-user">
                  <p class="nombre-user">{{ this.renderUser.nombre }} {{ this.renderUser.apellidos }}</p>
                  <div class="provincia-user"><img class="marker-ciudad" src="../assets/img/marker.png">{{ this.renderUser.provincia }}</div>
                  <p class="fecha-user">Usuario desde: {{ $filters.formatDate(this.renderUser.fecha_registro) }}</p>
              </div>
              <div id="btn-seguir" class="btn-seguir" @click="this.seguirUsuario()">Seguir</div>
          </div>
      </div>
      <div class="box-rutas-user">
          <p class="titulo-seccion">Rutas creadas: {{ this.rutasCreadas }}</p>
      </div>
      <div class="box-rutas-user">
          <p class="titulo-seccion">Participación en rutas: {{ this.rutasParticipadas }}</p>
      </div>
      <div class="box-rutas-user">
          <p class="titulo-seccion">Publicaciones: {{ this.publicaciones.length }}</p>
          <div v-for="(objetoLista) in this.publicaciones" :key="objetoLista.id">
            <div class="item-publicacion">
            <div class="box-img-pub">
                <div class="img-fake"></div>
                <div class="nombre-fecha" v-if="this.renderUser">
                    <p>{{ this.renderUser.nombre }} {{ this.renderUser.apellidos }}</p>
                </div>
            </div>
            <div class="box-textos-pub">
                <div class="texto-pub">
                {{ objetoLista.texto }}
                </div>
            </div>
            <div class="box-likes">
                <p class="fecha-text">{{ $filters.formatDate(objetoLista.fecha_pub) }}</p>
                <div class="like-btn" @click='addLike(objetoLista.id)'>
                <img class="boton-like" src="../assets/img/like.png" alt="Botón Like">
                <p>{{ objetoLista.likes }}</p>
                </div>
            </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>

import axios from "axios";

var urlUsuarios = "http://alcortewear.es/post/rest/grupetapp/usuario.php";
var urlSeguidos = "http://alcortewear.es/post/rest/grupetapp/seguidos.php";
var urlPublicaciones = "http://alcortewear.es/post/rest/grupetapp/publicacion.php";

export default {
    name: "Usuario",
    data () {
        return {            
            idUsuario: '',
            usuario: '',
            renderUser: '',
            siguiendo: false,
            rutasCreadas: 0,
            rutasParticipadas: 0,
            publicaciones: []
        }
    },
    mounted() {
        this.idUsuario = this.$route.params.id;
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.mostrarDatosUsuario(this.idUsuario);
        this.obtenerPublicaciones();
    },
    updated() {
        this.addFotoUser();
    },
    methods: {
        mostrarDatosUsuario:function(id_usuario) {
            axios.post(urlUsuarios, {
                opcion:10,
                id: id_usuario
            }).then(response =>{
                if(response.data.length == 0){
                    this.$router.replace('error');
                } else {
                    this.renderUser = response.data[0];
                    this.addFotoUser();
                    this.actualizarBtnSeguir();
                }
            });
        },
        addFotoUser:function() {
            if(this.renderUser.foto != null){
                window.$("#img-user-render").css("background-image", "url("+ this.renderUser.foto +")");
                window.$(".img-fake").css("background-image", "url("+ this.renderUser.foto +")");
            }
        },
        actualizarBtnSeguir:function() {
            axios.post(urlSeguidos, {
                opcion:2,
                id: this.usuario.id,
                id_seguido: this.idUsuario
            }).then(response =>{
                if(response.data.length == 0){
                    this.siguiendo = false;
                    window.$("#btn-seguir").html("Seguir");
                    window.$("#btn-seguir").css("color", "#ff6e6e");
                } else {
                    this.siguiendo = true;
                    window.$("#btn-seguir").html("Dejar de seguir");
                    window.$("#btn-seguir").css("color", "#525252");
                }
            });
        },
        seguirUsuario:function() {
            if(this.siguiendo){
                axios.post(urlSeguidos, {
                    opcion:5, 
                    id: this.usuario.id,
                    id_seguido: this.idUsuario
                }).then(response =>{
                    if(response.statusText == "OK"){
                        this.replicarUnfollow();
                    } else {
                        this.$router.replace('error');
                    }
                });
            } else if(!this.siguiendo) {
                axios.post(urlSeguidos, {
                    opcion:3, 
                    id: this.usuario.id,
                    id_seguido: this.idUsuario
                }).then(response =>{
                    if(response.statusText == "OK"){
                        this.replicarFollow();
                    } else {
                        this.$router.replace('error');
                    }
                });
            }
        },
        replicarFollow:function() {
            axios.post(urlSeguidos, {
                opcion:4, 
                id: this.usuario.id,
                id_seguido: this.idUsuario
            }).then(response =>{
                if(response.statusText == "OK"){
                    this.actualizarBtnSeguir();
                } else {
                    this.$router.replace('error');
                }
            });
        },
        replicarUnfollow:function() {
            axios.post(urlSeguidos, {
                opcion:6, 
                id: this.usuario.id,
                id_seguido: this.idUsuario
            }).then(response =>{
                if(response.statusText == "OK"){
                    this.actualizarBtnSeguir();
                } else {
                    this.$router.replace('error');
                }
            });
        },
        obtenerPublicaciones:function() {
            axios.post(urlPublicaciones, {
                opcion:5,
                id_usuario: this.idUsuario
            }).then(response =>{
                if(response.data.length == 0){
                    this.$router.replace('error');
                } else {
                    this.publicaciones = response.data;
                }
            });
        },
        addLike:function(id){
            axios.post(urlPublicaciones, {
                opcion:4, 
                id: id
            }).then(response =>{
                if(response.statusText == "OK"){
                    for(var i = 0; i < this.publicaciones.length; i++){
                        if(this.publicaciones[i].id == id){
                            this.publicaciones[i].likes++;
                        }
                    }
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/user.css';
</style>