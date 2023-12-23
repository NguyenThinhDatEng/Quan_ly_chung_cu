import { reactive } from "vue";
// store
import serviceFeeStore from "@/stores/views/serviceFeeStore";
// Enum
import _enum from "@/commons/enum";

export const usServiceList = () => {
  const store = serviceFeeStore;

  const detailForm = "ServiceDetail";

  const searchFields = [store.state.codeField, store.state.nameField];

  const propsData = reactive([
    {
      prop: "serviceFeeTypeCode",
      label: "Mã dịch vụ",
      sortable: true,
      width: 200,
      align: "center",
    },
    {
      prop: "name",
      label: "Loại dịch vụ",
      minWidth: 140,
    },
    {
      prop: "pricePerUnit",
      label: "Mức giá",
      width: 150,
      align: "right",
    },
    {
      prop: "measuringUnit",
      label: "Đơn vị",
      width: 150,
      enum: "ServiceUnit",
      columnType: _enum.Table.ColumnType.enum,
    },
  ]);

  return { propsData, detailForm, store, searchFields };
};
