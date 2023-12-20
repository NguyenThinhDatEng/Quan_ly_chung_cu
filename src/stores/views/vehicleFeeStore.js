import { createStore } from "vuex";
// api
import vehicleFeeAPI from "@/apis/dictionaryAPI/vehicleFeeAPI";

const api = vehicleFeeAPI;

const vehicleFeeStore = createStore({
  state() {
    return {
      idField: "id",
      codeField: "vehicleTypeCode",
      nameField: "name",
      items: [],
      api: api,
    };
  },

  getters: {},

  mutations: {
    getAll(state, data) {
      state.items = data;
    },

    insert(state, data) {
      state.items.unshift(data);
    },

    update(state, data) {
      let selectedData = state.items.filter(
        (item) => item[state.idField] == data[state.idField]
      );
      if (selectedData.length > 0) {
        Object.assign(selectedData[0], data);
      }
    },

    delete(state, data) {
      if (data) {
        state.items = state.items.filter(
          (item) => item[state.idField] != data[state.idField]
        );
      }
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
