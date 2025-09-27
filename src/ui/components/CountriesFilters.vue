<template>
  <div class="flex flex-col md:flex-row gap-4 mb-6">
    <!-- Buscador -->
    <input
      v-model="localSearch"
      type="text"
      placeholder="Search by name..."
      class="border rounded p-2 flex-1"
    />

    <!-- Filtro por región -->
    <select v-model="localRegion" class="border rounded p-2">
      <option value="">All regions</option>
      <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  search: string
  region: string
  regions: string[]
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:region', value: string): void
}>()

const localSearch = ref(props.search)
const localRegion = ref(props.region)

// Emitir cambios al padre / store
watch(localSearch, val => emit('update:search', val))
watch(localRegion, val => emit('update:region', val))
</script>