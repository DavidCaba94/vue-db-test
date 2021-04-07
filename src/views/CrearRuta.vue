<template>
  <div class="contenedor-nueva-ruta">
    <p class="titulo-crear-ruta">Selecciona el punto de inicio de la ruta</p>
    <div id="crearMapId"></div>
    <p class="lat-long-seleccion" v-if="this.latSeleccionada && this.longSeleccionada">
        <strong>Lat:</strong> {{this.latSeleccionada}} <strong>Long:</strong> {{this.longSeleccionada}}
    </p>
    <div class="formulario-ruta">
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="Nombre de la ruta" name="nombreRuta" id='nombreRuta' required />
            <label for="nombreRuta" class="form__label">Nombre de la ruta</label>
        </div>
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="Descripción" name="descripcion" id='descripcion' required />
            <label for="descripcion" class="form__label">Descripción</label>
        </div>
        <div class="form__group field">
            <input type="number" class="form__field" placeholder="Distancia (Kilómetros)" name="distancia" id='distancia' required />
            <label for="distancia" class="form__label">Distancia (Kilómetros)</label>
        </div>
        <!-- Radio buttons dificultad -->
        <!-- Radio buttons tipo -->
        <div class="form__group field">
            <input type="number" class="form__field" placeholder="Máx. Personas" name="maxPersonas" id='maxPersonas' required />
            <label for="maxPersonas" class="form__label">Máx. Personas</label>
        </div>
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="Dirección (ej: Puente Romano)" name="direccion" id='direccion' required />
            <label for="direccion" class="form__label">Dirección (ej: Puente Romano)</label>
        </div>
        <!-- Fecha -->
        <!-- Hora -->
        <div class="form__group field select">
            <select id="provincia" class="select-text" required>
            <option value="" disabled selected></option>
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
            <span class="select-highlight"></span>
            <span class="select-bar"></span>
            <label class="select-label">Provincia</label>
        </div>
        <p class="mensaje-error"></p>
        <div class="btn-guardar" @click="guardarRuta()">Guardar</div>
        <div id="loading-nueva-ruta" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>

import L from 'leaflet';

var newmap;

var inicioRuta = {};

export default {
    name: "Crear Ruta",
    data () {
        return {
            usuario: '',
            latSeleccionada: '',
            longSeleccionada: ''
        }
    },
    mounted() {
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        newmap = L.map('crearMapId').setView([40.41680911937625, -3.703799935080432], 5);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Grupetapp',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZGF2aWRjYWJhOTQiLCJhIjoiY2tuMzVmNHdvMDRsajJ5cXJ3YmZldmo4aSJ9.s-GOpcUEx7q6JPSjyOMPpQ'
        }).addTo(newmap);

        newmap.on('click', this.onMapClick);
    },
    methods: {
        addMarker:function(lat, long) {
            var customMarker = L.icon({
                iconUrl: require('../assets/img/favicon.png'),
                iconSize:     [38, 38],
                iconAnchor:   [19, 38]
            });

            if (inicioRuta != undefined) {
                newmap.removeLayer(inicioRuta);
            }

            inicioRuta = L.marker([lat, long],{icon: customMarker}).addTo(newmap);
        },
        onMapClick:function(e) {
            this.latSeleccionada = e.latlng.lat;
            this.longSeleccionada = e.latlng.lng;
            this.addMarker(e.latlng.lat, e.latlng.lng);
        },
        guardarRuta:function() {
            console.log("Guardar");
        }
    }
}
</script>

<style>
@import '../assets/css/crear-ruta.css';
</style>