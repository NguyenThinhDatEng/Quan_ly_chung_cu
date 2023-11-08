<template>
  <div class="input-demo-container">
    <el-input
      v-model="input2"
      class="w-50 m-2 input-custom"
      placeholder="Type something"
      :prefix-icon="Search"
    />
  </div>
</template>

<script>
</script>

<style lang="scss">
.input-demo-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .input-custom {
    width: 200px;
  }
}
</style>
