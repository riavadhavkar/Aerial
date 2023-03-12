<script setup lang="ts">
import type { BookItem } from '@/types'
import TheCategoryNav from '@/components/TheCategoryNav.vue'
import TheCategoryBookList from '@/components/TheCategoryBookList.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

const apiUrl =
`${location.protocol}//${location.hostname}:`+
`${location.port === "5173" ? "8080" : location.port}` +
`${import.meta.env.BASE_URL}/api`;

let response = await fetch(
  `${apiUrl}/categories/name/${route.params.name}/books/`
)
let data = await response.json();
let bookList = data as BookItem[];
</script>

<style scoped>
.category-page {
  background-image: url('/site-images/background.png');
  background-position: center;
  background-size: cover;
}
</style>

<template>
  <div class="category-page">
    <the-category-nav></the-category-nav>
    <the-category-book-list :bookList="bookList"> </the-category-book-list>
  </div>
</template>
