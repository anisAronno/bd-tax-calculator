<template>
  <!-- Header Section -->
  <header class="bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg">
    <div class="container mx-auto px-2 py-2 :md:px-4 md:py-6">
      <div class="flex items-center justify-center text-center">
        <!-- Logo & Title -->
        <div class="flex items-center">
          <img src="@/assets/logo.png" alt="Bangladesh Income Tax Calculator" class="h-12 w-12 mr-3">
          <div>
            <h1 class="text-md md:text-3xl font-bold text-white">Bangladeshi Income Tax Calculator</h1>
            <p class="text-teal-100 text-xs md:text-base">Accurately estimate your personal income tax based on the latest tax laws in Bangladesh.</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>