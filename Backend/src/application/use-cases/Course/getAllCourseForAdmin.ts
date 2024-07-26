import { ICourseRepository } from "../../../domain/repositories/ICourseRepository"

export const getAllCourseForAdmin = (courseRepository:ICourseRepository)=>{
    const execute = async()=>{
       const courses = await courseRepository.getCoursesForAdmin()
       if(!courses.length){
        throw new Error("No courses found"); 
       }
       return courses
    }
    return {
        execute
    }
}