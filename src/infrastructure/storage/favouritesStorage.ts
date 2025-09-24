const KEY = 'countries:favourites'


export function loadFavourites(): string[] {
try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
catch { return [] }
}


export function saveFavourites(ids: string[]) {
localStorage.setItem(KEY, JSON.stringify(ids))
}