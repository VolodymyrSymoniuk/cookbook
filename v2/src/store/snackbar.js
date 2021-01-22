export default {
  namespaced: true,
  state: {
    text: "",
    color: "",
    timeout: ""
  },
  mutations: {
    showMessage(state, payload) {
      state.text = payload.text;
      state.color = payload.color;
      state.timeout = payload.timeout;
    }
  },
  actions: {
    showSnack({ commit }, payload) {
      commit("showMessage", payload);
    }
  }
};
