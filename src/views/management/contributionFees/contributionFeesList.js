import { ref, onMounted, reactive, computed, getCurrentInstance } from "vue";
// i18n
import i18nFundType from "@/i18n/enum/i18nFundType";
// store
import contributionStore from "@/stores/views/contributionStore.js";
// enum
import _enum from "@/commons/enum";

export const useContributionFeesList = () => {
  const { proxy } = getCurrentInstance();

  const detailForm = "ContributionFeesDetail";

  // store
  const store = contributionStore;
  const searchFields = ref(["apartmentCode", "residentName"]);

  const tableDataCustom = computed(() => {
    return proxy.tableData.filter((item) => {
      if (item.createdTime && new Date(item.createdTime).getFullYear()) {
        return new Date(item.createdTime).getFullYear() == year.value;
      }
      return false;
    });
  });

  const propsData = reactive([
    {
      prop: "residentName",
      label: "Họ và tên",
      sortable: true,
      minWidth: 150,
    },
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      width: 100,
    },
    {
      prop: "position",
      label: "Địa chỉ",
      minWidth: 120,
    },
    {
      prop: "createdTime",
      label: "Ngày đóng góp",
      minWidth: 130,
      align: "center",
      columnType: _enum.Table.ColumnType.date,
    },
  ]);

  const year = ref(new Date().getFullYear());

  const options = Array.from({ length: 20 }, (_, index) => ({
    value: year.value + index,
  }));

  onMounted(() => {
    for (const [key, value] of Object.entries(i18nFundType)) {
      // Viết thường chữ cái đầu tiên của key
      let prop = key.charAt(0).toLocaleLowerCase() + key.slice(1);

      let width = 160;

      switch (value) {
        case i18nFundType.Charity:
          width = 180;
          break;
        case i18nFundType.ResidentialGroup:
          width = 150;
          break;
        case i18nFundType.DGFestival:
          prop =
            prop.charAt(0) + prop.charAt(1).toLocaleLowerCase() + prop.slice(2);
          break;
      }

      propsData.push({
        prop,
        label: value,
        align: "right",
        width,
        sortable: true,
      });
    }
  });

  return {
    propsData,
    detailForm,
    year,
    options,
    store,
    tableDataCustom,
    searchFields,
  };
};
