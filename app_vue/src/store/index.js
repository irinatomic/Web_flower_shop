import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        productIds: [],
        currentProductId: null,         // being viewed
    },

    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
            state.productIds = products.map(product => product.id);
        },
        SET_CURRENT_PRODUCT_ID(state, productId) {
            state.currentProductId = productId;
        }
    },

    actions: {
        async fetchProducts({ commit }) {
            try {
                const res = await fetch('http://localhost:9000/proizvod');
                const products = await res.json();
                commit('SET_PRODUCTS', products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },

        setCurrentProductId({ commit }, productId) {
            commit('SET_CURRENT_PRODUCT_ID', productId);
        }
    },

    getters: {},
    modules: {}
});


