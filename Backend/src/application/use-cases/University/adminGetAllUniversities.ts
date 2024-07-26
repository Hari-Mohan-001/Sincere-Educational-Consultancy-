import { University } from "../../../domain/entities/university";
import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository"

export const adminGetApprovedUniversities = (universityRepository:IUniversityRepository)=>{
    const execute = async():Promise<University[]>=>{
              const universities = await universityRepository.getApprovedUniversitiesForAdmin()
              if(!universities.length){
                throw new Error("No universities listed"); 
              }
              return universities
    }
    return{
        execute
    }
}