import Vue from "vue";
import VueRouter from "vue-router";
// import * as firebase from "firebase";
import Pageuser from "../views/Pageuser.vue";
import Authpage from "../views/Authpage.vue";
import Guard from "./auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Pageuser",
    component: Pageuser,
    // beforeEnter: Guard,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Authpage,
  },
  {
    path: "/chat/:id",
    name: "Chatpage",
    beforeEnter: Guard,
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Chatpage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
