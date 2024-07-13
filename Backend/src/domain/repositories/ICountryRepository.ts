import { Country } from "../entities/country";


export interface ICountryRepository{
    createCountry(country:Country) : Promise<Country>
      
}