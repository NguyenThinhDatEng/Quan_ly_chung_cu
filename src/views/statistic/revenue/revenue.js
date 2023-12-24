import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import Chart from "chart.js/auto";
// store
import feeStore from "@/stores/views/feeStore";
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

  const renderChart = () => {
    const chartCanvas = proxy.$refs.chartCanvas;
    const ctx = chartCanvas.getContext("2d");

    new Chart(ctx, {
      type: chartType.pie,
      data: data,
    });
  };

  const loading = ref(false);

  onMounted(async () => {
    const me = proxy;
    if (typeof feeStore?.dispatch == "function") {
      me.loading = true;
      await feeStore.dispatch("getAll");
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
      renderChart();
      me.loading = false;
    }
  });

  return { renderChart, data, loading };
};
