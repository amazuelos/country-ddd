<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">My Favourites</h2>

    <div v-if="favouritesCodes.length === 0" class="text-gray-500">
      No favourites yet.
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="country in favouriteCountries"
        :key="country.cca3"
        class="flex justify-between items-center border p-2 rounded bg-white hover:bg-gray-50 cursor-pointer"
        @click="goToDetail(country.cca3)"
      >
        <span>{{ country.name.common }}</span>
        <button
          @click.stop="toggleFavourite(country.cca3)"
          class="px-2 py-1 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useFavouritesStore } from "../stores/useFavouritesStore";
import { useCountriesStore } from "../stores/useCountriesStore";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "FavouritesPage",
  setup() {
    const favStore = useFavouritesStore();
    const countriesStore = useCountriesStore();
    const router = useRouter();

    const { favourites: favouritesCodes } = storeToRefs(favStore);
    const { countries } = storeToRefs(countriesStore);

    onMounted(() => {
      favStore.load();
      if (countries.value.length === 0) countriesStore.fetchCountries();
    });

    const favouriteCountries = computed(() =>
      countries.value.filter((c) => favouritesCodes.value.includes(c.cca3))
    );

    const toggleFavourite = (code: string) => favStore.toggle(code);
    const goToDetail = (code: string) =>
      router.push({ name: "CountryDetail", params: { code } });

    return { favouritesCodes, favouriteCountries, toggleFavourite, goToDetail };
  },
};
</script>
