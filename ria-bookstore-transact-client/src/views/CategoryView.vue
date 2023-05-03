<script setup lang="ts">
import TheCategoryNav from '@/components/TheCategoryNav.vue'
import TheCategoryBookList from '@/components/TheCategoryBookList.vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/book'
import { watch } from 'vue'
import { useCategoryStore } from '@/stores/category'
import router from '@/router'
const categoryStore = useCategoryStore()
const route = useRoute()
const bookStore = useBookStore()

watch(
  () => route.params.name,
  (newName) => {
    bookStore.fetchBooks(newName as string).catch(() => router.push("/not-found"))
    categoryStore.getRecentCategory(newName as string)
  },
  { immediate: true }
)
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
    <the-category-book-list></the-category-book-list>
  </div>
</template>
