import { Request, Response } from "express";
import { mongoCourseRepository } from "../persistance/mongoCourseRepository";
import { CourseDTO } from "../../application/dtos/courseDto";
import { createNewCourse } from "../../application/use-cases/Course/CreateCourse";
import { cloudinaryUpload } from "../services/CloudinaryUpload";
import { allCourses } from "../../application/use-cases/Course/getAllCourse";
import { SuggestedCourses } from "../../application/use-cases/Course/getSuggestedCourses";
import { getCounsellorCourses } from "../../application/use-cases/Course/getCounsellorCourses";
import { getCourseByCourseId } from "../../application/use-cases/Course/getACourse";
import { getAllCourseForAdmin } from "../../application/use-cases/Course/getAllCourseForAdmin";

const courseRepository = new mongoCourseRepository();

const courseController = () => {
  const addCourse = async (req: Request, res: Response) => { 
    const {
      name,
      qualification,
      fees,
      duration,
      universities,
      domain,
      description,
      logo,
    } = req.body;
    console.log(req.body);
    const universityIds = req.body.universities

    const logoUrl = await cloudinaryUpload(logo, "Course");

    const courseDto = new CourseDTO(
      name,
      qualification,
      fees,
      duration,
      description,
      logoUrl,
      universities,
      domain
    );
    try {
      const newCourse = await createNewCourse(courseRepository).execute(
        courseDto
      );
      console.log('newcrs', newCourse);
      
      if (newCourse) {
        res.status(200).json({ message: "Course created", data: newCourse });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getAllCourse = async (req: Request, res: Response) => {
    try {
      const courses = await allCourses(courseRepository).execute();
      if (courses) {
        res.status(200).json({ message: "success", data: courses });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  const getSuggestedCourse = async (req: Request, res: Response) => {
    try {
      const qualification = req.params.qualification;
      console.log("allcorcourse", qualification);

      const courses = await SuggestedCourses(courseRepository).execute(
        qualification
      );
      if (courses.length>0) {
        console.log("allsgstcrs", courses);

        res.status(200).json({ message: "success", data: courses });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        
        res.status(400).json({ message: error.message });
      } else {
        console.log('elseerr');
        
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const counsellorCourse = async (req: Request, res: Response)=>{
    console.log('counscrs');
    
              const countryId = req.params.countryId
             
              
              try {
                const courses = await getCounsellorCourses(courseRepository).execute(countryId)
                console.log('cons crs',courses);
                
                if(courses.length>0){
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

  const getACourse = async(req: Request, res: Response)=>{    
    const courseId = req.params.courseId
    console.log('get crs ', courseId);
    
    try {
      const course = await getCourseByCourseId(courseRepository).execute(courseId)
      if(course){
        res.status(200).json({message:'Success' , data:course})
      }
    } catch (error) {
      if (error instanceof Error) { 
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }

  const getAllCoursesForAdmin = async(req: Request, res: Response)=>{
    try {
       const adminCourses = await getAllCourseForAdmin(courseRepository).execute()
       console.log('admincrs',adminCourses);
       
       if(adminCourses.length){
          res.status(200).json({message:'success',data:adminCourses})
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
    getAllCourse,
    getSuggestedCourse,
    counsellorCourse,
    getACourse,
    getAllCoursesForAdmin
  };
};
export default courseController;
