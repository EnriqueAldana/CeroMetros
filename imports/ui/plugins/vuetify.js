import Vue from 'vue';
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/src/locale/es'
import VueApexCharts from 'vue-apexcharts'

Vue.use(Vuetify);
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

export default new Vuetify({
    lang: {
        locales: { es },
        current: 'es',
      },
    them:{
        options:{
            customProperties:true
        },
        themes:{
            light:{
                primary:'#01697d',
                    secondary:'#002744',
                    accent: '#8c191d',
                    error: '#d64143',
                    info: '#5bc0de',
                    success: '#5cb85c',
                    warning: '#f0ad4e'
            }

        }
    },
    icons:{
        iconFont: 'md',
    },

    
});
