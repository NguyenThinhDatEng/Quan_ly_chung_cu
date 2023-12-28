<template>
  <t-dynamic-popup
    :title="title"
    :width="600"
    name="ResidentsDetail"
    class="residents-detail"
    v-loading="loading"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2 flex1">
          <label> Mã cư dân </label>
          <el-input
            v-model="model.residentCode"
            placeholder="R001"
            :disabled="viewing || editMode == _enum.Mode.Update"
          />
        </div>
        <div class="flex-column flex flex1">
          <label> Thuộc căn hộ </label>
          <el-select
            v-model="model.apartmentId"
            placeholder="Mã căn hộ"
            no-data-text="Không có dữ liệu"
            :disabled="viewing"
            @change="selectApartment"
          >
            <el-option
              v-for="item in apartmentItems"
              :key="item?.label"
              :label="item?.label || ''"
              :value="item?.value || ''"
            />
          </el-select>
        </div>
      </div>
      <!-- Row 2 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label> Tên cư dân </label>
          <el-input
            v-model="model.name"
            placeholder="Nguyễn Văn A"
            :disabled="viewing"
          />
        </div>
        <div class="flex-column flex flex1">
          <label> Số điện thoại </label>
          <el-input
            v-model="model.phoneNumber"
            placeholder="09xxxxxxxx"
            maxlength="10"
            show-word-limit
            :disabled="viewing"
          />
        </div>
      </div>
      <!-- Row 3 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label> Số CCCD/CMND </label>
          <el-input
            v-model="model.cccd"
            placeholder="0272xxxxxxxx"
            maxlength="12"
            show-word-limit
            :disabled="viewing"
          />
        </div>
        <div class="flex-column flex flex1">
          <label> Ngày sinh </label>
          <el-date-picker
            v-model="model.birthDate"
            type="date"
            placeholder="Chọn ngày sinh"
            size="default"
            format="DD/MM/YYYY"
            class="date-picker-custom"
            :disabled="viewing"
          />
        </div>
      </div>
      <!-- Row 4 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex1 mr-2">
          <label> Giới tính </label>
          <div class="flex items-center text-sm">
            <el-radio-group v-model="model.gender" :disabled="viewing">
              <el-radio :label="_enum.Gender.Male">Nam</el-radio>
              <el-radio :label="_enum.Gender.Female">Nữ</el-radio>
              <el-radio :label="_enum.Gender.Other">Khác</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="flex-column flex1">
          <label> Nghề nghiệp </label>
          <el-input
            v-model="model.career"
            placeholder="Giáo viên, Sinh viên, ..."
            :disabled="viewing"
          />
        </div>
      </div>
      <!-- Row 5 -->
      <div class="flex space-between last-row">
        <div class="is-owner flex1 mr-2">
          <el-checkbox
            v-model="model.isOwner"
            size="large"
            border
            :disabled="viewing || ownerDisable"
            >Chủ hộ</el-checkbox
          >
        </div>
        <div class="flex-column flex flex1">
          <label> Tình trạng </label>
          <div class="flex items-center text-sm">
            <el-radio-group v-model="model.status" :disabled="viewing">
              <el-radio :label="_enum.ResidentStatus.Active"
                >Hoạt động</el-radio
              >
              <el-radio :label="_enum.ResidentStatus.InActive"
                >Tạm vắng</el-radio
              >
            </el-radio-group>
          </div>
        </div>
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <div class="left flex">
          <el-button @click="close">Hủy</el-button>
        </div>
        <div class="right">
          <el-button
            v-if="!viewing"
            type="primary"
            @click="commandClick(_enum.Mode.Add)"
            >Lưu</el-button
          >
          <el-button v-else type="primary" @click="onClickEdit()"
            >Sửa</el-button
          >
        </div>
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