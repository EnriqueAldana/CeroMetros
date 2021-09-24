<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{ dataView.title }}</div>
      </v-col>
      <v-col cols="2">
        <v-btn
          block
          type="submit"
          form="saveProduct"
          color="primary"
          v-text="dataView.targetButton"
        >
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form
              @submit.prevent="saveProduct"
              id="saveProduct"
              autocomplete="off"
              v-scroll.self="onScroll"
              class="overflow-y-auto"
              max-height="600"
            >
              <v-row>
                <v-col xs="18" sm="18" md="14">
                  <v-text-field
                    v-model="product.name"
                    id="inputName"
                    name="name"
                    :rules="[rules.required, rules.counter]"
                    label="Nombre"
                    counter
                    maxlength="20"
                  ></v-text-field>

                  <v-text-field
                    v-model="product.name_full"
                    id="inputNameFull"
                    name="name_full"
                    :rules="[rules.required]"
                    label="Nombre completo"
                  >
                  </v-text-field>

                  <v-select
                    v-model="product.unit"
                    id="selectUnit"
                    name="unit"
                    :items="units"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="_id"
                    return-object
                    label="Unidad de medida"
                  >
                  </v-select>

                  <v-text-field
                    v-model="product.stock"
                    id="inputStock"
                    name="stock"
                    label="Existencia"
                    :rules="[rules.required, rules.number, rules.greatEqualZero]"
                  ></v-text-field>

                  <v-text-field
                    v-model="product.location"
                    id="inputlocation"
                    name="location"
                    label="Ubicacion"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="product.sku"
                    id="inputsku"
                    :rules="[rules.required]"
                    name="sku"
                    label="SKU"
                  >
                  </v-text-field>
                  <v-select
                    v-model="product.warehouse"
                    id="selectWarehouse"
                    name="warehouse"
                    :items="warehouses"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="_id"
                    return-object
                    label="Almacen"
                  >
                  </v-select>
                  <v-select
                    v-model="product.provider"
                    id="selectProvider"
                    name="provider"
                    :items="providers"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="_id"
                    return-object
                    label="Proveedor"
                  >
                  </v-select>
                  <v-select
                    v-model="product.production_line"
                    id="selectProductionLine"
                    :rules="[rules.required]"
                    name="productionline"
                    :items="production_lines"
                    item-text="name"
                    item-value="_id"
                    return-object
                    label="Linea de produccion"
                    @change="productionLineSelected"
                  >
                  </v-select>

                  <v-switch
                    v-model="product.isAvailable"
                    label="¿Habilitar producto?"
                    color="indigo"
                    hide-details
                  ></v-switch>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <p class="text-center">Configuración de componentes</p>
                  <v-row>
                    <v-col xs="8" sm="8" md="4">
                      <p class="text-center">Estaciones de trabajo</p>
                      <v-data-table
                        v-model="this.product.production_line.workstations"
                        :headers="headersWorkStations"
                        :items="this.product.production_line.workstations"
                        show-select
                        :single-select="true"
                        item-key="name"
                        class="elevation-1"
                        :search="searchWorkStation"
                        @click:row="clickWorkStationRow"
                        @item-selected="clickWorkStationSelected"
                      >
                        <template v-slot:top>
                          <v-text-field
                            v-model="searchWorkStation"
                            label="Buscar..."
                            append-icon="mdi-magnify"
                            single-line
                            hide-details
                            class="mx-4"
                          ></v-text-field>
                        </template>
                      </v-data-table>
                    </v-col>
                    <v-col xs="16" sm="16" md="8">
                      <p class="text-center">Componentes</p>
                      <template>
                        <v-data-table
                          :headers="headersComponents"
                          :items="componentsByWorkStation"
                          sort-by="name"
                          class="elevation-1"
                        >
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-toolbar-title
                                >Lista de componentes del
                                producto</v-toolbar-title
                              >
                              <v-divider
                                class="mx-4"
                                inset
                                vertical
                              ></v-divider>
                              <v-spacer></v-spacer>
                              <v-dialog v-model="dialog" max-width="800px">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    :disabled="areThereWorkstations"
                                  >
                                    Agregar componente
                                  </v-btn>
                                </template>

                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <p class="text-center">Insumos</p>

                                        <v-col cols="24" sm="12" md="8">
                                          <v-data-table
                                            v-model="editedComponent"
                                            :headers="headersSupplies"
                                            :items="supplies"
                                            single-select="false"
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

                                            <template
                                              v-slot:item.amount="props"
                                            >
                                              <v-edit-dialog
                                                :return-value.sync="
                                                  props.item.amount
                                                "
                                                large
                                                persistent
                                                @save="
                                                  saveComponentSelected(props)
                                                "
                                                @cancel="
                                                  cancelComponentSelected(props)
                                                "
                                                @open="
                                                  openComponentSelected(props)
                                                "
                                                @close="
                                                  closeComponentSelected(props)
                                                "
                                              >
                                                <div>
                                                  {{ props.item.amount }}
                                                </div>
                                                <template v-slot:input>
                                                  <div class="mt-4 text-h6">
                                                    Actualiza Cant
                                                  </div>
                                                  <v-text-field
                                                    v-model="props.item.amount"
                                                    :rules="[
                                                      rules.required,
                                                      rules.greatZero,
                                                      rules.number,
                                                    ]"
                                                    label="Edicion"
                                                    single-line
                                                    counter
                                                    autofocus
                                                  ></v-text-field>
                                                </template>
                                              </v-edit-dialog>
                                            </template>
                                          </v-data-table>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="close"
                                    >
                                      Cancelar
                                    </v-btn>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="save"
                                      :disabled="isAddComponentButtonDisabled"
                                    >
                                      Agregar
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog
                                v-model="dialogDelete"
                                max-width="500px"
                              >
                                <v-card>
                                  <v-card-title class="text-h5"
                                    >¿Está Ud. seguro que desea eliminar el
                                    componente?</v-card-title
                                  >
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="closeDelete"
                                      >Cancelar</v-btn
                                    >
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="deleteItemConfirm"
                                      >Eliminar</v-btn
                                    >
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-toolbar>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                              mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                              mdi-delete
                            </v-icon>
                          </template>
                        </v-data-table>
                        <v-snackbar
                          v-model="snack"
                          :timeout="3000"
                          :color="snackColor"
                        >
                          {{ snackText }}

                          <template v-slot:action="{ attrs }">
                            <v-btn v-bind="attrs" text @click="snack = false">
                              Cerrar
                            </v-btn>
                          </template>
                        </v-snackbar>
                      </template></v-col
                    ></v-row
                  ></v-col
                ></v-row
              ></v-form
            ></v-card-text
          ></v-card
        ></v-col
      ></v-row
    ></v-container
  >
</template>
                    </v-col>
                  </v-row>
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
import { WarehouseRepository } from "../../../api/Warehouses/Warehouse";
import { ProductionLineRepository } from "../../../api/ProductionLines/ProductionLine";
import { Provider } from "../../../api/Providers/Provider";
import { UnitOfMeasurementRepository } from "../../../api/UnitOfMeasurement/UnitOfMeasurement";
import { Supplies } from "../../../api/Supplies/Supplies";
let id = 3;
export default {
  name: "SaveProduct",

  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      searchWorkStation: "",
      searchComponent: "",
      searchSupply: "",
      workstationOfComponent: {
        workstation: {},
      },
      componentsByProductOld: [],
      componentsByWorkStation: [],
      componentsByProduct: [],
      componentsByProductIndex: 0,
      editedWorkStation: [],
      editedWorkstationIndex: -1,
      dialog: false,
      dialogDelete: false,
      areThereWorkstations: true,
      isAddComponentButtonDisabled: true,
      headersComponents: [
        {
          text: "Nombre del componente",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Cantidad",
          align: "center",
          sortable: true,
          value: "amount",
        },
        {
          text: "Unidad",
          align: "center",
          sortable: true,
          value: "unit.name",
        },
        {
          text: "SKU",
          align: "start",
          sortable: true,
          value: "sku",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ],
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
      editedComponentIndex: -1,
      editedComponent: [],
      defaultComponent: {
        _id: "",
        name: "",
        name_full: "",
        unit: {
          _id: "",
          name: "",
          symbol: "",
        },
        amount: 0,
        location: "",
        sku: "",
        warehouse: {
          _id: "",
          location: "",
          name: "",
          name_full: "",
        },
        provider: {
          _id: "",
          name: "",
        },
        isAvailable: true,
        workstationId: "",
      },
      component: {
        _id: "",
        name: "",
        name_full: "",
        unit: {
          _id: "",
          name: "",
          symbol: "",
        },
        amount: 0,
        location: "",
        sku: "",
        warehouse: {
          _id: "",
          location: "",
          name: "",
          name_full: "",
        },
        provider: {
          _id: "",
          name: "",
        },
        isAvailable: true,
        workstationId: "",
      },
      singleSelect: false,
      id,
      product: {
        _id: null,
        name: "",
        name_full: null,
        unit: {
          _id: null,
          name: null,
          symbol: null,
        },
        stock: 0.0,
        provider: {
          _id: null,
          name: null,
        },
        location: null,
        sku: null,
        warehouse: {
          _id: null,
          name: null,
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
                description: null,
                name: null,
                _id: null,
              },
            },
          ],
        },
        components: [],
        isAvailable: false,
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
      dataView: {
        title: "",
        targetButton: "",
      },
    };
  },
  created() {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado

    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear producto";
      this.dataView.targetButton = "Crear";
      // Inicializar datos por defecto.
      this.initializeByDefault();
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar producto";
      this.dataView.targetButton = "Actualizar";

      const tempProduct = this.$store.state.temporal.element;
      console.info("tempProduct", tempProduct);
      this.product = {
        _id: tempProduct._id,
        name: tempProduct.name,
        name_full: tempProduct.name_full,
        unit: tempProduct.unit,
        stock: tempProduct.stock,
        sku: tempProduct.sku,
        location: tempProduct.location,
        warehouse: tempProduct.warehouse,
        provider: tempProduct.provider,
        isAvailable: tempProduct.isAvailable,
        production_line: tempProduct.production_line,
        components: tempProduct.components,
      };

      this.initialize();
    }
  },
  methods: {
    initializeByDefault() {
      console.info("Producto al iniciar la creacion ", this.product);
      // inicializar estaciones de trabajo a vacio
      this.product.components = [];
      // Inicializar estaciones de trabajo
      this.product.production_line.workstations = [];
      this.editedComponent = Object.assign({}, this.defaultComponent);
      this.editedComponentIndex = -1;
      this.componentsByProductIndex = 0;
    },
    initialize() {
      //console.info("Producto al iniciar la Edicion ", this.product);
      //Cargar componentes en funcion d e estaciones de trabajo seleccionadas
      this.componentsByProduct = this.product.components;
      // Sin filtro asumiendo todas las estaciones de trabajo seleccionadas
      this.componentsByWorkStation = this.product.components;
      this.componentsByProductIndex = this.product.components.length;
    },
    clickWorkStationRow(item, row) {
      // Evento al hacer click sobre la lista de estaciones de trabajo
      // Seleccionar renglon
      if (row.isSelected) {
        row.select(false);
        // Deshabilitar boton agregar componentes
        this.areThereWorkstations = true;
        this.editedWorkstationIndex = -1;
      } else {
        row.select(true);
        // habilitar boton agregar componentes
        this.areThereWorkstations = false;
        this.editedWorkstationIndex = row.index;
      }
    },
    clickWorkStationSelected(item) {
      //console.info("Item seleccionado en casilla ", item);
      //console.info("Item seleccionado en casilla valor ", item.value);
      if (item.value) {
        // habilitar boton agregar componentes
        this.areThereWorkstations = false;
        // Buscar el indice del seleccionado
        this.editedWorkstationIndex =
          this.product.production_line.workstations.indexOf(item.item);
      } else {
        // Deshabilitar boton agregar componentes
        this.areThereWorkstations = true;
        this.editedWorkstationIndex = -1;
      }
    },
    FilteredComponents() {
      if (this.editedWorkstationIndex > -1) {
        //console.info("Componentes del producto antes de filtrar", this.componentsByProduct);
        //console.info("Name de estacion seleccionada", this.workstation._id)
        return this.componentsByProduct.filter((i) => {
          //console.info("Name iterado", i.workstationId)
          //console.info("Name estacio", this.workstation._id)
          return i.workstationId === this.workstation._id;
        });
      }
    },
    editItem(item) {
      console.info("Item seleccionado para edicion", item);
      this.editedComponentIndex = this.componentsByProduct.indexOf(item);
      console.info("Indice del componente editado ", this.editedComponentIndex);
      this.editedComponent = Object.assign({}, this.defaultComponent);
      console.info("Compornente del producto por editar " , this.componentsByProduct[this.editedComponentIndex])
      Object.assign(this.editedComponent, this.componentsByProduct[this.editedComponentIndex]);
      //this.editedComponent[0].amount=item.amount;
      console.info("Componente por editar",this.editedComponent)
      // Filtrar suministros y solo dejar el editado
      this.searchSupply = item.name;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedComponentIndex = this.product.components.indexOf(item);
      this.editedComponent = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.componentsByProduct.splice(this.editedComponentIndex, 1);
      this.componentsByWorkStation = this.FilteredComponents();
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedComponent = Object.assign({}, this.defaultComponent);
        this.editedComponentIndex = -1;
        this.searchSupply = "";
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedComponent = Object.assign({}, this.defaultComponent);
        this.editedComponentIndex = -1;
      });
    },

    save() {
      // Si hay seleccionada una estacion de trabajo
     console.info("this.editedWorkstationIndex", this.editedWorkstationIndex);
      if (this.editedWorkstationIndex > -1) {
        // Si se ha seleccionado un suministro
        console.info("Componente por agregar ", this.editedComponent);
        if (this.editedComponent[0]) {
          Object.assign(this.component, this.editedComponent[0]);
          this.component.workstationId = this.workstation._id;
          // Si es una edicion
          console.info("this.editedComponentIndex", this.editedComponentIndex);
          if (this.editedComponentIndex > -1) {
            console.info("Insumo x actualizar",this.editedComponent[0])
            //console.info("Actualizando componente");
            //console.info(
            //  "Componente del producto x actualizar",
            //  this.componentsByProduct[this.editedComponentIndex]
            //);
            // Actualizar el campo de amount del componente editado
            // Se actualiza en this.componentsByProduct el componente en el indice editedComponentIndex
            this.componentsByProduct[this.editedComponentIndex].amount =
              this.component.amount;
            
            // Liberar filtro de suministros
            this.searchSupply = "";
          } else {
            // Agregar componente solo si amount >0
            if (this.component.amount > 0) {
              console.info("Agregando componente");
              //Se agrega el componente a la lista this.componentsByProduct en el siguiente indice this.componentsByProductIndex
              this.$set(
                this.componentsByProduct,
                this.componentsByProductIndex,
                this.component
              );
              this.componentsByProductIndex = this.componentsByProductIndex + 1;
            }
          }
          this.component = Object.assign({}, this.defaultComponent);
          this.editedComponent = Object.assign({}, this.defaultComponent);
          console.info("Componente seleccionado reestablecido", this.editedComponent)
          this.editedComponentIndex = -1;
          this.componentsByWorkStation = this.FilteredComponents();
        }
      }

      this.close();
    },
    productionLineSelected() {
      // Evento invocado cuando seleccionamos una linea de produccion
      // Habilitar boton agregar componentes
      // this.areThereWorkstations = true;
      // Aqui se ha fijado la linea de produccion y con ello las estaciones cambiaron
      // Por defecto se hay mmarcado seleccionadas y se debe cargar los componentes
      this.product.components = [];
      this.componentsByProduct = this.product.components;
      // Sin filtro asumiendo todas las estaciones de trabajo seleccionadas
      this.componentsByWorkStation = this.product.components;
    },
    saveProduct() {
      this.product.components = this.componentsByProduct;
      console.info("Componentes del producto", this.product.components);
      this.$loader.activate("Guardando producto...");

      Meteor.call("product.save", this.product, (error, response) => {
        this.$loader.deactivate();
        if (error) {
          this.$alert.showAlertSimple("error", error.reason);
        } else {
          this.$alert.showAlertSimple("success", response.message);
          this.$router.push({ name: "home.products" });
        }
      });
    },
    saveComponentSelected(props) {
      //console.info("Item saveComponentSelected", props);
      //console.info("props.value", props.value);
      let num = parseFloat(props.item.amount);
      console.info("num", num);
      if (num > 0) {
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "Componente salvado";
        // Habilitar boton de guardar
        this.isAddComponentButtonDisabled = false;
      } else {
        this.isAddComponentButtonDisabled = true;
        this.snack = true;
        this.snackColor = "error";
        this.snackText = "La cantidad debe ser mayor a cero";
        // Deshabilitar boton de guardar
        this.isAddComponentButtonDisabled = true;
      }
    },
    cancelComponentSelected(props) {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Componente cancelado";
    },
    openComponentSelected(props) {
      console.info("Item openComponentSelected", props);
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Editando...";
    },
    closeComponentSelected(props) {
      console.info("Item closeComponentSelected", props);
      console.log("Edicion cerrada...");
    },
  },

  computed: {
    formTitle() {
      return this.editedComponentIndex === -1
        ? "Agregar componente"
        : "Editar componente";
    },
    headersWorkStations() {
      return [
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          sort: true,
          value: "name",
        },
        {
          text: "Ubicacion",
          align: "start",
          sortable: true,
          value: "location",
        },
      ];
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    editedWorkstationIndex(val) {
      //console.info("Valor de cambio de editedWorkstationIndex ",val )
      this.workstation = this.product.production_line.workstations[val];
      //console.info("Workstation actualmente seleccionada", this.workstation);
      this.componentsByWorkStation = this.FilteredComponents();
    },
  },
  meteor: {
    $subscribe: {
      "productionlines.list": [],
      "warehouse.list": [],
      "provider.list": [],
      "unitofmeasurement.list": [],
      "supply.list": [],
    },
    production_lines() {
      return ProductionLineRepository.find(
        {},
        { fields: { _id: 1, name: 1, description: 1, workstations: 1 } }
      ).fetch();
    },
    warehouses() {
      const warehouses = WarehouseRepository.find(
        {},
        { fields: { _id: 1, name: 1, name_full: 1, location: 1 } }
      ).fetch();
      //console.info('Almacenes',warehouses);
      return warehouses;
    },
    providers() {
      return Provider.find({}, { fields: { _id: 1, name: 1 } }).fetch();
    },
    units() {
      return UnitOfMeasurementRepository.find(
        {},
        { fields: { _id: 1, name: 1, symbol: 1 } }
      ).fetch();
    },
    supplies() {
      const supplyList = Supplies.find(
        {},
        {
          fields: {
            isAvailable: 1,
            name: 1,
            name_full: 1,
            stock: 1,
            unit: 1,
            sku: 1,
            location: 1,
            provider: 1,
            warehouse: 1,
          },
        }
      ).fetch();
      // Agregar un campo llamado amount iguala cero
      const supplyListAdded = supplyList.map((doc) => {
        doc.amount = 0;
        return doc;
      });
      return supplyListAdded;
    },
  },
};
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