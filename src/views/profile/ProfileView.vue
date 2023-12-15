<template>
  <div class="profile">
    <div class="container flex">
      <div class="left-container flex-column">
        <div class="avatar-info flex-column">
          <div class="info-top">
            <img src="../../assets/logo.png" alt="" class="avatar mb-1" />
            <span class="mb-2 user-name">Nguyễn Thịnh</span>
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
          src="../../assets/imgs/free-hd-desktop-wallpapers.jpg"
          alt=""
          class="background-image mb-2"
        />
        <div class="info-details flex-column">
          <div class="info_content flex-column">
            <div class="basic-info">
              <div class="info_title mb-4">Thông tin cơ bản</div>
              <div class="controls flex-column">
                <div class="control-row mb-3">
                  <div class="flex control-detail">
                    <label> Họ và tên: </label>
                    <el-input
                      v-model="model.fullName"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                  <div class="flex control-detail">
                    <label> Số điện thoại: </label>
                    <el-input
                      v-model="model.phoneNumber"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                </div>
                <div class="control-row mb-3">
                  <div class="flex control-detail">
                    <label> Tên ngân hàng: </label>
                    <el-input
                      v-model="model.bankName"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                  <div class="flex control-detail">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Số tài khoản ngân hàng"
                      placement="top"
                    >
                      <label> Số TKNH: </label>
                    </el-tooltip>
                    <el-input
                      v-model="model.bankAccount"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                </div>
                <div class="control-row">
                  <div class="flex control-detail">
                    <label> Zalo: </label>
                    <el-input
                      :title="model.zalo"
                      v-model="model.zalo"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                  <div class="flex control-detail">
                    <label> Facebook: </label>
                    <el-input
                      :title="model.facebook"
                      v-model="model.facebook"
                      :disabled="viewing"
                      class="control-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info_footer">
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
              plain
              class="btn"
              @click="edit"
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

  .container {
    height: 100vh;
    .left-container {
      flex: 1;
      align-items: center;

      .avatar-info {
        height: 40%;
        width: 80%;
        align-items: center;
        justify-content: space-between;

        .info-top {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          .avatar {
            border-radius: 100%;
            border: solid 1px #afafaf;
          }

          .user-name {
            font-weight: 80%;
            font-size: 20px;
          }
        }

        .info-bottom {
          justify-content: flex-end;
          align-items: center;

          .change-password {
            justify-content: flex-end;
          }

          .btn {
            margin-left: unset;
          }
        }
      }
    }
    .right-container {
      flex: 4;
      .background-image {
        height: 40%;
      }

      .info-details {
        justify-content: space-between;
        margin: 0 20px 20px;
        height: 100%;

        .basic-info {
          .info_title {
            font-weight: 500;
            font-size: 28px;
            text-align: left;
          }

          .control-row {
            display: flex;
            justify-content: space-evenly;

            .control-detail {
              align-items: center;

              label {
                min-width: 150px;
                font-size: 16px;
                text-align: left;
              }

              .control-input {
                width: 400px;
              }
            }
          }
        }

        .info_footer {
          width: 100%;
        }
      }
    }
  }
}
</style>