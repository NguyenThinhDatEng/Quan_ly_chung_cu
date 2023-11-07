<template>
  </form>
    <h3>Login</h3>

    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" placeholder="Email"/>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" placeholder="Password"/>
    <div>

    <button class="btn btn-primary btn-block">Login</button>
  </form>
</template>


<script>
// Libraries
</script>

<style scoped>
.heading {
  font-size: 24px;
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
.square {
  width: 200px;
  height: 200px;
  background-color: #007bff;
  margin: 20px auto;
}
</style>
