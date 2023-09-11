import IClient from "@/interfaces/IClient";
import { Commit } from "vuex";

const state = {
  clientData: {
    id: undefined,
    nome: "",
    dataNascimento: "",
    cpf: "",
  } as IClient,
};

const getters = {
  getClientData: (state: { clientData: IClient }): IClient => state.clientData,
};

const mutations = {
  setClientData(state: { clientData: IClient }, clientData: IClient): void {
    state.clientData = clientData;
  },
};

const actions = {
  saveClientData({ commit }: { commit: Commit }, clientData: IClient): void {
    commit("setClientData", clientData);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
