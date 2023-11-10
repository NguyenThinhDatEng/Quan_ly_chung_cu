import { ref } from "vue";

export const useContributionFeesList = () => {
  const item = {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    age: 22,
  };
  const tableData = ref(Array.from({ length: 20 }).fill(item));

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

  return { tableData, propsData };
};
