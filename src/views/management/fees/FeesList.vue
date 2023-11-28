<template>
  <div class="fees-list flex-column">
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
import { useFeesList } from "./feesList";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
  name: "FeesList",
  components: {},
  setup() {
    const feesList = useFeesList();
    return feesList;
  },
};
</script>

<style lang="scss">
.fees-list {
  @import "./FeesList.scss";
}
</style>