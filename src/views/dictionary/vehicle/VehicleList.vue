<template>
  <div class="vehicle-list flex-column">
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
import { usVehicleList } from "./vehicleList";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
  name: "VehicleList",
  components: {},
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