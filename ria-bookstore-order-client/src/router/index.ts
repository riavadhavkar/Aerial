import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:name',
      name: 'category-view',
      component: CategoryView
    },
    {
      path: '/cart',
      name: 'cart-view',
      component: CartView
    },
    {
      path: '/checkout',
      name: 'checkout-view',
      component: CheckoutView
    },
    {
      path: '/confirmation',
      name: 'confirmation-view',
      component: ConfirmationView
    },
  ]
})

export default router
