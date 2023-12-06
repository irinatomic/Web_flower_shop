<template>
  <div class="order-view">
      <OrderCreate/>
  </div>
</template>

<script>
import OrderCreate from '../components/OrderCreate.vue';

export default {
  name: 'OrderView',
  components: {
    OrderCreate
  }
};
</script>