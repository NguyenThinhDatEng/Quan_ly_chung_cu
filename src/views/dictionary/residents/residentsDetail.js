import { ref, computed, onMounted, getCurrentInstance, watch } from "vue";
// store
import residentStore from "@/stores/views/residentStore.js";
import apartmentStore from "@/stores/views/apartmentStore";
// root enum
import i18nEnum from "@/i18n/enum";
import _enum from "../../../commons/enum";
// api
import residentAPI from "@/apis/dictionaryAPI/residentAPI";

export const useResidentsDetail = () => {
  const { proxy } = getCurrentInstance();

  const store = residentStore;
  const api = residentAPI;

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
    isOwner: false,
    status: _enum.ResidentStatus.Active,
  };

  const ownerDisable = ref(false);
  const selectApartment = (value) => {
    const me = proxy;

    if (checkExistOwner(value)) {
      ownerDisable.value = true;
      if (me.editMode == _enum.Mode.Add) {
        me.model.isOwner = false;
      }
    } else {
      me.model.isOwner = true;
    }
  };

  const checkExistOwner = (apartmentId) => {
    const me = proxy;
    const owner = me.store.state.items.find(
      (item) => item.apartmentId == apartmentId && item.isOwner == true
    );
    return owner ? true : false;
  };

  const onClickEdit = () => {
    const me = proxy;
    if (checkExistOwner(me.model.apartmentId) && me.model.isOwner == false) {
      ownerDisable.value = true;
    }
    me.commandClick(_enum.Mode.Update);
  };

  onMounted(() => {
    // Lấy dữ liệu căn hộ nếu trong store chưa có dữ liệu
    const items = apartmentStore?.state?.items ?? [];
    if (items.length == 0 && typeof apartmentStore.dispatch == "function") {
      apartmentStore.dispatch(_enum.Store.Mutations.GetAll);
    }
  });

  return {
    title,
    defaultModel,
    store,
    i18nEnum,
    apartmentItems,
    selectApartment,
    ownerDisable,
    onClickEdit,
    api,
  };
};
