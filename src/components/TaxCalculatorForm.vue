<template>
  <div class="w-full lg:w-1/2 bg-white p-4 md:p-8 rounded-xl shadow-md">
    <!-- Input Type Switch -->
    <TabToggle 
      :useAnnualInput="useAnnualInput" 
      @update:useAnnualInput="useAnnualInput = $event" 
    />

    <!-- Gender Selection -->
    <SelectField
      id="gender"
      label="Gender:"
      :value="gender"
      @update:value="$emit('update:gender', $event)"
      :options="[
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Senior Citizen', label: 'Senior Citizen' }
      ]"
    />

    <!-- Income Fields -->
    <div v-if="useAnnualInput">
      <InputField
        id="annualIncome"
        label="Total Annual Income (required):"
        v-model="annualIncomeInput"
        placeholder="Enter total annual income"
        :max="100000000"
        :required="true"
        :error="errors.annualIncome"
        @validate="validateAnnualInput"
      />
    </div>
    <div v-else>
      <InputField
        id="salary"
        label="Monthly Salary (required):"
        v-model="salary"
        placeholder="Enter monthly salary"
        :max="100000000"
        :required="true"
        :error="errors.salary"
        @validate="validateInput('salary', 100000000)"
      />

      <InputField
        id="festival"
        label="Festival Bonus:"
        v-model="festival"
        placeholder="Enter festival bonus"
        :max="100000000"
        @validate="validateInput('festival', 100000000)"
      />

      <InputField
        id="otherIncome"
        label="Other Income:"
        v-model="otherIncome"
        placeholder="Enter other income"
        :max="100000000"
        @validate="validateInput('otherIncome', 100000000)"
      />
    </div>

    <!-- Investment Fields -->
    <label class="block font-bold mt-4 text-teal-700">Investment Breakdown:</label>
    
    <InputField
      id="savings"
      label="Savings Certificate (Upto 5 Lac):"
      v-model="savings"
      placeholder="Maximum 500,000"
      :max="500000"
      @validate="validateInput('savings', 500000)"
    />

    <InputField
      id="dps"
      label="DPS (Upto 120,000):"
      v-model="dps"
      placeholder="Maximum 120,000"
      :max="120000"
      @validate="validateInput('dps', 120000)"
    />

    <InputField
      id="lip"
      label="LIP (Upto 10% of Policy Value):"
      v-model="lip"
      placeholder="Enter LIP amount"
      :max="1000000"
      @validate="validateInput('lip', 1000000)"
    />

    <InputField
      id="share"
      label="Share Market:"
      v-model="share"
      placeholder="Enter share market investment"
      :max="1000000"
      @validate="validateInput('share', 1000000)"
    />

    <InputField
      id="rpf"
      label="Self & Employer's Contrib. to RPF:"
      v-model="rpf"
      placeholder="Enter RPF contribution"
      :max="1000000"
      @validate="validateInput('rpf', 1000000)"
    />

    <InputField
      id="otherInv"
      label="Others:"
      v-model="otherInv"
      placeholder="Enter other investments"
      :max="1000000"
      @validate="validateInput('otherInv', 1000000)"
    />

    <button
      @click="handleCalculate"
      class="w-full bg-teal-700 text-white py-3 px-5 mt-6 rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-teal-800 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden cursor-pointer"
      :disabled="isCalculating || hasErrors"
    >
      <span>{{ isCalculating ? "Calculating..." : "Calculate Tax" }}</span>
      <span
        v-if="!isCalculating"
        class="ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
        >→</span
      >
      <span v-else class="ml-2.5 inline-block animate-spin">↻</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TabToggle from './TabToggle.vue';
import InputField from './InputField.vue';
import SelectField from './SelectField.vue';

// Props
const props = defineProps({
  isCalculating: Boolean,
  gender: String
});

// Emits
const emit = defineEmits(['calculate', 'update:gender']);

// State
const useAnnualInput = ref(false);
const annualIncomeInput = ref('');
const salary = ref('');
const festival = ref('');
const otherIncome = ref('');
const savings = ref('');
const dps = ref('');
const lip = ref('');
const share = ref('');
const rpf = ref('');
const otherInv = ref('');
const errors = ref({});

// Computed
const hasErrors = computed(() => {
  return Object.values(errors.value).some(error => error !== '');
});

const getTotalInvestment = () => {
  return parseFloat(savings.value || 0) +
    parseFloat(dps.value || 0) +
    parseFloat(lip.value || 0) +
    parseFloat(share.value || 0) +
    parseFloat(rpf.value || 0) +
    parseFloat(otherInv.value || 0);
};

// Validation methods
const validateInput = (field, maxValue) => {
  // Remove non-numeric characters
  const value = parseFloat(eval(field).value) || 0;
  
  // Check if value exceeds maximum
  if (value > maxValue) {
    errors.value[field] = `Maximum allowed value is ${maxValue.toLocaleString()}`;
    eval(field).value = maxValue.toString();
  } else {
    errors.value[field] = '';
  }
};

const validateAnnualInput = () => {
  // Remove non-numeric characters
  annualIncomeInput.value = annualIncomeInput.value.replace(/[^0-9]/g, "");
  
  // Check if value exceeds maximum
  const value = parseFloat(annualIncomeInput.value) || 0;
  if (value > 100000000) {
    errors.value.annualIncome = "Maximum allowed value is 100,000,000";
    annualIncomeInput.value = "100000000";
  } else if (value === 0) {
    errors.value.annualIncome = "Annual income is required";
  } else {
    errors.value.annualIncome = '';
  }
};

// Handle calculate button click
const handleCalculate = () => {
  // Validate required fields
  if (useAnnualInput.value) {
    if (!annualIncomeInput.value) {
      errors.value.annualIncome = "Annual income is required";
      return;
    }
  } else {
    if (!salary.value) {
      errors.value.salary = "Monthly salary is required";
      return;
    }
  }
  
  // Calculate annual income
  let annualIncome;
  if (useAnnualInput.value) {
    annualIncome = parseFloat(annualIncomeInput.value) || 0;
  } else {
    const monthlySalary = parseFloat(salary.value) || 0;
    const festivalBonus = parseFloat(festival.value) || 0;
    const other = parseFloat(otherIncome.value) || 0;
    annualIncome = monthlySalary * 12 + festivalBonus + other;
  }
  
  // Prepare form data
  const formData = {
    gender: props.gender,
    annualIncome,
    totalInvestment: getTotalInvestment(),
    savings: parseFloat(savings.value) || 0,
    dps: parseFloat(dps.value) || 0,
    lip: parseFloat(lip.value) || 0,
    share: parseFloat(share.value) || 0,
    rpf: parseFloat(rpf.value) || 0,
    otherInv: parseFloat(otherInv.value) || 0
  };
  
  // Emit calculation event
  emit('calculate', formData);
};

// Clear validation errors when switching input type
watch(useAnnualInput, () => {
  errors.value = {};
});
</script>