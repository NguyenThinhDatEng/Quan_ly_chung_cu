<template>
  <div class="service-list flex-column">
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
      @handle-delete="handleOnDeleteGrid"
    ></t-grid-viewer>
  </div>
</template>

<script>
import { usServiceList } from "./serviceList";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
  name: "ServiceList",
  components: {},
  setup() {
    const serviceList = usServiceList();
    return serviceList;
  },
};
</script>

<style lang="scss">
.service-list {
  @import "./ServiceList.scss";
}
</style>