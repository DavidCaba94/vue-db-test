<template>
  <div class="contenedor-mis-rutas">
      <div class="cabecera-seccion">
          <p class="titulo-seccion" @click="toggleRutasActivas()"><img class="img-expandir" src="../assets/img/expandir.png">Rutas activas</p>
          <router-link to="/crear-ruta"><div class="btn-nueva-ruta">Crear ruta</div></router-link>
      </div>
      <div id="box-rutas-activas" class="box-rutas">
          <div v-for="(ruta) in this.rutas" :key="ruta.id">
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
      <div class="cabecera-seccion">
          <p class="titulo-seccion" @click="toggleRutasPasadas()"><img class="img-expandir" src="../assets/img/expandir.png">Rutas pasadas</p>
      </div>
      <div id="box-rutas-pasadas" class="box-rutas">
          <div v-for="(rutaPasada) in this.rutasPasadas" :key="rutaPasada.id">
            <router-link :to="'/ruta/'+rutaPasada.id">
                <div class="card-ruta">
                    <div class="capa-mapa-generico"></div>
                    <p class="nombre-ruta">{{ rutaPasada.nombre }}</p>
                    <div class="box-parametros">
                        <div>
                            <img src="../assets/img/tipo.png">
                            <p>{{ rutaPasada.tipo }}</p>
                        </div>
                        <div>
                            <img src="../assets/img/distancia.png">
                            <p>{{ rutaPasada.distancia }}KM</p>
                        </div>
                        <div>
                            <img src="../assets/img/dificultad.png">
                            <p>{{ rutaPasada.dificultad }}</p>
                        </div>
                        <div>
                            <img src="../assets/img/personas.png">
                            <p>{{ rutaPasada.max_personas }}</p>
                        </div>
                        <div>
                            <img src="../assets/img/fecha.png">
                            <p>{{ $filters.formatDate(rutaPasada.fecha) }}</p>
                        </div>
                        <div>
                            <img src="../assets/img/hora.png">
                            <p>{{ rutaPasada.hora }}</p>
                        </div>
                    </div>
                </div>
            </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

var url = "http://alcortewear.es/post/rest/grupetapp/ruta.php";

export default {
    data () {
        return {
            usuario: '',
            mymap: null,
            rutas: [],
            rutasPasadas: []
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);

        this.obtenerRutas();
        this.obtenerRutasPasadas();
        /*
        this.mymap = L.map('mapid').setView([40.958471, -5.6582], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Grupetapp',
            maxZoom: 18,
            zoomControl: false,
            attributionControl: false,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZGF2aWRjYWJhOTQiLCJhIjoiY2tuMzVmNHdvMDRsajJ5cXJ3YmZldmo4aSJ9.s-GOpcUEx7q6JPSjyOMPpQ'
        }).addTo(this.mymap);

        
        this.mymap.on('click', this.onMapClick);

        this.addMarkers();
        */
    },
    methods: {
        toggleRutasActivas:function() {
            window.$("#box-rutas-activas").slideToggle();
        },
        toggleRutasPasadas:function() {
            window.$("#box-rutas-pasadas").slideToggle();
        },
        obtenerRutas:function() {
            axios.post(url, {
                opcion:5,
                id_usuario: this.usuario.id,
                fecha: new Date().toJSON().slice(0, 10)
            }).then(response =>{
                if(response.data.length == 0){
                    //console.log("No hay rutas para este usuario");
                } else {
                    for(var i = 0; i < response.data.length; i++){
                        this.rutas.push(response.data[i]);
                    }
                }
            });
        },
        obtenerRutasPasadas:function() {
            axios.post(url, {
                opcion:6,
                id_usuario: this.usuario.id,
                fecha: new Date().toJSON().slice(0, 10)
            }).then(response =>{
                if(response.data.length == 0){
                    //console.log("No hay rutas pasadas para este usuario");
                } else {
                    for(var i = 0; i < response.data.length; i++){
                        this.rutasPasadas.push(response.data[i]);
                    }
                }
            });  
        }
        /*
        addMarkers:function() {
            var customMarker = L.icon({
                iconUrl: require('../assets/img/favicon.png'),
                iconSize:     [38, 38],
                iconAnchor:   [19, 38]
            });

            L.marker([40.958471, -5.6582],{icon: customMarker}).addTo(this.mymap)
                .bindPopup('Descripción marcador mapa');
        }
        */
    }
}
</script>

<style>
@import '../assets/css/mis-rutas.css';
</style>