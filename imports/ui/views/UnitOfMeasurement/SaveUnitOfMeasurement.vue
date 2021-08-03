<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveUnitOfMeasurement" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveUnitOfMeasurement" id="saveUnitOfMeasurement" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field v-model="unitofmeasurement.name" id="inputName" name="name" label="Nombre de la Unidad de Medida">
                  </v-text-field>
                  <v-text-field v-model="unitofmeasurement.symbol" id="inputsymbol" name="symbol" label="Simbolo">
                  </v-text-field>
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
  name: "SaveUnitOfMeasurement",
  data() {
    return {
      unitofmeasurement: {
        _id: null,
        name: null,
        symbol: null
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    }
  },
  created(){  // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear unidad de medida";
      this.dataView.targetButton="Crear";
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar unidad de medida";
      this.dataView.targetButton="Actualizar";
      const tempUnit=this.$store.state.temporal.element;
      this.unitofmeasurement= {
        _id: tempUnit._id,
        name: tempUnit.name,
        symbol: tempUnit.symbol,
      };
    }
  },
  methods: {
    saveUnitOfMeasurement() {
      this.$loader.activate('Guardando unidad de medida...');
      Meteor.call('unitofmeasurement.save',this.unitofmeasurement,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.unitsofmeasurement'});
        }
      });

    }
  }
}
</script>

<style scoped>

</style>