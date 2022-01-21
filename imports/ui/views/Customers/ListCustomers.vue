<template>
  <v-container>
  <v-row>
      <v-col>
        <div class="headline">Catálogo de clientes</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'customers'" color="success" v-on="on" fab dark :to="{name:'home.customer.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar cliente</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        
        <v-data-table :headers="headers" :items="customers" @dblclick:row="(event,{item})=>openEditCustomer(item)"
                      sort-by="name" class="elevation-1">
        <template v-slot:item.isAvailable="{item}">
            <div class="d-flex align-center pt-5 pb-5">
              <v-icon :color="item.isAvailable?'green' : 'red'">
                mdi-checkbox-blank-circle
              </v-icon>
            </div>
          </template>
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'customers'" color="info" v-on="on" small class="mr-2" @click="openEditCustomer(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'customers'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
          <template v-slot:body.append="{isMobile}">
            <tr v-if="!isMobile">
              <td>
              </td>
              <td>
                <v-text-field v-model="headersFilter.name" type="text"
                              label="Nombre"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.name_full" type="text"
                              label="Nombre completo"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.companyBussinessId" type="text"
                              label="RFC"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.address" type="text"
                              label="Direccion"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.phones" type="text"
                              label="Telefonos"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.web" type="text"
                              label="Web"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.correo" type="text"
                              label="Correo"></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
     </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="customerTemp"
                  @id_element="deleteCustomer"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {Customer} from "../../../api/Customers/Customer";
import {mapMutations} from "vuex";
export default {
        name: 'ListCustomers',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  isAvailable: '',
                  name: '',
                  name_full: '',
                  customerBussinessId: '',
                  address: '',
                  phones: '',
                  web: '',
                  email: ''
          },customerTemp: {
              preposition: 'el',
              typeElement: 'cliente',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditCustomer(customer) {
              //Guardar en Vuex para recuperar en la vistad de company.save
              this.setElement(customer);
              this.$router.push({name: 'home.customer.edit'});
            },
            openRemoveModal(customer) {
              console.log("customer: ", customer);
              this.customerTemp.element = customer;
              this.customerTemp._id = customer._id;
              this.customerTemp.mainNameElement = customer.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteCustomer(idCustomer) {
              this.$loader.activate("Eliminando cliente....");
              Meteor.call('customer.delete',{idCustomer},(error,response)=>{
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
              {value: 'isAvailable', text: 'Disponible', sortable: true},
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
                value: 'customerBussinessId', text: 'RFC', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.customerBussinessId.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'address', text: 'Direccion', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.address.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'phones', text: 'Telefonos', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.phones.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'web', text: 'Web', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.web.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'email', text: 'Correo', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.email.toLocaleLowerCase()) !== -1;
                }
              },
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'customer.list':[]
            },
            customers(){
              return Customer.find().fetch();
            }
        }  
}
</script>

<style scoped>

</style>