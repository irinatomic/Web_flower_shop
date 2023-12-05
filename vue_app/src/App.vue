<template>
  <div class="app">
    <Header :title="headerTitle" />
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
      allProducts: [],
      currentProduct: 0,
    }
  }
}
</script>

<style>
/* imports */
@import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
