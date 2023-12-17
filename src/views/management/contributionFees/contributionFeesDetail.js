import { ref, onMounted, reactive, computed, getCurrentInstance } from "vue";
// Enum
import _enum from "@/commons/enum";
import FundType from "@/commons/enum/FundType";
import i18nFundType from "@/i18n/enum/i18nFundType";
// stores
import apartmentStore from "@/stores/views/apartmentStore";
import residentStore from "@/stores/views/residentStore.js";
import contributionStore from "@/stores/views/contributionStore.js";

export const useContributionFeesDetail = () => {
  const { proxy } = getCurrentInstance();

  const title = ref("Khoản thu phí đóng góp");
  const defaultModel = {
    year: new Date().getFullYear(),
  };

  const store = contributionStore;

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

  const residentItems = computed(() => {
    const { items, idField, nameField, codeField } = residentStore.state;

    return items.map((item) => {
      return {
        label: item[nameField],
        value: item[idField],
        code: item[codeField],
      };
    });
  });

  const options = [
    {
      value: FundType.ForThePoor,
      label: i18nFundType.ForThePoor,
      field: "forThePoor",
    },
    {
      value: FundType.ForVNSeasAndIslands,
      label: i18nFundType.ForVNSeasAndIslands,
      field: "forVNSeasAndIslands",
    },
    {
      value: FundType.DGFestival,
      label: i18nFundType.DGFestival,
      field: "dgFestival",
    },
    {
      value: FundType.ResidentialGroup,
      label: i18nFundType.ResidentialGroup,
      field: "residentialGroup",
    },
    {
      value: FundType.ForChildren,
      label: i18nFundType.ForChildren,
      field: "forChildren",
    },
    {
      value: FundType.Charity,
      label: i18nFundType.Charity,
      field: "charity",
    },
    {
      value: FundType.Gratitude,
      label: i18nFundType.Gratitude,
      field: "gratitude",
    },
    {
      value: FundType.StudyPromotion,
      label: i18nFundType.StudyPromotion,
      field: "studyPromotion",
    },
    {
      value: FundType.ForTheElderly,
      label: i18nFundType.ForTheElderly,
      field: "forTheElderly",
    },
  ];

  const fundTypeKeys = ref([]);
  /**
   * Xử lý sự kiện khi mở/đóng dropdown
   * @param {Boolean} visible Hiển thị input
   */
  const onVisibleChange = (visible) => {
    if (visible == false) {
      if (fundTypeKeys.value.length > 0) {
        selectedFunds.forEach((item) => {
          if (fundTypeKeys.value.includes(item.key)) {
            item.visible = true;
          }
        });
      }
    }
  };

  /**
   * Xử lý sự kiện clear combobox
   */
  const onClear = () => {
    selectedFunds.forEach((item) => {
      item.visible = false;
    });
  };

  /**
   * Xử lý sự kiện xóa tag
   * @param {} tagValue value của options
   */
  const onRemoveTag = (tagValue) => {
    selectedFunds.forEach((item) => {
      if (item.key == tagValue) {
        item.visible = false;
      }
    });
  };

  const selectResidentName = (value) => {
    const me = proxy;

    const resident = residentStore.state.items.find((item) => item.id == value);
    if (resident) {
      me.model.apartmentId = resident.apartmentId;
      const apartment = apartmentStore.state.items.find(
        (item) => item.id == value
      );
      if (apartment) {
        me.model.address = apartment.position;
      }
    }
  };

  // Mảng lưu ẩn hiện và giá trị của các quỹ người dùng chọn
  const selectedFunds = reactive([]);

  const getRelatedData = (store) => {
    const items = store?.state?.items ?? [];
    if (items.length == 0 && typeof store.dispatch == "function") {
      store.dispatch(_enum.Store.Mutations.GetAll);
    }
  };

  /**
   * Xử lý trước khi gửi dữ liệu
   */
  const beforeSubmit = () => {
    const me = proxy;

    selectedFunds.forEach((fund) => {
      me.model[fund.field] = fund.paidAmount ?? 0;
    });
  };

  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 2023 + 1 },
    (_, index) => ({
      value: 2023 + index,
    })
  );

  onMounted(() => {
    const me = proxy;
    /**
     * Map lại các trường dữ liệu cho mảng các dòng quỹ
     * Cập nhật ẩn hết các dòng quỹ đi
     */
    options.forEach((item) => {
      selectedFunds.push({
        key: item.value,
        fundName: item.label,
        field: item.field,
        visible: false,
      });
    });

    // Nếu mode là mode sửa => Hiển thị các quỹ đã đóng góp
    let amount = 0;
    if (me.viewing) {
      selectedFunds.forEach((item, index) => {
        // Cập nhật hiển thị các quỹ đã ủng hộ
        amount = me.model[item.field];
        if (amount > 0) {
          item.visible = true;
          item.paidAmount = amount;
          // Cập nhật hiển thị dữ liệu trong combobox
          fundTypeKeys.value.push(index + 1);
        }
      });
    }

    // Lấy dữ liệu căn hộ nếu trong store chưa có dữ liệu
    getRelatedData(apartmentStore);

    // Lấy dữ liệu cư dân nếu trong store chưa có dữ liệu
    getRelatedData(residentStore);
  });

  return {
    title,
    options,
    fundTypeKeys,
    onVisibleChange,
    selectedFunds,
    onClear,
    onRemoveTag,
    apartmentItems,
    residentItems,
    selectResidentName,
    beforeSubmit,
    store,
    yearOptions,
    defaultModel,
  };
};
