<template>
  <div class="contenedor-social">
      <div class="box-tabs">
          <div id="tab-publicaciones" class="tab-item tab-activa" @click="clickTab(1)">PUBLICACIONES</div>
          <div id="tab-seguidores" class="tab-item" @click="clickTab(2)">SEGUIDORES</div>
          <div id="tab-seguidos" class="tab-item" @click="clickTab(3)">SEGUIDOS</div>
      </div>
      <div class="contenido-tabs">
          <div class="contenido-publicaciones">
              <Publicaciones></Publicaciones>
          </div>
          <div class="contenido-seguidores">
              <Seguidores></Seguidores>
          </div>
          <div class="contenido-seguidos">
              <Seguidos></Seguidos>
          </div>
      </div>
  </div>
</template>

<script>

import Publicaciones from '../components/Publicaciones.vue'
import Seguidores from '../components/Seguidores.vue'
import Seguidos from '../components/Seguidos.vue'

export default {
    data () {
        return {            
                    
        }
    }, 
    created(){       

    },
    methods:{
        limpiarTabs:function(){
            window.$("#tab-publicaciones").removeClass("tab-activa");
            window.$("#tab-seguidores").removeClass("tab-activa");
            window.$("#tab-seguidos").removeClass("tab-activa");
            window.$(".contenido-publicaciones").css("display", "none");
            window.$(".contenido-seguidores").css("display", "none");
            window.$(".contenido-seguidos").css("display", "none");
        },
        clickTab:function(numTab){
            this.limpiarTabs();
            if(numTab == 1) {
                window.$("#tab-publicaciones").addClass("tab-activa");
                window.$(".contenido-publicaciones").css("display", "block");
            } else if(numTab == 2) {
                window.$("#tab-seguidores").addClass("tab-activa");
                window.$(".contenido-seguidores").css("display", "block");
            } else if(numTab == 3) {
                window.$("#tab-seguidos").addClass("tab-activa");
                window.$(".contenido-seguidos").css("display", "block");
            }
        }
    },
    components: {
        Publicaciones,
        Seguidores,
        Seguidos
    }
}
</script>

<style>
@import '../assets/css/social.css';
</style>