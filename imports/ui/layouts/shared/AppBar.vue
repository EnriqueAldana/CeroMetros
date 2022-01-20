<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"

    height="70"
    flat
  >
  
    <v-toolbar-title>
    <p class="font-weight-black">
      Sistema Cero Metros Version - {{this.version.appVersion}}
    </p>
    
    </v-toolbar-title>


    <v-spacer />

    <default-go-home />

    <default-notifications />

    <default-account />
  </v-app-bar>
</template>

<script>
  // Utilities

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
                  this.version.appVersion = response.data;
                }
                return this.version.appVersion;
              });
            }
    },

  }
</script>
