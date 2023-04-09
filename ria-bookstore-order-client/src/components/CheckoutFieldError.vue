<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

const props = defineProps<{
  fieldName: BaseValidation
}>()
</script>

<style scoped>
.error {
  display: flex;
  color: #ef233c;
  align-self: center;
  font-size: medium;
  font-weight: bold;
}
</style>

<template>
  <template v-if="fieldName.$error">
    <span class="error" v-for="error of fieldName.$errors" :key="error.$uid"
      ><i class="fa-solid fa-circle-exclamation"></i>&nbsp;{{ error.$message }}</span
    >
  </template>
</template>
