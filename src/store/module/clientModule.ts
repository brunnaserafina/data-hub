const state = {
  clientData: {
    id: null,
    nome: "",
    dataNascimento: "",
    cpf: "",
  },
};

const getters = {
  getClientData: (state: any) => state.clientData,
};

const mutations = {
  setClientData(state: any, clientData: any) {
    state.clientData = clientData;
  },
};

const actions = {
  saveClientData({ commit }: any, clientData: any) {
    commit("setClientData", clientData);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
