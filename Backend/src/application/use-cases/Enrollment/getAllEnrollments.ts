import { IEnrollmentRepository } from "../../../domain/repositories/IEnrollmentRepository"

export const getAllEnrollments = (enrollmentRepository:IEnrollmentRepository)=>{
    const execute = async()=>{
         const enrollments = await enrollmentRepository.getAllEnrollments()
         if(!enrollments.length){
            throw new Error("No enrollments found"); 
         }
         return enrollments
    }
    return{
        execute
    }
}