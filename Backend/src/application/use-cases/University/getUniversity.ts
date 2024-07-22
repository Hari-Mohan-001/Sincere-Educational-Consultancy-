import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository"

export const getUniversity = (universityRepository:IUniversityRepository)=>{
    const execute = async(universityId:string)=>{
          const university = await universityRepository.getUniversity(universityId)
          if(!university){
        throw new Error("Not found");
          }
          return university
    }
    return{
        execute
    }
}