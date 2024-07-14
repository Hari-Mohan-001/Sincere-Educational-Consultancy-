import { ICountryRepository } from "../../../domain/repositories/ICountryRepository";


export const getCountries =  (countryRepository:ICountryRepository)=>{
       const execute = async ()=>{
        const data = await countryRepository.getAllCountries()
        console.log('da', data);
        
        if(!data){
            throw new Error("Country not found");   
        }
        return data
       }

       return{
        execute
       }
}