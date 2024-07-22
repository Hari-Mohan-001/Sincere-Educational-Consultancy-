
import { University } from "../entities/university";


export interface ICourseUniversityRepository {
  fetchAllUniversitiesForACourse(courseId:string): Promise<University[]>;  
}