<template>
  <div class="room-rental-list flex-column">
    <t-grid-viewer
      :table-data="tableData"
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