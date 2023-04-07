<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength, minLength, required, email } from '@vuelidate/validators'
import { useCartStore } from '@/stores/cart'
import { useCategoryStore } from '@/stores/category'
import { isCreditCard, isMobilePhone } from '@/validators'
import CheckoutFieldError from '@/components/CheckoutFieldError.vue'
import router from '@/router'
import { asDollarsAndCents } from '@/price'

const categoryStore = useCategoryStore()
const cartStore = useCartStore()
const cart = cartStore.cart

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const form = reactive({
  name: '',
  address: '',
  phone: '',
  email: '',
  ccNumber: '',
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: ''
})

const rules = {
  name: {
    required: helpers.withMessage('Name Required', required),
    minLength: helpers.withMessage('Name must have at least 4 letters.', minLength(4)),
    maxLength: helpers.withMessage('Name can have at most 45 letters.', maxLength(45))
  },
  address: {
    required: helpers.withMessage('Address Required', required),
    minLength: helpers.withMessage('Address must have at least 4 letters.', minLength(4)),
    maxLength: helpers.withMessage('Address can have at most 45 letters.', maxLength(45))
  },
  phone: {
    required: helpers.withMessage('Phone Number Required', required),
    phone: helpers.withMessage(
      'Please provide a valid phone number.',
      (value: string) => !helpers.req(value) || isMobilePhone(value)
    )
  },
  email: {
    required: helpers.withMessage('Email Required', required),
    email
  },
  ccNumber: {
    required: helpers.withMessage('Credit Card Number Required', required),
    ccNumber: helpers.withMessage(
      'Please provide a valid credit card number.',
      (value: string) => !helpers.req(value) || isCreditCard(value)
    )
  },
  //   TODO: Add more validations for these and other fields that need more validation.
}
const v$ = useVuelidate(rules, form)

async function submitOrder() {
  console.log('Submit order')
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    form.checkoutStatus = 'ERROR'
  } else {
    form.checkoutStatus = 'PENDING'
    setTimeout(() => {
      form.checkoutStatus = 'OK'
      setTimeout(() => {
        router.push({ name: 'confirmation-view' })
      }, 1000)
    }, 1000)
  }
}

/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index
}
</script>

<style scoped>
.checkout-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  background-image: url('/site-images/background.png');
  background-position: center;
  background-size: cover;
  color: var(--neutral-color);
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

.cart-page-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5em auto;
  gap: 0.4em;
}

.back-to-shopping {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  font-size: x-large;
}

.back-to-shopping:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  transition: all 0.1s ease-in-out;
  transform: scale(1.08);
}

.back-to-cart {
  outline: none;
  background-color: var(--primary-color);
  border-color: var(--neutral-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bold;
}

.back-to-cart:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.complete-purchase {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  font-size: x-large;
  width: auto;
  justify-self: center;
  grid-column: 1/3;
  margin: 0.5em;
}

.complete-purchase:hover {
  outline: none;
  background-color: var(--neutral-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  font-weight: bolder;
  transition: all 0.1s ease-in-out;
  transform: scale(1.08);
}

.checkout-page-body {
  display: flex;
  /* grid-template-areas: 'form form' 'checkout'; */
  flex-direction: column;
  /* flex-flow: row wrap; */
  align-items: center;
  padding: 1em;
  width: 60%;
}

.checkout-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2em;
  width: 100%;
}

.checkout-input-expiry {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.2em;
}

.expiry-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  width: 100%;
}

 select {
  background-color: var(--neutral-color);
  margin-left: 0.5em;
  margin-right: 0.5em;
  color: var(--primary-color);
  border-radius: 8px;
  height: 2em;
  border-style: none;
  width: 100%;
}

form {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  width: 100%;
  gap: 0.5rem;
}

form > div {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5em;
}

form > div > input {
  background-color: var(--neutral-color);
  margin-left: 0.5em;
  margin-right: 0.5em;
  color: var(--primary-color);
  border-radius: 8px;
  height: 2em;
  border-style: none;
}

label {
  font-weight: bold;
  font-size: medium;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.checkout-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  width: 100%;
  grid-column: 1/3;
}

.checkout-details-small {
  font-size: large;
}

.checkout-details-large {
  font-size: x-large;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
  color: #EF233C;
  grid-column: 1/3;
  font-weight: bold;
}
</style>

<template>
  <div class="checkout-page">
    <h1><u>Checkout Page</u></h1>

    <section v-if="!cart.empty" class="checkout-page-body">
      <form @submit.prevent="submitOrder">

          <div class="checkout-input">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" v-model.lazy="v$.name.$model" />
            <checkout-field-error :field-name="v$.name" />
          </div>

          <div class="checkout-input">
            <label for="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              v-model.lazy="v$.address.$model"
            />
            <checkout-field-error :field-name="v$.address" />
          </div>
          
          <div class="checkout-input">
            <label for="phone">Phone</label>
            <input type="text" id="phone" name="phone" v-model.lazy="v$.phone.$model" />
            <checkout-field-error :field-name="v$.phone" />
          </div>

          <div class="checkout-input">
            <label for="ccNumber">Credit Card</label>
            <input type="text" id="ccNumber" name="ccNumber" v-model.lazy="v$.ccNumber.$model"/>
            <checkout-field-error :field-name="v$.ccNumber" />
          </div>
          
          <div class="checkout-input">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model.lazy="v$.email.$model"/>
            <checkout-field-error :field-name="v$.email" />
          </div>

          <div class="checkout-input-expiry">
            <label>Expiry Date</label>
            <div class="expiry-inputs">
              <select v-model="v$.ccExpiryMonth" >
                <option v-for="(month, index) in months" :key="index" :value="index + 1">
                  {{ month }} ({{ index + 1 }})
                </option>
              </select>
              <select v-model="v$.ccExpiryYear">
                <option v-for="(year, index) in 15" :key="index" :value="index + 1">
                  {{ yearFrom(index) }}
                </option>
              </select>
            </div>
          </div>
        <!-- </section> -->

        <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
          <div v-if="form.checkoutStatus === 'ERROR'">Error. Try Again.</div>
          <div v-else-if="form.checkoutStatus === 'PENDING'">Processing Order</div>
          <div v-else-if="form.checkoutStatus === 'OK'">Order Placed</div>
          <div v-else>Unexpected Error</div>
        </section>

        <section Shipping: class="checkout-details">
          <div class="checkout-details-small">Subtotal: <strong>{{ asDollarsAndCents(cart.subtotal, false) }}</strong
          ></div>
          <div class="checkout-details-small">Shipping: <strong>{{ asDollarsAndCents(cart.surcharge, false) }}</strong
          ></div>
          <div class="checkout-details-large">Total: <strong>{{ asDollarsAndCents(cart.subtotal + cart.surcharge, false) }}</strong
          ></div>
        </section>

        <input
          type="submit"
          name="submit"
          class="button complete-purchase"
          :disabled="form.checkoutStatus === 'PENDING'"
          value="Complete Purchase"
        />
      </form>
    </section>

    <section v-else class="checkout-page-body">
      <h2>
        Your cart is empty. <br />
        Please add some comics to your cart before proceeding to checkout.
      </h2>

      <section class="cart-page-buttons">
        <div class="return-to-shopping">
          <router-link :to="'/category/' + categoryStore.currentCategory">
            <button class="button back-to-shopping">
              <i class="fa-solid fa-basket-shopping"></i>
              Return to Shopping
            </button>
          </router-link>
        </div>

        <div class="to-cart">
          <router-link :to="{ name: 'cart-view' }">
            <button class="button back-to-cart">
              <i class="fa-solid fa-bag-shopping"></i>
              Back to Cart
            </button>
          </router-link>
        </div>
      </section>
    </section>
  </div>
</template>
