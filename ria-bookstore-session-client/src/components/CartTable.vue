<script setup lang="ts">
import type { BookItem } from '@/types'
import { useCartStore } from '@/stores/cart'
import { asDollarsAndCents } from '@/price';
const cartStore = useCartStore()

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
const updateCart = function (book: BookItem, quantity: number) {
  cartStore.updateBookQuantity(book, quantity)
}
</script>

<style scoped>
.cart-table {
  display: grid;
  grid-template-columns: max-content minmax(max-content, 20em) repeat(3, minmax(max-content, 10em)) max-content;
  row-gap: 1em;
  width: max-content;
  margin: 0 auto;
  background-color: var(--neutral-color);
}

ul {
  display: contents;
}

ul > li {
  display: contents;
}

.table-heading {
  background-color: var(--primary-color);
  color: var(--neutral-color);
  font-weight: bold;
}

.table-heading > * {
  background-color: var(--primary-color);
  padding: 0.5em;
}

.heading-book {
  grid-column: 1 / 3;
  text-align: center;
  padding-left: 1em;
}

.heading-price {
  grid-column: 3 / 4;
  text-align: center;
}

.heading-quantity {
  grid-column: 4 / 5;
  text-align: center;
}

.heading-subtotal {
  grid-column: 5 / 6;
  text-align: center;
}

.heading-remove {
  grid-column: -2 / -1;
  text-align: center;
}

.cart-book-image {
  padding: 0 1em;
}

.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  display: block;
  width: 100px;
  height: auto;
  border-style: solid;
  border-radius: 4px;
  border-width: 2px;
}

.square {
  width: 100px;
  height: 100px;
}

.wide-rect {
  width: 125px;
  height: 100px;
}

.cart-book-title {
  display: flex;
  align-items: center;

  font-weight: bold;
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-price {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
  text-align: left;
}

.cart-book-quantity {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-subtotal {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 2px;
  background-color: var(--primary-color);
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

.icon-button {
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
}

.inc-button {
  /* font-size: 1.125rem; */
  /* color: var(--primary-color); */
  margin-right: 0.25em;
}

.inc-button:hover {
  /* color: var(--primary-color-dark); */
}

.dec-button {
  /* font-size: 1.125rem; */
  /* color: var(--neutral-color);
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: var(--primary-color); */
}

.dec-button:hover {
  /* color: #aaa; */
}

/* Chevron buttons

.dec-arrow-button,
.inc-arrow-button {
  font-size: 1rem;
  color: var(--primary-color);
}

.dec-arrow-button:hover,
.inc-arrow-button:hover {
  color: var(--primary-color-dark);
} */

input[type='number'] {
  width: 4em;
}

select {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color-dark);
  border-radius: 3px;
}
/* .cart-book-image {
  height: 50px;
  width: 50px;
  border: solid black 3px;
  background-color: darkmagenta;
} */
</style>

<template>
  <div class="cart-table">
    <ul>
      <li class="table-heading">
        <div class="heading-book">Book</div>
        <div class="heading-price">Price</div>
        <div class="heading-quantity">Quantity</div>
        <div class="heading-subtotal">Amount</div>
        <div class="heading-remove"></div>
      </li>

      <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
        <li>
          <div class="cart-book-image">
            <img :src="bookImageUrl(bookImageFileName(item.book))" :alt="item.book.title" />
          </div>
          <div class="cart-book-title">{{ item.book.title }}</div>
          <div class="cart-book-price">{{ asDollarsAndCents(item.book.price) }}</div>
          <div class="cart-book-quantity">
            <button
              class="icon-button dec-button"
              @click="updateCart(item.book, item.quantity - 1)"
            >
              <i class="fas fa-minus-circle"></i></button
            >&nbsp; <span class="quantity">{{ item.quantity }}</span
            >&nbsp;
            <button
              class="icon-button inc-button"
              @click="updateCart(item.book, item.quantity + 1)"
            >
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
          <div class="cart-book-subtotal">
            {{ asDollarsAndCents(item.book.price * item.quantity) }}
          </div>
          <div class="cart-book-remove">
            <button class="icon-button remove-button" @click="updateCart(item.book, 0)">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </li>
        <li class="line-sep"></li>
      </template>
    </ul>
  </div>
</template>
