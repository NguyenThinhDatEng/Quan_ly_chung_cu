import { createStore } from "vuex";
// api
import vehicleAPI from "@/apis/managementAPI/vehicleAPI";

const api = vehicleAPI;

const vehicleFeeStore = createStore({
  state() {
    return {
      idField: "id",
      items: [],
      api: api,
    };
  },

  getters: {},

  mutations: {
    insert(state, data) {
      state.items.unshift(data);
    },

    delete(state, data) {
      if (data) {
        state.items = state.items.filter(
          (item) => item[state.idField] != data[state.idField]
        );
      }
    },

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

export default vehicleFeeStore;
