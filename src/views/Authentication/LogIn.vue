<template>
  <div class="full-screen">
    <h1 class="big-heading">Phần mềm quản lý chung cư</h1>
    <div class="login-container" v-loading="loading">
      <form @submit.prevent="submitForm" class="login-form">
        <div class="sub-heading mb-4 mt-4">{{ title.form }}</div>
        <!-- Username field -->
        <div class="form-group flex">
          <label for="username">Tài khoản:</label>
          <input
            v-if="isRegisterForm"
            type="text"
            id="username"
            v-model="model.username"
            required
          />
          <input
            v-else
            type="text"
            id="username"
            v-model="model.usernameOrEmail"
            required
          />
        </div>

        <!-- Password field -->
        <div class="form-group flex">
          <label for="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            v-model="model.password"
            required
          />
        </div>

        <div class="form-group">
          <a href="#" class="forgot-password-link" @click.stop="toggleForm">{{
            title.sub
          }}</a>
        </div>

        <!-- Submit button -->
        <button type="submit" class="btn-login mt-2 mb-2">
          {{ title.submitBtn }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useLogin } from "./login";

export default {
  setup() {
    const login = useLogin();
    return login;
  },
};
</script>

<style scoped lang="scss">
.full-screen {
  background-color: #e9d9d9; /* Set your desired color for full screen background */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.big-heading {
  text-align: center;
  font-size: 32px;
  margin-bottom: 50px;
}

.sub-heading {
  text-align: center;
  font-size: 24px;
  font-weight: 550;
}

.login-container {
  background-color: #ffffff; /* Set your desired color for login form background */
  padding: 0 50px;
  border-radius: 10px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
}

.form-group {
  margin-bottom: 20px;
  align-items: center;

  label {
    min-width: 100px;
  }
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 18px;
}

input[type="text"],
input[type="password"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.remember-me {
  display: inline-block;
  margin-right: 10px;
  font-size: 14px;
  color: #666;
}

.forgot-password-link {
  color: #007bff;
  font-size: 14px;
  text-decoration: none;
}

.btn-login {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  min-width: 80px;
}

.btn-login:hover {
  background-color: #0056b3;
}
</style>