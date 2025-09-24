import { defineStore } from 'pinia'
import { loadFavourites, saveFavourites } from '../../infrastructure/storage/favouritesStorage'

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favourites: [] as string[] // array de cca3 codes
  }),
  getters: {
    count: (state) => state.favourites.length,
    isFavourite: (state) => (code: string) => state.favourites.includes(code)
  },
  actions: {
    load() {
      this.favourites = loadFavourites()
    },
    toggle(code: string) {
      if (this.favourites.includes(code)) {
        this.favourites = this.favourites.filter((c) => c !== code)
      } else {
        this.favourites.push(code)
      }
      saveFavourites(this.favourites)
    }
  }
})