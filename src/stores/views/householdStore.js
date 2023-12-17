import { createStore } from "vuex";
// api
import householdAPI from "@/apis/managementAPI/HouseholdAPI";

const api = householdAPI;

const householdStore = createStore({
  state() {
    return {
      items: [],
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
        let dataCustom = res.data;
        if (dataCustom) {
          dataCustom.forEach((element) => {
            if (Array.isArray(element.residentList)) {
              element.memberCount = element.residentList.length;
            }
          });
          context.commit("getAll", dataCustom);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default householdStore;
