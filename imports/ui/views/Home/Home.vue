
<template>
  <div>
  
  <v-card
    class="mx-auto"
    max-width="100%"
  >

  <v-row>
      <v-col>
        <div class="headline">Tablero de solicitudes de suministro</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip select>
            <template v-slot:activator="{on}">
              <v-select
                :items="periodo"
                label="Elija periodo"
                filled
              ></v-select>
            </template>
            <span>Elija el periodo para el tablero</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    

    <v-container fluid>
      <v-row dense>
        <v-col cols="6"
        >
          <v-card height="700px">
            <apexchart width="100%" height="600" type="donut" :options="optionsDonut" :series="seriesDonut"></apexchart>
              <v-card-title>Distribucion por tipo</v-card-title>
              <v-card-subtitle>Las solicitudes se clasifican por tipo de acuerdo a la linea de producción</v-card-subtitle>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6"
        >
          <v-card height="700px">
            <apexchart width="100%" height="600" type="line" :options="optionsLine" :series="seriesLine"></apexchart>
              <v-card-title>Solicitudes tendencia</v-card-title>
              <v-card-subtitle>Las solicitudes muestran una tendencia a lo largo del mes.</v-card-subtitle>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6"
        >
          <v-card height="700px">
            <apexchart width="100%" height="600" type="bar" :options="optionsBar" :series="seriesBar"></apexchart>
              <v-card-title>Solicitudes completas contra objetivo</v-card-title>
              <v-card-subtitle>Las solicitudes cuentan con una fecha de espectativa de suministro</v-card-subtitle>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6"
        >
          <v-card height="700px">
              <apexchart width="100%" height="600" type="radialBar" :options="optionsRadialBar" :series="seriesRadialBar"></apexchart>   
              <v-card-title>Solicitudes en Cumplimiento</v-card-title>
              <v-card-subtitle>Las solicitudes cuentan con una fecha y horarios de espectativa de suministro completo por producto</v-card-subtitle>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</div>

</template>
<script>

  export default {
  
    data () {
      return {
        periodo:['Ultima semana', 'Ultimo mes', 'Ultimos 3 meses', 'Ultimo semestre','Ultimo año','Ultimos 2 años'],
        optionsRadialBar : {
          labels: ['Cumplimiento'],
        },
        seriesRadialBar: [70],
        optionsDonut:{
          labels: ['Fabricación', 'Empaque', 'Distribucion', 'Devolución','Impresión']
        },
        seriesDonut: [44, 55, 41, 17, 15],
        optionsLine: {
          chart: {
            id: 'Linea'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          },
          stroke: {
             curve: 'smooth',
          }
        },
        seriesLine: [
          {
            name: 'Fabricación',
            data: [30, 40, 50, 60, 69]
          },
          {
            name: 'Empaque',
            data: [90, 99, 105, 130, 191]
          },
          {
            name: 'Distribución',
            data: [70, 75, 80, 85, 91]
          },
          {
            name: 'Devolución',
            data: [30, 25, 19, 10, 1]
          },
          {
            name: 'Impresión',
            data: [10, 19, 28, 45, 55]
          }
            ],
        optionsBar: {
          chart: {
            id: 'Bar'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          },
          plotOptions: {
            bar: {
                horizontal: false
            }
          },
        },
        seriesBar: [{
            data: [
              {
                x:'Fabricación',
                y:  30,
                goals: [
                      {
                        name: 'Esperado',
                        value: 55,
                        strokeColor: '#775DD0'
                      }
                ]
              }, {
                x:'Empaque',
                y:  40,
                goals: [
                      {
                        name: 'Esperado',
                        value: 52,
                        strokeColor: '#775DD0'
                      }
                ]
              }, {
                x:'Distribución',
                y:  60,
                goals: [
                      {
                        name: 'Esperado',
                        value: 35,
                        strokeColor: '#775DD0'
                      }
                ]
              }, {
                x:'Devolucion',
                y:  30,
                goals: [
                      {
                        name: 'Esperado',
                        value: 13,
                        strokeColor: '#775DD0'
                      }
                ]
              }, {
                x:'Impresión',
                y:  70,
                goals: [
                      {
                        name: 'Esperado',
                        value: 80,
                        strokeColor: '#775DD0'
                      }
                ]
              }]
              }],
            
        
          
          
        }

    },
    mounted () {
      
      
    },
    methods: {
      
    }
  }
</script>
<style scoped>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

</style>