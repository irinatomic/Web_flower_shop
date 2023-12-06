<template>
    <div class="product-details-container">
        <div class="product-details">
            <div v-if="product && Object.keys(product).length !== 0">
                <h2>{{ product.naziv }}</h2>
                <p class="wrap-text"> {{ product.opis }}</p>
                <p>Cena: {{ product.cena }} RSD</p>
                <div v-if="product.cvetovi && product.cvetovi.length">
                    <h3>Cvetovi:</h3>
                    <ul class="flower-list">
                        <li v-for="cvet in product.cvetovi" :key="cvet.id" class="flower-item">
                            {{ cvet.Cvet.naziv }}: {{ cvet.kolicina }}
                        </li>
                    </ul>
                </div>
                <p>Kategorija: {{ product.kategorija.naziv }}</p>
            </div>
            <div v-else>
                Loading...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductDetails',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            product: null
        };
    },
    async mounted() {
        try {
            const res = await fetch(`http://localhost:9000/proizvod/${this.id}`);
            this.product = await res.json();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
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
