<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useCategoryStore } from '@/stores/category'

const route = useRoute()

const categoryStore = useCategoryStore()
categoryStore.fetchCategories()
</script>

<style scoped>
.app {
  height: 100vh;
}
</style>

<template>
  <div id="app" class="app">
    <the-header></the-header>
    <router-view :key="route.fullPath"></router-view>
    <the-footer></the-footer>
  </div>
</template>
