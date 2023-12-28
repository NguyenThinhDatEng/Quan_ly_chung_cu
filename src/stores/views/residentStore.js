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
      api: api,
      items: [],
    };
  },

  getters: {},

  mutations: {
    getAll(state, data) {
      state.items = data.sort((a, b) => {
        const aTmp = a[state.codeField];
        const bTmp = b[state.codeField];
        if (aTmp > bTmp) return 1;
        else if (aTmp < bTmp) return -1;
        else return 0;
      });
    },

    insert(state, data) {
      state.items.push(data);
      state.items = state.items.sort((a, b) => {
        const aTmp = a[state.codeField];
        const bTmp = b[state.codeField];
        if (aTmp > bTmp) return 1;
        else if (aTmp < bTmp) return -1;
        else return 0;
      });
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

export default apartmentStore;
