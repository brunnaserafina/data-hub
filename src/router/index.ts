import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClientRegistrationView from "../views/ClientRegistrationView.vue";
import ClientListView from "../views/ClientListView.vue";
import ClientEditView from "../views/ClientEditView.vue";

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
  {
    path: "/gerenciar-cadastros",
    name: "clientList",
    component: ClientListView,
  },
  {
    path: "/editar-cadastro/:clientId",
    name: "clientEdit",
    component: ClientEditView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
