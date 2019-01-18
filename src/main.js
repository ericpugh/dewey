import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueWait from 'vue-wait';
import BootstrapVue from 'bootstrap-vue';

Vue.use(VueWait);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

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
