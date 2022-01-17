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
          form="saveProfile"
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
              @submit.prevent="saveProfile"
              id="saveProfile"
              autocomplete="off"
            >
              <v-row>
                <v-col>
                    <v-form @submit.prevent="saveProfile" id="saveProfile" autocomplete="off">
                      <v-row>
                        <v-col md="6">
                          <v-text-field v-model="profile.name" id="inputName" name="name" label="Nombre del perfil">
                          :rules="[rules.required]"
                          </v-text-field>
                        </v-col>
                        <v-col md="6">
                          <v-text-field v-model="profile.description" id="inputDescription" name="name2"
                                        label="Descripción del perfil">
                            :rules="[rules.required]"
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card>
                    <v-card-title>Permisos de este perfil</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="searchSelfPermission"
                        placeholder="Buscar. . ."
                        id="inputSearchSelfPermission"
                        name="permissionName"
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-sheet
                      id="scrolling-techniques-2"
                      class="overflow-y-auto"
                      max-height="500"
                    >
                      <v-list style="height: 400px">
                        <v-list-item-group>
                          <draggable
                            :list="filteredSelfPermissions"
                            @change="
                              (ev) => onChangeDragList(ev, 'selfPermission')
                            "
                            group="permissions"
                          >
                            <v-list-item
                              v-for="permission in filteredSelfPermissions"
                              v-text="permission.publicName"
                              :key="permission._id"
                            >
                            </v-list-item>
                          </draggable>
                        </v-list-item-group>
                      </v-list>
                    </v-sheet>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-card-title>Todos los permisos</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="searchPermission"
                        placeholder="Buscar. . ."
                        id="inputSearchPermission"
                        name="configurationName2"
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-sheet
                      id="scrolling-techniques-3"
                      class="overflow-y-auto"
                      max-height="500"
                    >
                      <v-list style="height: 400px">
                        <v-list-item-group>
                          <draggable
                            :list="filteredPermissions"
                            @change="
                              (ev) => onChangeDragList(ev, 'allPermissions')
                            "
                            group="permissions"
                          >
                            <v-list-item
                              v-for="permission in filteredPermissions"
                              v-text="permission.publicName"
                              :key="permission._id"
                            >
                            </v-list-item>
                          </draggable>
                        </v-list-item-group>
                      </v-list>
                    </v-sheet>
                  </v-card>
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
import { ProductionLineRepository } from "../../../api/ProductionLines/ProductionLine";
import draggable from 'vuedraggable';
export default {

  name: "SaveProfile",
  components: {
    draggable
  },
  data() {
    return {
      profile: {
        _id: null,
        name: null,
        description: null,
        permissions: []
      },
      dataView: {
        title: "",
        targetButton: "",
      },
      
      searchSelfPermission: '',
      searchPermission: '',
      selfPermissions: [],
      allPermissions: [],
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
    };
  },
  created() {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear perfil";
      this.dataView.targetButton = "Crear";
      this.listAllPermissions();
      
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar perfil";
      this.dataView.targetButton = "Actualizar";
      const tempProfile = this.$store.state.temporal.element;
      this.profile= {
            _id: tempProfile._id,
            name: tempProfile.name,
            description: tempProfile.description,
            permissions: tempProfile.permissions
      };
      this.initPermissions(this.profile._id);
    
    }
  },
  computed: {
    filteredSelfPermissions(){
      let ret=false;
      return this.selfPermissions.filter(permission=>{
        try{
          ret= permission.publicName.toLowerCase().includes(this.searchSelfPermission.toLowerCase());
        }catch(ex){
          // Cacha el error si el objeto no trae la caracteristica publicName
        }
        return ret;
      })
    },
    filteredPermissions(){
      // return this.allPermissions
      let retList=[];
      let permission={
                _id:"",
                children:[],
                publicName:""
      }
      let search=this.searchPermission.toLowerCase();
    
      for (let i = 0 ;  i < this.allPermissions.length; i++) {
          permission = this.allPermissions[i];
          //console.log("permission",permission)
          try{
              if(permission.publicName.toLowerCase().includes(search)){
              retList.push(permission)
            }
          }catch(ex){

          }
         
      }
      return retList;
      //.filter(permission=>{
      //  console.info("allPermissions",permission)
        //console.info("this.searchSelfPermission", this.searchSelfPermission)
      //  return permission.publicname.toLowerCase().includes(this.searchSelfPermission.toLowerCase());
     // })
  },
    
  },
  methods: {
    onChangeDragList(event , propData) {
      console.log("event",event)
      console.log("propData",propData);
      if(event.hasOwnProperty('removed')){
        this[propData] = this[propData].filter(permission => permission._id != event.removed.element._id);
      }else if(event.hasOwnProperty('added')){
        this[propData].splice(event.added.newIndex,0, event.added.element);
      }
    },
    saveProfile() {
      console.log("Guardando Perfil: ", this.profile);
      this.$loader.activate('Guardando perfil ...');
      this.profile.permissions = this.selfPermissions.map(permission => permission._id);
      Meteor.call('profile.save',this.profile,(error,response)=>{
        this.$loader.deactivate();
        if(error){
          this.$alert.showAlertSimple('error','Ocurrió un error al guardar el perfil');
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.profiles'});
        }
      });
    },
    listAllPermissions(){
      Meteor.call('permissions.list',(error,response)=>{
        if (error){
          this.$alert.showAlertSimple('error',error.reason,response);
        } else {
          this.allPermissions = response.data;
          //console.log("this.allPermissions",response.data)
        }
      });
    },
    initPermissions(idProfile){

      Meteor.call('permissions.listByIdProfile',{"idProfile":idProfile},(error,response)=>{
        if (error){
          this.$alert.showAlertSimple('error',error.reason,response);
        } else {
          this.selfPermissions = response.data;
        }
      });
      Meteor.call('permissions.listOfOthers',{"idProfile":idProfile},(error,response)=>{
        if (error){
          this.$alert.showAlertSimple('error',error.reason,response);
        } else {
          this.allPermissions = response.data;
        }
      });
    },
    
  },
  meteor: {
    $subscribe: {
      "productionlines.list": [],
      "workstationSetup.list": [],
      
    },
    productionlines() {
      return ProductionLineRepository.find(
        {},
        { fields: { _id: 1, name: 1, description: 1 } }
      ).fetch();
    },

  },
};
</script>

<style scoped>
</style>