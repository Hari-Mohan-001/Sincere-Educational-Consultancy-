import { University } from "../../../domain/entities/university";
import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository"

export const adminGetAllUniversities = (universityRepository:IUniversityRepository)=>{
    const execute = async():Promise<University[]>=>{
              const universities = await universityRepository.getAllUniversitiesForAdmin()
              if(!universities.length){
                throw new Error("No universities listed"); 
              }
              return universities
    }
    return{
        execute
    }
}