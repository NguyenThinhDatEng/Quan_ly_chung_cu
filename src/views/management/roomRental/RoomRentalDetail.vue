<template>
  <t-dynamic-popup
    :title="title"
    :width="600"
    name="ResidentsDetail"
    class="residents-detail"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content> </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary">Lưu</el-button>
        <!-- <el-button v-else type="primary">Sửa</el-button> -->
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useResidentsDetail } from "./residentsDetail";
import BaseDetail from "@/views/base/baseDetail.js";

export default {
  extends: BaseDetail,
  name: "ResidentsDetail",
  setup() {
    const residentsDetail = useResidentsDetail();
    return residentsDetail;
  },
};
</script>

<style lang="scss">
.residents-detail {
  width: 100%;
  height: 100%;
  position: relative;

  @import "./ResidentsDetail.scss";
}
</style>