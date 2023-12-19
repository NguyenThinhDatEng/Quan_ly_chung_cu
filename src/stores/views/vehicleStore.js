import { createStore } from "vuex";
// api
import vehicleAPI from "@/apis/managementAPI/vehicleAPI";

const api = vehicleAPI;

const vehicleFeeStore = createStore({
  state() {
    return {
      idField: "id",
      items: [],
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
    async insert(context, payload) {
      try {
        const res = await api.postAsync(payload);
        if (res.data?.entity) {
          context.commit("insert", res.data.entity);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async delete(context, payload) {
      try {
        const res = await api.deleteAsync(payload);
        if (res.data?.entity) {
          context.commit("delete", res.data.entity);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default vehicleFeeStore;
