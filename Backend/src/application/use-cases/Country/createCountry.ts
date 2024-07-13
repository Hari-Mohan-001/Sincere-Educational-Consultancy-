import { ICountryRepository } from "../../../domain/repositories/ICountryRepository"

export const addNewCountry = (countryRepository:ICountryRepository)=>{
    const execute = async(name:string, image:string):Promise<boolean>=>{
        const countryObj = {
            id:"",
            name,
            image
        }
        const saveCountry = await countryRepository.createCountry(countryObj)
        console.log('kiir',saveCountry);
        
            if(!saveCountry){
                return false
            }
            return true
    }
    return {
        execute
    }
}