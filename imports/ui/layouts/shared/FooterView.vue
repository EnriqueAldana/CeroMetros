<template>
  <v-footer padless>
    <v-col class="d-flex justify-center" cols="12">
            <span class="white--text">
                Powered by Ingeniería en Computo
            </span>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "FooterView"
}
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: #183086 !important;
}
</style>