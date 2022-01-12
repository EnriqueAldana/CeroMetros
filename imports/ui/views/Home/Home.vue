<template>
    <h1> Bienvenido </h1>
    
</template>

<script>
import Version from "../../../startup/server/Version"
export default {
name: "Home",
data ()  {
    return{
        appVersion:""
    }
},
created() {
    this.appVersion=Version.appVersion;
    console.info('Version en ejecución ',Version.appVersion);
  }
}
</script>

<style scoped>

</style>