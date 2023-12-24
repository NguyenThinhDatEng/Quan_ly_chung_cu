<template>
  <div class="revenue flex-column" v-loading="loading">
    <canvas ref="chartCanvas"></canvas>
    <span
      v-show="data.datasets[0].data.length > 0"
      class="mt-2"
      :style="{ fontWeight: 700 }"
      >Tình trạng thu phí tháng</span
    >
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
.revenue {
  max-height: 50%;
  align-items: center;
  @import "./Revenue.scss";
}
</style>