import { defineStore } from 'pinia'
import type { Country } from '../../domain/models/Country'
import { CountryRepositoryImpl } from '../../infrastructure/persistence/CountryRepositoryImpl'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [] as Country[],
    filtered: [] as Country[],
    loading: false,
    error: '' as string | null,
    search: '',
    region: '',
    page: 1,
    pageSize: 10,
  }),
  getters: {
    paginatedCountries: (state) => {
      const start = (state.page - 1) * state.pageSize
      const end = start + state.pageSize
      return state.filtered.slice(start, end)
    },
  },
  actions: {
    async fetchCountries() {
      this.loading = true
      this.error = null
      try {
        const repo = new CountryRepositoryImpl()
        this.countries = await repo.getAll()
        this.applyFilters()
      } catch (err: any) {
        this.error = err.message || 'Error fetching countries'
      } finally {
        this.loading = false
      }
    },
    applyFilters() {
      this.filtered = this.countries.filter((c) => {
        const matchName = this.search
          ? c.name.common.toLowerCase().includes(this.search.toLowerCase())
          : true
        const matchRegion = this.region ? c.region === this.region : true
        return matchName && matchRegion
      })
      this.page = 1
    },
    setSearch(search: string) {
      this.search = search
      this.applyFilters()
    },
    setRegion(region: string) {
      this.region = region
      this.applyFilters()
    },
    setPage(page: number) {
      this.page = page
    },
  }
})