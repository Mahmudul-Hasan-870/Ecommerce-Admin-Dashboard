<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCurrencyStore } from './stores/currency'

const currencyStore = useCurrencyStore()

onMounted(async () => {
  // Initialize currency when app starts
  await currencyStore.initCurrency()
})
</script> 