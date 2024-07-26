import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository"

export const getUniversitiesNotApproved = (universityRepository:IUniversityRepository)=>{
    const execute = async()=>{
        const universities = await universityRepository.getNotApprovedUniversities()
        if(!universities.length){
            throw new Error("No Universities found");   
        }
        return universities
    }
    return{
        execute
    }
}