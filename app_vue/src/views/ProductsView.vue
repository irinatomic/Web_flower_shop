<template>
  <div class="products-view">
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
      products: [], 
      current: 0,
      productsPerPage: 10
    };
  },
};
</script>

<style scoped>
</style>
