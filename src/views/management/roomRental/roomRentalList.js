import { ref, reactive } from "vue";

export const useRoomRentalList = () => {
  const detailForm = "RoomRentalDetail";

  const tableData = ref([
    {
      residentCode: "CD001",
      residentName: "John Smith",
      gender: "Nam",
      bod: "20/11/2000",
      job: "Tài xế",
    },
    {
      residentCode: "CD005",
      residentName: "The Will",
      gender: "Nữ",
      bod: "20/11/2001",
      job: "Sinh viên",
    },
  ]);

  const propsData = reactive([
    {
      prop: "residentCode",
      label: "Mã cư dân",
      sortable: true,
      width: 200,
    },
    {
      prop: "residentName",
      label: "Họ và tên",
      sortable: true,
    },
    {
      prop: "gender",
      label: "Giới tính",
      width: 100,
    },
    {
      prop: "bod",
      label: "Ngày sinh",
      width: 200,
      align: "center",
    },
    {
      prop: "job",
      label: "Nghề nghiệp",
      width: 300,
    },
  ]);

  return { detailForm, propsData, tableData };
};
