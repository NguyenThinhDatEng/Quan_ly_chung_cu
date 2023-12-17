import { ref, onMounted, reactive } from "vue";
// i18n
import i18nFundType from "@/i18n/enum/i18nFundType";
// store
import contributionStore from "@/stores/views/contributionStore.js";

export const useContributionFeesList = () => {
  const detailForm = "ContributionFeesDetail";

  const store = contributionStore;

  const propsData = reactive([
    {
      prop: "fullName",
      label: "Họ và tên",
      sortable: true,
      minWidth: 150,
    },
    {
      prop: "address",
      label: "Địa chỉ",
      minWidth: 150,
    },
  ]);

  const year = ref(new Date().getFullYear());

  const options = Array.from({ length: 20 }, (_, index) => ({
    value: year.value + index,
  }));

  onMounted(() => {
    for (const [key, value] of Object.entries(i18nFundType)) {
      // Viết thường chữ cái đầu tiên của key
      const prop = key.charAt(0).toLocaleLowerCase() + key.slice(1);
      let colConfig = { prop, label: value, align: "right" };
      let width = 160;

      if (value == i18nFundType.Charity) {
        width = 180;
      } else if (value == i18nFundType.ResidentialGroup) {
        width = 150;
      }

      propsData.push({ ...colConfig, width });
    }
  });

  return { propsData, detailForm, year, options, store };
};
