<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveWorkstationSetup" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveWorkstationSetup" id="saveWorkstationSetup" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field 
                  v-model="workstationsetup.name" 
                  id="inputName" 
                  name="name" 
                  :rules="[rules.required]"
                  label="Nombre de la configuracion para la estación de trabajo">
                  </v-text-field>
                  <v-text-field 
                  v-model="workstationsetup.description" 
                  id="inputdescription" 
                  name="description" 
                  :rules="[rules.required]"
                  label="Descripcion de la configuracion">
                  </v-text-field>
                  <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        value=""
                        v-model="workstationsetup.instructions"
                        id="inputInstrucciones"
                        name="instructions"
                        label="Instrucciones"
                        counter
                        :rules="[rules.required, rules.max1250chars]" 
                      ></v-textarea>
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
  name: "SaveWorkstationSetup",
  data() {
    return {
      workstationsetup: {
          _id:null,
          name: null,
          description: null,
          instructions: null
      },
      dataView: {
        title: '',
        targetButton: ''
      },rules: {
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
      }
    }
  },
  created(){  // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear configuracion para la estación de trabajo";
      this.dataView.targetButton="Crear";
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar configuracion para la estación de trabajo";
      this.dataView.targetButton="Actualizar";
      const tempWSConfig=this.$store.state.temporal.element;
      this.workstationsetup= {
        _id: tempWSConfig._id,
        name: tempWSConfig.name,
        description: tempWSConfig.description,
        instructions: tempWSConfig.instructions
      };
    }
  },
  methods: {
    saveWorkstationSetup() {
      this.$loader.activate('Guardando configuracion de la estacion de trabajo...');
      Meteor.call('workstationSetup.save',this.workstationsetup,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.workstationconfiguration'});
        }
      });

    }
  }
}
</script>

<style scoped>

</style>