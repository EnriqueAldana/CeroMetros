<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">Catálogo de perfiles</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'profiles'" color="success" v-on="on" fab dark :to="{name:'home.profiles.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar perfil</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        
        <v-data-table :headers="headers" :items="profiles" @dblclick:row="(event,{item})=>openEditProfile(item)"sort-by="name" class="elevation-1">
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'profiles'" color="info" v-on="on" small class="mr-2" @click="openEditProfile(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'profiles'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="profileTemp"
                  @id_element="deleteProfile"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {Profile} from "../../../api/Profiles/Profile";
import {mapMutations} from "vuex";
export default {
  name: "ListProfiles",
  components: {
    ModalRemove
  },
  data() {
    return {
      headers: [
        {value: 'description', text: 'Nombre del perfil', sortable: true},
        {value: 'action', text: 'Opciones', sortable: false},
      ],
      profileTemp: {
        preposition: 'el',
        typeElement: 'perfil',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    }
  },
  methods: {
    ...mapMutations('temporal',['setElement']),
    openEditProfile(profile){
      //Guardar en Vuex
      this.setElement(profile);
      this.$router.push({name: 'home.profiles.edit'});
    },
    openRemoveModal(profile) {
      this.profileTemp.element = profile;
      this.profileTemp._id = profile._id;
      this.profileTemp.mainNameElement = profile.description;
      this.profileTemp.element = profile;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteProfile(idProfile) {
      this.$loader.activate('Eliminando perfil...');
      Meteor.call('profile.delete',{idProfile},(error,response) => {
        this.$loader.deactivate();
        if(error){
          if(error.details){
            this.$alert.showAlertFull('warning','error',error.reason,'multi-line','5000','right','bottom',error.details);
          }else{
            this.$alert.showAlertSimple('error','Ocurrio un error al eliminar el perfil');
          }

        }else{
          this.$alert.showAlertSimple('success',response.message);
        }
      });

    }
  },
  meteor:{
    $subscribe: {
      'notStaticProfile.list':[]
    },
    profiles(){
      return Profile.find().fetch();
    }
  }
}
</script>

<style scoped>

</style>