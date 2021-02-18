<template>
<v-app>
      <v-main>      
        <v-card class="mx-auto mt-5" max-width="1200">
        
        <!-- Botón CREAR -->
        <v-btn rounded color="green accent-2" @click="crear()">Crear</v-btn>    

        <!-- Tabla y formulario -->
        <v-simple-table class="mt-5">
            <template v-slot:default>
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
                        <v-btn class="teal accent-4" dark @click="editar(articulo.id)">Editar</v-btn>
                        <v-btn class="error" dark @click="borrar(articulo.id)">Borrar</v-btn>
                    </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        </v-card>        

      <!-- Componente de Diálogo para CREAR y EDITAR -->
      

      </v-main>
    </v-app>
</template>

<script>
import axios from "axios";
var url = "http://alcortewear.es/post/rest/grupetapp/crud.php";

export default {
       data () {
        return {            
            articulos: [],
            dialog: false,
            operacion: '',
            
            articulo:{
                id: null,
                descripcion:'',
                precio:'',
                stock:''
            }          
        }
       },
       created(){       
            this.mostrar()
       },  
       methods:{
            mostrar:function(){
              axios.post(url,{opcion:1})
              .then(response =>{
                this.articulos = response.data;                   
              })
            },
            crear:function(){
                axios.post(url, {opcion:2, descripcion: "prueba 2", precio: 483, stock: 69 })
                .then(response =>{
                  this.mostrar();
                  console.log(response);
                });
            },  
            editar:function(id){
              axios.post(url, {opcion:3, id: id, descripcion: "descripcion editada", precio: 1000, stock: 999})
                  .then(response =>{
                    this.mostrar();
                    console.log(response);
              }); 
            },             
            borrar:function(id){
              axios.post(url, {opcion:4, id:id}).then(response =>{           
                  this.mostrar();
                  console.log(response);
                });
            }
       }
}
</script>

<style>

</style>