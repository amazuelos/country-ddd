<template>
  <div class="p-4">
    <!-- Filtros -->
    <CountriesFilters
      class="mb-6"
      :search="search"
      :region="region"
      :regions="regions"
      @update:search="onSearch"
      @update:region="onFilter"
    />

    <!-- Estados de carga / error -->
    <div v-if="loading" class="text-center py-6">Loading countries...</div>
    <div v-else-if="error" class="text-center text-red-600 py-6">{{ error }}</div>

    <!-- Tabla y paginación -->
    <div v-else>
      <CountriesTable
        :countries="paginated"
        @select="goToDetail"
        @toggleFavourite="toggleFavourite"
      />

      <CountriesPagination
        class="my-6"
        v-model:page="page"
        :total-pages="totalPages"
        @next="nextPage"
        @prev="prevPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCountriesStore } from '../stores/useCountriesStore'

import CountriesFilters from '../components/CountriesFilters.vue'
import CountriesTable from '../components/CountriesTable.vue'
import CountriesPagination from '../components/CountriesPagination.vue'

const countriesStore = useCountriesStore()
const { countries, filtered, paginatedCountries, loading, error, search, region, page, totalPages } = storeToRefs(countriesStore)
const router = useRouter()

// Handlers para filtros
const onSearch = (val: string) => {
  console.log('onSearch invoked:', val)
  countriesStore.setSearch(val)
}

const onFilter = (val: string) => {
  console.log('onFilter invoked:', val)
  countriesStore.setRegion(val)
}

// Generar lista dinámica de regiones
const regions = computed(() => [...new Set(countries.value.map(c => c.region).filter(Boolean))])

// Fetch inicial de países
onMounted(() => countriesStore.fetchCountries())

// Funciones de acción
const goToDetail = (country: any) => router.push({ name: 'CountryDetail', params: { code: country.cca3 } })
const toggleFavourite = (country: any) => countriesStore.toggleFavourite(country)
const nextPage = () => countriesStore.setPage(page.value + 1)
const prevPage = () => countriesStore.setPage(page.value - 1)

// Para pasar a la tabla
const paginated = paginatedCountries
</script>