<template>
  <t-dynamic-popup
    title="Thay đổi mật khẩu"
    :width="400"
    name="ChangePassword"
    class="change-password"
  >
    <!-- Nội dung popup -->
    <template #content>
      <div class="flex-column" v-loading="loading">
        <div class="flex-column flex1 mb-2">
          <label :style="{ textAlign: 'left' }" class="mb-1">
            Mật khẩu cũ:
          </label>
          <el-input v-model="model.oldPassword" />
        </div>
        <div class="flex-column flex1">
          <label :style="{ textAlign: 'left' }" class="mb-1">
            Mật khẩu mới:
          </label>
          <el-input v-model="model.newPassword" />
        </div>
      </div>
    </template>
    <!-- Chân popup -->
    <template #footer="{ close }">
      <div class="flex footer">
        <el-button @click="close">Hủy</el-button>
        <el-button type="primary" @click="updatePassword">Cập nhật</el-button>
      </div>
    </template>
  </t-dynamic-popup>
</template>

<script>
import { useChangePassword } from "./changePassword";

export default {
  name: "ChangePassword",
  setup() {
    const changePassword = useChangePassword();
    return changePassword;
  },
};
</script>

<style lang="scss">
.change-password {
  @import "./ChangePassword.scss";
}
</style>