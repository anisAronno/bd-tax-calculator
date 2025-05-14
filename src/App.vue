<script setup>
import TaxCalculator from './components/TaxCalculator.vue';
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <div>
    <Analytics />
    <TaxCalculator />
  </div>
</template>