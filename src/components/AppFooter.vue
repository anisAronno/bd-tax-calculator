<template>
  <footer class="mt-4 md:mt-6 py-8 bg-teal-700 text-white md:rounded-xl">
    <div
      class="flex flex-col md:flex-row justify-around items-center max-w-7xl mx-auto px-5"
    >
      <div class="text-center py-4">
        <h4 class="mb-4 font-semibold text-lg">Support the Developer</h4>

        <div
          class="flex flex-col lg:flex-row gap-6 justify-center items-center md:items-start"
        >
          <!-- Buy Me Coffee Option -->
          <div class="flex flex-col items-center">
            <p class="text-sm text-gray-200 mb-2">☕ International</p>
            <a
              href="https://www.buymeacoffee.com/anisAronno"
              target="_blank"
              class="inline-block transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                height="40"
                width="168"
                alt="anisAronno"
              />
            </a>
          </div>

          <!-- Mobile Finance Service Option -->
          <div class="flex flex-col items-center">
            <p class="text-md text-gray-200 mb-1">🇧🇩 Bangladesh</p>

            <div
              class="mb-2 p-2 rounded-lg border border-white/10 bg-gradient-to-b from-yellow-200 to-yellow-400 text-black transition-transform duration-300 hover:scale-102"
            >
              <a
                href="https://wa.me/8801816366535"
                class="font-mono text-md md:text-lg font-medium tracking-wider transition-colors duration-300"
              >
                01816366535
                <sub class="text-[10px] text-gray-900 font-sm">(Send Money)</sub>
              </a>
            </div>

            <div class="flex gap-1 md:gap-2 flex-wrap justify-center">
              <!-- bKash -->
              <div
                class="group flex items-center gap-1 bg-gradient-to-r from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30 px-2 py-1.5 rounded border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105"
              >
                <img
                  src="/bkash.png"
                  alt="bKash"
                  class="w-4 h-4 object-contain"
                />
                <span class="text-xs font-medium">bKash</span>
              </div>

              <!-- Nagad -->
              <div
                class="group flex items-center gap-1 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 px-2 py-1.5 rounded border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
              >
                <img
                  src="/nagad.png"
                  alt="Nagad"
                  class="w-4 h-4 object-contain"
                />
                <span class="text-xs font-medium">Nagad</span>
              </div>

              <!-- Rocket -->
              <div
                class="group flex items-center gap-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 px-2 py-1.5 rounded border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <img
                  src="/rocket.png"
                  alt="Rocket"
                  class="w-4 h-4 object-contain"
                />
                <span class="text-xs font-medium">Rocket</span>
              </div>
            </div>
          </div>
        </div>
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
    <div class="text-center mt-5 pt-2.5 border-t border-white/20 text-sm px-2">
      ⚡ <strong>Note:</strong> Your data is not saved anywhere – calculations
      are done entirely in your browser.
    </div>
    <div class="text-center mt-5 pt-2.5 border-t border-white/20 text-sm">
      © {{ new Date().getFullYear() }} BD Tax Calculator. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
