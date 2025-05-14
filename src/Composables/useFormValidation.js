import { ref, computed } from 'vue';

export default function useFormValidation() {
  const errors = ref({});
  
  const hasErrors = computed(() => {
    return Object.values(errors.value).some(error => error !== '');
  });
  
  const validateField = (field, value, rules) => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors.value[field] = error;
        return false;
      }
    }
    errors.value[field] = '';
    return true;
  };
  
  const resetErrors = () => {
    errors.value = {};
  };
  
  // Common validation rules
  const required = (fieldName) => (value) => {
    return !value ? `${fieldName} is required` : '';
  };
  
  const maxValue = (max, fieldName) => (value) => {
    return parseFloat(value) > max ? `${fieldName} cannot exceed ${max.toLocaleString()}` : '';
  };
  
  return {
    errors,
    hasErrors,
    validateField,
    resetErrors,
    validationRules: {
      required,
      maxValue
    }
  };
}