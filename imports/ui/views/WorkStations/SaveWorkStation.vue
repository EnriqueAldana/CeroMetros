<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{ dataView.title }}</div>
      </v-col>
      <v-col cols="2">
        <v-btn
          block
          type="submit"
          form="saveWorkStation"
          color="primary"
          v-text="dataView.targetButton"
        >
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form
              @submit.prevent="saveWorkStation"
              id="saveWorkStation"
              autocomplete="off"
            >
              <v-row>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field
                    v-model="workstation.name"
                    id="inputName"
                    :rules="[rules.required]"
                    name="name"
                    label="Nombre"
                    
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="workstation.name_full"
                    id="inputNameFull"
                    :rules="[rules.required]"
                    name="name_full"
                    label="Nombre completo"
                    
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="workstation.location"
                    id="inputLocation"
                    :rules="[rules.required]"
                    type="text"
                    name="location"
                    label="Ubicacion"
                  >
                  </v-text-field>
                  
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card>
                    <v-card-title>Configuraciones para ésta estación de trabajo</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="searchSelfConfiguration"
                        placeholder="Buscar. . ."
                        id="inputSearchSelfConfiguration"
                        name="configurationName"
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-sheet
                      id="scrolling-techniques-2"
                      class="overflow-y-auto"
                      max-height="500"
                    >
                      <v-list style="height: 400px">
                        <v-list-item-group>
                          <draggable
                            :list="filteredSelfConfigurations"
                            @change="
                              (ev) => onChangeDragList(ev, 'selfConfiguration')
                            "
                            group="configurations"
                          >
                            <v-list-item
                              v-for="configuration in filteredSelfConfigurations"
                              v-text="configuration.name"
                              :key="configuration._id"
                            >
                            </v-list-item>
                          </draggable>
                        </v-list-item-group>
                      </v-list>
                    </v-sheet>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-card-title>Todos las configuraciones</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="searchConfiguration"
                        placeholder="Buscar. . ."
                        id="inputSearchConfiguration"
                        name="configurationName2"
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-sheet
                      id="scrolling-techniques-3"
                      class="overflow-y-auto"
                      max-height="500"
                    >
                      <v-list style="height: 400px">
                        <v-list-item-group>
                          <draggable
                            :list="filteredConfigurations"
                            @change="
                              (ev) => onChangeDragList(ev, 'allConfigurations')
                            "
                            group="configurations"
                          >
                            <v-list-item
                              v-for="configuration in filteredConfigurations"
                              v-text="configuration.name"
                              :key="configuration._id"
                            >
                            </v-list-item>
                          </draggable>
                        </v-list-item-group>
                      </v-list>
                    </v-sheet>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ProductionLineRepository } from "../../../api/ProductionLines/ProductionLine";
import draggable from 'vuedraggable';
export default {

  name: "SaveWorkStation",
  components: {
    draggable
  },
  data() {
    return {
      workstation: {
        _id: null,
        name: null,
        name_full: null,
        location: null,
        productionline: {
          _id: null,
          name: null,
          description: null,
        },
        configurations: []
      },
      dataView: {
        title: "",
        targetButton: "",
      },
      searchSelfConfiguration: '',
      searchConfiguration: '',
      selfConfiguration: [],
      allConfiguration: [],
      rules: {
        required: (value) => !!value || "Requerido.",
        greatZero: (value) => value > 0 || "Inserte valor mayor a cero",
        greatEqualZero:(value)=> value >= 0 || "Inserte valor igual o mayor a cero",
        counter: (value) => value.length <= 20 || "Max 20 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Correo Electrónico incorrecto.";
        },
        number: (value) => {
          const pattern = /^[+-]?\d+([,.]\d+)?$/;
          return (
            pattern.test(value) ||
            "Numero con formato equivocado, debe ser un real Ejemplo: -123.35 o 7,4 o 8"
          );
        },
        max25chars: (v) => v.length <= 25 || "Entrada de datos muy grande!",
      },
    };
  },
  created() {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear Estacion de trabajo";
      this.dataView.targetButton = "Crear";
      this.listAllConfigurations();
      
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar Estacion de trabajo";
      this.dataView.targetButton = "Actualizar";
      const tempWorkstation = this.$store.state.temporal.element;
      this.workstation = {
        _id: tempWorkstation._id,
        name: tempWorkstation.name,
        name_full: tempWorkstation.name_full,
        location: tempWorkstation.location,
        productionline: tempWorkstation.productionline,
        configurations: tempWorkstation.configurations,
      };
      this.initConfigurations(this.workstation._id);
    }
  },
  computed: {
    filteredSelfConfigurations(){
      return this.selfConfiguration.filter(configuration=>{
        return configuration.name.toLowerCase().includes(this.searchSelfConfiguration.toLowerCase());
      })
    },
    filteredConfigurations(){
      return this.allConfiguration.filter(configuration=>{
        return configuration.name.toLowerCase().includes(this.searchConfiguration.toLowerCase());
      });
    },
  },
  methods: {
    onChangeDragList(event , propData) {
      if(event.hasOwnProperty('removed')){
        this[propData] = this[propData].filter(configuration => configuration._id != event.removed.element._id);
      }else if(event.hasOwnProperty('added')){
        this[propData].splice(event.added.newIndex,0, event.added.element);
      }
    },
    saveWorkStation() {
      this.$loader.activate("Guardando estacion de trabajo...");
      this.workstation.configurations=this.selfConfiguration
      Meteor.call("workstation.save", this.workstation, (error, response) => {
        this.$loader.deactivate();
        if (error) {
          this.$alert.showAlertSimple("error", error.reason);
        } else {
          this.$alert.showAlertSimple("success", response.message);
          this.$router.push({ name: "home.workstations" });
        }
      });
    },
    listAllConfigurations(){
      Meteor.call('workstation.configurations.list',(error,response)=>{
          if (error){
            this.$alert.showAlertSimple('error',error.reason,response);
          } else { 
            this.allConfiguration=response.data;
          }
      });
    },
    configurationsByWS(iDWorkStation){
      Meteor.call('workstation.configurations.byWS',{iDWorkStation},(error,response)=>{
          if (error){
            this.$alert.showAlertSimple('error',error.reason,response);
          } else { 
            this.selfConfiguration=response.data;
          }
      });
    },
    configurationsExcludinWS(iDWorkStation){
      Meteor.call('workstation.configurationsExcludingWS',{iDWorkStation},(error,response)=>{
          if (error){
            this.$alert.showAlertSimple('error',error.reason,response);
          } else { 
            this.allConfiguration=response.data;
          }
      });
    },
    initConfigurations(idWorkstation){
      console.log("Entrando a initPermissions");
      // Configuraciones de la WS
      this.configurationsByWS(idWorkstation)
      // Configuraciones restantes
      this.configurationsExcludinWS(idWorkstation)
    }
  },
  meteor: {
    $subscribe: {
      "productionlines.list": [],
      "workstationSetup.list": [],
      
    },
    productionlines() {
      return ProductionLineRepository.find(
        {},
        { fields: { _id: 1, name: 1, description: 1 } }
      ).fetch();
    },

  },
};
</script>

<style scoped>
</style>