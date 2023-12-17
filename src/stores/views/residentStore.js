import { createStore } from "vuex";
// api
import residentAPI from "@/apis/dictionaryAPI/residentAPI";

const api = residentAPI;

const apartmentStore = createStore({
  state() {
    return {
      idField: "id",
      nameField: "name",
      codeField: "residentCode",
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
        let data = res.data?.entity;
        if (data) {
          context.commit("insert", res.data.entity);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async update(context, payload) {
      try {
        const res = await api.putAsync(payload);
        if (res.data?.entity) {
          context.commit("update", res.data.entity);
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

export default apartmentStore;
