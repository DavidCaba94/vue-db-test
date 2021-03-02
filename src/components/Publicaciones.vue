<template>
  <div class="contenedor-publicaciones">
    <div class="box-form-publicacion">
      <p class="titulo-form">Publica lo que piensas</p>
      <textarea id="texto-publicacion" class="texto-publicacion" name="texto-publicacion" maxlength="255" v-model='textoPublicacion' @keyup='charCount()'></textarea>
      <div class="box-under-text">
        <p class="texto-caracteres">{{ numCaracteres }}/255</p>
        <div class="btn-publicar" @click='enviarPublicacion()'>Publicar</div>
      </div>
    </div>
    <div class="listado-publicaciones">
      <p class="texto-no-publicaciones">No hay publicaciones disponibles. Haz las tuyas propias o sigue a gente para ver las suyas</p>
      <div v-for="objetoLista in this.listaPublicaciones" :key="objetoLista.id">
        <div class="item-publicacion">
          <div class="box-img-pub">
            <div class="img-fake"></div>
          </div>
          <div class="box-textos-pub">
            <div class="nombre-fecha">
              <p>{{ objetoLista.id_usuario }}</p>
              <p>{{ objetoLista.fecha_pub }}</p>
            </div>
            <div class="texto-pub">
              {{ objetoLista.texto }}
            </div>
          </div>
          <div class="box-likes">
            <p>{{ objetoLista.likes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

var url = "http://alcortewear.es/post/rest/grupetapp/publicacion.php";

export default {
    name: "Publicaciones",
    data() {
        return {
            numCaracteres: 0,
            listaPublicaciones: []
        }
    },
    mounted() {
      this.mostrarPublicaciones();
    },
    methods: {
      charCount: function(){
        this.numCaracteres = this.textoPublicacion.length;
      },
      enviarPublicacion:function() {
        var texto = window.$("#texto-publicacion").val();
        window.$('.btn-publicar').attr("disabled");
        axios.post(url, {
          opcion:2, 
          id_usuario: 1, 
          texto: texto,
          fecha_pub: new Date().toJSON().slice(0, 10)
        }).then(response =>{
          if(response.statusText == "OK"){
            window.$("#texto-publicacion").val("");
            texto = "";
            this.textoPublicacion = "";
            window.$('.btn-publicar').attr("enabled");
            this.mostrarPublicaciones();
          } else {
            this.$router.replace('error');
          }
        });
      },
      mostrarPublicaciones:function(){
        axios.post(url, {
            opcion:1
        }).then(response =>{
          if(response.data.length != 0){
            window.$(".texto-no-publicaciones").css("display", "none");
            for(var i = 0; i < response.data.length; i++){
              this.listaPublicaciones[i] = response.data[i];
            }
          } else {
            window.$(".texto-no-publicaciones").css("display", "block");
          }
        });
      }
    }
}
</script>

<style>
@import '../assets/css/publicaciones.css';
</style>