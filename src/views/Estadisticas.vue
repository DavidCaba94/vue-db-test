<template>
    <h2>KM Acumulados</h2>
    <p>Estos son tus kilómetros acumulados en rutas de Grupetapp</p>
    <div>
        <apexchart class="grafica-1" :options="this.chartOptions" :series="this.series"></apexchart>
    </div>
    <h2>Tipos de rutas</h2>
    <p>Aquí tienes el tipo de rutas en las que has participado de Grupetapp</p>
    <div>
        <apexchart class="grafica-2" type="pie" :options="this.chartOptions2" :series="this.series2"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
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
                    categories: [1991, 1992, 1993, 1994, 1995]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 30, 49]
                }
            ],
            series2: [25, 15, 45, 15],
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
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        return [name, val.toFixed(1) + '%']
                    }
                },
                legend: {
                    show: false
                }
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
</style>