import { ref, onMounted, reactive } from "vue";
// Enum
import FundType from "@/commons/enum/FundType";
import i18nFundType from "@/i18n/enum/i18nFundType";

export const useContributionFeesDetail = () => {
  const title = "Khoản thu phí đóng góp";

  const options = [
    {
      value: FundType.ForThePoor,
      label: i18nFundType.ForThePoor,
    },
    {
      value: FundType.ForVNSeasAndIslands,
      label: i18nFundType.ForVNSeasAndIslands,
    },
    {
      value: FundType.DGFestival,
      label: i18nFundType.DGFestival,
    },
    {
      value: FundType.ResidentialGroup,
      label: i18nFundType.ResidentialGroup,
    },
    {
      value: FundType.ForChildren,
      label: i18nFundType.ForChildren,
    },
    {
      value: FundType.Charity,
      label: i18nFundType.Charity,
    },
    {
      value: FundType.Gratitude,
      label: i18nFundType.Gratitude,
    },
    {
      value: FundType.StudyPromotion,
      label: i18nFundType.StudyPromotion,
    },
    {
      value: FundType.ForTheElderly,
      label: i18nFundType.ForTheElderly,
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

  const selectedFunds = reactive([]);
  onMounted(() => {
    options.forEach((item) => {
      selectedFunds.push({
        key: item.value,
        fundName: item.label,
        visible: false,
      });
    });
  });

  return {
    title,
    options,
    fundTypeKeys,
    onVisibleChange,
    selectedFunds,
    onClear,
    onRemoveTag,
  };
};
