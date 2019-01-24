import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "search",
      component: () =>
          import("./views/Search.vue")
    },
    {
      path: '/help',
      name: "help",
        component: () =>
            import("./views/Help.vue")
    },
    {
      path: '/recent',
      name: "recent",
        component: () =>
            import("./views/Recent.vue")
    }
  ]
});

