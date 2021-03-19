import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import vuetify from "../../ui/plugins/vuetify"
import '../../ui/plugins/index';
import store from '../../ui/store'
import '../../ui/directives';

// Main App
import App from '/imports/ui/App';
import router from "../../ui/router";

Meteor.startup(()=> {
   new Vue({
       router,
       store,
       vuetify,
       render: h=>h(App)
   }).$mount("app" );

});


