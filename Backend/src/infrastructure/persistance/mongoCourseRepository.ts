import mongoose, { Types } from "mongoose";
import { CourseDTO } from "../../application/dtos/courseDto";
import { Course } from "../../domain/entities/course";
import { ICourseRepository } from "../../domain/repositories/ICourseRepository";
import courseModel from "../../presentation/models/courseModel";
import universityModel from "../../presentation/models/universityModel";
import courseUniversityModel from "../../presentation/models/CourseUniversityModel";

export class mongoCourseRepository implements ICourseRepository {
  public async createCourse(course: CourseDTO): Promise<Course> {
    
    // Convert the university field to ObjectId if it's a string
        const universityIds = course.universities
        try {
          const addNewCourse = new courseModel({
            name: course.name,
            qualification: course.qualification,
            fees: course.fees,
            description: course.description,
            duration: course.duration,
            universities: course.universities,
            domain:course.domain,
            logo:course.logo
          });
          const newCourse = await addNewCourse.save();
          const courseUniversityEntries = universityIds.map((universityId) => ({
            courseId: newCourse._id,
            universityId,
          }));
           await courseUniversityModel.insertMany(courseUniversityEntries)

          return new Course(
            newCourse._id.toString(),
            newCourse.name,
            newCourse.qualification,
            newCourse.fees,
            newCourse.description,
            newCourse.logo,
            newCourse.duration,
            newCourse.universities.map((university: Types.ObjectId) => university.toString()),
            newCourse.domain.toString()
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
          course.universities.map((university: Types.ObjectId) => university.toString()),
          course.domain.toString()
        )
    );
  }
   public async getSuggestedCourse(qualification: string): Promise<Course[]> {
    try {
      const SuggestedCourses = await courseModel.find({qualification:qualification})
      if(!SuggestedCourses){
        throw new Error("No courses matches your qualification");  
      }
      return SuggestedCourses.map((course)=>
          new Course(
            course._id.toString(),
            course.name,
            course.qualification,
            course.fees,
            course.description,
            course.logo,
            course.duration,
            course.universities.map((university: Types.ObjectId) => university.toString()),
            course.domain.toString()
          )
      )
    } catch (error) {
      throw error
    }
  }

  public async getCounsellorCourse(countryId: string): Promise<Course[]> {
    try {
      const courses = await universityModel.aggregate([
        {
          $match:{country:new mongoose.Types.ObjectId(countryId)}
        },
        {
          $lookup:{
            from:'courses',
            localField:'_id',
            foreignField:'universities',
            as:'courses'
          }
        },
        {$unwind:'$courses'},
        {
          $addFields:{
             'courses.universityName':"$name"
          }
        },
        {
          $replaceRoot:{
            newRoot:'$courses'
          }

        }
      ])

      if (!courses.length) {
       throw new Error("No courses found"); 
      }
console.log('aggrecrs',courses);

      return courses

    } catch (error) {
      console.log(error);
      
      throw error
    }
  }
  public async getACourse(courseId: string): Promise<Course> {
    try {
      const course = await courseModel.findById(courseId)
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      return new Course(
            course._id.toString(),
            course.name,
            course.qualification,
            course.fees,
            course.description,
            course.logo,
            course.duration,
            course.universities.map((university: Types.ObjectId) => university.toString()),
            course.domain.toString()
      )
    } catch (error) {
      console.log(error);
      throw error
    }
  }
  public async getCoursesForAdmin(): Promise<Course[]> {
    
    try {
      const courses = await universityModel.aggregate([
        {
          $lookup:{
            from:'courses',
            localField:'_id',
            foreignField:'universities',
            as:'courses'
          }
        },
        {$unwind:'$courses'},
        {
          $addFields:{
             'courses.universityName':"$name"
          }
        },
        {
          $replaceRoot:{
            newRoot:'$courses'
          }

        }
      ])

      if (!courses.length) {
       throw new Error("No courses found"); 
      }
console.log('aggrecrs',courses);

      return courses

    } catch (error) {
      console.log(error);
      
      throw error
    }
  }
}
