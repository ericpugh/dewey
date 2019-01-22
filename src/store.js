import Vue from "vue";
import Vuex from "vuex";
import artwork from './modules/artwork'
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        artwork
    },
    plugins: [new VuexPersistence().plugin]
})

