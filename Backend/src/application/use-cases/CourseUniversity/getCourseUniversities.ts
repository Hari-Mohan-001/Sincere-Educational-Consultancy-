import { ICourseUniversityRepository } from "../../../domain/repositories/ICourseUniversityRepository"

export const getAllUniversitiesForACourse = (courseUniversityrepository:ICourseUniversityRepository)=>{
    const execute = async(courseId:string)=>{
        const universities = await courseUniversityrepository.fetchAllUniversitiesForACourse(courseId)
        if(!universities.length){
            throw new Error("universities not found");   
        }
        return universities
    }
    return{
        execute
    }
}