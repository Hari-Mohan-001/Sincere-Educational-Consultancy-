import { Request, Response } from "express";
import { mongoCourseRepository } from "../persistance/mongoCourseRepository";
import { CourseDTO } from "../../application/dtos/courseDto";
import { createNewCourse } from "../../application/use-cases/Course/CreateCourse";
import { cloudinaryUpload } from "../services/CloudinaryUpload";
import { allCourses } from "../../application/use-cases/Course/getAllCourse";

const courseRepository = new mongoCourseRepository();

const courseController = () => {
  const addCourse = async (req: Request, res: Response) => {
    const {
      name,
      qualification,
      fees,
      duration,
      university,
      description,
      logo,
    } = req.body;
console.log('fees',fees);

    const logoUrl = await cloudinaryUpload(logo,"Course")
    console.log('crsurl',logoUrl);
    
    const courseDto = new CourseDTO(
      name,
      qualification,
      fees,
      duration,
      description,
      logoUrl,
      university
    );
    try {
      console.log('try');
      
      const newCourse = await createNewCourse(courseRepository).execute(
        courseDto
      );
      if (newCourse) {
        res.status(200).json({ message: "Course created",data:newCourse });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getAllCourse = async (req: Request, res: Response)=>{
    try {
      console.log('allcorcourse');
      
           const courses = await allCourses(courseRepository).execute()
           if(courses){
            console.log('allcrs',courses);
            
            res.status(200).json({message:"success", data:courses})
           }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }

  return {
    addCourse,
    getAllCourse
  };
};
export default courseController;
