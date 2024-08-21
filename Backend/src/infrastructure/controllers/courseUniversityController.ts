import { Request, Response } from "express"
import { getAllUniversitiesForACourse } from "../../application/use-cases/CourseUniversity/getCourseUniversities"
import { mongoCourseUniversityRepository } from "../persistance/mongoCourseUniversityRepository"

const courseUniversityRepository = new mongoCourseUniversityRepository()

const courseUniversityController = ()=>{

    const getAllUniversity = async(req:Request,res:Response)=>{
        const courseId = req.params.courseId
        
        
            try {
                const universities = await getAllUniversitiesForACourse(courseUniversityRepository).execute(courseId)
               
                
                if(universities.length){
                    res.status(200).json({message:'success', data:universities})
                 }
            } catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                  } else {
                    res.status(400).json({ message: "An unknown error occurred" });
                  }
            }
    }
    return{
        getAllUniversity
    }
}

export default courseUniversityController