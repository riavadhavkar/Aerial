<script setup lang="ts">
import TheHeaderDropdown from '@/components/TheHeaderDropdown.vue'
</script>

<style scoped>
header {
  background: var(--primary-background-color);
  display: flex;
  /* flex-direction: row; */
  padding: 1em;
  gap: 1em;
  justify-content: space-between;
  align-items: center;
}

/* logo, title */
.title-logo {
  display: inline-flex;
  gap: 0.5em;
  /* padding: 0.5em; */
}
.logo {
  display: inline;
}
.title {
  font-family: var(--title-font-family);
  font-size: 64px;
  font-weight: bold;
  display: inline;
}

/* search bar */
.search-bar {
  display: flex;
  flex-grow: 0.8;
  justify-content: center;
  padding: 0.5em;
}
.fa-magnifying-glass {
  color: var(--neutral-color);
  padding: 1em;
  padding-right: 0em;
  align-self: center;
}
.search-bar form {
  display: flex;
  background-color: var(--primary-color);
  border-radius: 30px;
  width: 100%;
}
.search-box {
  flex-grow: 1;
  padding: 0.8em;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--neutral-color);
  text-align: left;
}
.search-box::placeholder {
  opacity: 90%;
  font-weight: bold;
}

/* login and cart */
.login-and-cart {
  font-weight: bold;
  display: flex;
  gap: 0.5em;
  /* padding: 0.5em; */
}
.shopping-cart {
  border-radius: 10px;
  border: none;
  outline: none;
}
.profile {
  border-radius: 10px;
  width: fit-content;
  border: none;
  outline: none;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
</style>

<template>
  <header class="container">
    <!-- HEADER - TITLE -->
    <section class="title-logo">
      <router-link to="/">
        <img
          class="logo"
          src="/site-images/bookstore-logo.png"
          alt="Aerial Logo"
          width="50"
          height="auto"
        />
        <h1 class="title">AERIAL</h1>
      </router-link>
    </section>

    <section class="categories">
      <the-header-dropdown></the-header-dropdown>
    </section>

    <!-- HEADER - SEARCH BAR -->
    <section class="search-bar">
      <form action="/">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="search-box" placeholder="SEARCH COMICS" />
      </form>
      <!-- <the-header-search-bar></the-header-search-bar> -->
    </section>

    <!-- HEADER - BUTTONS -->
    <section class="login-and-cart">
      <button class="button shopping-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        0
      </button>

      <button class="button profile">
        <i class="fa-solid fa-user"></i>
        LOGIN
      </button>
    </section>
  </header>
</template>
