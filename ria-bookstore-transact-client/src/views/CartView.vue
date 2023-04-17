<script setup lang="ts">
import CartTable from '@/components/CartTable.vue'
import { useCategoryStore } from '@/stores/category'
import { useCartStore } from '@/stores/cart'
import { asDollarsAndCents } from '@/price'
const categoryStore = useCategoryStore()
const cartStore = useCartStore()

const clearCart = function () {
  cartStore.clearCart()
}
</script>

<style scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  background-image: url('/site-images/background.png');
  background-position: center;
  background-size: cover;
}

h1 {
  font-family: var(--default-font-family);
  margin-top: 1em;
  text-align: center;
  color: var(--neutral-color);
}

h2 {
  font-family: var(--default-font-family);
  text-align: center;
  color: var(--neutral-color);
  line-height: 1.5em;
}

.cart-page-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
  gap: 38em;
}

.empty-cart {
  outline: none;
  background-color: var(--primary-color);
  border-color: var(--neutral-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
}

.empty-cart:hover {
  background-color: var(--primary-color);
  color: var(--neutral-color);
  border-color: var(--neutral-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  /* font-weight: bold; */
  transition: 0.5s ease;
}

.recent-category {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bold;
}

.recent-category:hover {
  outline: none;
  background-color: var(--primary-color);
  border-color: var(--neutral-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bold;
}

.checkout {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  font-size: xx-large;
}

.checkout:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  transition: all 0.1s ease-in-out;
  transform: scale(1.08);
}

.back-to-shopping {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  font-size: x-large;
  margin: 0.5em auto;
}

.back-to-shopping:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  transition: all 0.1s ease-in-out;
  transform: scale(1.08);
}
</style>

<template>
  <div v-if="cartStore.count != 0" class="cart-page">
    <h1><u>Cart Summary</u></h1>
    <section class="cart-page-buttons">
      <div class="clear-cart">
        <button class="button empty-cart" @click="clearCart">
          <i class="fa-solid fa-ban"></i>
          Clear Cart
        </button>
      </div>
      <div class="continue-shopping">
        <router-link :to="'/category/' + categoryStore.currentCategory">
          <button class="button recent-category">
            <i class="fa-solid fa-basket-shopping"></i>
            Continue Shopping
          </button>
        </router-link>
      </div>
    </section>
    <cart-table></cart-table>
    <h2 v-if="cartStore.count != 1">
      Subtotal ({{ cartStore.count }} items) =
      {{ asDollarsAndCents(cartStore.computeSubtotal, false) }}
    </h2>
    <h2 v-else>
      Subtotal ({{ cartStore.count }} item) =
      {{ asDollarsAndCents(cartStore.computeSubtotal, false) }}
    </h2>
    <section class="cart-page-buttons">
      <div class="proceed-to-checkout">
        <router-link :to="{ name: 'checkout-view' }">
          <button class="button checkout">
            <i class="fa-solid fa-truck-arrow-right"></i>
            CHECKOUT
          </button>
        </router-link>
      </div>
    </section>
  </div>
  <div v-else class="cart-page">
    <h1><u>Cart Summary</u></h1>
    <h2>
      Your cart is empty. <br />
      Please add some comics to your cart before proceeding to checkout.
    </h2>
    <div class="return-to-shopping">
      <router-link :to="'/category/' + categoryStore.currentCategory">
        <button class="button back-to-shopping">
          <i class="fa-solid fa-basket-shopping"></i>
          Return to Shopping
        </button>
      </router-link>
    </div>
  </div>
</template>
