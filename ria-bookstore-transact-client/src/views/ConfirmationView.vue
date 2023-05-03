<script setup lang="ts">
import ConfirmationTable from '@/components/ConfirmationTable.vue';
import { useCategoryStore } from '@/stores/category'
import { useOrderDetailsStore } from "@/stores/orderDetails";
import { computed } from "vue";
import { asDollarsAndCents } from '@/utils'

const categoryStore = useCategoryStore()
const orderDetailsStore = useOrderDetailsStore();
const orderDetails = orderDetailsStore.orderDetails;

const orderDate = computed(function () {
  let date = new Date(orderDetails.order.dateCreated);
  console.log(date);
  return date.toDateString() + " " + date.toTimeString();

});

const ccExpDate = computed(function (): Date {
  console.log("date: " + orderDetails.customer.ccExpDate.toString());
  return new Date(orderDetails.customer.ccExpDate);
});

const ccExpYear = computed(function (): number {
  console.log("year: " + ccExpDate.value.getFullYear());
  return ccExpDate.value.getFullYear();
});

const ccExpMonth = computed(function (): string {
  let month = ccExpDate.value.getMonth();
  let result = "" + month;
  if (month < 10) {
    result = "0" + month;
  }
  console.log("month: " + result);
  return result;
});
</script>

<style scoped>
.confirmation-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  background-image: url('/site-images/background.png');
  background-position: center;
  background-size: cover;
}

h1 {
  font-family: var(--default-font-family);
  margin-top: 1em;
  text-align: center;
  color: var(--neutral-color);
}

h2 {
  font-family: var(--default-font-family);
  text-align: center;
  color: var(--neutral-color);
  line-height: 1.5em;
}

.to-shopping {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
}

.back-to-shopping {
  outline: none;
  background-color: var(--primary-color);
  border-color: var(--neutral-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bold;
}

.back-to-shopping:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

#order-true {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#confirmationView {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1em auto;
  border-color: var(--neutral-color);
  border-style: solid;
  border-radius: 8px;
  border-width: 2px;
}

#confirmationDetails {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
  width: 50%;
}

#confirmationTitle {
  font-weight: bold;
  font-size: x-large;
  text-align: center;
  color: var(--neutral-color);
}

#customerInfo {
  display: flex;
  flex-direction: column;
  /* font-weight: bold; */
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
}

ul {
  text-align: center;
  color: var(--neutral-color);
}

ul>li {
  margin: 0.25em;
}

.vl {
  border-left: 4px solid var(--neutral-color);
  height: 12rem;
}

#total {
  font-size: x-large;
}
</style>

<template>
  <div class="confirmation-page">
    <h1><u>Confirmation Page</u></h1>

    <div v-if="!orderDetails || !orderDetailsStore.hasOrderDetails()">
      <h2>
        Your order cannot be found. <br />
        Please complete purchase.
      </h2>
    </div>

    <div v-else id="order-true">

      <div id="confirmationView">
        <ul id="confirmationDetails">
          <li id="confirmationTitle">Order Information:</li>
          <li>Confirmation #:&nbsp;{{ orderDetails.order.confirmationNumber }}</li>
          <li>Time:<br />{{ orderDate }}</li>
        </ul>
        <div class="vl"></div>
        <ul id="customerInfo">
          <li id="confirmationTitle">Your Information:</li>
          <li>{{ orderDetails.customer.customerName }}</li>
          <li>{{ orderDetails.customer.address }}</li>
          <li>{{ orderDetails.customer.email }}</li>
          <li>{{ orderDetails.customer.phone }}</li>
          <li>**** **** **** {{ orderDetails.customer.ccNumber.substring(orderDetails.customer.ccNumber.length - 4) }}
            ({{ ccExpMonth }}-{{ ccExpYear }})</li>
          <!-- TODO -->
        </ul>
      </div>

      <div class="receipt">
        <h2>Comics Ordered</h2>
        <confirmation-table> </confirmation-table>
        <ul id="orderTotal">
          <li>Subtotal:&nbsp;<strong>{{ asDollarsAndCents(orderDetails.order.amount - 500, false) }}</strong></li>
          <li>Shipping:&nbsp;<strong>{{ asDollarsAndCents(500, false) }}</strong></li>
          <li id="total">Total:&nbsp;<strong>{{ asDollarsAndCents(orderDetails.order.amount, false) }}</strong></li>
        </ul>
      </div>

    </div>

    <div class="to-shopping">
      <router-link :to="'/category/' + categoryStore.currentCategory">
        <button class="button back-to-shopping">
          <i class="fa-solid fa-bag-shopping"></i>
          Continue Shopping
        </button>
      </router-link>
    </div>

  </div>
</template>
