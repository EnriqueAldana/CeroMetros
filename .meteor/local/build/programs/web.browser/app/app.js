var require = meteorInstall({"imports":{"ui":{"components":{"Utilities":{"Alerts":{"AlertMessage.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/Utilities/Alerts/AlertMessage.vue                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var Vue;
module.link("vue", {
  "default": function (v) {
    Vue = v;
  }
}, 0);
module.exportDefault({
  name: "AlertMessage",
  data: function () {
    return {
      snackbar: false,
      x: '',
      y: '',
      color: '',
      mode: '',
      icon: null,
      title: '',
      text: '',
      timeout: 5000
    };
  },
  mounted: function () {
    Vue.prototype.$alert = this;
  },
  methods: {
    showAlertSimple: function (color, title) {
      this.color = color;
      this.title = title;
      this.x = "right";
      this.y = "buttom";

      if (color === "success") {
        this.icon = "check_circle";
      } else if (color === "error") {
        this.icon = "close";
      } else if (color === "info") {
        this.icon = "info";
      } else if (color === "warning") {
        this.icon = "warning";
      }

      this.text = '';
      this.mode = '';
      this.timeout = 5000;
      this.snackbar = true;
    },
    showAlertFull: function (icon, color, title, mode, timeout, x, y) {
      var text = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      this.icon = icon;
      this.color = color;
      this.text = text;
      this.mode = mode;
      this.timeout = timeout;
      this.x = x;
      this.y = y;
      this.snackbar = true;
      this.title = title;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-snackbar',{attrs:{"bottom":_vm.y==='bottom',"top":_vm.y==='top',"right":_vm.x==='right',"left":_vm.x==='left',"color":_vm.color,"multi-line":_vm.mode==='multi-line',"vertical":_vm.mode==='vertical'},model:{value:(_vm.snackbar),callback:function ($$v) {_vm.snackbar=$$v},expression:"snackbar"}},[_c('v-card-title',[(_vm.icon)?_c('v-icon',{attrs:{"dark":"","left":""}},[_vm._v("\n                "+_vm._s(_vm.icon)+"\n              ")]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"white--text"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({attrs:{"dark":"","text":"","small":""},on:{"click":function($event){_vm.snackbar=false}}},on),[_c('v-icon',{attrs:{"small":""}},[_vm._v("mdi-window-close")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Cerrar")])])],1),_vm._v(" "),(_vm.text)?_c('v-card-text',[_c('span',{staticClass:"white--text"},[_vm._v(_vm._s(_vm.text))])]):_vm._e()],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-2ea8699e';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'alert-message';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-2ea8699e'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-2ea8699e', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Loaders":{"Loader.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/Utilities/Loaders/Loader.vue                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "Loader",
  data: function () {
    return {
      loader: false,
      progressLabel: ''
    };
  },
  mounted: function () {
    Vue.prototype.$loader = this;
  },
  methods: {
    activate: function () {
      var progressLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Cargando...';
      this.loader = true;
      this.progressLabel = progressLabel;
    },
    deactivate: function () {
      this.loader = false;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"hide-overlay":"","persistent":"","width":"300"},model:{value:(_vm.loader),callback:function ($$v) {_vm.loader=$$v},expression:"loader"}},[_c('v-card',{attrs:{"color":"primary","dark":""}},[_c('v-card-text',[_vm._v("\n      "+_vm._s(_vm.progressLabel)+"\n      "),_c('v-progress-linear',{staticClass:"mb-0",attrs:{"indeterminate":"","color":"white"}})],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-e3ce3d92';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'loader';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-e3ce3d92'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-e3ce3d92', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Modals":{"ModalRemove.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/Utilities/Modals/ModalRemove.vue                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "ModalRemove",
  props: ['modalData'],
  data: function () {
    return {
      dialog: false
    };
  },
  methods: {
    removeElement: function () {
      console.info('this.modalData borrar', this.modalData);
      this.$emit('id_element', this.modalData._id);
      this.dialog = false;
    },
    cancel: function () {
      this.dialog = false;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"id":"modalRemove","max-width":"500px"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-card',[_c('v-card-title',{staticClass:"headline"},[_c('div',{staticClass:"title"},[_vm._v("\n        Eliminar "+_vm._s(_vm.modalData.typeElement)+"\n      ")])]),_vm._v(" "),_c('v-card-text',[_vm._v("\n      ¿Estas seguro de eliminar "+_vm._s(_vm.modalData.preposition)+"\n      "+_vm._s(_vm.modalData.typeElement)+"\n      "+_vm._s(_vm.modalData.mainNameElement)+"?\n    ")]),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"default","text":""},on:{"click":_vm.cancel}},[_vm._v("\n        Cancelar\n      ")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"error","depressed":""},on:{"click":_vm.removeElement}},[_vm._v("\n        Eliminar\n      ")])],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-09a5e59d';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'modal-remove';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-09a5e59d'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-09a5e59d', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"ConfigureAccount":{"GeneralData.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/ConfigureAccount/GeneralData.vue                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 0);
var uploadImage;
module.link("../../mixins/users/uploadImage", {
  "default": function (v) {
    uploadImage = v;
  }
}, 1);
module.exportDefault({
  name: "GeneralData",
  mixins: [uploadImage],
  data: function () {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{
          address: null,
          verified: false
        }],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      }
    };
  },
  created: function () {
    var user = this.$store.state.auth.user;
    this.user = {
      _id: user._id,
      username: user.username,
      emails: user.emails,
      profile: user.profile
    };
  },
  methods: _objectSpread({}, mapMutations('auth', ['setUser']), {
    saveUser: function () {
      var _this = this;

      this.$loader.activate("Actualizando datos...");
      Meteor.call('user.updatePersonalData', {
        user: this.user,
        photoFileUser: this.photoFileUser
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          // Aqui actualizar usuario logeado en el Header
          // Subirlo a la sesion trayendolo desde la BD con Meteor.user()
          _this.setUser(Meteor.user()); // invocar el escuchador de cambio de datos en user.updatePersonalData


          _this.$root.$emit('setUserLogged');

          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  })
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-form',{on:{"submit":function($event){$event.preventDefault();return _vm.saveUser($event)}}},[_c('v-card',[_c('v-card-title',[_c('div',{staticClass:"subtitle-2"},[_vm._v("\n        DATOS GENERALES\n      ")])]),_vm._v(" "),_c('v-row',[_c('v-col',{staticClass:"pl-10",attrs:{"cols":"12","sm":"12","md":"3","lg":"3"}},[_c('img',{attrs:{"src":_vm.user.profile.path || '/img/user.png',"alt":_vm.user.profile.name,"width":"100px"}}),_vm._v(" "),_c('v-file-input',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],ref:"imageFile",attrs:{"accept":"image/png, image/jpeg , image/bpm"},model:{value:(_vm.file),callback:function ($$v) {_vm.file=$$v},expression:"file"}}),_vm._v(" "),_c('v-btn',{staticClass:"mb-5 mt-5",attrs:{"color":"primary","width":"100%","rounded":"","depressed":""},on:{"click":_vm.onClickUploadButtom}},[(_vm.user.profile.path)?_c('span',[_vm._v("Cambiar")]):_c('span',[_vm._v("Cargar")])])],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","sm":"12","md":"9","lg":"9"}},[_c('v-card-text',[_c('v-text-field',{attrs:{"id":"inputName","name":"name","label":"Nombre completo"},model:{value:(_vm.user.profile.name),callback:function ($$v) {_vm.$set(_vm.user.profile, "name", $$v)},expression:"user.profile.name"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputUsername","name":"username","label":"Usuario"},model:{value:(_vm.user.username),callback:function ($$v) {_vm.$set(_vm.user, "username", $$v)},expression:"user.username"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputEmail","name":"email","label":"Correo electrónico"},model:{value:(_vm.user.emails[0].address),callback:function ($$v) {_vm.$set(_vm.user.emails[0], "address", $$v)},expression:"user.emails[0].address"}}),_vm._v(" "),_c('div',{staticClass:"d-flex justify-center"},[_c('v-btn',{attrs:{"type":"submit","color":"primary","rounded":"","depressed":""}},[_vm._v("\n              Guardar\n            ")])],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-15dc427a';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'general-data';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-15dc427a'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-15dc427a', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"UpdatePassword.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/ConfigureAccount/UpdatePassword.vue                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "UpdatePassword",
  data: function () {
    return {
      password: {
        old: null,
        "new": null,
        confirm: null
      },
      showPass: {
        old: null,
        "new": null,
        confirm: null
      }
    };
  },
  methods: {
    updatePassword: function () {
      var _this = this;

      Accounts.changePassword(this.password.old, this.password.new, function (error) {
        if (error) {
          _this.$alert.showAlertSimple('error', 'Ocurrio un error al cambiar la contraseña');
        } else {
          _this.password = {
            old: null,
            "new": null,
            confirm: null
          };

          _this.$alert.showAlertSimple('success', 'Se ha actualizado la conraseña con exito.');
        }
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-form',{on:{"submit":function($event){$event.preventDefault();return _vm.updatePassword($event)}}},[_c('v-card',[_c('v-card-title',[_c('div',{staticClass:"subtitle-2"},[_vm._v("CAMBIO DE CONTRASEÑA")])]),_vm._v(" "),_c('v-card-text',[_c('v-text-field',{attrs:{"id":"inputPassword","append-icon":_vm.showPass.old?'mdi-eye':'mdi-eye-off',"type":_vm.showPass.old?'text':'password',"name":"current_password","label":"Contraseña actual","autocomplete":"off"},on:{"click:append":function($event){_vm.showPass.old= !_vm.showPass.old}},model:{value:(_vm.password.old),callback:function ($$v) {_vm.$set(_vm.password, "old", $$v)},expression:"password.old"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputNewPassword","append-icon":_vm.showPass.new?'mdi-eye':'mdi-eye-off',"type":_vm.showPass.new?'text':'password',"name":"password","label":"Nueva contraseña","autocomplete":"new-password"},on:{"click:append":function($event){_vm.showPass.new= !_vm.showPass.new}},model:{value:(_vm.password.new),callback:function ($$v) {_vm.$set(_vm.password, "new", $$v)},expression:"password.new"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputConfirmPassword","append-icon":_vm.showPass.confirm?'mdi-eye':'mdi-eye-off',"type":_vm.showPass.confirm?'text':'password',"name":"password_confirmation","label":"Confirmar contraseña"},on:{"click:append":function($event){_vm.showPass.confirm= !_vm.showPass.confirm}},model:{value:(_vm.password.confirm),callback:function ($$v) {_vm.$set(_vm.password, "confirm", $$v)},expression:"password.confirm"}}),_vm._v(" "),_c('div',{staticClass:"d-flex justify-center"},[_c('v-btn',{attrs:{"type":"submit","color":"primary","rounded":"","depressed":""}},[_vm._v("Cambiar")])],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-5c1ea0ec';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'update-password';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-5c1ea0ec'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-5c1ea0ec', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"UserLogged":{"UserLogged.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/UserLogged/UserLogged.vue                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 0);
module.exportDefault({
  name: "UserLogged",
  data: function () {
    return {
      user: {
        username: null
      },
      onLogoutHook: null
    };
  },
  created: function () {
    this.setSession();
  },
  mounted: function () {
    var _this = this;

    // Escuchador para cuando se guarden datos del usuario- GeneralData
    this.$root.$on('setUserLogged', function () {
      _this.setSession();
    });
    this.onLogoutHook = Accounts.onLogout(function () {
      _this.closeFrontSession();
    });
  },
  methods: _objectSpread({}, mapMutations('auth', ['logout']), {
    closeSession: function () {
      this.onLogoutHook.stop();
      Meteor.logout(); // Aqui se limpia la sesion del lado del servidor

      this.logout(); // Aqui se limpia la sesion del lado del cliente

      this.$router.push({
        name: 'login'
      });
    },
    closeFrontSession: function () {
      this.onLogoutHook.stop();
      this.logout(); // Aqui se limpia la sesion del lado del cliente

      this.$router.push({
        name: 'login'
      });
    },
    setSession: function () {
      if (Meteor.userId() !== null) {
        this.user = this.$store.state.auth.user;
      } else {
        this.closeSession();
      }
    }
  })
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-menu',{attrs:{"offset-y":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({staticClass:"mr-5",attrs:{"color":"default","dark":"","text":""}},on),[_vm._v("\n      "+_vm._s(_vm.user.username)+"\n      "),_c('v-icon',[_vm._v("keyboard_arrow_down")])],1)]}}])},[_vm._v(" "),_c('v-list',[_c('v-list-item',{attrs:{"to":{name:'home.account'}}},[_vm._v("Cuenta")]),_vm._v(" "),_c('v-list-item',{on:{"click":_vm.closeSession}},[_vm._v("Cerrar sesión")])],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-75ee5f8f';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'user-logged';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-75ee5f8f'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-75ee5f8f', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"layouts":{"shared":{"FooterView.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/layouts/shared/FooterView.vue                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "FooterView"
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-footer',{attrs:{"padless":""}},[_c('v-col',{staticClass:"d-flex justify-center",attrs:{"cols":"12"}},[_c('span',{staticClass:"white--text"},[_vm._v("\n              Implementado por Ingeniería en Computo\n          ")])])],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-6aba7c8a';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'footer-view';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-6aba7c8a'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-6aba7c8a', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"HeaderView.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/layouts/shared/HeaderView.vue                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var UserLogged;
module.link("../../components/UserLogged/UserLogged", {
  "default": function (v) {
    UserLogged = v;
  }
}, 0);
module.exportDefault({
  name: "HeaderView",
  components: {
    UserLogged: UserLogged
  },
  data: function () {
    return {
      optionSelected: 0,
      options: []
    };
  },
  created: function () {
    var _this = this;

    Meteor.call('user.getSystemOptions', null, function (error, response) {
      if (error) {
        _this.$alert.showAlertSimple('error', error.reason);
      } else {
        _this.options = response.data;

        _this.updateSelectedOption();
      }
    });
  },
  watch: {
    '$route': function () {
      this.updateSelectedOption();
    }
  },
  methods: {
    goToView: function (option) {
      this.$router.push({
        name: option.routeName
      });
    },
    updateSelectedOption: function () {
      var _this2 = this;

      var optionSelected = this.options.find(function (option) {
        return option.routeName === _this2.$route.name;
      });
      this.optionSelected = optionSelected ? this.options.indexOf(optionSelected) : this.optionSelected;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app-bar',{attrs:{"app":"","dark":"","dense":"","src":"https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"},scopedSlots:_vm._u([{key:"extension",fn:function(){return [_c('v-tabs',{attrs:{"align-with-title":""},model:{value:(_vm.optionSelected),callback:function ($$v) {_vm.optionSelected=$$v},expression:"optionSelected"}},_vm._l((_vm.options),function(option){return _c('v-tab',{key:option.title,domProps:{"textContent":_vm._s(option.title)},on:{"click":function($event){return _vm.goToView(option)}}})}),1)]},proxy:true}])},[_c('v-toolbar-title',[_vm._v("Sistema Cero Metros")]),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('user-logged')],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-f98446a6';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'header-view';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-f98446a6'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-f98446a6', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"LytAuth.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/layouts/LytAuth.vue                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "LytAuth"
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-row',[_c('v-col',{staticClass:"d-flex flex-column justify-space-around pa-12",attrs:{"xs":"12","sm":"8","md":"4"}},[_c('div',{staticClass:"text-center"},[_c('img',{attrs:{"src":"/img/vuetify.png","alt":"Vuetify","height":"180px","width":"auto"}})]),_vm._v(" "),_c('router-view',{attrs:{"name":"sectionView"}}),_vm._v(" "),_c('div',{staticClass:"text-center"},[_c('img',{attrs:{"src":"/img/Powered.png","alt":"Powered by IngeCompu","id":"poweredLogo","height":"35px"}})])],1),_vm._v(" "),_c('v-col',{staticClass:"right-side d-flex flex-column justify-center",attrs:{"xs":"12","sm":"4","md":"8"}},[_c('div',{staticClass:"display-3 font-weight-medium mr-10 text-left white--text"},[_vm._v("\n              Sistema Cero Metros\n          ")])])],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-5c92ee40';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'lyt-auth';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-5c92ee40'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-5c92ee40', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"LytSPA.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/layouts/LytSPA.vue                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var HeaderView;
module.link("./shared/HeaderView", {
  "default": function (v) {
    HeaderView = v;
  }
}, 0);
var FooterView;
module.link("./shared/FooterView", {
  "default": function (v) {
    FooterView = v;
  }
}, 1);
module.exportDefault({
  name: "LytSPA",
  components: {
    HeaderView: HeaderView,
    FooterView: FooterView
  },
  data: function () {
    return {
      loggedUser: false
    };
  },
  mounted: function () {
    this.$subscribe('roles', []);
  },
  watch: {
    '$subReady.roles': function (newValue) {
      if (newValue) {
        this.loggedUser = true;
      }
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[_c('header-view'),_vm._v(" "),_c('v-main',{attrs:{"id":"main_section"}},[(_vm.loggedUser)?_c('router-view',{attrs:{"name":"sectionView"}}):_vm._e()],1),_vm._v(" "),_c('footer-view')],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-70df483c';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'lyt-s-p-a';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-70df483c'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-70df483c', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"mixins":{"helpers":{"date.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/mixins/helpers/date.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exportDefault({
  methods: {
    currentLocalDate() {
      const date = new Date();
      const offsetMs = date.getTimezoneOffset() * 60 * 1000;
      console.log('ofset en Horas ', date.getTimezoneOffset());
      const msLocal = date.getTime() - offsetMs;
      return new Date(msLocal);
    }

  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"users":{"uploadImage.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/mixins/users/uploadImage.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exportDefault({
  data() {
    return {
      file: null,
      photoFileUser: null
    };
  },

  watch: {
    // El nombre de la funcion debera ser el de la variable por observar
    file(newFile) {
      if (newFile && typeof FileReader != 'undefined') {
        const reader = new FileReader();

        reader.onload = function (ev) {
          this.user.profile.path = ev.target.result;
          this.photoFileUser = ev.target.result;
        }.bind(this);

        reader.readAsDataURL(newFile);
      }
    }

  },
  methods: {
    onClickUploadButtom() {
      this.$refs.imageFile.$refs.input.click();
    }

  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"modules":{"authentication":{"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/modules/authentication/index.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let state;
module.link("./state", {
  default(v) {
    state = v;
  }

}, 0);
let mutations;
module.link("./mutations", {
  "*"(v) {
    mutations = v;
  }

}, 1);
module.exportDefault({
  namespaced: true,
  mutations,
  state
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mutations.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/modules/authentication/mutations.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  setUser: () => setUser,
  logout: () => logout
});

const setUser = (state, user) => {
  state.user = user;
  state.isLogged = true;
};

const logout = state => {
  state.user = null;
  state.isLogged = false;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"state.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/modules/authentication/state.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exportDefault({
  user: null,
  isLogged: false
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"temporal":{"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/modules/temporal/index.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let state;
module.link("./state", {
  default(v) {
    state = v;
  }

}, 0);
let mutations;
module.link("./mutations", {
  "*"(v) {
    mutations = v;
  }

}, 1);
module.exportDefault({
  namespaced: true,
  mutations,
  state
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mutations.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/modules/temporal/mutations.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  setElement: () => setElement
});

const setElement = (state, element) => {
  state.element = element;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"state.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/modules/temporal/state.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exportDefault({
  element: null
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"views":{"Account":{"ConfigureAccount.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Account/ConfigureAccount.vue                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var GeneralData;
module.link("../../components/ConfigureAccount/GeneralData", {
  "default": function (v) {
    GeneralData = v;
  }
}, 0);
var UpdatePassword;
module.link("../../components/ConfigureAccount/UpdatePassword", {
  "default": function (v) {
    UpdatePassword = v;
  }
}, 1);
module.exportDefault({
  name: "ConfigureAccount",
  components: {
    GeneralData: GeneralData,
    UpdatePassword: UpdatePassword
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v("Configurar cuenta")])])],1),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12","xs":"12","sm":"12","md":"6","lg":"6","xl":"5"}},[_c('general-data')],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","xs":"12","sm":"12","md":"6","lg":"6","offset-xl":"1","xl":"5"}},[_c('update-password')],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-3476f983';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'configure-account';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-3476f983'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-3476f983', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Auth":{"ForgotPassword.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Auth/ForgotPassword.vue                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "ForgotPassword",
  data: function () {
    return {
      user: {
        email: null
      }
    };
  },
  methods: {
    forgotPassword: function () {
      var _this = this;

      // la funcion forgotPassword, se encarga de enviar el correo fijado para tal efecto.
      Accounts.forgotPassword(this.user, function (error, response) {
        if (error) {
          console.log('Error al enviar el correo ' + _this.user.email, error.error);

          _this.$alert.showAlertSimple('error', 'Error al mandar el correo');
        } else {
          _this.$alert.showAlertSimple('success', 'El correo ha sido enviado con exito.' + 'Vaya a su cuenta de correo y haga clic en el link mostrado para iniciar sesion.');

          setTimeout(function () {
            _this.$router.push({
              'name': 'login'
            });
          }, 5000);
        }
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"d-flex flex-row justify-start"},[_c('v-btn',{attrs:{"color":"primary","icon":"","to":{name:'login'}}},[_c('v-icon',[_vm._v("arrow_back")])],1),_vm._v(" "),_c('div',{staticClass:"title"},[_vm._v("Olvidé mi contraseña")])],1),_vm._v(" "),_c('v-form',{on:{"submit":function($event){$event.preventDefault();return _vm.forgotPassword($event)}}},[_c('v-text-field',{attrs:{"id":"inputEmail","name":"email","type":"email","label":"Correo electrónico"},model:{value:(_vm.user.email),callback:function ($$v) {_vm.$set(_vm.user, "email", $$v)},expression:"user.email"}}),_vm._v(" "),_c('v-btn',{attrs:{"type":"submit","color":"primary","rounded":""}},[_vm._v("Recuperar")])],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-d3c12c4a';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'forgot-password';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-d3c12c4a'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-d3c12c4a', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Login.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Auth/Login.vue                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 0);
module.exportDefault({
  name: "Login",
  data: function () {
    return {
      user: {
        userOrEmail: null,
        password: null
      }
    };
  },
  methods: _objectSpread({}, mapMutations('auth', ['setUser']), {
    login: function () {
      var _this = this;

      Meteor.loginWithPassword(this.user.userOrEmail, this.user.password, function (error) {
        if (error) {
          if (error.error === '403') {
            _this.$alert.showAlertFull('mid-close-circle', 'warning', error.reason, '', 5000, 'centred', 'bottom');
          } else {
            _this.$alert.showAlertSimple('error', 'Credenciales incorrectas');
          }
        } else {
          Meteor.logoutOtherClients(function (err) {
            if (err) {
              console.error('Error al cerrar sesion en otros dispositivos');
            }
          });

          _this.setUser(Meteor.user());

          _this.$router.push({
            name: 'home'
          });
        }
      });
    }
  })
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login-wrapper"},[_c('div',{staticClass:"title secondary--text"},[_vm._v("Bienvenido!")]),_vm._v(" "),_c('div',{staticClass:"display-1 mb-0 secondary--text"},[_vm._v("Iniciar sesión")]),_vm._v(" "),_c('v-form',{attrs:{"autocomplete":"nope"},on:{"submit":function($event){$event.preventDefault();return _vm.login($event)}}},[_c('v-text-field',{attrs:{"id":"inputUser","autocomplete":"off","label":"Usuario","name":"email","prepend-icon":"person","color":"primary","type":"text"},model:{value:(_vm.user.userOrEmail),callback:function ($$v) {_vm.$set(_vm.user, "userOrEmail", $$v)},expression:"user.userOrEmail"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputPassword","label":"Contraseña","name":"password","prepend-icon":"lock","type":"password"},model:{value:(_vm.user.password),callback:function ($$v) {_vm.$set(_vm.user, "password", $$v)},expression:"user.password"}}),_vm._v(" "),_c('div',{staticClass:"d-flex justify-end"},[_c('v-btn',{attrs:{"color":"primary","text":"","to":{name:'forgotPassword'},"small":""}},[_vm._v("¿Olvidé mi contraseña?")])],1),_vm._v(" "),_c('div',{staticClass:"d-flex justify-start"},[_c('v-btn',{attrs:{"type":"submit","rounded":"","color":"primary","transition":"fade"}},[_vm._v("Entrar")])],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-93246f08';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'login';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-93246f08'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-93246f08', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ResetPassword.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Auth/ResetPassword.vue                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "ResetPassword",
  data: function () {
    return {
      user: {
        password: null,
        confirmPassword: null
      },
      showPass: {
        "new": false,
        confirm: false
      }
    };
  },
  methods: {
    resetPassword: function () {
      var _this = this;

      var token = this.$route.params.token;
      Accounts.resetPassword(token, this.user.password, function (error, success) {
        if (error) {
          _this.$alert.showAlertSimple('error', 'Se produjo un error al cambiar la contraseña');
        } else {
          _this.$alert.showAlertSimple('success', 'Se estableció la contraseña con exito');

          _this.$router.push({
            'name': 'login'
          });
        }
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"title"},[_vm._v("Restablecer contraseña")]),_vm._v(" "),_c('v-form',{on:{"submit":function($event){$event.preventDefault();return _vm.resetPassword($event)}}},[_c('v-text-field',{attrs:{"id":"inputPassword","append-icon":_vm.showPass.new?'mdi-eye':'mdi-eye-off',"type":_vm.showPass.new ?'text':'password',"name":"password","label":"Nueva contraseña","autocomplete":"new-password"},on:{"click:append":function($event){_vm.showPass.new=!_vm.showPass.new}},model:{value:(_vm.user.password),callback:function ($$v) {_vm.$set(_vm.user, "password", $$v)},expression:"user.password"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputConfirmPassword","append-icon":_vm.showPass.confirm?'mdi-eye':'mdi-eye-off',"type":_vm.showPass.confirm ?'text':'password',"name":"password_confirmation","label":"Confirmar contraseña","autocomplete":"new-password"},on:{"click:append":function($event){_vm.showPass.confirm=!_vm.showPass.confirm}},model:{value:(_vm.user.confirmPassword),callback:function ($$v) {_vm.$set(_vm.user, "confirmPassword", $$v)},expression:"user.confirmPassword"}}),_vm._v(" "),_c('div',{staticClass:"d-flex start"},[_c('v-btn',{attrs:{"type":"submit","color":"primary","rounded":""}},[_vm._v("Restablecer")])],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-c1cf1ac6';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'reset-password';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-c1cf1ac6'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-c1cf1ac6', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SetInitialPassword.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Auth/SetInitialPassword.vue                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "SetInitialPassword",
  data: function () {
    return {
      user: {
        password: null,
        confirmPassword: null
      },
      showPass: {
        "new": false,
        confirm: false
      }
    };
  },
  methods: {
    setPassword: function () {
      var _this = this;

      var token = this.$route.params.token;
      Accounts.resetPassword(token, this.user.password, function (error, success) {
        if (error) {
          _this.$alert.showAlertSimple('error', 'Se produjo un error al establecer la contraseña');
        } else {
          _this.$alert.showAlertSimple('success', 'Se estableció la contraseña con exito');

          _this.$router.push({
            'name': 'login'
          });
        }
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"title"},[_vm._v("Establecer contraseña")]),_vm._v(" "),_c('v-form',{on:{"submit":function($event){$event.preventDefault();return _vm.setPassword($event)}}},[_c('v-text-field',{attrs:{"id":"inputPassword","append-icon":_vm.showPass.new?'mdi-eye':'mdi-eye-off',"type":_vm.showPass.new ?'text':'password',"name":"password","label":"Nueva contraseña","autocomplete":"new-password"},on:{"click:append":function($event){_vm.showPass.new=!_vm.showPass.new}},model:{value:(_vm.user.password),callback:function ($$v) {_vm.$set(_vm.user, "password", $$v)},expression:"user.password"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputConfirmPassword","append-icon":_vm.showPass.confirm?'mdi-eye':'mdi-eye-off',"type":_vm.showPass.confirm ?'text':'password',"name":"password_confirmation","label":"Confirmar contraseña","autocomplete":"new-password"},on:{"click:append":function($event){_vm.showPass.confirm=!_vm.showPass.confirm}},model:{value:(_vm.user.confirmPassword),callback:function ($$v) {_vm.$set(_vm.user, "confirmPassword", $$v)},expression:"user.confirmPassword"}}),_vm._v(" "),_c('div',{staticClass:"d-flex justify-start mt-2"},[_c('v-btn',{attrs:{"type":"submit","color":"primary","rounded":""}},[_vm._v("Establecer")])],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-a361d38c';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'set-initial-password';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-a361d38c'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-a361d38c', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"VerifyEmail.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Auth/VerifyEmail.vue                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "VerifyEmail",
  data: function () {
    return {
      loading: true,
      status: false,
      message: null,
      description: null
    };
  },
  mounted: function () {
    var _this = this;

    // Verificar email
    var token = this.$route.params.token;
    Accounts.verifyEmail(token, function (error) {
      _this.loading = false;

      if (error) {
        console.error('Ha habido un error en la validacion de correo del usuario');
        _this.message = 'Ocurrió un error al verificar su correo';
        _this.description = 'Intente hacer un registro de su usuario o restablezca su contraseña.';
        _this.status = false;
      } else {
        _this.message = 'Se ha verificado tu correo electronico. Ahora puedes iniciar sesion';
        _this.status = true;
      }
    });
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"align":"center"}},[(_vm.loading)?_c('div',[_c('h3',[_vm._v("Cargando datos...")])]):_c('div',[_c('v-icon',{attrs:{"size":"120","color":_vm.status?'green':'red'}},[_vm._v("\n        "+_vm._s(_vm.status ? 'mdi-check-circle' : 'mdi-cancel')+"\n      ")]),_vm._v(" "),_c('h3',{staticClass:"text-wrap"},[_vm._v("\n        "+_vm._s(_vm.message)+"\n        "),_c('small',{domProps:{"textContent":_vm._s(_vm.description)}})]),_vm._v(" "),_c('v-btn',{attrs:{"to":{name:'login'},"color":"primary"}},[_vm._v("Regresar a inicio")])],1)])};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-0dde7a76';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'verify-email';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-0dde7a76'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-0dde7a76', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Chat":{"Chat.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Chat/Chat.vue                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var Message;
module.link("../../../api/Messages/Message", {
  Message: function (v) {
    Message = v;
  }
}, 0);
var date;
module.link("../../mixins/helpers/date", {
  "default": function (v) {
    date = v;
  }
}, 1);
module.exportDefault({
  name: 'Chat',
  mixins: [date],
  data: function () {
    return {
      contactSelected: null,
      message: {
        idSender: null,
        idReceiver: null,
        date: null,
        text: null,
        read: false
      }
    };
  },
  updated: function () {
    var elem = this.$el.querySelector('#msgContainer');

    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  },
  methods: {
    sendMessage: function () {
      var _this = this;

      this.message.idSender = Meteor.userId();
      this.message.idReceiver = this.contactSelected._id;
      this.message.date = this.currentLocalDate().toISOString();
      Meteor.call('message.save', this.message, function (error, response) {
        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.message.text = null;
        }
      });
    },
    markMessageAsRead: function () {
      var _this2 = this;

      var unReadMessages = [];
      unReadMessages = this.messages.filter(function (message) {
        return message.read === false && message.idReceiver === Meteor.userId();
      });

      if (unReadMessages.length) {
        Meteor.call('messages.read', unReadMessages, function (error) {
          if (error) {
            _this2.$alert.showAlertSimple('error', error.reason);
          }
        });
      }
    }
  },
  meteor: {
    $subscribe: {
      'user.list': [],
      'message.list': function () {
        return [this.contactSelected ? this.contactSelected._id : null];
      }
    },
    users: function () {
      return Meteor.users.find({
        _id: {
          $ne: Meteor.userId()
        }
      }).fetch();
    },
    messages: function () {
      return this.contactSelected ? Message.find({}, {
        sort: {
          date: 1
        }
      }).fetch() : [];
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[_c('v-row',[_c('v-col',{attrs:{"cols":"12","xs":"12","sm":"4","md":"3","lg":"2","xl":"2"}},[_c('v-card',{staticClass:"mx-auto",attrs:{"max-width":"300","tile":""}},[_c('v-list',{attrs:{"subheader":""}},[_c('v-subheader',[_vm._v("Contactos")]),_vm._v(" "),_c('v-list-item-group',{attrs:{"color":"primary"},model:{value:(_vm.contactSelected),callback:function ($$v) {_vm.contactSelected=$$v},expression:"contactSelected"}},[_c('v-divider'),_vm._v(" "),_vm._l((_vm.users),function(contact){return [_c('v-list-item',{key:contact._id,attrs:{"value":contact}},[_c('v-list-item-icon',[_c('v-icon',{attrs:{"color":contact.status.online?'green':'red'}},[_vm._v("\n                                             mdi-checkbox-blank-circle\n                                         ")])],1),_vm._v(" "),_c('v-list-item-content',[_c('v-list-item-title',{domProps:{"textContent":_vm._s(contact.profile.name)}})],1)],1)]})],2)],1)],1)],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","xs":"12","sm":"8","md":"9","lg":"10","xl":"10"}},[(_vm.contactSelected)?_c('v-card',{staticClass:"mx-auto",attrs:{"height":"70vh"}},[_c('v-list-item',[_c('v-list-item-avatar',{attrs:{"size":"36px"}},[_c('img',{attrs:{"src":_vm.contactSelected.profile.path || '/img/user.png',"alt":"Avatar"}})]),_vm._v(" "),_c('v-list-item-title',{staticClass:"headline"},[_vm._v(_vm._s(_vm.contactSelected.profile.name))])],1),_vm._v(" "),_c('v-card-text',{staticClass:"overflow-y-auto",staticStyle:{"height":"70%"},attrs:{"id":"msgContainer"}},_vm._l((_vm.messages),function(msg){return _c('v-row',{class:msg.idReceiver===_vm.contactSelected._id?'justify-end':'justify-start'},[_c('v-col',{attrs:{"cols":"7"}},[_c('v-card',{attrs:{"raised":"","shaped":"","color":msg.idReceiver===_vm.contactSelected._id? 'cyan lighten-5':'red lighten-5'}},[_c('v-card-text',{staticClass:"pb-1"},[_vm._v("\n                                 "+_vm._s(msg.text)+"\n                                 ")]),_vm._v(" "),_c('v-card-subtitle',{staticClass:"text-right pt-1 pb-1"},[_c('v-tooltip',{attrs:{"left":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({attrs:{"small":""}},on),[_vm._v("info_outlined")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v(_vm._s(msg.date.substring(0,10)))])]),_vm._v("\n                                     "+_vm._s(msg.date.split('T')[1].substring(0,5))+"\n                                     "),_c('v-icon',{staticStyle:{"margin-right":"-15px"},attrs:{"small":"","color":msg.read?'blue':'gray'}},[_vm._v("\n                                         check\n                                     ")]),_vm._v(" "),_c('v-icon',{attrs:{"small":"","color":msg.read?'blue':'gray'}},[_vm._v("\n                                         check\n                                     ")])],1)],1)],1)],1)}),1),_vm._v(" "),_c('v-card-actions',[_c('v-text-field',{attrs:{"autocomplete":"off","label":"Introduce tu mensaje"},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.sendMessage($event)},"focus":_vm.markMessageAsRead},model:{value:(_vm.message.text),callback:function ($$v) {_vm.$set(_vm.message, "text", $$v)},expression:"message.text"}}),_vm._v(" "),_c('v-btn',{staticClass:"mx-2",attrs:{"fab":"","dark":"","color":"indigo"},on:{"click":_vm.sendMessage}},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("send")])],1)],1)],1):_c('v-card',{attrs:{"height":"70vh"}},[_c('h1',[_vm._v("Bienvenido al Chat")])])],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-2dc1bbe5';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'chat';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-2dc1bbe5'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-2dc1bbe5', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Companies":{"ListCompanies.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Companies/ListCompanies.vue                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 0);
var Company;
module.link("../../../api/Companies/Company", {
  Company: function (v) {
    Company = v;
  }
}, 1);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 2);
module.exportDefault({
  name: 'ListCompanies',
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      headersFilter: {
        isAvailable: '',
        name: '',
        name_full: '',
        companyBussinessId: '',
        address: '',
        phones: '',
        web: '',
        email: ''
      },
      companyTemp: {
        preposition: 'la',
        typeElement: 'empresa',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    };
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditCompany: function (company) {
      //Guardar en Vuex para recuperar en la vistad de company.save
      this.setElement(company);
      this.$router.push({
        name: 'home.company.edit'
      });
    },
    openRemoveModal: function (company) {
      console.log("company: ", company);
      this.companyTemp.element = company;
      this.companyTemp._id = company._id;
      this.companyTemp.mainNameElement = company.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteCompany: function (idCompany) {
      var _this = this;

      this.$loader.activate("Eliminando empresa....");
      Meteor.call('company.delete', {
        idCompany: idCompany
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  computed: {
    headers: function () {
      var _this2 = this;

      return [{
        value: 'isAvailable',
        text: 'Disponible',
        sortable: true
      }, {
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name_full',
        text: 'Nombre completo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name_full.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'companyBussinessId',
        text: 'RFC',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.companyBussinessId.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'address',
        text: 'Direccion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.address.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'phones',
        text: 'Telefonos',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.phones.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'web',
        text: 'Web',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.web.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'email',
        text: 'Correo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.email.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  meteor: {
    $subscribe: {
      'company.list': []
    },
    companies: function () {
      return Company.find().fetch();
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('companies'),expression:"'companies'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.company.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar empresa")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.companies,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditCompany(item);
}},scopedSlots:_vm._u([{key:"item.isAvailable",fn:function(ref){
var item = ref.item;
return [_c('div',{staticClass:"d-flex align-center pt-5 pb-5"},[_c('v-icon',{attrs:{"color":item.isAvailable?'green' : 'red'}},[_vm._v("\n              mdi-checkbox-blank-circle\n            ")])],1)]}},{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('companies'),expression:"'companies'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditCompany(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('companies'),expression:"'companies'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}},{key:"body.append",fn:function(ref){
var isMobile = ref.isMobile;
return [(!isMobile)?_c('tr',[_c('td'),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre"},model:{value:(_vm.headersFilter.name),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name", $$v)},expression:"headersFilter.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre completo"},model:{value:(_vm.headersFilter.name_full),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name_full", $$v)},expression:"headersFilter.name_full"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"RFC"},model:{value:(_vm.headersFilter.companyBussinessId),callback:function ($$v) {_vm.$set(_vm.headersFilter, "companyBussinessId", $$v)},expression:"headersFilter.companyBussinessId"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Direccion"},model:{value:(_vm.headersFilter.address),callback:function ($$v) {_vm.$set(_vm.headersFilter, "address", $$v)},expression:"headersFilter.address"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Telefonos"},model:{value:(_vm.headersFilter.phones),callback:function ($$v) {_vm.$set(_vm.headersFilter, "phones", $$v)},expression:"headersFilter.phones"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Web"},model:{value:(_vm.headersFilter.web),callback:function ($$v) {_vm.$set(_vm.headersFilter, "web", $$v)},expression:"headersFilter.web"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Correo"},model:{value:(_vm.headersFilter.correo),callback:function ($$v) {_vm.$set(_vm.headersFilter, "correo", $$v)},expression:"headersFilter.correo"}})],1)]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.companyTemp},on:{"id_element":_vm.deleteCompany}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-2e7e07c2';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-companies';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-2e7e07c2'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-2e7e07c2', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveCompany.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Companies/SaveCompany.vue                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "SaveCompany",
  data: function () {
    return {
      company: {
        _id: null,
        name: null,
        name_full: null,
        companyBussinessId: null,
        address: null,
        phones: null,
        web: null,
        email: null,
        isAvailable: false
      },
      rules: {
        required: function (value) {
          return !!value || 'Requerido.';
        },
        counter: function (value) {
          return value.length <= 20 || 'Max 20 caracteres';
        },
        email: function (value) {
          var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Correo Electrónico incorrecto.';
        }
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    };
  },
  created: function () {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear empresa";
      this.dataView.targetButton = "Crear";
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar empresa";
      this.dataView.targetButton = "Actualizar";
      var tempCompany = this.$store.state.temporal.element;
      this.company = {
        _id: tempCompany._id,
        name: tempCompany.name,
        name_full: tempCompany.name_full,
        companyBussinessId: tempCompany.companyBussinessId,
        address: tempCompany.address,
        phones: tempCompany.phones,
        web: tempCompany.web,
        email: tempCompany.email,
        isAvailable: tempCompany.isAvailable
      };
    }
  },
  methods: {
    saveCompany: function () {
      var _this = this;

      this.$loader.activate('Guardando empresa...');
      Meteor.call('company.save', this.company, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.companies'
          });
        }
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveCompany","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-text',[_c('v-form',{attrs:{"id":"saveCompany","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveCompany($event)}}},[_c('v-row',[_c('v-col',{attrs:{"xs":"12","sm":"12","md":"8"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","rules":[_vm.rules.required, _vm.rules.counter],"label":"Nombre","counter":"","maxlength":"20"},model:{value:(_vm.company.name),callback:function ($$v) {_vm.$set(_vm.company, "name", $$v)},expression:"company.name"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputNameFull","name":"name_full","label":"Nombre completo"},model:{value:(_vm.company.name_full),callback:function ($$v) {_vm.$set(_vm.company, "name_full", $$v)},expression:"company.name_full"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputcompanyBussinessId","name":"companyBussinessId","label":"RFC"},model:{value:(_vm.company.companyBussinessId),callback:function ($$v) {_vm.$set(_vm.company, "companyBussinessId", $$v)},expression:"company.companyBussinessId"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputaddress","name":"address","label":"Direccion"},model:{value:(_vm.company.address),callback:function ($$v) {_vm.$set(_vm.company, "address", $$v)},expression:"company.address"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputphones","name":"phones","label":"Telefonos"},model:{value:(_vm.company.phones),callback:function ($$v) {_vm.$set(_vm.company, "phones", $$v)},expression:"company.phones"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputweb","name":"web","label":"Web"},model:{value:(_vm.company.web),callback:function ($$v) {_vm.$set(_vm.company, "web", $$v)},expression:"company.web"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputemail","type":"email","name":"email","rules":[_vm.rules.required, _vm.rules.email],"label":"Correo Electrónico"},model:{value:(_vm.company.email),callback:function ($$v) {_vm.$set(_vm.company, "email", $$v)},expression:"company.email"}}),_vm._v(" "),_c('td',[_c('v-switch',{attrs:{"label":"¿Habilitar empresa?","color":"indigo","hide-details":""},model:{value:(_vm.company.isAvailable),callback:function ($$v) {_vm.$set(_vm.company, "isAvailable", $$v)},expression:"company.isAvailable"}})],1)],1)],1)],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-2230e2fc';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-company';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-2230e2fc'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-2230e2fc', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Home":{"Home.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Home/Home.vue                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "Home"
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',[_vm._v(" Bienvenido")])};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-43ef6845';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'home';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-43ef6845'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-43ef6845', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ProductionLines":{"ListProductionLines.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/ProductionLines/ListProductionLines.vue                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 0);
var ProductionLineRepository;
module.link("../../../api/ProductionLines/ProductionLine", {
  ProductionLineRepository: function (v) {
    ProductionLineRepository = v;
  }
}, 1);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 2);
module.exportDefault({
  name: "ListProductionLines",
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      desserts: [{
        name: 'Frozen Yogurt',
        calories: 159
      }, {
        name: 'Ice cream sandwich',
        calories: 237
      }, {
        name: 'Eclair',
        calories: 262
      }, {
        name: 'Cupcake',
        calories: 305
      }, {
        name: 'Gingerbread',
        calories: 356
      }, {
        name: 'Jelly bean',
        calories: 375
      }, {
        name: 'Lollipop',
        calories: 392
      }, {
        name: 'Honeycomb',
        calories: 408
      }, {
        name: 'Donut',
        calories: 452
      }, {
        name: 'KitKat',
        calories: 518
      }],
      headers: [{
        value: 'name',
        text: 'Nombre de la linea de produccion',
        sortable: true
      }, {
        value: 'description',
        text: 'Descripcion',
        sortable: true
      }, {
        value: 'workstations.name',
        text: 'Estaciones de trabajo',
        sortable: true
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }],
      productionlinesTemp: {
        preposition: 'la',
        typeElement: 'linea de produccion',
        mainNameElement: '',
        _id: null,
        element: {}
      },
      workstation: {
        _id: '',
        name: '',
        name_full: '',
        location: '',
        productionline: {
          _id: '',
          name: '',
          description: '',
          workstations: [String]
        }
      }
    };
  },
  created: function () {
    console.info('productionlines');
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditProductionLine: function (productionline) {
      //Guardar en Vuex
      this.setElement(productionline);
      this.$router.push({
        name: 'home.productionlines.edit'
      });
    },
    openRemoveModal: function (productionline) {
      this.productionlinesTemp.element = productionline;
      this.productionlinesTemp._id = productionline._id;
      this.productionlinesTemp.mainNameElement = productionline.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteProductionLine: function (idProductionline) {
      var _this = this;

      this.$loader.activate('Eliminando linea de produccion...');
      Meteor.call('productionline.delete', {
        idProductionline: idProductionline
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          if (error.details) {
            _this.$alert.showAlertFull('warning', 'error', error.reason, 'multi-line', '5000', 'right', 'bottom', error.details);
          } else {
            _this.$alert.showAlertSimple('error', 'Ocurrio un error al eliminar la linea de produccion');
          }
        } else {
          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  meteor: {
    $subscribe: {
      'productionlines.list': []
    },
    productionlines: function () {
      var productionLines = ProductionLineRepository.find().fetch();
      console.log(productionLines);
      return productionLines;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('productionlines'),expression:"'productionlines'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.productionlines.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar linea de produccion")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.productionlines,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditProductionLine(item);
}},scopedSlots:_vm._u([{key:"item.workstations.name",fn:function(ref){
var item = ref.item;
return [[_c('v-simple-table',{scopedSlots:_vm._u([{key:"default",fn:function(){return [_c('tbody',_vm._l((item.workstations),function(item){return _c('tr',{key:item.name},[_c('td',[_vm._v(_vm._s(item.name))])])}),0)]},proxy:true}],null,true)})]]}},{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('productionlines'),expression:"'productionlines'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditProductionLine(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('productionlines'),expression:"'productionlines'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}}])})],1)],1),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.productionlinesTemp},on:{"id_element":_vm.deleteProductionLine}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-64853416';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-production-lines';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-64853416'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-64853416', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveProductionLine.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/ProductionLines/SaveProductionLine.vue                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var draggable;
module.link("vuedraggable", {
  "default": function (v) {
    draggable = v;
  }
}, 0);
module.exportDefault({
  name: "SaveProductionLine",
  components: {
    draggable: draggable
  },
  data: function () {
    return {
      productionline: {
        _id: null,
        name: null,
        description: null,
        workstations: []
      },
      dataView: {
        title: '',
        targetButton: ''
      },
      searchSelfWorkstation: '',
      searchWorkstation: '',
      selfWorkstations: [],
      allWorkstations: []
    };
  },
  created: function () {
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear linea de produccion";
      this.dataView.targetButton = "Crear"; //this.listAllWorkstations();
    } else if (this.$router.currentRoute.name.includes("edit")) {
      var tempWorkstation = this.$store.state.temporal.element;
      this.productionline = {
        _id: tempWorkstation._id,
        name: tempWorkstation.name,
        description: tempWorkstation.description,
        workstations: tempWorkstation.workstations
      };
      this.initWorkstations(this.productionline._id);
      this.dataView.title = "Editar linea de produccion";
      this.dataView.targetButton = "Actualizar";
    }
  },
  methods: {
    onChangeDragList: function (event, propData) {
      if (event.hasOwnProperty('removed')) {
        this[propData] = this[propData].filter(function (permission) {
          return permission._id != event.removed.element._id;
        });
      } else if (event.hasOwnProperty('added')) {
        this[propData].splice(event.added.newIndex, 0, event.added.element);
      }
    },
    saveProductionLine: function () {
      var _this = this;

      console.log("Guardando Linea de produccion: ", this.productionline);
      this.$loader.activate('Guardando linea de produccion ...');
      this.productionline.workstations = this.selfWorkstations.map(function (workstation) {
        return workstation._id;
      });
      console.info('this.selfWorkstations', this.selfWorkstations);
      this.productionline.workstations = this.selfWorkstations;
      Meteor.call('productionline.save', this.productionline, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.error);
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.productionlines'
          });
        }
      });
    },
    listAllWorkstations: function () {
      var _this2 = this;

      Meteor.call('productionline.workstations', function (error, response) {
        if (error) {
          _this2.$alert.showAlertSimple('error', error.reason, response);
        } else {
          _this2.allWorkstations = response.data;
        }
      });
    },
    initWorkstations: function (idProductionLine) {
      var _this3 = this;

      Meteor.call('productionline.workstations.included', idProductionLine, function (error, response) {
        if (error) {
          _this3.$alert.showAlertSimple('error', error.reason, response);
        } else {
          _this3.selfWorkstations = response.data;
        }
      });
      Meteor.call('productionline.workstations.availables.to.include', idProductionLine, function (error, response) {
        if (error) {
          _this3.$alert.showAlertSimple('error', error.reason, response);
        } else {
          _this3.allWorkstations = response.data;
        }
      });
    }
  },
  computed: {
    filteredSelfWorkstations: function () {
      var _this4 = this;

      return this.selfWorkstations.filter(function (workstation) {
        return workstation.name.toLowerCase().includes(_this4.searchSelfWorkstation.toLowerCase());
      });
    },
    filteredWorkstations: function () {
      var _this5 = this;

      return this.allWorkstations.filter(function (workstation) {
        return workstation.name.toLowerCase().includes(_this5.searchWorkstation.toLowerCase());
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveProductionLine","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-form',{attrs:{"id":"saveProductionLine","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveProductionLine($event)}}},[_c('v-row',[_c('v-col',{attrs:{"md":"6"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","label":"Nombre de la linea de produccion"},model:{value:(_vm.productionline.name),callback:function ($$v) {_vm.$set(_vm.productionline, "name", $$v)},expression:"productionline.name"}})],1),_vm._v(" "),_c('v-col',{attrs:{"md":"6"}},[_c('v-text-field',{attrs:{"id":"inputDescription","name":"description","label":"Descripción de la linea de produccion"},model:{value:(_vm.productionline.description),callback:function ($$v) {_vm.$set(_vm.productionline, "description", $$v)},expression:"productionline.description"}})],1)],1)],1)],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-title',[_vm._v("Estaciones de trabajo de esta linea de produccion")]),_vm._v(" "),_c('v-card-text',[_c('v-text-field',{attrs:{"placeholder":"Buscar. . .","id":"inputSearchSelfWorkstation","name":"workstationName"},model:{value:(_vm.searchSelfWorkstation),callback:function ($$v) {_vm.searchSelfWorkstation=$$v},expression:"searchSelfWorkstation"}})],1),_vm._v(" "),_c('v-sheet',{staticClass:"overflow-y-auto",attrs:{"id":"scrolling-techniques-2","max-height":"500"}},[_c('v-list',{staticStyle:{"height":"400px"}},[_c('v-list-item-group',[_c('draggable',{attrs:{"list":_vm.filteredSelfWorkstations,"group":"workstations"},on:{"change":function (ev){ return _vm.onChangeDragList(ev,'selfWorkstations'); }}},_vm._l((_vm.filteredSelfWorkstations),function(workstation){return _c('v-list-item',{key:workstation._id,attrs:{"return-object":""},domProps:{"textContent":_vm._s(workstation.name)}})}),1)],1)],1)],1)],1)],1),_vm._v(" "),_c('v-col',[_c('v-card',[_c('v-card-title',[_vm._v("Todas las estaciones de trabajo")]),_vm._v(" "),_c('v-card-text',[_c('v-text-field',{attrs:{"placeholder":"Buscar. . .","id":"inputSearchWorkstation","name":"workstationName2"},model:{value:(_vm.searchWorkstation),callback:function ($$v) {_vm.searchWorkstation=$$v},expression:"searchWorkstation"}})],1),_vm._v(" "),_c('v-sheet',{staticClass:"overflow-y-auto",attrs:{"id":"scrolling-techniques-3","max-height":"500"}},[_c('v-list',{staticStyle:{"height":"400px"}},[_c('v-list-item-group',[_c('draggable',{attrs:{"list":_vm.filteredWorkstations,"group":"workstations"},on:{"change":function (ev){ return _vm.onChangeDragList(ev,'allWorkstations'); }}},_vm._l((_vm.filteredWorkstations),function(workstation){return _c('v-list-item',{key:workstation._id,domProps:{"textContent":_vm._s(workstation.name)}})}),1)],1)],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-4be3900d';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-production-line';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-4be3900d'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-4be3900d', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ProductionOrders":{"ListProductionOrders.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/ProductionOrders/ListProductionOrders.vue                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: 'ListProductionOrders'
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',[_vm._v("\nLista de ordenes de produccion\n")])};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-49105263';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-production-orders';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-49105263'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-49105263', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Products":{"ListProducts.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Products/ListProducts.vue                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 0);
var Product;
module.link("../../../api/Products/Product", {
  Product: function (v) {
    Product = v;
  }
}, 1);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 2);
module.exportDefault({
  name: 'ListProducts',
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      headersFilter: {
        isAvailable: '',
        name: '',
        name_full: '',
        unit: {
          _id: '',
          name: ''
        },
        stock: '',
        sku: '',
        location: '',
        warehouse: {
          _id: '',
          name: ''
        },
        provider: {
          _id: '',
          name: ''
        },
        production_line: {
          _id: '',
          name: ''
        }
      },
      productTemp: {
        preposition: 'el',
        typeElement: 'producto',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    };
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditProduct: function (product) {
      //Guardar en Vuex para recuperar en la vistad de product.save
      this.setElement(product);
      this.$router.push({
        name: 'home.products.edit'
      });
    },
    openRemoveModal: function (product) {
      this.productTemp.element = product;
      this.productTemp._id = product._id;
      this.productTemp.mainNameElement = product.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteProduct: function (idProduct) {
      var _this = this;

      this.$loader.activate("Eliminando producto....");
      Meteor.call('product.delete', {
        idProduct: idProduct
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  computed: {
    headers: function () {
      var _this2 = this;

      return [{
        value: 'isAvailable',
        text: 'Disponible',
        sortable: true
      }, {
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name_full',
        text: 'Nombre completo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name_full.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'unit.name',
        text: 'Unidad',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.unit.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'stock',
        text: 'Existencias',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.stock.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'sku',
        text: 'SKU',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.sku.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'location',
        text: 'Ubicacion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.location.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'warehouse.name',
        text: 'Almacen',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.warehouse.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'provider.name',
        text: 'Proveedor',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.provider.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'production_line.name',
        text: 'Linea de produccion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.production_line.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  meteor: {
    $subscribe: {
      'product.list': []
    },
    products: function () {
      var productList = Product.find({}, {
        fields: {
          isAvailable: 1,
          name: 1,
          name_full: 1,
          stock: 1,
          unit: 1,
          sku: 1,
          location: 1,
          provider: 1,
          warehouse: 1,
          production_line: 1,
          bom: 1
        }
      }).fetch();
      console.info('productList', productList);
      return productList;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('products'),expression:"'products'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.products.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar producto")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.products,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditProduct(item);
}},scopedSlots:_vm._u([{key:"item.isAvailable",fn:function(ref){
var item = ref.item;
return [_c('div',{staticClass:"d-flex align-center pt-5 pb-5"},[_c('v-icon',{attrs:{"color":item.isAvailable?'green' : 'red'}},[_vm._v("\n              mdi-checkbox-blank-circle\n            ")])],1)]}},{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('products'),expression:"'products'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditProduct(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('products'),expression:"'products'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}},{key:"body.append",fn:function(ref){
var isMobile = ref.isMobile;
return [(!isMobile)?_c('tr',[_c('td'),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre"},model:{value:(_vm.headersFilter.name),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name", $$v)},expression:"headersFilter.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre completo"},model:{value:(_vm.headersFilter.name_full),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name_full", $$v)},expression:"headersFilter.name_full"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Unidad"},model:{value:(_vm.headersFilter.unit.name),callback:function ($$v) {_vm.$set(_vm.headersFilter.unit, "name", $$v)},expression:"headersFilter.unit.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Existencia"},model:{value:(_vm.headersFilter.stock),callback:function ($$v) {_vm.$set(_vm.headersFilter, "stock", $$v)},expression:"headersFilter.stock"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"SKU"},model:{value:(_vm.headersFilter.sku),callback:function ($$v) {_vm.$set(_vm.headersFilter, "sku", $$v)},expression:"headersFilter.sku"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Ubicacion"},model:{value:(_vm.headersFilter.location),callback:function ($$v) {_vm.$set(_vm.headersFilter, "location", $$v)},expression:"headersFilter.location"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Almacen"},model:{value:(_vm.headersFilter.warehouse.name),callback:function ($$v) {_vm.$set(_vm.headersFilter.warehouse, "name", $$v)},expression:"headersFilter.warehouse.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Proveedor"},model:{value:(_vm.headersFilter.provider.name),callback:function ($$v) {_vm.$set(_vm.headersFilter.provider, "name", $$v)},expression:"headersFilter.provider.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Linea de produccion"},model:{value:(_vm.headersFilter.production_line.name),callback:function ($$v) {_vm.$set(_vm.headersFilter.production_line, "name", $$v)},expression:"headersFilter.production_line.name"}})],1)]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.productTemp},on:{"id_element":_vm.deleteProduct}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-54bbc323';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-products';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-54bbc323'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-54bbc323', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ModalBoM.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Products/ModalBoM.vue                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var Product;
module.link("../../../api/Products/Product", {
  Product: function (v) {
    Product = v;
  }
}, 0);
module.exportDefault({
  name: "ModalBOM",
  props: ['modalData'],
  data: function () {
    return {
      dialog: false,
      toSeebtn: false,
      itemSelected: [],
      itemBOM: {
        quantity: '',
        _id: '',
        name: ''
      },
      itemList: [],
      selectedItem: 1,
      rules: {
        required: function (value) {
          return !!value || 'Requerido.';
        },
        counter: function (value) {
          return value.length <= 20 || 'Max 20 caracteres';
        },
        number: function (value) {
          var pattern = /^[+-]?\d+([,.]\d+)?$/;
          return pattern.test(value) || 'Numero con formato equivocado, debe ser un real Ejemplo: -123.35 o 7,4 o 8';
        }
      },
      headersFilter: {
        isAvailable: '',
        name: '',
        name_full: '',
        unit: {
          _id: '',
          name: ''
        },
        stock: '',
        sku: '',
        location: '',
        warehouse: {
          _id: '',
          name: ''
        },
        provider: {
          _id: '',
          name: ''
        }
      },
      headersBOMFilter: {
        name: '',
        quantity: ''
      }
    };
  },
  show: function () {
    // Aqui inicializamos la lista el bom qu el Producto tiene 
    console.info('modalData', this.modalData);
    this.itemList = this.modalData.bom;
  },
  computed: {
    validateQuantity: {
      set: function (validateQuantity) {
        //console.info('cambio text fiel de cantidad  ',validateQuantity);
        this.itemBOM.quantity = validateQuantity;

        if (this.itemBOM.quantity !== '') {
          //console.log('this.itemBOM._id ',this.itemBOM._id);
          if (this.itemBOM._id !== '') {
            this.toSeebtn = true;
          } else {
            this.toSeebtn = false;
          }
        } else {
          this.toSeebtn = false;
        }
      }
    },
    validateSelectItem: {
      set: function (validateSelectItem) {
        //console.info('Lista de articulos ha cambiado  ',validateSelectItem);
        // si hay un seleccionado
        if (validateSelectItem.length > 0) {
          this.itemBOM._id = validateSelectItem[0]._id;
          this.itemBOM.name = validateSelectItem[0].name;

          if (this.itemBOM.quantity.length > 0) {
            this.toSeebtn = true;
          } else {
            this.toSeebtn = false;
          }
        } else {
          this.itemBOM._id = '';
          this.toSeebtn = false;
        }
      },
      get: function () {
        return;
      }
    },
    headers: function () {
      var _this = this;

      return [{
        value: 'isAvailable',
        text: 'Disponible',
        sortable: true
      }, {
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name_full',
        text: 'Nombre completo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.name_full.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'unit.name',
        text: 'Unidad',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.unit.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'stock',
        text: 'Existencias',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.stock.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'sku',
        text: 'SKU',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.sku.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'location',
        text: 'Ubicacion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.location.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'warehouse.name',
        text: 'Almacen',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.warehouse.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'provider.name',
        text: 'Proveedor',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.provider.name.toLocaleLowerCase()) !== -1;
        }
      }];
    },
    headersBOMList: function () {
      var _this2 = this;

      return [{
        value: 'quantity',
        text: 'Cantidad',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersBOMFilter.quantity.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersBOMFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  methods: {
    acceptBoM: function () {
      // aqui hay que cargar la lista a bomList para regresarla
      this.modalData.bomList = this.itemList;
      this.$emit('bomList', this.modalData.bomList);
      this.dialog = false;
    },
    cancel: function () {
      this.itemList = [];
      this.dialog = false;
    },
    addItem: function () {
      //Agregar al componente List bindeado a this.modalData.bomList=itemBOM
      console.log('this.itemBOM ', this.itemBOM);
      var itemAdded = this.itemBOM;
      console.log('itemAdded', itemAdded);
      this.itemList.push(itemAdded);
      console.log('this.itemList', this.itemList);
    },
    removeItemFromproductBOM: function (i) {
      this.itemList.splice(i);
    },
    resetitemBOM: function () {
      this.itemBOM.quantity = 0;
      this.itemBOM.name = '';
      this.itemBOM._id = '';
    }
  },
  meteor: {
    $subscribe: {
      'product.list': []
    },
    products: function () {
      var productList = Product.find({}, {
        fields: {
          isAvailable: 1,
          name: 1,
          name_full: 1,
          stock: 1,
          unit: 1,
          sku: 1,
          location: 1,
          provider: 1,
          warehouse: 1,
          production_line: 1
        }
      }).fetch();
      console.info('productList', productList);
      return productList;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-row',{attrs:{"justify":"center"}},[_c('v-dialog',{attrs:{"id":"modalRemove","persistent":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return undefined}}]),model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_vm._v(" "),_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("Configuracion de la lista de articulos del producto")])]),_vm._v(" "),_c('v-card-text',[_c('v-container',[_c('v-divider'),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"6","sm":"3"}},[_c('span',{staticClass:"line"},[_vm._v("Disponga la cantidad")]),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputQuantity","name":"quantityField","label":"Cantidad","rules":[_vm.rules.required, _vm.rules.number],"suffix":"articulos"},model:{value:(_vm.validateQuantity),callback:function ($$v) {_vm.validateQuantity=$$v},expression:"validateQuantity"}})],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"24","sm":"12"}},[_c('span',{staticClass:"line"},[_vm._v("Elija el articulo")]),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.products,"sort-by":"name","single-select":true,"show-select":""},scopedSlots:_vm._u([{key:"item.isAvailable",fn:function(ref){
var item = ref.item;
return [_c('div',{staticClass:"d-flex align-center pt-5 pb-5"},[_c('v-icon',{attrs:{"color":item.isAvailable?'green' : 'red'}},[_vm._v("\n                            mdi-checkbox-blank-circle\n                          ")])],1)]}},{key:"body.append",fn:function(ref){
var isMobile = ref.isMobile;
return [(!isMobile)?_c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre"},model:{value:(_vm.headersFilter.name),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name", $$v)},expression:"headersFilter.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre completo"},model:{value:(_vm.headersFilter.name_full),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name_full", $$v)},expression:"headersFilter.name_full"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Unidad"},model:{value:(_vm.headersFilter.unit.name),callback:function ($$v) {_vm.$set(_vm.headersFilter.unit, "name", $$v)},expression:"headersFilter.unit.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Existencia"},model:{value:(_vm.headersFilter.stock),callback:function ($$v) {_vm.$set(_vm.headersFilter, "stock", $$v)},expression:"headersFilter.stock"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"SKU"},model:{value:(_vm.headersFilter.sku),callback:function ($$v) {_vm.$set(_vm.headersFilter, "sku", $$v)},expression:"headersFilter.sku"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Ubicacion"},model:{value:(_vm.headersFilter.location),callback:function ($$v) {_vm.$set(_vm.headersFilter, "location", $$v)},expression:"headersFilter.location"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Almacen"},model:{value:(_vm.headersFilter.warehouse.name),callback:function ($$v) {_vm.$set(_vm.headersFilter.warehouse, "name", $$v)},expression:"headersFilter.warehouse.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Proveedor"},model:{value:(_vm.headersFilter.provider.name),callback:function ($$v) {_vm.$set(_vm.headersFilter.provider, "name", $$v)},expression:"headersFilter.provider.name"}})],1)]):_vm._e()]}}]),model:{value:(_vm.validateSelectItem),callback:function ($$v) {_vm.validateSelectItem=$$v},expression:"validateSelectItem"}})],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","sm":"6"}},[_c('v-divider'),_vm._v(" "),(_vm.toSeebtn)?_c('v-btn',{attrs:{"depressed":"","color":"primary"},on:{"click":function($event){return _vm.addItem()}}},[_vm._v("\n                  Agregar articulo\n                ")]):_vm._e()],1)],1),_vm._v(" "),_c('v-row',[_c('v-divider'),_vm._v(" "),_c('v-col',{attrs:{"cols":"24","sm":"12"}},[_c('span',{staticClass:"headline"},[_vm._v("Lista de articulos del producto")]),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headersBOMList,"items":_vm.itemList,"sort-by":"name"},scopedSlots:_vm._u([{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('itemList'),expression:"'itemList'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.removeItemFromproductBOM(item)}}},on),[_vm._v("\n                                delete\n                              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}}])})],1)],1)],1),_vm._v(" "),_c('small',[_vm._v("*indica que es requerido")])],1),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","text":""},on:{"click":_vm.cancel}},[_vm._v("\n          Cerrar\n        ")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","text":""},on:{"click":_vm.acceptBoM}},[_vm._v("\n          Aceptar\n        ")])],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-8a029298';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'modal-bo-m';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-8a029298'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-8a029298', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveProduct.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Products/SaveProduct.vue                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var WarehouseRepository;
module.link("../../../api/Warehouses/Warehouse", {
  WarehouseRepository: function (v) {
    WarehouseRepository = v;
  }
}, 0);
var ProductionLineRepository;
module.link("../../../api/ProductionLines/ProductionLine", {
  ProductionLineRepository: function (v) {
    ProductionLineRepository = v;
  }
}, 1);
var Provider;
module.link("../../../api/Providers/Provider", {
  Provider: function (v) {
    Provider = v;
  }
}, 2);
var draggable;
module.link("vuedraggable", {
  "default": function (v) {
    draggable = v;
  }
}, 3);
var ModalBOM;
module.link("./ModalBoM", {
  "default": function (v) {
    ModalBOM = v;
  }
}, 4);
// import ModalBOMProduct from "./ModalBOMProduct";
var id = 3;
module.exportDefault({
  name: "SaveProduct",
  components: {
    draggable: draggable,
    ModalBOM: ModalBOM
  },
  data: function () {
    return {
      id: id,
      productTempBOM: {},
      product: {
        _id: null,
        name: '',
        name_full: null,
        unit: {
          _id: null,
          name: null
        },
        stock: null,
        provider: {
          _id: null,
          name: null
        },
        location: null,
        sku: null,
        warehouse: {
          _id: null,
          name: null
        },
        production_line: {
          _id: null,
          name: null,
          workstations: [{
            _id: null,
            name: null,
            name_full: null,
            location: null,
            productionline: {
              description: null,
              name: null,
              _id: null
            }
          }]
        },
        bom: [{
          _id: '',
          name: '',
          quantity: ''
        }],
        isAvailable: false
      },
      rules: {
        required: function (value) {
          return !!value || 'Requerido.';
        },
        counter: function (value) {
          return value.length <= 20 || 'Max 20 caracteres';
        },
        email: function (value) {
          var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Correo Electrónico incorrecto.';
        },
        number: function (value) {
          var pattern = /^[+-]?\d+([,.]\d+)?$/;
          return pattern.test(value) || 'Numero con formato equivocado, debe ser un real Ejemplo: -123.35 o 7,4 o 8';
        }
      },
      units: [{
        _id: 'zzzzz',
        name: 'Kgs'
      }, {
        _id: 'asasas',
        name: 'Lbs'
      }],
      dataView: {
        title: '',
        targetButton: ''
      },
      headersBOMFilter: {
        name: '',
        quantity: ''
      }
    };
  },
  created: function () {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear producto";
      this.dataView.targetButton = "Crear";
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar producto";
      this.dataView.targetButton = "Actualizar";
      var tempProduct = this.$store.state.temporal.element;
      console.info('tempProduct', tempProduct);
      this.product = {
        _id: tempProduct._id,
        name: tempProduct.name,
        name_full: tempProduct.name_full,
        unit: tempProduct.unit,
        stock: tempProduct.stock,
        sku: tempProduct.sku,
        location: tempProduct.location,
        warehouse: tempProduct.warehouse,
        provider: tempProduct.provider,
        bom: tempProduct.bom,
        isAvailable: tempProduct.isAvailable,
        production_line: tempProduct.production_line
      };
    }
  },
  methods: {
    openModalBoM: function (product) {
      // Aqui mandamos el objeto product
      this.productTempBOM = product; // this.$refs.refModalBoM.dialog = true;

      this.$refs.refModalBOMProduct.dialog = true;
    },
    setProductBoM: function (bomList) {
      // Aqui fijar la lista a la variable BOM del producto
      console.info('bomList ', bomList);
      this.product.bom = bomList;
    },
    saveProduct: function () {
      var _this = this;

      this.$loader.activate('Guardando producto...');
      Meteor.call('product.save', this.product, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.products'
          });
        }
      });
    }
  },
  computed: {
    headersBOMList: function () {
      var _this2 = this;

      return [{
        value: 'quantity',
        text: 'Cantidad',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersBOMFilter.quantity.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersBOMFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  meteor: {
    $subscribe: {
      'productionlines.list': [],
      'warehouse.list': [],
      'provider.list': []
    },
    production_lines: function () {
      return ProductionLineRepository.find({}, {
        fields: {
          _id: 1,
          name: 1,
          description: 1,
          workstations: 1
        }
      }).fetch();
    },
    warehouses: function () {
      var warehouses = WarehouseRepository.find({}, {
        fields: {
          _id: 1,
          name: 1,
          name_full: 1,
          location: 1
        }
      }).fetch(); //console.info('Almacenes',warehouses);

      return warehouses;
    },
    providers: function () {
      return Provider.find({}, {
        fields: {
          _id: 1,
          name: 1
        }
      }).fetch();
    },
    units: function () {
      return this.units;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveProduct","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-text',[_c('v-form',{attrs:{"id":"saveProduct","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveProduct($event)}}},[_c('v-row',[_c('v-col',{attrs:{"xs":"12","sm":"12","md":"8"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","rules":[_vm.rules.required, _vm.rules.counter],"label":"Nombre","counter":"","maxlength":"20"},model:{value:(_vm.product.name),callback:function ($$v) {_vm.$set(_vm.product, "name", $$v)},expression:"product.name"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputNameFull","name":"name_full","label":"Nombre completo"},model:{value:(_vm.product.name_full),callback:function ($$v) {_vm.$set(_vm.product, "name_full", $$v)},expression:"product.name_full"}}),_vm._v(" "),_c('v-select',{attrs:{"id":"selectUnit","name":"unit","items":_vm.units,"item-text":"name","item-value":"_id","return-object":"","label":"Unidad de medida"},model:{value:(_vm.product.unit),callback:function ($$v) {_vm.$set(_vm.product, "unit", $$v)},expression:"product.unit"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputStock","name":"stock","label":"Existencia","rules":[_vm.rules.required, _vm.rules.number]},model:{value:(_vm.product.stock),callback:function ($$v) {_vm.$set(_vm.product, "stock", $$v)},expression:"product.stock"}}),_vm._v(" "),_c('v-select',{attrs:{"id":"selectProvider","name":"provider","items":_vm.providers,"item-text":"name","item-value":"_id","return-object":"","label":"Proveedor"},model:{value:(_vm.product.provider),callback:function ($$v) {_vm.$set(_vm.product, "provider", $$v)},expression:"product.provider"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputlocation","name":"location","label":"Ubicacion"},model:{value:(_vm.product.location),callback:function ($$v) {_vm.$set(_vm.product, "location", $$v)},expression:"product.location"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputsku","name":"sku","label":"SKU"},model:{value:(_vm.product.sku),callback:function ($$v) {_vm.$set(_vm.product, "sku", $$v)},expression:"product.sku"}}),_vm._v(" "),_c('v-select',{attrs:{"id":"selectWarehouse","name":"warehouse","items":_vm.warehouses,"item-text":"name","item-value":"_id","return-object":"","label":"Almacen"},model:{value:(_vm.product.warehouse),callback:function ($$v) {_vm.$set(_vm.product, "warehouse", $$v)},expression:"product.warehouse"}}),_vm._v(" "),_c('v-select',{attrs:{"id":"selectProvider","name":"provider","items":_vm.providers,"item-text":"name","item-value":"_id","return-object":"","label":"Proveedor"},model:{value:(_vm.product.provider),callback:function ($$v) {_vm.$set(_vm.product, "provider", $$v)},expression:"product.provider"}}),_vm._v(" "),_c('v-select',{attrs:{"id":"selectProductionLine","name":"productionline","items":_vm.production_lines,"item-text":"name","item-value":"_id","return-object":"","label":"Linea de produccion"},model:{value:(_vm.product.production_line),callback:function ($$v) {_vm.$set(_vm.product, "production_line", $$v)},expression:"product.production_line"}}),_vm._v(" "),_c('td',[_c('v-switch',{attrs:{"label":"¿Habilitar producto?","color":"indigo","hide-details":""},model:{value:(_vm.product.isAvailable),callback:function ($$v) {_vm.$set(_vm.product, "isAvailable", $$v)},expression:"product.isAvailable"}})],1),_vm._v(" "),_c('v-btn',{attrs:{"depressed":"","color":"primary"},on:{"click":function($event){return _vm.openModalBoM(_vm.product)}}},[_vm._v("\n                  Configurar componentes del producto\n                ")]),_vm._v(" "),_c('td')],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"24","sm":"12"}},[_c('span',{staticClass:"headline"},[_vm._v("Lista de articulos del producto")]),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headersBOMList,"items":_vm.product.bom,"sort-by":"name"},scopedSlots:_vm._u([{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('product.bom'),expression:"'product.bom'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.removeItemFromproductBOM(item)}}},on),[_vm._v("\n                                delete\n                              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}}])})],1)],1)],1)],1)],1)],1)],1),_vm._v(" "),_c('modal-bOM',{ref:"refModalBoM",attrs:{"modalData":_vm.productTempBOM},on:{"bomList":_vm.setProductBoM}}),_vm._v(" "),_c('modal-product',{ref:"refModalBOMProduct",attrs:{"modalData":_vm.productTempBOM},on:{"bomList":_vm.setProductBoM}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-4cd4c87e';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-product';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-4cd4c87e'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-4cd4c87e', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Profiles":{"ListProfiles.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Profiles/ListProfiles.vue                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 0);
var Profile;
module.link("../../../api/Profiles/Profile", {
  Profile: function (v) {
    Profile = v;
  }
}, 1);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 2);
module.exportDefault({
  name: "ListProfiles",
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      headers: [{
        value: 'description',
        text: 'Nombre del perfil',
        sortable: true
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }],
      profileTemp: {
        preposition: 'el',
        typeElement: 'perfil',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    };
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditProfile: function (profile) {
      //Guardar en Vuex
      this.setElement(profile);
      this.$router.push({
        name: 'home.profiles.edit'
      });
    },
    openRemoveModal: function (profile) {
      this.profileTemp.element = profile;
      this.profileTemp._id = profile._id;
      this.profileTemp.mainNameElement = profile.description;
      this.profileTemp.element = profile;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteProfile: function (idProfile) {
      var _this = this;

      this.$loader.activate('Eliminando perfil...');
      Meteor.call('profile.delete', {
        idProfile: idProfile
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          if (error.details) {
            _this.$alert.showAlertFull('warning', 'error', error.reason, 'multi-line', '5000', 'right', 'bottom', error.details);
          } else {
            _this.$alert.showAlertSimple('error', 'Ocurrio un error al eliminar el perfil');
          }
        } else {
          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  meteor: {
    $subscribe: {
      'notStaticProfile.list': []
    },
    profiles: function () {
      return Profile.find().fetch();
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('profiles'),expression:"'profiles'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.profiles.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar perfil")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.profiles,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditProfile(item);
}},scopedSlots:_vm._u([{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('profiles'),expression:"'profiles'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditProfile(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('profiles'),expression:"'profiles'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}}])})],1)],1),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.profileTemp},on:{"id_element":_vm.deleteProfile}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-226aa63a';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-profiles';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-226aa63a'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-226aa63a', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveProfile.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Profiles/SaveProfile.vue                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var draggable;
module.link("vuedraggable", {
  "default": function (v) {
    draggable = v;
  }
}, 0);
module.exportDefault({
  name: "SaveProfile",
  components: {
    draggable: draggable
  },
  data: function () {
    return {
      profile: {
        _id: null,
        name: null,
        description: null,
        permissions: []
      },
      dataView: {
        title: '',
        targetButton: ''
      },
      searchSelfPermission: '',
      searchPermission: '',
      selfPermissions: [],
      allPermissions: []
    };
  },
  created: function () {
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear perfil";
      this.dataView.targetButton = "Crear";
      this.listAllPermissions();
    } else if (this.$router.currentRoute.name.includes("edit")) {
      var tempProfile = this.$store.state.temporal.element;
      this.profile = {
        _id: tempProfile._id,
        name: tempProfile.name,
        description: tempProfile.description,
        permissions: tempProfile.permissions
      };
      this.initPermissions(this.profile._id);
      this.dataView.title = "Editar perfil";
      this.dataView.targetButton = "Actualizar";
    }
  },
  methods: {
    onChangeDragList: function (event, propData) {
      if (event.hasOwnProperty('removed')) {
        this[propData] = this[propData].filter(function (permission) {
          return permission._id != event.removed.element._id;
        });
      } else if (event.hasOwnProperty('added')) {
        this[propData].splice(event.added.newIndex, 0, event.added.element);
      }
    },
    saveProfile: function () {
      var _this = this;

      console.log("Guardando Perfil: ", this.profile);
      this.$loader.activate('Guardando perfil ...');
      this.profile.permissions = this.selfPermissions.map(function (permission) {
        return permission._id;
      });
      Meteor.call('profile.save', this.profile, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', 'Ocurrió un error al guardar el perfil');
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.profiles'
          });
        }
      });
    },
    listAllPermissions: function () {
      var _this2 = this;

      Meteor.call('permissions.list', function (error, response) {
        if (error) {
          _this2.$alert.showAlertSimple('error', error.reason, response);
        } else {
          console.log("Lista de todos los permisos ", response.data);
          _this2.allPermissions = response.data;
        }
      });
    },
    initPermissions: function (idProfile) {
      var _this3 = this;

      console.log("Entrando a initPermissions");
      Meteor.call('permissions.listByIdProfile', {
        "idProfile": idProfile
      }, function (error, response) {
        if (error) {
          _this3.$alert.showAlertSimple('error', error.reason, response);
        } else {
          _this3.selfPermissions = response.data;
        }
      });
      Meteor.call('permissions.listOfOthers', {
        "idProfile": idProfile
      }, function (error, response) {
        if (error) {
          _this3.$alert.showAlertSimple('error', error.reason, response);
        } else {
          _this3.allPermissions = response.data;
        }
      });
    }
  },
  computed: {
    filteredSelfPermissions: function () {
      var _this4 = this;

      return this.selfPermissions.filter(function (permission) {
        return permission.publicName.toLowerCase().includes(_this4.searchSelfPermission.toLowerCase());
      });
    },
    filteredPermissions: function () {
      var _this5 = this;

      return this.allPermissions.filter(function (permission) {
        return permission.publicName.toLowerCase().includes(_this5.searchPermission.toLowerCase());
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveProfile","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-form',{attrs:{"id":"saveProfile","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveProfile($event)}}},[_c('v-row',[_c('v-col',{attrs:{"md":"6"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","label":"Nombre del perfil"},model:{value:(_vm.profile.name),callback:function ($$v) {_vm.$set(_vm.profile, "name", $$v)},expression:"profile.name"}})],1),_vm._v(" "),_c('v-col',{attrs:{"md":"6"}},[_c('v-text-field',{attrs:{"id":"inputDescription","name":"name","label":"Descripción del perfil"},model:{value:(_vm.profile.description),callback:function ($$v) {_vm.$set(_vm.profile, "description", $$v)},expression:"profile.description"}})],1)],1)],1)],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-title',[_vm._v("Permisos de este perfil")]),_vm._v(" "),_c('v-card-text',[_c('v-text-field',{attrs:{"placeholder":"Buscar. . .","id":"inputSearchSelfPermission","name":"profileName"},model:{value:(_vm.searchSelfPermission),callback:function ($$v) {_vm.searchSelfPermission=$$v},expression:"searchSelfPermission"}})],1),_vm._v(" "),_c('v-sheet',{staticClass:"overflow-y-auto",attrs:{"id":"scrolling-techniques-2","max-height":"500"}},[_c('v-list',{staticStyle:{"height":"400px"}},[_c('v-list-item-group',[_c('draggable',{attrs:{"list":_vm.filteredSelfPermissions,"group":"permissions"},on:{"change":function (ev){ return _vm.onChangeDragList(ev,'selfPermissions'); }}},_vm._l((_vm.filteredSelfPermissions),function(permission){return _c('v-list-item',{key:permission._id,domProps:{"textContent":_vm._s(permission.publicName)}})}),1)],1)],1)],1)],1)],1),_vm._v(" "),_c('v-col',[_c('v-card',[_c('v-card-title',[_vm._v("Todos los permisos")]),_vm._v(" "),_c('v-card-text',[_c('v-text-field',{attrs:{"placeholder":"Buscar. . .","id":"inputSearchPermission","name":"profileName2"},model:{value:(_vm.searchPermission),callback:function ($$v) {_vm.searchPermission=$$v},expression:"searchPermission"}})],1),_vm._v(" "),_c('v-sheet',{staticClass:"overflow-y-auto",attrs:{"id":"scrolling-techniques-3","max-height":"500"}},[_c('v-list',{staticStyle:{"height":"400px"}},[_c('v-list-item-group',[_c('draggable',{attrs:{"list":_vm.filteredPermissions,"group":"permissions"},on:{"change":function (ev){ return _vm.onChangeDragList(ev,'allPermissions'); }}},_vm._l((_vm.filteredPermissions),function(permission){return _c('v-list-item',{key:permission._id,domProps:{"textContent":_vm._s(permission.publicName)}})}),1)],1)],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-31227a01';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-profile';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-31227a01'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-31227a01', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ProviderStations":{"ListProviderStations.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/ProviderStations/ListProviderStations.vue                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: 'ListProviderStations'
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',[_vm._v("\n  Lista de estaciones de suministro\n")])};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-afb42cba';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-provider-stations';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-afb42cba'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-afb42cba', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Providers":{"ListProviders.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Providers/ListProviders.vue                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 0);
var Provider;
module.link("../../../api/Providers/Provider", {
  Provider: function (v) {
    Provider = v;
  }
}, 1);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 2);
module.exportDefault({
  name: 'ListProviders',
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      headersFilter: {
        isAvailable: '',
        name: '',
        name_full: '',
        providerBussinessId: '',
        address: '',
        phones: '',
        web: '',
        email: ''
      },
      providerTemp: {
        preposition: 'el',
        typeElement: 'proveedor',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    };
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditProvider: function (provider) {
      //Guardar en Vuex para recuperar en la vista de provider.save
      this.setElement(provider);
      this.$router.push({
        name: 'home.provider.edit'
      });
    },
    openRemoveModal: function (provider) {
      this.providerTemp.element = provider;
      this.providerTemp._id = provider._id;
      this.providerTemp.mainNameElement = provider.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteProvider: function (idProvider) {
      var _this = this;

      this.$loader.activate("Eliminando proveedor....");
      Meteor.call('provider.delete', {
        idProvider: idProvider
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  computed: {
    headers: function () {
      var _this2 = this;

      return [{
        value: 'isAvailable',
        text: 'Disponible',
        sortable: true
      }, {
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name_full',
        text: 'Nombre completo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name_full.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'providerBussinessId',
        text: 'RFC',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.providerBussinessId.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'address',
        text: 'Direccion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.address.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'phones',
        text: 'Telefonos',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.phones.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'web',
        text: 'Web',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.web.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'email',
        text: 'Correo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.email.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  meteor: {
    $subscribe: {
      'provider.list': []
    },
    providers: function () {
      var providerList = Provider.find().fetch();
      console.info('providerList ', providerList);
      return providerList;
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('providers'),expression:"'providers'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.provider.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar proveedor")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.providers,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditProvider(item);
}},scopedSlots:_vm._u([{key:"item.isAvailable",fn:function(ref){
var item = ref.item;
return [_c('div',{staticClass:"d-flex align-center pt-5 pb-5"},[_c('v-icon',{attrs:{"color":item.isAvailable?'green' : 'red'}},[_vm._v("\n              mdi-checkbox-blank-circle\n            ")])],1)]}},{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('providers'),expression:"'providers'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditProvider(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('providers'),expression:"'providers'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}},{key:"body.append",fn:function(ref){
var isMobile = ref.isMobile;
return [(!isMobile)?_c('tr',[_c('td'),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre"},model:{value:(_vm.headersFilter.name),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name", $$v)},expression:"headersFilter.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre completo"},model:{value:(_vm.headersFilter.name_full),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name_full", $$v)},expression:"headersFilter.name_full"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"RFC"},model:{value:(_vm.headersFilter.providerBussinessId),callback:function ($$v) {_vm.$set(_vm.headersFilter, "providerBussinessId", $$v)},expression:"headersFilter.providerBussinessId"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Direccion"},model:{value:(_vm.headersFilter.address),callback:function ($$v) {_vm.$set(_vm.headersFilter, "address", $$v)},expression:"headersFilter.address"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Telefonos"},model:{value:(_vm.headersFilter.phones),callback:function ($$v) {_vm.$set(_vm.headersFilter, "phones", $$v)},expression:"headersFilter.phones"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Web"},model:{value:(_vm.headersFilter.web),callback:function ($$v) {_vm.$set(_vm.headersFilter, "web", $$v)},expression:"headersFilter.web"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Correo"},model:{value:(_vm.headersFilter.correo),callback:function ($$v) {_vm.$set(_vm.headersFilter, "correo", $$v)},expression:"headersFilter.correo"}})],1)]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.providerTemp},on:{"id_element":_vm.deleteProvider}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-56286a6d';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-providers';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-56286a6d'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-56286a6d', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveProvider.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Providers/SaveProvider.vue                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "SaveProvider",
  data: function () {
    return {
      provider: {
        _id: null,
        name: null,
        name_full: null,
        providerBussinessId: null,
        address: null,
        phones: null,
        web: null,
        email: null,
        isAvailable: false
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    };
  },
  created: function () {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear proveedor";
      this.dataView.targetButton = "Crear";
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar proveedor";
      this.dataView.targetButton = "Actualizar";
      var tempProvider = this.$store.state.temporal.element;
      this.provider = {
        _id: tempProvider._id,
        name: tempProvider.name,
        name_full: tempProvider.name_full,
        providerBussinessId: tempProvider.providerBussinessId,
        address: tempProvider.address,
        phones: tempProvider.phones,
        web: tempProvider.web,
        email: tempProvider.email,
        isAvailable: tempProvider.isAvailable
      };
    }
  },
  methods: {
    saveProvider: function () {
      var _this = this;

      this.$loader.activate('Guardando proveedor...');
      Meteor.call('provider.save', this.provider, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.providers'
          });
        }
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveProvider","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-text',[_c('v-form',{attrs:{"id":"saveProvider","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveProvider($event)}}},[_c('v-row',[_c('v-col',{attrs:{"xs":"12","sm":"12","md":"8"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","label":"Nombre"},model:{value:(_vm.provider.name),callback:function ($$v) {_vm.$set(_vm.provider, "name", $$v)},expression:"provider.name"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputNameFull","name":"name_full","label":"Nombre completo"},model:{value:(_vm.provider.name_full),callback:function ($$v) {_vm.$set(_vm.provider, "name_full", $$v)},expression:"provider.name_full"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputproviderBussinessId","name":"providerBussinessId","label":"RFC"},model:{value:(_vm.provider.providerBussinessId),callback:function ($$v) {_vm.$set(_vm.provider, "providerBussinessId", $$v)},expression:"provider.providerBussinessId"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputaddress","name":"address","label":"Direccion"},model:{value:(_vm.provider.address),callback:function ($$v) {_vm.$set(_vm.provider, "address", $$v)},expression:"provider.address"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputphones","name":"phones","label":"Telefonos"},model:{value:(_vm.provider.phones),callback:function ($$v) {_vm.$set(_vm.provider, "phones", $$v)},expression:"provider.phones"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputweb","name":"web","label":"Web"},model:{value:(_vm.provider.web),callback:function ($$v) {_vm.$set(_vm.provider, "web", $$v)},expression:"provider.web"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputemail","type":"email","name":"email","label":"Correo"},model:{value:(_vm.provider.email),callback:function ($$v) {_vm.$set(_vm.provider, "email", $$v)},expression:"provider.email"}}),_vm._v(" "),_c('td',[_c('v-switch',{attrs:{"label":"¿Habilitar proveedor?","color":"indigo","hide-details":""},model:{value:(_vm.provider.isAvailable),callback:function ($$v) {_vm.$set(_vm.provider, "isAvailable", $$v)},expression:"provider.isAvailable"}})],1)],1)],1)],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-658d9fd5';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-provider';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-658d9fd5'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-658d9fd5', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Users":{"ListUsers.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Users/ListUsers.vue                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 1);
module.exportDefault({
  name: "ListUsers",
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      headersFilter: {
        name: '',
        username: '',
        email: ''
      },
      userTemp: {
        preposition: 'al',
        typeElement: 'usuario',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    };
  },
  computed: {
    headers: function () {
      var _this = this;

      return [{
        value: 'profile.path',
        text: 'Imagen',
        sortable: false
      }, {
        value: 'status.online',
        text: 'En linea',
        sortable: true
      }, {
        value: 'profile.name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'username',
        text: 'Usuario',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.username.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'emails[0].address',
        text: 'Correo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this.headersFilter.email.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditUser: function (user) {
      //Guardar en Vuex para recuprar en la vistad de user.save
      this.setElement(user);
      this.$router.push({
        name: 'home.users.edit'
      });
    },
    openRemoveModal: function (user) {
      console.log("user: ", user);
      this.userTemp.element = user;
      this.userTemp._id = user._id;
      this.userTemp.mainNameElement = user.profile.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteUser: function (idUser) {
      var _this2 = this;

      this.$loader.activate("Eliminando usuario....");
      Meteor.call('user.delete', {
        idUser: idUser
      }, function (error, response) {
        _this2.$loader.deactivate();

        if (error) {
          _this2.$alert.showAlertSimple('error', error.reason);
        } else {
          _this2.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  meteor: {
    $subscribe: {
      'user.list': []
    },
    users: function () {
      return Meteor.users.find({
        _id: {
          $ne: Meteor.userId()
        }
      }).fetch();
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('users'),expression:"'users'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.users.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar usuario")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.users,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditUser(item);
}},scopedSlots:_vm._u([{key:"item.profile.path",fn:function(ref){
var item = ref.item;
return [_c('div',{staticClass:"d-flex align-center pt-5 pb-5"},[_c('v-avatar',[_c('img',{attrs:{"src":item.profile.path || '/img/user.png',"alt":"Avatar"}})])],1)]}},{key:"item.status.online",fn:function(ref){
var item = ref.item;
return [_c('div',{staticClass:"d-flex align-center pt-5 pb-5"},[_c('v-icon',{attrs:{"color":item.status.online?'green' : 'red'}},[_vm._v("\n              mdi-checkbox-blank-circle\n            ")])],1)]}},{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('users'),expression:"'users'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditUser(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('users'),expression:"'users'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}},{key:"body.append",fn:function(ref){
var isMobile = ref.isMobile;
return [(!isMobile)?_c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre"},model:{value:(_vm.headersFilter.name),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name", $$v)},expression:"headersFilter.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Usuario"},model:{value:(_vm.headersFilter.username),callback:function ($$v) {_vm.$set(_vm.headersFilter, "username", $$v)},expression:"headersFilter.username"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"email","label":"Correo"},model:{value:(_vm.headersFilter.email),callback:function ($$v) {_vm.$set(_vm.headersFilter, "email", $$v)},expression:"headersFilter.email"}})],1)]):_vm._e()]}}])}),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.userTemp},on:{"id_element":_vm.deleteUser}})],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-73bc0839';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-users';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-73bc0839'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-73bc0839', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveUser.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Users/SaveUser.vue                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var Profile;
module.link("../../../api/Profiles/Profile", {
  Profile: function (v) {
    Profile = v;
  }
}, 0);
var uploadImage;
module.link("../../mixins/users/uploadImage", {
  "default": function (v) {
    uploadImage = v;
  }
}, 1);
module.exportDefault({
  name: "SaveUser",
  mixins: [uploadImage],
  data: function () {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{
          address: null,
          verified: false
        }],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    };
  },
  created: function () {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear usuario";
      this.dataView.targetButton = "Crear";
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar usuario";
      this.dataView.targetButton = "Actualizar";
      var tempUser = this.$store.state.temporal.element;
      this.user = {
        _id: tempUser._id,
        username: tempUser.username,
        emails: tempUser.emails,
        profile: tempUser.profile
      };
    }
  },
  methods: {
    saveUser: function () {
      var _this = this;

      console.log("Usuario: ", this.user);
      this.$loader.activate('Guardando usuario...');
      Meteor.call('user.save', {
        user: this.user,
        photoFileUser: this.photoFileUser
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.users'
          });
        }
      });
    }
  },
  meteor: {
    $subscribe: {
      'profile.listAll': []
    },
    profiles: function () {
      return Profile.find().fetch();
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveUser","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-text',[_c('v-form',{attrs:{"id":"saveUser","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveUser($event)}}},[_c('v-row',[_c('v-col',{attrs:{"xs":"12","sm":"12","md":"4"}},[_c('div',{staticClass:"d-flex flex-column align-center"},[_c('img',{attrs:{"src":_vm.user.profile.path || '/img/user.png',"alt":_vm.user.profile.name,"width":"100px"}}),_vm._v(" "),_c('v-file-input',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],ref:"imageFile",attrs:{"accept":"image/png, image/jpeg , image/bpm"},model:{value:(_vm.file),callback:function ($$v) {_vm.file=$$v},expression:"file"}}),_vm._v(" "),_c('v-btn',{staticClass:"mb-5 mt-5",attrs:{"color":"primary","width":"100%","rounded":"","depressed":""},on:{"click":_vm.onClickUploadButtom}},[(_vm.user.profile.path)?_c('span',[_vm._v("Cambiar")]):_c('span',[_vm._v("Cargar")])])],1)]),_vm._v(" "),_c('v-col',{attrs:{"xs":"12","sm":"12","md":"8"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","label":"Nombre"},model:{value:(_vm.user.profile.name),callback:function ($$v) {_vm.$set(_vm.user.profile, "name", $$v)},expression:"user.profile.name"}}),_vm._v(" "),_c('v-select',{attrs:{"id":"selectProfile","name":"profile","items":_vm.profiles,"item-text":"description","item-value":"name","label":"Perfil"},model:{value:(_vm.user.profile.profile),callback:function ($$v) {_vm.$set(_vm.user.profile, "profile", $$v)},expression:"user.profile.profile"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputUsername","name":"username","label":"Usuario"},model:{value:(_vm.user.username),callback:function ($$v) {_vm.$set(_vm.user, "username", $$v)},expression:"user.username"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputEmail","type":"email","name":"email","label":"Correo"},model:{value:(_vm.user.emails[0].address),callback:function ($$v) {_vm.$set(_vm.user.emails[0], "address", $$v)},expression:"user.emails[0].address"}})],1)],1)],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-9229bfee';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-user';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-9229bfee'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-9229bfee', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Warehouses":{"ListWarehouses.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Warehouses/ListWarehouses.vue                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 0);
var WarehouseRepository;
module.link("../../../api/Warehouses/Warehouse", {
  WarehouseRepository: function (v) {
    WarehouseRepository = v;
  }
}, 1);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 2);
module.exportDefault({
  name: 'ListWarehouses',
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      headersFilter: {
        name: '',
        name_full: '',
        location: ''
      },
      warehouseTemp: {
        preposition: 'el',
        typeElement: ' almacen ',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    };
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditWarehouse: function (warehouse) {
      //Guardar en Vuex para recuperar en la vistad de company.save
      this.setElement(warehouse);
      this.$router.push({
        name: 'home.warehouse.edit'
      });
    },
    openRemoveModal: function (warehouse) {
      this.warehouseTemp.element = warehouse;
      this.warehouseTemp._id = warehouse._id;
      this.warehouseTemp.mainNameElement = warehouse.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteWarehouse: function (idWarehouse) {
      var _this = this;

      this.$loader.activate("Eliminando almacen....");
      Meteor.call('warehouse.delete', {
        idWarehouse: idWarehouse
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  computed: {
    headers: function () {
      var _this2 = this;

      return [{
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name_full',
        text: 'Nombre completo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name_full.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'location',
        text: 'Ubicacion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.location.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  meteor: {
    $subscribe: {
      'warehouse.list': []
    },
    warehouses: function () {
      return WarehouseRepository.find().fetch();
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('warehouses'),expression:"'warehouses'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.warehouse.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar almacen")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.warehouses,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditWarehouse(item);
}},scopedSlots:_vm._u([{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('warehouses'),expression:"'warehouses'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditWarehouse(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('warehouses'),expression:"'warehouses'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}},{key:"body.append",fn:function(ref){
var isMobile = ref.isMobile;
return [(!isMobile)?_c('tr',[_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre"},model:{value:(_vm.headersFilter.name),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name", $$v)},expression:"headersFilter.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre completo"},model:{value:(_vm.headersFilter.name_full),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name_full", $$v)},expression:"headersFilter.name_full"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Ubicacion"},model:{value:(_vm.headersFilter.location),callback:function ($$v) {_vm.$set(_vm.headersFilter, "location", $$v)},expression:"headersFilter.location"}})],1)]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.warehouseTemp},on:{"id_element":_vm.deleteWarehouse}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-589a4063';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-warehouses';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-589a4063'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-589a4063', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveWarehouse.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/Warehouses/SaveWarehouse.vue                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){module.exportDefault({
  name: "SaveWorkStation",
  data: function () {
    return {
      warehouse: {
        _id: null,
        name: null,
        name_full: null,
        location: null
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    };
  },
  created: function () {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear Almacen";
      this.dataView.targetButton = "Crear";
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar Almacen";
      this.dataView.targetButton = "Actualizar";
      var tempWarehouse = this.$store.state.temporal.element;
      this.warehouse = {
        _id: tempWarehouse._id,
        name: tempWarehouse.name,
        name_full: tempWarehouse.name_full,
        location: tempWarehouse.location
      };
    }
  },
  methods: {
    saveWarehouse: function () {
      var _this = this;

      this.$loader.activate('Guardando almacen...');
      Meteor.call('warehouse.save', this.warehouse, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.warehouses'
          });
        }
      });
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveWarehouse","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-text',[_c('v-form',{attrs:{"id":"saveWarehouse","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveWarehouse($event)}}},[_c('v-row',[_c('v-col',{attrs:{"xs":"12","sm":"12","md":"8"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","label":"Nombre"},model:{value:(_vm.warehouse.name),callback:function ($$v) {_vm.$set(_vm.warehouse, "name", $$v)},expression:"warehouse.name"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputNameFull","name":"name_full","label":"Nombre completo"},model:{value:(_vm.warehouse.name_full),callback:function ($$v) {_vm.$set(_vm.warehouse, "name_full", $$v)},expression:"warehouse.name_full"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputLocation","type":"text","name":"location","label":"Ubicacion"},model:{value:(_vm.warehouse.location),callback:function ($$v) {_vm.$set(_vm.warehouse, "location", $$v)},expression:"warehouse.location"}})],1)],1)],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-ee6beb7e';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-warehouse';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-ee6beb7e'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-ee6beb7e', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"WorkStations":{"ListWorkStations.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/WorkStations/ListWorkStations.vue                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default: function (v) {
    _objectSpread = v;
  }
}, 0);
var ModalRemove;
module.link("../../components/Utilities/Modals/ModalRemove", {
  "default": function (v) {
    ModalRemove = v;
  }
}, 0);
var WorkstationRepository;
module.link("../../../api/Workstations/WorkStation", {
  WorkstationRepository: function (v) {
    WorkstationRepository = v;
  }
}, 1);
var mapMutations;
module.link("vuex", {
  mapMutations: function (v) {
    mapMutations = v;
  }
}, 2);
module.exportDefault({
  name: 'ListWorkStations',
  components: {
    ModalRemove: ModalRemove
  },
  data: function () {
    return {
      headersFilter: {
        name: '',
        name_full: '',
        location: '',
        productionline: ''
      },
      workstationTemp: {
        preposition: 'la',
        typeElement: ' estacion de trabajo ',
        mainNameElement: '',
        _id: null,
        element: {}
      }
    };
  },
  methods: _objectSpread({}, mapMutations('temporal', ['setElement']), {
    openEditWorkStation: function (workstation) {
      //Guardar en Vuex para recuperar en la vistad de company.save
      this.setElement(workstation);
      this.$router.push({
        name: 'home.workstation.edit'
      });
    },
    openRemoveModal: function (workstation) {
      this.workstationTemp.element = workstation;
      this.workstationTemp._id = workstation._id;
      this.workstationTemp.mainNameElement = workstation.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteWorkStation: function (idWorkstation) {
      var _this = this;

      this.$loader.activate("Eliminando estacion de trabajo....");
      Meteor.call('workstation.delete', {
        idWorkstation: idWorkstation
      }, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);
        }
      });
    }
  }),
  computed: {
    headers: function () {
      var _this2 = this;

      return [{
        value: 'name',
        text: 'Nombre',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'name_full',
        text: 'Nombre completo',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.name_full.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'location',
        text: 'Ubicacion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.location.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'productionline.name',
        text: 'Linea de produccion',
        sortable: true,
        filter: function (value) {
          return value != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(_this2.headersFilter.productionline.toLocaleLowerCase()) !== -1;
        }
      }, {
        value: 'action',
        text: 'Opciones',
        sortable: false
      }];
    }
  },
  meteor: {
    $subscribe: {
      'workstation.list': []
    },
    workstations: function () {
      return WorkstationRepository.find().fetch();
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"xs":"16","sm":"16","md":"14","lg":"12","xl":"9"}},[_c('div',{staticClass:"d-flex flex-row-reverse mb-5"},[_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({directives:[{name:"can",rawName:"v-can:create.hide",value:('workstations'),expression:"'workstations'",arg:"create",modifiers:{"hide":true}}],attrs:{"color":"success","fab":"","dark":"","to":{name:'home.workstation.create'}}},on),[_c('v-icon',[_vm._v("add")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Agregar estacion de trabajo")])])],1),_vm._v(" "),_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.workstations,"sort-by":"name"},on:{"dblclick:row":function (event,ref){
	var item = ref.item;

	return _vm.openEditWorkStation(item);
}},scopedSlots:_vm._u([{key:"item.action",fn:function(ref){
var item = ref.item;
return [_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:edit.hide",value:('workstations'),expression:"'workstations'",arg:"edit",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"info","small":""},on:{"click":function($event){return _vm.openEditWorkStation(item)}}},on),[_vm._v("\n                edit\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Editar")])]),_vm._v(" "),_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-icon',_vm._g({directives:[{name:"can",rawName:"v-can:delete.hide",value:('workstations'),expression:"'workstations'",arg:"delete",modifiers:{"hide":true}}],staticClass:"mr-2",attrs:{"color":"error","small":""},on:{"click":function($event){return _vm.openRemoveModal(item)}}},on),[_vm._v("\n                delete\n              ")])]}}],null,true)},[_vm._v(" "),_c('span',[_vm._v("Eliminar")])])]}},{key:"body.append",fn:function(ref){
var isMobile = ref.isMobile;
return [(!isMobile)?_c('tr',[_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre"},model:{value:(_vm.headersFilter.name),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name", $$v)},expression:"headersFilter.name"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Nombre completo"},model:{value:(_vm.headersFilter.name_full),callback:function ($$v) {_vm.$set(_vm.headersFilter, "name_full", $$v)},expression:"headersFilter.name_full"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Ubicacion"},model:{value:(_vm.headersFilter.location),callback:function ($$v) {_vm.$set(_vm.headersFilter, "location", $$v)},expression:"headersFilter.location"}})],1),_vm._v(" "),_c('td',[_c('v-text-field',{attrs:{"type":"text","label":"Linea de produccion"},model:{value:(_vm.headersFilter.productionline),callback:function ($$v) {_vm.$set(_vm.headersFilter, "productionline", $$v)},expression:"headersFilter.productionline"}})],1)]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('modal-remove',{ref:"refModalRemove",attrs:{"modalData":_vm.workstationTemp},on:{"id_element":_vm.deleteWorkStation}})],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-4fa2d223';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'list-work-stations';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-4fa2d223'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-4fa2d223', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SaveWorkStation.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/views/WorkStations/SaveWorkStation.vue                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var ProductionLineRepository;
module.link("../../../api/ProductionLines/ProductionLine", {
  ProductionLineRepository: function (v) {
    ProductionLineRepository = v;
  }
}, 0);
module.exportDefault({
  name: "SaveWorkStation",
  data: function () {
    return {
      workstation: {
        _id: null,
        name: null,
        name_full: null,
        location: null,
        productionline: {
          _id: null,
          name: null,
          description: null
        }
      },
      dataView: {
        title: '',
        targetButton: ''
      }
    };
  },
  created: function () {
    // Este es un metodo gancho, y se ejecuta cuando el HTML es creado
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear Estacion de trabajo";
      this.dataView.targetButton = "Crear";
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar Estacion de trabajo";
      this.dataView.targetButton = "Actualizar";
      var tempWorkstation = this.$store.state.temporal.element;
      this.workstation = {
        _id: tempWorkstation._id,
        name: tempWorkstation.name,
        name_full: tempWorkstation.name_full,
        location: tempWorkstation.location,
        productionline: tempWorkstation.productionline
      };
    }
  },
  methods: {
    saveWorkStation: function () {
      var _this = this;

      this.$loader.activate('Guardando estacion de trabajo...');
      Meteor.call('workstation.save', this.workstation, function (error, response) {
        _this.$loader.deactivate();

        if (error) {
          _this.$alert.showAlertSimple('error', error.reason);
        } else {
          _this.$alert.showAlertSimple('success', response.message);

          _this.$router.push({
            name: 'home.workstations'
          });
        }
      });
    }
  },
  meteor: {
    $subscribe: {
      'productionlines.list': []
    },
    productionlines: function () {
      return ProductionLineRepository.find({}, {
        fields: {
          _id: 1,
          name: 1,
          description: 1
        }
      }).fetch();
    }
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('v-row',[_c('v-col',[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(_vm.dataView.title))])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"2"}},[_c('v-btn',{attrs:{"block":"","type":"submit","form":"saveWorkStation","color":"primary"},domProps:{"textContent":_vm._s(_vm.dataView.targetButton)}})],1)],1),_vm._v(" "),_c('v-row',[_c('v-col',[_c('v-card',[_c('v-card-text',[_c('v-form',{attrs:{"id":"saveWorkStation","autocomplete":"off"},on:{"submit":function($event){$event.preventDefault();return _vm.saveWorkStation($event)}}},[_c('v-row',[_c('v-col',{attrs:{"xs":"12","sm":"12","md":"8"}},[_c('v-text-field',{attrs:{"id":"inputName","name":"name","label":"Nombre"},model:{value:(_vm.workstation.name),callback:function ($$v) {_vm.$set(_vm.workstation, "name", $$v)},expression:"workstation.name"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputNameFull","name":"name_full","label":"Nombre completo"},model:{value:(_vm.workstation.name_full),callback:function ($$v) {_vm.$set(_vm.workstation, "name_full", $$v)},expression:"workstation.name_full"}}),_vm._v(" "),_c('v-text-field',{attrs:{"id":"inputLocation","type":"text","name":"location","label":"Ubicacion"},model:{value:(_vm.workstation.location),callback:function ($$v) {_vm.$set(_vm.workstation, "location", $$v)},expression:"workstation.location"}}),_vm._v(" "),_c('v-select',{attrs:{"id":"inputProductionLine","name":"name","items":_vm.productionlines,"item-text":"name","item-value":"_id","return-object":"","label":"Linea de produccion"},model:{value:(_vm.workstation.productionline),callback:function ($$v) {_vm.$set(_vm.workstation, "productionline", $$v)},expression:"workstation.productionline"}})],1)],1)],1)],1)],1)],1)],1)],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-352c377e';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'save-work-station';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-352c377e'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-352c377e', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"directives":{"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/directives/index.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./v-can-directive");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"v-can-directive.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/directives/v-can-directive.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Vue;
module.link("vue", {
  default(v) {
    Vue = v;
  }

}, 0);

function commentNode(el, vnode) {
  const comment = document.createComment(' ');
  Object.defineProperty(comment, 'setAttribute', {
    value: () => undefined
  });
  vnode.text = ' ';
  vnode.elm = comment;
  vnode.isComment = true;
  vnode.context = undefined;
  vnode.tag = undefined;
  vnode.data.directives = undefined;

  if (vnode.componentInstance) {
    vnode.componentInstance.$el = comment;
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el);
  }
}

Vue.directive('can', function (el, binding, vnode) {
  const behaviour = binding.modifiers.disable ? 'disable' : 'hide';
  const ok = Roles.userIsInRole(Meteor.userId(), "".concat(binding.value, "-").concat(binding.arg), Meteor.user().profile.profile);

  if (!ok) {
    if (behaviour === 'hide') {
      commentNode(el, vnode);
    } else if (behaviour === 'disable') {
      el.disabled = true;
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"plugins":{"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/plugins/index.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./vuetify");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vuetify.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/plugins/vuetify.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Vue;
module.link("vue", {
  default(v) {
    Vue = v;
  }

}, 0);
let Vuetify;
module.link("vuetify", {
  default(v) {
    Vuetify = v;
  }

}, 1);
module.link("vuetify/dist/vuetify.min.css");
let es;
module.link("vuetify/es5/locale/es", {
  default(v) {
    es = v;
  }

}, 2);
Vue.use(Vuetify);
module.exportDefault(new Vuetify({
  them: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#01697d',
        secondary: '#002744',
        accent: '#8c191d',
        error: '#d64143',
        info: '#5bc0de',
        success: '#5cb85c',
        warning: '#f0ad4e'
      }
    }
  },
  icons: {
    iconFont: 'md'
  },
  lang: {
    current: 'es',
    locales: {
      es
    }
  }
}));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes":{"chatRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/chatRoutes.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Chat;
module.link("../views/Chat/Chat", {
  default(v) {
    Chat = v;
  }

}, 0);
module.exportDefault({
  name: 'home.chat',
  path: 'chat',
  components: {
    sectionView: Chat
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"companyRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/companyRoutes.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListCompanies;
module.link("../views/Companies/ListCompanies", {
  default(v) {
    ListCompanies = v;
  }

}, 0);
let SaveCompany;
module.link("../views/Companies/SaveCompany", {
  default(v) {
    SaveCompany = v;
  }

}, 1);
module.exportDefault({
  path: 'empresas',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.companies',
    path: '',
    meta: {
      permission: 'companies-view'
    },
    component: ListCompanies
  }, {
    name: 'home.company.edit',
    path: 'editar',
    meta: {
      permission: 'companies-edit'
    },
    component: SaveCompany
  }, {
    name: 'home.company.create',
    path: 'crear',
    meta: {
      permission: 'companies-create'
    },
    component: SaveCompany
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"loginRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/loginRoutes.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let LytAuth;
module.link("../layouts/LytAuth", {
  default(v) {
    LytAuth = v;
  }

}, 0);
let Login;
module.link("../views/Auth/Login", {
  default(v) {
    Login = v;
  }

}, 1);
let ForgotPassword;
module.link("../views/Auth/ForgotPassword", {
  default(v) {
    ForgotPassword = v;
  }

}, 2);
let ResetPassword;
module.link("../views/Auth/ResetPassword", {
  default(v) {
    ResetPassword = v;
  }

}, 3);
let VerifyEmail;
module.link("../views/Auth/VerifyEmail", {
  default(v) {
    VerifyEmail = v;
  }

}, 4);
let SetInitialPassword;
module.link("../views/Auth/SetInitialPassword", {
  default(v) {
    SetInitialPassword = v;
  }

}, 5);
module.exportDefault({
  path: '/login',
  components: {
    allPageView: LytAuth
  },
  children: [{
    path: '',
    name: 'login',
    components: {
      sectionView: Login
    }
  }, {
    name: 'enrollAccount',
    path: '/enroll-account/:token',
    components: {
      sectionView: SetInitialPassword
    }
  }, {
    path: 'forgot-password',
    name: 'forgotPassword',
    components: {
      sectionView: ForgotPassword
    }
  }, {
    name: 'resetPassword',
    path: '/reset-password/:token',
    components: {
      sectionView: ResetPassword
    }
  }, {
    name: 'verifyEmail',
    path: '/verify-email/:token',
    components: {
      sectionView: VerifyEmail
    }
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"productionLinesRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/productionLinesRoutes.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListProductionLines;
module.link("../views/ProductionLines/ListProductionLines", {
  default(v) {
    ListProductionLines = v;
  }

}, 0);
let SaveProductionLine;
module.link("../views/ProductionLines/SaveProductionLine", {
  default(v) {
    SaveProductionLine = v;
  }

}, 1);
module.exportDefault({
  path: 'lineasproduccion',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.productionlines',
    path: '',
    meta: {
      permission: 'productionlines-view'
    },
    component: ListProductionLines
  }, {
    name: 'home.productionlines.create',
    path: 'crear',
    meta: {
      permission: 'productionlines-create'
    },
    component: SaveProductionLine
  }, {
    name: 'home.productionlines.edit',
    path: 'editar',
    meta: {
      permission: 'productionlines-edit'
    },
    component: SaveProductionLine
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"productionOrdersRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/productionOrdersRoutes.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListProductionOrders;
module.link("../views/ProductionOrders/ListProductionOrders", {
  default(v) {
    ListProductionOrders = v;
  }

}, 0);
module.exportDefault({
  path: 'ordenesproduccion',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.productionorders',
    path: '',
    meta: {
      permission: 'productionorders-view'
    },
    component: ListProductionOrders
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"productsRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/productsRoutes.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListProducts;
module.link("../views/Products/ListProducts", {
  default(v) {
    ListProducts = v;
  }

}, 0);
let SaveProduct;
module.link("../views/Products/SaveProduct", {
  default(v) {
    SaveProduct = v;
  }

}, 1);
module.exportDefault({
  path: 'productos',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.products',
    path: '',
    meta: {
      permission: 'products-view'
    },
    component: ListProducts
  }, {
    name: 'home.products.create',
    path: 'crear',
    meta: {
      permission: 'products-create'
    },
    component: SaveProduct
  }, {
    name: 'home.products.edit',
    path: 'editar',
    meta: {
      permission: 'products-edit'
    },
    component: SaveProduct
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"profilesRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/profilesRoutes.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListProfiles;
module.link("../views/Profiles/ListProfiles", {
  default(v) {
    ListProfiles = v;
  }

}, 0);
let SaveProfile;
module.link("../views/Profiles/SaveProfile", {
  default(v) {
    SaveProfile = v;
  }

}, 1);
module.exportDefault({
  path: 'perfiles',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.profiles',
    path: '',
    meta: {
      permission: 'profiles-view'
    },
    component: ListProfiles
  }, {
    name: 'home.profiles.create',
    path: 'crear',
    meta: {
      permission: 'profiles-create'
    },
    component: SaveProfile
  }, {
    name: 'home.profiles.edit',
    path: 'editar',
    meta: {
      permission: 'profiles-edit'
    },
    component: SaveProfile
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"providerRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/providerRoutes.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListProviders;
module.link("../views/Providers/ListProviders", {
  default(v) {
    ListProviders = v;
  }

}, 0);
let SaveProvider;
module.link("../views/Providers/SaveProvider", {
  default(v) {
    SaveProvider = v;
  }

}, 1);
module.exportDefault({
  path: 'proveedores',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.providers',
    path: '',
    meta: {
      permission: 'providers-view'
    },
    component: ListProviders
  }, {
    name: 'home.provider.edit',
    path: 'editar',
    meta: {
      permission: 'providers-edit'
    },
    component: SaveProvider
  }, {
    name: 'home.provider.create',
    path: 'crear',
    meta: {
      permission: 'providers-create'
    },
    component: SaveProvider
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"providerStationsRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/providerStationsRoutes.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListProviderStations;
module.link("../views/ProviderStations/ListProviderStations", {
  default(v) {
    ListProviderStations = v;
  }

}, 0);
module.exportDefault({
  path: 'suministros',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.providerstation',
    path: '',
    meta: {
      permission: 'providerstations-view'
    },
    component: ListProviderStations
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/routes.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let loginRoutes;
module.link("./loginRoutes", {
  default(v) {
    loginRoutes = v;
  }

}, 0);
let LytSPA;
module.link("../layouts/LytSPA", {
  default(v) {
    LytSPA = v;
  }

}, 1);
let Home;
module.link("../views/Home/Home", {
  default(v) {
    Home = v;
  }

}, 2);
let ConfigureAccount;
module.link("../views/Account/ConfigureAccount", {
  default(v) {
    ConfigureAccount = v;
  }

}, 3);
let usersRoutes;
module.link("./usersRoutes", {
  default(v) {
    usersRoutes = v;
  }

}, 4);
let profilesRoutes;
module.link("./profilesRoutes", {
  default(v) {
    profilesRoutes = v;
  }

}, 5);
let chatRoutes;
module.link("./chatRoutes", {
  default(v) {
    chatRoutes = v;
  }

}, 6);
let companyRoutes;
module.link("./companyRoutes", {
  default(v) {
    companyRoutes = v;
  }

}, 7);
let productionLinesRoutes;
module.link("./productionLinesRoutes", {
  default(v) {
    productionLinesRoutes = v;
  }

}, 8);
let productionOrdersRoutes;
module.link("./productionOrdersRoutes", {
  default(v) {
    productionOrdersRoutes = v;
  }

}, 9);
let providerStationsRoutes;
module.link("./providerStationsRoutes", {
  default(v) {
    providerStationsRoutes = v;
  }

}, 10);
let warehousesRoutes;
module.link("./warehousesRoutes", {
  default(v) {
    warehousesRoutes = v;
  }

}, 11);
let workStationsRoutes;
module.link("./workStationsRoutes", {
  default(v) {
    workStationsRoutes = v;
  }

}, 12);
let providerRoutes;
module.link("./providerRoutes", {
  default(v) {
    providerRoutes = v;
  }

}, 13);
let productsRoutes;
module.link("./productsRoutes", {
  default(v) {
    productsRoutes = v;
  }

}, 14);
module.exportDefault([{
  path: '*',
  redirect: '/login'
}, loginRoutes, {
  path: '/',
  components: {
    allPageView: LytSPA
  },
  meta: {
    requirestAuth: true
  },
  children: [{
    name: 'home',
    path: '',
    components: {
      sectionView: Home
    }
  }, {
    name: 'home.account',
    path: 'account',
    components: {
      sectionView: ConfigureAccount
    }
  }, usersRoutes, profilesRoutes, chatRoutes, companyRoutes, productionLinesRoutes, productionOrdersRoutes, providerStationsRoutes, warehousesRoutes, workStationsRoutes, providerRoutes, productsRoutes]
}]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"usersRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/usersRoutes.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let SaveUser;
module.link("../views/Users/SaveUser", {
  default(v) {
    SaveUser = v;
  }

}, 0);
let ListUsers;
module.link("../views/Users/ListUsers", {
  default(v) {
    ListUsers = v;
  }

}, 1);
module.exportDefault({
  path: 'usuarios',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.users',
    path: '',
    meta: {
      permission: 'users-view'
    },
    component: ListUsers
  }, {
    name: 'home.users.create',
    path: 'crear',
    meta: {
      permission: 'users-create'
    },
    component: SaveUser
  }, {
    name: 'home.users.edit',
    path: 'editar',
    meta: {
      permission: 'users-edit'
    },
    component: SaveUser
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"warehousesRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/warehousesRoutes.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListWarehouses;
module.link("../views/Warehouses/ListWarehouses", {
  default(v) {
    ListWarehouses = v;
  }

}, 0);
let SaveWarehouse;
module.link("../views/Warehouses/SaveWarehouse", {
  default(v) {
    SaveWarehouse = v;
  }

}, 1);
module.exportDefault({
  path: 'suministro',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.warehouses',
    path: '',
    meta: {
      permission: 'warehouses-view'
    },
    component: ListWarehouses
  }, {
    name: 'home.warehouse.edit',
    path: 'editar',
    meta: {
      permission: 'warehouses-edit'
    },
    component: SaveWarehouse
  }, {
    name: 'home.warehouse.create',
    path: 'crear',
    meta: {
      permission: 'warehouses-create'
    },
    component: SaveWarehouse
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workStationsRoutes.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/routes/workStationsRoutes.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let ListWorkStations;
module.link("../views/WorkStations/ListWorkStations", {
  default(v) {
    ListWorkStations = v;
  }

}, 0);
let SaveWorkStation;
module.link("../views/WorkStations/SaveWorkStation", {
  default(v) {
    SaveWorkStation = v;
  }

}, 1);
module.exportDefault({
  path: 'estacionestrabajo',
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [{
    name: 'home.workstations',
    path: '',
    meta: {
      permission: 'workstations-view'
    },
    component: ListWorkStations
  },, {
    name: 'home.workstation.edit',
    path: 'editar',
    meta: {
      permission: 'workstations-edit'
    },
    component: SaveWorkStation
  }, {
    name: 'home.workstation.create',
    path: 'crear',
    meta: {
      permission: 'workstations-create'
    },
    component: SaveWorkStation
  }]
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"App.vue":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/App.vue                                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var __vue_script__, __vue_template__; module.exportDefault = function(value) { __vue_script__ = value; }; (function(){var AlertMessage;
module.link("./components/Utilities/Alerts/AlertMessage", {
  "default": function (v) {
    AlertMessage = v;
  }
}, 0);
var Loader;
module.link("./components/Utilities/Loaders/Loader", {
  "default": function (v) {
    Loader = v;
  }
}, 1);
module.exportDefault({
  name: "App",
  components: {
    AlertMessage: AlertMessage,
    Loader: Loader
  }
});
})();
__vue_script__ = __vue_script__ || {};var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);__vue_options__.render = function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app',[_c('router-view',{attrs:{"name":"allPageView"}}),_vm._v(" "),_c('alert-message'),_vm._v(" "),_c('loader')],1)};
__vue_options__.staticRenderFns = [];
__vue_options__.render._withStripped = true;
__vue_options__._scopeId = 'data-v-6aa40998';__vue_options__.packageName = 'null';
__vue_options__.name = __vue_options__.name || 'app';module.export('default', exports.default = __vue_script__);exports.__esModule = true;
if(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['data-v-6aa40998'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('data-v-6aa40998', __vue_script__);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/router.js                                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Vue;
module.link("vue", {
  default(v) {
    Vue = v;
  }

}, 0);
let VueRouter;
module.link("vue-router", {
  default(v) {
    VueRouter = v;
  }

}, 1);
let routes;
module.link("./routes/routes", {
  default(v) {
    routes = v;
  }

}, 2);
let store;
module.link("./store", {
  default(v) {
    store = v;
  }

}, 3);
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
  const requirestAuth = to.matched.some(record => record.meta.requirestAuth);
  const isLogged = store.state.auth.isLogged;

  if (!requirestAuth && isLogged && to.name === 'login') {
    next('/');
  } else if (requirestAuth && !isLogged) {
    next('/login');
  } else {
    const permission = to.meta.permission;

    if (permission) {
      Meteor.call('permissions.check', permission, (error, response) => {
        if (error) {
          this.$alert.showAlertSimple('error', error.reason);
        } else if (response.data.hasPermission) {
          next();
        } else {
          next(from.path);
          console.warn('El usuario no tiene acceso a esta seccion');
        }
      });
    } else {
      next();
    }
  }
});
module.exportDefault(router);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"store.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/store.js                                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Vue;
module.link("vue", {
  default(v) {
    Vue = v;
  }

}, 0);
let Vuex;
module.link("vuex", {
  default(v) {
    Vuex = v;
  }

}, 1);
let VuexPersist;
module.link("vuex-persist", {
  default(v) {
    VuexPersist = v;
  }

}, 2);
let auth;
module.link("./modules/authentication", {
  default(v) {
    auth = v;
  }

}, 3);
let temporal;
module.link("./modules/temporal", {
  default(v) {
    temporal = v;
  }

}, 4);
Vue.use(Vuex);
const vuexLocal = new VuexPersist({
  storage: window.localStorage,
  modules: ['auth', 'temporal']
});
module.exportDefault(new Vuex.Store({
  modules: {
    auth,
    temporal
  },
  plugins: [vuexLocal.plugin]
}));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"api":{"Companies":{"Company.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/Companies/Company.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Company: () => Company
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Company = new Mongo.Collection('companies');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Messages":{"Message.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/Messages/Message.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Message: () => Message
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Message = new Mongo.Collection('messages');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ProductionLines":{"ProductionLine.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/ProductionLines/ProductionLine.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  ProductionLineRepository: () => ProductionLineRepository
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const ProductionLineRepository = new Mongo.Collection('productionlines');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Products":{"Product.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/Products/Product.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Product: () => Product
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Product = new Mongo.Collection('products');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Profiles":{"Profile.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/Profiles/Profile.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Profile: () => Profile
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Profile = new Mongo.Collection('profiles');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Providers":{"Provider.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/Providers/Provider.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  Provider: () => Provider
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Provider = new Mongo.Collection('providers');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Warehouses":{"Warehouse.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/Warehouses/Warehouse.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  WarehouseRepository: () => WarehouseRepository
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const WarehouseRepository = new Mongo.Collection('warehouses');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Workstations":{"WorkStation.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/Workstations/WorkStation.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  WorkstationRepository: () => WorkstationRepository
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const WorkstationRepository = new Mongo.Collection('workstations');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"both":{"index.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/both/index.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Accounts.config({
  loginExpirationInDays: 1 // Numero de dias para expirar el token

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"client":{"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/client/index.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Vue;
module.link("vue", {
  default(v) {
    Vue = v;
  }

}, 1);
let vuetify;
module.link("../../ui/plugins/vuetify", {
  default(v) {
    vuetify = v;
  }

}, 2);
module.link("../../ui/plugins/index");
let store;
module.link("../../ui/store", {
  default(v) {
    store = v;
  }

}, 3);
module.link("../../ui/directives");
let App;
module.link("/imports/ui/App", {
  default(v) {
    App = v;
  }

}, 4);
let router;
module.link("../../ui/router", {
  default(v) {
    router = v;
  }

}, 5);
Meteor.startup(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("app");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"client":{"main.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("/imports/startup/client");
module.link("/imports/startup/both");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".ts",
    ".mjs",
    ".css",
    ".vue",
    ".tsx"
  ]
});

var exports = require("/client/main.js");