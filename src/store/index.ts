import { createStore } from "vuex";
import clientModule from "./module/clientModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    client: clientModule,
  },
});
