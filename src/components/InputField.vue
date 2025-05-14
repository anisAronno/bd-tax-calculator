<template>
  <div>
    <label :for="id" class="block font-bold mt-3 text-teal-700">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :type="type"
        :id="id"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :required="required"
        @blur="$emit('validate')"
        ref="inputRef"
        class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        :class="{ 'border-red-500': error }"
      />
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  max: {
    type: Number,
    default: null
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'validate']);

const inputRef = ref(null);

// Watch for errors and focus input when error occurs
watch(
  () => props.error,
  (newError) => {
    if (newError && inputRef.value) {
      inputRef.value.focus();
    }
  }
);

const handleInput = (e) => {
  // Remove non-numeric characters
  let value = e.target.value.replace(/[^0-9]/g, "");
  emit('update:modelValue', value);
};
</script>