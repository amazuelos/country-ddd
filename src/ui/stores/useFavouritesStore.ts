import { defineStore } from "pinia";
import type { Country } from "../../domain/models/Country";

export const useFavouritesStore = defineStore("favourites", {
  state: () => ({
    favourites: JSON.parse(localStorage.getItem("favourites") || "[]") as string[],
  }),
  actions: {
    toggle(code: string) {
      const index = this.favourites.indexOf(code);
      if (index === -1) this.favourites.push(code);
      else this.favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    },
    load() {
      this.favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    },
    isFavourite(code: string) {
      return this.favourites.includes(code);
    },
  },
});