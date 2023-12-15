<template>
  <t-dynamic-popup
    :title="title"
    :width="500"
    name="PaymentDetail"
    class="payment-detail"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <!-- Chủ hộ -->
      <div class="flex space-between mb-2">
        <div class="flex-column">
          <label> Mã chủ hộ </label>
          <el-input
            v-model="model.residentCode"
            class="input-info"
            :disabled="true"
          />
        </div>
        <div class="flex-column">
          <label> Tên chủ căn hộ </label>
          <el-input
            v-model="model.residentName"
            class="input-info"
            :disabled="true"
          />
        </div>
      </div>
      <!-- Thông tin -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex">
          <label>Số tiền</label>
          <el-input-number
            v-model="model.price"
            placeholder="0"
            :min="0"
            :style="{ width: '220px' }"
            :controls="false"
            :disabled="viewing"
          />
        </div>
        <div class="flex-column">
          <label> Ngày thanh toán </label>
          <el-date-picker
            v-model="model.date"
            type="date"
            format="DD/MM/YYYY"
            value-format="DD/MM/YYYY"
          />
        </div>
      </div>
      <div class="flex-column">
        <span
          :style="{ textAlign: 'left', fontWeight: 600, fontSize: '16px' }"
          class="mb-1"
          >Các lần thanh toán trước</span
        >
        <t-grid-viewer
          :table-data="tableData"
          :props-data="propsData"
          :max-height="tableMaxHeight"
          :is-show-feature-col="false"
          :featureColWidth="270"
        >
        </t-grid-viewer>
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Cancel</el-button>
        <el-button
          v-if="!viewing"
          type="primary"
          @click="commandClick(_enum.Mode.Add)"
          >Lưu</el-button
        >
        <el-button
          v-else
          type="primary"
          @click="commandClick(_enum.Mode.Update)"
          >Sửa</el-button
        >
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useVehicleDetail } from "./paymentDetail";
// base
import BaseDetail from "@/views/base/baseDetail.js";
export default {
  extends: BaseDetail,
  name: "VehicleDetail",
  setup() {
    const vehicleDetail = useVehicleDetail();
    return vehicleDetail;
  },
};
</script>

<style lang="scss">
.payment-detail {
  @import "./FeesDetail.scss";
}
</style>