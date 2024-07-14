import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository"


export const getAllUniversities = (universityRepository:IUniversityRepository)=>{
    const execute =async(countryId:string)=>{
          const data = await universityRepository.getAllUniversities(countryId)
          if(data.length>=1){
            return data
          }else{
            throw new Error("No university listed");
            
          }
    }
    return{
        execute
    }
}