import { computed, ref } from "vue";

export const useContributionFeesList = () => {
  const item = {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    age: 22,
  };
  const tableData = ref(
    Array.from({ length: 20 })
      .fill(item)
      .map((data, i) => ({ ...data, key: i }))
  );

  const propsData = [
    {
      prop: "date",
      label: "Date",
      sortable: true,
      width: 180,
      iconName: "Timer",
    },
    {
      prop: "name",
      label: "Name",
      sortable: true,
      width: 180,
    },
    {
      prop: "age",
      label: "Age",
      sortable: true,
      align: "right",
      width: 100,
    },
    {
      prop: "address",
      label: "Address",
    },
  ];

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
