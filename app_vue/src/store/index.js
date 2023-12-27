import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        productIds: [],
        currentProduct: {},                    // being viewed info
        currentProductId: null,                // being viewed id
        orderStatus: null,                     // order status - success or error
        token: '',                             // user token
    },

    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
            state.productIds = products.map(product => product.id);
        },
        SET_CURRENT_PRODUCT_ID(state, productId) {
            state.currentProductId = productId;
        },
        SET_CURRENT_PRODUCT(state, product) {
            state.currentProduct = product;
        },
        SET_ORDER_STATUS(state, status) {
            state.orderStatus = status;
        },
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.token = token;
        },
        REMOVE_TOKEN(state) {
            state.token = '';
            localStorage.token = '';
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

        async fetchProduct({ commit }, productId) {
            try {
                const res = await fetch(`http://localhost:9000/proizvod/${productId}`);
                const product = await res.json();
                commit('SET_CURRENT_PRODUCT', product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },

        async sendOrder({ commit }, order) {
            try {
                const response = await fetch('http://localhost:9000/narudzbina', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                });

                // set order status
                if (response.ok) commit('SET_ORDER_STATUS', 'success');
                else commit('SET_ORDER_STATUS', 'error');

            } catch (error) {
                console.error('Error submitting order:', error);
            }
        },

        setCurrentProductId({ commit }, productId) {
            commit('SET_CURRENT_PRODUCT_ID', productId);
        },

        async register({ commit }, obj) {
            console.log(JSON.stringify(obj));
            const response = await fetch('http://127.0.0.1:9001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            });

            const json = await response.json();
            commit('SET_TOKEN', json.token);
        },

        async login({ commit }, obj) {
            const response = await fetch('http://127.0.0.1:9001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            })

            const json = await response.json();
            if(json.token) 
                commit('SET_TOKEN', json.token);
            else 
                alert('Login failed');
        }
    },

    getters: {},
    modules: {}
});


