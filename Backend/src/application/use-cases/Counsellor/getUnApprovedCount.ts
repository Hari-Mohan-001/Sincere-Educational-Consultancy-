import { IAdminRepository } from "../../../domain/repositories/IAdminRepository"

export const unApprovedCount = (counsellorRepository:IAdminRepository)=>{
    const execute = async ()=>{
        const count = await counsellorRepository.getUnApprovedCounsellorCount()
        return count
    }
    return {
        execute
    }
}

export const unApprovedCounsellors = (counsellorRepository:IAdminRepository)=>{
    const execute = async()=>{
        const counsellors = await counsellorRepository.getUnApprovedCounsellors()
        if(counsellors && counsellors.length>0){
            return counsellors
        }
    }
    return{
        execute
    }
}

export const approveTheCounsellor = (counsellorRepository:IAdminRepository)=>{
    const execute = async(counsellorId :string)=>{
        const response = await counsellorRepository.approveCounsellor(counsellorId)
        return response
    }
    return{
        execute
    }
}