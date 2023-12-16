<template>
  <div class="residents-list flex-column">
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
      ref="viewRef"
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
import { useResidentsList } from "./residentsList.js";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
  name: "ResidentsList",
  components: {},
  setup() {
    const residentsList = useResidentsList();
    return residentsList;
  },
};
</script>

<style lang="scss">
.residents-list {
  @import "./ResidentsList.scss";
}
</style>