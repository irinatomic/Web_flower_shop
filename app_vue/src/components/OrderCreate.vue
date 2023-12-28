<template>
    <div class="container">
        <div class="order-form">
            <div v-if="submissionStatus === 'success'" class="success-message">
                Order submitted successfully! Thank you!
            </div>
            <form @submit.prevent="submitOrder">
                <label for="zakazano_vreme">Zakazano Vreme:</label>
                <input type="datetime-local" id="zakazano_vreme" v-model="order.zakazano_vreme" required>
                <span v-if="!isTimeValid" class="error-message"> Vreme mora biti minimum 24h od sada </span>

                <label for="adresa">Adresa:</label>
                <input type="text" id="adresa" v-model="order.adresa" required>
                <span v-if="!isAdresaValid" class="error-message"> Adresa mora da sadrži slova i brojeve </span>

                <label for="telefon">Telefon:</label>
                <input type="tel" id="telefon" v-model="order.telefon" pattern="[0-9]+" required>
                <span v-if="!isTelefonValid" class="error-message"> Telefon mora da sadrži samo brojeve </span>

                <label for="email">Email:</label>
                <input type="email" id="email" v-model="order.email" required>
                <span v-if="!isEmailValid" class="error-message"> Email mora biti formata example@email.com </span>

                <label for="ime_prezime">Ime i Prezime:</label>
                <input type="text" id="ime_prezime" v-model="order.ime_prezime" required>
                <span v-if="!isImePrezimeValid" class="error-message"> Ime i prezime mora da sadrži samo slova </span>

                <label for="sadrzaj">Sadrzaj:</label>

                <div class="row">
                    <div class="col-md-6">
                        <label for="spisak-cvetova">Cvetovi:</label>
                        <div class="input-group mb-3">
                            <select class="form-select" id="spisak-cvetova" v-model="selectedProduct">
                                <option v-for="product in products" :key="product.id" :value="product.id">
                                    {{ product.naziv }}
                                </option>
                            </select>
                            <select class="form-select" id="broj-komada" v-model="selectedAmount">
                                <option v-for="amount in [1, 2, 3, 4, 5]" :key="amount" :value="amount">
                                    {{ amount }}
                                </option>
                            </select>
                            <button class="btn btn-success" type="button" @click="addToOrder">+</button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="izabrano">Izabrano:</label>
                        <div id="izabrano">
                            <div v-for="(amount, productId) in order.sadrzaj" :key="productId">
                                <template v-if="getProductById(productId)">
                                    {{ getProductById(productId).naziv }} x {{ amount }} -
                                    {{ getProductById(productId).cena * amount }} din
                                    <button @click="removeFromOrder(productId)">Remove</button>
                                </template>
                            </div>
                        </div>
                        <div v-if="Object.keys(order.sadrzaj).length > 0">
                            Total Price: {{ calculateTotalPrice() }} RSD
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <button type="submit" @click.prevent="submitOrder">Posalji narudžbinu</button>
    </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'OrderForm',
    data() {
        return {
            order: {
                zakazano_vreme: '',
                adresa: '',
                telefon: '',
                email: '',
                ime_prezime: '',
                korisnik_id: '',
                sadrzaj: {}
            },
            selectedProduct: null,
            selectedAmount: 1,
            submissionStatus: null,
            isTimeValid: true,
            isAdresaValid: true,
            isTelefonValid: true,
            isEmailValid: true,
            isImePrezimeValid: true,
        };
    },

    // on load of the side all the products are fetched
    // so no need to refetch them
    computed: {
        ...mapState(['products'])
    },
    
    methods: {
        calculateTotalPrice() {
            let totalPrice = 0;
            for (const [productId, amount] of Object.entries(this.order.sadrzaj)) {
                const product = this.getProductById(productId);
                totalPrice += product.cena * amount;
            }
            return totalPrice;
        },

        addToOrder() {
            const productId = document.getElementById('spisak-cvetova').value;
            const amount = document.getElementById('broj-komada').value;

            if (this.order.sadrzaj.hasOwnProperty(productId)) {
                this.order.sadrzaj[productId] += parseInt(amount);
            } else {
                this.$set(this.order.sadrzaj, productId, parseInt(amount));
            }
        },

        removeFromOrder(productId) {
            this.$delete(this.order.sadrzaj, productId);
        },

        getProductById(productId) {
            return this.products.find(product => product.id === parseInt(productId));
        },

        clearOrderForm() {
            this.order = {
                zakazano_vreme: '',
                adresa: '',
                telefon: '',
                email: '',
                ime_prezime: '',
                sadrzaj: {}
            };
            this.selectedProduct = null;
            this.selectedAmount = 1;

            this.submissionStatus = 'success';
            setTimeout(() => {
                this.submissionStatus = null; // Reset the status after some time 
            }, 5000);
        },

        validateOrder() {

            const vreme = this.order.zakazano_vreme;
            if (vreme == null) {
                this.isTimeValid = false;
            }

            // Orer must be at least 24h from now
            const selectedTime = new Date(vreme).getTime();
            const currentTime = new Date().getTime();
            const futureTime = currentTime + 24 * 60 * 60 * 1000; // Adding 24 hours

            this.isTimeValid = selectedTime >= futureTime;

            const adresaRegex = /^[a-zA-Z][a-zA-Z0-9\s,'-]*$/;
            const telefonRegex = /^[0-9]+$/;
            const emailRegex = /^[^@]+@\w+\.\w+$/;
            const ime_prezimeRegex = /^[a-zA-Z][a-zA-Z\s]*$/;

            this.isAdresaValid = adresaRegex.test(this.order.adresa);
            this.isTelefonValid = telefonRegex.test(this.order.telefon);
            this.isEmailValid = emailRegex.test(this.order.email);
            this.isImePrezimeValid = ime_prezimeRegex.test(this.order.ime_prezime);

            return (
                this.isTimeValid &&
                this.isAdresaValid &&
                this.isTelefonValid &&
                this.isEmailValid &&
                this.isImePrezimeValid
            );
        },

        async submitOrder() {
            if (!this.validateOrder()) {
                console.log("Incorrect order input")
                return;
            }

            this.order.korisnik_id = this.$store.state.korisnik_id;
            await this.$store.dispatch('sendOrder', this.order);
            const orderStatus = this.$store.state.orderStatus;
            if(orderStatus === 'success') {
                this.clearOrderForm();
            }
        }
    }
};
</script>
  
<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 60%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: auto;
}

.order-form {
    display: flex;
    flex-direction: column;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
    font-weight: bold;
}

input,
select {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.row {
    display: flex;
    justify-content: space-between;
}

.col-md-6 {
    width: 48%;
}

.input-group select {
    margin-right: 2px;
}

.input-group button {
    margin-left: 2px;
}

.btn {
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
}

.btn:hover {
    background-color: #45a049;
}

#izabrano div {
    margin-bottom: 10px;
}

button {
    margin-top: 10px;
}

.error-message {
    display: block;
    background-color: #eb1c6c;
    color: #ffffff;
    padding: 8px;
    border-radius: 0 0 8px 8px;
    font-size: 0.9em;
    opacity: 0.7;
    margin-top: -10px;
    margin-bottom: 10px;
}
</style>