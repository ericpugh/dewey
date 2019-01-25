import Vue from "vue";
import Vuex from "vuex";
import artwork from "./modules/artwork";
import recent from "./modules/recent";
import autocomplete from "./modules/autocomplete";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        artwork,
        recent,
        autocomplete
    },
    plugins: [new VuexPersistence().plugin]
})

