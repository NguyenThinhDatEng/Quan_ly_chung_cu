import { ref } from "vue";
// Enum
import Enum from "@/commons/enum";
export const useVehicleDetail = () => {
  const title = ref("Thông tin thanh toán");

  const propsData = [
    {
      prop: "date",
      label: "Ngày thanh toán",
    },
    {
      prop: "amount",
      label: "Số tiền",
    },
  ];

  const tableData = ref([
    {
      date: "20/11/2000",
      amount: 155000,
    },
    {
      date: "20/11/2000",
      amount: 155000,
    },
  ]);

  const tableMaxHeight = 160;

  const defaultModel = {
    date: formatDate(new Date()),
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  return {
    title,
    Enum,
    propsData,
    tableData,
    tableMaxHeight,
    defaultModel,
  };
};
