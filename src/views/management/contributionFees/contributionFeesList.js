import { ref, onMounted, reactive } from "vue";
// i18n
import i18nFundType from "@/i18n/enum/i18nFundType";

export const useContributionFeesList = () => {
  const detailForm = "ContributionFeesDetail";

  const propsData = reactive([
    {
      prop: "fullName",
      label: "Họ và tên",
      sortable: true,
      width: 200,
    },
    {
      prop: "address",
      label: "Địa chỉ",
      width: 100,
    },
  ]);

  const year = ref(new Date().getFullYear());

  const options = Array.from({ length: 20 }, (_, index) => ({
    value: year.value + index,
  }));

  onMounted(() => {
    for (const [key, value] of Object.entries(i18nFundType)) {
      propsData.push({ prop: key, label: value, width: 170, align: "right" });
    }
  });

  return { propsData, detailForm, year, options };
};
