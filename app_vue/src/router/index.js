import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import DetailsView from '../views/DetailsView.vue'

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
    component: () => import('../views/OrderView.vue')
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: DetailsView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
