import { ICountryRepository } from "../../../domain/repositories/ICountryRepository";


export const getCountries =  (countryRepository:ICountryRepository)=>{
       const execute = async ()=>{
        const data = await countryRepository.getAllCountries()
        if(!data){
            throw new Error("Country not found");   
        }
        return data
       }
       return{
        execute
       }
}