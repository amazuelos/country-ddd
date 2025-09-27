import type { Country } from '../../domain/models/Country'
import { fetchAllCountries, fetchCountryByCode, searchByName } from '../api/restCountriesApi'

export interface CountryRepository {
  getAll(): Promise<Country[]>
  getByCode(code: string): Promise<Country | undefined>
  search(name: string): Promise<Country[]>
}

export class CountryRepositoryImpl implements CountryRepository {
  async getAll(): Promise<Country[]> {
    return fetchAllCountries()
  }

  async getByCode(code: string): Promise<Country | undefined> {
    return fetchCountryByCode(code)
  }

  async search(name: string): Promise<Country[]> {
    return searchByName(name)
  }
}