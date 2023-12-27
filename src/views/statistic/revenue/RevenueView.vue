<template>
  <div class="statistic-container flex">
    <div class="revenue flex-column" v-loading="loading.fee">
      <canvas ref="chartCanvas"></canvas>
      <span
        v-show="data?.datasets[0].data.length > 0"
        class="mt-2"
        :style="{ fontWeight: 700 }"
        >Tình trạng thu phí tháng</span
      >
    </div>
    <div class="revenue flex-column" v-loading="loading.vehicle">
      <canvas ref="vehicleChart"></canvas>
      <span
        v-show="vehicleData?.datasets[0].data.length > 0"
        class="mt-2"
        :style="{ fontWeight: 700 }"
        >Số lượng xe đã đăng ký</span
      >
    </div>
  </div>
</template>

<script>
import { useRevenue } from "./revenue";

export default {
  name: "RevenueList",
  components: {},
  setup() {
    const revenue = useRevenue();
    return revenue;
  },
};
</script>

<style lang="scss">
.statistic-container {
  justify-content: space-evenly;
  align-items: center;
  height: 100%;

  .revenue {
    align-items: center;
    @import "./Revenue.scss";
  }
}
</style>