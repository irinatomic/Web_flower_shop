<template class="template">
  <div class="products">
    <button @click="prev()"> Prethodno </button>
    <button @click="next()"> Sledece </button>
  </div>
</template>
  
<script>
export default {
  name: 'ProductsView',
  data() {
    return {
      products: null,
      current: 0
    }
  },
  methods: {
    next() {
      if (this.current * 10 < this.sviStudenti.length) {
        this.current++;
      }
    },
    prev() {
      if (this.current > 0) {
        this.current--;
      }
    }
  },
  async mounted() {
    const res = await fetch('http://localhost:9000/proizvod');
    this.products = await res.json();
  }
}
</script>
  
<style scoped></style>