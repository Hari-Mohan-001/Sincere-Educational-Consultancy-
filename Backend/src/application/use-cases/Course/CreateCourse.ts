import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";
import { CourseDTO } from "../../dtos/courseDto";

export const createNewCourse = (courseRepository:ICourseRepository)=>{

    const execute = async(courseDto:CourseDTO)=>{
        console.log('exefr');
        
             const course = await courseRepository.createCourse(courseDto)
             console.log('crsexe',course);
             
             if(course){
                return course
             }else{
                throw new Error("Falied to create Course");
                
             }
    }
    return{
        execute
    }
}