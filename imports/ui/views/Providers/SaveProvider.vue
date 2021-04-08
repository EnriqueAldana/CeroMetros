<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveProvider" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveProvider" id="saveProvider" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field v-model="provider.name" id="inputName" name="name" label="Nombre">
                  </v-text-field>
                  <v-text-field v-model="provider.name_full" id="inputNameFull" name="name_full" label="Nombre completo">
                  </v-text-field>
                    <v-text-field v-model="provider.providerBussinessId" id="inputproviderBussinessId" name="providerBussinessId" label="RFC">
                  </v-text-field>
                  <v-text-field v-model="provider.address" id="inputaddress" name="address" label="Direccion">
                  </v-text-field>
                  <v-text-field v-model="provider.phones" id="inputphones" name="phones" label="Telefonos">
                  </v-text-field>
                  <v-text-field v-model="provider.web" id="inputweb" name="web" label="Web">
                  </v-text-field>
                  <v-text-field v-model="provider.email" id="inputemail" type="email" name="email" label="Correo">
                  </v-text-field>
                   <td>
                <v-switch
                    v-model="provider.isAvailable"
                    label="¿Habilitar proveedor?"
                    color="indigo"
                    hide-details
                ></v-switch>
              </td>
              
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

export default {
  name: "SaveProvider",
  data() {
    return {
      provider: {
        _id: null,
        name: null,
        name_full: null,
        providerBussinessId: null,
        address: null,
        phones: null,
        web: null,
        email: null,
        isAvailable: false
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    }
  },
  created(){  // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear proveedor";
      this.dataView.targetButton="Crear";
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar proveedor";
      this.dataView.targetButton="Actualizar";
      const tempProvider=this.$store.state.temporal.element;
      this.provider= {
        _id: tempProvider._id,
        name: tempProvider.name,
        name_full: tempProvider.name_full,
        providerBussinessId: tempProvider.providerBussinessId,
        address: tempProvider.address,
        phones: tempProvider.phones,
        web: tempProvider.web,
        email: tempProvider.email,
        isAvailable: tempProvider.isAvailable
      };
    }
  },
  methods: {
    saveProvider() {
      this.$loader.activate('Guardando proveedor...');
      Meteor.call('provider.save',this.provider,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.providers'});
        }
      });

    }
  }
}
</script>

<style scoped>

</style>