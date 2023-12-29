<template>
  <div class="statistic-container flex-column" v-loading="loading">
    <div class="fee-statistic-by-month">
      <div
        v-show="feeStore?.state?.items?.length > 0"
        class="revenue flex-column"
      >
        <canvas ref="feeStatisticByMonth"></canvas>
        <span class="mt-2" :style="{ fontWeight: 700 }"
          >Thống kê doanh thu qua từng tháng</span
        >
      </div>
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

  .fee-statistic-by-month {
    width: 80%;
  }
}
</style>