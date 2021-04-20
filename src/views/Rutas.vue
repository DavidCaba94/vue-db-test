<template>
    <div class="contenedor-rutas">
        <div class="flex-cabecera-rutas">
            <p @click="toggleRutasCerca()">
                <img class="img-desplegar" src="../assets/img/expandir.png">
                {{ this.rutasCercanas.length }} Rutas cerca de ti ({{ this.usuario.provincia }})
            </p>
            <router-link to="/mapa">
                <div class="btn-ver-mapa"><img src="../assets/img/map.png"> Ver mapa</div>
            </router-link>
        </div>
        <div id="box-rutas-cerca" class="box-rutas-cerca">
            <div v-for="(ruta) in this.rutasCercanas" :key="ruta.id">
                <router-link :to="'/ruta/'+ruta.id">
                    <div class="card-ruta">
                        <div class="capa-mapa"></div>
                        <p class="nombre-ruta">{{ ruta.nombre }}</p>
                        <div class="box-parametros">
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
                </router-link>
            </div>
        </div>
        <div class="rutas-inscrito">
            <p class="titulo-inscripciones">Rutas en las que te has inscrito</p>
            <div v-for="(inscripcion) in this.inscripcionesRutas" :key="inscripcion.id">
                <router-link :to="'/ruta/'+inscripcion.id">
                    <div class="card-inscripcion">
                        <p class="titulo-card">#{{ inscripcion.id }} <span>{{ inscripcion.nombre }}</span></p>
                        <div class="box-caracteristicas">
                            <div>
                                <img src="../assets/img/tipo.png">
                                <p>{{ inscripcion.tipo }}</p>
                            </div>
                            <div>
                                <img src="../assets/img/distancia.png">
                                <p>{{ inscripcion.distancia }}KM</p>
                            </div>
                            <div>
                                <img src="../assets/img/dificultad.png">
                                <p>{{ inscripcion.dificultad }}</p>
                            </div>
                            <div>
                                <img src="../assets/img/personas.png">
                                <p>{{ inscripcion.max_personas }}</p>
                            </div>
                        </div>
                        <p class="titulo-card">{{ inscripcion.provincia }}</p>
                        <div class="box-caracteristicas">
                            <div>
                                <img src="../assets/img/fecha.png">
                                <p>{{ $filters.formatDate(inscripcion.fecha) }}</p>
                            </div>
                            <div>
                                <img src="../assets/img/hora.png">
                                <p>{{ inscripcion.hora }}</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="todas-las-rutas">
            Si quieres ver un listado con todas las rutas disponibles en España ve a la sección <router-link to="/global"><span>Global</span></router-link>
        </div>
        <div class="el-tiempo">
            <p class="titulo-inscripciones">El tiempo para tus rutas</p>
            <div class="el-tiempo-desktop">
                <iframe src="https://www.meteoblue.com/en/weather/widget/three?geoloc=detect&nocurrent=0&noforecast=0&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 100%; height: 591px"></iframe><div><a href="https://www.meteoblue.com/en/weather/week/index?utm_source=weather_widget&utm_medium=linkus&utm_content=three&utm_campaign=Weather%2BWidget" target="_blank"></a></div>
            </div>
            <div class="el-tiempo-movil">
                <iframe src="https://www.meteoblue.com/en/weather/widget/three?geoloc=detect&nocurrent=0&noforecast=0&noforecast=1&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 100%; height: 320px"></iframe><div><a href="https://www.meteoblue.com/en/weather/week/index?utm_source=weather_widget&utm_medium=linkus&utm_content=three&utm_campaign=Weather%2BWidget" target="_blank"></a></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

var urlRutas = "http://alcortewear.es/post/rest/grupetapp/ruta.php";
var urlInscripciones = "http://alcortewear.es/post/rest/grupetapp/inscripciones.php";

export default {
    data () {
    return {
            usuario: '',
            rutasCercanas: [],
            inscripcionesRutas: []
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.obtenerRutasCercanas();
        this.obtenerInscripcionesUsuario();
    },
    methods: {
        toggleRutasCerca:function() {
            window.$("#box-rutas-cerca").slideToggle();
        },
        obtenerRutasCercanas:function() {
            this.rutasCercanas = [];
            axios.post(urlRutas, {
                opcion:12,
                fecha: new Date().toJSON().slice(0, 10),
                provincia: this.usuario.provincia
            }).then(response =>{
                if(response.data.length != 0){
                    this.rutasCercanas = response.data;
                }
            });
        },
        obtenerInscripcionesUsuario:function() {
            this.inscripcionesRutas = [];
            axios.post(urlInscripciones, {
                opcion:7,
                fecha: new Date().toJSON().slice(0, 10),
                id_usuario: this.usuario.id
            }).then(response =>{
                if(response.data.length != 0){
                    this.inscripcionesRutas = response.data;
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/rutas.css';
</style>