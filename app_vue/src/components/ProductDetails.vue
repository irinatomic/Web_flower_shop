<template>
    <div class="product-details-container">
        <div class="product-details">
            <div v-if="currentProduct && Object.keys(currentProduct).length !== 0">
                <h2>{{ currentProduct.naziv }}</h2>
                <p class="wrap-text"> {{ currentProduct.opis }}</p>
                <p>Cena: {{ currentProduct.cena }} RSD</p>
                <div v-if="currentProduct.cvetovi && currentProduct.cvetovi.length">
                    <h3>Cvetovi:</h3>
                    <ul class="flower-list">
                        <li v-for="cvet in currentProduct.cvetovi" :key="cvet.id" class="flower-item">
                            {{ cvet.Cvet.naziv }}: {{ cvet.kolicina }}
                        </li>
                    </ul>
                </div>
                <p>Kategorija: {{ currentProduct.kategorija.naziv }}</p>
            </div>
            <div v-else>
                Loading...
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ProductDetails',
    props: {
        id: {
            type: Number,
            required: true
        }
    },

    computed: {
        ...mapState(['currentProduct'])
    },

    methods: {
        ...mapActions(['fetchProduct'])
    },

    async mounted() {
        await this.fetchProduct(this.id);
    },

};
</script>

<style scoped>
/* Styles for the product details page */
.product-details-container {
    display: flex;
    justify-content: center;
}

.product-details {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 8px;
    max-width: 600px;
    text-align: center;
}

.flower-list {
    list-style: none;
    padding: 0;
}

.flower-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 6px;
}

.wrap-text {
    white-space: pre-wrap;
}
</style>
