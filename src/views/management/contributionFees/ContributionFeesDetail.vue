<template>
  <t-dynamic-popup
    :title="title"
    :width="600"
    name="ContributionFeesDetail"
    class="contribution-fees-detail"
    v-loading="loading"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <!-- Row 1 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label> Người đóng góp </label>
          <el-select
            v-model="model.residentId"
            placeholder="Họ và tên"
            :disabled="viewing"
          >
            <el-option
              v-for="item in residentItems"
              :key="item?.label"
              :label="item?.label || ''"
              :value="item?.value || ''"
            />
          </el-select>
        </div>
        <div class="flex-column flex flex1">
          <label> Thuộc căn hộ </label>
          <el-select
            v-model="model.apartmentId"
            placeholder="Mã căn hộ"
            :disabled="true"
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
      <div class="flex-column flex flex1 mb-2">
        <label>Địa chỉ</label>
        <el-input
          v-model="model.address"
          placeholder="00/00"
          :disabled="viewing"
        />
      </div>
      <!-- Row 3 -->
      <el-select
        v-model="fundTypeKeys"
        placeholder="Chọn quỹ đóng góp"
        class="select"
        multiple
        collapse-tags
        collapse-tags-tooltip
        clearable
        :max-collapse-tags="4"
        :disabled="viewing"
        @visible-change="onVisibleChange"
        @clear="onClear"
        @remove-tag="onRemoveTag"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :style="{ fontFamily: 'Avenir, Helvetica, Arial, sans-serif' }"
        />
      </el-select>
      <div v-for="item in selectedFunds" :key="item.key">
        <template v-if="item.visible">
          <div class="flex mt-2">
            <el-input v-model="item.fundName" disabled class="mr-2 flex" />
            <el-input-number
              v-model="item.paidAmount"
              :min="0"
              :controls="false"
              class="flex"
            />
          </div>
        </template>
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
import { useContributionFeesDetail } from "./contributionFeesDetail";
// base
import BaseDetail from "@/views/base/baseDetail.js";
export default {
  extends: BaseDetail,
  name: "ContributionFeesDetail",
  setup() {
    const contributionFeesDetail = useContributionFeesDetail();
    return contributionFeesDetail;
  },
};
</script>

<style lang="scss">
.contribution-fees-detail {
  width: 100%;
  height: 100%;
  position: relative;

  @import "./ContributionFeesDetail.scss";
}
</style>