import { CourseDTO } from "../../application/dtos/courseDto";
import { Course } from "../entities/course";



export interface ICourseRepository {
  createCourse(course: CourseDTO): Promise<Course>;
  getAllCourse(): Promise<Course[]>;
  getSuggestedCourse(qualification:string):Promise<Course[]>
  getCounsellorCourse(countryId:string):Promise<Course[]>
  getACourse(courseId:string): Promise<Course>;
  getCoursesForAdmin():Promise<Course[]>
}