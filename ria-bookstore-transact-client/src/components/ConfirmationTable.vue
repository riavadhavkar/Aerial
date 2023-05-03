<script setup lang="ts">
import { asDollarsAndCents, getBookImageUrl, bookImageFileName } from "@/utils";
import { useCartStore } from "@/stores/cart";
import { useOrderDetailsStore } from "@/stores/orderDetails";
import type { BookItem, OrderDetails } from "@/types";

const cartStore = useCartStore();
const orderDetailsStore = useOrderDetailsStore();
const orderDetails: OrderDetails = orderDetailsStore.orderDetails;

// A helper function - optional to use
const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
</script>



<style scoped>
table {
  border: 4px var(--primary-color) solid;
  border-radius: 8px;
  width: max-content;
  margin-top: 1em;
  margin-bottom: 1em;
}

td {
  display: table-cell;
  padding: 0.5em 0.5em;
  background-color: var(--neutral-color);
  vertical-align: middle;
}

tr:nth-child(even)>td {
  background-color: lightgray;
}

td:nth-child(1) {
  text-align: center;
}

td:nth-child(2) {
  text-align: left;
}

td:nth-child(3) {
  text-align: center;
}

td:nth-child(4) {
  text-align: right;
}

img {
  display: block;
  width: 100px;
  height: auto;
  border-style: solid;
  border-radius: 4px;
  border-width: 2px;
}

tr:nth-child(1)>td {
  font-weight: bold;
  background-color: var(--primary-color);
  color: var(--neutral-color);
}
</style>


<template>
  <table>
    <tr id="header">
      <td colspan="2">Comic</td>
      <td>Quantity</td>
      <td>Price</td>
    </tr>
    <tr v-for="(item, index) in orderDetails.lineItems" :key="item.bookId">
      <td><img :src="getBookImageUrl(bookImageFileName(bookAt(orderDetails, index)))"
          :alt="bookAt(orderDetails, index).title" /></td>
      <td>
        <b>{{ bookAt(orderDetails, index).title }}</b>
      </td>
      <td>x&nbsp;{{ item.quantity }}</td>
      <td><b>{{ asDollarsAndCents(bookAt(orderDetails, index).price, false) }}</b></td>
    </tr>
  </table>
</template>

