<template>
    <div class="contenedor-global">
        <div class="desplegar-filtros" @click="toggleFiltros()">
            <img src="../assets/img/filtros.png">
        </div>
        <div class="filtros-global">
            <select id="tipo" class="select-filtro" v-model="this.tipoRutaFiltro" @change="filtrarRutas(this.tipoRutaFiltro, this.dificultadRutaFiltro, this.provinciaFiltro)" required>
                <option value="Todas" selected>Todos los tipos</option>
                <option value="MTB">MTB</option>
                <option value="Carretera">Carretera</option>
                <option value="Descenso">Descenso</option>
                <option value="Gravel">Gravel</option>
            </select>
            <select id="dificultad" class="select-filtro" v-model="this.dificultadRutaFiltro" @change="filtrarRutas(this.tipoRutaFiltro, this.dificultadRutaFiltro, this.provinciaFiltro)" required>
                <option value="Todas" selected>Todas las dificultades</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Difícil">Difícil</option>
                <option value="Extrema">Extrema</option>
            </select>
            <select id="provincia" class="select-filtro" v-model="this.provinciaFiltro" @change="filtrarRutas(this.tipoRutaFiltro, this.dificultadRutaFiltro, this.provinciaFiltro)" required>
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
            <div class="btn-limpiar-filtros" @click="limpiarFiltrosGlobal()">
                <img class="img-btn" src="../assets/img/block.png">
                <p class="text-btn">Limpiar filtros</p>
            </div>
        </div>
        <div class="listado-rutas">
            <p v-if="this.rutasFiltradas.length == 0">No hay rutas disponibles</p>
            <div v-for="(ruta) in this.rutasFiltradas" :key="ruta.id">
                <router-link :to="'/ruta/'+ruta.id">
                    <div class="item-ruta">
                        <div class="linea-id-nombre">#<span class="id-ruta">{{ ruta.id }}</span><p class="nombre-ruta">{{ ruta.nombre }}</p></div>
                        <div class="box-parametros">
                            <div class="caracteristicas">
                                <div>
                                    <img src="../assets/img/tipo.png">
                                    <p>{{ ruta.tipo }}</p>
                                </div>
                                <div>
                                    <img src="../assets/img/distancia.png">
                                    <p>{{ ruta.distancia }}KM</p>
                                </div>
                                <div>
                                    <img src="../assets/img/dificultad.png">
                                    <p>{{ ruta.dificultad }}</p>
                                </div>
                                <div>
                                    <img src="../assets/img/personas.png">
                                    <p>{{ ruta.max_personas }}</p>
                            </div>
                            </div>
                            <div class="fecha-hora">
                                <div>
                                    <img src="../assets/img/fecha.png">
                                    <p>{{ $filters.formatDate(ruta.fecha) }}</p>
                                </div>
                                <div>
                                    <img src="../assets/img/hora.png">
                                    <p>{{ ruta.hora }}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p class="provincia-ruta">{{ ruta.provincia }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

var urlRutas = "http://alcortewear.es/post/rest/grupetapp/ruta.php";

export default {
    data () {
    return {
            usuario: '',
            tipoRutaFiltro: 'Todas',
            dificultadRutaFiltro: 'Todas',
            provinciaFiltro: 'Todas',
            rutas: [],
            rutasFiltradas: []
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.obtenerRutas();
    },
    methods: {
        toggleFiltros:function() {
            window.$(".filtros-global").slideToggle();
        },
        obtenerRutas:function() {
            this.rutas = [];
            axios.post(urlRutas, {
                opcion:13,
                fecha: new Date().toJSON().slice(0, 10)
            }).then(response =>{
                if(response.data.length != 0){
                    this.rutas = response.data;
                    this.filtrarRutas(this.tipoRutaFiltro, this.dificultadRutaFiltro, this.provinciaFiltro);
                }
            });
        },
        filtrarRutas:function(tipo, dificultad, provincia) {
            this.rutasFiltradas = [];
            if(tipo == "Todas" && dificultad == "Todas" && provincia == "Todas") {
                this.rutasFiltradas = this.rutas;
            } else {
                for(var i = 0; i < this.rutas.length; i++){
                    if((tipo != "Todas" && dificultad == "Todas" && provincia == "Todas") && (this.rutas[i].tipo == tipo)){
                        this.rutasFiltradas.push(this.rutas[i]);
                    } else if((tipo == "Todas" && dificultad != "Todas" && provincia == "Todas") && (this.rutas[i].dificultad == dificultad)){
                        this.rutasFiltradas.push(this.rutas[i]);
                    } else if((tipo == "Todas" && dificultad == "Todas" && provincia != "Todas") && (this.rutas[i].provincia == provincia)){
                        this.rutasFiltradas.push(this.rutas[i]);
                    } else if((tipo != "Todas" && dificultad != "Todas" && provincia == "Todas") && (this.rutas[i].tipo == tipo && this.rutas[i].dificultad == dificultad)){
                        this.rutasFiltradas.push(this.rutas[i]);
                    } else if((tipo != "Todas" && dificultad == "Todas" && provincia != "Todas") && (this.rutas[i].tipo == tipo && this.rutas[i].provincia == provincia)){
                        this.rutasFiltradas.push(this.rutas[i]);
                    } else if((tipo == "Todas" && dificultad != "Todas" && provincia != "Todas") && (this.rutas[i].dificultad == dificultad && this.rutas[i].provincia == provincia)){
                        this.rutasFiltradas.push(this.rutas[i]);
                    } else if((tipo != "Todas" && dificultad != "Todas" && provincia != "Todas") && this.rutas[i].tipo == tipo && (this.rutas[i].dificultad == dificultad && this.rutas[i].provincia == provincia)){
                        this.rutasFiltradas.push(this.rutas[i]);
                    }
                }
            }
        },
        limpiarFiltrosGlobal:function() {
            this.tipoRutaFiltro = "Todas";
            this.dificultadRutaFiltro = "Todas";
            this.provinciaFiltro = "Todas";
            this.filtrarRutas(this.tipoRutaFiltro, this.dificultadRutaFiltro, this.provinciaFiltro);
        }
    }
}
</script>

<style>
@import '../assets/css/global.css';
</style>