<script setup lang="ts">
</script>

<style scoped>
.not-found-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('/site-images/background.png');
    background-position: center;
    background-size: cover;
}

h1 {
    font-family: var(--default-font-family);
    margin: 1em;
    padding: 5em;
    text-align: center;
    color: var(--neutral-color);
    line-height: 1.5em;
}
</style>

<template>
    <div class="not-found-page">
        <h1><u>404</u><br />Page Not Found</h1>
    </div>
</template>
