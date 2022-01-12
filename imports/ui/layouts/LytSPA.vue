<template>
  <v-container fluid>
    
      <!-- 
        <app-bar></app-bar>
        -->
    
    <header-view></header-view>
    
    <!-- 
    <left-menu-view></left-menu-view>
    -->
    <v-main id="main_section">
      <router-view name="sectionView" v-if="loggedUser"></router-view>
    </v-main>
    <footer-view></footer-view>
  </v-container>
</template>

<script>
import HeaderView from "./shared/HeaderView";
import FooterView from "./shared/FooterView";
import AppBar from "./shared/AppBar";
import LeftMenuView from "./shared/LeftMenuView.vue";

export default {
  name: "LytSPA",
  components: {
    HeaderView,
    AppBar,
    LeftMenuView,
    FooterView
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