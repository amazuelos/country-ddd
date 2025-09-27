<template>
  <div class="flex flex-col md:flex-row gap-4 mb-6">
    <!-- Buscador -->
    <input
      v-model="search"
      type="text"
      placeholder="Search by name..."
      class="border rounded p-2 flex-1"
    />

    <!-- Filtro por región -->
    <select v-model="region" class="border rounded p-2">
      <option value="">All regions</option>
      <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref<string>('')
const region = ref<string>('')

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
</script>
