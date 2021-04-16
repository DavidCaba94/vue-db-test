<template>
    <div class="contenedor-ruta">
        <p class="nombre-ruta" v-if="this.rutaObject">{{ this.rutaObject.nombre }}</p>
        <div id="rutaMapId"></div>
        <p class="titulo-info">Descripción</p>
        <p v-if="this.rutaObject">{{ this.rutaObject.descripcion }}</p>
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
        <p class="titulo-info">Detalle de la dirección</p>
        <p v-if="this.rutaObject">{{ this.rutaObject.direccion }}</p>
        <div class="box-organizador" v-if="this.rutaObject">
            <p>Organizador</p>
            <router-link :to="'/usuario/'+this.rutaObject.id_usuario">
                <div class="img-organizador"></div>
                <p class="nombre-organizador" v-if="this.organizador">{{ this.organizador.nombre }} {{ this.organizador.apellidos }}</p>
            </router-link>
        </div>
        <div class="box-participantes">
            <div class="cabecera-participantes">
                <p class="texto-num-participantes" v-if="this.rutaObject">Participantes {{ this.participantes.length }}/{{ this.rutaObject.max_personas }}</p>
                <div class="btn-inscripcion">Inscribirme</div>
            </div>
            <div class="listado-participantes">
                <router-link :to="'/usuario/1'">
                    <p class="nombre-participante"><span>1</span> David Caballero Calvo</p>
                </router-link>
                <router-link :to="'/usuario/1'">
                    <p class="nombre-participante"><span>2</span> David Caballero Calvo</p>
                </router-link>
                <router-link :to="'/usuario/1'">
                    <p class="nombre-participante"><span>3</span> David Caballero Calvo</p>
                </router-link>
            </div>
        </div>
        <div class="box-comentarios">
            <p class="texto-num-comentarios">Comentarios 0</p>
            <textarea id="input-comentario" cols="30" rows="10"></textarea>
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
            rutaObject: null,
            organizador: null,
            participantes: []
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

            this.obtenerDatosOrganizador();
        },
        obtenerDatosOrganizador:function() {
            axios.post(url, {
                opcion:11,
                id: this.idRuta
            }).then(response =>{
                if(response.data.length == 0){
                    this.$router.replace('error');
                } else {
                    this.organizador = response.data[0];
                    if(this.organizador.foto != null){
                        window.$(".img-organizador").css("background-image", "url("+ this.organizador.foto +")");
                    }
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/ruta.css';
</style>