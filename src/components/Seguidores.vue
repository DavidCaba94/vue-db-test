<template>
  <div class="contenedor-seguidores">
    <div class="box-filtros">
      <input type="text" class="input-filtro" placeholder="Busca por nombre" v-model="this.nombreSeguidor" v-on:keyup="filtrarSeguidores(this.nombreSeguidor, this.provinciaSeguidor)">
      <select id="provincia" class="select-filtro" v-model="this.provinciaSeguidor" @change="filtrarSeguidores(this.nombreSeguidor, this.provinciaSeguidor)" required>
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
      <div class="btn-limpiar-filtros" @click="limpiarFiltrosSeguidores()">
        <img class="img-btn" src="../assets/img/block.png">
        <p class="text-btn">Limpiar filtros</p>
      </div>
    </div>
    <div class="total-seguidores">Seguidores: {{ this.listaRelacional2.length }}</div>
    <div class="box-resultados">
      <div v-for="(user, index) in this.listaSeguidoresFiltrados" :key="user.id">
        <router-link :to="'/usuario/'+user.id">
          <div class="item-usuario">
            <div :id="'foto-seguidor-'+index" class="img-foto"></div>
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

var urlSeguidores = "https://tarotgratisonline.com/rest/grupetapp/seguidores.php";
var urlUsuarios = "https://tarotgratisonline.com/rest/grupetapp/usuario.php";

export default {
    name: "Seguidores",
    data() {
        return {
            listaRelacional2: [],
            listaSeguidores: [],
            listaSeguidoresFiltrados: [],
            usuario: '',
            nombreSeguidor: '',
            provinciaSeguidor: 'Todas'
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.cargaInicialSeguidores();
    },
    updated() {
      this.addFotosSeguidoresFiltradas();
    },
    methods: {
      cargaInicialSeguidores: function() {
        axios.post(urlSeguidores, {
            opcion:1,
            id: this.usuario.id
        }).then(response =>{
          if(response.data.length == 0){
            console.log("vacio");
          } else {
            for(var i = 0; i < response.data.length; i++){
              this.listaRelacional2[i] = response.data[i];
              this.obtenerDatosSeguidor(this.listaRelacional2[i].id_seguidor);
            }
            this.filtrarSeguidores(this.nombreSeguidor, this.provinciaSeguidor);
          }
        });
      },
      obtenerDatosSeguidor:function(id_seguidor) {
        axios.post(urlUsuarios, {
            opcion:10,
            id: id_seguidor
        }).then(response =>{
          if(response.data.length == 0){
            console.log("vacio");
          } else {
            this.listaSeguidores.push(response.data[0]);
          }
        });
      },
      filtrarSeguidores:function(nombreSeguidor, provinciaSeguidor) {
        nombreSeguidor = nombreSeguidor.toLowerCase();
        this.listaSeguidoresFiltrados = [];
        if(nombreSeguidor == "" && provinciaSeguidor == "Todas"){
          this.listaSeguidoresFiltrados = this.listaSeguidores;
        } else {
          for(var i = 0; i < this.listaSeguidores.length; i++){
            var nombreCompleto = this.listaSeguidores[i].nombre + " " + this.listaSeguidores[i].apellidos;
            if((nombreSeguidor != "" && provinciaSeguidor != "Todas") && (nombreCompleto.toLowerCase().includes(nombreSeguidor)) && (provinciaSeguidor == this.listaSeguidores[i].provincia)){
              this.listaSeguidoresFiltrados.push(this.listaSeguidores[i]);
            } else if((nombreSeguidor != "" && provinciaSeguidor == "Todas") && (nombreCompleto.toLowerCase().includes(nombreSeguidor))){
              this.listaSeguidoresFiltrados.push(this.listaSeguidores[i]);
            } else if((nombreSeguidor == "" && provinciaSeguidor != "Todas") && (provinciaSeguidor == this.listaSeguidores[i].provincia)){
              this.listaSeguidoresFiltrados.push(this.listaSeguidores[i]);
            }
          }
        }
        this.addFotosSeguidoresFiltradas();
      },
      limpiarFiltrosSeguidores:function() {
        this.nombreSeguidor = "";
        this.provinciaSeguidor = "Todas";
        this.filtrarSeguidores(this.nombreSeguidor, this.provinciaSeguidor);
      },
      addFotosSeguidoresFiltradas:function() {
        for(var i = 0; i < this.listaSeguidoresFiltrados.length; i++){
          if(this.listaSeguidoresFiltrados[i].foto != null){
            window.$("#foto-seguidor-"+i).css("background-image", "url("+ this.listaSeguidoresFiltrados[i].foto +")");
          } else {
            window.$("#foto-seguidor-"+i).css("background-image", "url(/img/user-default.de2ba6b9.png)");
          }
        }
      }
    }
}
</script>

<style>
@import '../assets/css/seguidores.css';
</style>