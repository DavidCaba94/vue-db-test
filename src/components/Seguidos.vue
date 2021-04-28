<template>
  <div class="contenedor-seguidos">
    <div class="box-filtros">
      <input type="text" class="input-filtro" placeholder="Busca por nombre" v-model="this.nombreSeguido" v-on:keyup="filtrarUsuariosSeguidos(this.nombreSeguido, this.provinciaSeguido)">
      <select id="provincia" class="select-filtro" v-model="this.provinciaSeguido" @change="filtrarUsuariosSeguidos(this.nombreSeguido, this.provinciaSeguido)" required>
        <option value="Todas" selected>Todas las provincias</option>
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
      <div class="btn-limpiar-filtros" @click="limpiarFiltrosSeguidos()">
        <img class="img-btn" src="../assets/img/block.png">
        <p class="text-btn">Limpiar filtros</p>
      </div>
    </div>
    <div class="total-seguidos">Usuarios seguidos: {{ this.listaRelacional.length }}</div>
    <div class="box-resultados">
      <div v-for="(user, index) in this.listaSeguidosFiltrados" :key="user.id">
        <router-link :to="'/usuario/'+user.id">
          <div class="item-usuario">
            <div :id="'foto-seguido-'+index" class="img-foto"></div>
            <div>
              <p class="nombre-usuario">{{ user.nombre }} {{ user.apellidos }}</p>
              <p class="provincia-usuario">{{ user.provincia }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

var urlSeguidos = "https://crousser.com/app/rest/grupetapp/seguidos.php";
var urlUsuarios = "https://crousser.com/app/rest/grupetapp/usuario.php";

export default {
    name: "Seguidos",
    data() {
        return {
            listaRelacional: [],
            listaUsuariosSeguidos: [],
            listaSeguidosFiltrados: [],
            usuario: '',
            nombreSeguido: '',
            provinciaSeguido: 'Todas'
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.cargaInicialSeguidos();
    },
    updated() {
      this.addFotosSeguidosFiltradas();
    },
    methods: {
      cargaInicialSeguidos: function() {
        axios.post(urlSeguidos, {
            opcion:1,
            id: this.usuario.id
        }).then(response =>{
          if(response.data.length == 0){
            console.log("vacio");
          } else {
            for(var i = 0; i < response.data.length; i++){
              this.listaRelacional[i] = response.data[i];
              this.obtenerDatosSeguido(this.listaRelacional[i].id_seguido);
            }
            this.filtrarUsuariosSeguidos(this.nombreSeguido, this.provinciaSeguido);
          }
        });
      },
      obtenerDatosSeguido:function(id_seguido) {
        axios.post(urlUsuarios, {
            opcion:10,
            id: id_seguido
        }).then(response =>{
          if(response.data.length == 0){
            console.log("vacio");
          } else {
            this.listaUsuariosSeguidos.push(response.data[0]);
          }
        });
      },
      filtrarUsuariosSeguidos:function(nombreSeguido, provinciaSeguido) {
        nombreSeguido = nombreSeguido.toLowerCase();
        this.listaSeguidosFiltrados = [];
        if(nombreSeguido == "" && provinciaSeguido == "Todas"){
          this.listaSeguidosFiltrados = this.listaUsuariosSeguidos;
        } else {
          for(var i = 0; i < this.listaUsuariosSeguidos.length; i++){
            var nombreCompleto = this.listaUsuariosSeguidos[i].nombre + " " + this.listaUsuariosSeguidos[i].apellidos;
            if((nombreSeguido != "" && provinciaSeguido != "Todas") && (nombreCompleto.toLowerCase().includes(nombreSeguido)) && (provinciaSeguido == this.listaUsuariosSeguidos[i].provincia)){
              this.listaSeguidosFiltrados.push(this.listaUsuariosSeguidos[i]);
            } else if((nombreSeguido != "" && provinciaSeguido == "Todas") && (nombreCompleto.toLowerCase().includes(nombreSeguido))){
              this.listaSeguidosFiltrados.push(this.listaUsuariosSeguidos[i]);
            } else if((nombreSeguido == "" && provinciaSeguido != "Todas") && (provinciaSeguido == this.listaUsuariosSeguidos[i].provincia)){
              this.listaSeguidosFiltrados.push(this.listaUsuariosSeguidos[i]);
            }
          }
        }
        this.addFotosSeguidosFiltradas();
      },
      limpiarFiltrosSeguidos:function() {
        this.nombreSeguido = "";
        this.provinciaSeguido = "Todas";
        this.filtrarUsuariosSeguidos(this.nombreSeguido, this.provinciaSeguido);
      },
      addFotosSeguidosFiltradas:function() {
        for(var i = 0; i < this.listaSeguidosFiltrados.length; i++){
          if(this.listaSeguidosFiltrados[i].foto != null){
            window.$("#foto-seguido-"+i).css("background-image", "url("+ this.listaSeguidosFiltrados[i].foto +")");
          }
        }
      }
    }
}
</script>

<style>
@import '../assets/css/seguidos.css';
</style>