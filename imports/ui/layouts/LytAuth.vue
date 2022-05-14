<template>
  <v-row>
    <v-col
      xs="12"
      sm="8"
      md="4"
      class="d-flex flex-column justify-space-around pa-12"
    >
      <div class="text-center">
        <img
          src="/img/LogoCeroMtsTagTemporal.png"
          alt="Logo Cero Mts TagTemporal"
          id="Logo0Mts"
          height="180px"
        />

        <!-- img src="/img/vuetify.png" alt="Vuetify" height="180px" width="auto" / -->
      </div>
      <router-view name="sectionView"> </router-view>
      <div class="text-center">
        <img
          src="/img/Powered.png"
          alt="Powered by IngeCompu"
          id="poweredLogo"
          height="55px"
        />
      </div>
    </v-col>
    <v-col
      xs="12"
      sm="4"
      md="8"
      class="right-side d-flex flex-column justify-center"
    >
     <!-- Aqui va la imagen del producto mediante el Style. -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "LytAuth",
};
</script>

<style scoped>
.display-3 {
  z-index: 2;
  margin-top: 350px;
}
.right-side {
  background-image: url("/img/ZeroMts_Product.png");
  background-size: cover;
  height: 100vh;
  width:100vh;
  position: relative;
}
</style>