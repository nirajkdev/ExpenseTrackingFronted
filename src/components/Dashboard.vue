<template>
  <div class="dashboard">
    <h2 class="title">Expense Tracker Dashboard</h2>
    
    <div class="navbar">
      <div class="navbar-buttons">
        <button @click="openExpenseForm" class="add-expense-button">Add Expense</button>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>

    <div class="expense-list">
      <h3 class="expense-list-title">All Expenses</h3>
      <button @click="fetchExpenses" class="show-expenses-button">Show All Expenses</button>
      
      <table v-if="expenses.length" class="expense-table">
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.expenseId">
            <td>{{ expense.expenseId }}</td>    
      <td>{{ expense.title }}</td>
      <td>{{ expense.amount }}</td>
      <td>{{ expense.category }}</td>
      <td>{{ expense.date }}</td>
            <td>
              <button @click="editExpense(expense.expenseId)" class="edit-button">Edit</button>
              <button @click="deleteExpense(expense.expenseId)" class="delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="expenses.length" class="total-expenses">
        <h4>Total Expenses: ₹{{ totalExpenses.toFixed(2) }}</h4>
      </div>
      <p v-if="!expenses.length" class="no-expenses-message">No expenses available. Please add some!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      expenses: [], 
      totalExpenses: 0
    };
  },
  created() {
    this.fetchExpenses();
  },
  methods: {
    async fetchExpenses() {
      const userId = localStorage.getItem('userId');  
      console.log(userId); 
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/expenses?userId=${userId}`);
          this.expenses = response.data; 
          this.calculateTotalExpenses();
        } catch (error) {
          console.error('Error fetching expenses:', error);
          this.errorMessage = 'Error fetching expenses!';
        }
      } else {
        this.errorMessage = 'User not logged in!';
      }
    },
    calculateTotalExpenses() {
      this.totalExpenses = this.expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    },
    openExpenseForm() {
      this.$router.push('/add-expense'); 
    },
    editExpense(expenseId) {
      this.$router.push(`/edit-expense/${expenseId}`); 
      console.log(expenseId);
    },

    async deleteExpense(expenseId) {
  const userId = localStorage.getItem('userId'); 

  if (userId) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/expenses/${expenseId}`);
         if (response.status === 200) {
        this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
        this.fetchExpenses();
        console.log('Expense deleted successfully');
      } else {
        console.error('Failed to delete the expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  } else {
    console.error('User ID not found in localStorage');
  }
},
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('jwtToken');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.dashboard {
  background-color: #f4f6f9;
  padding: 30px;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  font-size: 36px;
  color: #333;
  margin-bottom: 40px;
}

.navbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.navbar-buttons {
  display: flex;
  gap: 15px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-expense-button, .show-expenses-button {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.logout-button {
  background-color: #f44336;
  color: white;
  border: none;
}

button:hover {
  background-color: #45a049;
}

.logout-button:hover {
  background-color: #e53935;
}

.expense-list {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.expense-list-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.show-expenses-button {
  display: block;
  width: 200px;
  margin: 0 auto 20px;
  background-color: #4CAF50;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.expense-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
}

.expense-table th, .expense-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.expense-table th {
  background-color: #4CAF50;
  color: white;
}

button.edit-button, button.delete-button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #ff9800;
  color: white;
  border: none;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
}

.edit-button:hover {
  background-color: #fb8c00;
}

.delete-button:hover {
  background-color: #e53935;
}

.no-expenses-message {
  text-align: center;
  color: #777;
  font-size: 16px;
  margin-top: 20px;
}

.total-expenses {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.no-expenses-message {
  text-align: center;
  color: #777;
  font-size: 16px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .navbar-buttons {
    flex-direction: column;
  }

  .expense-list {
    padding: 15px;
  }

  .expense-table th, .expense-table td {
    padding: 8px;
  }

  button {
    font-size: 14px;
  }
}
</style>
