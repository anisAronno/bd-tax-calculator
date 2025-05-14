<template>
  <div class="max-w-7xl mx-auto md:p-5">
    <AppHeader />
    <div class="flex flex-col lg:flex-row gap-8 justify-between mt-2 md:mt-5">
      <!-- Tax Calculator Form -->
      <TaxCalculatorForm 
        @calculate="calculateTax" 
        :isCalculating="isCalculating" 
        :gender="gender"
        @update:gender="gender = $event"
        ref="formRef"
      />
      
      <!-- Tax Calculation Results -->
      <TaxCalculationResults 
        :results="results" 
        :notice="notice"
        ref="resultsRef"
      />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import TaxCalculatorForm from './TaxCalculatorForm.vue';
import TaxCalculationResults from './TaxCalculationResults.vue';

// State
const gender = ref('Male');
const results = ref({});
const notice = ref('');
const isCalculating = ref(false);
const formRef = ref(null);
const resultsRef = ref(null);

// Initialize results with default values
onMounted(() => {
  const taxFreeThreshold = gender.value === 'Female' || gender.value === 'Senior Citizen' ? 400000 : 350000;
  
  results.value = {
    annualIncome: 0,
    exemption: 0,
    taxableIncome: 0,
    taxFreeThreshold: taxFreeThreshold,
    allowableInvestment: 0,
    totalInvestment: 0,
    rebateableInvestment: 0,
    maxPossibleRebate: 0,
    rebate: 0,
    tax: 0,
    taxWithoutInvestment: 0,
    actualFinalTax: 0,
    maxPossibleFinalTax: 0,
    monthlyTaxWithInvestment: 0,
    monthlyTaxWithoutInvestment: 0,
    monthlyTaxWithMaxInvestment: 0,
    taxSlabs: [],
  };
});

// Calculate tax
const calculateTax = async (formData) => {
  isCalculating.value = true;
  
  try {
    const {
      gender: formGender,
      annualIncome,
      totalInvestment,
      savings,
      dps,
      lip,
      share,
      rpf,
      otherInv
    } = formData;
    
    const minimumTax = 5000; // Minimum tax as per government rules

    // Calculate exempted income (min of 1/3 of annual income or 450,000)
    const exemption = Math.round(Math.min(annualIncome / 3, 450000));

    // Calculate taxable income
    const taxableIncome = Math.max(0, annualIncome - exemption);

    // Set tax-free threshold based on gender
    const taxFreeThreshold = formGender === 'Female' || formGender === 'Senior Citizen' ? 400000 : 350000;

    // Calculate tax according to the formula provided
    let tax = 0;
    let remainingIncome = taxableIncome;

    // For tax breakdown calculation
    const taxSlabs = [];

    // Complex tax calculation based on slabs
    if (remainingIncome > taxFreeThreshold) {
      // First slab (after tax-free threshold)
      const slab1Limit = 100000;
      const slab1Amount = Math.min(remainingIncome - taxFreeThreshold, slab1Limit);
      const slab1Tax = slab1Amount * 0.05;
      tax += slab1Tax;
      remainingIncome -= taxFreeThreshold + slab1Amount;

      // Add to tax breakdown
      taxSlabs.push({
        range: `BDT ${formatNumber(taxFreeThreshold + 1)} - ${formatNumber(taxFreeThreshold + slab1Limit)}`,
        rate: 5,
        tax: slab1Tax,
      });

      // Second slab
      if (remainingIncome > 0) {
        const slab2Limit = 400000;
        const slab2Amount = Math.min(remainingIncome, slab2Limit);
        const slab2Tax = slab2Amount * 0.1;
        tax += slab2Tax;
        remainingIncome -= slab2Amount;

        // Add to tax breakdown
        taxSlabs.push({
          range: `BDT ${formatNumber(taxFreeThreshold + slab1Limit + 1)} - ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit)}`,
          rate: 10,
          tax: slab2Tax,
        });

        // Third slab
        if (remainingIncome > 0) {
          const slab3Limit = 500000;
          const slab3Amount = Math.min(remainingIncome, slab3Limit);
          const slab3Tax = slab3Amount * 0.15;
          tax += slab3Tax;
          remainingIncome -= slab3Amount;

          // Add to tax breakdown
          taxSlabs.push({
            range: `BDT ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit + 1)} - ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit)}`,
            rate: 15,
            tax: slab3Tax,
          });

          // Fourth slab
          if (remainingIncome > 0) {
            const slab4Limit = 500000;
            const slab4Amount = Math.min(remainingIncome, slab4Limit);
            const slab4Tax = slab4Amount * 0.2;
            tax += slab4Tax;
            remainingIncome -= slab4Amount;

            // Add to tax breakdown
            taxSlabs.push({
              range: `BDT ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit + 1)} - ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit + slab4Limit)}`,
              rate: 20,
              tax: slab4Tax,
            });

            // Fifth slab
            if (remainingIncome > 0) {
              const slab5Limit = 2000000;
              const slab5Amount = Math.min(remainingIncome, slab5Limit);
              const slab5Tax = slab5Amount * 0.25;
              tax += slab5Tax;
              remainingIncome -= slab5Amount;

              // Add to tax breakdown
              taxSlabs.push({
                range: `BDT ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit + slab4Limit + 1)} - ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit + slab4Limit + slab5Limit)}`,
                rate: 25,
                tax: slab5Tax,
              });

              // Final slab (above 3.5M taxable income + tax-free threshold)
              if (remainingIncome > 0) {
                const slab6Tax = remainingIncome * 0.3;
                tax += slab6Tax;

                // Add to tax breakdown
                taxSlabs.push({
                  range: `Above BDT ${formatNumber(taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit + slab4Limit + slab5Limit)}`,
                  rate: 30,
                  tax: slab6Tax,
                });
              }
            }
          }
        }
      }
    }

    // Round tax
    tax = Math.round(tax);

    // Calculate allowable investment (20% of taxable income)
    const allowableInvestment = Math.round(taxableIncome * 0.2);

    // Calculate rebateable investment (min of total investment or allowable investment)
    const rebateableInvestment = Math.min(totalInvestment, allowableInvestment);

    // Calculate maximum possible rebate (minimum of 15% of rebateable investment OR 3% of taxable income)
    const rebatePercentage = Math.round(allowableInvestment * 0.15); // 15% of max possible investment
    const rebateFixed = Math.round(taxableIncome * 0.03); // 3% of taxable income
    const maxPossibleRebate = Math.min(rebatePercentage, rebateFixed, 1000000);

    // Calculate actual rebate based on user's investment
    const actualRebate = Math.round(rebateableInvestment * 0.15);
    const rebate = Math.min(actualRebate, maxPossibleRebate);

    // Check if minimum tax should apply (only if taxable income exceeds the threshold)
    const shouldApplyMinimumTax = taxableIncome > taxFreeThreshold;

    // Calculate tax without investment
    const taxWithoutInvestment = shouldApplyMinimumTax ? Math.max(tax, minimumTax) : tax;

    // Calculate tax with actual investment
    const actualTaxAfterRebate = Math.max(tax - rebate, 0);
    const actualFinalTax = shouldApplyMinimumTax ? Math.max(actualTaxAfterRebate, minimumTax) : actualTaxAfterRebate;

    // Calculate tax with maximum possible investment
    const maxTaxAfterRebate = Math.max(tax - maxPossibleRebate, 0);
    const maxPossibleFinalTax = shouldApplyMinimumTax ? Math.max(maxTaxAfterRebate, minimumTax) : maxTaxAfterRebate;

    // Calculate monthly tax
    const monthlyTaxWithInvestment = Math.round(actualFinalTax / 12);
    const monthlyTaxWithoutInvestment = Math.round(taxWithoutInvestment / 12);
    const monthlyTaxWithMaxInvestment = Math.round(maxPossibleFinalTax / 12);

    // Create notice if minimum tax is applied
    notice.value = shouldApplyMinimumTax && actualFinalTax <= minimumTax && actualFinalTax > 0
      ? "Minimum tax of BDT 5,000 is applied as per government rules for taxable income exceeding the threshold."
      : "";

    // Set results
    results.value = {
      annualIncome,
      exemption,
      taxableIncome,
      taxFreeThreshold,
      allowableInvestment,
      totalInvestment,
      rebateableInvestment,
      maxPossibleRebate,
      rebate,
      tax,
      taxWithoutInvestment,
      actualFinalTax,
      maxPossibleFinalTax,
      monthlyTaxWithInvestment,
      monthlyTaxWithoutInvestment,
      monthlyTaxWithMaxInvestment,
      taxSlabs,
    };
    
    // Add small delay to ensure DOM updates before scrolling
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Scroll to the annual tax result section
    const resultElement = resultsRef.value.$el.querySelector('.annual-tax-highlight');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
  } catch (error) {
    console.error('Error calculating tax:', error);
  } finally {
    isCalculating.value = false;
  }
};

// Format number with commas
const formatNumber = (number) => {
  return (number || 0).toLocaleString();
};
</script>