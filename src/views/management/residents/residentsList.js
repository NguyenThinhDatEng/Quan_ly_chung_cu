import { ref, reactive } from "vue";

export const useResidentsList = () => {
  const detailForm = "ResidentsDetail";

  const tableData = ref([
    {
      residentCode: "CD001",
      residentName: "John Smith",
      gender: 1,
      bod: "20/11/2000",
      job: "Tài xế",
      phoneNumber: "0963689222",
      identificationNumber: "0123456789",
    },
    {
      residentCode: "CD005",
      residentName: "The Will",
      gender: 2,
      bod: "20/11/2001",
      job: "Sinh viên",
    },
  ]);

  const propsData = reactive([
    {
      prop: "residentCode",
      label: "Mã cư dân",
      sortable: true,
      width: 120,
    },
    {
      prop: "residentName",
      label: "Họ và tên",
      sortable: true,
    },
    {
      prop: "phoneNumber",
      label: "Số diện thoại",
    },
    {
      prop: "identificationNumber",
      label: "Số CMD/CCCD",
    },
    {
      prop: "gender",
      label: "Giới tính",
      width: 100,
      enum: "Gender",
      type: 5,
    },
    {
      prop: "bod",
      label: "Ngày sinh",
      width: 150,
      align: "center",
    },
    {
      prop: "job",
      label: "Nghề nghiệp",
      width: 200,
    },
  ]);

  return { detailForm, propsData, tableData };
};
