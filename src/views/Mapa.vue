<template>
    <div class="contenedor-mapa">
        <div class="filtros-mapa">
            <input type="text" placeholder="Tipo de ruta">
        </div>
        <div id="mapid"></div>
    </div>
</template>

<script>

import L from 'leaflet';

var mymap;

export default {
    name: "Mapa",
    data () {
        return {            
            usuario: ''
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        mymap = L.map('mapid').setView([40.41680911937625, -3.703799935080432], 6);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Grupetapp',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZGF2aWRjYWJhOTQiLCJhIjoiY2tuMzVmNHdvMDRsajJ5cXJ3YmZldmo4aSJ9.s-GOpcUEx7q6JPSjyOMPpQ'
        }).addTo(mymap);

        
        mymap.on('click', this.onMapClick);

        this.addMarkers();
    },
    methods: {
        addMarkers:function() {
            var customMarker = L.icon({
                iconUrl: require('../assets/img/favicon.png'),
                iconSize:     [38, 38],
                iconAnchor:   [19, 38]
            });

            L.marker([40.958471, -5.6582],{icon: customMarker}).addTo(mymap)
                .bindPopup('Descripción marcador mapa');
        },
        onMapClick:function(e) {
            L.popup()
                .setLatLng(e.latlng)
                .setContent("Has picado en las coordenadas " + e.latlng.toString())
                .openOn(mymap);
        }
    }
}
</script>

<style>
@import '../assets/css/mapa.css';
</style>