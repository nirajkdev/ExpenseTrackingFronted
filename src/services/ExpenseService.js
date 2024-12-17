// src/services/expenseService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/expenses';

export const getExpenses = async (id) => {
  try {
    const response = await axios.get(API_URL, { params: { id } });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    const response = await axios.post(API_URL, expense);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};
