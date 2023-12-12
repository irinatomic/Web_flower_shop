<template>
  <div class="details-view">
    <ProductDetails :key="localId" :id="localId" />
    <div class="navigation-buttons">
      <button @click="showPrevious" :disabled="isFirstItem">Previous</button>
      <button @click="showNext" :disabled="isLastItem">Next</button>
    </div>
  </div>
</template>

<script>
import ProductDetails from '../components/ProductDetails.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DetailsView',
  components: {
    ProductDetails,
  },
  computed: {
    ...mapState(['productIds', 'currentProductId']),      // From vuex store

    localId() {
      return this.currentProductId;
    },
    currentIndex() {
      return this.productIds.indexOf(this.localId);
    },
    isFirstItem() {
      return this.currentIndex === 0;
    },
    isLastItem() {
      return this.currentIndex === this.productIds.length - 1;
    },
  },
  methods: {
    ...mapActions(['setCurrentProductId']),

    showPrevious() {
      if (this.currentIndex > 0) {
        const newId = this.productIds[this.currentIndex - 1];
        this.setCurrentProductId(newId);
      }
    },
    showNext() {
      if (this.currentIndex < this.productIds.length - 1) {
        const newId = this.productIds[this.currentIndex + 1];
        this.setCurrentProductId(newId);
      }
    },
  },
};
</script>

<style scoped>
.navigation-buttons {
  margin-top: 20px;
}
</style>
