<template>
  <div class="statistic-container flex-column" v-loading="loading">
    <div v-if="store?.state?.items?.length > 0" class="revenue flex-column">
      <canvas ref="chartCanvas" class="pieChart mb-2"></canvas>
      <span :style="{ fontWeight: 700 }">Tình trạng thu phí tháng</span>
    </div>
    <div v-else>
      <el-empty
        description="Sinh thu phí tại mục Quản lý thu phí để có dữ liệu thống kê"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import Chart from "chart.js/auto";
// store
import feeStore from "@/stores/views/feeStore";
// enum
import _enum from "@/commons/enum";

export default {
  name: "VehicleStatistic",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();

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
    const store = feeStore;
    onMounted(async () => {
      try {
        if (
          typeof store.dispatch == "function" &&
          store.state?.items?.length == 0
        ) {
          await store.dispatch("getAll");
        }
      } catch (error) {
        console.log(error);
      }
      loading.value = false;

      // Tình trạng thu phí tháng
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
      renderChart("chartCanvas", data, chartType.pie);
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