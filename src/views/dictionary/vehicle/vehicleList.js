import { onMounted, reactive } from "vue";
// store
import vehicleFeeStore from "@/stores/views/vehicleFeeStore";

export const usVehicleList = () => {
  const detailForm = "VehicleFeeDetail";

  const store = vehicleFeeStore;

  const propsData = reactive([
    {
      prop: "vehicleTypeCode",
      label: "Mã phương tiện",
      sortable: true,
      width: 200,
      align: "center",
    },
    {
      prop: "name",
      label: "Loại phương tiện",
      minWidth: 150,
    },
    {
      prop: "parkingFee",
      label: "Mức giá gửi/Tháng",
      width: 300,
      align: "right",
    },
  ]);

  onMounted(() => {});

  return { propsData, detailForm, store };
};
