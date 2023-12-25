import { ref, onMounted, getCurrentInstance } from "vue";
// Enum
import Enum from "@/commons/enum";
// store
import paymentStore from "@/stores/views/paymentStore";
// enum
import _enum from "@/commons/enum";

export const useVehicleDetail = () => {
  const { proxy } = getCurrentInstance();

  const title = ref("Thông tin thanh toán");

  const store = paymentStore;

  const propsData = [
    {
      prop: "createdTime",
      label: "Ngày thanh toán",
      align: "center",
      columnType: _enum.Table.ColumnType.date,
    },
    {
      prop: "amount",
      label: "Số tiền",
    },
  ];

  const tableMaxHeight = 160;

  const defaultModel = {
    createdTime: new Date(),
  };

  onMounted(() => {
    const me = proxy;

    if (store.state.items.length == 0) {
      store.dispatch("getAll");
    }

    // update model
    const detailData = me._formParam.detailData;
    if (detailData) {
      me.model = { ...me.model, ...detailData };
    }
  });

  return {
    title,
    Enum,
    propsData,
    tableMaxHeight,
    defaultModel,
    store,
  };
};
