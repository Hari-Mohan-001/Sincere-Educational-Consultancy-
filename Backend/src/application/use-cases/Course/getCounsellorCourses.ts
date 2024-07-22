import { ICourseRepository } from "../../../domain/repositories/ICourseRepository"

export const getCounsellorCourses =  (courseRepository:ICourseRepository)=>{
    const execute = async(countryId:string)=>{
        console.log('getcnsr');
        
       const courses = await courseRepository.getCounsellorCourse(countryId)
       console.log('cnsr', courses);
       
       if(courses.length>0){
        return courses
       }else{
        console.log('no crs');
        
        throw new Error("No courses found");
        
       }
    }
    return{
        execute   
    }
}