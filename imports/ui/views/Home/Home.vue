
<template>
  <div>
    <v-card class="mx-auto" max-width="100%">
      <v-row>
          <v-container fluid>
            <v-row align="center">
              <v-col cols="6">
                <v-subheader>
                  <div class="headline">
                    Tablero de solicitudes de suministro
                  </div>
                </v-subheader>
              </v-col>

              <v-col cols="6">
                <div class="d-flex flex-row-reverse mb-5">
                  <v-tooltip select>
                    <template v-slot:activator="{ on }">
                      <v-select
                        v-model="select"
                        :hint="`${select.period}, ${select.abbr}`"
                        :items="items"
                        item-text="period"
                        item-value="abbr"
                        label="Elija el periodo para el tablero"
                        persistent-hint
                        return-object
                        prepend-icon="mdi-calendar-range"
                        single-line
                        @change="periodSelected"
                      ></v-select>
                    </template>
                    <span>Elija el periodo para el tablero</span>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-row>

        <v-row>
        <v-container fluid>
        <v-row dense>
          <v-col cols="6">
            <v-card height="700px">
              <apexchart
                width="100%"
                height="600"
                type="donut"
                :options="optionsDonut"
                :series="seriesDonut"
              ></apexchart>
              <v-card-title>Distribución por tipo</v-card-title>
              <v-card-subtitle
                >Las solicitudes se clasifican por tipo de acuerdo a la linea de
                producción y la estación de trabajo.</v-card-subtitle
              >
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card height="700px">
              <apexchart
                width="100%"
                height="600"
                type="line"
                :options="optionsLine"
                :series="seriesLine"
              ></apexchart>
              <v-card-title>Solicitudes tendencia</v-card-title>
              <v-card-subtitle
                >Las solicitudes muestran una tendencia a lo largo del
                mes.</v-card-subtitle
              >
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card height="700px">
              <apexchart
                width="100%"
                height="600"
                type="bar"
                :options="optionsBar"
                :series="seriesBar"
              ></apexchart>
              <v-card-title>Solicitudes completas contra objetivo</v-card-title>
              <v-card-subtitle
                >Las solicitudes cuentan con una fecha de espectativa de
                suministro</v-card-subtitle
              >
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card height="700px">
              <apexchart
                width="100%"
                height="600"
                type="radialBar"
                :options="optionsRadialBar"
                :series="seriesRadialBar"
              ></apexchart>
              <v-card-title>Solicitudes en Cumplimiento</v-card-title>
              <v-card-subtitle
                >Las solicitudes cuentan con una fecha y horarios de espectativa
                de suministro completo por producto</v-card-subtitle
              >
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
        </v-row>
        </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsRadialBar: {
        labels: ["Cumplimiento"],
      },
      select: { period: "Hoy", abbr: "HY" },
      items: [
        { period: "Hoy", abbr: "HY" },
        { period: "Ultimos 7 dias", abbr: "US" },
        { period: "Ultimos 30 dias", abbr: "UM" },
        { period: "Ultimos 90 dias", abbr: "U3M" },
        { period: "Ultimos 6 meses", abbr: "U6M" },
        { period: "Ultimo año", abbr: "UA" },
        { period: "Ultimos 2 años", abbr: "U2A" },
      ],
      seriesRadialBar: [70],
      optionsDonut: {
        labels: ["Cajas",'Mordaza','Servicio y Suministr area de Laminado y Slitter','Servicio y suministro area de impresion','Suministro Etiquetas','Suministro Materiales','Suministro Servicio','Surtir Material'],
        dataLabels: {
            enabled: true,
            
        },
        plotOptions: {
              pie: {
                donut: {
                  size: '80%',
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      fontSize: "16",
                      color: "Red"
                    },
                    value: {
                      show: true,
                      fontSize: "16",
                      color: "Red"
                    }
                  }
                }
              }
    }
      },
      chartOptions: {
            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
      },
      seriesDonut: [],
      optionsLine: {
        chart: {
          id: "Linea",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        stroke: {
          curve: "smooth",
        },
      },
      seriesLine: [
        {
          name: "Fabricación",
          data: [30, 40, 50, 60, 69],
        },
        {
          name: "Empaque",
          data: [90, 99, 105, 130, 191],
        },
        {
          name: "Distribución",
          data: [70, 75, 80, 85, 91],
        },
        {
          name: "Devolución",
          data: [30, 25, 19, 10, 1],
        },
        {
          name: "Impresión",
          data: [10, 19, 28, 45, 55],
        },
      ],
      optionsBar: {
        chart: {
          id: "Bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
      },
      seriesBar: [
        {
          data: [
            {
              x: "Fabricación",
              y: 30,
              goals: [
                {
                  name: "Esperado",
                  value: 55,
                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "Empaque",
              y: 40,
              goals: [
                {
                  name: "Esperado",
                  value: 52,
                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "Distribución",
              y: 60,
              goals: [
                {
                  name: "Esperado",
                  value: 35,
                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "Devolucion",
              y: 30,
              goals: [
                {
                  name: "Esperado",
                  value: 13,
                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "Impresión",
              y: 70,
              goals: [
                {
                  name: "Esperado",
                  value: 80,
                  strokeColor: "#775DD0",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    console.log("Eleccion:", this.select.abbr);
    this.getToSolicitudDistributed(this.select.abbr)

  },
  methods: {
    periodSelected() {
      console.log("Eleccion:", this.select.abbr);
      this.getToSolicitudDistributed(this.select.abbr)
       //this.getDataDistributionByType();
    },
    getToSolicitudDistributed(period) { 

      Meteor.call(
        "requests.distributed",
        period,
        (error, response) => {
          if (error) {
            this.$alert.showAlertSimple("error", error.reason);
            this.$alert.showAlertSimple("error", error.details);
            console.error("error",error)
          } else {
           // this.$alert.showAlertSimple("success", response.message);
            //{typeSolDescription,total,typeSolAccount,typeSolAccountPercentage})
            //console.info("response", response)
            this.optionsDonut.labels=[]
            this.seriesDonut=[]
            Object.keys(response.data.typeSolDescription).map((key) => {
              //console.log("k", key)
              //console.log("Elemento "+ key,response.data.typeSolDescription[key])
              this.optionsDonut.labels.push(response.data.typeSolDescription[key]);
            });
            Object.keys(response.data.typeSolAccountPercentage).map((key) => {
              //console.log("k", key)
              //console.log("Elemento "+ response.data.typeSolAccountPercentage[key])
             this.seriesDonut.push(response.data.typeSolAccountPercentage[key])
            
            });
        
          //console.log("this.optionsDonut.labels", this.optionsDonut.labels)
           
          }
        } 
      );

    },
    getDataDistributionByType() {
      // traer datos por periodo
      this.optionsDonut.labels = [];
      this.seriesDonut = [];
      var json_data = {
        Fabricacion: 20,
        Empaque: 30,
        Distribucion: 10,
        Devolucion: 15,
        Impresion: 25,
      };
      const arr = Object.keys(json_data).map((key) => {
        this.optionsDonut.labels.push(key);
        this.seriesDonut.push(json_data[key]);
      });
    },
  },
};
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