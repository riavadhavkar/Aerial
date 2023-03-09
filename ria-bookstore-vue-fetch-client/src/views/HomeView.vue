<script setup lang="ts">
import TheHomePopularList from '@/components/TheHomePopularList.vue'
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/site-images/background.png');
  background-position: center;
  background-size: cover;
}

.shop-comics-button {
  display: flex;
  width: 100%;
  justify-content: center;
}

.button.shop-comics {
  background-color: var(--neutral-color);
  color: var(--primary-color);

  font-family: var(--title-font-family);
  font-weight: bolder;
  font-size: 40px;

  width: fit-content;
  border: none;
  border-color: var(--primary-color);
  border-style: solid;
  outline: none;
  border-radius: 50px;
  padding: 0.1em 1em 0.1em 1em;
}

.button.shop-comics:hover,
.button.shop-comics:active {
  background: var(--primary-color);
  color: var(--neutral-color);
  border-color: var(--neutral-color);
  border-style: solid;
}
</style>

<template>
  <div class="home-page">
    <section class="shop-comics-button container">
      <router-link to="/category/popular">
        <button class="button shop-comics">SHOP FOR COMICS</button>
      </router-link>
    </section>

    <section class="popular-images container">
      <the-home-popular-list></the-home-popular-list>
    </section>
  </div>
</template>
