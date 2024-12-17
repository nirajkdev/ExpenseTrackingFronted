// router/index.js

import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router for Vue 3
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import ExpenseForm from '../components/AddExpense.vue'; 
import RegistrationPage from '@/components/RegistrationPage.vue';
import EditExpense from '@/components/EditExpense.vue';// Uncommented the ExpenseForm import

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: false }, // Protect the dashboard with authentication
  },
  {
    path: '/add-expense',
    name: 'add-expense',
    component: ExpenseForm,
    meta: { requiresAuth: false }, // Protect add-expense with authentication
  },
  // {
  //   path: '/edit-expense/:expenseId',
  //   name: 'edit-expense',
  //   component: EditExpense,
  //   props: true, // This will pass the `expenseId` as a prop to the EditExpense component
  // },
  {
    path: '/edit-expense/:expenseId',
    name: 'edit-expense',
    component: EditExpense,
    meta: { requiresAuth: false }, // Protect edit-expense with authentication
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login', // Redirect to login page for undefined routes
  },
];

// Create the Vue Router instance using the new Vue 3 API
const router = createRouter({
  history: createWebHistory(), // This uses the HTML5 History API
  routes,
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is logged in by checking if the token is in localStorage
    if (!localStorage.getItem('auth_token')) {
      next('/login'); // Redirect to login if not authenticated
    } else {
      next(); // Proceed if authenticated
    }
  } else {
    next(); // Always allow unauthenticated access to login
  }
});

export default router;
