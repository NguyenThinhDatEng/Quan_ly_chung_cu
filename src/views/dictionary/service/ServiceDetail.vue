<template>
  <t-dynamic-popup
    :title="title"
    :width="500"
    name="ServiceDetail"
    class="service-detail"
    v-loading="loading"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label> Mã dịch vụ </label>
          <el-input
            v-model="model.serviceFeeTypeCode"
            placeholder="S01"
            :disabled="editMode != _enum.Mode.Add"
          />
        </div>
        <div class="flex-column flex flex1">
          <label> Loại dịch vụ </label>
          <el-input
            v-model="model.name"
            placeholder="Tên loại dịch vụ"
            :disabled="viewing || model[store.state.systemField]"
          />
        </div>
      </div>
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label>Đơn vị</label>
          <el-select
            v-model="model.measuringUnit"
            placeholder="Chọn đơn vị"
            class="select"
            clearable
            :disabled="viewing || model[store.state.systemField]"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :style="{ fontFamily: 'Avenir, Helvetica, Arial, sans-serif' }"
            />
          </el-select>
        </div>
        <div class="flex-column flex flex1">
          <label>Đơn giá</label>
          <t-currency-input
            v-model="model.pricePerUnit"
            placeholder="0₫"
            :options="{
              currency: 'VND',
              locale: 'de-DE',
              valueRange: {
                min: 0,
              },
              hideGroupingSeparatorOnFocus: false,
            }"
            :disabled="viewing"
          />
        </div>
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
import { useServiceDetail } from "./serviceDetail";
// base
import BaseDetail from "@/views/base/baseDetail.js";
export default {
  extends: BaseDetail,
  name: "ServiceDetail",
  setup() {
    const serviceDetail = useServiceDetail();
    return serviceDetail;
  },
};
</script>

<style lang="scss">
.service-detail {
  @import "./ServiceDetail.scss";
}
</style>