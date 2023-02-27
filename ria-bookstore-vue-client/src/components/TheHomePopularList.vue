<script setup lang="ts">
import { inject } from 'vue'
import type { PopularItem } from '@/types'
const popularList = inject('popularList') as PopularItem[]
const popularImageFileName = function (popularItem: PopularItem): string {
  let name = popularItem.title.toLowerCase()
  name = name.replace(/ /g, '-')
  name = name.replace(/'/g, '')
  return `${name}.jpg`
}
function popularImageUrl(imageFileName: string) {
  return new URL(`../assets/popular-images/${imageFileName}`, import.meta.url).href
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

li {
  text-align: center;
  cursor: pointer;
  width: 18%;
}

li div {
  margin-bottom: -2em;
  padding: 0.5em 0;
  background: rgba(0, 0, 0, 0.5); /* last # is percent opacity */
  color: white;
  transform: translateY(-2.25em);
}

img {
  border-radius: 10px;
}
</style>

<template>
  <ul>
    <li v-for="popularItem in popularList" :key="popularItem.itemId">
      <router-link :to="'../category/popular'">
        <img
          class="popular-image"
          :src="popularImageUrl(popularImageFileName(popularItem))"
          :alt="popularItem.title"
        />
        <!-- <div>{{ category.name }}</div> -->
      </router-link>
    </li>
  </ul>
</template>
