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
  },

  actions: {},
});

export default vehicleFeeStore;
