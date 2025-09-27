<template>
  <div>
    <button @click="$router.back()" class="mb-4 px-3 py-1 bg-gray-200 rounded">Back</button>

    <div v-if="loading" class="text-center py-4">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="country" class="p-4 border rounded shadow bg-white">
      <img :src="country.flags.png" alt="flag" class="w-32 h-20 mb-4" />
      <h2 class="text-xl font-bold">{{ country.name.official }}</h2>
      <p><strong>Capital:</strong> {{ country.capital?.join(', ') || 'N/A' }}</p>
      <p><strong>Region:</strong> {{ country.region }}</p>
      <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
      <p><strong>Languages:</strong> {{ languageList }}</p>
      <p><strong>Currencies:</strong> {{ currencyList }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CountryRepositoryImpl } from '../../infrastructure/persistence/CountryRepositoryImpl'

export default {
  name: 'CountryDetailPage',
  setup() {
    const route = useRoute()
    const code = route.params.code as string
    const country = ref<any>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const repo = new CountryRepositoryImpl()

    onMounted(async () => {
      loading.value = true
      try {
        country.value = await repo.getByCode(code)
      } catch (err: any) {
        error.value = err.message || 'Failed to load country'
      } finally {
        loading.value = false
      }
    })

    const languageList = computed(() => country.value?.languages ? Object.values(country.value.languages).join(', ') : 'N/A')
    const currencyList = computed(() => country.value?.currencies ? Object.values(country.value.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ') : 'N/A')

    return { country, loading, error, languageList, currencyList }
  }
}
</script>