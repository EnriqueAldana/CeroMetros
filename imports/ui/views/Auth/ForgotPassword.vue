<template>
    <div>
        <div class="d-flex flex-row justify-start">
            <v-btn color="primary" icon :to="{name:'login'}">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <div class="title">Olvidé mi contraseña</div>
        </div>
        <v-form @submit.prevent="forgotPassword">
            <v-text-field v-model="user.email" id="inputEmail" name="email" type="email"
                          label="Correo electrónico">
            </v-text-field>
            <v-btn type="submit" color="primary" rounded>Recuperar</v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "ForgotPassword",
        data() {
            return {
                user: {
                    email: null
                }
            }
        },
        methods: {
            forgotPassword() {
                // la funcion forgotPassword, se encarga de enviar el correo fijado para tal efecto.
                Accounts.forgotPassword(this.user,(error,response) => {
                  if(error){
                      this.$alert.showAlertSimple('error','Error al mandar el correo');
                  }else{
                      this.$alert.showAlertSimple('success','El correo ha sido enviado con exito.' +
                          'Vaya a su cuenta de correo y haga clic en el link mostrado para iniciar sesion.');
                      setTimeout(()=>{
                        this.$router.push({'name':'login'});
                      },5000);
                  }
                });
            }
        }
    }
</script>

<style scoped>

</style>