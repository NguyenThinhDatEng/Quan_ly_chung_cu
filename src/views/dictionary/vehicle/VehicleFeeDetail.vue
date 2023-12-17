vehicleType<template>
  <t-dynamic-popup
    :title="title"
    :width="500"
    name="VehicleFeeDetail"
    class="vehicle-fee-detail"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1">
          <label> Mã phương tiện </label>
          <el-input
            v-model="model.vehicleTypeCode"
            placeholder="V0001"
            :disabled="viewing || editMode == _enum.Mode.Update"
          />
        </div>
      </div>
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1">
          <label> Loại phương tiện </label>
          <el-input
            v-model="model.name"
            placeholder="Xe ..."
            :disabled="viewing"
          />
        </div>
      </div>
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1">
          <label>Mức giá gửi xe/Tháng</label>
          <el-input-number
            v-model="model.parkingFee"
            placeholder="0"
            :min="0"
            :controls="false"
            :disabled="viewing"
          />
        </div>
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
import { useVehicleFeeDetail } from "./vehicleFeeDetail";
// base
import BaseDetail from "@/views/base/baseDetail.js";
export default {
  extends: BaseDetail,
  name: "VehicleTypeDetail",
  setup() {
    const vehicleFeeDetail = useVehicleFeeDetail();
    return vehicleFeeDetail;
  },
};
</script>

<style lang="scss">
.vehicle-fee-detail {
  @import "./VehicleFeeDetail.scss";
}
</style>