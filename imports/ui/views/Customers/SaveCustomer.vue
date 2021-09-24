<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveCustomer" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveCustomer" id="saveCustomer" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="8">
        
                  <v-text-field
                        v-model="customer.name" id="inputName" name="name"
                        :rules="[rules.required, rules.counter]"
                        label="Nombre"
                        counter
                        maxlength="20"
                  ></v-text-field>
                  <v-text-field v-model="customer.name_full" id="inputNameFull" name="name_full" label="Nombre completo">
                  </v-text-field>
                    <v-text-field v-model="customer.customerBussinessId" id="inputcustomerBussinessId" name="companyBussinessId" label="RFC">
                  </v-text-field>
                  <v-text-field v-model="customer.address" id="inputaddress" name="address" label="Direccion">
                  </v-text-field>
                  <v-text-field v-model="customer.phones" id="inputphones" name="phones" label="Telefonos">
                  </v-text-field>
                  <v-text-field v-model="customer.web" id="inputweb" name="web" label="Web">
                  </v-text-field>
                  </v-text-field>
                  <v-text-field
                    v-model="customer.email" id="inputemail" type="email" name="email"
                    :rules="[rules.required, rules.email]"
                    label="Correo Electrónico"
                  ></v-text-field>

                   <td>
                <v-switch
                    v-model="customer.isAvailable"
                    label="¿Habilitar cliente?"
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
  name: "SaveCustomer",
  data() {
    return {
      customer: {
        _id: null,
        name: null,
        name_full: null,
        customerBussinessId: null,
        address: null,
        phones: null,
        web: null,
        email: null,
        isAvailable: false
      },
      rules: {
          required: value => !!value || 'Requerido.',
          counter: value => value.length <= 20 || 'Max 20 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Correo Electrónico incorrecto.'
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
      this.dataView.title="Crear cliente";
      this.dataView.targetButton="Crear";
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar cliente";
      this.dataView.targetButton="Actualizar";
      const tempCustomer=this.$store.state.temporal.element;
      this.customer= {
        _id: tempCustomer._id,
        name: tempCustomer.name,
        name_full: tempCustomer.name_full,
        customerBussinessId: tempCustomer.companyBussinessId,
        address: tempCustomer.address,
        phones: tempCustomer.phones,
        web: tempCustomer.web,
        email: tempCustomer.email,
        isAvailable: tempCustomer.isAvailable
      };
    }
  },
  methods: {
    saveCustomer() {
      this.$loader.activate('Guardando cliente...');
      console.info("Guardando cliente...");
      Meteor.call('customer.save',this.customer,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.customers'});
        }
      });

    }
  }
}
</script>

<style scoped>

</style>