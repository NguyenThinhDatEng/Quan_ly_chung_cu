import { computed, ref, onMounted, reactive } from "vue";
// i18n
import i18nFundType from "@/i18n/enum/i18nFundType";

export const useContributionFeesList = () => {
  const item = {
    fullName: "Nguyễn Văn A",
    address: "01/01",
    ForThePoor: 1000,
    ForVNSeasAndIslands: 20000,
    DGFestival: 500000,
    ResidentialGroup: 1000000,
    ForChildren: 512333,
    Charity: 1111111,
    Gratitude: 100000000,
    StudyPromotion: 1200000,
    ForTheElderly: 56666666,
  };
  const tableData = ref(
    Array.from({ length: 20 })
      .fill(item)
      .map((data, i) => ({ ...data, key: i }))
  );

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

  onMounted(() => {
    for (const [key, value] of Object.entries(i18nFundType)) {
      propsData.push({ prop: key, label: value, width: 170, align: "right" });
    }
  });

  /**
   * 60: header height
   * 40: padding top and bottom
   * 20: padding bottom of toolbar
   * 32: height of toolbar
   */
  const tableMaxHeight = computed(() => window.innerHeight - 60 - 40 - 20 - 32);

  const detailForm = "ContributionFeesDetail";

  return { tableData, propsData, tableMaxHeight, detailForm };
};
