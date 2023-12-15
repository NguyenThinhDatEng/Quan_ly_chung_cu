import { onMounted, reactive } from "vue";
// store
import apartmentStore from "@/stores/views/apartmentStore.js";

export const usApartmentList = () => {
  const store = apartmentStore;

  const detailForm = "ApartmentDetail";

  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
      width: 150,
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
      width: 120,
      align: "right",
    },
    {
      prop: "price",
      label: "Giá",
      width: 150,
      align: "right",
    },
    {
      prop: "roomCount",
      label: "Số phòng",
      width: 120,
      align: "right",
    },
  ]);

  onMounted(() => {});

  return { propsData, detailForm, store };
};
