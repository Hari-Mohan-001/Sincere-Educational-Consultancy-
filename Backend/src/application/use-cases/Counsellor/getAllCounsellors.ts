import { IAdminRepository } from "../../../domain/repositories/IAdminRepository"

export const getApprovedCounsellors =(counsellorRepository:IAdminRepository)=>{
    const execute = async()=>{
     const counsellors = await counsellorRepository.getAllApprovedCounsellors()
     console.log(counsellors);
     
     if( counsellors && counsellors?.length>0){
         return counsellors
     }
    }
    return {execute}
}