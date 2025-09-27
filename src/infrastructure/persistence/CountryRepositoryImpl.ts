import type { Country } from '../../domain/models/Country'

export interface CountryRepository {
  getAll(): Promise<Country[]>
  getByCode(code: string): Promise<Country | undefined>
}

export class CountryRepositoryImpl implements CountryRepository {
  private readonly baseUrl = 'https://restcountries.com/v3.1'

  async getAll(): Promise<Country[]> {
    const res = await fetch(`${this.baseUrl}/all`)
    if (!res.ok) throw new Error('Failed to fetch countries')
    const data = (await res.json()) as Country[]
    return data
  }

  async getByCode(code: string): Promise<Country | undefined> {
    const res = await fetch(`${this.baseUrl}/alpha/${code}`)
    if (!res.ok) throw new Error(`Failed to fetch country ${code}`)
    const data = (await res.json()) as Country[]
    return data[0] // la API devuelve un array
  }
}
