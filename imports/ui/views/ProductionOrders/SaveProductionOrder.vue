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
          form="saveProductionOrder"
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
              @submit.prevent="saveProductionOrder"
              id="saveProductionOrder"
              autocomplete="off"
              v-scroll.self="onScroll"
              class="overflow-y-auto"
              max-height="600"
            >
              <v-row>
                    <v-col md="6">
                                <v-autocomplete
                          v-model="productionOrder.customer"
                          clearable
                          id="selectCustomer"
                          name="customer"
                          :items="customers"
                          :rules="[rules.required]"
                          item-text="name"
                          item-value="_id"
                          return-object
                          label="Cliente"
                        ></v-autocomplete>
                    </v-col>
                    <v-col md="6">
                        <v-menu
                          v-model="menuCalendar"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="computedDateFormatted"
                              label="Fecha solicitada por el cliente"
                              hint="Formato dd/MM/YYYY"
                              persistent-hint
                              prepend-icon="mdi-calendar"
                             readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            no-title
                            @input="menuCalendar = false"
                          ></v-date-picker>
                        </v-menu>  
                    </v-col>
              </v-row>
              <v-row>
                <v-col xs="18" sm="18" md="14">


                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        value=""
                        v-model="productionOrder.notes"
                        id="inputNotes"
                        name="notes"
                        label="Notas"
                        counter
                        :rules="[rules.max1250chars]" 
                      ></v-textarea>

                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <p class="text-h5 text-center">Lista de productos</p>
                  <template>
                    <v-data-table
                      v-model="selectedProducts"
                      :headers="headers"
                      :items="products"
                      :single-select="false"
                      item-key="name"
                      show-select
                      class="elevation-1"
                      :search="searchProduct"
                      @click:row="clickProductRow"
                      @item-selected="clickProductSelected"
                    >
                      <v-spacer></v-spacer>
                      <template v-slot:top>
                        <v-text-field
                          v-model="searchProduct"
                          label="Buscar..."
                          append-icon="mdi-magnify"
                          single-line
                          hide-details
                          class="mx-4"
                        ></v-text-field>
                      </template>

                      <template v-slot:item.amount="props">
                        <v-edit-dialog
                          :return-value.sync="props.item.amount"
                          large
                          persistent
                          @save="saveProductSelected(props)"
                          @cancel="cancelProductSelected(props)"
                          @open="openProductSelected(props)"
                          @close="closeProductSelected(props)"
                        >
                          <div>
                            {{ props.item.amount }}
                          </div>
                          <template v-slot:input>
                            <div class="mt-4 text-h6">Actualiza Cant</div>
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
                  </template>
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
import { Customer } from "../../../api/Customers/Customer";
import { Product } from "../../../api/Products/Product";

let id = 3;
export default {
  name: "SaveProductionOrder",
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menuCalendar: false,
      productionOrderIsNew: true,
      productionOrder: {
        _id: null,
        folio: "",
        createdAt: Date,
        editedAt: Date,
        requiredDate: Date,
        estimatedDeliveryAt: Date,
        customer: {},
        notes: "",
        products: [],
      },
      selectedProducts: [],
      selectedProductIndex: -1,
      snack: false,
      snackColor: "",
      snackText: "",
      headers: [
        { text: "Cantidad", value: "amount" },
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Nombre Completo",
          align: "start",
          sortable: true,
          value: "name_full",
        },
        {
          text: "UM",
          align: "start",
          sortable: true,
          value: "unit.symbol",
        },
        {
          text: "Existencia",
          align: "start",
          sortable: true,
          value: "stock",
        },
        {
          text: "Ubicacion",
          align: "start",
          sortable: true,
          value: "location",
        },
        {
          text: "SKU",
          align: "start",
          sortable: true,
          value: "sku",
        },
        {
          text: "Almacen",
          align: "start",
          sortable: true,
          value: "warehouse.name",
        },
        {
          text: "Line Produccion",
          align: "start",
          sortable: true,
          value: "production_line.name",
        },
      ],
      searchProduct: "",
      rules: {
        required: (value) => !!value || "Requerido.",
        greatZero: (value) => value > 0 || "Inserte valor mayor a cero",
        greatEqualZero: (value) =>
          value >= 0 || "Inserte valor igual o mayor a cero",
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
        max1250chars: (v) => v.length <= 1250 || "Maximo 1250 caracteres!",
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
      this.dataView.title = "Crear orden de produccion";
      this.dataView.targetButton = "Crear";
      // Inicializar datos por defecto.
      this.initializeByDefault();
    } else if (this.$router.currentRoute.name.includes("edit")) {
      const tempProductionOrder = this.$store.state.temporal.element;
      this.productionOrder = {
        _id: tempProductionOrder._id,
        folio: tempProductionOrder.folio,
        requiredDate: tempProductionOrder.requiredDate,
        customer: tempProductionOrder.customer,
        notes: tempProductionOrder.notes,
        products: tempProductionOrder.products,
        status: tempProductionOrder.status,
        
      };
      this.dataView.title = "Editar orden de produccion " + this.productionOrder.folio;
      this.dataView.targetButton = "Actualizar";
      this.productionOrderIsNew= false;
      this.initialize();
    }
  },
  methods: {
    isNumeric: function (n) {
    return !isNaN(parseFloat(n));
  },
  wrongNumber: function (num) {
    return this.isNumeric(num) === false
  },
  formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
  parseDate (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    initializeByDefault() {
      this.selectedProducts = [];
      this.productionOrder.products = [];
      this.selectedProductIndex = -1;
      this.productionOrder.status.statusDate = new Date();
      this.productionOrder.status.statusKey = "INI";
      this.statusDescription = "Estatus inicial ";
      this.statusOrigin = "Pantalla de creacion de la orden de produccion";
    },
    initialize() {
      // Fix required date
      const parsedDate= this.parseDate(this.productionOrder.requiredDate)
      this.date=parsedDate
      // Fijar productos seleccionados y mostrar la cantidad.
      this.selectedProducts=this.productionOrder.products
      console.info("this.selectedProducts",this.selectedProducts)

    },
    clickProductRow(item, row) {

      // Evento al hacer click sobre la lista de estaciones de trabajo
      // Seleccionar renglon
      // Al fijarlo estaremos evocando clickProductSelected(item)
      if (row.isSelected) {
        row.select(false);
      } else {
        row.select(true);
      }
    },
    clickProductSelected(item) {
      // Obtener el indice
      this.selectedProductIndex = this.productionOrder.products.findIndex(
        (producto) => {
          return producto._id === item.item._id;
        }
      );

      console.info("Indice del producto", this.selectedProductIndex);
      // Si el item.value entonces agregar el producto en la lista
      if (item.value) {

        // AQUI creamos una copia
        var copia = Object.assign({}, item.item);
        this.productionOrder.products.push(copia);
      } else {
        if (this.selectedProductIndex > -1) {
          // Removerlo de la lista
          this.productionOrder.products.splice(this.selectedProductIndex, 1);
        }
      }
      //console.info("Productos de la orden ", this.productionOrder.products);
      //console.info("Productos seleccionados",this.selectedProducts)
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.searchProduct = "";
      });
    },
    saveProductionOrder() {
  
      this.$loader.activate("Guardando orden de compra...");

      Meteor.call(
        "production-order.save",
        this.productionOrder,
        (error, response) => {
          this.$loader.deactivate();
          if (error) {
            this.$alert.showAlertSimple("error", error.reason);
          } else {
            this.$alert.showAlertSimple("success", response.message);
            this.$router.push({ name: "home.productionorders" });
          }
        }
      );
    },
    saveProductSelected(props) {
    
      // Solo los que esten seleccionados
      if (this.selectedProductIndex > -1){
         if(this.wrongNumber(props.item.amount)){
          this.productionOrder.products[this.selectedProductIndex].amount=0;
        }else{
          const num = parseFloat(props.item.amount);
          this.productionOrder.products[this.selectedProductIndex].amount=num; 
        }
      } 
      
    },
    cancelProductSelected(props) {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Producto cancelado";
    },
    openProductSelected(props) {
      this.selectedProductIndex=this.productionOrder.products.findIndex(
        (producto) => {
          return producto._id === props.item._id;
        }
      );
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Editando...";
    },
    closeProductSelected(props) {
      //console.info("Item closeComponentSelected", props);
      //console.log("Edicion cerrada...");
    },
  },
  computed: {
    
    formTitle() {
      return this.editedComponentIndex === -1
        ? "Agregar orden de produccion"
        : "Editar orden de produccion";
    },
    computedDateFormatted () {
      this.productionOrder.requiredDate= this.dateFormatted
        return this.productionOrder.requiredDate
      },
  },
  watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
        this.productionOrder.requiredDate= this.dateFormatted
      },
    },
  meteor: {
    $subscribe: {
      "customer.list": [],
      "product.list": [],
    },
    customers() {
      const customerList = Customer.find(
        {},
        {
          fields: {
            _id: 1,
            name: 1,
            name_full: 1,
            customerBussinessId: 1,
            address: 1,
            phones: 1,
            web: 1,
            email: 1,
            isAvailable: 1,
          },
        }
      ).fetch();
      return customerList;
    },
    products() {
      const productList = Product.find(
        {},
        {
          isAvailable: 1,
          name: 1,
          name_full: 1,
          unit: 1,
          stock: 1,
          location: 1,
          sku: 1,
          warehouse: 1,
          production_line: 1,
        }
      ).fetch();
      // Agregar un campo llamado amount iguala cero
      const productListAdded = productList.map((doc) => {
        if (this.productionOrderIsNew){
            doc.amount = 0;
        }else{
            this.selectedProducts.filter(p =>{
                  if(doc._id === p._id ){
                    doc.amount = p.amount
                  }else{
                    doc.amount = 0;
                  }
            })
        }
        return doc;
      });
      return productListAdded;
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