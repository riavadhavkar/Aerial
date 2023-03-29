<script setup lang="ts">
import { defineProps } from 'vue'
import type { BookItem } from '@/types'
import { useCartStore } from '@/stores/cart'
import { asDollarsAndCents } from '@/price'
const cartStore = useCartStore()

const props = defineProps<{
  book: BookItem
}>()

const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase()
  name = name.replace(/ /g, '-')
  name = name.replace(/'/g, '')
  name = name.replace(/,/g, '')
  name = name.replace(/\?/g, '')
  name = name.replace(/!/g, '')
  return `${name}.jpg`
}
function bookImageUrl(imageFileName: string) {
  return new URL(`../assets/book-images/${imageFileName}`, import.meta.url).href
}
</script>

<style scoped>
.book-box {
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: var(--card-background-color);
  gap: 0.25em;
  /* height: 100%; */
  align-items: center;
  text-align: center;
  border-radius: 4px;
  font-size: large;
}

.book-title {
  font-weight: bolder;
}

.book-author {
  font-style: italic;
}

.book-image img {
  width: 100%;
  border-style: solid;
  border-radius: 4px;
  border-width: 4px;
}

.button.add-to-cart {
  outline: none;
  font-weight: bold;
  border-radius: 8px;
  width: 80%;
  border-style: solid;
  border-color: var(--neutral-color);
}

.button.add-to-cart:hover {
  color: var(--primary-color);
  background-color: var(--neutral-color);
  border-color: var(--primary-color);
  border-style: solid;
}

.book-image-read {
  position: relative;
  border-style: solid;
  border-radius: 4px;
  border-width: 4px;
}

.read-eye-indicator {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--primary-color);
  color: var(--neutral-color);
  border-radius: 50%;
  font-size: 1.5em;
  padding: 0.5em;
  z-index: 0;
  transform: translate(0.62em, -0.62em);
}

.read-overlay {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
  border-radius: 4px;
  width: 100%;
}

.read-button {
  transition: 0.5s ease;
  border-radius: 5px;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  border: none;
  outline: none;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.book-image-read:hover .read-overlay,
.book-image-read:active .read-overlay {
  opacity: 0.3;
  filter: blur(1.5px);
}

.book-image-read:hover .read-button {
  opacity: 1;
  background-color: var(--primary-color);
}

.read-now-text {
  color: var(--neutral-color);
  /* font-size: 16px; */
  /* padding: 16px 32px; */
  padding: 0.5em;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
}
</style>

<template>
  <li class="book-box">
    <div v-bind:class="{ 'book-image': !book.isPublic, 'book-image-read': book.isPublic }">
      <div v-if="book.isPublic" class="read-eye-indicator">
        <i class="fa-solid fa-eye"></i>
      </div>
      <img
        v-bind:class="{ 'read-overlay': book.isPublic }"
        :src="bookImageUrl(bookImageFileName(props.book))"
        :alt="book.title"
      />
      <button v-if="book.isPublic" class="read-button">
        <router-link :to="'/'">
          <div class="read-now-text">Read Now</div>
        </router-link>
      </button>
    </div>
    <div class="book-title">{{ book.title }}</div>
    <div class="book-author">{{ book.author }}</div>
    <div class="book-price">
      ${{ Math.trunc(book.price / 100)
      }}<sup>
        {{
          Math.trunc((Math.abs(book.price / 100) - Math.floor(Math.abs(book.price / 100))) * 100)
        }}
      </sup>
    </div>
    <button class="button add-to-cart" @click="cartStore.addToCart(book)">
      <i class="fa-solid fa-plus"></i>&nbsp;Add to Cart
    </button>
  </li>
</template>
