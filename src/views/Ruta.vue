<template>
    <div class="contenedor-ruta">
        <p class="nombre-ruta" v-if="this.rutaObject">{{ this.rutaObject.nombre }}</p>
        <div id="rutaMapId"></div>
        <p class="titulo-info">Información de la ruta</p>
        <div class="info-ruta" v-if="this.rutaObject">
            <div class="item-info">
                <img src="../assets/img/tipo.png">
                <p>{{ this.rutaObject.tipo }}</p>
            </div>
            <div class="item-info">
                <img src="../assets/img/distancia.png">
                <p>{{ this.rutaObject.distancia }}KM</p>
            </div>
            <div class="item-info">
                <img src="../assets/img/dificultad.png">
                <p>{{ this.rutaObject.dificultad }}</p>
            </div>
            <div class="item-info">
                <img src="../assets/img/personas.png">
                <p>{{ this.rutaObject.max_personas }}</p>
            </div>
            <div class="item-info">
                <img src="../assets/img/fecha.png">
                <p>{{ $filters.formatDate(rutaObject.fecha) }}</p>
            </div>
            <div class="item-info">
                <img src="../assets/img/hora.png">
                <p>{{ this.rutaObject.hora }}</p>
            </div>
        </div>
        <div class="box-organizador">
            <p>Organizador</p>
            
        </div>
    </div>
</template>

<script>
import L from 'leaflet';
import axios from "axios";

var url = "http://alcortewear.es/post/rest/grupetapp/ruta.php";

var rutamap;

export default {
    name: "Ruta",
    data () {
        return {            
            usuario: '',
            idRuta: '',
            rutaObject: null
        }
    },
    mounted() {
        this.idRuta = this.$route.params.id;
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        rutamap = L.map('rutaMapId').setView([40.41680911937625, -3.703799935080432], 5);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Grupetapp',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZGF2aWRjYWJhOTQiLCJhIjoiY2tuMzVmNHdvMDRsajJ5cXJ3YmZldmo4aSJ9.s-GOpcUEx7q6JPSjyOMPpQ'
        }).addTo(rutamap);

        this.obtenerDatosRuta();
    },
    methods: {
        addMarkerRuta:function(lat, long) {
            var customMarker = L.icon({
                iconUrl: require('../assets/img/favicon.png'),
                iconSize:     [38, 38],
                iconAnchor:   [19, 38]
            });

            L.marker([lat, long],{icon: customMarker}).addTo(rutamap);
        },
        obtenerDatosRuta:function() {
            axios.post(url, {
                opcion:10,
                id: this.idRuta
            }).then(response =>{
                if(response.data.length == 0){
                    this.$router.replace('error');
                } else {
                    this.rutaObject = response.data[0];
                    this.addMarkerRuta(response.data[0].latitud, response.data[0].longitud);
                    rutamap.flyTo(new L.LatLng(response.data[0].latitud, response.data[0].longitud), 15);
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/ruta.css';
</style>