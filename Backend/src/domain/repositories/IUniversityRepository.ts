import { University } from "../entities/university";


export interface IUniversityRepository {
  createUniversity(university: University): Promise<University>;
  getAllUniversities(countryId:string): Promise<University[]>;
  getUniversities():Promise<University[]>
}