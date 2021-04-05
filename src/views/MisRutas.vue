<template>
  <div class="contenedor-mis-rutas">
      <div class="cabecera-seccion">
          <p class="titulo-seccion" @click="toggleRutasActivas()"><img class="img-expandir" src="../assets/img/expandir.png">Rutas activas</p>
          <router-link to="/crear-ruta"><div class="btn-nueva-ruta">Crear ruta</div></router-link>
      </div>
      <div id="box-rutas-activas" class="box-rutas">
          <router-link :to="'/ruta/1'">
            <div class="card-ruta">
                <div id="mapid" class="capa-mapa"></div>
                <p class="nombre-ruta">Nombre Ruta</p>
                <div class="box-parametros">
                    <div>
                        <img src="../assets/img/tipo.png">
                        <p>MTB</p>
                    </div>
                    <div>
                        <img src="../assets/img/distancia.png">
                        <p>70KM</p>
                    </div>
                    <div>
                        <img src="../assets/img/dificultad.png">
                        <p>Difícil</p>
                    </div>
                    <div>
                        <img src="../assets/img/personas.png">
                        <p>8</p>
                    </div>
                    <div>
                        <img src="../assets/img/fecha.png">
                        <p>27/07/2021</p>
                    </div>
                    <div>
                        <img src="../assets/img/hora.png">
                        <p>12:00</p>
                    </div>
                </div>
            </div>
          </router-link>
      </div>
      <div class="cabecera-seccion">
          <p class="titulo-seccion" @click="toggleRutasPasadas()"><img class="img-expandir" src="../assets/img/expandir.png">Rutas pasadas</p>
      </div>
      <div id="box-rutas-pasadas" class="box-rutas">
          <router-link :to="'/ruta/1'">
            <div class="card-ruta">
                <div class="capa-mapa-generico"></div>
                <p class="nombre-ruta">Nombre Ruta</p>
                <div class="box-parametros">
                    <div>
                        <img src="../assets/img/tipo.png">
                        <p>Carretera</p>
                    </div>
                    <div>
                        <img src="../assets/img/distancia.png">
                        <p>140KM</p>
                    </div>
                    <div>
                        <img src="../assets/img/dificultad.png">
                        <p>Fácil</p>
                    </div>
                    <div>
                        <img src="../assets/img/personas.png">
                        <p>6</p>
                    </div>
                    <div>
                        <img src="../assets/img/fecha.png">
                        <p>21/06/2021</p>
                    </div>
                    <div>
                        <img src="../assets/img/hora.png">
                        <p>18:00</p>
                    </div>
                </div>

            </div>
          </router-link>
      </div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
    data () {
        return {
            usuario: '',
            mymap: null
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);

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
    },
    methods: {
        toggleRutasActivas:function() {
            window.$("#box-rutas-activas").slideToggle();
        },
        toggleRutasPasadas:function() {
            window.$("#box-rutas-pasadas").slideToggle();
        },
        addMarkers:function() {
            var customMarker = L.icon({
                iconUrl: require('../assets/img/favicon.png'),
                iconSize:     [38, 38],
                iconAnchor:   [19, 38]
            });

            L.marker([40.958471, -5.6582],{icon: customMarker}).addTo(this.mymap)
                .bindPopup('Descripción marcador mapa');
        },
        onMapClick:function(e) {
            L.popup()
                .setLatLng(e.latlng)
                .setContent("Has picado en las coordenadas " + e.latlng.toString())
                .openOn(this.mymap);
        }
    }
}
</script>

<style>
@import '../assets/css/mis-rutas.css';
</style>