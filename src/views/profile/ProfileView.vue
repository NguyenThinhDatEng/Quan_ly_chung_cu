<template>
  <div class="profile">
    <div class="container flex">
      <div class="left-container flex-column">
        <div class="avatar-info flex-column">
          <div class="info-top">
            <!-- <img src="../../assets/logo.png" alt="" class="avatar mb-1" /> -->
            <div class="position">Ban quản trị chung cư</div>
            <span class="mb-2 user-name">{{ userInfo.name ?? "" }}</span>
          </div>
          <div class="info-bottom flex-column">
            <el-button type="primary" plain class="btn mb-2" @click="edit"
              >Cập nhật thông tin</el-button
            >
            <el-button
              type="primary"
              plain
              class="change-password btn"
              @click="changePassword"
              >Thay đổi mật khẩu</el-button
            >
          </div>
        </div>
      </div>
      <div class="right-container flex-column">
        <img
          src="@/assets/imgs/apartment.jpg"
          alt=""
          class="background-image mb-2"
        />
        <div class="info-details flex-column">
          <div class="info_content flex-column">
            <div class="basic-info" v-loading="loading">
              <div class="info_title mb-4">Thông tin cơ bản</div>
              <div class="controls flex-column">
                <div class="control-row mb-3">
                  <div class="flex control-detail flex1 mr-4">
                    <label for="fullName"> Họ và tên: </label>
                    <el-input
                      id="fullName"
                      v-model="model.name"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                  <div class="flex control-detail flex1">
                    <label for="phoneNumber"> Số điện thoại: </label>
                    <el-input
                      id="phoneNumber"
                      v-model="model.phoneNumber"
                      maxlength="10"
                      show-word-limit
                      :disabled="viewing"
                      class="control-input"
                      @blur="blur"
                    />
                  </div>
                </div>
                <div class="control-row mb-3">
                  <div class="flex control-detail flex1 mr-4">
                    <label for="bankName"> Tên ngân hàng: </label>
                    <el-input
                      id="bankName"
                      v-model="model.bankName"
                      :disabled="viewing"
                      class="control-input"
                      maxlength="255"
                    />
                  </div>
                  <div class="flex control-detail flex1">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Số tài khoản ngân hàng"
                      placement="top"
                    >
                      <label for="bankAccountNumber"> Số TKNH: </label>
                    </el-tooltip>
                    <el-input
                      id="bankAccountNumber"
                      v-model="model.bankAccountNumber"
                      :disabled="viewing"
                      class="control-input"
                      show-word-limit
                      maxlength="15"
                    />
                  </div>
                </div>
                <div class="control-row">
                  <div class="flex control-detail flex1 mr-4">
                    <label for="zalo"> Zalo: </label>
                    <el-input
                      id="zalo"
                      :title="model.zaloLink"
                      v-model="model.zaloLink"
                      maxlength="10"
                      show-word-limit
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                  <div class="flex control-detail flex1">
                    <label> Facebook: </label>
                    <el-input
                      :title="model.facebookLink"
                      v-model="model.facebookLink"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info_footer">
            <el-button type="primary" plain class="btn" @click="back"
              >Quay lại</el-button
            >
            <el-button
              v-show="!viewing"
              type="info"
              plain
              class="btn"
              @click="cancel"
              >Hoãn</el-button
            >
            <el-button
              v-show="!viewing"
              type="primary"
              class="btn"
              @click="submit"
              >Lưu thông tin</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfile } from "./profile";

export default {
  setup() {
    const profile = useProfile();
    return profile;
  },
};
</script>

<style lang="scss">
.profile {
  @import "./Profile.scss";
}
</style>