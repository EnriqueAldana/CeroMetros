<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'products'" color="success" v-on="on" fab dark :to="{name:'home.products.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar producto</span>
          </v-tooltip>
        </div>
        <v-data-table :headers="headers" :items="products" @dblclick:row="(event,{item})=>openEditProduct(item)"
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
                <v-icon v-can:edit.hide="'products'" color="info" v-on="on" small class="mr-2" @click="openEditProduct(item)">
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
                <v-text-field v-model="headersFilter.unit.name" type="text"
                              label="Unidad"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.stock" type="text"
                              label="Existencia"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.sku" type="text"
                              label="SKU"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.location" type="text"
                              label="Ubicacion"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.warehouse.name" type="text"
                              label="Almacen"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.provider.name" type="text"
                              label="Proveedor"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.production_line.name" type="text"
                              label="Linea de produccion"></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
     </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="productTemp"
                  @id_element="deleteProduct"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {Product} from "../../../api/Products/Product";
import {mapMutations} from "vuex";
export default {
        name: 'ListProducts',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  isAvailable: '',
                  name: '',
                  name_full: '',
                  unit: {
                    _id:'',
                    name: ''
                  },
                  stock: '',
                  sku: '',
                  location: '',
                  warehouse: {
                    _id:'',
                    name: ''
                  },
                  provider:{
                    _id:'',
                    name: ''
                  },
                  production_line:{
                    _id:'',
                    name: ''
                  }
          },
            productTemp: {
              preposition: 'el',
              typeElement: 'producto',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            openEditProduct(product) {
              //Guardar en Vuex para recuperar en la vistad de product.save
              this.setElement(product);
              this.$router.push({name: 'home.products.edit'});
            },
            openRemoveModal(product) {
              
              this.productTemp.element = product;
              this.productTemp._id = product._id;
              this.productTemp.mainNameElement = product.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteProduct(idProduct) {
              this.$loader.activate("Eliminando producto....");
              Meteor.call('product.delete',{idProduct},(error,response)=>{
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
                value: 'unit.name', text: 'Unidad', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.unit.name.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'stock', text: 'Existencias', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.stock.toLocaleLowerCase()) !== -1;
                }
              },
              
              {
                value: 'sku', text: 'SKU', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.sku.toLocaleLowerCase()) !== -1;
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
                value: 'warehouse.name', text: 'Almacen', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.warehouse.name.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'provider.name', text: 'Proveedor', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.provider.name.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'production_line.name', text: 'Linea de produccion', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.production_line.name.toLocaleLowerCase()) !== -1;
                }
              },
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'product.list':[]
            },
            products(){
              const productList = Product.find({},{fields:{isAvailable:1,name:1,name_full:1,stock:1,unit:1,sku:1,location:1,provider:1,warehouse:1,production_line:1,components:1}}).fetch();
              //console.info('productList',productList)
              return productList;
            }
        }  
}
</script>

<style scoped>

</style>