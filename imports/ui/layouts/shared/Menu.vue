<template>
<v-card
          class="mx-auto"
          max-width="400"
          >
<v-list>
      <v-list-item-group
        v-model="model"
        mandatory
        color="indigo"
      >
        <v-list-item :to="{name:'home'}">
          <v-list-item-icon>
            <v-icon >mdi-desktop-mac-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Tablero</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="validatePermission('message-view')" :to="{name:'home.chat'}">
          <v-list-item-icon>
            <v-icon >mdi-chat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

            <v-expansion-panels>
                <v-expansion-panel
                >
                <v-expansion-panel-header>
                  Catálogos
                  <template v-slot:actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                      <v-list-item v-if="validatePermission('users-view')" :to="{name:'home.users'}">
                        <v-list-item-icon>
                          <v-icon >mdi-human-queue</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Usuarios</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                    <v-list-item v-if="validatePermission('profiles-view')" :to="{name:'home.profiles'}">
                        <v-list-item-icon>
                          <v-icon >mdi-account-lock</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Perfiles</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('companies-view')" :to="{name:'home.companies'}">
                        <v-list-item-icon>
                          <v-icon >mdi-factory</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Empresas</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('customers-view')" :to="{name:'home.customers'}">
                        <v-list-item-icon>
                          <v-icon >mdi-cart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Clientes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('providers-view')" :to="{name:'home.providers'}">
                        <v-list-item-icon>
                          <v-icon >mdi-ship-wheel</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Proveedores</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('productionlines-view')" :to="{name:'home.productionlines'}">
                        <v-list-item-icon>
                          <v-icon >mdi-map-marker-path</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Lineas de producción</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('products-view')" :to="{name:'home.products'}">
                        <v-list-item-icon>
                          <v-icon >mdi-gift</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Productos</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('supplies-view')" :to="{name:'home.supplies'}">
                        <v-list-item-icon>
                          <v-icon >mdi-truck</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Suministros</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('warehouses-view')" :to="{name:'home.warehouses'}">
                        <v-list-item-icon>
                          <v-icon >mdi-warehouse</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Almacenes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('workstations-view')" :to="{name:'home.workstations'}">
                        <v-list-item-icon>
                          <v-icon >mdi-wrench</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Estaciones de trabajo</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('workstationsetup-view')" :to="{name:'home.workstationconfiguration'}">
                        <v-list-item-icon>
                          <v-icon >mdi-keyboard-settings</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Config. Est. de trabajo</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="validatePermission('unitofmeasurement-view')" :to="{name:'home.unitsofmeasurement'}">
                        <v-list-item-icon>
                          <v-icon >mdi-ruler</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Unidades de medida</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- Segundo Acordeon llamado OPERACION -->
              <v-expansion-panel
              >
                <v-expansion-panel-header>
                  Operación
                  <template v-slot:actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                      <v-list-item v-if="validatePermission('productionorders-view')" :to="{name:'home.productionorders'}">
                        <v-list-item-icon>
                          <v-icon >mdi-hammer-wrench</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Ordenes de producción</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item v-if="validatePermission('operatingstation-view')" :to="{name:'home.estacionoperacion'}">
                        <v-list-item-icon>
                          <v-icon >mdi-pickaxe</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Estacion de operación</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Segundo Acordeon llamado OPERACION -->
              <v-expansion-panel
              >
                <v-expansion-panel-header>
                  Reportes
                  <template v-slot:actions>
                    <v-icon color="primary">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                      <v-list-item v-if="validatePermission('supplyrequestsoldsystem-view')" :to="{name:'home.report.supplyrequest'}">                                   
                        <v-list-item-icon>
                          <v-icon >mdi-notebook</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Reporte solicitudes sum.</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>
      </v-list-item-group>
    </v-list>
</v-card>
</template>

<script>
export default {
  name: "DefaultMenu",
  data() {
    return {
      model: 1,
      optionSelected: 0,
      options: [],
      user: {
        _id: "",
        username: "",
        emails: "",
        profile: null,
      },
    };
  },
  watch: {
    $route() {
      this.updateSelectedOption();
    },
  },
  created() {
    const user = this.$store.state.auth.user;
    this.user = {
      _id: user._id,
      username: user.username,
      emails: user.emails,
      profile: user.profile,
    };

    Meteor.call("user.getSystemOptions", null, (error, response) => {
      if (error) {
        this.$alert.showAlertSimple("error", error.reason);
      } else {
        this.options = response.data;
        //console.log("opciones menu ", this.options);
        this.updateSelectedOption();
      }
    });
  },
  methods: {
    goToView(option) {
      this.$router.push({ name: option.routeName });
    },
    updateSelectedOption() {
      const optionSelected = this.options.find(
        (option) => option.routeName === this.$route.name
      );
      this.optionSelected = optionSelected
        ? this.options.indexOf(optionSelected)
        : this.optionSelected;
    },
    validatePermission(permission) {
      //console.log("Permiso", permission);
      let ret = this.options.find((option) => option.permission === permission);
      if (typeof ret != "undefined") {
        ret = true;
      } else {
        ret = false;
      }
      return ret;
    },
  },
};
</script>
