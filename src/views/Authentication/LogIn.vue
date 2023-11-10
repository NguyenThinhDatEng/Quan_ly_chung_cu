<template>
  <div class="full-screen">
    <h1 class="big-heading">Welcome to My Website</h1>
    <div class="login-container">
      <form @submit.prevent="submitForm" class="login-form">
        <h2 class="sub-heading">Please log in to continue</h2>
        <!-- Username field -->
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>

        <!-- Password field -->
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>

        <!-- Remember me and Forgot Password -->
        <div class="form-group">
          <label class="remember-me">
            <input type="checkbox" v-model="remember"> Remember Me
          </label>
          <a href="#" class="forgot-password-link">Forgot Password?</a>
        </div>

        <!-- Submit button -->
        <button type="submit" class="btn-login">Log In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
  font-size: 20px;
  margin-bottom: 20px;
}

.login-container {
  background-color: #ffffff; /* Set your desired color for login form background */
  padding: 100px;
  border-radius: 10px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
}

.login-form {
  margin-top: -50px;
}

.form-group {
  margin-bottom: 20px;
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
  padding: 10px 100px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
}

.btn-login:hover {
  background-color: #0056b3;
}
</style>