import { getCurrentInstance, onMounted } from "vue";
import Chart from "chart.js/auto";

export const useRevenue = () => {
  const { proxy } = getCurrentInstance();

  const chartType = {
    bar: "bar",
    pie: "pie",
  };

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const renderChart = () => {
    const chartCanvas = proxy.$refs.chartCanvas;
    const ctx = chartCanvas.getContext("2d");

    new Chart(ctx, {
      type: chartType.pie,
      data: data,
    });
  };

  onMounted(() => {
    renderChart();
  });

  return { renderChart };
};
