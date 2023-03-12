<script setup lang="ts">
import type { CategoryItem } from '@/types'

const apiUrl =
`${location.protocol}//${location.hostname}:`+
`${location.port === "5173" ? "8080" : location.port}` +
`${import.meta.env.BASE_URL}/api`;

let response = await fetch(`${apiUrl}/categories/`)
let data = await response.json()
let categoryList = data as CategoryItem[]
</script>

<style scoped>
.header-dropdown {
  position: relative;
}

.categories-button {
  margin-top: 0.25em;
  background-color: var(--primary-color);
  border-radius: 10px;
  border: none;
  outline: none;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-weight: bold;
  margin-bottom: 0.3em;
}

.header-dropdown ul {
  display: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-radius: 10px;
  border-color: var(--primary-color);
  border-style: solid;
}

li > a {
  display: block;
}

.header-dropdown li a {
  padding: 0.5em 1em;
}

.header-dropdown a {
  /* color: var(--primary-color); */
  text-decoration: none;
}

.header-dropdown li:hover {
  background: lightgray;
  border-radius: 4px;
}

.header-dropdown:hover ul {
  position: absolute;
  z-index: 1;
  display: block;
  min-width: 8em;
  cursor: pointer;
}
</style>

<template>
  <div class="header-dropdown">
    <button class="button categories-button">
      Categories&nbsp;<i class="fa-solid fa-caret-down"></i>
    </button>
    <ul>
      <li v-for="category in categoryList" :key="category.categoryId">
        <router-link :to="'/category/' + category.name">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
