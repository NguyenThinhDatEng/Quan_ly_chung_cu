<template>
  <t-dynamic-popup
    :title="title"
    :width="600"
    name="ApartmentDetail"
    class="apartment-detail"
    v-loading="loading"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2 flex1">
          <label for="apartmentCode"> Mã căn hộ </label>
          <el-input
            id="apartmentCode"
            v-model="model.apartmentCode"
            placeholder="A00"
            :disabled="viewing || editMode == _enum.Mode.Update"
          />
        </div>
        <div class="flex-column flex flex1">
          <label for="position"> Vị trí </label>
          <el-input
            id="position"
            v-model="model.position"
            placeholder="01/01"
            :disabled="viewing"
          />
        </div>
      </div>
      <div class="flex space-between mb-2">
        <div class="flex-column flex mr-2 flex1">
          <label for="area">Diện tích</label>
          <!-- <el-input
            id="area"
            v-model="model.area"
            placeholder="100"
            :disabled="viewing"
          >
            <template #suffix>
              <span>{{ "m\u00B2" }}</span>
            </template>
          </el-input> -->
          <t-currency-input
            v-model="model.area"
            placeholder="0,00"
            :options="{
              currency: 'EUR',
              locale: 'de-DE',
              precision: 2,
              valueRange: {
                min: 0,
              },
              currencyDisplay: 'hidden',
            }"
          />
        </div>
        <div class="flex-column flex flex1 price">
          <label for="price"> Giá </label>
          <t-currency-input
            v-model="model.price"
            placeholder="0₫"
            :options="{
              currency: 'VND',
              locale: 'de-DE',
              valueRange: {
                min: 0,
              },
              hideGroupingSeparatorOnFocus: false,
            }"
          />
        </div>
      </div>
      <div class="flex-column flex flex1">
        <label> Số phòng ngủ </label>
        <el-input-number
          v-model="model.roomCount"
          :min="1"
          :max="100"
          :disabled="viewing"
        />
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Hủy</el-button>
        <el-button
          v-if="!viewing"
          type="primary"
          @click="commandClick(Enum.Mode.Add)"
          >Lưu</el-button
        >
        <el-button v-else type="primary" @click="commandClick(Enum.Mode.Update)"
          >Sửa</el-button
        >
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useApartmentDetail } from "./apartmentDetail";
// base
import BaseDetail from "@/views/base/baseDetail.js";
import TCurrencyInput from "../../../components/input/TCurrencyInput.vue";
export default {
  components: { TCurrencyInput },
  extends: BaseDetail,
  name: "ApartmentDetail",
  setup() {
    const apartmentDetail = useApartmentDetail();
    return apartmentDetail;
  },
};
</script>

<style lang="scss">
.apartment-detail {
  @import "./ApartmentDetail.scss";
}
</style>