<template>
  <t-dynamic-popup
    :title="title"
    :width="600"
    name="ContributionFeesDetail"
    class="contribution-fees-detail"
  >
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-1">
          <label> Họ và tên </label>
          <el-input v-model="model.fullName" placeholder="Nguyễn Văn A" />
        </div>
        <div class="flex-column flex">
          <label>Địa chỉ</label>
          <el-input v-model="model.address" placeholder="00/00" />
        </div>
      </div>
      <el-select
        v-model="fundTypeKeys"
        placeholder="Chọn quỹ đóng góp"
        class="select"
        multiple
        collapse-tags
        collapse-tags-tooltip
        clearable
        :max-collapse-tags="4"
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
        <el-button type="primary">Lưu</el-button>
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useContributionFeesDetail } from "./contributionFeesDetail";
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

  .modal_content {
    label {
      text-align: left;
      margin-bottom: 8px;
    }

    .space-between {
      justify-content: space-between;
    }

    .select {
      width: 75%;
    }
  }

  .footer {
    justify-content: space-between;
  }
}
</style>