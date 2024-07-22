import { enrollmentDTO } from "../../application/dtos/enrollmentDto";
import { Enrollment } from "../entities/enrollment";


export interface IEnrollmentRepository{
    createEnrollment(enrollment:enrollmentDTO) : Promise<Enrollment>
     getAllEnrollments():Promise<Enrollment[]>
      
}