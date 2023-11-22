<template>
  <t-dynamic-popup
    :title="title"
    :width="600"
    name="ApartmentDetail"
    class="apartment-detail"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-1">
          <label> Mã căn hộ </label>
          <el-input
            v-model="model.apartmentCode"
            placeholder="MCH000"
            :disabled="viewing"
          />
        </div>
        <div class="flex-column flex">
          <label> Giá </label>
          <el-input
            v-model="model.price"
            placeholder="1000000"
            :disabled="viewing"
          />
        </div>
      </div>
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-1">
          <label>Diện tích</label>
          <el-input
            v-model="model.area"
            placeholder="100"
            :disabled="viewing"
          />
        </div>
        <div class="flex-column flex">
          <label>Số phòng</label>
          <el-input
            v-model="model.noOfRooms"
            placeholder="5"
            :disabled="viewing"
          />
        </div>
      </div>
      <el-checkbox v-model="model.status" :disabled="viewing"
        >Đã được thuê</el-checkbox
      >
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Cancel</el-button>
        <el-button
          v-if="!viewing"
          type="primary"
          @click="commandClick(Enum.Mode.Add)"
          >Lưu</el-button
        >
        <el-button v-else type="primary" @click="commandClick(Enum.Mode.Update)"
          >Sửa</el-button
        >
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useApartmentDetail } from "./apartmentDetail";
// base
import BaseDetail from "@/views/base/baseDetail.js";
export default {
  extends: BaseDetail,
  name: "ApartmentDetail",
  setup() {
    const apartmentDetail = useApartmentDetail();
    return apartmentDetail;
  },
};
</script>

<style lang="scss">
.apartment-detail {
  @import "./ApartmentDetail.scss";
}
</style>