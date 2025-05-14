<template>
  <div class="my-5">
    <div class="flex border border-teal-100 rounded-lg overflow-hidden">
      <button
        :class="{
          'bg-teal-700 text-white': !useAnnualInput,
          'bg-white text-gray-700': useAnnualInput,
        }"
        @click="$emit('update:useAnnualInput', false)"
        class="flex-1 py-2.5 px-4 text-center transition-all duration-300 font-medium cursor-pointer"
      >
        Monthly Income
      </button>
      <button
        :class="{
          'bg-teal-700 text-white': useAnnualInput,
          'bg-white text-gray-700': !useAnnualInput,
        }"
        @click="$emit('update:useAnnualInput', true)"
        class="flex-1 py-2.5 px-4 text-center transition-all duration-300 font-medium cursor-pointer"
      >
        Annual Income
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  useAnnualInput: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:useAnnualInput']);
</script>