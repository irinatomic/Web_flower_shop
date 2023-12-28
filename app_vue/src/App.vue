<template>
  <div id="app">
    <Header />
    <nav>
      <router-link to="/">Proizvodi</router-link> |
      <router-link v-if="token" to="/create-order">Kreiraj narudžbinu</router-link> 
      <router-link v-if="!token" to="/login">Prijava</router-link> | 
      <router-link v-if="!token" to="/register">Registracija</router-link> 
      <a v-if="token" href="#" @click="logout">Odjava</a>
    </nav>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
  },
  computed: {
    ...mapState(['token']),
  },
  methods: {
    ...mapMutations(['REMOVE_TOKEN', 'SET_TOKEN']), 
    logout() {
      console.log("ola");
      this.REMOVE_TOKEN();
      this.REMOVE_KORISNIK_ID();
    },
  },
  mounted() {
    if (localStorage.token) {
      this.SET_TOKEN(localStorage.token); 
    }
  },
};
</script>

<style>
/* imports */
@import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');

/* Reset margin and padding for body and #app */
body,
#app {
  margin: 0;
  padding: 0;
}

/* Apply gradient to the whole page */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(#554971, #8aC6d0);
  /* Gradient background */
  min-height: 100vh;
  /* Ensures the gradient covers the entire viewport height */
}

nav {
  padding-top: 20px;
  padding-bottom: 20px;
}

nav a {
  font-weight: bold;
  color: #e2dae8;
}

nav a.router-link-exact-active {
  color: #8aC6d0;
}
</style>
