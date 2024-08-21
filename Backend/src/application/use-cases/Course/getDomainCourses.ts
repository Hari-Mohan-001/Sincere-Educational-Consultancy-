import { ICourseRepository } from "../../../domain/repositories/ICourseRepository"

export const getDomainSpecificCourses = (courseRepository:ICourseRepository)=>{
    const execute = async (domainId:string)=>{
            const courses = await courseRepository.getDomainCourses(domainId)
          
            
            if(courses?.length){
                return courses
            }
    }
    return{
        execute
    }
}