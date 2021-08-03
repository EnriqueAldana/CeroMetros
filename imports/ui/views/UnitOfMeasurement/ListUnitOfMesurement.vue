<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'users'" color="success" v-on="on" fab dark :to="{name:'home.unitsofmeasurement.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar unidad de medida</span>
          </v-tooltip>
        </div>
       
        <v-data-table :headers="headers" :items="unitsofmeasurements" @dblclick:row="(event,{item})=>openEditUnitOfMeasurement(item)"
                      sort-by="name" class="elevation-1">
        
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'providers'" color="info" v-on="on" small class="mr-2" @click="openEditUnitOfMeasurement(item)">
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
                <v-text-field v-model="headersFilter.symbol" type="text"
                              label="Simbolo"></v-text-field>
              </td>
              
            </tr>
          </template>
        </v-data-table>
     </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="unitofmeasurementTemp"
                  @id_element="deleteUnitOfMeasurement"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {UnitOfMeasurementRepository} from "../../../api/UnitOfMeasurement/UnitOfMeasurement";
import {mapMutations} from "vuex";
export default {
        name: 'ListUnitOfMeasurement',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  name: '',
                  symbol: '',
                  
          },unitofmeasurementTemp: {
              preposition: 'la',
              typeElement: 'unidad de medida',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditUnitOfMeasurement(unitofmeasurement) {
              //Guardar en Vuex para recuperar en la vista de provider.save
              this.setElement(unitofmeasurement);
              this.$router.push({name: 'home.unitsofmeasurement.edit'});
            },
            openRemoveModal(unitofmeasurement) {
              
              this.unitofmeasurementTemp.element = unitofmeasurement;
              this.unitofmeasurementTemp._id = unitofmeasurement._id;
              this.unitofmeasurementTemp.mainNameElement = unitofmeasurement.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteUnitOfMeasurement(idUnitofmeasurement) {
              this.$loader.activate("Eliminando unidad de medida....");
              Meteor.call('unitofmeasurement.delete',{idUnitofmeasurement},(error,response)=>{
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
                value: 'symbol', text: 'Simbolo', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.symbol.toLocaleLowerCase()) !== -1;
                }
              },
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'unitofmeasurement.list':[]
            },
            unitsofmeasurements(){
              const unitofmeasurementList= UnitOfMeasurementRepository.find().fetch();

              return unitofmeasurementList;
            }
        }  
}
</script>

<style scoped>

</style>