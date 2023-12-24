import { onMounted, reactive, ref } from "vue";
// store
import vehicleFeeStore from "@/stores/views/vehicleFeeStore";

export const usVehicleList = () => {
  const detailForm = "VehicleFeeDetail";

  const store = vehicleFeeStore;

  const searchFields = ref([store.state.codeField, store.state.nameField]);

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
      label: "Mức giá gửi xe / tháng",
      width: 300,
      align: "right",
    },
  ]);

  onMounted(() => {});

  return { propsData, detailForm, store, searchFields };
};
