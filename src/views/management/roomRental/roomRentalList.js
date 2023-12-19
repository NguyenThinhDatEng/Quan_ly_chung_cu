import { reactive } from "vue";
// store
import householdStore from "@/stores/views/householdStore.js";

export const useRoomRentalList = () => {
  const detailForm = "RoomRentalDetail";

  const store = householdStore;

  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
      minWidth: 100,
    },
    {
      prop: "position",
      label: "Vị trí",
      minWidth: 120,
    },
    {
      prop: "ownerCode",
      label: "Mã chủ hộ",
      sortable: true,
      minWidth: 100,
    },
    {
      prop: "ownerName",
      label: "Họ và tên chủ hộ",
      minWidth: 150,
    },
    {
      prop: "memberCount",
      label: "Số thành viên",
      width: 120,
      align: "right",
    },
    {
      prop: "vehicleCount",
      label: "Số phương tiện",
      align: "right",
      width: 130,
    },
  ]);

  return { detailForm, propsData, store };
};
