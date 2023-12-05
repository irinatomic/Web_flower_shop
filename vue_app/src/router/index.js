import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsView from '../views/ProductsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductsView
  },
  {
    path: '/create-order',
    name: 'create-order',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
