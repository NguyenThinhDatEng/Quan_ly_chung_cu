import { ref, computed, onMounted } from "vue";
// store
import residentStore from "@/stores/views/residentStore.js";
import apartmentStore from "@/stores/views/apartmentStore";
// root enum
import i18nEnum from "@/i18n/enum";
import _enum from "../../../commons/enum";

export const useResidentsDetail = () => {
  const store = residentStore;

  const title = ref("Thông tin cư dân");

  const apartmentItems = computed(() => {
    const items = apartmentStore?.state?.items ?? [];
    const idField = apartmentStore?.state?.idField;
    const codeField = apartmentStore?.state?.codeField;

    return items.map((item) => {
      return {
        label: item[codeField],
        value: item[idField],
      };
    });
  });

  const defaultModel = {
    gender: _enum.Gender.Male,
  };

  onMounted(() => {
    // Lấy dữ liệu căn hộ nếu trong store chưa có dữ liệu
    const items = apartmentStore?.state?.items ?? [];
    if (items.length == 0 && typeof apartmentStore.dispatch == "function") {
      apartmentStore.dispatch(_enum.Store.Mutations.GetAll);
    }
  });

  return { title, defaultModel, store, i18nEnum, apartmentItems };
};
