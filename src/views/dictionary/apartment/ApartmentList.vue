<template>
  <div class="apartment-list flex-column">
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
      :loading="loading"
      @handle-edit="handleOnEditGrid"
      @handle-delete="handleOnDeleteGrid"
    ></t-grid-viewer>
  </div>
</template>

<script>
import { usApartmentList } from "./apartmentList";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
  name: "ApartmentList",
  components: {},
  setup() {
    const apartmentList = usApartmentList();
    return apartmentList;
  },
};
</script>

<style lang="scss">
.apartment-list {
  @import "./ApartmentList.scss";
}
</style>