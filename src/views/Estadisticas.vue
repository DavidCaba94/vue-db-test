<template>
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
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

var url = "http://alcortewear.es/post/rest/grupetapp/ruta.php";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data:function() {
        return {
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
            series2: [20,30,20,30],
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
        if(localStorage.usuario) this.usuario = JSON.parse(localStorage.usuario);
        this.obtenerEstadisticas();
    },
    methods: {
        obtenerEstadisticas:function() {
            axios.post(url, {
                opcion:14,
                id_usuario: this.usuario.id,
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
.grafica-1 {
    max-width: 800px;
    margin: 0 auto;
}

.grafica-2 {
    max-width: 500px;
    margin: 0 auto;
}

.km-totales {
    max-width: 200px;
    margin: 0 auto;
    font-weight: 700;
    background-color: #cc54544d;
}
</style>