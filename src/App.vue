<template>
  <div id="app">
    <router-view></router-view> <!-- Router-view will dynamically display the login or main page -->
  </div>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Login,
  },
};
</script>

<style scoped>
</style>

