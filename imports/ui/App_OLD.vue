<template>
  <v-app>
      <router-view name="allPageView"></router-view>
    <alert-message/>
    <loader/>
  </v-app>

</template>

<script>

import AlertMessage from "./components/Utilities/Alerts/AlertMessage";
import Loader from "./components/Utilities/Loaders/Loader";

export default {
  name: "App",
  components:{
    AlertMessage,
    Loader
  }
}
</script>

<style>
/**
El estilo html remueve el scroll en la plantilla 
html {  
   overflow-y: hidden !important; 
 }  
*/
.v_snack__content {
  padding: 0 !important;

}
</style>