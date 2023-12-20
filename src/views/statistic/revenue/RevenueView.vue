<template>
  <div class="revenue flex-column">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { useRevenue } from "./revenue";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
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