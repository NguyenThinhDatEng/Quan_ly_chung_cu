import { computed, getCurrentInstance, ref, onMounted, reactive } from "vue";
// common function
import commonFunction from "@/commons/commonFunction";
// enum
import ServiceUnit from "@/commons/enum/ServiceUnit";

export const useFeesDetail = () => {
  const { proxy } = getCurrentInstance();
  const title = ref("Quản lý thu phí");
  const isShowFeesDetail = reactive({
    apartmentFee: false,
    servicesFee: false,
  });

  const serviceList = reactive([
    {
      serviceCode: "S0001",
      serviceName: "Điện",
      price: 3800,
      unit: ServiceUnit.Number,
    },
    {
      serviceCode: "S0002",
      serviceName: "Nước",
      price: 8509,
      unit: ServiceUnit.CubicMeter,
    },
    {
      serviceCode: "S0003",
      serviceName: "Vệ sinh",
      price: 100000,
      unit: ServiceUnit.OnePersonOneMonth,
    },
  ]);

  // Phí dịch vụ chung cư
  const apartmentServiceFee = computed(() => {
    const area = proxy.model.area || 0;
    return {
      amount: area * 10000,
      display: commonFunction.formatMoney(area * 10000),
    };
  });
  // Phí quản lý chung cư
  const apartmentManagementFee = computed(() => {
    const area = proxy.model.area || 0;
    return {
      amount: area * 7000,
      display: commonFunction.formatMoney(area * 7000),
    };
  });
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
    serviceList.forEach((service) => {
      if (service.unit > 2) {
        amount += (service.newIndex - service.oldIndex) * service.price || 0;
      } else {
        amount += service.price;
      }
    });
    return {
      amount,
      display: commonFunction.formatMoney(amount),
    };
  });
  // Phí gửi xe
  const vehicleFee = computed(() => {
    const amount = 500000;
    return {
      amount,
      display: commonFunction.formatMoney(amount),
    };
  });

  const totalAmount = computed(() => {
    const amount =
      apartmentFee.value.amount +
      servicesFee.value.amount +
      vehicleFee.value.amount;
    return {
      amount,
      display: commonFunction.formatMoney(amount),
    };
  });

  const toggleFeesDetail = (key) => {
    isShowFeesDetail[key] = !isShowFeesDetail[key];
  };

  onMounted(() => {});

  return {
    title,
    apartmentServiceFee,
    apartmentManagementFee,
    apartmentFee,
    servicesFee,
    vehicleFee,
    totalAmount,
    serviceList,
    isShowFeesDetail,
    toggleFeesDetail,
  };
};
