<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
      {{ user.username }}
      <v-list-item class="px-2">
            <v-list-item-avatar>
              <img :src="user.profile.path || '/img/user.png'" :alt="user.profile.name" width="100px">

            </v-list-item-avatar>
      </v-list-item>
        
      </v-btn>
    </template>
    <v-list>
      <v-list-item  :to="{name:'home.account'}">
              <v-list-item-icon>
                <v-icon >mdi-card-account-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title >Cuenta Usuario</v-list-item-title>
              </v-list-item-content>
      
      </v-list-item>


      <v-list-item  @click="closeSession">
              <v-list-item-icon>
                <v-icon >mdi-exit-run</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title >Cerrar sesión</v-list-item-title>
              </v-list-item-content>
      
      </v-list-item>

      
    </v-list>

    
  </v-menu>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: "DefaultAccount",
  data(){
    return {
      user: {
        _id: null,
        username: null,
        emails: [{address: null, verified: false}],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      },
      onLogoutHook: null,
      
    }
  },
  created(){
    this.setSession();
  },
  mounted(){
    // Escuchador para cuando se guarden datos del usuario- GeneralData
    this.$root.$on('setUserLogged',() => {
      this.setSession();
    });
    this.onLogoutHook=Accounts.onLogout(()=>{
      this.closeFrontSession();
    });
  },
  methods: {

    ...mapMutations('auth',['logout']),
    closeSession(){
      if(this.onLogoutHook!=null)
        this.onLogoutHook.stop();
      Meteor.logout();  // Aqui se limpia la sesion del lado del servidor
      this.logout();    // Aqui se limpia la sesion del lado del cliente
      this.$router.push({name: 'login'})
    },
    closeFrontSession(){
      this.onLogoutHook.stop();
      this.logout();    // Aqui se limpia la sesion del lado del cliente
      this.$router.push({name: 'login'})
    },
    setSession(){
      if(Meteor.userId()!== null){
        this.user= this.$store.state.auth.user;
      }else{
        this.closeSession();
      }
    }
  }
}
</script>

<style scoped>

</style>