import Vue from "vue";
import Vuex from "vuex";
import artwork from './modules/artwork'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        artwork
    }
})

