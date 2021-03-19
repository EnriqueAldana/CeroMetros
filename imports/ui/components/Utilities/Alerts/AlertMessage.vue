<template>
  <v-snackbar v-model="snackbar"
              :bottom="y==='bottom'"
              :top="y==='top'"
              :right="x==='right'"
              :left="x==='left'"
              :color="color"
              :multi-line="mode==='multi-line'"
              :vertical="mode==='vertical'"
  >
              <v-card-title>
                <v-icon v-if="icon" dark left>
                  {{icon}}
                </v-icon>
                <span class="white--text">{{title}}</span>
                <v-spacer>
                </v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                      <v-btn dark text small v-on="on" @click="snackbar=false">
                        <v-icon small>mdi-window-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Cerrar</span>
                </v-tooltip>
              </v-card-title>
              <v-card-text v-if="text">
                <span class="white--text">{{text}}</span>
              </v-card-text>
  </v-snackbar>
</template>

<script>
import Vue from "vue";

export default {
name: "AlertMessage",
  data(){
    return {
      snackbar:false,
      x:'',
      y:'',
      color:'',
      mode:'',
      icon: null,
      title: '',
      text:'',
      timeout: 5000
    }

  },
  mounted() {
    Vue.prototype.$alert=this;
  },
  methods:{
    showAlertSimple(color,title) {
      this.color = color;
      this.title = title;
      this.x = "right";
      this.y = "buttom";
      if (color === "success") {
        this.icon = "check_circle";
      }else if(color==="error") {
        this.icon = "close";
      }else if(color==="info") {
        this.icon = "info";
      }else if(color==="warning") {
        this.icon = "warning";
      }
      this.text='';
      this.mode='';
      this.timeout=5000;
      this.snackbar=true;
    },
    showAlertFull(icon,color,title,mode,timeout,x,y,text=null){

      this.icon= icon;
      this.color= color;
      this.text = text;
      this.mode= mode;
      this.timeout= timeout;
      this.x = x;
      this.y = y;
      this.snackbar= true;
      this.title = title;

    }
  }
}
</script>

<style scoped>

</style>