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
          <label for="resident"> Người đóng góp </label>
          <el-select
            id="resident"
            v-model="model.residentId"
            placeholder="Họ và tên"
            :disabled="viewing"
            @change="selectResidentName"
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
        <div class="flex-column flex flex1">
          <label> Ngày đóng góp </label>
          <el-date-picker
            v-model="model.createdTime"
            type="date"
            placeholder="Chọn ngày đóng góp"
            size="default"
            format="DD/MM/YYYY"
            :style="{ width: 'unset' }"
            :disabled="viewing"
          />
        </div>
      </div>
      <!-- Row 2 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label>Thuộc căn hộ</label>
          <el-input v-model="model.apartmentCode" :disabled="true" />
        </div>
        <div class="flex-column flex flex1">
          <label>Địa chỉ</label>
          <el-input
            v-model="model.address"
            placeholder="00/00"
            :disabled="true"
          />
        </div>
      </div>
      <!-- Row 3 -->
      <el-select
        v-model="fundTypeKeys"
        placeholder="Chọn các quỹ đóng góp"
        class="select mb-2"
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
      <div class="amounts">
        <div v-for="item in selectedFunds" :key="item.key">
          <template v-if="item.visible">
            <div class="flex fund-amount mr-1">
              <span
                class="flex1"
                :style="{ textAlign: 'left', minWidth: '170px' }"
                >{{ item.fundName }}:</span
              >
              <el-input-number
                v-model="item.paidAmount"
                :min="0"
                placeholder="0"
                :controls="false"
                class="flex1"
                :disabled="viewing"
              />
            </div>
          </template>
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