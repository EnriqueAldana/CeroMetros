import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';


Vue.use(Vuetify);


export default new Vuetify({
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
