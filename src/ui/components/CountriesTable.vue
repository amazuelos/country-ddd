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
        @click="selectCountry(country)"
      >
        <td class="border p-2">
          <img :src="country.flags.png" :alt="country.name.common" class="w-8 h-6" />
        </td>
        <td class="border p-2">{{ country.name.common }}</td>
        <td class="border p-2">{{ country.region }}</td>
        <td class="border p-2">{{ country.population.toLocaleString() }}</td>
        <td class="border p-2 text-center">
          <button @click.stop="toggleFav(country)" class="text-yellow-500">
            {{ isFavourite(country.cca3) ? '★' : '☆' }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Country } from '../../domain/models/Country'
import { useFavouritesStore } from '../stores/useFavouritesStore'

// Props
defineProps<{
  countries: Country[]
}>()

// Emits
const emit = defineEmits<{
  (e: 'select', country: Country): void
}>()

// Store de favoritos
const favStore = useFavouritesStore()

// Funciones
const toggleFav = (country: Country) => {
  favStore.toggle(country.cca3)
}

const isFavourite = (code: string) => {
  return favStore.isFavourite(code)
}

const selectCountry = (country: Country) => {
  emit('select', country)
}
</script>