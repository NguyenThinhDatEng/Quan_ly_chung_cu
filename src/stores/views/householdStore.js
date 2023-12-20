import { createStore } from "vuex";
// api
import householdAPI from "@/apis/managementAPI/HouseholdAPI";
import _enum from "@/commons/enum";

const api = householdAPI;

const householdStore = createStore({
  state() {
    return {
      items: [],
      api: api,
    };
  },

  getters: {},

  mutations: {
    getAll(state, data) {
      state.items = data;
    },

    deleteVehicle(state, data) {
      // update list
      const index = state.items.findIndex(
        (x) => x.apartmentCode == data.apartmentCode
      );
      if (index > -1) {
        // update list
        state.items[index].vehicleList = data.vehicleList;
        // update count
        state.items[index].vehicleCount -= 1;
      }
    },

    addVehicle(state, data) {
      // update list
      const index = state.items.findIndex(
        (x) => x.apartmentCode == data.apartmentCode
      );
      if (index > -1) {
        // update count
        state.items[index].vehicleCount += 1;
      }
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
              // Số thành viên
              element.memberCount = element.residentList.length;
              // Chủ hộ
              let { residentCode, name } = element.residentList.find(
                (item) => item.isOwner == true
              );
              element.ownerCode = residentCode;
              element.ownerName = name;
            }
            if (Array.isArray(element.vehicleList)) {
              element.vehicleCount = element.vehicleList.length;
            }
            // Số phương tiện
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
