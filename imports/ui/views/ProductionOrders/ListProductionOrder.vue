<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-can:create.hide="'products'"
                color="success"
                v-on="on"
                fab
                dark
                :to="{ name: 'home.productionorders.create' }"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar orden de produccion</span>
          </v-tooltip>
        </div>
        <v-data-table
          :headers="headers"
          :items="productionOrder"
          @dblclick:row="(event, { item }) => openEditProductionOrder(item)"
          sort-by="name"
          class="elevation-1"
        >
                    <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'products'" color="info" v-on="on" small class="mr-2" @click="openEditProductionOrder(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'products'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
          <template v-slot:body.append="{ isMobile }">
            <tr v-if="!isMobile">
              <td>
                <v-text-field
                  v-model="headersFilter.folio"
                  type="text"
                  label="Numero Orden Produccion"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.status[0].statusKey"
                  type="text"
                  label="Ultimo estatus"
                ></v-text-field>
              </td>
              
              <td>
                <v-text-field
                  v-model="headersFilter.customer.name"
                  type="text"
                  label="Nombre del cliente"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.createdAt"
                  type="text"
                  label="Fecha de creacion"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.requiredDate"
                  type="text"
                  label="Fecha requerida"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.estimatedDeliveryAt"
                  type="text"
                  label="Fecha estimada de entrega"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.editedAt"
                  type="text"
                  label="Fecha ult. edicion"
                ></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <modal-remove
      ref="refModalRemove"
      v-bind:modalData="productOrderTemp"
      @id_element="deleteProductionOrder"
    ></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import { DateTime } from 'luxon'
import {ProductionOrders} from "../../../api/ProductionOrders/ProductionOrder"
import {mapMutations} from "vuex";
export default {
        name: 'ListProductionOrder',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  customer: {
                    _id : '',
                    address : '',
                    customerBussinessId : '',
                    email : '',
                    isAvailable : true,
                    name : '',
                    name_full : '',
                    phones : '',
                    web : ''
                  },
                  folio:'',
                  status:[{
                    statusDate : '',
                    statusKey : '',
                    statusDescription: '',
                    statusOrigin: ''
                  }],
                  createdAt:'', 
                  requiredDate:'',
                  estimatedDeliveryAt:'',
                  editedAt:'',

             },
            productOrderTemp: {
              preposition: 'la',
              typeElement: 'orden de produccion del cliente ',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditProductionOrder(productionOrder) {
              //Guardar en Vuex para recuperar en la vistad de productionOrder.save
              this.setElement(productionOrder);
              this.$router.push({name: 'home.productionorders.edit'});
            },
            openRemoveModal(productOrder) {
              
              this.productOrderTemp.element = productOrder;
              this.productOrderTemp._id = productOrder._id;
              this.productOrderTemp.mainNameElement = productOrder.customer.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteProductionOrder(idProductionOrder) {
              this.$loader.activate("Eliminando orden de produccion....");
              Meteor.call('productionorder.delete',{idProductionOrder},(error,response)=>{
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
                value: 'folio', text: 'Num Orden Produccion', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.folio.toLocaleLowerCase()) !== -1;
                },
                
              },
              {
                value: 'status[0].statusKey', text: 'Ultimo estatus', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.status[0].statusKey.toLocaleLowerCase()) !== -1;
                },
                
              },
              {
                value: 'customer.name', text: 'Nombre del cliente', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.customer.name.toLocaleLowerCase()) !== -1;
                },
                
              },
              {
                value: 'createdAt', text: 'Fecha de creacion', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.createdAt.toLocaleLowerCase()) !== -1;
                },
                
              },
              {
                value: 'requiredDate', text: 'Fecha requerida', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.requiredDate.toLocaleLowerCase()) !== -1;
                },
                
              },
              {
                value: 'estimatedDeliveryAt', text: 'Fecha estimada entrega', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.estimatedDeliveryAt.toLocaleLowerCase()) !== -1;
                },
                
              },
              {
                value: 'editedAt', text: 'Fecha ultima edicion', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.editedAt.toLocaleLowerCase()) !== -1;
                },
                
              },
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'production-order.list':[]
            },
            productionOrder(){
              const productionordersList= ProductionOrders.find({},{fields:{folio:1,customer:1,createdAt:1,editedAt:1, requiredDate:1,estimatedDeliveryAt:1,notes:1, products:1,status:1}}).fetch();
             
              const productionordersListFiltered = productionordersList.map(po => {
                var dateTimeCreatedAt=new Date(po.createdAt);
                var dateTimeCreatedAtString = dateTimeCreatedAt.getDate()+ "/" + (parseInt(dateTimeCreatedAt.getMonth())+1) + "/" + dateTimeCreatedAt.getFullYear()
                po.createdAt=dateTimeCreatedAtString
                
                var dateTimeEditedAt=new Date(po.editedAt);
                var dateTimeEditedAtString = dateTimeEditedAt.getDate()+ "/" + (parseInt(dateTimeEditedAt.getMonth())+1) + "/" + dateTimeEditedAt.getFullYear()
                po.editedAt=dateTimeEditedAtString

                var dateTimeRequiredDate=new Date(po.requiredDate);
                var dateTimeRequiredDateString = dateTimeRequiredDate.getDate()+ "/" + (parseInt(dateTimeRequiredDate.getMonth())+1) + "/" + dateTimeRequiredDate.getFullYear()
                po.requiredDate=dateTimeRequiredDateString

                var dateTimeEstimatedDeliveryAt=new Date(po.estimatedDeliveryAt);
                var dateTimeEstimatedDeliveryAtString = dateTimeEstimatedDeliveryAt.getDate()+ "/" + (parseInt(dateTimeEstimatedDeliveryAt.getMonth())+1) + "/" + dateTimeEstimatedDeliveryAt.getFullYear()
                po.estimatedDeliveryAt=dateTimeEstimatedDeliveryAtString
                po.status[0]=po.status.pop();
                return po;

              })
              //console.info('productionordersListFiltered',productionordersListFiltered)
              return productionordersListFiltered;
            }

        }  
}
</script>

<style scoped>
</style>