import { IUserRepository } from "../../../domain/repositories/IUserRepositary"

export const BlockOrUnblockUser = (userRepository:IUserRepository)=>{
    const execute = async(userId:string)=>{
        try {
            const response = await userRepository.blockOrUnblockUser(userId) 
            return response
        } catch (error) {
            throw error
        }
    }
    return{
        execute
    }
}