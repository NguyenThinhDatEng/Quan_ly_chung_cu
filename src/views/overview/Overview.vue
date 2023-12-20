<template>
  <div class="overview-container">
    <div class="overview-info flex-column" v-loading="loading">
      <div class="info">
        Số phòng còn trống:
        <b>{{ noOfApartment.notEmpty }}/{{ noOfApartment.all }}</b>
      </div>
      <div class="info">
        Số lượng dân cư: <b>{{ noOfResidents }}</b>
      </div>
      <div class="info">
        Số lượng phương tiện đã đăng ký: <b>{{ noOfVehicles }}</b>
      </div>
    </div>
    <el-image :src="url" :fit="fit">
      <template #error>
        <img src="@/assets/imgs/apartment.jpg" />
      </template>
    </el-image>
  </div>
</template>

<script>
import { useOverView } from "./overview";

export default {
  name: "TOverview",
  setup() {
    const overView = useOverView();
    return overView;
  },
};
</script>

<style lang="scss">
@import "./Overview.scss";
</style>
