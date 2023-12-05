<template>
  <div class="products">
    <button @click="prev()"> Prethodno </button>
    <button @click="next()"> Sledece </button>

    <!-- Include ProductList component -->
    <ProductList/>
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductList
  },
  data() {
    return {
      products: [], // Update with your product data
      current: 0,
      productsPerPage: 10
    };
  },
  methods: {
    next() {
      if ((this.current + 1) * this.productsPerPage < this.products.length) {
        this.current++;
      }
    },
    prev() {
      if (this.current > 0) {
        this.current--;
      }
    },
    getProductIDs() {
      // Logic to get product IDs based on the current slice of data
      const start = this.current * this.productsPerPage;
      const end = start + this.productsPerPage > this.products.length ? this.products.length : start + this.productsPerPage;
      return this.products.slice(start, end).map(product => product.id);
    }
  }
};
</script>

<style scoped>
</style>
