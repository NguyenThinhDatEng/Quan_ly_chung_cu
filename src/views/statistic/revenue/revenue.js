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
    line: "line",
  };

  const feeDataByMonth = reactive({
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  const renderChart = (refName, data, charType) => {
    const chartCanvas = proxy.$refs[refName];
    const ctx = chartCanvas.getContext("2d");

    new Chart(ctx, {
      type: charType,
      data: data,
    });
  };

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    try {
      if (
        typeof feeStore.dispatch == "function" &&
        feeStore.state?.items?.length == 0
      ) {
        await feeStore.dispatch("getAll");
      }
    } catch (error) {
      console.log(error);
    }

    if (feeStore.state.items.length > 0) {
      for (let i = 0; i < 12; i++) {
        const feeSum = feeStore.state.items
          .filter((x) => new Date(x.expiredDate).getMonth() == i)
          .reduce((acc, curr) => {
            return acc + curr.receivedAmount ?? 0;
          }, 0);
        feeDataByMonth.datasets[0].data.push(feeSum);
      }
    }
    renderChart("feeStatisticByMonth", feeDataByMonth, chartType.line);
    loading.value = false;
  });

  return { renderChart, feeStore, loading };
};
