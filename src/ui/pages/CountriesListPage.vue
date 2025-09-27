<template>
  <div class="p-4">
    <!-- Filtros -->
    <CountriesFilters
      v-model:search="search"
      v-model:region="region"
      :regions="regions"
      @search="onSearch"
      @filter="onFilter"
      class="my-6"
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

<script lang="ts">
import { useCountriesStore } from '../stores/useCountriesStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

import CountriesFilters from '../components/CountriesFilters.vue'
import CountriesTable from '../components/CountriesTable.vue'
import CountriesPagination from '../components/CountriesPagination.vue'

export default {
  name: 'CountriesListPage',
  components: {
    CountriesFilters,
    CountriesTable,
    CountriesPagination
  },
  setup() {
    const countriesStore = useCountriesStore()
    const { countries, filtered, loading, error, search, region, page, paginatedCountries, totalPages } = storeToRefs(countriesStore)
    const router = useRouter()

    // Generar lista de regiones dinámicamente
    const regions = computed(() => [...new Set(countries.value.map(c => c.region).filter(Boolean))])

    // Fetch inicial
    onMounted(() => {
      countriesStore.fetchCountries()
    })

    // Métodos para filtros
    const onSearch = () => countriesStore.setSearch(search.value)
    const onFilter = () => countriesStore.setRegion(region.value)

    // Ir a detalle de país
    const goToDetail = (country: any) => {
      router.push({ name: 'CountryDetail', params: { code: country.cca3 } })
    }    
    // Favoritos
    const toggleFavourite = (country: any) => countriesStore.toggleFavourite(country)

    // Paginación
    const nextPage = () => countriesStore.setPage(page.value + 1)
    const prevPage = () => countriesStore.setPage(page.value - 1)

    return { 
      filtered, 
      loading, 
      error, 
      search, 
      region, 
      paginated: paginatedCountries, 
      page, 
      totalPages, 
      onSearch, 
      onFilter, 
      goToDetail, 
      toggleFavourite,
      nextPage, 
      prevPage, 
      regions
    }
  }
}
</script>