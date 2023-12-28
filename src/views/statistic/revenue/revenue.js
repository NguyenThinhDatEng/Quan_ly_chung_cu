import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import Chart from "chart.js/auto";
// store
import feeStore from "@/stores/views/feeStore";
import vehicleStore from "@/stores/views/vehicleStore";
// enum
import _enum from "@/commons/enum";

export const useRevenue = () => {
  const { proxy } = getCurrentInstance();

  const chartType = {
    bar: "bar",
    pie: "pie",
  };

  const data = reactive({
    labels: ["Hết hạn", "Còn hạn", "Hoàn thành"],
    datasets: [
      {
        label: "Số hộ",
        data: [],
        backgroundColor: ["#f56c6c", "#e6a23c", "#67c23a"],
        hoverOffset: 4,
      },
    ],
  });

  const vehicleData = reactive({
    labels: [],
    datasets: [
      {
        label: "Số lượng",
        data: [],
        hoverOffset: 4,
      },
    ],
  });

  const renderChart = (refName, data) => {
    const chartCanvas = proxy.$refs[refName];
    const ctx = chartCanvas.getContext("2d");

    new Chart(ctx, {
      type: chartType.pie,
      data: data,
    });
  };

  const loading = reactive({
    fee: false,
    vehicle: false,
  });

  onMounted(async () => {
    const me = proxy;
    loading.fee = true;
    loading.vehicle = true;

    if (
      typeof feeStore.dispatch == "function" &&
      feeStore.state?.items?.length == 0
    ) {
      await feeStore.dispatch("getAll");
    }

    loading.fee = false;
    const noOfExpired = feeStore.state.items.filter(
      (x) => x.status == _enum.PaymentStatus.Expired
    ).length;

    const noOfOnGoing = feeStore.state.items.filter(
      (x) => x.status == _enum.PaymentStatus.OnGoing
    ).length;

    const noOfPaid = feeStore.state.items.filter(
      (x) => x.status == _enum.PaymentStatus.Paid
    ).length;

    data.datasets[0].data = [noOfExpired, noOfOnGoing, noOfPaid];
    renderChart("chartCanvas", data);

    if (
      typeof vehicleStore?.dispatch == "function" &&
      vehicleStore.state?.items?.length == 0
    ) {
      await vehicleStore.dispatch("getAll");
    }
    vehicleData.labels = vehicleStore.state.items
      .map((x) => x.vehicleType)
      .filter((x, index, self) => self.indexOf(x) == index);
    vehicleData.labels.forEach((x) => {
      let noOfVehicle = vehicleStore.state.items.filter(
        (y) => y.vehicleType == x
      ).length;
      vehicleData.datasets[0].data.push(noOfVehicle);
    });
    loading.vehicle = false;
    renderChart("vehicleChart", vehicleData);
  });

  return { renderChart, data, loading, vehicleData };
};
