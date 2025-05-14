<template>
  <div>
    <label :for="id" class="block font-bold mt-4 text-teal-700">{{ label }}</label>
    <select
      :id="id"
      :value="value"
      @change="$emit('update:value', $event.target.value)"
      class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
    >
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array,
    required: true
  }
});

defineEmits(['update:value']);
</script>