<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{dataView.title}}</div>
      </v-col>
      <v-col cols="2">
        <v-btn block type="submit" form="saveUser" color="primary" v-text="dataView.targetButton">
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveUser" id="saveUser" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="4">
                  <div class="d-flex flex-column align-center">
                    <img :src="user.profile.path || '/img/user.png'" :alt="user.profile.name" width="100px">
                    <v-file-input v-show="false" ref="imageFile" 
                    v-model="file" accept="image/png, image/jpeg , image/bpm">
                    </v-file-input>
                    <v-btn color="primary" class="mb-5 mt-5" width="100%" rounded depressed @click="onClickUploadButtom">
                      <span v-if="user.profile.path">Cambiar</span>
                      <span v-else>Cargar</span>
                    </v-btn>
                  </div>
                </v-col>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field v-model="user.profile.name" id="inputName" 
                  :rules="[rules.required]"
                  name="name" label="Nombre completo del usuario">
                  </v-text-field>
                  <v-select
                    v-model="user.profile.company"
                    id="selectCompany"
                    name="company"
                    :items="companies"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="_id"
                    return-object
                    label="Empresa"
                  >
                  </v-select>
                  <v-select v-model="user.profile.profile" id="selectProfile" name="profile"
                            :items="profiles"
                            :rules="[rules.required]"
                            item-text="description" item-value="name"
                            label="Perfil">
                  </v-select>
                  <v-text-field v-model="user.username" id="inputUsername" name="username"
                                :rules="[rules.required, rules.counter8]"
                                label="Nombre corto de usuario o Num. Celular">
                  </v-text-field>
                  <v-text-field v-model="user.emails[0].address" id="inputEmail" type="email"
                                :rules="[rules.required,rules.email]"
                                
                                name="email" label="Correo">
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
import {Profile} from "../../../api/Profiles/Profile";
import {Company}  from "../../../api/Companies/Company"
import uploadImage from "../../mixins/users/uploadImage";

export default {
  name: "SaveUser",
  mixins:[uploadImage],
  data() {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{address:null, verified:false}],
        profile: {
          profile: null,
          name:null,
          path: null,
          company: {
            _id: null,
            name: null,
            name_full: null,
            companyBussinessId: null,
            address: null,
            phones: null,
            web: null,
            email: null,
            isAvailable: false
          },
        },
        
      
      },
      rules: {
          required: value => !!value || 'Requerido.',
          counter: value => value.length <= 20 || 'Max 20 caracteres',
          counter8: value => value.length <= 8 || 'Max 8 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Correo Electrónico incorrecto.'
          }
      },
      roleToProfile:null,
      
      userLogged: {
        _id: null,
        username: null,
        emails: [{address:null, verified:false}],
        profile: {
          profile: null,
          name:null,
          path: null,
          company: {
            _id: null,
            name: null,
            name_full: null,
            companyBussinessId: null,
            address: null,
            phones: null,
            web: null,
            email: null,
            isAvailable: false
          },
        },
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    }
  },
  created(){  // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Crear usuario";
      this.dataView.targetButton="Crear";
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar usuario";
      this.dataView.targetButton="Actualizar";
      const tempUser=this.$store.state.temporal.element;
      this.user={
        _id:tempUser._id,
        username: tempUser.username,
        emails:tempUser.emails,
        profile: tempUser.profile
      };
    }
    // verificar quien esta logeado
    console.log("user Id de meteor",Meteor.userId())
    if(Meteor.userId()!== null){
        this.userLogged= this.$store.state.auth.user;
        this.roleToProfile= this.userLogged.profile.profile
      }
    console.log("Usuario logeado: ", this.userLogged);
    console.log("Role para traer perfiles: ", this.roleToProfile);
    //this.profiles=this.profilesAccordingRole(this.roleToProfile)
  }, 
  methods: {
    
    saveUser() {
      console.log("Usuario: ", this.user);
      this.$loader.activate('Guardando usuario...');
      Meteor.call('user.save',{user: this.user,photoFileUser: this.photoFileUser},(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.users'});
        }
      });

    }
  },
  meteor:{
    $subscribe: {
        'profile.listAll': [],
        'company.list': []
    },
    companies(){
      if(this.roleToProfile=="admin"){
                return Company.find().fetch();
            }else if(this.roleToProfile=="AdminEmpresa"){
                return Company.find({name: { $in:[this.userLogged.profile.company.name]}}).fetch();   
            }else if(this.roleToProfile=="Residente"){
                return Company.find({name: { $in:[this.userLogged.profile.company.name]}}).fetch();   
            }
    },
    profiles(){
      if(this.roleToProfile=="admin"){
                return Profile.find().fetch();
            }else if(this.roleToProfile=="AdminEmpresa"){
                return Profile.find({name: { $in:["AdminEmpresa","Residente","Visitante"]}}).fetch();   
            }else if(this.roleToProfile=="Residente"){
                return Profile.find({name: { $in:["Visitante"]}}).fetch();   
            }
    }
    
  }
  
}
</script>

<style scoped>

</style>