<script setup lang="ts"></script>

<style scoped>
footer {
  background: var(--primary-background-color);
  display: flex;
  gap: 1em;
  justify-content: space-between;
  align-items: center;
  font-family: var(--title-font-family);
}

.links,
.social-media-icons {
  display: flex;
  flex-direction: row;
}

.social-media-icons {
  text-align: center;
  gap: 0.25em;
}

.button.social-media {
  background: none;
  color: var(--primary-color);
}

.button.social-media:hover,
.button.social-media:active {
  background: var(--primary-color);
  color: var(--neutral-color);
}

.links {
  color: var(--primary-color);
  gap: 0.25em;
  /* display: inline-flexbox; */
}
</style>

<template>
  <footer class="container">

    <section class="copyright">
      &copy; 2023 Aerial. All Rights Reserved.
    </section>

    <section class="social-media-icons">
      <router-link to="/" class="button social-media">
        <i class="fa-brands fa-facebook"></i>
      </router-link>
      <router-link to="/" class="button social-media">
        <i class="fa-brands fa-twitter"></i>
      </router-link>
      <router-link to="/" class="button social-media">
        <i class="fa-brands fa-instagram"></i>
      </router-link>
      <router-link to="/" class="button social-media">
        <i class="fa-brands fa-tiktok"></i>
      </router-link>
      <router-link to="/" class="button social-media">
        <i class="fa-brands fa-discord"></i>
      </router-link>
    </section>

    <section class="links">
      <router-link to="/">About</router-link>
      &nbsp;|&nbsp;
      <router-link to="/">Contact</router-link>
      &nbsp;|&nbsp;
      <router-link to="/">Directions</router-link>
    </section>

  </footer>
</template>
