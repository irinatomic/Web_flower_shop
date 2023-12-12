<template>
    <div class="product-card">
        <input type="hidden" :value="product.id" />
        <div class="product-info">
            <h2>{{ product.naziv }}</h2>
            <p class="description">{{ product.opis }}</p>
            <p class="category">Kategorija: {{ product.kategorija.naziv }}</p>
            <p class="price">Cena: {{ product.cena }} RSD</p>
        </div>
        <router-link :to="{ name: 'product-details', params: { id: product.id } }">
            <button @click="setCurrentProduct(product.id)"> Detalji </button>
        </router-link>
    </div>
</template>
  
<script>
export default {
    name: 'Product',
    props: {
        product: Object,
    },
    methods: {
        setCurrentProduct(productId) {
            this.$store.dispatch('setCurrentProductId', productId); // Dispatch action to set current product ID
        },
    },
};
</script>
  
  
<style scoped>
.product-card {
    background-color: #f7f7f7;
    border: 1px solid #cccccc;
    border-radius: 10px;
    padding: 20px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 5px;
    overflow: hidden;
}

.description {
    font-style: italic;
    overflow: hidden;
    /* Hide overflowing content */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    /* Limit number of lines */
    line-height: 1.4;
    /* Line height for multiline truncation */
}
</style>
  