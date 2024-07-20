import { Request, Response } from "express";
import { mongoCourseRepository } from "../persistance/mongoCourseRepository";
import { CourseDTO } from "../../application/dtos/courseDto";
import { createNewCourse } from "../../application/use-cases/Course/CreateCourse";
import { cloudinaryUpload } from "../services/CloudinaryUpload";
import { allCourses } from "../../application/use-cases/Course/getAllCourse";
import { SuggestedCourses } from "../../application/use-cases/Course/getSuggestedCourses";

const courseRepository = new mongoCourseRepository();

const courseController = () => {
  const addCourse = async (req: Request, res: Response) => {
    const {
      name,
      qualification,
      fees,
      duration,
      university,
      domain,
      description,
      logo,
    } = req.body;

    const logoUrl = await cloudinaryUpload(logo, "Course");

    const courseDto = new CourseDTO(
      name,
      qualification,
      fees,
      duration,
      description,
      logoUrl,
      university,
      domain
    );
    try {
      const newCourse = await createNewCourse(courseRepository).execute(
        courseDto
      );
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

  return {
    addCourse,
    getAllCourse,
    getSuggestedCourse,
  };
};
export default courseController;
