<template>
  <v-container >
    <v-row>
      <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
        <div class="headline">{{ dataView.title }}</div>
      </v-col>
     
    </v-row>
    <v-row align="center"
        class="mx-0">
      <v-col cols="2" xl="2" lg="2" md="12" sm="12" xs="12">
        <v-card
        elevation="24"
          >
                  <v-card-title>
                        Operador de la estación
                  </v-card-title>
                              <v-card-text >
                                <img :src="user.profile.path || '/img/user.png'" :alt="user.profile.name" width="140px">
                              </v-card-text>    
                </v-card>
      </v-col>
      <v-col cols="2" xl="2" lg="2" md="12" sm="12" xs="12">
        <v-card
        elevation="24"
         >
                  <v-card-title>
                      <div class="subtitle-4">
                        Información del operador
                      </div>
                  </v-card-title>
                  <v-card-subtitle>
                 
                  </v-card-subtitle>
                      <v-card-text>
                        <v-text-field disabled v-model="user.profile.name" id="inputName" name="name"  label="Nombre completo">
                        </v-text-field>
                        <v-text-field disabled v-model="user.username" id="inputUsername" name="username"  label="Usuario">
                        </v-text-field>
                        <v-text-field disabled v-model="user.emails[0].address" id="inputEmail" name="email"  label="Correo electrónico">
                        </v-text-field>
                        
                      </v-card-text>
                </v-card>
      </v-col>
      <v-col cols="8" xl="8" lg="8" md="12" sm="12" xs="12">
              <v-row align="center"
              class="mx-0"
              no-gutters>
              <v-card
                elevation="24"
                 >
                  <v-card-title>
                      <div class="subtitle-4">
                        Configuración de la estación de operación
                      </div>
                  </v-card-title>
                  <v-card-subtitle>
                  La configuracion de la estacion fijan las caracteristicas de la estación.
                
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-select
                      v-model="productionline"
                      id="selectProductionLine"
                      :rules="[rules.required]"
                      name="productionLine"
                      :items="productionLines"
                      item-text="name"
                      item-value="_id"
                      return-object
                      label="Linea de produccion"
                      @change="productionLineSelected"
                      ></v-select>
                    <v-select
                      v-model="workstation"
                      id="operatingStation"
                      :rules="[rules.required]"
                      name="operatingStation"
                      :items="operatingstations"
                      item-text="name"
                      item-value="_id"
                      return-object
                      label="Estacion de operación"
                      @change="operatingStationSelected"
                      ></v-select>

                      <v-select
                      v-model="configuration"
                      id="configuration"
                      :rules="[rules.required]"
                      name="configuration"
                      :items="configurations"
                      item-text="name"
                      item-value="_id"
                      return-object
                      label="Configuración de la estación"
                      @change="configurationSelected"
                      ></v-select>
                    </v-card-actions>
                </v-card>
              </v-row>
              <v-divider class="mx-4"></v-divider>
              <v-row align="center"
              class="mx-0"
              no-gutters>
              <v-card
                elevation="24"
                 >
                  <v-card-title>
                      <div class="subtitle-4">
                        Acciones 
                      </div>
                  </v-card-title>
                  <v-card-subtitle>
                  Las acciones son comandos para la operación de la estación.
                  Cada botón le permite llevar a cabo una acción.
                  </v-card-subtitle>
                  <v-card-text>
                    <v-chip-group
                      v-model="selection"
                      active-class="deep-purple accent-4 white--text"
                      column
                    >
                      <v-chip>Arrancar</v-chip>
                      <v-chip>Parar</v-chip>
                      <v-chip>Producción</v-chip>
                      <v-chip>Insumos</v-chip>
                      <v-chip>Mantto.</v-chip>
                    </v-chip-group>
                  </v-card-text>
               <v-card-actions>
               
                  
              </v-card-actions>
              </v-card>
              </v-row>
                
      </v-col>
     
    </v-row>
    

        <v-row>
                <v-col>
                  <v-card
                  elevation="24"
                 >
                    <v-card-title>Solicitudes de insumos</v-card-title>
                    <v-card-text>
                      <v-text-field
          
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-sheet
                      id="scrolling-techniques-2"
                      class="overflow-y-auto"
                      max-height="500"
                    >
                      
                    </v-sheet>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card
                  elevation="24"
                >
                    <v-card-title>Lista de ordenes de producción</v-card-title>
            
                      <v-data-table
                        v-model="selectedProductionOrder"
                        :headers="headers"
                        :items="productionOrder"
                        @dblclick:row="(event, { item }) => openViewProductionOrder(item)"
                        sort-by="name"
                        class="elevation-1"
                        style="height: 400px"
                        single-select
                        show-select
                        item-key="folio"
                        @click:row="clickProductOrderRow"
                        @item-selected="clickProductOrderSelected"
                        :footer-props="{
                          showFirstLastPage: true,
                          firstIcon: 'mdi-arrow-collapse-left',
                          lastIcon: 'mdi-arrow-collapse-right',
                          prevIcon: 'mdi-minus',
                          nextIcon: 'mdi-plus'
                        }"
                        
                        
                        
                      >
                      <template
                        v-slot:footer
                      >
                      
                      </template>
                      <template v-slot:item.status.statusKey="{item}">
                        <div class="d-flex align-center pt-5 pb-5">
                          <v-icon :color="item.isAvailable?'green' : 'red'">
                            mdi-checkbox-blank-circle
                          </v-icon>
                        </div>
                      </template>
                      <template v-slot:item.action="{item}">
                        <v-tooltip bottom>
                          <template v-slot:activator="{on}">
                            <v-icon small v-can:edit.hide="'products'" color="info" v-on="on" small class="mr-2" @click="openViewProductionOrder(item)">
                              info
                            </v-icon>
                          </template>
                          <span>Ver</span>
                        </v-tooltip>
                      </template>
                     
                      <template v-slot:body.append="{isMobile}">
                        <tr v-if="!isMobile">
                          <td>
                          </td>
                          <td>
                          </td>
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
                       <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        
                        </v-alert>
                    </v-data-table>
                  </v-card>
                </v-col>
        </v-row>
          

  </v-container>
</template>

<script>
import {mapMutations} from 'vuex';

import {ProductionOrders} from "../../../api/ProductionOrders/ProductionOrder"
export default {

  name: "OperatingStation",
  data() {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{address: null, verified: false}],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      },
      productionline:
        {
          _id : "",
          name : "",
          description : "",
          
      },
      workstation :  
                {
                  _id : "",
                  name: "",
                  name_full: "",
                  location: "",
                  productionline: {
                  _id: "",
                  name : "",
                  description: ""
                  },
                  
                },
      configuration: 
                      {
                          _id : "",
                          name : "",
                          description : "",
                          instructions : ""
                      }, 
      productionLines:[],
      operatingstations:[],
      configurations: [],
      selectedProductionOrder:[],
      selection:[],
      dataView: {
        title: "",
        targetButton: "",
      },
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
        toggle(isSelected,select,e) {
            select(!isSelected)
        },
      rules: {
        required: (value) => !!value || "Requerido.",
        greatZero: (value) => value > 0 || "Inserte valor mayor a cero",
        greatEqualZero:(value)=> value >= 0 || "Inserte valor igual o mayor a cero",
        counter: (value) => value.length <= 20 || "Max 20 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Correo Electrónico incorrecto.";
        },
        number: (value) => {
          const pattern = /^[+-]?\d+([,.]\d+)?$/;
          return (
            pattern.test(value) ||
            "Numero con formato equivocado, debe ser un real Ejemplo: -123.35 o 7,4 o 8"
          );
        },
        max25chars: (v) => v.length <= 25 || "Entrada de datos muy grande!",
      },
    };
  },
  created() {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("estacionoperacion")) {
      this.dataView.title = "Estación de operación"; 
    } 
    const user= this.$store.state.auth.user;
      this.user= {
        _id: user._id,
        username: user.username,
        emails: user.emails,
        profile: user.profile
      }
    this.initialize();
  },
  computed: {
    filteredConfigurations(){
      return true
    },
    filteredOperatingStations(){
      return true
    },
    headers() {
            return [
              {value: 'status.statusKey', text: 'Estatus', sortable: true},
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
  methods: {
    ...mapMutations('auth',['setUser']),
    showAlert(msg,a){
      if (event.target.classList.contains('btn__content')) return;
      alert(msg+'\n' + a);
    },
    loadingWorkstationList(){ 
      this.$loader.activate('Obteniendo lineas de produccion ...');
      Meteor.call('productionline.list',(error,response)=>{
        this.$loader.deactivate();
        if(error){
          this.$alert.showAlertSimple('error',error.error);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.productionLines=response.data;
        }
      });
    },
    initialize() {
      this.loadingWorkstationList();  
    },
    productionLineSelected(){
      this.configurations=[]
      this.configuration._id=null
      this.operatingstations=[]
      this.workstation._id=null
      this.operatingstations = this.productionline.workstations
      this.productionOrder();
    },
    operatingStationSelected(){
      this.configurations=[]
      this.configuration._id=null
      for(let i=0; i< this.operatingstations.length; i++){
        if (this.workstation._id == this.operatingstations[i]._id){
          this.configurations=this.operatingstations[i].configurations
          break
        }  
      }
      this.productionOrder();
    },
    configurationSelected(){
      // Actualizar lista de Ordenes de produccion
      //console.info("Actualizando la lista de estaciones")
      //console.info("this.productionline",this.productionline)
      //console.info("this.workstation", this.workstation)
      //console.info("this.configuration",this.configuration)
      this.productionOrder();
    },
    openViewProductionOrder(item) {
              //Aqui abrir la ventana emergente
              this.showAlert("Folio Num", item.folio)
              console.info("openViewProductionOrder",item)
    },
    clickProductOrderRow(item, row) {

      // Evento al hacer click sobre la lista de Ordenes de produccion
      // Seleccionar renglon
      // Al fijarlo estaremos evocando clickProductSelected(item)
      if (row.isSelected) {
        row.select(false);
      } else {
        row.select(true);
      }
    },
    clickProductOrderSelected(item) {
      
      console.info("clickProductSelected", item);
      // Si el item.value entonces agregar el producto en la lista
      if (item.value) {

      } else {
        
      }
     
    }

  },
  meteor:{
            $subscribe: {
              "production-orderByPL_WS_CONF": function(){
              return [this.productionline._id,this.workstation._id,this.configuration._id]
              },
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
  
};
</script>

<style scoped>
</style>