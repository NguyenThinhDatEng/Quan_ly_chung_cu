import { ref, onMounted, reactive } from "vue";

export const usVehicleList = () => {
  const detailForm = "VehicleDetail";

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

  return { propsData, detailForm };
};
