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
import axios from "axios";

var url = "http://alcortewear.es/post/rest/grupetapp/ruta.php";

var mymap;

export default {
    name: "Mapa",
    data () {
        return {            
            usuario: '',
            rutasMapa: []
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

        this.obtenerRutasMapa();
    },
    methods: {
        addMarkers:function() {
            var customMarker = L.icon({
                iconUrl: require('../assets/img/favicon.png'),
                iconSize:     [38, 38],
                iconAnchor:   [19, 38],
                popupAnchor:  [0, -30]
            });

            for(var i = 0; i < this.rutasMapa.length; i++) {
                L.marker([this.rutasMapa[i].latitud, this.rutasMapa[i].longitud],{icon: customMarker}).addTo(mymap).bindPopup(this.componerPopupCustom(this.rutasMapa[i]),{'width': '500'});
            }
        },
        componerPopupCustom:function(rutaObject) {
            var customPopup = "<p class='titulo-popup'>"+ rutaObject.nombre +"</p>"
                            + "<div class='box-caracteristicas'>"
                                + "<div><img src='"+ require('../assets/img/tipo.png') +"'><p>"+ rutaObject.tipo +"</p></div>"
                                + "<div><img src='"+ require('../assets/img/distancia.png') +"'><p>"+ rutaObject.distancia +"</p></div>"
                                + "<div><img src='"+ require('../assets/img/dificultad.png') +"'><p>"+ rutaObject.dificultad +"</p></div>"
                                + "<div><img src='"+ require('../assets/img/personas.png') +"'><p>"+ rutaObject.max_personas +"</p></div>"
                                + "<div><img src='"+ require('../assets/img/fecha.png') +"'><p>"+ rutaObject.fecha +"</p></div>"
                                + "<div><img src='"+ require('../assets/img/hora.png') +"'><p>"+ rutaObject.hora +"</p></div>"
                            + "</div>"
                            + "<a href='/ruta/"+ rutaObject.id +"'><div class='btn-ver-ruta'>Ver ruta</div></a>";

            return customPopup;
        },
        obtenerRutasMapa:function() {
            axios.post(url, {
                opcion:9,
                fecha: new Date().toJSON().slice(0, 10)
            }).then(response =>{
                if(response.data.length == 0){
                    //console.log("No hay rutas para este usuario");
                } else {
                    for(var i = 0; i < response.data.length; i++){
                        this.rutasMapa.push(response.data[i]);
                    }
                    this.addMarkers();
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/mapa.css';
</style>