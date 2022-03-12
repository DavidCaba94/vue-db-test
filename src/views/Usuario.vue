<template>
  <div class="contenedor-user">
      <div class="card-user" v-if="this.renderUser">
          <div class="num-user">#{{ this.renderUser.id }}</div>
          <div class="box-data">
              <div id="img-user-render" class="img-user-render"></div>
              <div class="datos-user">
                  <p class="nombre-user">{{ this.renderUser.nombre }} {{ this.renderUser.apellidos }}</p>
                  <div class="provincia-user"><img class="marker-ciudad" src="../assets/img/marker.png">{{ this.renderUser.provincia }}</div>
                  <p class="fecha-user">Usuario desde: {{ $filters.formatDate(this.renderUser.fecha_registro) }}</p>
              </div>
              <div id="btn-seguir" class="btn-seguir seguir-desactivado" v-if="mostrarDelete">Seguir</div>
              <div id="btn-seguir" class="btn-seguir" @click="this.seguirUsuario()" v-if="!mostrarDelete">Seguir</div>
          </div>
      </div>
      <div class="box-rutas-user">
          <p class="titulo-seccion">Rutas creadas: {{ this.rutasCreadas }}</p>
      </div>
      <div class="box-rutas-user">
          <p class="titulo-seccion">Participación en rutas: {{ this.rutasParticipadas }}</p>
      </div>
      <h2>KM acumulados</h2>
      <p>Estos son tus kilómetros acumulados en rutas de Grupetapp</p>
      <p class="km-totales">KM totales: {{ this.kmTotales }}</p>
      <div id="chart-timeline">
          <apexchart class="grafica-1" ref="chartKM" :options="this.chartOptions" :series="this.series"></apexchart>
      </div>
      <h2>Tipos de rutas</h2>
      <p>Aquí tienes el tipo de rutas en las que has participado de Grupetapp</p>
      <div>
          <apexchart class="grafica-2" type="pie" :options="this.chartOptions2" :series="this.series2"></apexchart>
      </div>
      <div class="box-rutas-user">
          <p class="titulo-seccion">Publicaciones: {{ this.publicaciones.length }}</p>
          <div v-for="(objetoLista) in this.publicaciones" :key="objetoLista.id">
            <div class="item-publicacion">
            <div class="box-img-pub">
                <div class="box-nombre-foto">
                    <div class="img-fake"></div>
                    <div class="nombre-fecha" v-if="this.renderUser">
                        <p>{{ this.renderUser.nombre }} {{ this.renderUser.apellidos }}</p>
                    </div>
                </div>
                <div v-if="mostrarDelete" class="btn-borrar-publicacion" @click="eliminarPublicacion(objetoLista.id)"></div>
            </div>
            <div class="box-textos-pub">
                <div class="texto-pub">
                {{ objetoLista.texto }}
                </div>
            </div>
            <div class="box-likes">
                <p class="fecha-text">{{ $filters.formatDate(objetoLista.fecha_pub) }}</p>
                <div class="like-btn" @click='addLike(objetoLista.id)'>
                <img class="boton-like" src="../assets/img/clap.png" alt="Botón Like">
                <p>{{ objetoLista.likes }}</p>
                </div>
            </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

var urlUsuarios = "https://tarotgratisonline.com/rest/grupetapp/usuario.php";
var urlSeguidos = "https://tarotgratisonline.com/rest/grupetapp/seguidos.php";
var urlPublicaciones = "https://tarotgratisonline.com/rest/grupetapp/publicacion.php";
var urlNotificaciones = "https://tarotgratisonline.com/rest/grupetapp/notificaciones.php";
var urlRutas = "https://tarotgratisonline.com/rest/grupetapp/ruta.php";
var urlInscripciones = "https://tarotgratisonline.com/rest/grupetapp/inscripciones.php";

export default {
    name: "Usuario",
    components: {
        apexchart: VueApexCharts,
    },
    data () {
        return {            
            idUsuario: '',
            usuario: '',
            renderUser: '',
            siguiendo: false,
            rutasCreadas: 0,
            rutasParticipadas: 0,
            publicaciones: [],
            mostrarDelete: false,
            chartOptions: {
                chart: {
                    id: "basic-bar",
                    height: 350,
                    type: 'area',
                    animations: {
                        speed: 500
                    },
                },
                colors:['#CC5454'],
                dataLabels: {
                    enabled: false
                },
                fill: {
                    colors: ['#CC5454']
                },
                markers: {
                    colors: ['#CC5454']
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: []
                },
                noData: {
                    text: "No hay datos disponibles",
                    align: 'center',
                    verticalAlign: 'middle',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '14px',
                        fontFamily: undefined
                    }
                }
            },
            series: [
                {
                    name: "KM",
                    data: []
                }
            ],
            series2: [],
            chartOptions2: {
                chart: {
                    width: '100%',
                    type: 'pie'
                },
                labels: ["MTB", "Carretera", "Gravel", "Descenso"],
                fill: {
                    colors: ['#CC5454', '#c75a5a', '#da7171', '#e27f7f']
                },
                theme: {
                    monochrome: {
                        enabled: true
                    },
                    colors:['#CC5454']
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            offset: -5
                        }
                    }
                },
                noData: {
                    text: "No hay datos disponibles",
                    align: 'center',
                    verticalAlign: 'middle',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '14px',
                        fontFamily: undefined
                    }
                },
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        return [name, val.toFixed(1) + '%']
                    }
                },
                legend: {
                    show: false
                }
            },
            rutasEstadisticas: [],
            fechasRutas: [],
            kmRutas: [],
            tiposRutas: [],
            porcentajesRutas: [],
            kmTotales: 0
        }
    },
    mounted() {
        this.idUsuario = this.$route.params.id;
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.mostrarDatosUsuario(this.idUsuario);
        this.obtenerEstadisticas();
        this.obtenerPublicaciones();
    },
    updated() {
        this.addFotoUser();
    },
    methods: {
        mostrarDatosUsuario:function(id_usuario) {
            if(this.usuario.id == id_usuario){
                this.mostrarDelete = true;
            }
            axios.post(urlUsuarios, {
                opcion:10,
                id: id_usuario
            }).then(response =>{
                if(response.status != 200){
                    this.$router.replace('/error');
                } else {
                    this.renderUser = response.data[0];
                    this.addFotoUser();
                    this.actualizarBtnSeguir();
                    this.obtenerNumRutasPropias();
                    this.obtenerNumRutasParticipadas();
                }
            });
        },
        addFotoUser:function() {
            if(this.renderUser.foto != null){
                window.$("#img-user-render").css("background-image", "url("+ this.renderUser.foto +")");
                window.$(".contenedor-user .img-fake").css("background-image", "url("+ this.renderUser.foto +")");
            } else {
                window.$("#img-user-render").css("background-image", "'url(../assets/img/user-default.png)'");
                window.$(".contenedor-user .img-fake").css("background-image", "'url(../assets/img/user-default.png)'");
            }
        },
        actualizarBtnSeguir:function() {
            axios.post(urlSeguidos, {
                opcion:2,
                id: this.usuario.id,
                id_seguido: this.idUsuario
            }).then(response =>{
                if(response.data.length == 0){
                    this.siguiendo = false;
                    window.$("#btn-seguir").html("Seguir");
                    window.$("#btn-seguir").css("color", "#ff6e6e");
                } else {
                    this.siguiendo = true;
                    window.$("#btn-seguir").html("Dejar de seguir");
                    window.$("#btn-seguir").css("color", "#525252");
                }
            });
        },
        seguirUsuario:function() {
            if(this.siguiendo){
                axios.post(urlSeguidos, {
                    opcion:5, 
                    id: this.usuario.id,
                    id_seguido: this.idUsuario
                }).then(response =>{
                    if(response.status == 200){
                        this.replicarUnfollow();
                    } else {
                        this.$router.replace('/error');
                    }
                });
            } else if(!this.siguiendo) {
                axios.post(urlSeguidos, {
                    opcion:3, 
                    id: this.usuario.id,
                    id_seguido: this.idUsuario
                }).then(response =>{
                    if(response.status == 200){
                        this.replicarFollow();
                    } else {
                        this.$router.replace('/error');
                    }
                });
            }
        },
        replicarFollow:function() {
            axios.post(urlSeguidos, {
                opcion:4, 
                id: this.usuario.id,
                id_seguido: this.idUsuario
            }).then(response =>{
                if(response.status == 200){
                    this.actualizarBtnSeguir();
                    this.enviarNotificacion();
                } else {
                    this.$router.replace('/error');
                }
            });
        },
        replicarUnfollow:function() {
            axios.post(urlSeguidos, {
                opcion:6, 
                id: this.usuario.id,
                id_seguido: this.idUsuario
            }).then(response =>{
                if(response.status == 200){
                    this.actualizarBtnSeguir();
                } else {
                    this.$router.replace('/error');
                }
            });
        },
        obtenerPublicaciones:function() {
            axios.post(urlPublicaciones, {
                opcion:5,
                id_usuario: this.idUsuario
            }).then(response =>{
                if(response.data.length != 0){
                    this.publicaciones = response.data;
                }
            });
        },
        addLike:function(id){
            axios.post(urlPublicaciones, {
                opcion:4, 
                id: id
            }).then(response =>{
                if(response.status == 200){
                    for(var i = 0; i < this.publicaciones.length; i++){
                        if(this.publicaciones[i].id == id){
                            this.publicaciones[i].likes++;
                        }
                    }
                }
            });
        },
        enviarNotificacion:function() {
            var nombreUsuarioCompleto = this.usuario.nombre +' '+ this.usuario.apellidos;
            axios.post(urlNotificaciones, {
                opcion:2, 
                id_usuario: this.renderUser.id,
                tipo_notificacion: 'seguimiento',
                texto_notificacion: '<strong>'+ nombreUsuarioCompleto +'</strong> te ha seguido'
            }).then(response =>{
                if(response.status != 200){
                    this.$router.replace('/error');
                }
            });
        },
        eliminarPublicacion:function(id_publicacion) {
            axios.post(urlPublicaciones, {
                opcion:3, 
                id: id_publicacion,
            }).then(response =>{
                if(response.status == 200){
                    this.obtenerPublicaciones();
                } else {
                    this.$router.replace('/error');
                }
            });
        },
        obtenerNumRutasPropias:function() {
            axios.post(urlRutas, {
                opcion:8,
                id_usuario: this.idUsuario
            }).then(response =>{
                this.rutasCreadas = response.data[0].numRutas;
            });
        },
        obtenerNumRutasParticipadas:function() {
            axios.post(urlInscripciones, {
                opcion:6,
                id_usuario: this.idUsuario
            }).then(response =>{
                this.rutasParticipadas = response.data[0].participaciones;
            });
        },
        obtenerEstadisticas:function() {
            axios.post(urlRutas, {
                opcion:14,
                id_usuario: this.idUsuario,
                fecha: new Date().toJSON().slice(0, 10)
            }).then(response =>{
                if(response.data.length != 0){
                    for(var i = 0; i < response.data.length; i++){
                        this.rutasEstadisticas.push(response.data[i]);
                    }
                    this.insertarDatos();
                }
            });
        },
        insertarDatos:function() {
            for(var i = 0; i < this.rutasEstadisticas.length; i++){
                this.fechasRutas[i] = this.rutasEstadisticas[i].fecha;
                this.chartOptions.xaxis.categories.push(this.rutasEstadisticas[i].fecha);
                this.kmRutas[i] = parseInt(this.rutasEstadisticas[i].distancia, 10);
                this.series[0].data.push(parseInt(this.rutasEstadisticas[i].distancia, 10));
                this.tiposRutas[i] = this.rutasEstadisticas[i].tipo;
            }
            this.calcularKmTotales();
            this.calcularPorcentajes();
        },
        calcularKmTotales:function() {
            var suma = 0;
            for(var i = 0; i < this.kmRutas.length; i++){
                suma += this.kmRutas[i];
            }
            this.kmTotales = suma;
        },
        calcularPorcentajes:function() {
            var mtb = 0;
            var carretera = 0;
            var gravel = 0;
            var descenso = 0;
            var suma = 0;
            for(var i = 0; i < this.tiposRutas.length; i++){
                if(this.tiposRutas[i] == "MTB"){
                    mtb++;
                } else if(this.tiposRutas[i] == "Carretera"){
                    carretera++;
                } else if(this.tiposRutas[i] == "Descenso"){
                    descenso++;
                } else if(this.tiposRutas[i] == "Gravel"){
                    gravel++;
                }
                suma++;
            }
            if(suma != 0) {
                this.porcentajesRutas[0] = (mtb / suma) * 100;
                this.porcentajesRutas[1] = (carretera / suma) * 100;
                this.porcentajesRutas[2] = (gravel / suma) * 100;
                this.porcentajesRutas[3] = (descenso / suma) * 100;
                
                this.series2[0] = this.porcentajesRutas[0];
                this.series2[1] = this.porcentajesRutas[1];
                this.series2[2] = this.porcentajesRutas[2];
                this.series2[3] = this.porcentajesRutas[3];
            }
        }
    }
}
</script>

<style>
@import '../assets/css/user.css';
</style>