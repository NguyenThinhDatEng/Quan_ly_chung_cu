import { computed, getCurrentInstance, ref, onMounted, reactive } from "vue";
// common function
import commonFunction from "@/commons/commonFunction";
// store
import serviceFeeStore from "@/stores/views/serviceFeeStore";
import feeStore from "@/stores/views/feeStore";
// api
import serviceFeeApi from "../../../apis/managementAPI/FeeAPI/serviceFee";
// Enum
import _enum from "@/commons/enum";
// components
import { ElMessage } from "element-plus";

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
        const difference =
          service.newCount - service.oldCount > 0
            ? service.newCount - service.oldCount
            : 0;
        amount += difference * service.pricePerUnit ?? 0;
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

  const updateFeeInfo = async () => {
    const me = proxy;

    let payload = serviceList.value.filter(
      (x) =>
        x.measuringUnit == _enum.ServiceUnit.Number ||
        x.measuringUnit == _enum.ServiceUnit.CubicMeter
    );
    payload.forEach((x) => {
      const difference =
        x.newCount - x.oldCount > 0 ? x.newCount - x.oldCount : 0;
      x.totalFee = difference * x.pricePerUnit ?? 0;
    });
    try {
      const res = await serviceFeeApi.putAsync(payload);
      if (
        res?.status == _enum.APIStatus.Ok &&
        res?.data?.code == _enum.APICode.Success
      ) {
        // show toast
        ElMessage({
          message: "Cập nhật thành công",
          type: "success",
        });
        // hide form
        me.hide();
      } else {
        if (res?.data?.code == _enum.APICode.Fail) {
          ElMessage.error(res.data.message);
        } else {
          ElMessage.error("Có lỗi xảy ra!");
        }
      }
    } catch (error) {
      console.log(error);
      ElMessage.error("Có lỗi xảy ra!");
    }
  };

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
    updateFeeInfo,
  };
};
