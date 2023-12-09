import { ref } from "vue";
// Enum
import Enum from "@/commons/enum";
export const useVehicleDetail = () => {
  const title = ref("Thông tin phương tiện");

  return {
    title,
    Enum,
  };
};
