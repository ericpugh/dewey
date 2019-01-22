import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueWait from "vue-wait";
import VueScrollTo from "vue-scrollto";
import BootstrapVue from "bootstrap-vue";

Vue.use(VueWait);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true,
    registerComponent: false,
    registerDirective: false
  }),
  render: h => h(App)
}).$mount("#app");
