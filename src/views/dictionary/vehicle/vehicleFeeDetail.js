import { ref } from "vue";
// store
import vehicleFeeStore from "@/stores/views/vehicleFeeStore";

export const useVehicleFeeDetail = () => {
  const title = ref("Thông tin phí phương tiện");

  const store = vehicleFeeStore;

  return {
    title,
    store,
  };
};
