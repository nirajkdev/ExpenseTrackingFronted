<template>
  <div class="expense-form">
    <h2>Add Expense</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          required
          placeholder="Enter expense title"
        />
      </div>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          type="number"
          id="amount"
          v-model="formData.amount"
          required
          placeholder="Enter amount"
          min="0"
        />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="formData.category" required>
          <option value="" disabled>Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="date"
          id="date"
          v-model="formData.date"
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Add Expense</button>
        <router-link to="/dashboard" class="btn btn-cancel">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  data() {
    return {
      formData: {
        title: '',
        amount: '',
        category: '',
        date: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const userId = localStorage.getItem('userId'); 
        const jwtToken = localStorage.getItem('jwtToken'); 

        if (!userId) {
          throw new Error('User not logged in');
        }
        const payload = {
          title: this.formData.title,
          amount: this.formData.amount,
          category: this.formData.category,
          date: this.formData.date,
          user: {
            id: userId, 
          },
        };
        const response = await axios.post(
          'http://localhost:8080/api/expenses',
          payload,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`, 
            },
          }
        );

        if (response.status === 200) {
          console.log('Expense added successfully');
          this.$router.push('/dashboard'); 
        } else {
          console.error('Error adding expense');
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>

<style scoped>
.expense-form {
  max-width: 500px;
  margin: 30px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 25px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f8f8f8;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #007bff;
}
button,
.router-link-active {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

.btn-cancel {
  padding: 12px 4px;
  background-color: #dc3545;
  display: inline-block;
  text-align: center;
  border-radius: 6px;
  font-size: 16px;
  color: white;
  text-decoration: none;
  width: 100%; 
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #c82333; 
}

@media (max-width: 768px) {
  .expense-form {
    padding: 20px;
  }

  h2 {
    font-size: 26px;
  }

  input,
  select,
  button {
    padding: 10px;
  }
}
</style>
