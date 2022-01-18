<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"
    :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl"
    height="70"
    flat
  >
  
    <v-toolbar-title>Sistema Cero Metros Version - {{this.version.appVersion}}</v-toolbar-title>


    <v-spacer />

    <default-go-home />

    <default-notifications />

    <default-account />
  </v-app-bar>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'
  import DefaultAccount from "./widgets/Account"
  import DefaultDrawerToggle from "./widgets/DrawerToggle"
  import DefaultGoHome from "./widgets/GoHome"
  import DefaultNotifications from "./widgets/Notifications"
 
  export default {
    name: 'DefaultBar',

    components: {
      DefaultAccount,
      DefaultDrawerToggle,
      DefaultGoHome,
      DefaultNotifications,

    },
    data () {
        return {
          version:{
                    appVersion:"---"
                  },
          
        }
    },
    created() {  
      this.getVersionOfApp();
    },
    methods: { 
        getVersionOfApp() {
          
              Meteor.call('version.app',this.version,(error,response)=>{

                if(error){
                  this.$alert.showAlertSimple('error',error.reason);
                }else{
                  //this.$alert.showAlertSimple('success',response.message);
                  //console.log("Version",response.data);
                  this.version.appVersion = response.data;
                }
                return this.version.appVersion;
              });
            }
    },

  }
</script>
