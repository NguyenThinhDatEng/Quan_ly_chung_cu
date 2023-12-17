import { getCurrentInstance, onMounted, ref, computed } from "vue";
// store
import vehicleFeeStore from "@/stores/views/vehicleFeeStore";
// import vehicleStore from "@/stores/views/vehicleStore";
// enum
import _enum from "@/commons/enum";

export const useVehicleDetail = () => {
  const { proxy } = getCurrentInstance();

  const title = ref("Phương tiện");

  // const store = vehicleStore;

  const residentItems = ref([]);
  const vehicleTypeItems = computed(() => {
    const { items, nameField, codeField, idField } = vehicleFeeStore.state;

    return items.map((item) => {
      return {
        label: item[nameField],
        value: item[idField],
        code: item[codeField],
      };
    });
  });
  onMounted(() => {
    // Lấy dữ liệu cho combobox cư dân
    if (proxy._formParam?.residentItems) {
      residentItems.value = proxy._formParam?.residentItems.map((item) => ({
        label: item.name,
        value: item.id,
        code: item.residentCode,
      }));
    }

    // Lấy dữ liệu căn hộ nếu trong store chưa có dữ liệu
    const items = vehicleFeeStore?.state?.items ?? [];
    if (items.length == 0 && typeof vehicleFeeStore.dispatch == "function") {
      vehicleFeeStore.dispatch(_enum.Store.Mutations.GetAll);
    }
  });

  return {
    title,
    // store,
    residentItems,
    vehicleTypeItems,
  };
};
