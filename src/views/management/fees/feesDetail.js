import { computed, getCurrentInstance, ref, onMounted, reactive } from "vue";
// common function
import commonFunction from "@/commons/commonFunction";
// store
import serviceFeeStore from "@/stores/views/serviceFeeStore";
import feeStore from "@/stores/views/feeStore";
// Enum
import _enum from "@/commons/enum";

export const useFeesDetail = () => {
  const { proxy } = getCurrentInstance();

  const store = feeStore;

  const title = ref("Quản lý thu phí");
  const isShowFeesDetail = reactive({
    servicesFee: false,
  });

  const serviceList = computed(() => proxy.model.serviceFeeList ?? []);

  // Phí chung cư
  const apartmentFee = computed(() => {
    const amount =
      apartmentServiceFee.value.amount + apartmentManagementFee.value.amount;
    return {
      amount,
      display: commonFunction.formatMoney(amount),
    };
  });
  // Phí dịch vụ
  const servicesFee = computed(() => {
    let amount = 0;
    serviceList.value.forEach((service) => {
      if (
        service.measuringUnit == _enum.ServiceUnit.Number ||
        service.measuringUnit == _enum.ServiceUnit.CubicMeter
      ) {
        amount +=
          (service.newCount - service.oldCount) * service.pricePerUnit || 0;
      } else {
        amount += service.totalFee;
      }
    });
    return {
      amount,
      display: commonFunction.formatMoney(amount),
    };
  });
  // Phí gửi xe
  const vehicleFee = computed(() => {
    let amount = 0;
    if (proxy.model.vehicleList?.length > 0) {
      amount = proxy.model.vehicleList.reduce(
        (acc, item) => acc + item.parkingFee,
        0
      );
    }
    return {
      amount,
      display: commonFunction.formatMoney(amount),
    };
  });

  const totalAmount = computed(() => {
    const amount = vehicleFee.value.amount + servicesFee.value.amount;
    return {
      amount,
      display: commonFunction.formatMoney(amount),
    };
  });

  const toggleFeesDetail = (key) => {
    isShowFeesDetail[key] = !isShowFeesDetail[key];
  };

  const tableMaxHeight = 40 * 3 + 6;

  const vehiclePropsData = [
    {
      prop: "name",
      label: "Kiểu xe",
      minWidth: 120,
    },
    {
      prop: "vehicleType",
      label: "Loại xe",
      minWidth: 120,
    },
    {
      prop: "plate",
      label: "Biển số",
      minWidth: 150,
    },
    {
      prop: "ownerCode",
      label: "Mã chủ sở hữu",
      width: 130,
    },
    {
      prop: "ownerName",
      label: "Chủ sở hữu",
      minWidth: 150,
    },
  ];

  onMounted(() => {
    // Lấy dữ liệu danh sách
    if (serviceFeeStore.state.items.length == 0) {
      serviceFeeStore.dispatch("getAll");
    }
  });

  return {
    title,
    apartmentFee,
    servicesFee,
    vehicleFee,
    totalAmount,
    serviceList,
    isShowFeesDetail,
    toggleFeesDetail,
    tableMaxHeight,
    vehiclePropsData,
    store,
  };
};
