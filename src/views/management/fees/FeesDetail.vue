<template>
  <t-dynamic-popup
    :title="title"
    :width="800"
    name="FeesDetail"
    class="fees-detail"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <!-- Row 1 -->
      <div class="flex mb-2 space-between">
        <div class="flex-column">
          <label> Mã căn hộ </label>
          <el-input
            v-model="model.apartmentCode"
            :disabled="true"
            class="input-info"
          />
        </div>
        <div class="flex-column">
          <label> Mã chủ hộ </label>
          <el-input
            v-model="model.ownerCode"
            :disabled="true"
            class="input-info"
          />
        </div>
        <div class="flex-column">
          <label> Tên chủ hộ </label>
          <el-input
            v-model="model.ownerName"
            :disabled="true"
            class="input-info"
          />
        </div>
      </div>
      <!-- Row 2 -->
      <div class="flex mb-2 space-between">
        <div class="flex-column">
          <label> Diện tích </label>
          <el-input v-model="model.area" :disabled="true" class="input-info" />
        </div>
        <div class="flex-column">
          <label> Từ ngày </label>
          <el-date-picker
            v-model="fromDate"
            type="date"
            :default-time="new Date()"
            format="DD/MM/YYYY"
            class="date-picker-custom"
            :disabled="true"
          />
        </div>
        <div class="flex-column">
          <label> Đến ngày </label>
          <el-date-picker
            v-model="model.expiredDate"
            type="date"
            :default-time="new Date()"
            format="DD/MM/YYYY"
            class="date-picker-custom"
            :disabled="true"
          />
        </div>
      </div>
      <!-- Row 4 -->
      <div class="flex space-between total-amount mb-2">
        <span> Tổng tiền </span>
        <div>
          {{ totalAmount.display }}
        </div>
      </div>
      <!-- Row 5 -->
      <div class="flex-column">
        <!-- Phí dịch vụ -->
        <div
          id="servicesFee"
          class="flex space-between amount mb-2 pointer"
          @click="toggleFeesDetail('servicesFee')"
        >
          <span
            ><el-icon
              ><ArrowRightBold v-show="!isShowFeesDetail.servicesFee" />
              <ArrowDownBold v-show="isShowFeesDetail.servicesFee"
            /></el-icon>
            Phí dịch vụ
          </span>
          <div>
            {{ servicesFee.display }}
          </div>
        </div>
        <div
          v-if="isShowFeesDetail.servicesFee"
          class="flex-column service-fee-detail-container mb-1"
        >
          <div
            v-for="service in serviceList"
            :key="service.serviceCode"
            class="flex space-between mb-2 services-fee-detail"
          >
            <div class="service-fee-left flex flex-4 space-between">
              <span class="mr-1" :style="{ minWidth: '132px' }">{{
                service.name
              }}</span>
              <div
                v-show="
                  service.measuringUnit == _enum.ServiceUnit.Number ||
                  service.measuringUnit == _enum.ServiceUnit.CubicMeter
                "
                class="flex"
              >
                <el-input-number
                  v-model="service.oldCount"
                  placeholder="Chỉ số cũ"
                  class="mr-1"
                  :min="0"
                  :controls="false"
                  :disabled="viewing"
                  size="small"
                />
                <el-input-number
                  v-model="service.newCount"
                  placeholder="Chỉ số mới"
                  class="mr-1"
                  :min="0"
                  :controls="false"
                  :disabled="viewing"
                  size="small"
                />
              </div>
              <!-- Show money -->
              <div class="service-fee-right flex mr-1">
                <template
                  v-if="
                    service.measuringUnit == _enum.ServiceUnit.Number ||
                    service.measuringUnit == _enum.ServiceUnit.CubicMeter
                  "
                >
                  {{
                    (service.newCount ?? 0 - service.oldCount ?? 0 > 0
                      ? service.newCount ?? 0 - service.oldCount ?? 0
                      : 0) * service.pricePerUnit ?? 0
                  }}
                </template>
                <template v-else>
                  {{ service.totalFee }}
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- Phí gửi xe -->
        <div class="flex space-between amount mb-1">
          <span> Phí gửi xe </span>
          <div>
            {{ vehicleFee.display }}
          </div>
        </div>
        <!-- Thông tin phương tiện -->
        <t-grid-viewer
          ref="viewRefDetail"
          :table-data="model.vehicleList"
          :props-data="vehiclePropsData"
          :max-height="tableMaxHeight"
          :isShowFeatureCol="false"
          :featureColWidth="100"
          :loading="false"
        ></t-grid-viewer>
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Hủy</el-button>
        <el-button v-if="!viewing" type="primary" @click="updateFeeInfo"
          >Lưu</el-button
        >
        <el-button
          v-else
          type="primary"
          @click="commandClick(_enum.Mode.Update)"
          >Sửa</el-button
        >
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useFeesDetail } from "./feesDetail";
// base
import BaseDetail from "@/views/base/baseDetail.js";
// icons
import { ArrowRightBold, ArrowDownBold } from "@element-plus/icons-vue";

export default {
  extends: BaseDetail,
  name: "FeesDetail",
  components: { ArrowRightBold, ArrowDownBold },
  setup() {
    const feesDetail = useFeesDetail();
    return feesDetail;
  },
};
</script>

<style lang="scss">
.fees-detail {
  @import "./FeesDetail.scss";
}
</style>