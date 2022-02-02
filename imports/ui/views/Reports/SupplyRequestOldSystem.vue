<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">Reporte de solicitudes de suministros</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-can:create.hide="'users'"
                color="blue"
                v-on="on"
                fab
                dark
                type="submit"
                form="filterQueryForm"
              >
                <v-icon>search</v-icon>
              </v-btn>
            </template>
            <span>Buscar...</span>
          </v-tooltip>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-can:create.hide="'users'"
                color="blue"
                v-on="on"
                fab
                dark
                :to="{ name: 'home.unitsofmeasurement.create' }"
              >
                <v-icon>launch</v-icon>
              </v-btn>
            </template>
            <span>Exportar reporte</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form
          @submit.prevent="getToSolicitud"
          id="filterQueryForm"
          autocomplete="off"
        >
          <v-container>
            <v-row>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Fecha inicial"
                      hint="formato dd-mm-aaaa"
                      readonly
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    locale="es-es"
                    show-current
                    show-adjacent-months
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
                <!-- p>
                  Date in ISO format: <strong>{{ date }}</strong>
                </p -->
              </v-col>

              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateEndFormatted"
                      label="Fecha final"
                      hint="Formato dd-mm-aaaa"
                      readonly
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateEnd"
                    locale="es-es"
                    no-title
                    show-current
                    show-adjacent-months
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                <!-- p>
                  Date in ISO format: <strong>{{ dateEnd }}</strong>
                </p -->
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        <v-data-table
          :headers="headers"
          :items="tosolicitudes"
          sort-by="IdSolicitud"
          class="elevation-1"
        >
          <template v-slot:body.append="{ isMobile }">
            <tr v-if="!isMobile">
              <td>
                <v-text-field
                  v-model="headersFilter.IdSolicitud"
                  type="text"
                  label="Solicitud Num"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.IdMaquina"
                  type="text"
                  label="Num Maq"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.IdUsuario"
                  type="text"
                  label="Id Usuario"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.IdCaja"
                  type="text"
                  label="Id Caja"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.CantidadCaja"
                  type="text"
                  label="Cantidad Caja"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.CantidadTapa"
                  type="text"
                  label="Cantidad Tapa"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.FechaSolicitud"
                  type="text"
                  label="Fecha Solicitud"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.FechaDespachoTotal"
                  type="text"
                  label="Fecha Despacho Total"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.FechaDespachoParcial"
                  type="text"
                  label="Fecha Despacho Parcial"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.FechaEspectativaDespacho"
                  type="text"
                  label="Fecha Espectativa Despacho"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.EstatusSolicitud"
                  type="text"
                  label="Estatus Solicitud"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.SurtirEnDucto"
                  type="text"
                  label="Surtir En Ducto"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.GrupoOperador"
                  type="text"
                  label="Grupo Operador"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.numordprod"
                  type="text"
                  label="Num Orden Prod"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.TipoSol"
                  type="text"
                  label="Tipo Solicitud"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.Medida"
                  type="text"
                  label="Medida"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.Resistencia"
                  type="text"
                  label="Resistencia"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.Borde"
                  type="text"
                  label="Borde"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.Suministro"
                  type="text"
                  label="Suministro"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.SumTipo"
                  type="text"
                  label="Tipo Suministro"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.Actividad"
                  type="text"
                  label="Actividad"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.FechaPreSolicitud"
                  type="text"
                  label="Fecha Presolicitud"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.UPDATE_TS"
                  type="text"
                  label="Actulizado"
                ></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SupplyRequestOldSystem",
  components: {},
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
      .toISOString().substr(0, 10),
      dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
      .toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
      .toISOString().substr(0, 10)),
      dateEndFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
      .toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      tosolicitudes: [],
      headersFilter: {
        IdSolicitud: "",
        IdMaquina: "",
        IdUsuario: "",
        IdCaja: "",
        CantidadCaja: "",
        CantidadTapa: "",
        FechaSolicitud: "",
        FechaDespachoTotal: "",
        FechaDespachoParcial: "",
        FechaEspectativaDespacho: "",
        EstatusSolicitud: "",
        SurtirEnDucto: "",
        GrupoOperador: "",
        numordprod: "",
        TipoSol: "",
        Medida: "",
        Resistencia: "",
        Borde: "",
        Suministro: "",
        SumTipo: "",
        Actividad: "",
        FechaPreSolicitud: "",
        UPDATE_TS: "",
        _id: "",
      },
    };
  },
  created() {
    
  },
  watch: {
    date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    dateEnd(val) {
        this.dateEndFormatted = this.formatDate(this.dateEnd)
      },
  },
  methods: {
    getToSolicitud() {
      this.$loader.activate("Buscando solicitudes de suministro... ...");
      console.log("this.date", this.date)
      console.log("this.dateEnd", this.dateEnd)
      Meteor.call(
        "toSolicitud.list",
        { dateQuery:{dateStart: this.date, dateEnd: this.dateEnd} },
        (error, response) => {
          this.$loader.deactivate();
          if (error) {
            this.$alert.showAlertSimple("error", error.error);
          } else {
            this.$alert.showAlertSimple("success", response.message);
            this.tosolicitudes = response.data;
          }
          console.log("response.data", response.data);
        }
      );
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    }
  },
  computed: {
    
    headers() {
      return [
        {
          value: "IdSolicitud",
          text: "Num Solicitud",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.IdSolicitud.toLocaleLowerCase()) !==
                -1
            );
          },
        },
        {
          value: "IdMaquina",
          text: "Id Maquina",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.IdMaquina.toLocaleLowerCase()) !==
                -1
            );
          },
        },
        {
          value: "IdUsuario",
          text: "Id Usuario",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.IdUsuario.toLocaleLowerCase()) !==
                -1
            );
          },
        },
        {
          value: "IdCaja",
          text: "Id Caja",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.IdCaja.toLocaleLowerCase()) !== -1
            );
          },
        },
        {
          value: "CantidadCaja",
          text: "Cantidad Caja",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.CantidadCaja.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "CantidadTapa",
          text: "Cantidad Tapa",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.CantidadTapa.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "FechaSolicitud",
          text: "Fecha Solicitud",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.FechaSolicitud.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "FechaDespachoTotal",
          text: "Fecha Despacho Total",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.FechaDespachoTotal.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "FechaDespachoParcial",
          text: "Fecha Despacho Parcial",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.FechaDespachoParcial.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "FechaEspectativaDespacho",
          text: "Fecha Espectativa Despacho",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.FechaEspectativaDespacho.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "EstatusSolicitud",
          text: "Estatus Solicitud",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.EstatusSolicitud.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "SurtirEnDucto",
          text: "Surtir En Ducto",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.SurtirEnDucto.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "GrupoOperador",
          text: "Grupo Operador",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.GrupoOperador.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "numordprod",
          text: "Num Orden Prod",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.numordprod.toLocaleLowerCase()) !==
                -1
            );
          },
        },
        {
          value: "TipoSol",
          text: "Tipo Sol",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "number" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.TipoSol.toLocaleLowerCase()) !== -1
            );
          },
        },
        {
          value: "Medida",
          text: "Medida",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.Medida.toLocaleLowerCase()) !== -1
            );
          },
        },
        {
          value: "Resistencia",
          text: "Resistencia",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.Resistencia.toLocaleLowerCase()) !==
                -1
            );
          },
        },
        {
          value: "Borde",
          text: "Borde",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.Borde.toLocaleLowerCase()) !== -1
            );
          },
        },
        {
          value: "Suministro",
          text: "Suministro",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.Suministro.toLocaleLowerCase()) !==
                -1
            );
          },
        },
        {
          value: "SumTipo",
          text: "Tipo Suministro",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.SumTipo.toLocaleLowerCase()) !== -1
            );
          },
        },
        {
          value: "Actividad",
          text: "Actividad",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.Actividad.toLocaleLowerCase()) !==
                -1
            );
          },
        },
        {
          value: "FechaPreSolicitud",
          text: "Fecha PreSolicitud",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(
                  this.headersFilter.FechaPreSolicitud.toLocaleLowerCase()
                ) !== -1
            );
          },
        },
        {
          value: "UPDATE_TS",
          text: "Actualizado",
          sortable: true,
          filter: (value) => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.UPDATE_TS.toLocaleLowerCase()) !==
                -1
            );
          },
        },
      ];
    },
  },
  meteor: {},
};
</script>

<style scoped>
</style>