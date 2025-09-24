import { createRouter, createWebHistory } from 'vue-router'
const CountriesList = () => import('../../ui/pages/CountriesListPage.vue')
const CountryDetail = () => import('../../ui/pages/CountryDetailPage.vue')
const Favourites = () => import('../../ui/pages/FavouritesPage.vue')


const routes = [
{ path: '/', name: 'Home', component: CountriesList },
{ path: '/country/:code', name: 'CountryDetail', component: CountryDetail, props: true },
{ path: '/favourites', name: 'Favourites', component: Favourites },
]


export default createRouter({ history: createWebHistory(), routes })