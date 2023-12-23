<template>
  <div class="apartment-list flex-column">
    <div class="toolbar">
      <div class="left">
        <el-input v-model="search" placeholder="Tìm kiếm theo Mã, Địa chỉ">
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
      :loading="loading"
      @handle-edit="handleOnEditGrid"
      @handle-delete="handleOnDeleteGrid"
    ></t-grid-viewer>
  </div>
</template>

<script>
import { usApartmentList } from "./apartmentList";
import BaseList from "@/views/base/baseList.js";
// components
import { Search } from "@element-plus/icons-vue";

export default {
  extends: BaseList,
  name: "ApartmentList",
  components: { Search },
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