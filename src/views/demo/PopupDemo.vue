<template>
  <div class="popup-demo-container">
    <el-button class="center" type="success" @click="showModal = true"
      >Show popup</el-button
    >
  </div>
  <t-dynamic-popup v-model="showModal" :title="'Demo popup'" :width="400">
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex-column" :style="{ marginBottom: '16px' }">
        <label for="name">Họ và tên</label>
        <el-input
          id="name"
          v-model="model.name"
          placeholder="Please enter your full name"
          class="input-custom"
        />
      </div>
      <div class="flex-column">
        <label for="bod">Ngày sinh</label>
        <el-date-picker
          id="bod"
          v-model="model.bod"
          type="date"
          placeholder="Pick a day"
          :size="size"
        />
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer>
      <div class="flex footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" round @click="showModal = false"
          >Close</el-button
        >
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
// Libraries
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
// components
import TDynamicPopup from "@/components/popup/TDynamicPopup.vue";
export default {
  components: { TDynamicPopup },
  setup() {
    const { proxy } = getCurrentInstance();
    const model = reactive({});
    const showModal = ref(false);

    onMounted(() => {
      window._Detail = proxy;
    });

    return { model, showModal };
  },
};
</script>

<style lang="scss" scoped>
.popup-demo-container {
  width: 100%;
  height: 100%;
  position: relative;

  .input-custom {
    border: 1px solid #afafaf;
  }
}

.modal_content {
  label {
    text-align: left;
    margin-bottom: 8px;
  }
}

.footer {
  justify-content: space-between;
}
</style>
