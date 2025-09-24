import { Country } from '../models/Country'


export interface CountryRepository {
getAll(): Promise<Country[]>
getByName(name: string): Promise<Country[]>
getByCode(code: string): Promise<Country | null>
}