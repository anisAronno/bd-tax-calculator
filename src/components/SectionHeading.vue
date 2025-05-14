<template>
  <h3 class="text-xl font-semibold text-teal-700 mt-6 border-l-4 border-teal-500 pl-3">
    {{ icon }} {{ title }}
  </h3>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
});
</script>