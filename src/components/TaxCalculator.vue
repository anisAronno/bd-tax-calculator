<template>
  <div class="max-w-7xl mx-auto md:p-5">
    <AppHeader />
    <div class="flex flex-col lg:flex-row gap-8 justify-between mt-3 md:mt-5">
      <div class="w-full lg:w-1/2 bg-white p-5 md:p-8 rounded-xl shadow-md">
        <!-- Input Type Switch -->
        <div class="my-5">
          <div class="flex border border-teal-100 rounded-lg overflow-hidden">
            <button
              :class="{
                'bg-teal-700 text-white': !useAnnualInput,
                'bg-white text-gray-700': useAnnualInput,
              }"
              @click="useAnnualInput = false"
              class="flex-1 py-2.5 px-4 text-center transition-all duration-300 font-medium cursor-pointer"
            >
              Monthly Income
            </button>
            <button
              :class="{
                'bg-teal-700 text-white': useAnnualInput,
                'bg-white text-gray-700': !useAnnualInput,
              }"
              @click="useAnnualInput = true"
              class="flex-1 py-2.5 px-4 text-center transition-all duration-300 font-medium cursor-pointer"
            >
              Annual Income
            </button>
          </div>
        </div>

        <label for="gender" class="block font-bold mt-4 text-teal-700"
          >Gender:</label
        >
        <select
          id="gender"
          v-model="gender"
          class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Senior Citizen">Senior Citizen</option>
        </select>

        <div v-if="useAnnualInput">
          <label for="annualIncome" class="block font-bold mt-4 text-teal-700"
            >Total Annual Income (required):</label
          >
          <input
            type="text"
            id="annualIncome"
            v-model="annualIncomeInput"
            @input="validateAnnualInput"
            placeholder="Enter total annual income"
            class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
            required
          />
        </div>
        <div v-else>
          <label for="salary" class="block font-bold mt-4 text-teal-700"
            >Monthly Salary (required):</label
          >
          <input
            type="text"
            id="salary"
            v-model="salary"
            @input="validateInput('salary', 100000000)"
            placeholder="Enter monthly salary"
            class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
            required
          />

          <label for="festival" class="block font-bold mt-4 text-teal-700"
            >Festival Bonus:</label
          >
          <input
            type="text"
            id="festival"
            v-model="festival"
            @input="validateInput('festival', 100000000)"
            placeholder="Enter festival bonus"
            class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
          />

          <label for="otherIncome" class="block font-bold mt-4 text-teal-700"
            >Other Income:</label
          >
          <input
            type="text"
            id="otherIncome"
            v-model="otherIncome"
            @input="validateInput('otherIncome', 100000000)"
            placeholder="Enter other income"
            class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
          />
        </div>

        <label class="block font-bold mt-4 text-teal-700"
          >Investment Breakdown:</label
        >
        <label for="savings" class="block font-bold mt-3 text-teal-700"
          >Savings Certificate (Upto 5 Lac):</label
        >
        <input
          type="text"
          id="savings"
          v-model="savings"
          @input="validateInput('savings', 500000)"
          placeholder="Maximum 500,000"
          class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        />

        <label for="dps" class="block font-bold mt-3 text-teal-700"
          >DPS (Upto 120,000):</label
        >
        <input
          type="text"
          id="dps"
          v-model="dps"
          @input="validateInput('dps', 120000)"
          placeholder="Maximum 120,000"
          class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        />

        <label for="lip" class="block font-bold mt-3 text-teal-700"
          >LIP (Upto 10% of Policy Value):</label
        >
        <input
          type="text"
          id="lip"
          v-model="lip"
          @input="validateInput('lip', 1000000)"
          placeholder="Enter LIP amount"
          class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        />

        <label for="share" class="block font-bold mt-3 text-teal-700"
          >Share Market:</label
        >
        <input
          type="text"
          id="share"
          v-model="share"
          @input="validateInput('share', 1000000)"
          placeholder="Enter share market investment"
          class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        />

        <label for="rpf" class="block font-bold mt-3 text-teal-700"
          >Self & Employer's Contrib. to RPF:</label
        >
        <input
          type="text"
          id="rpf"
          v-model="rpf"
          @input="validateInput('rpf', 1000000)"
          placeholder="Enter RPF contribution"
          class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        />

        <label for="otherInv" class="block font-bold mt-3 text-teal-700"
          >Others:</label
        >
        <input
          type="text"
          id="otherInv"
          v-model="otherInv"
          @input="validateInput('otherInv', 1000000)"
          placeholder="Enter other investments"
          class="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 text-base"
        />

        <button
          @click="calculateTax"
          class="w-full bg-teal-700 text-white py-3 px-5 mt-6 rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-teal-800 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden cursor-pointer"
        >
          <span>Calculate Tax</span>
          <span
            class="ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
            >→</span
          >
        </button>
      </div>

      <div class="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center text-teal-700 mb-6">
          Tax Calculation Results
        </h2>
        <div
          v-if="notice"
          class="bg-yellow-50 text-yellow-800 border-l-6 border-yellow-200 p-3 my-4 rounded"
          v-html="notice"
        ></div>

        <div class="bg-green-50 p-4 rounded-lg my-5 animate-pulse-slow">
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

        <h3
          class="text-xl font-semibold text-teal-700 mt-6 border-l-4 border-teal-500 pl-3"
        >
          👉 Detailed Calculation
        </h3>
        <table
          class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden"
        >
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Total Annual Income
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.annualIncome || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Exempted Income
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.exemption || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Taxable Income
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.taxableIncome || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Tax-Free Threshold ({{ gender }})
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.taxFreeThreshold || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Allowable Investment
              <span class="text-xs text-blue-800 italic"
                >(20% of Taxable Income)</span
              >
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.allowableInvestment || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Total Investment
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.totalInvestment || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
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
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
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
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Actual Rebate Based on Your Investment
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.rebate || 0) }}
            </td>
          </tr>
        </table>

        <!-- Tax Breakdown Table (shown when tax is ≥5000) -->
        <div v-if="(results.actualFinalTax || 0) >= 5000">
          <h3
            class="text-xl font-semibold text-teal-700 mt-6 border-l-4 border-teal-500 pl-3"
          >
            👉 Tax Breakdown
          </h3>
          <table
            class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden"
          >
            <tr>
              <th
                class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
              >
                Income Range
              </th>
              <th
                class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
              >
                Rate
              </th>
              <th
                class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
              >
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
            <tr>
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
            <tr>
              <th colspan="2" class="p-3 text-left border border-gray-200">
                Monthly Tax Payable
              </th>
              <td class="p-3 text-left border border-gray-200">
                BDT {{ formatNumber(results.monthlyTaxWithInvestment || 0) }}
              </td>
            </tr>
          </table>
        </div>

        <h3
          class="text-xl font-semibold text-teal-700 mt-6 border-l-4 border-teal-500 pl-3"
        >
          👉 Tax With Maximum Investment
        </h3>
        <table
          class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden"
        >
          <tr class="bg-green-50">
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Final Payable Tax (with max possible investment)
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.maxPossibleFinalTax || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Monthly Tax
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.monthlyTaxWithMaxInvestment || 0) }}
            </td>
          </tr>
        </table>

        <h3
          class="text-xl font-semibold text-teal-700 mt-6 border-l-4 border-teal-500 pl-3"
        >
          👉 Tax Without Investment
        </h3>
        <table
          class="w-full mt-4 border-collapse shadow-sm rounded-lg overflow-hidden"
        >
          <tr class="bg-green-50">
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Final Payable Tax
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.taxWithoutInvestment || 0) }}
            </td>
          </tr>
          <tr>
            <th
              class="bg-teal-100 text-teal-700 p-3 text-left border border-gray-200"
            >
              Monthly Tax
            </th>
            <td class="p-3 text-left border border-gray-200">
              BDT {{ formatNumber(results.monthlyTaxWithoutInvestment || 0) }}
            </td>
          </tr>
        </table>
      </div>
    </div>

    <footer class="mt-4 md:mt-6 py-8 bg-teal-700 text-white rounded-xl">
      <div
        class="flex flex-col md:flex-row justify-around items-center max-w-7xl mx-auto px-5"
      >
        <div class="text-center py-4">
          <h4 class="mb-4 font-semibold text-lg">Support the Developer</h4>
          <a
            href="https://www.buymeacoffee.com/anisAronno"
            target="_blank"
            class="inline-block transition-transform duration-300 hover:scale-105"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              height="50"
              width="210"
              alt="anisAronno"
            />
          </a>
        </div>
        <div class="text-center py-4">
          <h4 class="mb-4 font-semibold text-lg">Contribute on GitHub</h4>
          <a
            href="https://github.com/anisAronno/bd-tax-calculator"
            target="_blank"
            class="inline-flex items-center bg-white text-teal-700 px-4 py-2.5 rounded-md font-bold transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5"
          >
            <svg
              class="mr-2"
              height="24"
              width="24"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
            Star / Report Issues
          </a>
        </div>
      </div>
      <div class="text-center mt-5 pt-2.5 border-t border-white/20 text-sm">
        © {{ new Date().getFullYear() }} Bangladesh Tax Calculator. All rights
        reserved.
      </div>
    </footer>
  </div>
</template>

<script>
import AppHeader from "./AppHeader.vue";
export default {
  name: "App",
  data() {
    return {
      gender: "Male",
      salary: "",
      festival: "",
      otherIncome: "",
      annualIncomeInput: "",
      savings: "",
      dps: "",
      lip: "",
      share: "",
      rpf: "",
      otherInv: "",
      useAnnualInput: false,
      calculated: true, // Changed to true to always show the result section
      results: {}, // Default empty results
      notice: "",
    };
  },
  components: {
    AppHeader,
  },
  methods: {
    validateInput(field, maxValue) {
      // Remove non-numeric characters
      this[field] = this[field].replace(/[^0-9]/g, "");

      // Check if value exceeds maximum
      const value = parseFloat(this[field]) || 0;
      if (value > maxValue) {
        alert(`Maximum allowed value is ${maxValue.toLocaleString()}`);
        this[field] = maxValue.toString();
      }
    },
    validateAnnualInput() {
      // Remove non-numeric characters
      this.annualIncomeInput = this.annualIncomeInput.replace(/[^0-9]/g, "");

      // Check if value exceeds maximum
      const value = parseFloat(this.annualIncomeInput) || 0;
      if (value > 100000000) {
        alert("Maximum allowed value is 100,000,000");
        this.annualIncomeInput = "100000000";
      }
    },
    formatNumber(number) {
      return (number || 0).toLocaleString();
    },
    calculateTax() {
      // Basic inputs
      const gender = this.gender;
      let annualIncome;

      if (this.useAnnualInput) {
        annualIncome = parseFloat(this.annualIncomeInput) || 0;
        if (!annualIncome) {
          alert("Annual income is required");
          return;
        }
      } else {
        const salary = parseFloat(this.salary) || 0;
        if (!salary) {
          alert("Monthly salary is required");
          return;
        }
        const festival = parseFloat(this.festival) || 0;
        const otherIncome = parseFloat(this.otherIncome) || 0;

        // Calculate total annual income
        annualIncome = salary * 12 + festival + otherIncome;
      }

      const minimumTax = 5000; // Minimum tax as per government rules

      // Investment inputs
      const savings = parseFloat(this.savings) || 0;
      const dps = parseFloat(this.dps) || 0;
      const lip = parseFloat(this.lip) || 0;
      const share = parseFloat(this.share) || 0;
      const rpf = parseFloat(this.rpf) || 0;
      const otherInv = parseFloat(this.otherInv) || 0;

      // Calculate exempted income (min of 1/3 of annual income or 450,000)
      const exemption = Math.round(Math.min(annualIncome / 3, 450000));

      // Calculate taxable income
      const taxableIncome = Math.max(0, annualIncome - exemption);

      // Set tax-free threshold based on gender
      const taxFreeThreshold =
        gender === "Female" || gender === "Senior Citizen" ? 400000 : 350000;

      // Calculate tax according to the formula provided
      let tax = 0;
      let remainingIncome = taxableIncome;

      // For tax breakdown calculation
      const taxSlabs = [];

      // Complex tax calculation based on slabs
      if (remainingIncome > taxFreeThreshold) {
        // First slab (after tax-free threshold)
        const slab1Limit = 100000;
        const slab1Amount = Math.min(
          remainingIncome - taxFreeThreshold,
          slab1Limit
        );
        const slab1Tax = slab1Amount * 0.05;
        tax += slab1Tax;
        remainingIncome -= taxFreeThreshold + slab1Amount;

        // Add to tax breakdown
        taxSlabs.push({
          range: `BDT ${this.formatNumber(
            taxFreeThreshold + 1
          )} - ${this.formatNumber(taxFreeThreshold + slab1Limit)}`,
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
            range: `BDT ${this.formatNumber(
              taxFreeThreshold + slab1Limit + 1
            )} - ${this.formatNumber(
              taxFreeThreshold + slab1Limit + slab2Limit
            )}`,
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
              range: `BDT ${this.formatNumber(
                taxFreeThreshold + slab1Limit + slab2Limit + 1
              )} - ${this.formatNumber(
                taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit
              )}`,
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
                range: `BDT ${this.formatNumber(
                  taxFreeThreshold + slab1Limit + slab2Limit + slab3Limit + 1
                )} - ${this.formatNumber(
                  taxFreeThreshold +
                    slab1Limit +
                    slab2Limit +
                    slab3Limit +
                    slab4Limit
                )}`,
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
                  range: `BDT ${this.formatNumber(
                    taxFreeThreshold +
                      slab1Limit +
                      slab2Limit +
                      slab3Limit +
                      slab4Limit +
                      1
                  )} - ${this.formatNumber(
                    taxFreeThreshold +
                      slab1Limit +
                      slab2Limit +
                      slab3Limit +
                      slab4Limit +
                      slab5Limit
                  )}`,
                  rate: 25,
                  tax: slab5Tax,
                });

                // Final slab (above 3.5M taxable income + tax-free threshold)
                if (remainingIncome > 0) {
                  const slab6Tax = remainingIncome * 0.3;
                  tax += slab6Tax;

                  // Add to tax breakdown
                  taxSlabs.push({
                    range: `Above BDT ${this.formatNumber(
                      taxFreeThreshold +
                        slab1Limit +
                        slab2Limit +
                        slab3Limit +
                        slab4Limit +
                        slab5Limit
                    )}`,
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

      // Calculate total investment
      const totalInvestment = savings + dps + lip + share + rpf + otherInv;

      // Calculate rebateable investment (min of total investment or allowable investment)
      const rebateableInvestment = Math.min(
        totalInvestment,
        allowableInvestment
      );

      // Calculate maximum possible rebate (minimum of 15% of rebateable investment OR 3% of taxable income)
      const rebatePercentage = Math.round(allowableInvestment * 0.15); // 15% of max possible investment
      const rebateFixed = Math.round(taxableIncome * 0.03); // 3% of taxable income
      const maxPossibleRebate = Math.min(
        rebatePercentage,
        rebateFixed,
        1000000
      );

      // Calculate actual rebate based on user's investment
      const actualRebate = Math.round(rebateableInvestment * 0.15);
      const rebate = Math.min(actualRebate, maxPossibleRebate);

      // Check if minimum tax should apply (only if taxable income exceeds the threshold)
      const shouldApplyMinimumTax = taxableIncome > taxFreeThreshold;

      // Calculate tax without investment
      const taxWithoutInvestment = shouldApplyMinimumTax
        ? Math.max(tax, minimumTax)
        : tax;

      // Calculate tax with actual investment
      const actualTaxAfterRebate = Math.max(tax - rebate, 0);
      const actualFinalTax = shouldApplyMinimumTax
        ? Math.max(actualTaxAfterRebate, minimumTax)
        : actualTaxAfterRebate;

      // Calculate tax with maximum possible investment
      const maxTaxAfterRebate = Math.max(tax - maxPossibleRebate, 0);
      const maxPossibleFinalTax = shouldApplyMinimumTax
        ? Math.max(maxTaxAfterRebate, minimumTax)
        : maxTaxAfterRebate;

      // Calculate monthly tax
      const monthlyTaxWithInvestment = Math.round(actualFinalTax / 12);
      const monthlyTaxWithoutInvestment = Math.round(taxWithoutInvestment / 12);
      const monthlyTaxWithMaxInvestment = Math.round(maxPossibleFinalTax / 12);

      // Create notice if minimum tax is applied
      this.notice =
        shouldApplyMinimumTax &&
        actualFinalTax <= minimumTax &&
        actualFinalTax > 0
          ? "Minimum tax of BDT 5,000 is applied as per government rules for taxable income exceeding the threshold."
          : "";

      // Set results
      this.results = {
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
    },
  },
  // Initialize results with default values when component is created
  created() {
    // Set default tax-free threshold based on gender
    const taxFreeThreshold =
      this.gender === "Female" || this.gender === "Senior Citizen"
        ? 400000
        : 350000;

    // Initialize the results with zeros
    this.results = {
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
  },
  // Watch for gender changes to update tax-free threshold in results
  watch: {
    gender(newGender) {
      this.results.taxFreeThreshold =
        newGender === "Female" || newGender === "Senior Citizen"
          ? 400000
          : 350000;
    },
  },
};
</script>
