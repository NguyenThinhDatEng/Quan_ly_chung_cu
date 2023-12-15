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
    <template #content>
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2">
          <label> Mã cư dân </label>
          <el-input
            v-model="model.residentCode"
            placeholder="C0001"
            :disabled="viewing"
          />
        </div>
        <div class="flex-column flex">
          <label> Tên cư dân </label>
          <el-input
            v-model="model.residentName"
            placeholder="Nguyễn Văn A"
            :disabled="viewing"
          />
        </div>
      </div>
      <!-- Row 2 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2">
          <label> Ngày sinh </label>
          <el-date-picker
            v-model="model.bod"
            type="date"
            placeholder="Chọn ngày sinh"
            size="default"
            :default-time="new Date()"
            format="DD/MM/YYYY"
            value-format="DD/MM/YYYY"
            class="date-picker-custom"
            :disabled="viewing"
          />
        </div>
        <div class="flex-column flex">
          <label> Giới tính </label>
          <div class="flex items-center text-sm">
            <el-radio-group v-model="model.gender" :disabled="viewing">
              <el-radio :label="_enum.Gender.Male">Nam</el-radio>
              <el-radio :label="_enum.Gender.Female">Nữ</el-radio>
              <el-radio :label="_enum.Gender.Other">Khác</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <!-- Row 3 -->
      <div class="flex space-between">
        <div class="flex-column flex">
          <label> Nghề nghiệp </label>
          <el-input
            v-model="model.job"
            placeholder="Giáo viên, Sinh viên, ..."
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
  @import "./ResidentsDetail.scss";
}
</style>