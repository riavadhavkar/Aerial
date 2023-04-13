<script setup lang="ts">
import type { PopularItem } from '@/types'
import { usePopularStore } from '@/stores/popular'
import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()

const popularStore = usePopularStore()
popularStore.fetchPopular()

const popularImageFileName = function (popularItem: PopularItem): string {
  let name = popularItem.title.toLowerCase()
  name = name.replace(/ /g, '-')
  name = name.replace(/'/g, '')
  name = name.replace(/,/g, '')
  name = name.replace(/\?/g, '')
  name = name.replace(/!/g, '')
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
  justify-content: center;
  align-items: center;
  gap: 1em;
}

li {
  text-align: center;
  cursor: pointer;
  flex-wrap: wrap;
  width: 18%;
}

li div {
  margin-bottom: -2em;
  padding: 0.5em 0;
  background: rgba(0, 0, 0, 0.5); /* last # is percent opacity */
  color: white;
  transform: translateY(-2.25em);
}

.popular-image {
  border-radius: 10px;
  position: relative;
}

.popular-image:hover {
  transform: scale(1.08);
  transition: 0.5s ease;
}

.fa-solid {
  color: var(--neutral-color);
  cursor: pointer;
  position: relative;
  z-index: 1;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: var(--primary-color);
}

.fa-circle-chevron-left {
  transform: translateX(80%);
}

.fa-circle-chevron-right {
  transform: translateX(-80%);
}
</style>

<template>
  <ul class="popular-images container">
    <i class="fa-solid fa-circle-chevron-left fa-2xl" @click="popularStore.backward()"></i>

    <li v-for="popularItem in popularStore.getCarouselItems" :key="popularItem.bookId">
      <router-link :to="`../category/` + categoryStore.getNameFromID(popularItem.categoryId)">
        <img
          class="popular-image"
          :src="popularImageUrl(popularImageFileName(popularItem))"
          :alt="popularItem.title"
        />
      </router-link>
    </li>

    <i class="fa-solid fa-circle-chevron-right fa-2xl" @click="popularStore.forward()"></i>
  </ul>
</template>
