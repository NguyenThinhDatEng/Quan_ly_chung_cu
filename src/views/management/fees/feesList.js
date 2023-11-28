import { ref, onMounted, reactive } from "vue";

export const useFeesList = () => {
  const tableData = ref([
    {
      apartmentCode: "M001",
      residentCode: "P002",
      residentName: "Bruno Mars",
      description: "Some thing...",
      fromDate: "05-10-2023",
      toDate: "05-11-2023",
      amount: 1234560,
      status: "Quá hạn",
    },
    {
      apartmentCode: "M002",
      residentCode: "P003",
      residentName: "MAGIC",
      description: "MAGIC! - Rude (Official Video)",
      fromDate: "02-11-2023",
      toDate: "02-12-2023",
      amount: 5432100,
      status: "Còn hạn",
    },
  ]);

  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
      align: "center",
      width: 115,
    },
    {
      prop: "residentCode",
      label: "Mã chủ căn hộ",
      sortable: true,
      align: "center",
      width: 140,
    },
    {
      prop: "residentName",
      label: "Tên chủ căn hộ",
      sortable: true,
      width: 150,
    },
    {
      prop: "description",
      label: "Ghi chú",
    },
    {
      prop: "fromDate",
      label: "Từ ngày",
      width: 150,
      align: "center",
    },
    {
      prop: "toDate",
      label: "Đến ngày",
      width: 150,
      align: "center",
    },
    {
      prop: "amount",
      label: "Số tiền",
      width: 120,
      align: "right",
    },
    {
      prop: "status",
      label: "Trạng thái",
      width: 150,
      align: "center",
    },
  ]);

  onMounted(() => {});

  const detailForm = "FeesDetail";

  return { tableData, propsData, detailForm };
};
