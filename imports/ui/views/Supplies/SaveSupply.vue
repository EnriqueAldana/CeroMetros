<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveSupply" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
        
        >
          <v-card-text>
            <v-form @submit.prevent="saveSupply" id="saveSupply" autocomplete="off"
            v-scroll.self="onScroll"
        class="overflow-y-auto"
        max-height="600"
        >
              <v-row>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field
                        v-model="supply.name" id="inputName" name="name"
                        :rules="[rules.required, rules.counter]"
                        label="Nombre"
                        counter
                        maxlength="20"
                  ></v-text-field>

                  <v-text-field v-model="supply.name_full" id="inputNameFull" name="name_full" 
                  :rules="[rules.required]"
                  label="Nombre completo">
                  </v-text-field>

                  <v-select v-model="supply.unit" id="selectUnit" name="unit"
                            :items="units"
                            :rules="[rules.required]"
                            item-text="name" item-value="_id" return-object
                            label="Unidad de medida">
                  </v-select>

                  <v-text-field
                    v-model="supply.stock" id="inputStock" name="stock" label="Existencia"
                    :rules="[rules.required, rules.number]"
                    
                  ></v-text-field>

                  <v-text-field v-model="supply.location" id="inputlocation" name="location" label="Ubicacion"
                  :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field v-model="supply.sku" id="inputsku" 
                  :rules="[rules.required]"
                  name="sku" label="SKU">
                  </v-text-field>
                  <v-select v-model="supply.warehouse" id="selectWarehouse" name="warehouse"
                            :items="warehouses"
                            :rules="[rules.required]"
                            item-text="name" item-value="_id" return-object
                            label="Almacen">
                  </v-select>
                  <v-select v-model="supply.provider" id="selectProvider" name="provider"
                            :items="providers"
                            :rules="[rules.required]"
                            item-text="name" item-value="_id" return-object
                            label="Proveedor">
                  </v-select>
                  <td>
                    <v-switch
                        v-model="supply.isAvailable"
                        label="¿Habilitar suministro?"
                        color="indigo"
                        hide-details
                    ></v-switch>
                  </td>
                  <td>
                  </td>
                </v-col>
                <v-col
                cols="24"
                sm="12"
              >
              </v-col>
              </v-row>
            
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import {WarehouseRepository} from "../../../api/Warehouses/Warehouse";
import {Provider} from "../../../api/Providers/Provider";
import {UnitOfMeasurementRepository} from "../../../api/UnitOfMeasurement/UnitOfMeasurement";
import draggable from 'vuedraggable';
// import ModalBOMProduct from "./ModalBOMProduct";

let id = 3;
export default {
  name: "SaveSupply",
  components: {
    draggable
  },
  data() {
    return {
      id,
      supply: {
                _id: null,
                name: '',
                name_full: null,
                unit: {
                    _id: null,
                    name: null,
                    symbol: null
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
      dataView: {
        title: '',
        targetButton: ''
      }
    }
  },
  created(){  // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear suministro";
      this.dataView.targetButton="Crear";
      
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar suministro";
      this.dataView.targetButton="Actualizar";
      const tempSupply=this.$store.state.temporal.element;
      console.info('tempSupply',tempSupply);
      this.supply= {
        _id: tempSupply._id,
        name: tempSupply.name,
        name_full: tempSupply.name_full,
        unit: tempSupply.unit,
        stock: tempSupply.stock,
        sku: tempSupply.sku,
        location: tempSupply.location,
        warehouse: tempSupply.warehouse,
        provider: tempProduct.provider,
        isAvailable: tempProduct.isAvailable
      };
     
    }
  },
  methods: {
    saveSupply() {
      this.$loader.activate('Guardando suministro...');
      
      Meteor.call('supply.save',this.supply,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.supplies'});
        }
      });
    }
  },
  meteor:{
    
    $subscribe: {
        'warehouse.list': [],
        'provider.list' : [],
        'unitofmeasurement.list' : []
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
      return  UnitOfMeasurementRepository.find({},{fields:{_id:1,name:1,symbol:1}}).fetch();
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