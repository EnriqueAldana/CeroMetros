import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import auth from './modules/authentication';
import temporal from './modules/temporal';

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
    storage: window.localStorage,
    modules: ['auth','temporal']
});

export default new Vuex.Store({
    modules: {
        auth,
        temporal
    },
    plugins:[vuexLocal.plugin]
});