import {
  computed,
  onMounted,
  reactive,
  ref,
  onUpdated,
  getCurrentInstance,
} from "vue";
// store
import apartmentStore from "@/stores/views/apartmentStore.js";
// Enum
import _enum from "@/commons/enum";
// i18n
import i18nTag from "@/i18n/enum/i18nTag";
import i18nEnum from "@/i18n/enum/index.js";
// import resources
import commonFunction from "@/commons/commonFunction";

export const usApartmentList = () => {
  const { proxy } = getCurrentInstance();
  const store = apartmentStore;
  const roomCountList = computed(() => {
    return proxy.tableSearchData
      .map((item) => item.roomCount)
      .filter((x, index, self) => self.indexOf(x) == index)
      .sort();
  });

  const searchFields = ref([store.state.codeField, "position"]);

  const detailForm = "ApartmentDetail";

  const filterTag = (value, row, column) => {
    return row[column.property] === value;
  };
  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
    },
    {
      prop: "position",
      label: "Vị trí",
      sortable: true,
    },
    {
      prop: "area",
      label: "Diện tích",
      sortable: true,
      align: "right",
    },
    {
      prop: "price",
      label: "Giá",
      align: "right",
      sortable: true,
    },
    {
      prop: "roomCount",
      label: "Số phòng ngủ",
      align: "right",
      filters: [
        {
          text: "1",
          value: 1,
        },
      ],
      filterTag: filterTag,
    },
    {
      prop: "status",
      label: "Trạng thái",
      align: "center",
      enum: "ApartmentStatus",
      width: 150,
      columnType: _enum.Table.ColumnType.enum,
      tags: [i18nTag.Success, i18nTag.Warning],
      filters: [
        {
          text: i18nEnum.ApartmentStatus.NotEmpty,
          value: _enum.ApartmentStatus.NotEmpty,
        },
        {
          text: i18nEnum.ApartmentStatus.IsEmpty,
          value: _enum.ApartmentStatus.IsEmpty,
        },
      ],
      filterTag: filterTag,
      filterMultiple: false,
    },
  ]);

  onMounted(() => {});

  onUpdated(() => {
    if (roomCountList.value.length > 0) {
      propsData[4].filters = roomCountList.value.map((x) => ({
        text: x,
        value: x,
      }));
    }

    commonFunction.updateDom();
  });

  return { propsData, detailForm, store, searchFields, roomCountList };
};
