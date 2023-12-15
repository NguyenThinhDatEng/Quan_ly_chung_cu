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
    },
    {
      prop: "area",
      label: "Diện tích",
      sortable: true,
      width: 200,
      align: "center",
    },
    {
      prop: "price",
      label: "Giá",
      width: 200,
      align: "right",
    },
    {
      prop: "status",
      label: "Trạng thái",
      width: 200,
      align: "center",
    },
    {
      prop: "noOfRooms",
      label: "Số phòng",
      width: 200,
      align: "center",
    },
  ]);

  onMounted(() => {});

  return { propsData, detailForm, store };
};
