<template>
  <div class="statistic-container flex-column" v-loading="loading">
    <div v-if="store?.state?.items?.length > 0">
      <canvas ref="vehicleChart" class="pieChart mb-2"></canvas>
      <span :style="{ fontWeight: 700 }"
        >Số lượng xe đã đăng ký: {{ store.state.items.length }}</span
      >
    </div>
    <div v-else>
      <el-empty
        description="Thêm xe tại mục Quản lý các hộ gia đình để có dữ liệu thống kê"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import Chart from "chart.js/auto";
// store
import vehicleStore from "@/stores/views/vehicleStore";

export default {
  name: "VehicleStatistic",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();

    const data = reactive({
      labels: [],
      datasets: [
        {
          label: "Số lượng",
          data: [],
          hoverOffset: 5,
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

    const chartType = {
      bar: "bar",
      pie: "pie",
      line: "line",
    };
    const loading = ref(true);
    const store = vehicleStore;
    onMounted(async () => {
      if (
        typeof store?.dispatch == "function" &&
        store.state?.items?.length == 0
      ) {
        await store.dispatch("getAll");
      }
      loading.value = false;

      data.labels = store.state.items
        .map((x) => x.vehicleType)
        .filter((x, index, self) => self.indexOf(x) == index);

      data.labels.forEach((x) => {
        let noOfVehicle = store.state.items.filter(
          (y) => y.vehicleType == x
        ).length;
        data.datasets[0].data.push(noOfVehicle);
      });
      renderChart("vehicleChart", data, chartType.pie);
    });

    return { renderChart, store, loading };
  },
};
</script>

<style lang="scss">
.pieChart {
  width: 350px;
  height: 350px;
}
</style>