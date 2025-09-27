<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Countries DDD App</h1>
      <nav class="space-x-4">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link to="/favourites" class="hover:underline">Favourites</router-link>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-1 p-4">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 text-gray-700 p-4 text-center">
      &copy; 2025 Countries App
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainLayout'
}
</script>