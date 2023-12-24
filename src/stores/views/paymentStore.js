import { createStore } from "vuex";
// api
import paymentAPI from "@/apis/managementAPI/FeeAPI/payment.js";

const api = paymentAPI;

const paymentStore = createStore({
  state() {
    return {
      idField: "id",
      items: [],
      api: api,
    };
  },

  getters: {},

  mutations: {
    getAll(state, data) {
      state.items = data;
    },
  },

  actions: {
    async getAll(context) {
      try {
        const res = await api.getAsync();
        if (res.data) {
          context.commit("getAll", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default paymentStore;
