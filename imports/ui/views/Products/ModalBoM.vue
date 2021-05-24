<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      id="modalRemove"
      persistent 
    >
      <template v-slot:activator="{ on, attrs }">
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Configuracion de la lista de articulos del producto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
          <v-divider></v-divider>
            <v-row>
              <v-col
                cols="6"
                sm="3"
              >
              <span class="line">Disponga la cantidad</span>
              <v-text-field
                    v-model="validateQuantity" id="inputQuantity" name="quantityField" label="Cantidad"
                    :rules="[rules.required, rules.number]"
                    suffix="articulos"
              ></v-text-field>
              </v-col>
              <v-col
                cols="24"
                sm="12"
              >
                <span class="line">Elija el articulo</span>
                <v-data-table :headers="headers" :items="products" 
                      sort-by="name" :single-select="true"  show-select
                      v-model="validateSelectItem"
                      class="elevation-1">
                      <template v-slot:item.isAvailable="{item}">
                          <div class="d-flex align-center pt-5 pb-5">
                            <v-icon :color="item.isAvailable?'green' : 'red'">
                              mdi-checkbox-blank-circle
                            </v-icon>
                          </div>
                        </template>
                      
                        <template v-slot:body.append="{isMobile}">
                          <tr v-if="!isMobile">
                            <td>
                            </td>
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
                          </tr>
                        </template>
                </v-data-table>
              </v-col>
              <v-col
              cols="12"
              sm="6"
              >
              <v-divider></v-divider>
              <v-btn
                    depressed
                    color="primary"
                    @click="addItem()"
                  v-if="toSeebtn"
                  >
                    Agregar articulo
                  </v-btn>
              </v-col>
            </v-row>
            <v-row>
            <v-divider></v-divider>
              <v-col
                cols="24"
                sm="12"
              >
              <span class="headline">Lista de articulos del producto</span>
                <v-data-table :headers="headersBOMList" :items="itemList" 
                      sort-by="name" 
                      class="elevation-1">

                      <template v-slot:item.action="{item}">
                            <v-tooltip bottom>
                              <template v-slot:activator="{on}">
                                <v-icon v-can:delete.hide="'itemList'" color="error" v-on="on" small class="mr-2" @click="removeItemFromproductBOM(item)">
                                  delete
                                </v-icon>
                              </template>
                              <span>Eliminar</span>
                            </v-tooltip>
                      </template>
                        
                </v-data-table>
              </v-col>
              
            </v-row>
          
          </v-container>
          <small>*indica que es requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="cancel"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="acceptBoM"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {Product} from "../../../api/Products/Product";
export default {
  name: "ModalBOM",
  props: ['modalData'],
  data() {
    return {
      dialog: false,
      toSeebtn:false,
      itemSelected: [],
      itemBOM:{
          quantity:'',
          _id:'',
          name:''
      },
      itemList:[    
      ],
      selectedItem: 1,
      rules: {
          required: value => !!value || 'Requerido.',
          counter: value => value.length <= 20 || 'Max 20 caracteres',
          number: value => {
            const pattern= /^[+-]?\d+([,.]\d+)?$/
            return pattern.test(value) || 'Numero con formato equivocado, debe ser un real Ejemplo: -123.35 o 7,4 o 8'
          }
      },
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
                  }
          },
          headersBOMFilter:{
              name: '',
              quantity: ''
          }
    }
  },
   show(){
     // Aqui inicializamos la lista el bom qu el Producto tiene 
     console.info('modalData' , this.modalData);
     this.itemList=this.modalData.bom;
   },
  computed: {
          validateQuantity:{  
              set (validateQuantity) {
                //console.info('cambio text fiel de cantidad  ',validateQuantity);
                this.itemBOM.quantity=validateQuantity;
                if(this.itemBOM.quantity !== ''){
                  //console.log('this.itemBOM._id ',this.itemBOM._id);
                    if(this.itemBOM._id !==''){
                      this.toSeebtn=true;
                    }else{
                      this.toSeebtn=false;
                    }
                }else{
                  this.toSeebtn=false;
                }
                
                
              }    
          },
          validateSelectItem:{

            set(validateSelectItem){
              //console.info('Lista de articulos ha cambiado  ',validateSelectItem);
              // si hay un seleccionado
              if(validateSelectItem.length > 0){
                this.itemBOM._id= validateSelectItem[0]._id;
                this.itemBOM.name= validateSelectItem[0].name;
                if(this.itemBOM.quantity.length > 0){
                  this.toSeebtn=true;
                }else{
                  this.toSeebtn=false;
                }
              }else{
                this.itemBOM._id='';
                this.toSeebtn=false;
              }
            },
            get(){
              return ;
            }

          },
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
              }
            ]
          },
          headersBOMList() {
            return [
              {
                value: 'quantity', text: 'Cantidad', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersBOMFilter.quantity.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'name', text: 'Nombre', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersBOMFilter.name.toLocaleLowerCase()) !== -1;
                }
              }
              ,
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
  },
  methods: {
    acceptBoM() {
        // aqui hay que cargar la lista a bomList para regresarla
      this.modalData.bomList=this.itemList;
      this.$emit('bomList', this.modalData.bomList);
      this.dialog = false;
    },
    cancel() {
      
      this.itemList=[];
      this.dialog = false;
    },addItem(){
      //Agregar al componente List bindeado a this.modalData.bomList=itemBOM
      console.log('this.itemBOM ',this.itemBOM);
      const itemAdded= this.itemBOM;
      console.log('itemAdded',itemAdded);
      this.itemList.push(itemAdded);
      console.log('this.itemList' ,this.itemList);
    },
    removeItemFromproductBOM(i){
      this.itemList.splice(i);
    },
    resetitemBOM(){
      this.itemBOM.quantity=0;
      this.itemBOM.name='';
      this.itemBOM._id='';
    }
  },
  meteor:{
            $subscribe: {
              'product.list':[]
            },
            products(){
              const productList = Product.find({},{fields:{isAvailable:1,name:1,name_full:1,stock:1,unit:1,sku:1,location:1,provider:1,warehouse:1,production_line:1}}).fetch();
              console.info('productList',productList)
              return productList;
            }
  } 
}
</script>

<style scoped>

</style>