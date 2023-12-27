<template>
  <div id="app">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email address:</label>
        <input id="email" v-model="form.email" type="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="name">Username:</label>
        <input id="name" v-model="form.username" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="form.password" type="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['register']),
    async onSubmit() {
      try {
        await this.register(this.form);
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }
};
</script>

<style scoped></style>
