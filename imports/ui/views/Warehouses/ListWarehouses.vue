<template>
  <v-container>
  <v-row>
      <v-col>
        <div class="headline">Catálogo de almacenes</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'warehouses'" color="success" v-on="on" fab dark :to="{name:'home.warehouse.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar almacen</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        
        <v-data-table :headers="headers" :items="warehouses" @dblclick:row="(event,{item})=>openEditWarehouse(item)"
                      sort-by="name" class="elevation-1">
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'warehouses'" color="info" v-on="on" small class="mr-2" @click="openEditWarehouse(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'warehouses'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
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
            </tr>
          </template>
        </v-data-table>
     </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="warehouseTemp"
                  @id_element="deleteWarehouse"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {WarehouseRepository} from "../../../api/Warehouses/Warehouse";
import {mapMutations} from "vuex";
export default {
        name: 'ListWarehouses',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  name: '',
                  name_full: '',
                  location: ''
          },warehouseTemp: {
              preposition: 'el',
              typeElement: ' almacen ',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditWarehouse(warehouse) {
              //Guardar en Vuex para recuperar en la vistad de company.save
              this.setElement(warehouse);
              this.$router.push({name: 'home.warehouse.edit'});
            },
            openRemoveModal(warehouse) {
              this.warehouseTemp.element = warehouse;
              this.warehouseTemp._id = warehouse._id;
              this.warehouseTemp.mainNameElement = warehouse.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteWarehouse(idWarehouse) {
              this.$loader.activate("Eliminando almacen....");
              Meteor.call('warehouse.delete',{idWarehouse},(error,response)=>{
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
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'warehouse.list':[]
            },
            warehouses(){
              return WarehouseRepository.find().fetch();
            }
        }  
}
</script>

<style scoped>

</style>