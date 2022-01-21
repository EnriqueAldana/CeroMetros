<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">Catálogo de lineas de producción</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'productionlines'" color="success" v-on="on" fab dark :to="{name:'home.productionlines.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar linea de produccion</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        
        <v-data-table :headers="headers" :items="productionlines" @dblclick:row="(event,{item})=>openEditProductionLine(item)"sort-by="name" class="elevation-1">
          <template v-slot:item.workstations.name="{item}">  
              <template>
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr
                          v-for="item in item.workstations"
                          :key="item.name"
                        >
                          <td>{{ item.name }}</td> 
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
        </template>
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'productionlines'" color="info" v-on="on" small class="mr-2" @click="openEditProductionLine(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'productionlines'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="productionlinesTemp"
                  @id_element="deleteProductionLine"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {ProductionLineRepository} from "../../../api/ProductionLines/ProductionLine";
import {mapMutations} from "vuex";
export default {
  name: "ListProductionLines",
  components: {
    ModalRemove
  },
  data() {
    return {
      headers: [
        {value: 'name', text: 'Nombre de la linea de produccion', sortable: true},
        {value: 'description', text: 'Descripcion', sortable: true},
        {value: 'workstations.name', text: 'Estaciones de trabajo', sortable: true},
        {value: 'action', text: 'Opciones', sortable: false},
      ],
      productionlinesTemp: {
        preposition: 'la',
        typeElement: 'linea de produccion',
        mainNameElement: '',
        _id: null,
        element: {}
      },
      workstation: 
                    {
                    _id: '',
                    name: '',
                    name_full: '',
                    location: '',
                    productionline:{
                        _id:'',
                        name: '',
                        description: '',
                        workstations:[String]
                    }
                    }
                
    }
  },
  created() {
    console.info('productionlines');
  },
  methods: {
    ...mapMutations('temporal',['setElement']),
    openEditProductionLine(productionline){
      //Guardar en Vuex
      this.setElement(productionline);
      this.$router.push({name: 'home.productionlines.edit'});
    },
    openRemoveModal(productionline) {
      this.productionlinesTemp.element = productionline;
      this.productionlinesTemp._id = productionline._id;
      this.productionlinesTemp.mainNameElement = productionline.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteProductionLine(idProductionline) {
      this.$loader.activate('Eliminando linea de produccion...');
      Meteor.call('productionline.delete',{idProductionline},(error,response) => {
        this.$loader.deactivate();
        if(error){
          if(error.details){
            this.$alert.showAlertFull('warning','error',error.reason,'multi-line','5000','right','bottom',error.details);
          }else{
            this.$alert.showAlertSimple('error','Ocurrio un error al eliminar la linea de produccion');
          }

        }else{
          this.$alert.showAlertSimple('success',response.message);
        }
      });

    }
  },
  meteor:{
    $subscribe: {
      'productionlines.list':[]
    },
    productionlines(){
      const productionLines= ProductionLineRepository.find().fetch();
      //console.log(productionLines);
      return productionLines;
    }
  }
}
</script>

<style scoped>

</style>