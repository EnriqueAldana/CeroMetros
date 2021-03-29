<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveWorkStation" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveWorkStation" id="saveWorkStation" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field v-model="workstation.name" id="inputName" name="name" label="Nombre">
                  </v-text-field>
                  <v-text-field v-model="workstation.name_full" id="inputNameFull" name="name_full" label="Nombre completo">
                  </v-text-field>
                  <v-text-field v-model="workstation.location" id="inputLocation" type="text" name="location" label="Ubicacion">
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
  name: "SaveWorkStation",
  data() {
    return {
      workstation: {
        _id: null,
        name: null,
        name_full: null,
        location:null
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    }
  },
  created(){  // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear Estacion de trabajo";
      this.dataView.targetButton="Crear";
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar Estacion de trabajo";
      this.dataView.targetButton="Actualizar";
      const tempWorkstation=this.$store.state.temporal.element;
      this.workstation= {
        _id: tempWorkstation._id,
        name: tempWorkstation.name,
        name_full: tempWorkstation.name_full,
        location: tempWorkstation.location
      };
    }
  },
  methods: {
    saveWorkStation() {
      this.$loader.activate('Guardando estacion de trabajo...');
      Meteor.call('workstation.save',this.workstation,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.workstations'});
        }
      });

    }
  }
}
</script>

<style scoped>

</style>