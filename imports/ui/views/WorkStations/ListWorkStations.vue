<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'workstations'" color="success" v-on="on" fab dark :to="{name:'home.workstation.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar estacion de trabajo</span>
          </v-tooltip>
        </div>
        <v-data-table :headers="headers" :items="workstations" @dblclick:row="(event,{item})=>openEditWorkStation(item)"
                      sort-by="name" class="elevation-1">
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'workstations'" color="info" v-on="on" small class="mr-2" @click="openEditWorkStation(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'workstations'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
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
                <v-text-field v-model="headersFilter.name_full" type="text"
                              label="Nombre completo"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.location" type="text"
                              label="Ubicacion"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.productionline" type="text"
                              label="Linea de produccion"></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
     </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="workstationTemp"
                  @id_element="deleteWorkStation"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {WorkstationRepository} from "../../../api/Workstations/WorkStation";
import {mapMutations} from "vuex";
export default {
        name: 'ListWorkStations',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  name: '',
                  name_full: '',
                  location: '',
                  productionline: ''
          },workstationTemp: {
              preposition: 'la',
              typeElement: ' estacion de trabajo ',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditWorkStation(workstation) {
              //Guardar en Vuex para recuperar en la vistad de company.save
              this.setElement(workstation);
              this.$router.push({name: 'home.workstation.edit'});
            },
            openRemoveModal(workstation) {
              this.workstationTemp.element = workstation;
              this.workstationTemp._id = workstation._id;
              this.workstationTemp.mainNameElement = workstation.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteWorkStation(idWorkstation) {
              this.$loader.activate("Eliminando estacion de trabajo....");
              Meteor.call('workstation.delete',{idWorkstation},(error,response)=>{
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
                value: 'name_full', text: 'Nombre completo', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.name_full.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'location', text: 'Ubicacion', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.location.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'productionline.name', text: 'Linea de produccion', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.productionline.toLocaleLowerCase()) !== -1;
                }
              },
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'workstation.list':[]
            },
            workstations(){
              const workstationfiltered = WorkstationRepository.find().fetch();
              workstationfiltered.map(ws=>{
                if(ws.productionline._id==null){
                  ws.productionline._id=''
                  ws.productionline.name=''
                  ws.productionline.description=''
                }
              });
              return workstationfiltered
            }
        }  
}
</script>

<style scoped>

</style>