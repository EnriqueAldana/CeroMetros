<template>
<v-app>

    <default-bar />
    <default-drawer /> 

        <v-main id="main_section">
            <v-container fluid>
            <router-view name="sectionView" v-if="loggedUser"></router-view>
            </v-container>
        </v-main>

    <default-footer/>

 </v-app>

</template>

<script>

import DefaultBar from "./shared/AppBar.vue"
import DefaultDrawer from "./shared/Drawer.vue"
import DefaultFooter from "./shared/Footer.vue"

export default {
  name: "LytSPA",
  components: {
    DefaultBar,
    DefaultDrawer,
    DefaultFooter,

  },
  data() {
    return {
      loggedUser: false
    };
  },
  mounted(){
    this.$subscribe('roles',[]);
  },
  watch: {
    '$subReady.roles'(newValue){
      if (newValue){
        this.loggedUser = true;
      }
    }
  }
}
</script>

<style scoped>
#main_section {
  margin-bottom: 80px;
  position: relative;
}
</style>e>