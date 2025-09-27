<template>
  <table class="w-full border-collapse border">
    <thead>
      <tr class="bg-gray-100">
        <th class="p-2 border">Flag</th>
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Region</th>
        <th class="p-2 border">Population</th>
        <th class="p-2 border">Fav</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="country in countries"
        :key="country.cca3"
        class="hover:bg-gray-50 cursor-pointer"
        @click="emit('select', country)"
      >
        <td class="border p-2">
          <img :src="country.flags.png" :alt="country.name.common" class="w-8 h-6" />
        </td>
        <td class="border p-2">{{ country.name.common }}</td>
        <td class="border p-2">{{ country.region }}</td>
        <td class="border p-2">{{ country.population.toLocaleString() }}</td>
        <td class="border p-2 text-center" @click.stop="emit('toggleFavourite', country)">
          ⭐
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Country } from '../../domain/models/Country'

defineProps<{
  countries: Country[]
}>()

const emit = defineEmits<{
  (e: 'select', country: Country): void
  (e: 'toggleFavourite', country: Country): void
}>()
</script>