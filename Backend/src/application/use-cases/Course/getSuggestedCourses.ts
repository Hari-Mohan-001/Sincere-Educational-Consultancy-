import { ICourseRepository } from "../../../domain/repositories/ICourseRepository"

export const SuggestedCourses = (courseRepository:ICourseRepository)=>{
    const execute = async(qualification:string)=>{
        const courses = await courseRepository.getSuggestedCourse(qualification)
        console.log('usecase', courses);
        
        if(courses.length>0){
            return courses
        }else{
            console.log('no crse');
            
            throw new Error("No courses found for this qualification");
            
        }
    }
    return{
        execute
    }
}