<template>
  <div class="room-rental-list flex-column">
    <div class="toolbar mb-2">
      <div class="left">
        <el-input v-model="search" placeholder="Tìm kiếm theo Mã, Tên">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <t-grid-viewer
      :table-data="tableSearchData"
      :props-data="propsData"
      :max-height="tableMaxHeight"
      :loading="loading"
      :isShowDeleteFeature="false"
      :featureColWidth="110"
      @handle-edit="handleOnEditGrid"
      @handle-delete="handleOnDeleteGrid"
    ></t-grid-viewer>
  </div>
</template>

<script>
import { useRoomRentalList } from "./roomRentalList.js";
import BaseList from "@/views/base/baseList.js";
// components
import { Search } from "@element-plus/icons-vue";

export default {
  extends: BaseList,
  name: "RoomRentalList",
  components: { Search },
  setup() {
    const roomRentalList = useRoomRentalList();
    return roomRentalList;
  },
};
</script>

<style lang="scss">
.room-rental-list {
  @import "./RoomRentalList.scss";
}
</style>