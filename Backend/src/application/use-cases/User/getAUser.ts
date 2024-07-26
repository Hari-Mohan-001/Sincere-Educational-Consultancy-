import { IUserRepository } from "../../../domain/repositories/IUserRepositary"

export const getAUser = (userRepository:IUserRepository)=>{
    const execute = async(userId:string)=>{
        const user = await userRepository.findUserById(userId)
        if(!user){
            throw new Error("User not found");
            
        }
        return user
    }
    return{
        execute
    }
}