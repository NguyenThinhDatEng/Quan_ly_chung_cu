import { computed, ref } from "vue";
// store
import serviceFeeStore from "@/stores/views/serviceFeeStore";
// Enum
import _enum from "@/commons/enum";
import i18nEnum from "@/i18n/enum/index.js";

export const useServiceDetail = () => {
  const title = ref("Thông tin dịch vụ");

  const store = serviceFeeStore;

  const options = computed(() => {
    const keys = Object.keys(_enum.ServiceUnit);
    return keys.map((key) => ({
      label: i18nEnum.ServiceUnit[key],
      value: _enum.ServiceUnit[key],
    }));
  });

  return {
    title,
    options,
    store,
  };
};
