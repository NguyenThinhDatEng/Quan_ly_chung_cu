<template>
  <div class="main_container">
    <HeaderVue />
    <div class="main_content">
      <LeftNavVue />
      <router-view class="detail_content" />
    </div>
  </div>
</template>

<script>
// components
import HeaderVue from "../header/Header.vue";
import LeftNavVue from "../nav/LeftNav.vue";

export default {
  name: "MainVue",
  components: {
    HeaderVue,
    LeftNavVue,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main_content {
  display: flex;
  height: 100%;
}

.detail_content {
  width: 100%;
  margin: 0;
}
</style>