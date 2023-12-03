import { ref, onMounted, reactive } from "vue";

export const usVehicleList = () => {
  const tableData = ref([
    {
      vehicleCode: "V0001",
      vehicleName: "Ô tô",
      price: 1200000,
    },
    {
      vehicleCode: "V0002",
      vehicleName: "Xe máy",
      price: 70000,
    },
  ]);

  const propsData = reactive([
    {
      prop: "vehicleCode",
      label: "Mã phương tiện",
      sortable: true,
      width: 200,
      align: "center",
    },
    {
      prop: "vehicleName",
      label: "Loại phương tiện",
    },
    {
      prop: "price",
      label: "Mức giá gửi/Tháng",
      width: 300,
      align: "right",
    },
  ]);

  onMounted(() => {});

  const detailForm = "VehicleDetail";

  return { tableData, propsData, detailForm };
};
