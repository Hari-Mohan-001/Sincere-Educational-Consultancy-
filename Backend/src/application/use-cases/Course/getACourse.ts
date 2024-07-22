import { ICourseRepository } from "../../../domain/repositories/ICourseRepository"

export const getCourseByCourseId = (courseRepository:ICourseRepository)=>{
    const execute = async (courseId:string)=>{
          const course = await courseRepository.getACourse(courseId)
          return course
    }
    return {execute}
}