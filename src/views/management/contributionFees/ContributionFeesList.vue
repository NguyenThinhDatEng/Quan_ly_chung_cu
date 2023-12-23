<template>
  <div class="contribution-fees-list flex-column">
    <div class="toolbar mb-2">
      <div class="left flex">
        <el-select v-model="year" popper-class="year">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="search"
          placeholder="Tìm kiếm theo Mã căn hộ, Họ và tên"
          class="ml-2 search"
        >
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
import { useContributionFeesList } from "./contributionFeesList";
import BaseList from "@/views/base/baseList.js";
// components
import { Search } from "@element-plus/icons-vue";

export default {
  extends: BaseList,
  name: "ContributionFeesList",
  components: { Search },
  setup() {
    const contributionFeesList = useContributionFeesList();
    return contributionFeesList;
  },
};
</script>

<style lang="scss">
.contribution-fees-list {
  @import "./ContributionFeesList.scss";
}
</style>