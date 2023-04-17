<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()
</script>

<style scoped>
.confirmation-page {
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
.to-shopping {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
}
.back-to-shopping {
  outline: none;
  background-color: var(--primary-color);
  border-color: var(--neutral-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bold;
}
.back-to-shopping:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
}
</style>

<template>
  <div class="confirmation-page">
    <h1><u>Confirmation Page</u></h1>
    <div class="to-shopping">
      <router-link :to="'/category/' + categoryStore.currentCategory">
        <button class="button back-to-shopping">
          <i class="fa-solid fa-bag-shopping"></i>
          Continue Shopping
        </button>
      </router-link>
    </div>
  </div>
</template>
