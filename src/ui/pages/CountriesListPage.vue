<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Countries</h2>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
      <input
        v-model="search"
        @input="onSearch"
        type="text"
        placeholder="Search by name"
        class="border p-2 rounded flex-1"
      />
      <select v-model="region" @change="onFilter" class="border p-2 rounded">
        <option value="">All regions</option>
        <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
      </select>
    </div>

    <!-- Table -->
    <div v-if="loading" class="text-center py-4">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <table v-else class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 border">Flag</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Region</th>
          <th class="p-2 border">Population</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="country in paginated"
          :key="country.cca3"
          class="hover:bg-gray-100 cursor-pointer"
          @click="goToDetail(country.cca3)"
        >
          <td class="p-2 border">
            <img :src="country.flags.png" alt="flag" class="w-10 h-6 object-cover" />
          </td>
          <td class="p-2 border">{{ country.name.common }}</td>
          <td class="p-2 border">{{ country.region }}</td>
          <td class="p-2 border">{{ country.population.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-center mt-4 gap-2">
      <button
        :disabled="page <= 1"
        @click="prevPage"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button
        :disabled="page >= totalPages"
        @click="nextPage"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useCountriesStore } from '../stores/useCountriesStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

export default {
  name: 'CountriesListPage',
  setup() {
    const countriesStore = useCountriesStore()
    const { countries, filtered, loading, error, search, region, page, paginatedCountries, totalPages } = storeToRefs(countriesStore)
    const router = useRouter()

    const regions = computed(() => [...new Set(countries.value.map(c => c.region).filter(Boolean))])

    onMounted(() => {
      countriesStore.fetchCountries()
    })

    const onSearch = () => countriesStore.setSearch(search.value)
    const onFilter = () => countriesStore.setRegion(region.value)

    const goToDetail = (code: string) => router.push({ name: 'CountryDetail', params: { code } })

    const nextPage = () => countriesStore.setPage(page.value + 1)
    const prevPage = () => countriesStore.setPage(page.value - 1)

    return { filtered, loading, error, search, region, paginated: paginatedCountries, page, totalPages, onSearch, onFilter, goToDetail, nextPage, prevPage, regions }
  }
}
</script>