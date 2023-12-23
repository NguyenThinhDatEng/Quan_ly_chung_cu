<template>
  <div class="fees-list flex-column">
    <div class="toolbar mb-2">
      <div class="left">
        <el-input v-model="search" placeholder="Tìm kiếm theo Mã, Tên">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="right">
        <!-- <el-dropdown split-button type="primary" @click="autoGenerateFees">
          Sinh thu phí
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Tháng này</el-dropdown-item>
              <el-dropdown-item>Tháng sau</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        <el-button type="primary" class="add" @click="autoGenerateFees"
          >Sinh thu phí</el-button
        >
      </div>
    </div>
    <t-grid-viewer
      :table-data="tableData"
      :props-data="propsData"
      :max-height="tableMaxHeight"
      :featureColWidth="270"
      @handle-edit="handleOnEditGrid"
    >
      <template #btn-before>
        <el-button type="success" plain size="small" @click="pay"
          >Thanh toán</el-button
        >
      </template>
    </t-grid-viewer>
  </div>
</template>

<script>
import { useFeesList } from "./feesList";
import BaseList from "@/views/base/baseList.js";
// components
import { Search } from "@element-plus/icons-vue";

export default {
  extends: BaseList,
  name: "FeesList",
  components: { Search },
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