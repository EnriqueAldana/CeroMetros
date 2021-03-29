<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'companies'" color="success" v-on="on" fab dark :to="{name:'home.company.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar empresa</span>
          </v-tooltip>
        </div>
        <v-data-table :headers="headers" :items="companies" @dblclick:row="(event,{item})=>openEditCompany(item)"
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
                <v-icon v-can:edit.hide="'companies'" color="info" v-on="on" small class="mr-2" @click="openEditCompany(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'companies'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
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
    <modal-remove ref="refModalRemove" v-bind:modalData="companyTemp"
                  @id_element="deleteCompany"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {Company} from "../../../api/Companies/Company";
import {mapMutations} from "vuex";
export default {
        name: 'ListCompanies',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  isAvailable: '',
                  name: '',
                  name_full: '',
                  companyBussinessId: '',
                  address: '',
                  phones: '',
                  web: '',
                  email: ''
          },companyTemp: {
              preposition: 'la',
              typeElement: 'empresa',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditCompany(company) {
              //Guardar en Vuex para recuperar en la vistad de company.save
              this.setElement(company);
              this.$router.push({name: 'home.company.edit'});
            },
            openRemoveModal(company) {
              console.log("company: ", company);
              this.companyTemp.element = company;
              this.companyTemp._id = company._id;
              this.companyTemp.mainNameElement = company.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteCompany(idCompany) {
              this.$loader.activate("Eliminando empresa....");
              Meteor.call('company.delete',{idCompany},(error,response)=>{
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
                value: 'companyBussinessId', text: 'RFC', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.companyBussinessId.toLocaleLowerCase()) !== -1;
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
              'company.list':[]
            },
            companies(){
              return Company.find().fetch();
            }
        }  
}
</script>

<style scoped>

</style>