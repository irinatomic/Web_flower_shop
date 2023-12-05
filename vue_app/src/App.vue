<template>
  <div id="app">
    <Header :title="headerTitle" />
    <nav>
      <router-link to="/"> Proizvodi </router-link> |
      <router-link to="/create-order"> Kreiraj narudžbinu </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      headerTitle: 'Cvecara "Bozur"',
    }
  }
}
</script>

<style>
/* imports */
@import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');

/* Reset margin and padding for body and #app */
body, #app {
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
  background: linear-gradient(#554971, #8aC6d0); /* Gradient background */
  min-height: 100vh; /* Ensures the gradient covers the entire viewport height */
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
