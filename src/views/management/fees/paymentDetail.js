import { ref, onMounted, computed } from "vue";
// Enum
import Enum from "@/commons/enum";
// store
import paymentStore from "@/stores/views/paymentStore";

export const useVehicleDetail = () => {
  const title = ref("Thông tin thanh toán");

  const store = paymentStore;

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

  const tableDataCustom = computed(() => {
    return paymentStore.state.items;
  });

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

  onMounted(() => {
    if (store.state.items.length == 0) {
      store.dispatch("getAll");
    }
  });

  return {
    title,
    Enum,
    propsData,
    tableDataCustom,
    tableMaxHeight,
    defaultModel,
  };
};
