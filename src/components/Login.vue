<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-heading">Login to Expense Tracking Application</h2>
      
      <form @submit.prevent="login" class="form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn">Login</button>

        <div v-if="errorMessage" class="error-message">
          <p>{{ errorMessage }}</p>
        </div>

        <div class="register-link">
          <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/users/login', {
          username: this.username,
          password: this.password,
        });

        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          this.$router.push({ name: 'dashboard' });
        } else {
          this.errorMessage = 'Invalid username or password!';
        }
      } catch (error) {
        this.errorMessage = 'Error during login!';
      }
    },
  },
};
</script>

<style scoped>

.login-page {
  background-color: #f1f5f8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
}

.login-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-heading {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  margin-top: 8px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

.register-link p {
  font-size: 14px;
}

.register-link a {
  color: #007bff;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    padding: 25px;
  }

  .login-heading {
    font-size: 20px;
  }

  button {
    padding: 10px;
  }
}
</style>
