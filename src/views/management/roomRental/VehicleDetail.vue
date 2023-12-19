vehicleType<template>
  <t-dynamic-popup
    :title="title"
    :width="600"
    name="VehicleDetail"
    class="vehicle-detail"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <!-- Row 1 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex1 mr-2">
          <label for="resident"> Chủ sở hữu </label>
          <el-select
            id="resident"
            v-model="model.ownerId"
            placeholder="Họ và tên"
            :disabled="viewing"
          >
            <el-option
              v-for="item in residentItems"
              :key="item?.label"
              :label="item?.label || ''"
              :value="item?.value || ''"
            >
              <span
                style="
                  float: left;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.code }}</span
              >
              <span style="float: right">{{ item.label }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="flex-column flex1">
          <label> Loại phương tiện </label>
          <el-select
            v-model="model.vehicleTypeId"
            placeholder="Loại phương tiện"
          >
            <el-option
              v-for="item in vehicleTypeItems"
              :key="item?.label"
              :label="item?.label || ''"
              :value="item?.value || ''"
            >
              <span
                style="
                  float: left;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.code }}</span
              >
              <span style="float: right">{{ item.label }}</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- Row 2 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex1 mr-2">
          <label> Kiểu xe </label>
          <el-input
            v-model="model.name"
            placeholder="SH trắng, Mercedes đen, ..."
          />
        </div>
        <div class="flex-column flex1">
          <label> Biển số </label>
          <el-input v-model="model.plate" />
        </div>
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="commandClick(_enum.Mode.Add)"
          >Lưu</el-button
        >
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useVehicleDetail } from "./vehicleDetail";
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
.vehicle-detail {
  @import "./VehicleDetail.scss";
}
</style>