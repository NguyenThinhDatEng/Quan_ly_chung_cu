<template>
  <el-button type="success" @click="showModal = true">Success</el-button>
  <t-dynamic-popup v-model="showModal" :title="'Demo'" :width="800">
    <template #content>
      <div class="flex-column">
        <label for="name">Họ và tên</label>
        <el-input
          id="name"
          v-model="model.name"
          placeholder="Please enter your full name"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" round>Close</el-button>
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
// Libraries
import { reactive, ref } from "vue";
// components
import TDynamicPopup from "@/components/popup/TDynamicPopup.vue";
export default {
  components: { TDynamicPopup },
  setup() {
    const model = reactive({});
    const showModal = ref(false);

    return { model, showModal };
  },
};
</script>

<style>
.footer {
  justify-content: space-between;
}
</style>
