<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveProduct" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveProduct" id="saveProduct" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field
                        v-model="product.name" id="inputName" name="name"
                        :rules="[rules.required, rules.counter]"
                        label="Nombre"
                        counter
                        maxlength="20"
                  ></v-text-field>

                  <v-text-field v-model="product.name_full" id="inputNameFull" name="name_full" label="Nombre completo">
                  </v-text-field>

                  <v-select v-model="product.unit" id="selectUnit" name="unit"
                            :items="units"
                            item-text="name" item-value="_id" return-object
                            label="Unidad de medida">
                  </v-select>

                  <v-text-field
                    v-model="product.stock" id="inputStock" name="stock" label="Existencia"
                    :rules="[rules.required, rules.number]"
                    
                  ></v-text-field>

                  <v-select v-model="product.provider" id="selectProvider" name="provider"
                            :items="providers"
                            item-text="name" item-value="_id" return-object
                            label="Proveedor">
                  </v-select>
                  

                  <v-text-field v-model="product.location" id="inputlocation" name="location" label="Ubicacion">
                  </v-text-field>
                  <v-text-field v-model="product.sku" id="inputsku" name="sku" label="SKU">
                  </v-text-field>
                  <v-select v-model="product.warehouse" id="selectWarehouse" name="warehouse"
                            :items="warehouses"
                            item-text="name" item-value="_id" return-object
                            label="Almacen">
                  </v-select>
                  <v-select v-model="product.provider" id="selectProvider" name="provider"
                            :items="providers"
                            item-text="name" item-value="_id" return-object
                            label="Proveedor">
                  </v-select>
                  <v-select v-model="product.production_line" id="selectProductionLine" name="productionline"
                            :items="production_lines"
                            item-text="name" item-value="_id" return-object
                            label="Linea de produccion">
                  </v-select>
                  <td>
                    <v-switch
                        v-model="product.isAvailable"
                        label="¿Habilitar producto?"
                        color="indigo"
                        hide-details
                    ></v-switch>
                  </td>
                  <v-btn
                    depressed
                    color="primary"
                    @click="openModalBoM(product)"
                  >
                    Configurar componentes del producto
                  </v-btn>
                  
                  <td>
                  </td>
                </v-col>
                <v-col
                cols="24"
                sm="12"
              >
              <span class="headline">Lista de articulos del producto</span>
                <v-data-table :headers="headersBOMList" :items="product.bom" 
                      sort-by="name" 
                      class="elevation-1">

                      <template v-slot:item.action="{item}">
                            <v-tooltip bottom>
                              <template v-slot:activator="{on}">
                                <v-icon v-can:delete.hide="'product.bom'" color="error" v-on="on" small class="mr-2" @click="removeItemFromproductBOM(item)">
                                  delete
                                </v-icon>
                              </template>
                              <span>Eliminar</span>
                            </v-tooltip>
                      </template>
                        
                </v-data-table>
              </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <modal-bOM ref="refModalBoM" v-bind:modalData="productTempBOM"
                  @bomList="setProductBoM">
    </modal-bOM>
    <modal-product ref="refModalBOMProduct" v-bind:modalData="productTempBOM"
                  @bomList="setProductBoM">
    </modal-product>
  </v-container>
  
</template>

<script>
import {WarehouseRepository} from "../../../api/Warehouses/Warehouse";
import {ProductionLineRepository} from "../../../api/ProductionLines/ProductionLine";
import {Provider} from "../../../api/Providers/Provider";
import draggable from 'vuedraggable';
import ModalBOM from "./ModalBoM";
// import ModalBOMProduct from "./ModalBOMProduct";

let id = 3;
export default {
  name: "SaveProduct",
  components: {
    draggable,
    ModalBOM
  },
  data() {
    return {
      id,
      productTempBOM: {
      },
      product: {
                _id: null,
                name: '',
                name_full: null,
                unit: {
                    _id: null,
                    name: null
                },
                stock: null
                ,
                provider: {
                    _id: null,
                    name: null
                },
                location: null,
                sku: null,
                warehouse: {
                    _id: null,
                    name: null
                },
                production_line: {
                    _id: null,
                    name: null,
                    workstations: [
                        {
                            _id: null,
                            name: null,
                            name_full: null,
                            location: null,
                            productionline: {
                                description : null,
                                name : null,
                                _id : null
                            }
                        }
                    ]
                } ,
                bom:[
                  {
                  _id:'',
                  name:'',
                  quantity:''
                  }
                 
                ],
                isAvailable: false
      },
      rules: {
          required: value => !!value || 'Requerido.',
          counter: value => value.length <= 20 || 'Max 20 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Correo Electrónico incorrecto.'
          },
          number: value => {
            const pattern= /^[+-]?\d+([,.]\d+)?$/
            return pattern.test(value) || 'Numero con formato equivocado, debe ser un real Ejemplo: -123.35 o 7,4 o 8'
          }
      },
      units:[
          {
            _id: 'zzzzz',
            name: 'Kgs'
          },
          {
            _id: 'asasas',
            name: 'Lbs'
          }
        
        ],
      dataView: {
        title: '',
        targetButton: ''
      },
      headersBOMFilter:{
              name: '',
              quantity: ''
          }
    }
  },
  created(){  // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear producto";
      this.dataView.targetButton="Crear";
      
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar producto";
      this.dataView.targetButton="Actualizar";
      const tempProduct=this.$store.state.temporal.element;
      console.info('tempProduct',tempProduct);
      this.product= {
        _id: tempProduct._id,
        name: tempProduct.name,
        name_full: tempProduct.name_full,
        unit: tempProduct.unit,
        stock: tempProduct.stock,
        sku: tempProduct.sku,
        location: tempProduct.location,
        warehouse: tempProduct.warehouse,
        provider: tempProduct.provider,
        bom: tempProduct.bom,
        isAvailable: tempProduct.isAvailable,
        production_line: tempProduct.production_line
      };
     
    }
  },
  methods: {
    openModalBoM(product) {  
      // Aqui mandamos el objeto product
       this.productTempBOM = product;
      // this.$refs.refModalBoM.dialog = true;
      this.$refs.refModalBOMProduct.dialog= true;

    },
    setProductBoM(bomList){
      // Aqui fijar la lista a la variable BOM del producto
      console.info('bomList ', bomList);
      this.product.bom=bomList;
    },
    saveProduct() {
      this.$loader.activate('Guardando producto...');
      
      Meteor.call('product.save',this.product,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.products'});
        }
      });
    }
  },
  computed:{
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
  meteor:{
    
    $subscribe: {
        'productionlines.list': [],
        'warehouse.list': [],
        'provider.list' : []
    },
    production_lines(){
      return ProductionLineRepository.find({},{fields:{_id:1,name:1,description:1,workstations:1}}).fetch();
    },
    warehouses(){
      const warehouses= WarehouseRepository.find({},{fields:{_id:1,name:1,name_full:1,location:1}}).fetch();
      //console.info('Almacenes',warehouses);
      return warehouses;
    },
    providers(){
      return Provider.find({},{fields:{_id:1,name:1}}).fetch();
    },
    units(){
      return this.units;
    }
  }
}
</script>

<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}
</style>