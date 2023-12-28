<template>
  <t-dynamic-popup
    :title="title"
    name="RoomRental"
    class="room-rental-detail"
    width="60%"
    v-loading="loading"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <!-- Row 1 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex flex1 mr-2">
          <label> Mã căn hộ </label>
          <el-input v-model="model.apartmentCode" :disabled="true" />
        </div>
        <div class="flex-column flex flex1 mr-2">
          <label>Địa chỉ</label>
          <el-input
            v-model="model.position"
            placeholder="00/00"
            :disabled="true"
          />
        </div>
        <div class="flex-column flex flex1 mr-2">
          <label> Mã chủ hộ </label>
          <el-input v-model="model.ownerCode" :disabled="true" />
        </div>
        <div class="flex-column flex flex1">
          <label> Tên chủ hộ </label>
          <el-input v-model="model.ownerName" :disabled="true" />
        </div>
      </div>
      <!-- Danh sách thành viên -->
      <div class="resident-list mb-2">
        <div class="mb-1" :style="{ textAlign: 'left', fontWeight: 600 }">
          Danh sách thành viên
        </div>

        <t-grid-viewer
          ref="viewRefDetail"
          :table-data="model.residentList"
          :props-data="residentPropsData"
          :max-height="tableMaxHeight"
          :isShowFeatureCol="false"
          :loading="false"
        ></t-grid-viewer>
      </div>
      <!-- Danh sách phương tiện -->
      <div class="vehicle-list">
        <div class="info flex space-between mb-1">
          <div :style="{ textAlign: 'left', fontWeight: 600 }">
            Danh sách phương tiện
          </div>
          <el-button type="primary" plain class="add" @click="addNewVehicle"
            >Thêm mới phương tiện</el-button
          >
        </div>

        <t-grid-viewer
          ref="viewRefDetail"
          :table-data="model.vehicleList"
          :props-data="vehiclePropsData"
          :max-height="tableMaxHeight"
          :isShowViewFeature="false"
          :featureColWidth="100"
          :loading="false"
          @handle-delete="handleOnDeleteGrid"
        ></t-grid-viewer>
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useRoomRentalDetail } from "./roomRentalDetail";
import BaseDetail from "@/views/base/baseDetail.js";

export default {
  extends: BaseDetail,
  name: "RoomRentalDetail",
  setup() {
    const roomRentalDetail = useRoomRentalDetail();
    return roomRentalDetail;
  },
};
</script>

<style lang="scss">
.room-rental-detail {
  @import "./RoomRentalDetail.scss";
}
</style>