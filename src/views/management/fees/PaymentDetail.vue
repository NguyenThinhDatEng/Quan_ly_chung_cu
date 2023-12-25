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
        <div class="flex-column flex mr-2 flex1">
          <label for="apartmentCode"> Mã căn hộ </label>
          <el-input
            id="apartmentCode"
            v-model="model.apartmentCode"
            :disabled="true"
          />
        </div>
        <div class="flex-column flex1">
          <label for="ownerName"> Chủ hộ </label>
          <el-input id="ownerName" v-model="model.ownerName" :disabled="true" />
        </div>
      </div>
      <!-- Thông tin -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label>Số tiền</label>
          <t-currency-input
            v-model="model.amount"
            placeholder="0₫"
            :options="{
              currency: 'VND',
              locale: 'de-DE',
              valueRange: {
                min: 0,
              },
              hideGroupingSeparatorOnFocus: false,
            }"
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
          :table-data="model.feePaymentList"
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
        <el-button @click="close">Hủy</el-button>
        <el-button
          v-if="!viewing"
          type="primary"
          @click="commandClick(_enum.Mode.Add)"
          >Lưu</el-button
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