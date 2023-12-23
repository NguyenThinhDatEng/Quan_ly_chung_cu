<template>
  <div class="vehicle-list flex-column">
    <div class="toolbar">
      <div class="left">
        <el-input
          v-model="search"
          placeholder="Tìm kiếm theo Mã, Loại phương tiện"
        >
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
      :table-data="tableSearchData"
      :props-data="propsData"
      :max-height="tableMaxHeight"
      @handle-edit="handleOnEditGrid"
      @handle-delete="handleOnDeleteGrid"
    ></t-grid-viewer>
  </div>
</template>

<script>
import { usVehicleList } from "./vehicleList";
import BaseList from "@/views/base/baseList.js";
// components
import { Search } from "@element-plus/icons-vue";

export default {
  extends: BaseList,
  name: "VehicleList",
  components: {
    Search,
  },
  setup() {
    const vehicleList = usVehicleList();
    return vehicleList;
  },
};
</script>

<style lang="scss">
.vehicle-list {
  @import "./VehicleList.scss";
}
</style>