import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// No routes defined as we're not using routing for multiple views/components

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // No routes to define
})

export default router
