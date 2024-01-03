<template>
  <div class="statistic-container flex" v-loading="loading">
    <div
      v-for="year in yearOfCharts"
      :key="year"
      class="fee-statistic-by-month"
    >
      <div
        v-show="feeStore?.state?.items?.length > 0"
        class="revenue flex-column"
      >
        <!-- <canvas :ref="'feeStatisticByMonthOf' + year"></canvas> -->
        <canvas :ref="'feeStatisticByMonthOf' + year"></canvas>
        <span class="mt-2" :style="{ fontWeight: 700 }"
          >Thống kê doanh thu qua từng tháng năm {{ year }}</span
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
@import "./Revenue.scss";
</style>