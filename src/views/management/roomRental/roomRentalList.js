import { ref, reactive } from "vue";

export const useRoomRentalList = () => {
  const detailForm = "RoomRentalDetail";

  const tableData = ref([
    {
      apartmentCode: "A0001",
      address: "01/01",
      residentCode: "T0001",
      residentName: "Nguyễn Bảo Bằng",
      memberNumber: 3,
      vehicleNumber: 3,
    },
  ]);

  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
      width: 150,
    },
    {
      prop: "address",
      label: "Vị trí",
      width: 200,
    },
    {
      prop: "residentCode",
      label: "Mã chủ hộ",
      sortable: true,
      width: 200,
    },
    {
      prop: "residentName",
      label: "Họ và tên chủ hộ",
    },
    {
      prop: "memberNumber",
      label: "Số thành viên GĐ",
      width: 200,
    },
    {
      prop: "vehicleNumber",
      label: "Số phương tiện",
      width: 200,
    },
  ]);

  return { detailForm, propsData, tableData };
};
