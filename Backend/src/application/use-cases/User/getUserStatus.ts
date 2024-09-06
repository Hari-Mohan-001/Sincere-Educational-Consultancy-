import { IUserRepository } from "../../../domain/repositories/IUserRepositary"

export const getTheUserStatus = (userRepository:IUserRepository)=>{
    const execute = async(userId :string)=>{
    
        
         const user = await userRepository.getUserStatus(userId)
         
         if(user){
            return user
         }else{
            throw new Error("User not found");
            
         }
    }
    return{
        execute
    }
}