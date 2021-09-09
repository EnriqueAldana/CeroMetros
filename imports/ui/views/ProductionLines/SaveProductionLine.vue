<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveProductionLine" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="saveProductionLine" id="saveProductionLine" autocomplete="off">
          <v-row>
            <v-col md="6">
              <v-text-field v-model="productionline.name" id="inputName" name="name" label="Nombre de la linea de produccion">
              </v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field v-model="productionline.description" id="inputDescription" name="description"
                            label="Descripción de la linea de produccion">
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Estaciones de trabajo asociadas</v-card-title>
          <v-card-text>
            <v-text-field v-model="searchSelfWorkstation" placeholder="Buscar. . ."
                          id="inputSearchSelfWorkstation" name="workstationName">
            </v-text-field>
          </v-card-text>
          <v-sheet id="scrolling-techniques-2" class="overflow-y-auto" max-height="500">
            <v-list style="height:400px;">
              <v-list-item-group>
                <draggable :list="filteredSelfWorkstations" @change="(ev)=>onChangeDragList(ev,'selfWorkstations')"  group="workstations">
                  <v-list-item v-for="workstation in filteredSelfWorkstations"
                               v-text="workstation.name" :key="workstation._id" return-object >
                  </v-list-item>
                </draggable>
              </v-list-item-group>
            </v-list>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Estaciones de trabajo asignadas</v-card-title>
          <v-card-text>
            <v-text-field v-model="searchWorkstation" placeholder="Buscar. . ."
                          id="inputSearchWorkstation" name="workstationName2">
            </v-text-field>
          </v-card-text>
          <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="500">
            <v-list style="height:400px;">
              <v-list-item-group>
                <draggable :list="filteredWorkstations" @change="(ev)=>onChangeDragList(ev,'allWorkstations')" group="workstations">
                  <v-list-item v-for="workstation in filteredWorkstations"
                               v-text="workstation.name" :key="workstation._id">
                  </v-list-item>
                </draggable>
              </v-list-item-group>
            </v-list>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: "SaveProductionLine",
  components: {
    draggable
  },
  data() {
    return {
      productionline: {
        _id: null,
        name: null,
        description: null,
        workstations: []
      },
      dataView: {
        title: '',
        targetButton: ''
      },
      searchSelfWorkstation: '',
      searchWorkstation: '',
      selfWorkstations: [],
      allWorkstations: [],
    }
  },
  created() {
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear linea de produccion";
      this.dataView.targetButton = "Crear";
      this.listAllWorkstations();
    } else if (this.$router.currentRoute.name.includes("edit")) {
      const tempWorkstation=this.$store.state.temporal.element;
      this.productionline= {
            _id: tempWorkstation._id,
            name: tempWorkstation.name,
            description: tempWorkstation.description,
            workstations: tempWorkstation.workstations
      };
      this.initWorkstations(this.productionline._id);
      this.dataView.title = "Editar linea de produccion";
      this.dataView.targetButton = "Actualizar";
    }
  },
  methods: {
    onChangeDragList(event , propData) {
      if(event.hasOwnProperty('removed')){
        this[propData] = this[propData].filter(permission => permission._id != event.removed.element._id);
      }else if(event.hasOwnProperty('added')){
        this[propData].splice(event.added.newIndex,0, event.added.element);
      }
    },
    saveProductionLine() {
      console.log("Guardando Linea de produccion: ", this.productionline);
      this.$loader.activate('Guardando linea de produccion ...');
      this.productionline.workstations = this.selfWorkstations.map(workstation => workstation._id);
      console.info('this.selfWorkstations',this.selfWorkstations);
      this.productionline.workstations=this.selfWorkstations;
      Meteor.call('productionline.save',this.productionline,(error,response)=>{
        this.$loader.deactivate();
        if(error){
          this.$alert.showAlertSimple('error',error.error);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.productionlines'});
        }
      });
    },
    listAllWorkstations(){
      Meteor.call('productionline.workstations',(error,response)=>{
          if (error){
            this.$alert.showAlertSimple('error',error.reason,response);
          } else {
            
            this.allWorkstations=response.data;
          }
      });
    },
    initWorkstations(idProductionLine){

      Meteor.call('productionline.workstations.included',idProductionLine,(error,response)=>{
        if (error){
          this.$alert.showAlertSimple('error',error.reason,response);
        } else {
          
          this.selfWorkstations = response.data;
        }
      });
      Meteor.call('productionline.workstations.availables.to.include',idProductionLine,(error,response)=>{
        if (error){
          this.$alert.showAlertSimple('error',error.reason,response);
        } else {
        
          this.allWorkstations = response.data;
        }
      });
    }
  },
  computed:{
    filteredSelfWorkstations(){
      return this.selfWorkstations.filter(workstation=>{
        return workstation.name.toLowerCase().includes(this.searchSelfWorkstation.toLowerCase());
      })
    },
    filteredWorkstations(){
      return this.allWorkstations.filter(workstation=>{
        return workstation.name.toLowerCase().includes(this.searchWorkstation.toLowerCase());
      });
    },
  }
}
</script>

<style scoped>
</style>