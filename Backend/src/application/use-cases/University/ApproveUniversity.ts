import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository";

export const universityApproval = (universityRepository:IUniversityRepository)=>{
  const execute = async(universityId:string)=>{
  const response =  await universityRepository.approveUniversity(universityId)
  return response
  }
  return{
    execute
  } 
}