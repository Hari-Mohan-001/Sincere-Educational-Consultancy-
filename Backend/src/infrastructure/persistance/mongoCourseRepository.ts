import { Types } from "mongoose";
import { CourseDTO } from "../../application/dtos/courseDto";
import { Course } from "../../domain/entities/course";
import { ICourseRepository } from "../../domain/repositories/ICourseRepository";
import courseModel from "../../presentation/models/courseModel";

export class mongoCourseRepository implements ICourseRepository {
  public async createCourse(course: CourseDTO): Promise<Course> {
    
    // Convert the university field to ObjectId if it's a string
    const universityId =
      typeof course.university === "string"
        ? new Types.ObjectId(course.university)
        : course.university;
        try {
          const addNewCourse = new courseModel({
            name: course.name,
            qualification: course.qualification,
            fees: course.fees,
            description: course.description,
            duration: course.duration,
            university: universityId,
            logo:course.logo
          });
          const newCourse = await addNewCourse.save();
          return new Course(
            newCourse._id.toString(),
            newCourse.name,
            newCourse.qualification,
            newCourse.fees,
            newCourse.description,
            newCourse.logo,
            newCourse.duration,
            newCourse.university.toString()
          );
        } catch (error) {
          console.error("Error creating the course:", error);
           throw error; // Rethrow the original error
        }
   
  }

   public async getAllCourse(): Promise<Course[]> {
    const courses = await courseModel.find()
    return courses.map(
      (course) =>
        new Course(
          course._id.toString(),
          course.name,
          course.qualification,
          course.fees,
          course.description,
          course.logo,
          course.duration,
          course.university.toString()
        )
    );
  }
}
