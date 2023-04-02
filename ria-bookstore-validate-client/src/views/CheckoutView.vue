<script setup lang="ts"></script>

<style scoped>
.checkout-page {
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

.to-cart {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
}

.back-to-cart {
  outline: none;
  background-color: var(--primary-color);
  border-color: var(--neutral-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bold;
}

.back-to-cart:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
}
</style>

<template>
  <div class="checkout-page">
    <h1><u>Checkout Page</u></h1>
    <div class="to-cart">
        <router-link :to="{ name: 'cart-view' }">
          <button class="button back-to-cart">
            <i class="fa-solid fa-bag-shopping"></i>
            Back to Cart
          </button>
        </router-link>
      </div>
  </div>
</template>
