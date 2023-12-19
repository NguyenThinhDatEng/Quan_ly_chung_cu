import { reactive } from "vue";
// store
import residentStore from "@/stores/views/residentStore.js";
// enum
import _enum from "@/commons/enum";
// i18n
import i18nTag from "@/i18n/enum/i18nTag";

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
      prop: "isOwner",
      label: "Chủ hộ",
      width: 90,
      align: "center",
      columnType: _enum.Table.ColumnType.boolean,
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
    {
      prop: "status",
      label: "Tình trạng",
      width: 120,
      enum: "ResidentStatus",
      columnType: _enum.Table.ColumnType.enum,
      tags: [i18nTag.Success, i18nTag.Warning],
    },
  ]);

  return { detailForm, propsData, store };
};
