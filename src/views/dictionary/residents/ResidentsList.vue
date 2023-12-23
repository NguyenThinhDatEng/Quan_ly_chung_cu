<template>
  <div class="residents-list flex-column">
    <div class="toolbar">
      <div class="left">
        <el-input v-model="search" placeholder="Tìm kiếm theo Mã, Tên">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
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
      ref="viewRef"
      :table-data="tableSearchData"
      :props-data="propsData"
      :max-height="tableMaxHeight"
      :loading="loading"
      @handle-edit="handleOnEditGrid"
      @handle-delete="handleOnDeleteGrid"
    ></t-grid-viewer>
  </div>
</template>

<script>
// js
import { useResidentsList } from "./residentsList.js";
// base
import BaseList from "@/views/base/baseList.js";
// components
import { Search } from "@element-plus/icons-vue";

export default {
  extends: BaseList,
  name: "ResidentsList",
  components: { Search },
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