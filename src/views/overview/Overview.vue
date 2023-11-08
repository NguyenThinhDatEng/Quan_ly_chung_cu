<template>
  <div class="overview-container">
    <div class="overview-info flex-column">
      <div class="info">Số phòng còn trống: <b>10/24</b></div>
      <div class="info">Số lượng dân cư: <b>100</b></div>
      <div class="info">Số lượng phương tiện đã đăng ký: <b>50</b></div>
    </div>
    <el-image :src="url" :fit="fit">
      <template #error>
        <img src="@/assets/imgs/apartment.jpg" />
      </template>
    </el-image>
  </div>
</template>

<script>
export default {
  name: "TOverview",
  setup() {
    const url = `https://ducanhland.com/wp-content/uploads/2021/03/Chung-cu-Housinco-Premium-01.jpg`;
    // ['fill', 'contain', 'cover', 'none', 'scale-down']
    const fit = "fill";
    return { url, fit };
  },
};
</script>

<style lang="scss" scoped>
.overview-container {
  display: flex;
  height: 100%;

  .overview-info {
    flex: 2;
    justify-content: center;
    align-items: flex-start;
    padding-left: 20px;

    .info {
      margin-bottom: 20px;
      font-size: 24px;

      b {
        font-size: 24px;
      }
    }
  }

  .el-image {
    flex: 3;
    width: 100%;
    height: 100%;
  }
}
</style>
