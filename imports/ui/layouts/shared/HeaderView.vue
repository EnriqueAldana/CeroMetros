<template>
  
  <v-card
    class="mx-auto overflow-hidden"
    height="400"
  >
    <app-bar></app-bar>
    
  </v-card>

</template>

<script>

    import UserLogged from "../../components/UserLogged/UserLogged"
    import AppBar from "./AppBar.vue"
    export default {
        name: "HeaderView",
        components: {
            UserLogged,
            AppBar,
        },
        data() {
            return {
                optionSelected: 0,
                options: [],
                version:{
                            appVersion:"---"
                        },
                drawer: false,
                group: null,
            }
        },
        created() {
          Meteor.call('user.getSystemOptions',null,(error,response)=>{
            if(error){
              this.$alert.showAlertSimple('error',error.reason);
            }else{
              this.options= response.data;
              this.updateSelectedOption();
            }
          });
          this.getVersionOfApp();

        },
        watch:{
            '$route'(){
                this.updateSelectedOption();
            }
        },
        methods: {
            goToView(option) {
                this.$router.push({name: option.routeName})
            },
            updateSelectedOption(){
                const optionSelected = this.options.find(option => option.routeName === this.$route.name);
                this.optionSelected = optionSelected ? this.options.indexOf(optionSelected) : this.optionSelected;
            },
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
        }
    }
</script>

<style scoped>

</style>