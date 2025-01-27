// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sharedData: [], // Assuming sharedData is an array of objects
  },
  mutations: {
    setSharedData(state, payload) {
      state.sharedData = payload;
    },
  },
  getters: {
    getSharedDataById: (state) => (id) => {
      console.log(id);
      console.log(state.sharedData);
      return state.sharedData.find(item => item.patient.id === id) || null;
    },
  },
});
