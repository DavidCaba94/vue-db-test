<template>
    <div class="contenedor-home">
        <div class="cabecera-home">
            <div>
                <img class="icono-cabecera" src="../assets/img/menu-icon-2.png">
            </div>
            <div>
                <router-link to="/login">
                    <div class="login-btn">Entrar</div>
                </router-link>
                <router-link to="/registro">
                    <div class="login-btn">Registro</div>
                </router-link>
            </div>
        </div>
        <div class="fondo-banner-home">
            <div class="banner-home">
                <div>
                    <p class="titulo-banner">Bienvenido a Grupetapp</p>
                    <p class="subtitulo-banner">La red social creada por y para ciclistas</p>
                </div>
            </div>
        </div>
        <p class="titulo-tarjetas">Con Grupetapp puedes</p>
        <div class="tarjetas-descriptivas">
            <div class="tarjeta">
                <div class="img-tarjeta img-1"></div>
                <div class="texto-tarjeta">Apuntarte y asistir a rutas creadas por otros ciclistas o crear las tuyas propias</div>
            </div>
            <div class="tarjeta">
                <div class="img-tarjeta img-2"></div>
                <div class="texto-tarjeta">Conocer gente con tu misma pasión y rodar juntos</div>
            </div>
            <div class="tarjeta">
                <div class="img-tarjeta img-3"></div>
                <div class="texto-tarjeta">Crear tus propias publicaciones y compartir tus experiencias con otros ciclistas</div>
            </div>
            <div class="tarjeta">
                <div class="img-tarjeta img-4"></div>
                <div class="texto-tarjeta">Descubrir nuevas rutas en cada quedada o evento</div>
            </div>
        </div>
        <p class="titulo-tarjetas">Las cifras de Grupetapp</p>
        <div class="cifras">
            <div class="card-cifra">
                <div class="fondo-cifra">
                    {{ this.numUsuarios }}
                </div>
                <div class="texto-cifras">Usuarios</div>
            </div>
            <div class="card-cifra">
                <div class="fondo-cifra">
                    {{ this.numPublicaciones }}
                </div>
                <div class="texto-cifras">Publicaciones</div>
            </div>
            <div class="card-cifra">
                <div class="fondo-cifra">
                    {{ this.numRutas }}
                </div>
                <div class="texto-cifras">Rutas</div>
            </div>
        </div>
        <div class="sorteos">
            <p class="titulo-tarjetas">Sorteos gratuitos</p>
            <p class="texto-info-sorteo">Se publicarán periódicamente <strong>sorteos gratuitos</strong> para todos los usuarios de Grupetapp. Puedes inscribirte en cada sorteo directamente dentro de la aplicación con un simple click, sin hacer ningún tipo de trámite adicional.</p>
        </div>
        <p class="titulo-tarjetas">Contacto</p>
        <div class="contacto">
            <div class="box-contacto">
                <p class="mail-text">Déjanos tus sugerencias en el siguiente formulario</p>
                <input type="text" class="input-filtro" v-model='emailContacto' placeholder="Email de contacto" id="filtro-nombre">
                <textarea id="texto-publicacion" class="texto-publicacion" name="texto-publicacion" maxlength="255" v-model='textoContacto'></textarea>
                <div id="btn-enviar" class="btn-publicar" @click='enviarContacto()'>Enviar</div>
                <p class="mensaje-enviado">Su mensaje ha sido enviado</p>
                <p class="mail-text">También puedes contactar con nosotros enviando un mail a <a href="mailto:contacto@grupetapp.com">contacto@grupetapp.com</a></p>
            </div>
        </div>
        <!--<div class="btn-publicar" @click='enviarEmail()'>Enviar email</div>-->
        <div class="footer">
            <router-link to="/aviso-legal"><div>Aviso legal y condiciones de uso</div></router-link>
            <router-link to="/politica-privacidad"><div>Política de privacidad</div></router-link>
            <router-link to="/cookies"><div>Política de cookies</div></router-link>
        </div>
    </div>
</template>

<script>

import axios from "axios";

var urlUsuarios = "https://davidcaballerocalvo.es/grupetapp/rest/usuario.php";
var urlPublicaciones = "https://davidcaballerocalvo.es/grupetapp/rest/publicacion.php";
var urlRutas = "https://davidcaballerocalvo.es/grupetapp/rest/ruta.php";
var urlContacto = "https://davidcaballerocalvo.es/grupetapp/rest/contacto.php";
var urlEmail = "https://davidcaballerocalvo.es/grupetapp/rest/send_mail_registro.php";

export default {
    data () {
        return {
            numUsuarios: 0,
            numPublicaciones: 0,
            numRutas: 0,
            emailContacto: '',
            textoContacto: ''
        }
    },
    mounted() {
        this.obtenerNumUsuarios();
        this.obtenerNumPublicaciones();
        this.obtenerNumRutas();
    },
    methods: {
        obtenerNumUsuarios:function() {
            axios.post(urlUsuarios, {
                opcion:11
            }).then(response =>{
                this.numUsuarios = response.data[0].numUsers;
            });
        },
        obtenerNumPublicaciones:function() {
            axios.post(urlPublicaciones, {
                opcion:7
            }).then(response =>{
                this.numPublicaciones = response.data[0].numPublicaciones;
            });
        },
        obtenerNumRutas:function() {
            axios.post(urlRutas, {
                opcion:7
            }).then(response =>{
                this.numRutas = response.data[0].numRutas;
            });
        },
        enviarContacto:function() {
            window.$(".mensaje-enviado").css("display", "none");
            if(this.emailContacto != '' && this.textoContacto != ''){
                axios.post(urlContacto, {
                    opcion:1, 
                    email: this.emailContacto,
                    mensaje: this.textoContacto
                }).then(response =>{
                    if(response.status == 200){
                        window.$(".mensaje-enviado").css("display", "block");
                        this.emailContacto = '';
                        this.textoContacto = '';
                    }
                });
            }
        },
        enviarEmail:function() {
            axios.post(urlEmail).then(response =>{
                if(response.status == 200){
                    console.log("Email enviado");
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/home.css';
</style>