<template>
  <div class="container">
    <div class="content">
      <div class="content_left">
        <p>Phần mềm quản lý chung cư</p>
      </div>
      <div class="content_right">
        <img src="@/assets/imgs/layout/user.jpg" @click="showFeatures" />
        <div v-if="isShowFeatures" class="features">
          <div class="item">Thông tin tài khoản</div>
          <div class="item">Cấu hình</div>
          <div class="item">Đăng xuất</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HeaderVue",
  setup() {
    const isShowFeatures = ref(false);
    const showFeatures = () => {
      isShowFeatures.value = !isShowFeatures.value;
    };

    return {
      isShowFeatures,
      showFeatures,
    };
  },
};
</script>

<style scoped>
.container {
  position: sticky;
  top: 0;
  border: 1px solid #afafaf;
  padding: 0 8px;
}

.content {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
}

.content_left {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}

.content_left p {
  margin: 0;
  font-size: 20px;
}

img {
  width: 50px;
  height: 50px;
  margin-right: 8px;
}

img:hover {
  cursor: pointer;
}

.features {
  position: fixed;
  right: 20px;
  width: 150px;
  border: 1px solid #afafaf;
  border-bottom: unset;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #afafaf;
  height: 36px;
}

.item:hover {
  cursor: pointer;
  background-color: #e9e9e9;
}
</style>