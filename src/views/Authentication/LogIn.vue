<template>
  <div>
    <h1 class="heading">Login</h1>
    <form @submit.prevent="submitForm" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <button type="submit" class="btn-login">Log In</button>
    </form>
  </div>
</template>

<style scoped>
.heading {
  color: #333;
  text-align: center;
}

.login-form {
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

input[type="text"],
input[type="password"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-login {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #0056b3;
}
</style>