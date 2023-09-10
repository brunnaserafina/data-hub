import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClientRegistrationView from "../views/ClientRegistrationView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cadastrar-cliente",
    name: "clientRegistration",
    component: ClientRegistrationView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
