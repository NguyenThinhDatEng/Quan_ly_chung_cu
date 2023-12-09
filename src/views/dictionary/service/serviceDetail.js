import { computed, ref } from "vue";
// enum
import ServiceUnit from "@/commons/enum/ServiceUnit";
// resources
import Resource from "@/commons/resource";

export const useServiceDetail = () => {
  const title = ref("Thông tin dịch vụ");
  const options = computed(() => {
    const keys = Object.keys(ServiceUnit);
    return keys.map((key) => ({
      label: Resource.ServiceUnit[key],
      value: ServiceUnit[key],
    }));
  });

  return {
    title,
    options,
  };
};
