<template>
  <div class="w-full lg:w-1/2 bg-white p-4 md:p-8 rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-center text-teal-700 mb-6">
      Tax Calculation Results
    </h2>
    
    <!-- Notice message -->
    <div
      v-if="notice"
      class="bg-yellow-50 text-yellow-800 border-l-6 border-yellow-200 p-3 my-4 rounded"
      v-html="notice"
    ></div>

    <!-- Annual and Monthly Tax Summary -->
    <div class="bg-green-50 p-4 rounded-lg my-5 animate-pulse-slow annual-tax-highlight">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div>
          <div>Your Annual Tax</div>
          <div class="text-2xl font-bold text-teal-700 mt-1">
            BDT {{ formatNumber(results.actualFinalTax || 0) }}
          </div>
        </div>
        <div>
          <div>Your Monthly Tax</div>
          <div class="text-2xl font-bold text-teal-700 mt-1">
            BDT {{ formatNumber(results.monthlyTaxWithInvestment || 0) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Calculation -->
    <SectionHeading title="Detailed Calculation" icon="👉" />
    <table class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden">
      <tbody>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Total Annual Income
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.annualIncome || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Exempted Income
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.exemption || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Taxable Income
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.taxableIncome || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Tax-Free Threshold
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.taxFreeThreshold || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Allowable Investment
            <span class="text-xs text-blue-800 italic">(20% of Taxable Income)</span>
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.allowableInvestment || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Total Investment
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.totalInvestment || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Rebateable Investment
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.rebateableInvestment || 0) }}
            <span
              v-if="results.totalInvestment > results.allowableInvestment"
              class="bg-yellow-50 text-yellow-800 py-0.5 px-1.5 text-xs rounded ml-1.5"
            >
              (Limited to 20% of taxable income)
            </span>
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Maximum Rebate
            <span class="text-xs text-blue-800 italic"
              >(lower of 3% of taxable income or 15% of investment)</span
            >
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.maxPossibleRebate || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Actual Rebate Based on Your Investment
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.rebate || 0) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tax Breakdown Table (shown when tax is ≥5000) -->
    <div v-if="(results.actualFinalTax || 0) >= 5000" class="tax-breakdown">
      <SectionHeading title="Tax Breakdown" icon="👉" />
      <table class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden">
        <tbody>
          <tr>
            <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
              Income Range
            </th>
            <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
              Rate
            </th>
            <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
              Calculated Tax
            </th>
          </tr>
          <tr
            v-for="(slab, index) in results.taxSlabs || []"
            :key="index"
            :class="index % 2 === 1 ? 'bg-teal-50/20' : ''"
          >
            <td class="p-3 text-left border border-gray-200">
              {{ slab.range }}
            </td>
            <td class="p-3 text-left border border-gray-200">
              {{ slab.rate }}%
            </td>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(slab.tax) }}
            </td>
          </tr>
          <tr class="bg-teal-100 font-bold">
            <th colspan="2" class="p-3 text-left border border-gray-200">
              Total Tax Before Rebate
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.tax || 0) }}
            </td>
          </tr>
          <tr class="bg-teal-50 font-semibold">
            <th colspan="2" class="p-3 text-left border border-gray-200">
              Less: Investment Rebate
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.rebate || 0) }}
            </td>
          </tr>
          <tr class="bg-teal-100 font-bold">
            <th colspan="2" class="p-3 text-left border border-gray-200">
              Net Tax Payable
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.actualFinalTax || 0) }}
            </td>
          </tr>
          <tr class="bg-teal-50 font-semibold">
            <th colspan="2" class="p-3 text-left border border-gray-200">
              Monthly Tax Payable
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.monthlyTaxWithInvestment || 0) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tax With Maximum Investment -->
    <SectionHeading title="Tax With Maximum Investment" icon="👉" />
    <table class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden">
      <tbody>
        <tr class="bg-green-50">
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Final Payable Tax (with max possible investment)
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.maxPossibleFinalTax || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Monthly Tax
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.monthlyTaxWithMaxInvestment || 0) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tax Without Investment -->
    <SectionHeading title="Tax Without Investment" icon="👉" />
    <table class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden">
      <tbody>
        <tr class="bg-green-50">
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Final Payable Tax
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.taxWithoutInvestment || 0) }}
          </td>
        </tr>
        <tr>
          <th class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200">
            Monthly Tax
          </th>
          <td class="p-3 text-left border border-gray-200">
            BDT {{ formatNumber(results.monthlyTaxWithoutInvestment || 0) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import SectionHeading from './SectionHeading.vue';

// Props
const props = defineProps({
  results: {
    type: Object,
    default: () => ({})
  },
  notice: {
    type: String,
    default: ''
  }
});

// Format number with commas
const formatNumber = (number) => {
  return (number || 0).toLocaleString();
};

// Handle initial display of tax breakdown to prevent layout shift
onMounted(async () => {
  await nextTick();
  const breakdownSection = document.querySelector('.tax-breakdown');
  if (breakdownSection) {
    breakdownSection.style.minHeight = breakdownSection.clientHeight + 'px';
  }
});
</script>

<style scoped>
.tax-breakdown {
  transition: height 0.3s ease;
  height: auto;
  min-height: 0;
}

.annual-tax-highlight {
  scroll-margin-top: 100px;
}
</style>