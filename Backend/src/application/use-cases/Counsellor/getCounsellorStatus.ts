import { IAdminRepository } from "../../../domain/repositories/IAdminRepository"

export const getCounsellorData = (adminRepository:IAdminRepository)=>{
    const execute = async(id:string)=>{
      const data = await adminRepository.getCounsellorData(id)
      if(data){
        return data
      }
    }
    return{
        execute
    }
}