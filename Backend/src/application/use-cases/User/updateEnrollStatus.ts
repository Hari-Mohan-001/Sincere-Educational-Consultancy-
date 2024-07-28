import { IUserRepository } from "../../../domain/repositories/IUserRepositary"

export const updateEnrollStatus = (userRepository:IUserRepository)=>{
    const execute= async(userId:string):Promise<boolean>=>{
         const updateUser = await userRepository.updateUserEnrollStatus(userId)
         return updateUser!=null
    }
    return{
        execute
    }
}