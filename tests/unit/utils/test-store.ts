import { createStore } from "vuex";
import clientModule from "@/store/module/clientModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    client: clientModule,
  },
});
