<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">Reporte de solicitudes de suministros</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'users'" color="success" v-on="on" fab dark :to="{name:'home.unitsofmeasurement.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Exportar reporte</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        
       
        <v-data-table :headers="headers" :items="unitsofmeasurements" @dblclick:row="(event,{item})=>openEditUnitOfMeasurement(item)"
                      sort-by="name" class="elevation-1">
        
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
  
  </v-container>
</template>

<script>

import {UnitOfMeasurementRepository} from "../../../api/UnitOfMeasurement/UnitOfMeasurement";
export default {
        name: 'SupplyRequestOldSystem',
        components: {
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