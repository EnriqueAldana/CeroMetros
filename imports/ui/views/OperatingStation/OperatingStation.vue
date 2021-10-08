<template>
  <v-container >
    <v-row>
      <v-col>
        <div class="headline">{{ dataView.title }}</div>
      </v-col>
      <v-col cols="2">
      </v-col>
    </v-row>

    <v-row >
      <v-col>
        <v-card>
          <v-card-title>
              <div class="subtitle-2">
                Operador de la estación
              </div>
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent="saveWorkStation"
              id="saveWorkStation"
              autocomplete="off"
            >
          <v-row >
              <v-col   >
                        <v-card-text>
                          <img :src="user.profile.path || '/img/user.png'" :alt="user.profile.name" width="100px">
                          <v-file-input v-show="false" ref="imageFile" v-model="file" accept="image/png, image/jpeg , image/bpm">
                          </v-file-input>
                        </v-card-text> 
              </v-col>
              <v-col  >
                <v-card-text>
                  <v-text-field disabled v-model="user.profile.name" id="inputName" name="name"  label="Nombre completo">
                  </v-text-field>
                  <v-text-field disabled v-model="user.username" id="inputUsername" name="username"  label="Usuario">
                  </v-text-field>
                  <v-text-field disabled v-model="user.emails[0].address" id="inputEmail" name="email"  label="Correo electrónico">
                  </v-text-field>
                  
                </v-card-text>
              </v-col>
                <v-col >
                  <v-select
                    outlined
                    :items="items"
                    label="Linea de producción"
                    ></v-select>
                  <v-select
                    outlined
                    :items="items"
                    label="Estacion de operación"
                    ></v-select>
                    <v-select
                    outlined
                    :items="items"
                    label="Configuración de la estación"
                    ></v-select>
                  
                </v-col>
                <v-col >
                <div class="text-center">
                  <div class="my-2">
                      <v-btn
                        rounded
                        color="primary"
                        dark
                        >
                        Iniciar operación
                      </v-btn>
                  </div>
                  <div class="my-2">
                        <v-btn
                          rounded
                          color="primary"
                          dark
                          >
                          Parar operación
                        </v-btn>
                  </div>
                  <div class="my-2">
                      <v-btn
                        rounded
                        color="primary"
                        dark
                        >
                        Reportar operación
                      </v-btn>
                  </div>
                  <div class="my-2">
                      <v-btn
                        rounded
                        color="primary"
                        dark
                        >
                        Solicitar insumos
                      </v-btn>
                  </div>
                  <div class="my-2">
                      <v-btn
                        rounded
                        color="primary"
                        dark
                        >
                        Cambio de configuración
                      </v-btn>
                  </div>
                </div>
              </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card>
                    <v-card-title>Solicitudes de insumos</v-card-title>
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
                    <v-card-title>Lista de ordenes de producción</v-card-title>
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
import {mapMutations} from 'vuex';
import { ProductionLineRepository } from "../../../api/ProductionLines/ProductionLine";
import draggable from 'vuedraggable';
export default {

  name: "OperatingStation",
  components: {
    draggable
  },
  data() {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{address: null, verified: false}],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      },
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
    if (this.$router.currentRoute.name.includes("estacionoperacion")) {
      this.dataView.title = "Estación de operación"; 
    } 
    const user= this.$store.state.auth.user;
      this.user= {
        _id: user._id,
        username: user.username,
        emails: user.emails,
        profile: user.profile
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
    ...mapMutations('auth',['setUser']),
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