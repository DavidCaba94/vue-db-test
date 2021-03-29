<template>
  <div class="contenedor-todos">
    <div class="box-filtros">
      <input type="text" class="input-filtro" placeholder="Busca por nombre" v-model="this.nombre" v-on:keyup="filtrarUsuarios(this.nombre, this.provincia)" id="filtro-nombre">
      <select id="provincia" class="select-filtro" v-model="this.provincia" @change="filtrarUsuarios(this.nombre, this.provincia)" required>
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
      <div class="btn-limpiar-filtros" @click="limpiarFiltros()">
        <img class="img-btn" src="../assets/img/block.png">
        <p class="text-btn">Limpiar filtros</p>
      </div>
    </div>
    <div class="box-resultados">
      <div v-for="(user, index) in this.listaUsuariosFiltrados" :key="user.id">
        <router-link :to="'/usuario/'+user.id">
          <div class="item-usuario">
            <div :id="'foto-user-'+index" class="img-foto"></div>
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

var url = "https://alcortewear.es/post/rest/grupetapp/usuario.php";

export default {
    name: "Todos",
    data() {
        return {
            listaUsuarios: [],
            listaUsuariosFiltrados: [],
            usuario: '',
            nombre: '',
            provincia: 'Todas'
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.cargaInicialUsuarios();
    },
    updated() {
      this.addFotosFiltradas();
    },
    methods: {
      cargaInicialUsuarios:function() {
        axios.post(url, {
            opcion:1
        }).then(response =>{
          if(response.data.length == 0){
            console.log("vacio");
          } else {
            for(var i = 0; i < response.data.length; i++){
              this.listaUsuarios[i] = response.data[i];
            }
            this.filtrarUsuarios(this.nombre, this.provincia);
          }
        });
      },
      filtrarUsuarios:function(nombre, provincia) {
        nombre = nombre.toLowerCase();
        this.listaUsuariosFiltrados = [];
        if(nombre == "" && provincia == "Todas"){
          this.listaUsuariosFiltrados = this.listaUsuarios;
        } else {
          for(var i = 0; i < this.listaUsuarios.length; i++){
            var nombreCompleto = this.listaUsuarios[i].nombre + " " + this.listaUsuarios[i].apellidos;
            if((nombre != "" && provincia != "Todas") && (nombreCompleto.toLowerCase().includes(nombre)) && (provincia == this.listaUsuarios[i].provincia)){
              this.listaUsuariosFiltrados.push(this.listaUsuarios[i]);
            } else if((nombre != "" && provincia == "Todas") && (nombreCompleto.toLowerCase().includes(nombre))){
              this.listaUsuariosFiltrados.push(this.listaUsuarios[i]);
            } else if((nombre == "" && provincia != "Todas") && (provincia == this.listaUsuarios[i].provincia)){
              this.listaUsuariosFiltrados.push(this.listaUsuarios[i]);
            }
          }
        }
        this.addFotosFiltradas();
      },
      limpiarFiltros:function() {
        this.nombre = "";
        this.provincia = "Todas";
        this.filtrarUsuarios(this.nombre, this.provincia);
      },
      addFotosFiltradas:function() {
        for(var i = 0; i < this.listaUsuariosFiltrados.length; i++){
          if(this.listaUsuariosFiltrados[i].foto != null){
            window.$("#foto-user-"+i).css("background-image", "url("+ this.listaUsuariosFiltrados[i].foto +")");
          }
        }
      }
    }
}
</script>

<style>
@import '../assets/css/todos.css';
</style>