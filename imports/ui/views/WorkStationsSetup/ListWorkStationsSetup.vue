<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'users'" color="success" v-on="on" fab dark :to="{name:'home.workstationconfiguration.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar configuracion para estaciones de trabajo</span>
          </v-tooltip>
        </div>
       
        <v-data-table :headers="headers" :items="workstationconfigurations" @dblclick:row="(event,{item})=>openEditWorkstationConfiguration(item)"
                      sort-by="name" class="elevation-1">
        
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'providers'" color="info" v-on="on" small class="mr-2" @click="openEditWorkstationConfiguration(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'providers'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
          <template v-slot:body.append="{isMobile}">
            <tr v-if="!isMobile">
              <td>
                <v-text-field v-model="headersFilter.name" type="text"
                              label="Nombre"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.description" type="text"
                              label="Descripción"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.instructions" type="text"
                              label="Instrucciones"></v-text-field>
              </td>
              
            </tr>
          </template>
        </v-data-table>
     </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="workstationConfigTemp"
                  @id_element="deleteWorkstationConfiguration"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {WorkstationSetupRepository} from "../../../api/WorkStationSetup/WorkstationSetup";
import {mapMutations} from "vuex";
export default {
        name: 'ListWorkstationSetup',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  name: '',
                  description: '',
                  instructions:'',
                  
          },workstationConfigTemp: {
              preposition: 'la',
              typeElement: 'configuracion para la estación de trabajo',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditWorkstationConfiguration(workstationConfig) {
              //Guardar en Vuex para recuperar en la vista de provider.save
              this.setElement(workstationConfig);
              this.$router.push({name: 'home.workstationconfiguration.edit'});
            },
            openRemoveModal(workstationConfig) {
              
              this.workstationConfigTemp.element = workstationConfig;
              this.workstationConfigTemp._id = workstationConfig._id;
              this.workstationConfigTemp.mainNameElement = workstationConfig.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteWorkstationConfiguration(idWorkstationsetup) {
              this.$loader.activate("Eliminando configuración para estación de trabajo....");
              Meteor.call('workstationSetup.delete',{idWorkstationsetup},(error,response)=>{
                this.$loader.deactivate();
                if(error){
                  this.$alert.showAlertSimple('error',error.reason);
                }else{
                  this.$alert.showAlertSimple('success',response.message);
                }
              });
            }
        },
        computed: {
          headers() {
            return [
              
              {
                value: 'name', text: 'Nombre', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.name.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'description', text: 'Descripción', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.description.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'instructions', text: 'Instrucciones', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.instructions.toLocaleLowerCase()) !== -1;
                }
              },
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'workstationSetup.list':[]
            },
            workstationconfigurations(){
              const workstationConfigurationList= WorkstationSetupRepository.find().fetch();

              return workstationConfigurationList;
            }
        }  
}
</script>

<style scoped>

</style>