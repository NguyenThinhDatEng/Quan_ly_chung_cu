import { reactive } from "vue";
// store
import residentStore from "@/stores/views/residentStore.js";
// enum
import _enum from "@/commons/enum";

export const useResidentsList = () => {
  const detailForm = "ResidentsDetail";

  const store = residentStore;

  const propsData = reactive([
    {
      prop: "residentCode",
      label: "Mã cư dân",
      sortable: true,
      width: 120,
    },
    {
      prop: "name",
      label: "Họ và tên",
      sortable: true,
      minWidth: 150,
    },
    {
      prop: "phoneNumber",
      label: "Số diện thoại",
      width: 150,
    },
    {
      prop: "cccd",
      label: "Số CMD/CCCD",
      width: 180,
    },
    {
      prop: "gender",
      label: "Giới tính",
      width: 100,
      enum: "Gender",
      columnType: _enum.Table.ColumnType.enum,
    },
    {
      prop: "birthDate",
      label: "Ngày sinh",
      width: 150,
      align: "center",
      columnType: _enum.Table.ColumnType.date,
    },
    {
      prop: "career",
      label: "Nghề nghiệp",
      width: 180,
    },
  ]);

  return { detailForm, propsData, store };
};
