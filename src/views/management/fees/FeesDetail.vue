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
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2">
          <label> Mã căn hộ </label>
          <el-input v-model="model.apartmentCode" :disabled="true" />
        </div>
        <div class="flex-column flex">
          <label> Diện tích </label>
          <el-input v-model="model.area" :disabled="true" />
        </div>
      </div>
      <!-- Row 2 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2">
          <label> Mã chủ hộ </label>
          <el-input v-model="model.residentCode" :disabled="true" />
        </div>
        <div class="flex-column flex">
          <label> Tên chủ căn hộ </label>
          <el-input v-model="model.residentName" :disabled="true" />
        </div>
      </div>
      <!-- Row 3 -->
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2">
          <label> Từ ngày </label>
          <el-date-picker
            v-model="model.fromDate"
            type="date"
            :default-time="new Date()"
            format="DD/MM/YYYY"
            value-format="DD/MM/YYYY"
            class="date-picker-custom"
            :disabled="true"
          />
        </div>
        <div class="flex-column flex">
          <label> Đến ngày </label>
          <el-date-picker
            v-model="model.toDate"
            type="date"
            :default-time="new Date()"
            format="DD/MM/YYYY"
            value-format="DD/MM/YYYY"
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
        <!-- Phí chung cư -->
        <div
          id="apartmentFee"
          class="flex space-between amount mb-2 pointer"
          @click="toggleFeesDetail('apartmentFee')"
        >
          <span
            ><el-icon
              ><ArrowRightBold v-show="!isShowFeesDetail.apartmentFee" />
              <ArrowDownBold v-show="isShowFeesDetail.apartmentFee"
            /></el-icon>
            Phí chung cư
          </span>
          <div>
            {{ apartmentFee.display }}
          </div>
        </div>
        <div v-if="isShowFeesDetail.apartmentFee" class="flex-column">
          <div class="flex space-between amount-child mb-2">
            <span> Phí dịch vụ chung cư </span>
            <div>
              {{ apartmentServiceFee.display }}
            </div>
          </div>
          <div class="flex space-between amount-child mb-2">
            <span> Phí quản lý chung cư </span>
            <div>
              {{ apartmentManagementFee.display }}
            </div>
          </div>
        </div>
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
        <div v-if="isShowFeesDetail.servicesFee" class="flex-column">
          <div
            v-for="service in serviceList"
            :key="service.serviceCode"
            class="flex space-between mb-2 services-fee-detail"
          >
            <div class="service-fee-left flex flex-4">
              <span class="mr-1">{{ service.serviceName }}</span>
              <div v-if="service.unit > 2" class="flex">
                <el-input-number
                  v-model="service.oldIndex"
                  placeholder="Chỉ số cũ"
                  class="mr-1"
                  :min="0"
                  :controls="false"
                  :disabled="viewing"
                />
                <el-input-number
                  v-model="service.newIndex"
                  placeholder="Chỉ số mới"
                  class="mr-1"
                  :min="0"
                  :controls="false"
                  :disabled="viewing"
                />
                <el-input
                  v-model="service.price"
                  placeholder="Đơn giá"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="service-fee-right flex">
              <template v-if="service.unit > 2">
                {{ (service.newIndex - service.oldIndex) * service.price || 0 }}
              </template>
              <template v-else>
                {{ service.price }}
              </template>
            </div>
          </div>
        </div>
        <!-- Phí gửi xe -->
        <div class="flex space-between amount">
          <span> Phí gửi xe </span>
          <div>
            {{ vehicleFee.display }}
          </div>
        </div>
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Cancel</el-button>
        <el-button
          v-if="!viewing"
          type="primary"
          @click="commandClick(_enum.Mode.Add)"
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