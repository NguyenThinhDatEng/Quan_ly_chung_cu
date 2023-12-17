<template>
  <div class="contribution-fees-list flex-column">
    <div class="toolbar mb-2">
      <div class="left">
        <el-select v-model="year" popper-class="year">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="right">
        <el-button
          type="primary"
          plain
          class="add"
          @click="handleOnClickAddButton"
          >Thêm mới</el-button
        >
      </div>
    </div>
    <t-grid-viewer
      :table-data="tableData"
      :props-data="propsData"
      :max-height="tableMaxHeight"
      :loading="loading"
      @handle-edit="handleOnEditGrid"
      @handle-delete="handleOnDeleteGrid"
    ></t-grid-viewer>
  </div>
</template>

<script>
import { useContributionFeesList } from "./contributionFeesList";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
  name: "ContributionFeesList",
  components: {},
  setup() {
    const contributionFeesList = useContributionFeesList();
    return contributionFeesList;
  },
};
</script>

<style lang="scss">
.contribution-fees-list {
  @import "./ContributionFeesList.scss";
}
</style>