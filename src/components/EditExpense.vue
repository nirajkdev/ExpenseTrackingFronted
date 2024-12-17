<template>
  <div class="edit-expense">
    <h2>Edit Expense</h2>
    <form @submit.prevent="updateExpense">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" v-model="expense.title" id="title" required />
      </div>
      
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input type="number" v-model="expense.amount" id="amount" required />
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <select v-model="expense.category" id="category" required>
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Date:</label>
        <input type="date" v-model="expense.date" id="date" required />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-update">Update</button>
        <button type="button" class="btn btn-cancel" @click="cancelEdit">Cancel</button>
      </div>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      expense: {
        expenseId: '',
        title: '',
        amount: '',
        category: '',
        date: ''
      },
      errorMessage: ''
    };
  },
  created() {
    const expenseId = this.$route.params.expenseId;
    if (expenseId) {
      this.fetchExpenseData(expenseId);
    } else {
      this.errorMessage = 'Expense ID is missing!';
    }
  },
  methods: {
    async fetchExpenseData(expenseId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/expenses/${expenseId}`);
        this.expense = response.data;
      } catch (error) {
        console.error('Error fetching expense data:', error);
        this.errorMessage = 'Error fetching expense data!';
      }
    },
    async updateExpense() {
      try {
        const response = await axios.put(`http://localhost:8080/api/expenses/${this.expense.expenseId}`, this.expense);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error updating expense:', error);
        this.errorMessage = 'Error updating expense!';
      }
    },
    cancelEdit() {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.edit-expense {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

select {
  background-color: #fff;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-update {
  background-color: #4CAF50;
  color: white;
}

.btn-update:hover {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-cancel:hover {
  background-color: #e53935;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>
