<script setup lang="ts">
import type { CategoryItem } from '@/types'

const apiUrl =
`${location.protocol}//${location.hostname}:`+
`${location.port === "5173" ? "8080" : location.port}` +
`${import.meta.env.BASE_URL}/api`;

let response = await fetch(`${apiUrl}/categories/`);
let data = await response.json();
let categoryList = data as CategoryItem[];
</script>

<style scoped>
.category-nav {
  border-top: 0.1em solid var(--primary-color);
}
.category-buttons {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  padding: 0.5em;
  gap: 0.5em;
  background-color: var(--neutral-color);
  font-family: var(--title-font-family);
  font-weight: bold;
}

.button.category-button.router-link-active {
  background-color: var(--primary-color);
  color: var(--neutral-color);
  font-weight: bold;
  /* text-transform: uppercase; */
}

.button.category-button {
  background-color: var(--neutral-color);
  color: var(--primary-color);
}

.button.category-button:hover,
.button.category-button:active {
  background-color: var(--primary-color);
  color: var(--neutral-color);
}
</style>

<template>
  <nav class="category-nav">
    <ul class="category-buttons">
      <li v-for="category in categoryList" :key="category.categoryId">
        <router-link class="button category-button" :to="'/category/' + category.name">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
