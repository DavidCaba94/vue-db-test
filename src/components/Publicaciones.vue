<template>
  <div class="contenedor-publicaciones">
    <div class="box-form-publicacion">
      <p class="titulo-form">¿En qué estás pensando?</p>
      <textarea id="texto-publicacion" class="texto-publicacion" name="texto-publicacion" maxlength="255" v-model='textoPublicacion' @keyup='charCount()'></textarea>
      <div class="box-under-text">
        <p class="texto-caracteres">{{ numCaracteres }}/255</p>
        <div class="btn-publicar" @click='enviarPublicacion()'>Publicar</div>
      </div>
    </div>
    <div class="listado-publicaciones">
      <p class="texto-no-publicaciones">No hay publicaciones disponibles. Haz las tuyas propias o sigue a gente para ver las suyas</p>
      <div v-for="(objetoLista, index) in this.listaPublicaciones" :key="objetoLista.id">
        <div class="item-publicacion">
          <div class="box-img-pub">
            <div :id="index" class="img-fake"></div>
          </div>
          <div class="box-textos-pub">
            <div class="nombre-fecha">
              <p>{{ this.listaUsuariosPubli[index].nombre }} {{ this.listaUsuariosPubli[index].apellidos }}</p>
              <p>{{ objetoLista.fecha_pub }}</p>
            </div>
            <div class="texto-pub">
              {{ objetoLista.texto }}
            </div>
          </div>
          <div class="box-likes">
            <div class="like-btn" @click='addLike(objetoLista.id)'>
              <img class="boton-like" src="../assets/img/like.png" alt="Botón Like">
            </div>
            <p>{{ objetoLista.likes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

var urlPublicaciones = "http://alcortewear.es/post/rest/grupetapp/publicacion.php";
var urlUsuarios = "http://alcortewear.es/post/rest/grupetapp/usuario.php";

export default {
    name: "Publicaciones",
    data() {
        return {
            numCaracteres: 0,
            listaPublicaciones: [],
            listaUsuariosPubli: [],
            usuario: ''
        }
    },
    mounted() {
      if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
      this.mostrarPublicaciones();
    },
    methods: {
      charCount: function(){
        this.numCaracteres = this.textoPublicacion.length;
      },
      enviarPublicacion:function() {
        var texto = window.$("#texto-publicacion").val();
        window.$('.btn-publicar').attr("disabled");
        axios.post(urlPublicaciones, {
          opcion:2, 
          id_usuario: this.usuario.id, 
          texto: texto,
          fecha_pub: new Date().toJSON().slice(0, 10)
        }).then(response =>{
          if(response.statusText == "OK"){
            window.$("#texto-publicacion").val("");
            texto = "";
            this.numCaracteres = 0;
            this.textoPublicacion = "";
            window.$('.btn-publicar').attr("enabled");
            this.mostrarPublicaciones();
          } else {
            this.$router.replace('error');
          }
        });
      },
      mostrarPublicaciones:function(){
        axios.post(urlPublicaciones, {
            opcion:1
        }).then(response =>{
          if(response.data.length != 0){
            window.$(".texto-no-publicaciones").css("display", "none");
            for(var i = 0; i < response.data.length; i++){
              this.listaPublicaciones[i] = response.data[i];
              this.addNombres(i, this.listaPublicaciones[i].id_usuario);
            }
          } else {
            window.$(".texto-no-publicaciones").css("display", "block");
          }
        });
      },
      addNombres:function(indice, id_usuario){
        axios.post(urlUsuarios, {
          opcion:7,
          id: id_usuario
        }).then(response =>{
          if(response.data.length != 0){
            this.listaUsuariosPubli[indice] = response.data[0];
            this.addFotos(indice);
          } else {
            console.log("Ha ocurrido un error");
          }
        });
      },
      addFotos:function(indice){
        if(this.listaUsuariosPubli[indice].foto != null){
          window.$("#"+indice+".img-fake").css("background-image", this.listaUsuariosPubli[indice].foto);
        }
      },
      addLike:function(id){
        axios.post(urlPublicaciones, {
          opcion:4, 
          id: id
        }).then(response =>{
          if(response.statusText == "OK"){
            for(var i = 0; i < this.listaPublicaciones.length; i++){
              if(this.listaPublicaciones[i].id == id){
                this.listaPublicaciones[i].likes++;
              }
            }
          }
        });
      }
    }
}
</script>

<style>
@import '../assets/css/publicaciones.css';
</style>