import { getCurrentInstance, onUpdated, reactive, ref } from "vue";
// store
import residentStore from "@/stores/views/residentStore.js";
// enum
import _enum from "@/commons/enum";
// i18n
import i18nTag from "@/i18n/enum/i18nTag";
import i18nEnum from "@/i18n/enum/index.js";
// resource
import commonFunction from "@/commons/commonFunction";

export const useResidentsList = () => {
  const { proxy } = getCurrentInstance();

  const detailForm = "ResidentsDetail";

  const store = residentStore;

  const searchFields = ref([store.state.codeField, store.state.nameField]);

  const filterTag = (value, row, column) => {
    return row[column.property] === value;
  };
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
      filters: [
        {
          text: i18nEnum.Gender.Male,
          value: _enum.Gender.Male,
        },
        {
          text: i18nEnum.Gender.Female,
          value: _enum.Gender.Female,
        },
        {
          text: i18nEnum.Gender.Other,
          value: _enum.Gender.Other,
        },
      ],
      filterTag: filterTag,
      filterMultiple: false,
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
    },
    {
      prop: "status",
      label: "Tình trạng",
      minWidth: 80,
      enum: "ResidentStatus",
      align: "center",
      columnType: _enum.Table.ColumnType.enum,
      tags: [i18nTag.Success, i18nTag.Warning],
      filters: [
        {
          text: i18nEnum.ResidentStatus.Active,
          value: _enum.ResidentStatus.Active,
        },
        {
          text: i18nEnum.ResidentStatus.InActive,
          value: _enum.ResidentStatus.InActive,
        },
      ],
      filterTag: filterTag,
      filterMultiple: false,
    },
  ]);

  onUpdated(() => {
    commonFunction.updateDom();
  });

  return { detailForm, propsData, store, searchFields };
};
