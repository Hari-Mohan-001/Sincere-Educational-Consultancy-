import { universityDTO } from "../../application/dtos/universityDto";
import { PopulatedUniversity, University } from "../entities/university";


export interface IUniversityRepository {
  createUniversity(university: universityDTO): Promise<University>;
  getAllUniversities(countryId:string): Promise<PopulatedUniversity[]>;
  getUniversities():Promise<PopulatedUniversity[]>
  approveUniversity(universityId:string):Promise<boolean>
  getAllUniversitiesForAdmin():Promise<University[]>
}