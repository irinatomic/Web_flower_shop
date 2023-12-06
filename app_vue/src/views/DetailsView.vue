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

export default {
  name: 'DetailsView',
  props: {
    id: {
      type: Number,
      required: true,
    },
    productIds: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProductDetails,
  },
  data() {
    return {
      localId: this.id,
      currentIndex: this.productIds.indexOf(this.id),
    };
  },
  computed: {
    isFirstItem() {
      return this.currentIndex === 0;
    },
    isLastItem() {
      return this.currentIndex === this.productIds.length - 1;
    },
  },
  methods: {
    showPrevious() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
        this.localId = this.productIds[this.currentIndex];
      }
    },
    showNext() {
      if (this.currentIndex < this.productIds.length - 1) {
        this.currentIndex += 1;
        this.localId = this.productIds[this.currentIndex];
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
