<script setup lang="ts">
import { inject } from 'vue'
import type { CategoryItem } from '@/types'
const categoryList = inject('categoryList') as CategoryItem[]
const categoryLinkName = function (category: CategoryItem): string {
  let name = category.name.toLowerCase()
  name = name.replace(/ /g, '-')
  name = name.replace(/'/g, '')
  return `${name}`
}
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
        <router-link :to="'/category/' + categoryLinkName(category)" class="button category-button">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
