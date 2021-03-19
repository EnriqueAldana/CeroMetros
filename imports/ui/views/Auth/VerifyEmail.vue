<template>
  <div align="center">
      <div v-if="loading">
        <h3>Cargando datos...</h3>
      </div>
      <div v-else>
        <v-icon size="120" :color="status?'green':'red'">
          {{ status ? 'mdi-check-circle' : 'mdi-cancel' }}
        </v-icon>
        <h3 class="text-wrap">
          {{ message }}
          <small v-text="description"></small>
        </h3>
        <v-btn :to="{name:'login'}" color="primary">Regresar a inicio</v-btn>
      </div>
  </div>
</template>

<script>
export default {
name: "VerifyEmail",
  data()  {
    return {
      loading: true,
      status: false,
      message: null,
      description: null
    };
  },
  mounted() {
    // Verificar email
    const token= this.$route.params.token;
    Accounts.verifyEmail(token,(error)=>{
      this.loading = false;
      if(error){
        console.error('Ha habido un error en la validacion de correo del usuario');
        this.message = 'Ocurrió un error al verificar su correo';
        this.description= 'Intente hacer un registro de su usuario o restablezca su contraseña.';
        this.status = false;
      }else{
          this.message = 'Se ha verificado tu correo electronico. Ahora puedes iniciar sesion';
          this.status = true;

      }

    });
  }
};
</script>

<style scoped>

</style>