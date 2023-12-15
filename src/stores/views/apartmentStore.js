import { createStore } from "vuex";
// api
import apartmentApi from "@/apis/dictionaryAPI/apartmentAPI";

const apartmentStore = createStore({
  state() {
    return {
      items: [],
    };
  },

  getters: {},

  mutations: {
    insert(state, data) {
      state.items = data;
    },
  },

  actions: {
    async insert(context, payload) {
      try {
        debugger;
        const res = await apartmentApi.postAsync(payload);
        if (res.data) {
          context.commit("insert", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default apartmentStore;
