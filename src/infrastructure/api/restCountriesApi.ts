const BASE = 'https://restcountries.com/v3.1'


export async function fetchAllCountries() {
const res = await fetch(`${BASE}/all?fields=cca3,name,flags,region,population,capital,languages,currencies`)
if (!res.ok) throw new Error('Failed to fetch countries')
return res.json()
}


export async function fetchCountryByCode(code: string) {
const res = await fetch(`${BASE}/alpha/${code}?fields=cca3,name,flags,region,population,capital,languages,currencies`)
if (!res.ok) throw new Error('Failed to fetch country')
const data = await res.json()
return Array.isArray(data) ? data[0] : data
}


export async function searchByName(name: string) {
const res = await fetch(`${BASE}/name/${encodeURIComponent(name)}?fields=cca3,name,flags,region,population,capital,languages,currencies`)
if (!res.ok) return []
return res.json()
}