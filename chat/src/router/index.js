import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "*",
    name: "Redirect",
    component: () => import("../views/Login.vue"),
  },
];

let authenticatedRoutes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "*",
    name: "Redirect",
    beforeEnter: (_, __, next) => {
      next("/");
    },
  },
];

let user = localStorage.getItem("user");
if (user != null) {
  routes = authenticatedRoutes;
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
