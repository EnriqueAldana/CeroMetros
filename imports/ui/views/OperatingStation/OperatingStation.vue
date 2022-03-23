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
                      <template v-slot:top>
                              <v-toolbar flat>
                                <v-toolbar-title>Acciones para Ordenes</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                
                                <v-dialog v-model="dialogStart" max-width="800px">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      color="primary"
                                      dark
                                      class="mb-2"
                                      v-bind="attrs"
                                      v-on="on"
                                      :disabled="isStart"
                                    >
                                      Iniciar
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title>
                                      <span class="text-h5">Iniciar la producción </span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <p class="text-center">Asegurese de tener la configuracion correcta de la estación</p>

                                          <v-col cols="24" sm="12" md="8">
                                            <p class="text-center">¿Está usted seguro de iniciar la operación?</p>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeStart">
                                        Cancelar
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="saveStart"
  
                                      >
                                        Aceptar
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogStop" max-width="800px">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      color="primary"
                                      dark
                                      class="mb-2"
                                      v-bind="attrs"
                                      v-on="on"
                                      :disabled="isStop"
                                    >
                                      Detener
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title>
                                      <span class="text-h5">Detener la producción </span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <p class="text-center">¿Está usted seguro de detener la operación?</p>

                                          <v-col cols="24" sm="12" md="8">
                                            <p class="text-center">Aqui una tabla o forma</p>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeStop">
                                        Cancelar
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="saveStop"
  
                                      >
                                        Aceptar
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogSupplies" max-width="800px">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      color="primary"
                                      dark
                                      class="mb-2"
                                      v-bind="attrs"
                                      v-on="on"
                                      :disabled="isSupplies"
                                      
                                    >
                                      Solicitar insumos
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title>
                                      <span class="text-h5">Solicitar insumos</span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <p class="text-center">Insumos</p>

                                          <v-col cols="24" sm="12" md="8">
                                            <v-data-table
                                              v-model="suppliesSelected"
                                              :headers="headersSupplies"
                                              :items="supplies"
                                              :single-select=false
                                              show-select
                                              item-key="name"
                                              class="elevation-1"
                                              :search="searchSupply"
                                            >
                                              <template v-slot:top>
                                                <v-text-field
                                                  v-model="searchSupply"
                                                  label="Buscar..."
                                                  append-icon="mdi-magnify"
                                                  single-line
                                                  hide-details
                                                  class="mx-4"
                                                ></v-text-field>
                                              </template>

                                              
                                            </v-data-table>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeSupplies">
                                        Cancelar
                                      </v-btn>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="saveSupplies"
                                        :disabled="isSuppliesButtonDisabled"
                                        
                                      >
                                        Solicitar
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-toolbar>
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
      isStart:true,
      isStop: true,
      isSupplies: true,
      dialogStart: false,
      dialogStop: false,
      dialogSupplies: false,
      suppliesSelected: [],
      supplies:[],
      isSuppliesButtonDisabled:false,
      searchSupply: "",
      
      dataView: {
        title: "",
        targetButton: "",
      },
      headersSupplies: [
        { text: "Cantidad", value: "amount" },
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Unidad", value: "unit.name" },
        { text: "SKU", value: "sku" },
      ],
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
    initializeBtns(){
      console.info("Entrando en initializeBtns")
      this.isStart=true
      this.isStop= true
      this.isSupplies= true
      this.isSuppliesButtonDisabled=false
    },
    productionLineSelected(){
      console.info("Entrando en seleccion de linea de PRD")
      this.selectedProductionOrder=[]
      this.initializeBtns();
      this.configurations=[]
      this.configuration._id=null
      this.operatingstations=[]
      this.workstation._id=null
      this.operatingstations = this.productionline.workstations
      this.productionOrder();
      
    },
    operatingStationSelected(){
      this.initializeBtns();
      this.selectedProductionOrder=[]
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
      this.initializeBtns();
      this.selectedProductionOrder=[]
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
        // deshabilitar botones
        this.isStart=true;
        this.isStop=true;
       // Mandar estatus de maquina parada

       this.isSupplies=true
      } else {
        row.select(true);
        // Aqui leer el estatus de la maquina para la Orden
        this.isStart=false;
        this.isStop= true;
        this.isSupplies=false;
      }
    },
    clickProductOrderSelected(item) {
      
      console.info("clickProductSelected", item);
      // Si el item.value entonces activar botones
      if (item.value) {
        // Aqui tomar los insumos del item
        this.getSupplies(item);
        // Aqui leer estatus de la estacion para la Orden
        this.isStart=false;
        this.isStop= true;
        this.isSupplies=false;
        
      } else {
        this.isStart=true;
        this.isStop=true;
        this.isSupplies=true;
        // vaciar suministros
        this.supplies=[]
      }

      
     
    },
    closeStart() {
      this.dialogStart = false;
      this.$nextTick(() => {
        // Hacer algo si se requiere
      });
    },
    saveStart() {
      // Aqui salvar tabla o forma del boton arrancar
      this.dialogStart = false;
      // Deshabilitar boton star
      this.isStart=true;
      // Habilitar boton Stop
      this.isStop=false;
      this.$nextTick(() => {
        // Hacer algo si se requiere
      });
    },
    closeStop(){
      this.dialogStop= false;
    },
    saveStop(){
      this.dialogStop= false;
      // Habilitar boton star
      this.isStart=false;
      // DesHabilitar boton Stop
      this.isStop=true;
    },
    closeSupplies(){
      this.dialogSupplies=false;
    },
    saveSupplies(){
      this.dialogSupplies=false;
      // Generar las solicitudes agregando los campos a warehouse
      
      // amountRequested,requestedDate, productionOrderId, productionOrderFolio,
      
      console.info("Suministros",this.supplies)
      console.info("suppliesSelected", this.suppliesSelected)
      let  selectedSupplies=[]
      for (let i=0; i< this.suppliesSelected.length; i++){
        selectedSupplies.push(
          {
                    _id:this.suppliesSelected[i]._id,
                    amountRequested: this.suppliesSelected[i].amount,
                    productId:this.suppliesSelected[i].productId,
                    workstationId: this.suppliesSelected[i].workstationId,
                    configurationId: this.suppliesSelected[i].configurationId,
                    requestedDate: Date(),
                    productionOrderId: this.selectedProductionOrder[0]._id,
                    productionOrderFolio: this.selectedProductionOrder[0].folio,
                   }
        );
      }
       

      
      const suppliedSelected= {productionOrderId:this.selectedProductionOrder[0]._id,selectedSupplies}
      this.$loader.activate("Solicitando insumos...");
      
      // Aqui mandar actualizar informacion de los insumos del producto de la Orden de produccion

      Meteor.call("productionorder.request.supplies", {suppliedSelected}, (error, response) => {
        this.$loader.deactivate();
        
        if (error) {
          this.$alert.showAlertSimple("error", error.reason);
        } else {
          if(response.data.tipoMsg==='warning'){
            this.$alert.showAlertSimple("warning", response.message);
          }else{
            this.$alert.showAlertSimple("success", response.message); 
            //desactivar boton de solicitar
            this.isSuppliesButtonDisabled=true;
            
          }

          console.warn('response',response)
          
          
          
        }
      });
    },
    getSupplies(item){
      //console.info("ITEM",item)
      //console.info("item.products", item.item.products)
      //console.info("item.products.length", item.item.products.length)
      let productAmount=0
      let componentAmount=0
      for(let i=0; i< item.item.products.length; i++){
        productAmount=0
        for(let j=0; j<item.item.products[i].components.length; j++){
            componentAmount=0
            if(
              item.item.products[i].production_line._id===this.productionline._id
              &&
              item.item.products[i].components[j].workstationId===this.workstation._id
              &&
              item.item.products[i].components[j].configurationId===this.configuration._id 
              
              ){
                productAmount=parseFloat(item.item.products[i].amount) 
                componentAmount=parseFloat(item.item.products[i].components[j].amount)   
                item.item.products[i].components[j].amount= componentAmount * productAmount 
                Object.assign(item.item.products[i].components[j],{"productId":item.item.products[i]._id});
                this.supplies.push(item.item.products[i].components[j]);
            }  
        }
      }
      
      
    },

  },
  watch: {
    dialogStart(val) {
      val || this.closeStart();
    },
    dialogStop(val){
      val || this.closeStop();
    },
    dialogSupplies(val) {
      val || this.closeSupplies();
    },
    
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

