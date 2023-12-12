<template>
    <div class="product-list">
        <Product v-for="product in products" :key="product.id" :product="product"/>
    </div>
</template>
  
<script>
import Product from './Product.vue';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ProductList',
    components: {
        Product
    },

    computed: {
        ...mapState(['products', 'productIds'])
    },

    methods: {
        ...mapActions(['fetchProducts'])
    },

    async mounted() {
        await this.fetchProducts();       // vuex
    }
};
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
  