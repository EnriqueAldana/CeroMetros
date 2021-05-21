//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package.modules.meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var Vue;

var require = meteorInstall({"node_modules":{"meteor":{"akryum:vue":{"index.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/akryum_vue/index.js                                      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({
  Vue: function () {
    return Vue;
  }
});

var _Vue;

module.link("vue", {
  "default": function (v) {
    _Vue = v;
  }
}, 0);

var _Plugin;

module.link("vue-meteor-tracker", {
  "default": function (v) {
    _Plugin = v;
  }
}, 1);

_Vue.use(_Plugin);

var Vue = _Vue;

if (Meteor.isDevelopment) {
  var vueVersion = parseInt(Vue.version.charAt(0));

  if (vueVersion === 1) {
    console.info("You are using Vue 1.x; to upgrade to Vue 2.x, install it with 'meteor npm install --save vue@^2.0.3'.");
  }
}
///////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/akryum:vue/index.js");

/* Exports */
Package._define("akryum:vue", exports, {
  Vue: Vue
});

})();
