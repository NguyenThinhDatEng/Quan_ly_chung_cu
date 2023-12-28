<template>
  <div class="statistic-container flex" v-loading="loading">
    <div
      v-show="feeStore?.state?.items?.length > 0"
      class="revenue flex-column"
    >
      <canvas ref="chartCanvas"></canvas>
      <span class="mt-2" :style="{ fontWeight: 700 }"
        >Tình trạng thu phí tháng</span
      >
    </div>
    <div
      v-show="vehicleStore?.state?.items?.length > 0"
      class="revenue flex-column"
    >
      <canvas ref="vehicleChart"></canvas>
      <span class="mt-2" :style="{ fontWeight: 700 }"
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