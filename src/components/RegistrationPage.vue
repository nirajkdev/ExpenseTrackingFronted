<template>
  <div class="register-page">
    <div class="register-container">
      <h2 class="register-title">Register</h2>
      <form @submit.prevent="register" class="form" autocomplete="on">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
            autocomplete="username" 
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
            autocomplete="new-password"  
          />
        </div>

        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="fullName"
            placeholder="Enter your full name"
            required
            autocomplete="name"  
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
            autocomplete="email" 
          />
        </div>

        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            v-model="phoneNumber"
            placeholder="Enter your phone number"
            required
            autocomplete="tel"  
          />
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <textarea
            id="address"
            v-model="address"
            placeholder="Enter your address"
            rows="4"
            autocomplete="street-address"  
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn">Register</button>
          <button type="button" class="cancel-btn" @click="cancelRegistration">Cancel</button>
        </div>

        <div v-if="errorMessage" class="error-message">
          <p>{{ errorMessage }}</p>
        </div>

        <div v-if="successMessage" class="success-message">
          <p>{{ successMessage }}</p>
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
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          username: this.username,
          password: this.password,
          fullName: this.fullName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          address: this.address,
        });

        if (response.status === 200) {
          this.successMessage = 'Registration successful! You can now login.';
          setTimeout(() => {
            this.$router.push({ name: 'login' });
          }, 3000);
        }

      } catch (error) {
        this.errorMessage = 'Registration failed! Please try again.';
      }
    },

    cancelRegistration() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f7fa;
  font-family: 'Arial', sans-serif;
}

.register-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
}

.register-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

input, textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

input:focus, textarea:focus {
  border-color: #4CAF50;
}

textarea {
  resize: vertical;
}

button {
  padding: 12px;
  border: none;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.cancel-btn {
  padding: 12px;
  border: none;
  background-color: #f44336;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.cancel-btn:hover {
  background-color: #e53935;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message, .success-message {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}

.register-link {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-container {
    padding: 20px;
  }

  .register-title {
    font-size: 24px;
  }

  input, button, .cancel-btn {
    font-size: 14px;
    padding: 10px;
  }

  textarea {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
