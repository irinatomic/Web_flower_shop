<template>
    <div class="product-list">
        <!-- Map the fetched products to Product components -->
        <Product v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>
  
<script>
import Product from './Product.vue';

export default {
    name: 'ProductList',
    components: {
        Product
    },
    data() {
        return {
            products: []
        }
    },
    async mounted() {
        try {
            const res = await fetch('http://localhost:9000/proizvod');
            this.products = await res.json();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
}
</script>

<style scoped>
.product-list {
  display: flex;
  justify-content: center;
}

.products-container {
  display: flex;
  flex-wrap: wrap; 
  gap: 20px; 
  max-width: 1200px; 
  margin: 0 auto; 
}
</style>
  