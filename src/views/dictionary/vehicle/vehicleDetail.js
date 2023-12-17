import { ref } from "vue";
// store
import vehicleFeeStore from "@/stores/views/vehicleFeeStore";

export const useVehicleDetail = () => {
  const title = ref("Thông tin phương tiện");

  const store = vehicleFeeStore;

  return {
    title,
    store,
  };
};
