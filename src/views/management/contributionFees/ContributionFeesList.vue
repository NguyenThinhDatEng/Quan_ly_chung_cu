<template>
  <div class="contribution-fees-list flex-column">
    <div class="toolbar">
      <div class="left"></div>
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
      @handle-edit="handleOnEditGrid"
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
  position: relative;
  @import "./ContributionFeesList.scss";
}
</style>