<template> 
  <div class="contenedor-registroLogin">
    <div class="box-form">
      <router-link to="/"><img class="logo-form" src="../assets/img/menu-icon-2.png"></router-link>
      <div class="form__group field">
        <input type="input" class="form__field" placeholder="email" name="email" id='email' required />
        <label for="email" class="form__label">Email</label>
      </div>
      <div class="form__group field">
        <input type="password" class="form__field" placeholder="password" name="password" id='password' required />
        <label for="nombre" class="form__label">Contraseña</label>
      </div>
      <p class="mensaje-error"></p>
      <div class="btn" @click="comprobarLogin()">Iniciar Sesión</div>
      <div id="loading-reg" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
  <router-view/>


 <!--
        <div class="mx-auto mt-5" max-width="1200">
        
         Botón CREARç
        <button rounded color="green accent-2" @click="crear()">Crear</button>    
       Tabla y formulario 
        <table class="mt-5">
                <thead>
                    <tr class="light-blue darken-2">
                        <th class="white--text">ID</th>
                        <th class="white--text">DESCRIPCIÓN</th>
                        <th class="white--text">PRECIO</th>
                        <th class="white--text">STOCK</th>
                        <th class="white--text text-center">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="articulo in articulos" :key="articulo.id">
                    <td>{{ articulo.id }}</td>
                    <td>{{ articulo.descripcion }}</td>
                    <td>{{ articulo.precio }}</td>
                    <td>{{ articulo.stock }}</td>
                    <td>
                        <button class="teal accent-4" dark @click="editar(articulo.id)">Editar</button>
                        <button class="error" dark @click="borrar(articulo.id)">Borrar</button>
                    </td>
                    </tr>
                </tbody>
        </table>
        </div>        
-->
</template> 

<script>
// import axios from "axios";
// var url = "http://alcortewear.es/post/rest/grupetapp/crud.php";

export default {
       data () {
        return {            
            // articulos: [],
            // dialog: false,
            // operacion: '',
            
            // articulo:{
            //     id: null,
            //     descripcion:'',
            //     precio:'',
            //     stock:''
            // }          
        }
       },
       created(){       
            //this.mostrar()
       },  
       methods:{
         comprobarLogin:function(){

         }
            // mostrar:function(){
            //   axios.post(url,{opcion:1})
            //   .then(response =>{
            //     this.articulos = response.data;                   
            //   })
            // },
            // crear:function(){
            //     axios.post(url, {opcion:2, descripcion: "prueba 2", precio: 483, stock: 69 })
            //     .then(response =>{
            //       this.mostrar();
            //       console.log(response);
            //     });
            // },  
            // editar:function(id){
            //   axios.post(url, {opcion:3, id: id, descripcion: "descripcion editada", precio: 1000, stock: 999})
            //       .then(response =>{
            //         this.mostrar();
            //         console.log(response);
            //   }); 
            // },             
            // borrar:function(id){
            //   axios.post(url, {opcion:4, id:id}).then(response =>{           
            //       this.mostrar();
            //       console.log(response);
            //     });
            // }
       }
}
</script>

<style>
@import '../assets/css/registro.css';
</style>