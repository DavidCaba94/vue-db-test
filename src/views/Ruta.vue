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
                <div class="btn-inscripcion" @click="inscribirParticipante()">Inscribirme</div>
                <div class="btn-desinscripcion" @click="desinscribirParticipante()">Desinscribirme</div>
            </div>
            <div class="listado-participantes">
                <div v-for="(participante, index) in this.participantes" :key="participante.id">
                    <router-link :to="'/usuario/'+participante.id_usuario">
                        <p class="nombre-participante"><span>{{ index + 1 }}</span> {{ participante.nom_apellidos }}</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="box-comentarios">
            <p class="texto-num-comentarios">Comentarios {{ this.comentarios.length }}</p>
            <textarea id="texto-publicacion" class="texto-publicacion" name="texto-publicacion" maxlength="255" v-model='textoComentario' @keyup='charCount()'></textarea>
            <div class="box-under-text">
                <p class="texto-caracteres">{{ numCaracteres }}/255</p>
                <div class="btn-publicar" @click='publicarComentario()'>Publicar</div>
            </div>
            <div class="lista-comentarios">
                <p id="sin-comentarios" v-if="this.comentarios.length == 0">No hay comentarios en esta ruta.</p>
                <div v-for="(comentario) in this.comentarios" :key="comentario.id">
                    <div class="box-comentario">
                        <router-link :to="'/usuario/'+comentario.id_usuario">
                            <p class="nombre-comentario">{{ comentario.nom_apellidos }}</p>
                        </router-link>
                        <p class="comentario-ruta">{{ comentario.comentario }}</p>
                        <p class="fecha-comentario">{{ $filters.formatDate(comentario.fecha) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import L from 'leaflet';
import axios from "axios";

var urlRuta = "http://alcortewear.es/post/rest/grupetapp/ruta.php";
var urlInscripcion = "http://alcortewear.es/post/rest/grupetapp/inscripciones.php";
var urlComentarios = "http://alcortewear.es/post/rest/grupetapp/comentarios_ruta.php";

var rutamap;

export default {
    name: "Ruta",
    data () {
        return {            
            usuario: '',
            idRuta: '',
            rutaObject: null,
            organizador: null,
            participantes: [],
            numCaracteres: 0,
            textoComentario: '',
            comentarios: []
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
            axios.post(urlRuta, {
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
            axios.post(urlRuta, {
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

            this.comprobarInscripcion();
            this.obtenerComentarios();
        },
        charCount: function() {
            this.numCaracteres = this.textoComentario.length;
        },
        inscribirParticipante:function() {
            axios.post(urlInscripcion, {
                opcion:3,
                id_ruta: this.idRuta,
                id_usuario: this.usuario.id,
                nom_apellidos: this.usuario.nombre +" "+ this.usuario.apellidos
            }).then(response =>{
                if(response.statusText == "OK"){
                    this.comprobarInscripcion();
                } else {
                    this.$router.replace('error');
                }
            });
        },
        desinscribirParticipante:function() {
            axios.post(urlInscripcion, {
                opcion:4, 
                id_ruta: this.idRuta,
                id_usuario: this.usuario.id
            }).then(response =>{
                if(response.statusText == "OK"){
                    this.comprobarInscripcion();
                } else {
                    this.$router.replace('error');
                }
            });
        },
        obtenerParticipantes:function() {
            this.participantes = [];
            axios.post(urlInscripcion, {
                opcion:1,
                id_ruta: this.idRuta
            }).then(response =>{
                if(response.data.length != 0){
                    this.participantes = response.data;
                }
            });
        },
        comprobarInscripcion:function() {
            axios.post(urlInscripcion, {
                opcion:5,
                id_ruta: this.idRuta,
                id_usuario: this.usuario.id
            }).then(response =>{
                if(response.data.length == 0){
                    window.$(".btn-desinscripcion").css("display", "none");
                    window.$(".btn-inscripcion").css("display", "flex");
                } else {
                    window.$(".btn-inscripcion").css("display", "none");
                    window.$(".btn-desinscripcion").css("display", "flex");
                }
            });

            this.obtenerParticipantes();
        },
        obtenerComentarios:function() {
            this.comentarios = [];
            axios.post(urlComentarios, {
                opcion:1,
                id_ruta: this.idRuta
            }).then(response =>{
                if(response.data.length != 0){
                    this.comentarios = response.data;
                }
            });
        },
        publicarComentario:function() {
            axios.post(urlComentarios, {
                opcion:3,
                id_ruta: this.idRuta,
                id_usuario: this.usuario.id,
                nom_apellidos: this.usuario.nombre +" "+ this.usuario.apellidos,
                comentario: this.textoComentario,
                fecha: new Date().toJSON().slice(0, 10)
            }).then(response =>{
                if(response.statusText == "OK"){
                    this.textoComentario = '';
                    this.obtenerComentarios();
                } else {
                    this.$router.replace('error');
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/ruta.css';
</style>