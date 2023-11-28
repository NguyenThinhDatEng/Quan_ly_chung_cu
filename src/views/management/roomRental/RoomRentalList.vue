<template>
  <div class="room-rental-list flex-column">
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
import { useRoomRentalList } from "./roomRentalList.js";
import BaseList from "@/views/base/baseList.js";

export default {
  extends: BaseList,
  name: "RoomRentalList",
  components: {},
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